import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
import { CustomPiece } from './CustomPiece';
import { Set } from './Set';

@Entity()
export class PieceOwner {
//ToDo
   //@ManyToMany setId
   //@ManyToMany pieceId
}
