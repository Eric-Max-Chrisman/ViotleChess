import { Entity, PrimaryColumn, Column, Relation, ManyToMany, OneToOne } from 'typeorm';

import { User } from './User';
import { Set } from './Set';

@Entity()
export class LeaderBoard {
  @PrimaryColumn()
  title: string;

  @Column({ unique: false })
  wins: number;

  @ManyToMany(() => User, (users) => users.leaderBoards, { cascade: ['insert', 'update'] })
  users: Relation<User>[];

  @OneToOne(() => Set, (set) => set.leaderBoard, { cascade: ['insert', 'update'] })
  set: Relation<Set>;
}
