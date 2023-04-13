import { AppDataSource } from '../dataSource';
import { Set } from '../entities/Set';

const SetRepository = AppDataSource.getRepository(Set);

// used for testing
// should return set name, array of customPieces, thoese pieces name and x and y start
async function getSetByName(setName: string): Promise<Set | null> {
  return await SetRepository.createQueryBuilder('set')
    .leftJoinAndSelect('set.customPieces', 'pieceName') // this line or the next might be wrong with point2
    .leftJoinAndSelect('customPieces.point2', 'x', 'y')
    .select(['setName'])
    .where('setName = :setName', { setName })
    .getOne();
}

export { getSetByName };
