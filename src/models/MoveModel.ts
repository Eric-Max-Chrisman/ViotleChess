import { AppDataSource } from '../dataSource';
import { Move } from '../entities/Moves';

const moveRepository = AppDataSource.getRepository(Move);

async function updateMove(move: Move, newX: number, newY: number, repeating: boolean): Promise<Move>{
  const newMove = new Move();
  newMove.moveX = newX;
  newMove.moveY = newY;
  newMove.repeating = repeating;

  console.log(newX);
  console.log(newY);
  console.log(repeating);

  await moveRepository.createQueryBuilder()
  .update(Move)
  .set({moveX: newX})
  .set({moveY: newY})
  .set({repeating: repeating})
  .where({moveId: move.moveId})
  .execute();

  return newMove;
}

async function getMoveById(moveId: string): Promise<Move | null>{
  return await moveRepository.createQueryBuilder('move')
  .where('move.moveId = :moveId', { moveId })
  .getOne();
}


export {updateMove, getMoveById};
