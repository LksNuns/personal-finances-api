import { TypeEnum } from '@/entities/transaction';
import { IsDateString, IsEnum, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  description: string;

  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsEnum(TypeEnum)
  type: TypeEnum;

  @IsNotEmpty()
  @IsDateString()
  executedAt: string;
}
