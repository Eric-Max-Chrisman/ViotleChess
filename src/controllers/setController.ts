import { Request, Response } from 'express';
import { parseDatabaseError } from '../utils/db-utils';
import { getSetByName, getSetById, addPieceToSet, createSet } from '../models/SetModel';
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

  res.sendStatus(200);
}

async function createNewSet(req: Request, res: Response): Promise<void> {
  const { setName } = req.body as NewSetRequest;
  const ownerId = req.session.authenticatedUser.userId;

  if (!req.session.isLoggedIn) {
    res.redirect('/login');
    return;
  }
  try {
    const newSet = await createSet(ownerId, setName);
    console.log(newSet);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { getSetWithName, getSetWithId, createNewSet };
