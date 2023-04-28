import { AppDataSource } from '../dataSource';
import { Set } from '../entities/Set';
// import { User } from '../entities/User';
// import { CustomPiece } from '../entities/CustomPiece';
import { getPieceByID } from './PieceModels';
import { getUserById } from './UserModel';

const SetRepository = AppDataSource.getRepository(Set);

// used for testing
// should return set name, array of customPieces, thoese pieces name and x and y start
async function getSetByName(setName: string): Promise<Set | null> {
  return await SetRepository.createQueryBuilder('set')
    .where('set.setName = :setName', { setName })
    // .select(['set.replacesPawn', 'set.replacesRook', 'set.replacesKnight', 'set.replacesBishop', 'set.replacesKing', 'set.replacesQueen'])
    .getOne();
}

async function getSetById(setId: string): Promise<Set | null> {
  return await SetRepository.createQueryBuilder('set')
    // .leftJoinAndSelect('set.customPieces', 'pieceName') // this line or the next might be wrong with point2
    // .leftJoinAndSelect('customPieces.point2', 'x', 'y')
    // .select(['setName'])
    .where('set.setId = :setId', { setId })
    .getOne();
}

async function createSet(ownerId: string, setName: string): Promise<Set> {
  const newSet = new Set();
  newSet.ownerId = ownerId;
  newSet.setName = setName;
  newSet.user = await getUserById(ownerId);
  return await SetRepository.save(newSet);
}

async function addPieceToSet(pieceId: string, setId: string): Promise<Set> {
  const set = await getSetById(setId);
  const piece = await getPieceByID(pieceId);

  if(piece.replaces === 'pawn' || piece.replaces === 'Pawn'){
    set.replacesPawn = pieceId;
  }
  else if(piece.replaces === 'rook' || piece.replaces === 'Rook'){
    set.replacesRook = pieceId;
  }
  else if(piece.replaces === 'knight' || piece.replaces === 'Knight'){
    set.replacesKnight = pieceId;
  }
  else if(piece.replaces === 'bishop' || piece.replaces === 'Bishop'){
    set.replacesBishop = pieceId;
  }
  else if(piece.replaces === 'king' || piece.replaces === 'King'){
    set.replacesKing = pieceId;
  }
  else if(piece.replaces === 'queen' || piece.replaces === 'Queen'){
    set.replacesQueen = pieceId;
  }
  await SetRepository.save(set);
}

export { getSetByName, createSet, getSetById, addPieceToSet };
