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
  // Use splice to swap pieces around
  // Create a new null piece to take the place of moved piece
  // moved piece is the piece the player moved
  // the piece that was where the moved piece is now gets written out of scope and deleted
  makeMove(x: number, y: number, newX: number, newY: number): void {
    const nullPiece = new Piece('null', 3, new Point2D(x, y)); // create new null piece to take place of moved piece
    const tempPieceMoved = this.gamePieces[x].splice(y, 1, nullPiece); // replaces the the moved piece from array. Stores moved piece (Problematic?)
    const removedPieceType: string = this.gamePieces[newX][newY].getName();
    this.gamePieces[newX].splice(newY, 1, ...tempPieceMoved); // the moved piece now replaces the piece that was at newX, newY

    this.gamePieces[newX][newY].setCurrent(newX, newY); // sets Pieces current to new spot to generate moves from
    this.gamePieces[newX][newY].generateMovesUniversal(); // Universal reads the name of the Piece at [newX], [newY] and generates the correct moves.
    this.makeNullPiece(x, y); // sets the og spot to null. As if the piece moved from that spot

    if (removedPieceType.toLowerCase() === 'king') {
      // end the match and declare victor
      console.log('THE KING IS DEADDDD');
    }
    this.playerMove = !this.playerMove;
    this.printBoard();
  }

  makeNullPiece(x: number, y: number): void {
    const piecePtr = this.gamePieces[x][y];
    piecePtr.setName('null');
    piecePtr.setColor(3);
    piecePtr.setSprite(' ');
  }

  // prints board to the screen / may have to be private
  printBoard(): void {
    console.log('    0    1    2    3    4    5    6    7    (x)');
    // console.log(`printBoard was called. Board is ${this.sizeX} by ${this.sizeY}`);
    for (let i: number = 0; i < this.sizeY; i += 1) {
      let tempString: string = `${i}  `;
      for (let j: number = 0; j < this.sizeX; j += 1) {
        tempString = tempString.concat('[', this.gamePieces[j][i].getSprite(), ' ] ');
      }
      console.log(tempString);
    }
    console.log(''); // skip lines
    console.log('(y)');
    console.log('');
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

  // false = white's turn // true = black's turn
  private playerMove: boolean = false;
}
