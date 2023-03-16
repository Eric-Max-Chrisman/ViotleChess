import { AppDataSource } from '../dataSource';
import { CustomPiece } from '../entities/CustomPiece';

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

export { addPiece, getPieceByID };
