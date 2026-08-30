import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum CharacterClass {
  WARRIOR = 'WARRIOR',
  RANGER = 'RANGER',
  SORCERESS = 'SORCERESS',
  BERSERKER = 'BERSERKER',
  TAMER = 'TAMER',
  MUSA = 'MUSA',
  VALKYRIE = 'VALKYRIE',
  WITCH = 'WITCH',
  KUNOICHI = 'KUNOICHI',
  NINJA = 'NINJA',
  WIZARD = 'WIZARD',
  DARK_KNIGHT = 'DARK_KNIGHT',
  STRIKER = 'STRIKER',
  MYSTIC = 'MYSTIC',
  LAHN = 'LAHN',
  ARCHER = 'ARCHER',
  SHAI = 'SHAI',
  HASHASHIN = 'HASHASHIN',
  NOVA = 'NOVA',
  SAGE = 'SAGE',
  CORSAIR = 'CORSAIR',
  DRAKANIA = 'DRAKANIA',
  SOLARIS = 'SOLARIS',
  SCHOLAR = 'SCHOLAR',
  DEADEYE = 'DEADEYE',
}

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({
    type: 'enum',
    enum: CharacterClass,
  })
  class: CharacterClass;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0, type: 'bigint' })
  experience: number;

  @Column({ nullable: true, length: 100 })
  seasonCharacter: string;

  @Column({ default: 0 })
  gearScore: number;

  @Column({ nullable: true, length: 255 })
  avatarUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.characters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;
}
