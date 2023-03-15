import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Relation } from 'typeorm';
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

  @OneToMany(() => Set, (set) => set.users, {cascade: ['insert', 'update']})
  set: Relation<Set>;
  
  @ManyToOne (() => LederBoard, (leaderBoard) => leaderBoard.user, {cascade: ['insert', 'update']})
  leaderBoards: Relation<LeaderBoard[]>;
}
