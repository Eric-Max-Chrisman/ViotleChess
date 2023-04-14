// index.ts (Eric)
import dotenv from 'dotenv';
import express, { Express /* NextFunction */ } from 'express';
import './config';
import 'express-async-errors';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
// import { Server, Socket } from 'socket.io';

// import { ChessTemplate } from './types/ChessTemplate';
import { registerUser, logIn, getUserWithUsername } from './controllers/UserController';
import { createPiece, getPieceData, generateMoves } from './controllers/PieceController';
import { loadChessPage } from './controllers/chessController';

dotenv.config();
const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

// WebSockets this replaces the normal express sessions code.
const sessionMiddleware = session({
  store: new SQLiteStore({ db: 'sessions.sqlite' }),
  secret: COOKIE_SECRET,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
  name: 'session',
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

// html stuff
app.use(express.static('public', { extensions: ['html'] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(express.json());

// ejs set up (all redirects should be ejs renders)
app.set('view engine', 'ejs');

// endpoints to webpages
app.get('/', (req, res) => {
  res.render('index.ejs', {});
});
app.get('/createUser', (req, res) => {
  res.render('createUser.ejs', {});
});
app.get('/login', (req, res) => {
  res.render('login.ejs', {});
});
app.get('/createPiece', (req, res) => {
  res.render('createPiece.ejs', {});
});
app.get('/chess/:setName', loadChessPage);
app.get('/users/:userName', getUserWithUsername);

// function endpoints
app.post('/users', registerUser); // Create Account
app.post('/login', logIn); // Log in to an account
app.post('/createPiece', createPiece);
app.get('/piece');
app.get('/piece/:pieceId', getPieceData);
app.post('/:pieceId/move', addMove);

app.post('/piece/:pieceId', generateMoves);

app.listen(PORT, () => {
  console.log(`listsening at http://localhost:${PORT}`);
});
// test

// console.log('Chess program started.');
// const myChessBoard = new ChessTemplate();

// Testing Point2D methods

// const pointTest = new Point2D(4, 5); // should output 44: 8(5) + 4
// const index: number | undefined = pointTest.convertToIndex();

// console.log(`The index of Point (4, 5) is ${index}`);
