// Dont know if well be using this yet

import {
  Entity,
  Column,
  // ManyToMany,
  Relation,
  // JoinTable,
  // OneToOne,
  // OneToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { CustomPiece } from './CustomPiece';

@Entity()
export class Move {
  @PrimaryColumn() // number of spots to move in X direction
  moveX: number;

  @Column() // number of spots to move in Y direction
  moveY: number;

  @Column()
  special: string; // This will be used to determine moves such as pawns ability to attack in diagonals while also allowing custom pieces to use the same attribute.

  @Column()
  repeating: boolean; // when true, this move will be added 8 times to cover the whole board. each iteration will add previous point generated plus x and y

  @ManyToOne(() => CustomPiece, (customPiece) => customPiece.moves, {
    // relation to CustomPiece. Many moves to one custom piece
    cascade: ['insert', 'update'],
  })
  customPiece: Relation<CustomPiece>;
}
