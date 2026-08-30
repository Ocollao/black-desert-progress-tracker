import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsRelations } from 'typeorm';
import { Character } from './character.entity';

const characterRelations: FindOptionsRelations<Character> = {
  user: true,
};

@Injectable()
export class CharacterRepository {
  constructor(
    @InjectRepository(Character)
    private readonly repository: Repository<Character>,
  ) {}

  async findById(id: string): Promise<Character | null> {
    return this.repository.findOne({
      where: { id },
      relations: characterRelations,
    });
  }

  async findByUserId(userId: string): Promise<Character[]> {
    return this.repository.find({
      where: { userId, isActive: true },
      relations: characterRelations,
      order: { createdAt: 'DESC' },
    });
  }

  async findByName(name: string): Promise<Character | null> {
    return this.repository.findOne({ where: { name } });
  }

  async findAll(): Promise<Character[]> {
    return this.repository.find({
      where: { isActive: true },
      relations: characterRelations,
      order: { createdAt: 'DESC' },
    });
  }

  async create(character: Partial<Character>): Promise<Character> {
    const newCharacter = this.repository.create(character);
    return this.repository.save(newCharacter);
  }

  async update(
    id: string,
    character: Partial<Character>,
  ): Promise<Character | null> {
    await this.repository.update(id, character);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.repository.count({ where: { name } });
    return count > 0;
  }

  async countByUserId(userId: string): Promise<number> {
    return this.repository.count({ where: { userId, isActive: true } });
  }
}
