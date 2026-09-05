import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.repository.find({
      where: { isActive: true },
      relations: { category: true },
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<Item | null> {
    return this.repository.findOne({
      where: { id, isActive: true },
      relations: { category: true },
    });
  }

  async findByName(name: string): Promise<Item | null> {
    return this.repository.findOne({ where: { name } });
  }

  async create(item: Partial<Item>): Promise<Item> {
    return this.repository.save(this.repository.create(item));
  }

  async update(id: string, item: Partial<Item>): Promise<Item | null> {
    const existingItem = await this.findById(id);
    if (!existingItem) {
      return null;
    }
    Object.assign(existingItem, item);
    return this.repository.save(existingItem);
  }

  async deactivate(id: string): Promise<void> {
    await this.repository.update(id, { isActive: false });
  }
}
