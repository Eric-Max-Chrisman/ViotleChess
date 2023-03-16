// index.ts (Eric)
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { ChessTemplate } from './types/ChessTemplate';
import { registerUser, logIn } from './controllers/UserController';
import { createPiece, getPieceData } from './controllers/PieceController';

dotenv.config();
const app: Express = express();
app.use(express.json());
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`listsening on port ${PORT}`);
});
// test

app.post('/users', registerUser); // Create Account
app.post('/api/login', logIn); // Log in to an account
app.post('/api/piece', createPiece);
app.get('/api/piece/:pieceId', getPieceData);

console.log('Chess program started.');
const myChessBoard = new ChessTemplate();

// Testing Point2D methods

// const pointTest = new Point2D(4, 5); // should output 44: 8(5) + 4
// const index: number | undefined = pointTest.convertToIndex();

// console.log(`The index of Point (4, 5) is ${index}`);
