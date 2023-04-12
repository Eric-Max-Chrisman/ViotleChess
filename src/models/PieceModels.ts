import { AppDataSource } from '../dataSource';
import { CustomPiece } from '../entities/CustomPiece';
import { Move } from '../entities/Moves';
import { Point2D } from '../entities/Point2D';

const pieceRepository = AppDataSource.getRepository(CustomPiece);

async function addPiece(pieceName: string, replaces: string, moves: Move[]): Promise<CustomPiece> {
  // this will eventually also take points to move to as a parameter
  // Create the new user object
  let newPiece = new CustomPiece();
  newPiece.pieceName = pieceName;
  newPiece.replaces = replaces;
  newPiece.moves = moves;

  // Then save it to the database
  // NOTES: We reassign to `newPiece` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newPiece = await pieceRepository.save(newPiece);

  return newPiece;
}

async function getPieceByID(pieceId: string): Promise<CustomPiece | null> {
  return await pieceRepository.findOne({ where: { pieceId } });
}

async function interperateMoves(moves: Move[], currentPosition: Point2D): Promise<Point2D[]> {
  // TODO
  // create an array of Point2D
  const validPoints: Point2D[] = [];
  // create a for loop that iterates over moves
  for (const move of moves) {
    if (!move.repeating) {
      const curr: Point2D = currentPosition;
      curr.setX(curr.getX() + move.moveX);
      curr.setY(curr.getY() + move.moveY);

      validPoints.push(curr);
    } else {
      for (let i = 0; i < 8; i++) {
        const curr: Point2D = currentPosition;
        curr.setX(curr.getX() + move.moveX);
        curr.setY(curr.getY() + move.moveY);

        validPoints.push(curr);
        move.moveX += move.moveX;
        move.moveY += move.moveY;

        validPoints.push(curr);
      }
    }
    if (move.special === 'diagonalPawn') {
      let curr: Point2D = currentPosition;
      curr.setX(curr.getX() + 1);
      curr.setY(curr.getY() + 1);

      validPoints.push(curr);
      curr = currentPosition;
      curr.setX(curr.getX() - 1);
      curr.setY(curr.getY() + 1);

      validPoints.push(curr);
    }
  }
  // read moveX and moveY from a Move
  // check repeating bool
  // add X to current.X and repeat for Y.
  // add new Point2D to array

  // if else block to read special and apply special moves
  return validPoints;
}

export { addPiece, getPieceByID, interperateMoves };
