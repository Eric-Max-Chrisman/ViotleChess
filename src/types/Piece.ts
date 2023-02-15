import { Point2D } from './Point2D';

class Piece {
  constructor(name: string, color: number, start: Point2D) {
    this.pieceColor = color;
    this.pieceName = name;
    this.startPosition = start;
  }

  private pieceName: string = '';

  private pieceColor: number; // decided by players number in determinePieceColor(). if 0{ "White"}, if 1 {"Black" }. Ill make a setPieceColor( color: string ) function in this class but decide should be in board creation.

  private possibleMoves: Array<Point2D> = [];

  private pieceSprite: string = ' '; // Not sure how well do this on the web portion yet. For now I say we represent it with two letters. One for color and one for which piece it is. EX: a white bishop will be "WB" on the board. Black knight "BK"

  // private heirarchy( place: number) //determines whether or not a piece can take another. if (piece1.heirarchy < piece2.herarchy) then invalidate the move.
  // private startPosition = new Point2D();

  private currentPos: Point2D;

  // accessors and mutators for private data

  setName(name: string): void {
    if (this.pieceColor === 0) {
      this.pieceName = name.toLowerCase();
    } else {
      this.pieceName = name.toUpperCase();
    }
  }

  setColor(color: number): void {
    this.pieceColor = color;
    this.setName(this.pieceName);
  }

  setSprite(sprite: string): void {
    this.pieceSprite = sprite;
  }

  // setStart(startX: number, startY: number): void {
  //   this.startPosition = new Point2D(startX, startY);
  // }

  setPossibleMoves(newMoveSet: Array<Point2D>): void {
    this.possibleMoves = newMoveSet;
  }

  setCurrent(x: number, y: number): void {
    this.currentPos = new Point2D(x, y);
  }

  getCurrent(): Point2D {
    return this.currentPos;
  }

  // returns string
  getName(): string {
    return this.pieceName;
  }

  // returns string
  getSprite(): string {
    return this.pieceSprite;
  }

  // returns string
  getColor(): number {
    return this.pieceColor;
  }

  // returns Point2D
  // getStart(): Point2D {
  //   return this.startPosition;
  // }

  movePiece(newPoint: Point2D): void {
    this.currentPos = newPoint;
  }

  generatePawnMoves(): void {
    const moveSet: Array<Point2D> = [];
    this.getCurrent().setY(this.getCurrent().getY() + 1);
    moveSet.push(this.getCurrent());
    this.possibleMoves = moveSet;
    console.log(
      `Pawn move set to: (${this.possibleMoves[0].getX()}, ${this.possibleMoves[0].getY()})`
    );
  }

  generateMovesUniversal(): void {
    if (this.getName() === 'Pawn') {
      this.generatePawnMoves();
    } else if (this.getName() === 'Castle') {
      this.generatePawnMoves();
    } else if (this.getName() === 'Knight') {
      this.generatePawnMoves();
    } else if (this.getName() === 'King') {
      this.generatePawnMoves();
    } else if (this.getName() === 'Queen') {
      this.generatePawnMoves();
    } else if (this.getName() === 'Bishop') {
      this.generatePawnMoves();
    }
  }
  // pieces deconstruct automatically when they fall out of scope. We can handle piece deletion by overriding its spot on the board.
}

export { Piece };
