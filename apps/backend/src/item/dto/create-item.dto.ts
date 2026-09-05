import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ItemGrade } from '../item.entity';
import { IsEnum } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  categoryId: string;

  @IsEnum(ItemGrade)
  @IsOptional()
  grade?: ItemGrade;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(20)
  @IsOptional()
  enhancementLevel?: number;

  @IsUrl()
  @IsOptional()
  iconUrl?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}
