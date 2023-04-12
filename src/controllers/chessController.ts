import { Request, Response } from 'express';

async function loadChessPage(req: Request, res: Response): Promise<void> {
  // get set name
  // load set name if exist
  // error and return to homepage if doesn't exist
  res.render('chessBoard.ejs', {
    /* set */
  }); // send over set struc that has pieces and size inside
}

export { loadChessPage };
