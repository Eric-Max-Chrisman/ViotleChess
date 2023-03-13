import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
import { User } from './User';
import { Set } from './Set';

@Entity()
export class LeaderBoard {
  @Column({ unique: false })
  wins: number;

  // ToDo
  // @OneToOne user
}
