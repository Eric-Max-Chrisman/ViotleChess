import { Request, Response } from 'express';
// import { parseDatabaseError } from '../utils/db-utils';
import { getSetByName, getSetById, addPieceToSet, createSet } from '../models/SetModel';
// import { Set } from '../entities/Set';

async function getSetWithName(req: Request, res: Response): Promise<void> {
  const { setName } = req.params as SetNameTestParam;

  const set = await getSetByName(setName);

  if (!set) {
    res.sendStatus(404);
  }

  res.sendStatus(201);
}

async function getSetWithId(req: Request, res: Response): Promise<void> {
  const { setId } = req.body as SetIdParam;

  const set = await getSetById(setId);

  if (!set) {
    res.sendStatus(404);
  }

  res.sendStatus(201);
}

async function createNewSet(req: Request, res: Response): Promise<void> {
  const { setName } = req.body as NewSetRequest;
  const ownerId = req.session.authenticatedUser.userId;

  if (!req.session.isLoggedIn) {
    res.redirect('/login');
    return;
  }

  const newSet = await createSet(ownerId, setName);

  res.sendStatus(201);
}

export { getSetWithName, getSetWithId, createNewSet };
