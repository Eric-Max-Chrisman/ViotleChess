import { Request, Response } from 'express';
import { getSetByName } from '../models/SetModel';

async function loadChessPage(req: Request, res: Response): Promise<void> {
  res.setHeader('X-Content-Type-Options', 'nosniff');
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
  const isDeafultSet: boolean = false;
  res.render('chessBoard.ejs', { setName, isDeafultSet });
  // send over set struc that has pieces and size inside
}

async function loadDeafulatChessPage(req: Request, res: Response): Promise<void> {
  const isDeafultSet: boolean = true;
  const setName = 'TEST';
  res.render('chessBoard.ejs', { setName, isDeafultSet });
}

export { loadChessPage, loadDeafulatChessPage };
