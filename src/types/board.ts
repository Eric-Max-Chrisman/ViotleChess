import { Piece, Piece } from './Piece';

export class Board {
  constructor(sizeX: number = 8, sizeY: number = 8) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.gamePieces = [];

    // loop to generate space for pieces
    for (let i: number = 0; i < this.sizeY; i += 1) {
      // y axis
      const tempArray: (Piece | null)[] = [];
      for (let j: number = 0; j < this.sizeX; j += 1) {
        // x axis
        tempArray.push(null);
      }
      this.gamePieces.push(tempArray);
    }
    console.log(this.gamePieces.length);
    console.log(this.gamePieces[0].length);
    this.createBoard();
  }

  // makes empty board with pieces in right place. Changes turn to white. Calls printBoard()
  createBoard(): void {
    this.printBoard();
    console.log('createBoard not Impetmented yet');
  }

  // cin move vaildation loop that returns 1 if move maded is vaild, returns 0 if players wish to quit. Calls makeMove()
  checkMove(): void {
    console.log('checkMove not Impetmented yet');
  }

  // once move is identified to be okey. change the board to refelct that move. Calls printBoard()
  makeMove(): void {
    console.log('makeMove not Impetmented yet');
  }

  // prints board to the screen / may have to be private
  printBoard(): void {
    console.log(`printBoard was called. Board is ${this.sizeX} by ${this.sizeY}`); /*
    for (let i: number = 0; i < this.sizeY; i += 1) {
      const tempString: string = '';
      for (let j: number = 0; j < this.sizeX; i += 1) {
        // tempString = tempString.concat(' ', i.toString(), ' ', j.toString());
      }
      console.log(tempString);
    } */
  }

  private sizeX: number;

  private sizeY: number;

  private gamePieces: (Piece | null)[][];
  // private playerMove: boolean = false; // fasle = white's turn // true = black's trun
}
