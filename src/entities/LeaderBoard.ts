import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Relation,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Set } from './Set';

@Entity()
export class LeaderBoard {
  @Column({ unique: false })
  wins: number;

  @OneToMany(() => User, (users) => users.leaderBoards, { cascade: ['insert', 'update'] })
  users: Relation<User>;

  @ManyToOne(() => Set, (set) => set.leaderBoards, { cascade: ['insert', 'update'] })
  set: Relation<Set>;
}
