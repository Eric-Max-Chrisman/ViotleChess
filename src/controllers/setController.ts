import { Request, Response } from 'express';
import { parseDatabaseError } from '../utils/db-utils';
import { getSetByName, getSetById, addPieceToSet, createSet, getAllSetsByOwner } from '../models/SetModel';
import { getPieceByID } from '../models/PieceModels'
import {getUserByUsername} from '../models/UserModel'
import { getAllPiecesByOwner } from '../models/PieceModels'
// import { Set } from '../entities/Set';

async function getSetWithName(req: Request, res: Response): Promise<void> {
  const { setName } = req.params as SetNameTestParam;

  const set = await getSetByName(setName);
  console.log(setName);

  if (!set) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(200);
}

async function getSetWithId(req: Request, res: Response): Promise<void> {
  const { setId } = req.params as SetIdParam;

  const set = await getSetById(setId);
  console.log(setId);
  console.log(set);

  if (!set) {
    res.sendStatus(404);
    return;
  }

  const replacesPawn = await getPieceByID(set.replacesPawn);
  const replacesRook = await getPieceByID(set.replacesRook);
  const replacesKnight = await getPieceByID(set.replacesKnight);
  const replacesBishop = await getPieceByID(set.replacesBishop);
  const replacesKing = await getPieceByID(set.replacesKing);
  const replacesQueen = await getPieceByID(set.replacesQueen);
  res.render('editSet.ejs', { set, replacesPawn, replacesRook, replacesKnight, replacesBishop, replacesKing, replacesQueen });
}

async function getAllWithOwner(req: Request, res: Response): Promise<void> {
  const ownerId = req.session.authenticatedUser.userId;

  const set = await getAllSetsByOwner(ownerId);
  console.log(ownerId);
  console.log(set);

  if (!set) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(200);
}



async function createNewSet(req: Request, res: Response): Promise<void> {
  const { setName } = req.body as NewSetRequest;
  const ownerId = req.session.authenticatedUser.userId;
  const { userName } = req.params as UsernameParam;


  const tempUser = await getUserByUsername(userName);
  const sets = await getAllSetsByOwner(ownerId);
  const pieces = await getAllPiecesByOwner(ownerId);

  if (!req.session.isLoggedIn) {
    res.redirect('/login');
    return;
  }
  try {
    const newSet = await createSet(ownerId, setName);
    console.log(newSet);
    res.render('userPage.ejs', { tempUser, sets, pieces});
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function addNewPieceToSet (req: Request, res: Response): Promise<void>{
  const { setId } = req.params as SetIdParam;
  const { pieceName } = req.body as PieceNameRequest;
  const pieceOwner = req.session.authenticatedUser.userId;
  console.log(setId);

  const set = await addPieceToSet(pieceName, setId, pieceOwner);

  const replacesPawn = await getPieceByID(set.replacesPawn);
  const replacesRook = await getPieceByID(set.replacesRook);
  const replacesKnight = await getPieceByID(set.replacesKnight);
  const replacesBishop = await getPieceByID(set.replacesBishop);
  const replacesKing = await getPieceByID(set.replacesKing);
  const replacesQueen = await getPieceByID(set.replacesQueen);
  res.render('editSet.ejs', { set, replacesPawn, replacesRook, replacesKnight, replacesBishop, replacesKing, replacesQueen });
}

async function redirectToSet(req: Request, res: Response): Promise<void>{
  res.render('addSet.ejs');
}

export { getSetWithName, getSetWithId, createNewSet, getAllWithOwner, addNewPieceToSet, redirectToSet };
