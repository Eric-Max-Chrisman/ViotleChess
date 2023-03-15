import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, OneToMany } from 'typeorm';
import { User } from './User';
import { LeaderBoard } from './LeaderBoard';
import { CustomPiece } from './CustomPiece';

@Entity()
export class Set {
  @PrimaryGeneratedColumn('uuid')
  setId: string;

  @Column({ unique: false })
  setName: string;

  @ManyToOne(() => User, (user) => user.set, { cascade: ['insert', 'update'])
  user: Relation<User>;

  @OneToMany(() => LeaderBoard, (leaderBoard) => leaderBoard.set, { cascade: ['insert', 'update'])
  leaderBoards: Relation<LeaderBoard>[];

  @OneToMany(() => CustomPiece, (customPiece) => customPiece.set, { cascade: ['insert', 'update'])
  customPieces: Relation<CustomPiece>[];
}
