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
  @ApiOperation({ summary: 'Crear un personaje nuevo' })
  @ApiResponse({
    status: 201,
    description: 'Personaje creado',
    type: Character,
  })
  @ApiResponse({ status: 409, description: 'Nombre de personaje en uso' })
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
    @Request() req: { user: { id: string } },
  ): Promise<Character> {
    return this.characterService.create(createCharacterDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los personajes del usuario actual' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personajes',
    type: [Character],
  })
  async findAll(
    @Request() req: { user: { id: string } },
  ): Promise<Character[]> {
    return this.characterService.findByUserId(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener personaje por ID' })
  @ApiResponse({ status: 200, description: 'Personaje encontrado', type: Character })
  @ApiResponse({ status: 404, description: 'Personaje no encontrado' })
  @ApiResponse({ status: 403, description: 'Prohibido: no es tu personaje' })
  async findOne(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
  ): Promise<Character> {
    const character = await this.characterService.findById(id);
    if (character.userId !== req.user.id) {
      throw new ForbiddenException('Solo puedes acceder a tus propios personajes');
    }
    return character;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar personaje' })
  @ApiResponse({
    status: 200,
    description: 'Personaje actualizado',
    type: Character,
  })
  @ApiResponse({ status: 404, description: 'Personaje no encontrado' })
  @ApiResponse({ status: 403, description: 'Prohibido: no es tu personaje' })
  @ApiResponse({ status: 409, description: 'Nombre de personaje en uso' })
  async update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @Request() req: { user: { id: string } },
  ): Promise<Character> {
    return this.characterService.update(id, req.user.id, updateCharacterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar personaje' })
  @ApiResponse({ status: 204, description: 'Personaje eliminado' })
  @ApiResponse({ status: 404, description: 'Personaje no encontrado' })
  @ApiResponse({ status: 403, description: 'Prohibido: no es tu personaje' })
  async remove(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
  ): Promise<void> {
    return this.characterService.delete(id, req.user.id);
  }
}
