import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategory } from './item-category.entity';
import { ItemController } from './item.controller';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemCategory])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository, AdminGuard],
  exports: [ItemService, ItemRepository],
})
export class ItemModule {}
