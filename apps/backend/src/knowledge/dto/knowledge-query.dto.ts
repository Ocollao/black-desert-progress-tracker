import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class KnowledgeQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsIn(['all', 'obtained', 'pending', 'blocked'])
  @IsOptional()
  status: 'all' | 'obtained' | 'pending' | 'blocked' = 'all';

  @IsUUID()
  @IsOptional()
  themeId?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  includeChildren = true;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(60)
  @IsOptional()
  limit = 24;
}
