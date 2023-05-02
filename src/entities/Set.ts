import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './User';
import { LeaderBoard } from './LeaderBoard';
import { CustomPiece } from './CustomPiece';

@Entity()
export class Set {
  @PrimaryGeneratedColumn('uuid')
  setId: string;

  @Column({ unique: false })
  setName: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (user) => user.sets, { cascade: ['insert', 'update'] })
  user: Relation<User>;

  @OneToOne(() => LeaderBoard, (leaderBoard) => leaderBoard.set, { cascade: ['insert', 'update'] })
  leaderBoard: Relation<LeaderBoard>;

  // @OneToMany(() => CustomPiece, (customPiece) => customPiece.set, { cascade: ['insert', 'update'] })
  // customPieces: Relation<CustomPiece>[];

  // Use piece Ids in these spots
  @Column({ nullable: true })
  replacesPawn: string;

  @Column({ nullable: true })
  replacesRook: string;

  @Column({ nullable: true })
  replacesKnight: string;

  @Column({ nullable: true })
  replacesBishop: string;

  @Column({ nullable: true })
  replacesKing: string;

  @Column({ nullable: true })
  replacesQueen: string;
}
