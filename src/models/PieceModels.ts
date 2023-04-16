import { AppDataSource } from '../dataSource';
import { CustomPiece } from '../entities/CustomPiece';
import { Move } from '../entities/Moves';
import { Point2D } from '../entities/Point2D';

const pieceRepository = AppDataSource.getRepository(CustomPiece);
async function addPiece(pieceName: string, replaces: string, userId: string): Promise<CustomPiece> {
  // Create the new user object
  let newPiece = new CustomPiece();
  const current = new Point2D();
  current.x = 0;
  current.y = 0;
  newPiece.pieceName = pieceName;
  newPiece.replaces = replaces;
  newPiece.owner = userId;
  newPiece.currentPosition = current;

  // Then save it to the database
  // NOTES: We reassign to `newPiece` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newPiece = await pieceRepository.save(newPiece);

  return newPiece;
}

async function getPieceByID(pieceId: string): Promise<CustomPiece | null> {
  const piece = await pieceRepository
    .createQueryBuilder('piece')
    .leftJoinAndSelect('piece.moves', 'moves')
    .where('piece.pieceId = :pieceId', { pieceId })
    .getOne();
  return piece;
}

async function interperateMoves(piece: CustomPiece): Promise<CustomPiece> {
  // TODO
  // create an array of Point2D
  const validPoints: Point2D[] = [];
  // create a for loop that iterates over moves
  console.log(piece.currentPosition);
  for (const move of piece.moves) {
    if (!move.repeating) {
      const curr: Point2D = piece.currentPosition;
      curr.x += move.moveX;
      curr.y += move.moveY;

      validPoints.push(curr);
    } else {
      for (let i = 0; i < 8; i += 1) {
        const curr: Point2D = piece.currentPosition;
        curr.x += move.moveX;
        curr.y += move.moveY;

        validPoints.push(curr);
        move.moveX += move.moveX;
        move.moveY += move.moveY;

        validPoints.push(curr);
      }
    }
    if (move.special === 'diagonalPawn') {
      let curr: Point2D = piece.currentPosition;
      curr.x += 1;
      curr.y += 1;

      validPoints.push(curr);
      curr = piece.currentPosition;
      curr.x -= 1;
      curr.y += 1;

      validPoints.push(curr);
    }
  }
  // read moveX and moveY from a Move
  // check repeating bool
  // add X to current.X and repeat for Y.
  // add new Point2D to array

  piece.validPoints = validPoints;
  // if else block to read special and apply special moves
  return await pieceRepository.save(piece);
}

async function addMove(
  x: number,
  y: number,
  repeating: boolean,
  special: string,
  piece: CustomPiece
): Promise<CustomPiece> {
  // make a new move
  const newMove = new Move();
  newMove.moveX = x;
  newMove.moveY = y;
  newMove.repeating = repeating;
  newMove.special = special;
  newMove.customPiece = piece;

  if (!piece.moves) {
    piece.moves = [newMove]; // error on this line is fine
  } else {
    piece.moves.push(newMove);
  }

  return await pieceRepository.save(piece);
}

export { addPiece, getPieceByID, interperateMoves, addMove };
