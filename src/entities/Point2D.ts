import { Entity, Column, Relation, OneToOne, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomPiece } from './CustomPiece';

@Entity()
class Point2D {
  @PrimaryGeneratedColumn('uuid')
  PositionId: string;

  @Column()
  x: number;

  @Column()
  y: number;

  // @OneToOne(() => CustomPiece, (customPiece) => customPiece.validPoints) // Use this as starting position
  // customPiece: Relation<CustomPiece>;

  @ManyToOne(() => CustomPiece, (customPiece) => customPiece.validPoints, {
    cascade: ['insert', 'update'],
  })
  customPiece: Relation<CustomPiece>; // Relation handles moves

  @ManyToOne(() => CustomPiece, (customPiece2) => customPiece2.users, {
    cascade: ['insert', 'update'],
  })
  customPiece2: Relation<CustomPiece>[];

  @OneToOne(() => CustomPiece, (position) => position.currentPosition)
  position: Relation<CustomPiece>;
}

export { Point2D };
