import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new NotFoundException('Item no encontrado');
    }
    return item;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const existingItem = await this.itemRepository.findByName(
      createItemDto.name,
    );
    if (existingItem) {
      throw new ConflictException('El nombre del item ya existe');
    }
    return this.itemRepository.create(createItemDto);
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.findById(id);
    if (updateItemDto.name) {
      const existingItem = await this.itemRepository.findByName(
        updateItemDto.name,
      );
      if (existingItem && existingItem.id !== id) {
        throw new ConflictException('El nombre del item ya existe');
      }
    }
    const item = await this.itemRepository.update(id, updateItemDto);
    if (!item) {
      throw new NotFoundException('Item no encontrado tras actualizar');
    }
    return item;
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.itemRepository.deactivate(id);
  }
}
