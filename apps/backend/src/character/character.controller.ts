import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CharacterService } from './character.service';
import type {
  CreateCharacterDto,
  UpdateCharacterDto,
} from './character.service';
import { Character } from './character.entity';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new character' })
  @ApiResponse({
    status: 201,
    description: 'Character created',
    type: Character,
  })
  @ApiResponse({ status: 409, description: 'Character name already taken' })
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
  ): Promise<Character> {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter by user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of characters',
    type: [Character],
  })
  async findAll(@Query('userId') userId?: string): Promise<Character[]> {
    if (userId) {
      return this.characterService.findByUserId(userId);
    }
    return this.characterService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get character by ID' })
  @ApiResponse({ status: 200, description: 'Character found', type: Character })
  @ApiResponse({ status: 404, description: 'Character not found' })
  async findOne(@Param('id') id: string): Promise<Character> {
    return this.characterService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update character' })
  @ApiResponse({
    status: 200,
    description: 'Character updated',
    type: Character,
  })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your character' })
  @ApiResponse({ status: 409, description: 'Character name already taken' })
  async update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @Query('userId') userId: string,
  ): Promise<Character> {
    return this.characterService.update(id, userId, updateCharacterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete character' })
  @ApiResponse({ status: 204, description: 'Character deleted' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your character' })
  async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    return this.characterService.delete(id, userId);
  }
}
