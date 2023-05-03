import { AppDataSource } from '../dataSource';
import { CustomPiece } from '../entities/CustomPiece';
import { Move } from '../entities/Moves';
import { Point2D } from '../entities/Point2D';

const pieceRepository = AppDataSource.getRepository(CustomPiece);
async function addPiece(pieceName: string, replaces: string, userId: string): Promise<CustomPiece> {
  // Create the new piece object
  let newPiece = new CustomPiece();
  newPiece.pieceName = pieceName;
  newPiece.replaces = replaces;
  newPiece.owner = userId;

  // Then save it to the database
  // NOTES: We reassign to `newPiece` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newPiece = await pieceRepository.save(newPiece);

  return newPiece;
}

async function getPieceByID(pieceId: string): Promise<CustomPiece | null> {
  const piece = await pieceRepository
    .createQueryBuilder('piece')
    .leftJoinAndSelect('piece.moves', 'moves')
    .where('piece.pieceId = :pieceId', { pieceId })
    .getOne();
  return piece;
}

async function getPieceByName(pieceName: string, owner: string): Promise<CustomPiece | null> {
  const piece = await pieceRepository
    .createQueryBuilder('piece')
    .leftJoinAndSelect('piece.moves', 'moves')
    .where('piece.pieceName = :pieceName', { pieceName })
    .andWhere('piece.owner = owner', { owner })
    .getOne();
  return piece;
}

async function getAllPiecesByOwner(owner: string): Promise<CustomPiece[]> {
  return await pieceRepository
    .createQueryBuilder('piece')
    .leftJoinAndSelect('piece.moves', 'moves')
    .where('piece.owner = :owner', { owner })
    .getMany();
}

async function interperateMoves(
  piece: CustomPiece,
  currentX: number,
  currentY: number
): Promise<CustomPiece> {
  // TODO
  // create an array of Point2D
  const validPoints: Point2D[] = [];

  // create a for loop that iterates over moves
  // console.log(piece.currentPosition);
  for (const move of piece.moves) {
    // console.log(`moveX: ${move.moveX}`);
    // console.log(`moveY: ${move.moveY}`);
    // console.log();
    if (!move.repeating) {
      const curr = new Point2D();
      curr.x = currentX;
      curr.y = currentY;

      curr.x += move.moveX;
      curr.y += move.moveY;

      validPoints.push(curr);
    } else {
      let newX: number;
      let newY: number;
      const newMove = new Move(); // getting close :)
      newMove.moveX = move.moveX;
      newMove.moveY = move.moveY;
      newX = currentX + newMove.moveX;
      newY = currentY + newMove.moveY;

      for (let i = 0; i < 7; i += 1) {
        const curr = new Point2D();
        curr.x = newX;
        curr.y = newY;

        // console.log(`moveX: ${newMove.moveX}`);
        // console.log(`moveY: ${newMove.moveY}`);
        // console.log();

        validPoints.push(curr);

        // console.log(`currentX: ${curr.x}`);
        // console.log(`currentY: ${curr.y}`);
        // console.log();
        newX += newMove.moveX;
        newY += newMove.moveY;
      }
    }
    if (move.special === 'diagonalPawn') {
      const curr = new Point2D();
      curr.x = currentX;
      curr.y = currentY;

      curr.x += 1;
      curr.y += 1;

      validPoints.push(curr);
      curr.x -= 1;
      curr.y += 1;

      validPoints.push(curr);
    }
    if (move.special === 'square') {
      const curr = new Point2D();
      curr.x = currentX;
      curr.y = currentY;

      curr.x += 1; //(1, 1)
      curr.y += 1;

      validPoints.push(curr);
      curr.x -= 1; //(-1,1)
      curr.y += 1;

      validPoints.push(curr);

      curr.x -= 0; //(0, 1)
      curr.y += 1;

      validPoints.push(curr);

      curr.x += 1; //(1, 0)
      curr.y += 0;

      validPoints.push(curr);

      curr.x += 1; //(1, -1)
      curr.y -= 1;

      validPoints.push(curr);

      curr.x -= 0; //(0, -1)
      curr.y -= 1;

      validPoints.push(curr);

      curr.x -= 1; //(-1, -1)
      curr.y -= 1;

      validPoints.push(curr);

      curr.x -= 1; //(-1, 0)
      curr.y += 0;

      validPoints.push(curr);
    }
  }
  // read moveX and moveY from a Move
  // check repeating bool
  // add X to current.X and repeat for Y.
  // add new Point2D to array

  if (piece.pieceColor === 1) {
    // If piece is on black side
    for (let i: number = 0; i < validPoints.length; i++) {
      validPoints[i].x = validPoints[i].x * -1;
      validPoints[i].y = validPoints[i].y * -1;
    }
  }

  piece.validPoints = validPoints;
  // for (const point of piece.validPoints) {
  //   console.log(`DEBUG: (${point.x}, ${point.y})`);
  // }
  // if else block to read special and apply special moves
  return await pieceRepository.save(piece);
}

async function addMove(
  x: number,
  y: number,
  repeating: boolean,
  special: string,
  piece: CustomPiece
): Promise<CustomPiece> {
  // make a new move
  const newMove = new Move();
  newMove.moveX = x;
  newMove.moveY = y;
  newMove.repeating = !!repeating;
  if (special === null) {
    special = 'none';
  }
  newMove.special = special;
  newMove.customPiece = piece;

  if (!piece.moves) {
    piece.moves = [newMove]; // error on this line is fine
  } else {
    piece.moves.push(newMove);
  }

  return await pieceRepository.save(piece);
}

async function pieceBelongsToUser(pieceId: string, owner: string): Promise<boolean> {
  return await pieceRepository
    .createQueryBuilder('piece')
    .where('piece.pieceId = :pieceId', { pieceId })
    .andWhere('user.userId = :owner', { owner })
    .getExists();
}

async function deletePieceById(pieceId: string): Promise<void> {
  await pieceRepository
    .createQueryBuilder('piece')
    .delete()
    .where('pieceId = :pieceId', { pieceId })
    .execute();
}

export {
  addPiece,
  getPieceByID,
  interperateMoves,
  addMove,
  getPieceByName,
  getAllPiecesByOwner,
  pieceBelongsToUser,
  deletePieceById,
};
