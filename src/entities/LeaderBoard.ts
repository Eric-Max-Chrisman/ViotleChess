import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
import { User } from './User';
import { Set } from './Set';

@Entity()
export class LeaderBoard {
  @Column({ unique: false })
  wins: number;

  @OneToMany(() => User, (user) => user.leaderBoards, { cascade: ['insert', 'update'])})
  user: Relation<User>;
  
  @ManyToOne(() => Set, (set) => set.leaderBoards, { cascade: ['insert', 'update']})
  set: Relation<Set>;
   
}
