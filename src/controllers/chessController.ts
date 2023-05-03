import { Request, Response } from 'express';
import { getSetByName, getAllIdsInSet } from '../models/SetModel';

async function loadChessPage(req: Request, res: Response): Promise<void> {
  // res.setHeader('X-Content-Type-Options', 'nosniff');
  // get set name
  const { setName } = req.params as SetNameTestParam;

  // load set name if exist
  const tempSet = await getSetByName(setName);

  // error and return to homepage if doesn't exist
  if (!tempSet) {
    const errorMes = "Set Doesn't exist";
    res.render('error', { errorMes });
    return;
  }

  let isNotNull: boolean = true;
  // check to see if player has all pieces
  const pieceIDs: string[] = await getAllIdsInSet(setName);
  for (let i = 0; i < pieceIDs.length; i += 1) {
    if (pieceIDs === null) {
      isNotNull = false;
    }
  }

  if (isNotNull) {
    const isDeafultSet: boolean = false;
    res.render('chessBoard.ejs', { setName, isDeafultSet });
  } else {
    const errorMes =
      "The set you are trying to use doesn't have enough pieces. Make sure you have every piece replaced.";
    res.render('error', { errorMes });
  }
}

// test code
/*
async function loadDeafulatChessPage(req: Request, res: Response): Promise<void> {
  const isDeafultSet: boolean = true;
  const setName = 'TEST';
  res.render('chessBoard.ejs', { setName, isDeafultSet });
}
*/
export { loadChessPage };
