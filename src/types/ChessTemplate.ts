// This file will cotain the template of a chess game

// 1) Create Board
// 2) Set Pieces
// 3) Controlls turn order
// 4) Template of Pieces

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
    this.makeCastle(0, 7, 0);
    this.makeCastle(0, 0, 0);
    this.makeCastle(0, 0, 0);
    /*

    // Knights - Horses - HH -hh
    makeKnight(0, 0, 0);
    makeKnight(0, 0, 0);
    makeKnight(0, 0, 0);
    makeKnight(0, 0, 0);

    // Bishops - BB - bb
    makeBishop(0, 0, 0);
    makeBishop(0, 0, 0);
    makeBishop(0, 0, 0);
    makeBishop(0, 0, 0);

    // Queens - QQ - qq
    makeQueen(0, 0, 0);
    makeQueen(0, 0, 0);

    // Kings - KK - kk
    makeKing(0, 0, 0);
    makeKing(0, 0, 0);

    // Pawns - PP - pp
    for (let i: number = 0; i < this.CHESS_SIZE_CONSTANT; i += 1) {
      makePawn(i, 1, 0);
      makePawn(i, 6, 1);
    }
    */
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
    console.log('changed castle');
    this.chessBoard.printBoard();
    // make piece
    // place piece on board
    // define piece's  movement (good luck Hayden)
  } /*

  makeKnight(x: number, y: number, playerOwner: number): void {
    // make piece
    // place piece on board
    // define piece's  movement (good luck Hayden)
  }

  makeBishop(x: number, y: number, playerOwner: number): void {
    // make piece
    // place piece on board
    // define piece's  movement (good luck Hayden)
  }

  makeQueen(x: number, y: number, playerOwner: number): void {
    // make piece
    // place piece on board
    // define piece's  movement (good luck Hayden)
  }

  makeKing(x: number, y: number, playerOwner: number): void {
    // make piece
    // place piece on board
    // define piece's  movement (good luck Hayden)
  }

  makePawn(x: number, y: number, playerOwner: number): void {
    // make piece
    // place piece on board
    // define piece's  movement (good luck Hayden)
  }
  */

  makePawn(x: number, y: number, playerOwner: number): void {
    console.log(this.CHESS_BOARD_CONSTANT); // delete this; gets weird of weird 'no this' error
    const startPos = new Point2D(x, y);
    const pawn = new Piece('Pawn', playerOwner, startPos); // make piece
    pawn.generatePawnMoves(); // define piece's  movement (good luck Hayden)

    // no need to create a new pawn piece. The pieces on the board only need to be changed to look like a pawn
    //

    // place piece on board
  }

  // main game logic
  chessLogic(): void {
    console.log(this.CHESS_BOARD_CONSTANT);
  }

  // data sturcture that holds pieces and keeps tracks of them in a semi-sparse 2d table
  // Mimics a 2d game board
  private chessBoard: Board;

  // square size of chess board
  private CHESS_BOARD_CONSTANT: number = 8;
}
