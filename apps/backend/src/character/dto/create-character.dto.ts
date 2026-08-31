import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CharacterClass } from '../character.entity';

export class CreateCharacterDto {
  @ApiProperty({ example: 'MiGuerrero' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ enum: CharacterClass, example: CharacterClass.WARRIOR })
  @IsEnum(CharacterClass)
  class: CharacterClass;

  @ApiProperty({ example: 'Season', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  seasonCharacter?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  avatarUrl?: string;
}
