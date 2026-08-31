import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  IsNumber,
  IsUrl,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CharacterClass } from '../character.entity';

export class UpdateCharacterDto {
  @ApiProperty({ example: 'MiGuerrero', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    enum: CharacterClass,
    example: CharacterClass.WARRIOR,
    required: false,
  })
  @IsOptional()
  @IsEnum(CharacterClass)
  class?: CharacterClass;

  @ApiProperty({ example: 62, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(70)
  level?: number;

  @ApiProperty({ example: 1000000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  experience?: number;

  @ApiProperty({ example: 'Season', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  seasonCharacter?: string;

  @ApiProperty({ example: 6500, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  gearScore?: number;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  avatarUrl?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
