import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
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

  @ManyToMany(() => CustomPiece, (customPieces) => customPieces.users, {
    cascade: ['insert', 'update'],
  })
  customPieces: Relation<CustomPiece>[];
  // TODO
  // @OneToOne LeaderBoard
  // @OneToMany Set
}
