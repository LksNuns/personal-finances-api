import { IsNotEmpty, IsPositive } from 'class-validator';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TypeEnum {
  income = 'income',
  outcome = 'outcome',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @IsPositive()
  @Column('decimal', { precision: 5, scale: 2 })
  value: number;

  @IsNotEmpty()
  @Column('enum', { enum: TypeEnum })
  type: TypeEnum;

  @IsNotEmpty()
  @Column({ type: 'date' })
  executed_at: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
