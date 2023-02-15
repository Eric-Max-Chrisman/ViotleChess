// This file will cotain the template of a chess game

// 1) Create Board
// 2) Set Pieces
// 3) Controlls turn order
// 4) Template of Pieces

import * as readline from 'node:readline'; // Docs: https://nodejs.org/api/readline.html#readline_readline
import { stdin as input, stdout as output } from 'node:process'; // from same Docs as above
import { Board } from './Board';
import { Piece } from './Piece';
import { Point2D } from './Point2D';

// All methods private / The creation of this class will halt process until chess is over
export class ChessTemplate {
  // creates board of null pieces of size x, y) calls setPieces and then chessLogic
  constructor() {
    this.chessBoard = new Board(this.CHESS_BOARD_CONSTANT, this.CHESS_BOARD_CONSTANT);
    this.setPieces(); // set the stage
    this.chessLogic(); // begin the game
  }

  // sets the pieces on the board as if setting a new game of chess
  setPieces(): void {
    // Castles - CC - cc
    this.makeCastle(0, 0, 0);
    this.makeCastle(7, 0, 0);
    this.makeCastle(0, 7, 1);
    this.makeCastle(7, 7, 1);

    // Knights - Horses - HH -hh
    this.makeKnight(1, 0, 0);
    this.makeKnight(6, 0, 0);
    this.makeKnight(1, 7, 1);
    this.makeKnight(6, 7, 1);

    // Bishops - BB - bb
    this.makeBishop(2, 0, 0);
    this.makeBishop(5, 0, 0);
    this.makeBishop(2, 7, 1);
    this.makeBishop(5, 7, 1);

    // Queens - QQ - qq
    this.makeQueen(3, 0, 0);
    this.makeQueen(4, 7, 1);

    // Kings - KK - kk
    this.makeKing(4, 0, 0);
    this.makeKing(3, 7, 1);

    // Pawns - PP - pp
    for (let i: number = 0; i < this.CHESS_BOARD_CONSTANT; i += 1) {
      this.makePawn(i, 1, 0);
      this.makePawn(i, 6, 1);
    }
    this.chessBoard.printBoard();
  }

  makeCastle(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to knight

    // give piece the attributes of a castle
    tempPiece.setName('Castle');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
    } else {
      tempPiece.setColor(1);
    }
    // define piece's  movement (good luck Hayden)
  }

  makeKnight(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to knight

    // give piece the attributes of a Knight
    tempPiece.setName('Knight');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
    } else {
      tempPiece.setColor(1);
    }
    // define piece's  movement (good luck Hayden)
  }

  makeBishop(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to Bishop

    // give piece the attributes of a Bishop
    tempPiece.setName('Bishop');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
    } else {
      tempPiece.setColor(1);
    }
    // define piece's  movement (good luck Hayden)
  }

  makeQueen(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to queen

    // give piece the attributes of a queen
    tempPiece.setName('Queen');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
    } else {
      tempPiece.setColor(1);
    }
    // define piece's  movement (good luck Hayden)
  }

  makeKing(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to king

    // give piece the attributes of a king
    tempPiece.setName('King');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
    } else {
      tempPiece.setColor(1);
    }
    // define piece's  movement (good luck Hayden)
  }

  makePawn(x: number, y: number, playerOwner: number): void {
    /*
    console.log(this.CHESS_BOARD_CONSTANT); // delete this; gets weird of weird 'no this' error
    const startPos = new Point2D(x, y);
    const pawn = new Piece('Pawn', playerOwner, startPos); // make piece
    pawn.generatePawnMoves(); // define piece's  movement (good luck Hayden)
    */

    // no need to create a new pawn piece. The pieces on the board only need to be changed to look like a pawn
    // like this
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to pawn

    // give piece the attributes of a pawn
    tempPiece.setName('Pawn');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
    } else {
      tempPiece.setColor(1);
    }
  }

  // main game logic / need to figure out cin
  chessLogic(): void {
    /*
    const rl = readline.createInterface({ input, output });

    const answer = await rl.question('What do you think of Node.js? ');

    console.log(`Thank you for your valuable feedback: ${answer}`);

    rl.close();
    */
    // https://stackoverflow.com/questions/43638105/how-to-get-synchronous-readline-or-simulate-it-using-async-in-nodejs
  }

  // data sturcture that holds pieces and keeps tracks of them in a semi-sparse 2d table
  // Mimics a 2d game board
  private chessBoard: Board;

  // square size of chess board
  private readonly CHESS_BOARD_CONSTANT: number = 8;
}
