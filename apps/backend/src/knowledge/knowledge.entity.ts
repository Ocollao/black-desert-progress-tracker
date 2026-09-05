import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('knowledge_entries')
export class KnowledgeEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'source_urn', length: 120, unique: true })
  sourceUrn: string;

  @Column({ name: 'source_key', type: 'int', nullable: true })
  sourceKey: number | null;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  acquisition: string | null;

  @Column({ name: 'image_path', type: 'varchar', length: 255, nullable: true })
  imagePath: string | null;

  @Column({ name: 'theme_urn', type: 'varchar', length: 120, nullable: true })
  themeUrn: string | null;

  @Column({ name: 'item_urn', type: 'varchar', length: 120, nullable: true })
  itemUrn: string | null;

  @Column({
    name: 'character_urn',
    type: 'varchar',
    length: 160,
    nullable: true,
  })
  characterUrn: string | null;

  @Column({ name: 'min_favor', type: 'int', nullable: true })
  minFavor: number | null;

  @Column({ name: 'max_favor', type: 'int', nullable: true })
  maxFavor: number | null;

  @Column({ type: 'int', nullable: true })
  interest: number | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('knowledge_themes')
export class KnowledgeTheme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'source_urn', length: 120, unique: true })
  sourceUrn: string;

  @Column({ name: 'source_key', type: 'int', nullable: true })
  sourceKey: number | null;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'parent_urn', type: 'varchar', length: 120, nullable: true })
  parentUrn: string | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
