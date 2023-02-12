import { Point2D } from './Point2D';

class Piece {
  constructor(name: string, color: string, start: Point2D){
    this.pieceName = name;
    this.pieceColor = color;
    this.startPosition = start;
  }
  private pieceName: string = '';

  private pieceColor: string = ''; // decided by players number in determinePieceColor(). if 0{ "White"}, if 1 {"Black" }. Ill make a setPieceColor( color: string ) function in this class but decide should be in board creation.

  private possibleMoves: Array<Point2D> = [];
  private pieceSprite: string = ''; // Not sure how well do this on the web portion yet. For now I say we represent it with two letters. One for color and one for which piece it is. EX: a white bishop will be "WB" on the board. Black knight "BK"

  // private heirarchy( place: number) //determines whether or not a piece can take another. if (piece1.heirarchy < piece2.herarchy) then invalidate the move.
  private startPosition = new Point2D();

  // accessors and mutators for private data
  setName(name: string): void {
    this.pieceName = name;
  }

  setColor(color: string): void {
    this.pieceColor = color;
  }

  setSprite(sprite: string): void {
    this.pieceSprite = sprite;
  }

  setStart(startX: number, startY: number): void {
    this.startPosition = new Point2D(startX, startY);
  }

  setPossibleMoves(newMoveSet: Array<Point2D>){
    this.possibleMoves = newMoveSet;
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
  getColor(): string {
    return this.pieceColor;
  }

  // returns Point2D
  getStart(): Point2D {
    return this.startPosition;
  }
  // pieces deconstruct automatically when they fall out of scope. We can handle piece deletion by overriding its spot on the board.
}

export { Piece };
