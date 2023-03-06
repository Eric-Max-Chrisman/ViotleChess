// This file will cotain the template of a chess game / markdown

// 1) Create Board
// 2) Set Pieces
// 3) Controlls turn order
// 4) Template of Pieces

import * as readline from 'node:readline'; // Docs: https://nodejs.org/api/readline.html#readline_readline
// import { stdin as input, stdout as output } from 'node:process'; // from same Docs as above
import { Board } from './Board';

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
    this.makeQueen(3, 7, 1);

    // Kings - KK - kk
    this.makeKing(4, 0, 0);
    this.makeKing(4, 7, 1);

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
      tempPiece.setSprite('♖');
    } else {
      tempPiece.setColor(1);
      tempPiece.setSprite('♜');
    }
    tempPiece.setCurrent(x, y);
    // debug Castle
    // console.log(`Castle start: ${tempPiece.getCurrent().getX()}, ${tempPiece.getCurrent().getY()}`);
    tempPiece.generateCastleMoves();

    // define piece's  movement (good luck Hayden)
  }

  makeKnight(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to knight

    // give piece the attributes of a Knight
    tempPiece.setName('Knight');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
      tempPiece.setSprite('♘');
    } else {
      tempPiece.setColor(1);
      tempPiece.setSprite('♞');
    }
    tempPiece.setCurrent(x, y);

    // debug Knights
    // console.log(
    //   `Start position: ${tempPiece.getCurrent().getX()}, ${tempPiece.getCurrent().getY()}`
    // );
    tempPiece.generateKnightMoves(); // define piece's  movement (good luck Hayden)
  }

  makeBishop(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to Bishop

    // give piece the attributes of a Bishop
    tempPiece.setName('Bishop');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
      tempPiece.setSprite('♗');
    } else {
      tempPiece.setColor(1);
      tempPiece.setSprite('♝');
    }
    tempPiece.setCurrent(x, y);

    // debug Bishops
    // console.log(
    //   `Start position: ${tempPiece.getCurrent().getX()}, ${tempPiece.getCurrent().getY()}`
    // );
    tempPiece.generateBishopMoves(); // define piece's  movement (good luck Hayden)
  }

  makeQueen(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to queen

    // give piece the attributes of a queen
    tempPiece.setName('Queen');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
      tempPiece.setSprite('♕');
    } else {
      tempPiece.setColor(1);
      tempPiece.setSprite('♛');
    }
    tempPiece.setCurrent(x, y);

    // debug Queens
    // console.log(
    //   `Start position: ${tempPiecse.gestCurrent().getX()}, ${tempPiece.getCurrent().getY()}`
    // );

    tempPiece.generateQueenMoves();
    // define piece's  movement (good luck Hayden)
  }

  makeKing(x: number, y: number, playerOwner: number): void {
    const tempPiece = this.chessBoard.getGamePiece(x, y); // piece to change to king

    // give piece the attributes of a king
    tempPiece.setName('King');
    if (playerOwner === 0) {
      tempPiece.setColor(0);
      tempPiece.setSprite('♔');
    } else {
      tempPiece.setColor(1);
      tempPiece.setSprite('♚');
    }
    tempPiece.setCurrent(x, y);
    // debug Kings
    // console.log(
    //   `Start position: ${tempPiece.getCurrent().getX()}, ${tempPiece.getCurrent().getY()}`
    // );
    tempPiece.generateKingMoves(); // define piece's  movement (good luck Hayden)
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
      tempPiece.setSprite('♙');
    } else {
      tempPiece.setColor(1);
      tempPiece.setSprite('♟');
    }
    tempPiece.setCurrent(x, y);

    // debug Pawns
    // console.log(
    //   `Start position: ${tempPiece.getCurrent().getX()}, ${tempPiece.getCurrent().getY()}`
    // );

    tempPiece.generatePawnMoves();
  }

  checkMove(x: number, y: number, newX: number, newY: number): void {
    let moveValid: boolean = true;

    if (newX < 0 || newX > 7 || newY < 0 || newY > 7 || x < 0 || x > 7 || y < 0 || y > 7) {
      moveValid = false;
    }
    if (
      this.chessBoard.getGamePiece(x, y).getColor() ===
      this.chessBoard.getGamePiece(newX, newY).getColor()
    ) {
      moveValid = false;
    }
    if (
      !this.chessBoard
        .getGamePiece(x, y)
        .getPossibleMoves()
        .find((element) => element.getX() === newX && element.getY() === newY)
    ) {
      moveValid = false;
    }

    if (moveValid) {
      this.chessBoard.makeMove(x, y, newX, newY);
    } else {
      console.log(`Invalid Move!`);
    }
  }

  // main game logic / need to figure out cin
  async chessLogic(): Promise<void> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      'Enter the coords (x,y) of the piece to want to move and the coords of where to place the piece. Separate each number with space: ',
      (responce: string) => {
        const nums = responce.split(' '); // creates array of strings that is separated by the detection of a space
        this.checkMove(Number(nums[0]), Number(nums[1]), Number(nums[2]), Number(nums[3]));
        console.log('');
        rl.close(); // Close the readline interface
        this.chessLogic(); // Call the function again
      }
    );
  }

  // data sturcture that holds pieces and keeps tracks of them in a semi-sparse 2d table
  // Mimics a 2d game board
  private chessBoard: Board;

  // square size of chess board
  private readonly CHESS_BOARD_CONSTANT: number = 8;
}
