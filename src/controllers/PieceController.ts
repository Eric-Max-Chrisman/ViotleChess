import { Request, Response } from 'express';
import { addPiece, getPieceByID, interperateMoves } from '../models/PieceModels';
import { parseDatabaseError } from '../utils/db-utils';

async function createPiece(req: Request, res: Response): Promise<void> {
  const { pieceName, replaces, moves } = req.body as NewPieceRequest;

  try {
    const newPiece = await addPiece(pieceName, replaces, moves);
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

async function generateMoves(req: Request, res: Response): Promise<void> {
  const { moves, currentPosition } = req.body as MovePack;

  const validPoints = await interperateMoves(moves, currentPosition);

  // debug
  for (const point of validPoints) {
    console.log(`(${point.getX()}, ${point.getY()})`);
  }

  res.sendStatus(201).json(validPoints);
}

export { createPiece, getPieceData, generateMoves };
