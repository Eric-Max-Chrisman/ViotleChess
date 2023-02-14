// This file will cotain the template of a chess game

// 1) Create Board
// 2) Set Pieces
// 3) Controlls turn order
// 4) Template of Pieces

import { Board } from './board';

// All methods private / The creation of this class will halt process until chess is over
export class ChessTemplate {
  // creates board of null pieces of size x, y) calls setPieces and then chessLogic
  constructor() {
    this.chessBoard = new Board(this.CHESS_SIZE_CONSTANT, this.CHESS_SIZE_CONSTANT);
    setPieces();
    chessLogic();
  }

  // sets the pieces on the board as if setting a new game of chess
  setPieces(): void {
    /*
    // Castles - CC - cc
    makeCastle(0, 0, 0);
    makeCastle(0, 7, 0);
    makeCastle(0, 0, 0);
    makeCastle(0, 0, 0);

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
  /*
  makeCastle(x: number, y: number, playerOwner: number): void {
    // make piece
    // place piece on board
    // define piece's  movement (good luck Hayden)
  }

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

  // main game logic
  chessLogic(): void {
    console.log(this.CHESS_BOARD_CONSTANT);
  }

  // data sturcture that holds pieces and keeps tracks of them in a semi-sparse 2d table
  // Mimics a 2d game board
  private chessBoard: Board;

  // square size of chess board
  private CHESS_BOARD_CONSTANT = 8;
}
