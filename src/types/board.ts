import { Piece } from './Piece';
import { Point2D } from './Point2D';

export class Board {
  constructor(sizeX: number = 8, sizeY: number = 8) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.gamePieces = [];

    // loop to generate space for pieces
    for (let i: number = 0; i < this.sizeY; i += 1) {
      // y axis
      const tempArray: Piece[] = [];
      for (let j: number = 0; j < this.sizeX; j += 1) {
        // x axis
        const tempPiece = new Piece('null', 3, new Point2D(j, i));
        tempArray.push(tempPiece);
      }
      this.gamePieces.push(tempArray);
    }
  }

  // once move is identified to be okey. change the board to refelct that move. Calls printBoard()
  makeMove(x: number, y: number, newX: number, newY: number): void {
    this.gamePieces[newX][newY] = this.gamePieces[x][y];
    this.setNullPiece(x, y);
    // copy (x,y)'s piece into the (newX, newY)
    // then set (x,y) to null piece
    // if king taken, call it quits and Win state.
  }

  setNullPiece(x: number, y: number) {
    const piecePtr = this.gamePieces[x][y];
    piecePtr.setName('null');
    piecePtr.setColor(3);
    piecePtr.setSprite(' ');
  }

  // prints board to the screen / may have to be private
  printBoard(): void {
    // console.log(`printBoard was called. Board is ${this.sizeX} by ${this.sizeY}`);
    for (let i: number = 0; i < this.sizeY; i += 1) {
      let tempString: string = '';
      for (let j: number = 0; j < this.sizeX; j += 1) {
        tempString = tempString.concat('[', this.gamePieces[j][i].getSprite(), '] ');
      }
    }
    console.log(tempString);
  }

  getGamePiece(x: number, y: number): Piece {
    return this.gamePieces[x][y];
  }

  // left and right board size
  private sizeX: number;

  // up and down board size
  private sizeY: number;

  // 0,0 is the top left corner of the board / [x][y]
  private gamePieces: Piece[][];

  // this is our empty square / null was the og idea but it was hard to implement
  // The space lost isn't that bad from this structure for we are dealing with board of 8 by 8 for this project
  // private nullPiece: Piece; Not sure if this is the best way

  // false = lowerCase's turn // true = upperCase's turn
  // private playerMove: boolean = false;
}
