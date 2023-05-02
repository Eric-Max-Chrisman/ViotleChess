// import point2d
// import set
// import LeaderBoard?
//

type piece = {
  name: string;
  picture: string;
  team: number;
};

export class VolatileBoard {
  constructor(setName: number, sizeX: number = 8, sizeY: number = 8) {
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

  async asyncConstructor(): Promise<void> {
    // get list of customPieces IDs from set name
    const pieceIDs: string = await getPiecesFromSetName(this.setName);

    // we need a king to play this game
    const kingFound: boolean = false;

    // set the pieces
    for (let i: number = 0; i < pieceIDs.length; i += 1) {
      currentPiece = await getPieceDataSockets(pieceIDs[i]);
    }
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
