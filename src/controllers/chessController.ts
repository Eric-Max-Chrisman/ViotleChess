import { Request, Response } from 'express';

async function loadChessPage(req: Request, res: Response):Promise<void> {
    res.render('chessBoard.ejs', {});
}

export { loadChessPage };
