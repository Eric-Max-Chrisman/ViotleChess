import { AppDataSource } from '../dataSource';
import { Set } from '../entities/Set';
// import { User } from '../entities/User';
import { CustomPiece } from '../entities/CustomPiece';
import { getUserById } from './UserModel';

const SetRepository = AppDataSource.getRepository(Set);

// used for testing
// should return set name, array of customPieces, thoese pieces name and x and y start
async function getSetByName(setName: string): Promise<Set | null> {
  return await SetRepository.createQueryBuilder('set')
    .leftJoinAndSelect('set.customPieces', 'customPieces') // this line or the next might be wrong with point2
    .select(['setName'])
    .where('setName == :setName', { setName })
    .getOne();
}

async function getSetById(setId: string): Promise<Set | null> {
  return await SetRepository.createQueryBuilder('set')
    .leftJoinAndSelect('set.customPieces', 'pieceName') // this line or the next might be wrong with point2
    .leftJoinAndSelect('customPieces.point2', 'x', 'y')
    .select(['setName'])
    .where('setId = :setId', { setId })
    .getOne();
}

async function createSet(ownerId: string, setName: string): Promise<Set> {
  const newSet = new Set();
  newSet.ownerId = ownerId;
  newSet.setName = setName;
  newSet.user = await getUserById(ownerId);
  return await SetRepository.save(newSet);
}

async function addPieceToSet(piece: CustomPiece, setId: string): Promise<Set> {
  const set = await getSetById(setId);
  if (!set.customPieces) {
    set.customPieces = [piece];
  } else {
    set.customPieces.push(piece);
  }

  await SetRepository.save(set);
}

export { getSetByName, createSet, getSetById, addPieceToSet };
