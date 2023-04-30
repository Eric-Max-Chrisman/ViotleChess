import { Request, Response } from 'express';
import { getSetByName } from '../models/SetModel';

async function loadChessPage(req: Request, res: Response): Promise<void> {
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

  res.render('chessBoard.ejs', { tempSet, setName });
  // send over set struc that has pieces and size inside
}

async function loadDeafulatChessPage(req: Request, res: Response): Promise<void> {
  const isDeafultSet: boolean = true;
  res.render('chessBoard.ejs', { isDeafultSet });
}

export { loadChessPage, loadDeafulatChessPage };
