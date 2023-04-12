import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Relation,
  JoinTable,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Point2D } from './Point2D';
import { User } from './User';
import { Set } from './Set';
import { Move } from './Moves';

@Entity()
export class CustomPiece {
  @PrimaryGeneratedColumn('uuid')
  pieceId: string;

  // constructor(pieceName: string, start: Point2D, moveSet: Array<Point2D>) {
  //   this.pieceName = pieceName;
  //   this.point = start;
  //   this.point2 = moveSet;
  // }

  @Column({ unique: false })
  pieceName: string;

  @Column({ unique: false })
  pieceColor: number;

  // Possibly convert this to OneToOne Relation.
  // replaces the starting positions of defalt piece. ex if replaces === 'pawn', the custom piece will start in all places a pawn would.
  @Column()
  replaces: string;

  // This will probably need to be One to Many on this side.
  @OneToMany(() => Point2D, (point2) => point2.customPiece2, { cascade: ['insert', 'update'] })
  point2: Relation<Point2D>[];

  currentPosition: Point2D;

  getCurrent(): Point2D {
    return this.currentPosition;
  }

  setCurrent(newPosition: Point2D): void {
    this.currentPosition = newPosition;
  }

  // @Column({ unique: false })
  // piecePlacements: Point2D[];

  @ManyToMany(() => User, (users) => users.customPieces, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  users: Relation<CustomPiece>[];

  @ManyToOne(() => Set, (set) => set.customPieces, { cascade: ['insert', 'update'] })
  set: Relation<Set>;

  @OneToMany(() => Move, (moves) => moves.customPiece, { cascade: ['insert', 'update'] })
  moves: Relation<Move>[];
}
