import { AppDataSource } from '../dataSource';
import { CustomPiece } from '../entities/CustomPiece';
import { Move } from '../entities/Moves';
import { Point2D } from '../entities/Point2D';

const pieceRepository = AppDataSource.getRepository(CustomPiece);

async function addPiece(pieceName: string, pieceColor: number): Promise<CustomPiece> {
  // this will eventually also take points to move to as a parameter
  // Create the new user object
  let newPiece = new CustomPiece();
  newPiece.pieceName = pieceName;
  newPiece.pieceColor = pieceColor;

  // Then save it to the database
  // NOTES: We reassign to `newPiece` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newPiece = await pieceRepository.save(newPiece);

  return newPiece;
}

async function getPieceByID(pieceId: string): Promise<CustomPiece | null> {
  return await pieceRepository.findOne({ where: { pieceId } });
}

/* async function interperateMoves(moves: Move[], currentPosition: Point2D): Promise<Point2D[]>{
  //TODO
  //create an array of Point2D
  //create a for loop that iterates over moves
    //read moveX and moveY from a Move
    //check repeating bool
    //add X to current.X and repeat for Y.
    //add new Point2D to array

  //if else block to read special and apply special moves

  return array of Point2D
} */

export { addPiece, getPieceByID };
