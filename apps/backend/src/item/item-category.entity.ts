import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

export enum ItemCategoryCode {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  ACCESSORY = 'ACCESSORY',
  LIFESKILL = 'LIFESKILL',
  OTHER = 'OTHER',
}

@Entity('item_categories')
export class ItemCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ItemCategoryCode, unique: true })
  code: ItemCategoryCode;

  @Column({ length: 80 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
