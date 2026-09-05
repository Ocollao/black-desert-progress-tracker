import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { KnowledgeEntry } from './knowledge.entity';

@Entity('knowledge_progress')
@Unique(['userId', 'knowledgeId'])
export class KnowledgeProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'knowledge_id' })
  knowledgeId: string;

  @ManyToOne(() => KnowledgeEntry, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'knowledge_id' })
  knowledge: KnowledgeEntry;

  @Column({ default: false })
  obtained: boolean;

  @Column({ name: 'obtained_at', type: 'timestamp with time zone', nullable: true })
  obtainedAt: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('knowledge_requirements')
@Unique(['knowledgeId', 'requiredKnowledgeId'])
export class KnowledgeRequirement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'knowledge_id' })
  knowledgeId: string;

  @ManyToOne(() => KnowledgeEntry, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'knowledge_id' })
  knowledge: KnowledgeEntry;

  @Column({ name: 'required_knowledge_id' })
  requiredKnowledgeId: string;

  @ManyToOne(() => KnowledgeEntry, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'required_knowledge_id' })
  requiredKnowledge: KnowledgeEntry;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}