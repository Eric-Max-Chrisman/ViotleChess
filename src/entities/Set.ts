import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { User } from './Book';

@Set()
export class Set {
  @PrimaryGeneratedColumn('uuid')
  setId: string;

  @Column({ unique: false })
  setName: string;

  @ManyToOne(() => Set, (set) => set, { cascade: true })
  user: Relation<User>;
}
