import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CharacterRepository } from './character.repository';
import { Character } from './character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharacterService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async create(
    createCharacterDto: CreateCharacterDto,
    userId: string,
  ): Promise<Character> {
    const nameExists = await this.characterRepository.existsByName(
      createCharacterDto.name,
    );
    if (nameExists) {
      throw new ConflictException('Character name already taken');
    }

    const character = await this.characterRepository.create({
      ...createCharacterDto,
      userId,
      level: 1,
      experience: 0,
      gearScore: 0,
      isActive: true,
    });

    return character;
  }

  async findById(id: string): Promise<Character> {
    const character = await this.characterRepository.findById(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character;
  }

  async findByUserId(userId: string): Promise<Character[]> {
    return this.characterRepository.findByUserId(userId);
  }

  async findAll(): Promise<Character[]> {
    return this.characterRepository.findAll();
  }

  async update(
    id: string,
    userId: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    const character = await this.findById(id);

    if (character.userId !== userId) {
      throw new ForbiddenException('You can only update your own characters');
    }

    if (updateCharacterDto.name && updateCharacterDto.name !== character.name) {
      const nameExists = await this.characterRepository.existsByName(
        updateCharacterDto.name,
      );
      if (nameExists) {
        throw new ConflictException('Character name already taken');
      }
    }

    const updatedCharacter = await this.characterRepository.update(
      id,
      updateCharacterDto,
    );
    if (!updatedCharacter) {
      throw new NotFoundException('Character not found after update');
    }
    return updatedCharacter;
  }

  async delete(id: string, userId: string): Promise<void> {
    const character = await this.findById(id);

    if (character.userId !== userId) {
      throw new ForbiddenException('You can only delete your own characters');
    }

    await this.characterRepository.delete(id);
  }

  async updateGearScore(
    id: string,
    userId: string,
    gearScore: number,
  ): Promise<Character> {
    return this.update(id, userId, { gearScore });
  }

  async updateLevel(
    id: string,
    userId: string,
    level: number,
    experience: number,
  ): Promise<Character> {
    return this.update(id, userId, { level, experience });
  }
}
