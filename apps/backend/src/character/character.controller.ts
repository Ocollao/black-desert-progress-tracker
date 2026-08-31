import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './character.entity';

@ApiTags('characters')
@Controller('characters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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
    @Request() req: { user: { id: string } },
  ): Promise<Character> {
    return this.characterService.create(createCharacterDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all characters for current user' })
  @ApiResponse({
    status: 200,
    description: 'List of characters',
    type: [Character],
  })
  async findAll(
    @Request() req: { user: { id: string } },
  ): Promise<Character[]> {
    return this.characterService.findByUserId(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get character by ID' })
  @ApiResponse({ status: 200, description: 'Character found', type: Character })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your character' })
  async findOne(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
  ): Promise<Character> {
    const character = await this.characterService.findById(id);
    if (character.userId !== req.user.id) {
      throw new ForbiddenException('You can only access your own characters');
    }
    return character;
  }

  @Patch(':id')
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
    @Request() req: { user: { id: string } },
  ): Promise<Character> {
    return this.characterService.update(id, req.user.id, updateCharacterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete character' })
  @ApiResponse({ status: 204, description: 'Character deleted' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your character' })
  async remove(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
  ): Promise<void> {
    return this.characterService.delete(id, req.user.id);
  }
}
