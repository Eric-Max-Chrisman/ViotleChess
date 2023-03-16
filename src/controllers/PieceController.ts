import { Request, Response } from 'express';
import { addPiece, getPieceByID } from '../models/PieceModels';
import { parseDatabaseError } from '../utils/db-utils';

async function createPiece(req: Request, res: Response): Promise<void> {
  const { pieceName, pieceColor } = req.body as NewPieceRequest;

  try {
    const newPiece = await addPiece(pieceName, pieceColor);
    console.log(newPiece);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getPieceData(req: Request, res: Response): Promise<void> {
  const { pieceId } = req.params as PieceId;
  const piece = await getPieceByID(pieceId);

  if (!piece) {
    res.sendStatus(404); // Not Found
    return;
  }
  console.log(piece);
  res.sendStatus(200);
}

export { createPiece, getPieceData };
