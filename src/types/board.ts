import { Piece } from './Piece';

export class board {
  constructor(sizeX: number = 8, sizeY: number = 8) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.gamePieces = [];

    // loop to generate space for pieces
    for (let i: number = 0; i < this.sizeX; i++) {
      // x axis
      const tempArray: Piece[] = [];
      for (let j: number = 0; j < this.sizeY; j++) {
        // y axis
        const placeHolderPiece = new Piece(); // params to add : 'emptySpace', 'null'
        tempArray.push(placeHolderPiece);
      }
      this.gamePieces.push(tempArray);
    }
    console.log(this.gamePieces.length);
    console.log(this.gamePieces[0].length);
    this.createBoard();
  }

  // makes empty board with pieces in right place. Changes turn to white. Calls printBoard()
  createBoard() {}

  // cin move vaildation loop that returns 1 if move maded is vaild, returns 0 if players wish to quit. Calls makeMove()
  checkMove() {}

  // once move is identified to be okey. change the board to refelct that move. Calls printBoard()
  makeMove() {}

  // prints board to the screen / may have to be private
  printBoard() {
    console.log(`printBoard was called. Board is ${this.sizeX} by ${this.sizeY}`);
    for (let i: number = 0; i < this.sizeX; i++) {
      for (let j: number = 0; j < this.sizeY; j++) {
        // console.log(gamePieces[i].join('[ ]'));
      }
    }
  }

  private sizeX: number;

  private sizeY: number;

  private gamePieces: Piece[][];
  // private playerMove: boolean = false; // fasle = white's turn // true = black's trun
}
