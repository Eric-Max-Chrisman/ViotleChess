import { Request, Response } from 'express';
import {
  addPiece,
  getPieceByID,
  interperateMoves,
  addMove,
  pieceBelongsToUser,
  deletePieceById,
  getAllPiecesByOwner,
} from '../models/PieceModels';
import { parseDatabaseError } from '../utils/db-utils';
import { getUserById } from '../models/UserModel';
import { getAllSetsByOwner } from '../models/SetModel';
import { CustomPiece } from '../entities/CustomPiece';
import { updateMove, getMoveById } from '../models/MoveModel'
// import { Point2D } from '../entities/Point2D';

async function createPiece(req: Request, res: Response): Promise<void> {
  const { pieceName, replaces } = req.body as NewPieceRequest;
  const { userId } = req.session.authenticatedUser as UserIdParam;

  try {
    const newPiece = await addPiece(pieceName, replaces, userId);
    console.log(newPiece);
    res.redirect(`/piece/view/${newPiece.pieceId}`);
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
  res.json(piece);
}

async function getPieceDataSockets(pieceId: string): Promise<CustomPiece | null> {
  const piece: CustomPiece = await getPieceByID(pieceId);

  console.log(piece);
  return piece;
}

async function generateMoves(req: Request, res: Response): Promise<void> {
  const { pieceId } = req.params as PieceId;
  const { currentX, currentY } = req.body as MovePieceRequest;
  const piece = await getPieceByID(pieceId);
  const newPiece = await interperateMoves(piece, currentX, currentY);

  res.status(201).json(newPiece);
}

async function addNewMove(req: Request, res: Response): Promise<void> {
  const { x, y, repeating, special } = req.body as NewMoveReq;
  const { pieceId } = req.params as PieceId;
  const { userId } = req.session.authenticatedUser;
  let piece = await getPieceByID(pieceId);
  console.log(piece);

  if (!req.session.isLoggedIn) {
    res.redirect('/login'); // send user to login to add moves
    return;
  }
  console.log(`Owner: ${piece.owner}`);
  if (userId !== piece.owner) {
    res.sendStatus(403); // users cannot edit pieces they dont own
    return;
  }

  piece = await addMove(x, y, repeating, special, piece);
  console.log(piece);

  // replace with redirect to Custom Piece viewing page
  res.render('addMoves.ejs', { piece });
}

async function redirectMovePage(req: Request, res: Response): Promise<void> {
  const { pieceId } = req.params as PieceId;
  const piece = await getPieceByID(pieceId);

  if (!piece) {
    console.log('NoPieceFound');
    return;
  }
  console.log(piece);

  res.render(`addMoves.ejs`, { piece });
}

async function displayPiece(req: Request, res: Response): Promise<void> {
  const { pieceId } = req.params as PieceId;
  const piece = await getPieceByID(pieceId);

  res.render('viewPiece.ejs', { piece });
}

async function deleteUserPiece(req: Request, res: Response): Promise<void> {
  const { isLoggedIn } = req.session;
  const ownerId = req.session.authenticatedUser.userId;
  const { pieceId } = req.params as PieceId;
  const piece = await getPieceByID(pieceId);
  const user = await getUserById(ownerId);
  const sets = await getAllSetsByOwner(ownerId);
  const pieces = await getAllPiecesByOwner(ownerId);
  console.log(pieceId);

  if (!isLoggedIn) {
    res.redirect('/login');
    return;
  }

  if (user.userId !== piece.owner) {
    res.sendStatus(403);
    return;
  }

  await deletePieceById(pieceId);

  res.render('userPage.ejs', { user, sets, pieces });
}

async function updateMoveData(req: Request, res: Response): Promise<void>{
  const user = req.session.authenticatedUser;
  const {moveId} = req.params as MoveIdRequest;
  const { newX, newY, repeating } = req.body as NewMoveRequest;
  const move = await getMoveById(moveId);
  await updateMove(move, newX, newY, !!repeating);

  res.redirect(`/users/${user.userName}`);
}

async function displayMoveEditor(req: Request, res: Response): Promise<void>{
  const { moveId } = req.params as MoveIdRequest;
  const move = await getMoveById(moveId);
  res.render('updateMove.ejs', { move });
}

export {
  createPiece,
  getPieceData,
  generateMoves,
  addNewMove,
  redirectMovePage,
  displayPiece,
  deleteUserPiece,
  getPieceDataSockets,
  updateMoveData,
  displayMoveEditor
};
