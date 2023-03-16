import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Relation,
  JoinTable,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Point2D } from './Point2D';
import { User } from './User';

@Entity()
export class CustomPiece {
  @PrimaryGeneratedColumn('uuid')
  pieceId: string;

  @Column({ unique: false })
  pieceName: string;

  @Column({ unique: false })
  pieceColor: number;

  // Possibly convert this to OneToOne Relation. Waiting on answer from Chris
  @OneToOne(() => Point2D, (point) => point.customPiece, {
    cascade: ['insert', 'update'],
  }) // Use this as starting position
  point: Relation<Point2D>;

  // This will probably need to be One to Many on this side.
  @OneToMany(() => Point2D, (point2) => point2.customPiece, { cascade: ['insert', 'update'] })
  point2: Relation<Point2D>[];

  // @Column({ unique: false })
  // piecePlacements: Point2D[];

  // Replace this with relation to User?
  @ManyToMany(() => User, (users) => users.customPieces, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  users: Relation<CustomPiece>[];
}
