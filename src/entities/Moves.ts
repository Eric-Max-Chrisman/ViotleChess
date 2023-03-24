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
  PrimaryColumn
} from 'typeorm';

import { Point2D } from './Point2D';
import { User } from './User';
import { CustomPiece } from './CustomPiece';

@Entity()
export class Move{
  @PrimaryColumn()
  moveName: string;

  @Column()
  newPosition: Point2D;

  @Column

}
