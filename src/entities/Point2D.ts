// ToDo
import { Entity, Column, PrimaryColumn, Relation, OneToOne, ManyToOne } from 'typeorm';
import { CustomPiece } from './CustomPiece';

@Entity()
class Point2D {
  @PrimaryColumn()
  private x: number;

  @Column()
  private y: number;

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

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setX(newX: number): void {
    this.x = newX;
  }

  setY(newY: number): void {
    this.y = newY;
  }
}

export { Point2D };
