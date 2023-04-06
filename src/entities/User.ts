import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, ManyToMany } from 'typeorm';

import { LeaderBoard } from './LeaderBoard';
import { Set } from './Set';
import { CustomPiece } from './CustomPiece';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  passwordHash: string;

  @OneToMany(() => Set, (set) => set.user, { cascade: ['insert', 'update'] })
  sets: Relation<Set>[];

  @ManyToMany(() => LeaderBoard, (leaderBoard) => leaderBoard.users, {
    cascade: ['insert', 'update'],
  })
  leaderBoards: Relation<LeaderBoard>[];

  @ManyToMany(() => CustomPiece, (customPieces) => customPieces.users, {
    cascade: ['insert', 'update'],
  })
  customPieces: Relation<User>[];
}
