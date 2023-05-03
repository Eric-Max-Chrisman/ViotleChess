import { getPieceDataSockets } from '../controllers/PieceController';
// import LeaderBoard?
import { getAllIdsInSet } from '../models/SetModel';

type Piece = {
  name: string;
  picture: string;
  team: number; // 0 white / 1 black
};

export class VolatileBoard {
  constructor(setName: string, sizeX: number = 8, sizeY: number = 8) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.gamePieces = [];
    this.setName = setName;

    // loop to generate space for pieces
    for (let i: number = 0; i < this.sizeY; i += 1) {
      // y axis
      const tempArray: Piece[] = [];
      for (let j: number = 0; j < this.sizeX; j += 1) {
        // x axis
        const tempPiece: Piece = { name: 'empty', picture: ' ', team: 0 };
        tempArray.push(tempPiece);
      }
      this.gamePieces.push(tempArray);
    }
  }

  async asyncConstructor(): Promise<void> {
    // get list of customPieces IDs from set name
    const pieceIDs: string[] = await getAllIdsInSet(this.setName);

    // we need a king to play this game
    // let kingFound: boolean = false;

    // set the pieces
    for (let i: number = 0; i < pieceIDs.length; i += 1) {
      const currentPiece = await getPieceDataSockets(pieceIDs[i]);
      const pieceToAdd: Piece = { name: '', picture: '', team: 0 };
      pieceToAdd.name = currentPiece.pieceName;

      switch (currentPiece.replaces.toLowerCase()) {
        case 'pawn':
          for (let j: number = 0; j < 8; j += 1) {
            this.gamePieces[j][6] = { ...pieceToAdd };
          }

          pieceToAdd.team = 1;
          for (let j: number = 0; j < 8; j += 1) {
            this.gamePieces[j][1] = { ...pieceToAdd };
          }
          break;
        case 'knight':
          this.gamePieces[7][1] = { ...pieceToAdd };
          this.gamePieces[7][6] = { ...pieceToAdd };

          pieceToAdd.team = 1;
          this.gamePieces[0][1] = { ...pieceToAdd };
          this.gamePieces[0][6] = { ...pieceToAdd };
          // knight
          break;
        case 'rook':
          this.gamePieces[7][0] = { ...pieceToAdd };
          this.gamePieces[7][7] = { ...pieceToAdd };

          pieceToAdd.team = 1;
          this.gamePieces[0][0] = { ...pieceToAdd };
          this.gamePieces[0][7] = { ...pieceToAdd };
          break;
        case 'bishop':
          this.gamePieces[7][2] = { ...pieceToAdd };
          this.gamePieces[7][5] = { ...pieceToAdd };

          pieceToAdd.team = 1;
          this.gamePieces[0][2] = { ...pieceToAdd };
          this.gamePieces[0][5] = { ...pieceToAdd };
          break;
        case 'queen':
          this.gamePieces[7][4] = { ...pieceToAdd };
          this.gamePieces[0][4] = { ...pieceToAdd };
          break;
        case 'king':
          this.gamePieces[7][3] = { ...pieceToAdd };
          this.gamePieces[0][3] = { ...pieceToAdd };
          // kingFound = true;
          break;
        default:
        // oh no
      }
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

  // 0 = white's turn // 1 = black's turn
  private playerMove: number = 0;

  private setName: string;
}
