import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemCategory } from './item-category.entity';

export enum ItemGrade {
  WHITE = 'WHITE',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  RED = 'RED',
}

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({
    name: 'source_urn',
    type: 'varchar',
    length: 120,
    nullable: true,
    unique: true,
  })
  sourceUrn: string | null;

  @Column({ name: 'source_id', type: 'int', nullable: true })
  sourceId: number | null;

  @Column({
    name: 'source_category',
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  sourceCategory: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => ItemCategory, (category) => category.items, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: ItemCategory;

  @Column({ type: 'enum', enum: ItemGrade, default: ItemGrade.WHITE })
  grade: ItemGrade;

  @Column({ name: 'enhancement_level', type: 'int', default: 0 })
  enhancementLevel: number;

  @Column({ name: 'icon_url', type: 'varchar', length: 255, nullable: true })
  iconUrl: string | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
