import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateKnowledgeProgressDto {
  @IsBoolean()
  obtained: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;
}