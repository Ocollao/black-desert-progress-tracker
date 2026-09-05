import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('knowledge_energy')
export class KnowledgeEnergy {
  @PrimaryColumn({ name: 'theme_urn', length: 120 })
  themeUrn: string;

  @Column({ type: 'int', default: 0 })
  energy: number;

  @Column({ type: 'varchar', length: 20, default: 'manual' })
  source: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
