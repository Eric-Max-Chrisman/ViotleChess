import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LeaderBoard } from './LeaderBoard';
import { Set } from './Set';

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
  
  //TODO
  //@OneToOne LeaderBoard
  //@OneToMany Set
}
