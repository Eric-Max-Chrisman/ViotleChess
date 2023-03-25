// index.ts (Eric)
import dotenv from 'dotenv';
import express, { Express } from 'express';
import './config';
import 'express-async-errors';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';

import { ChessTemplate } from './types/ChessTemplate';
import { registerUser, logIn } from './controllers/UserController';
import { createPiece, getPieceData } from './controllers/PieceController';

dotenv.config();
const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite' }),
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.post('/users', registerUser); // Create Account
app.post('/api/login', logIn); // Log in to an account
app.post('/api/piece', createPiece);
app.get('/api/piece/:pieceId', getPieceData);

app.listen(PORT, () => {
  console.log(`listsening on port ${PORT}`);
});
// test

console.log('Chess program started.');
const myChessBoard = new ChessTemplate();

// Testing Point2D methods

// const pointTest = new Point2D(4, 5); // should output 44: 8(5) + 4
// const index: number | undefined = pointTest.convertToIndex();

// console.log(`The index of Point (4, 5) is ${index}`);
