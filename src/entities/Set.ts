import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { User } from './User';
import { LeaderBoard } from './LeaderBoard';

// @Set()
@Entity()
export class Set {
  @PrimaryGeneratedColumn('uuid')
  setId: string;

  @Column({ unique: false })
  setName: string;

  @ManyToOne(() => Set, (set) => set.user, { cascade: true }) // needs edit
  user: Relation<User>;

  ToDO;

  @OneToMany Leaderboard;
}
