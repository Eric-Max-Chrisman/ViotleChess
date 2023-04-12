// import { Move } from '../entities/Moves';
// import { Point2D } from '../entities/Point2D';

type NewPieceRequest = {
  pieceName: string;
  replaces: string; // start position
  moves: Move[]; // possibly changing soon
  special: string;
};

type PieceId = {
  pieceId: string;
};

type MovePack = {
  moves: Move[];
  currentPosition: Point2D;
};
