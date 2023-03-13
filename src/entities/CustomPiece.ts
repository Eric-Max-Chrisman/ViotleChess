import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';
import { Point2D } from './Point2D';
import { PieceOwner } from './PieceOwner';
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
  @Column({ unique: false }) // Use this as starting position
  piecePosition: Point2D;

  // This will probably need to be One to Many on this side.
  @Column({ unique: false })
  piecePlacements: Point2D[];

  // Replace this with relation to User?
  @ManyToMany(() => User, (user) => user.customPiece, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  user: Relation<CustomPiece>[];
}
