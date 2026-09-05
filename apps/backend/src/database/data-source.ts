import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { User } from '../user/user.entity';
import { Character } from '../character/character.entity';
import { Item } from '../item/item.entity';
import { ItemCategory } from '../item/item-category.entity';
import { KnowledgeEntry, KnowledgeTheme } from '../knowledge/knowledge.entity';
import { KnowledgeProgress, KnowledgeRequirement } from '../knowledge/knowledge-progress.entity';
import { KnowledgeEnergy } from '../knowledge/knowledge-energy.entity';

const rootPath = path.resolve(__dirname, '../../../..');
dotenv.config({ path: path.resolve(rootPath, '.env') });
dotenv.config({ path: path.resolve(rootPath, '.env.local') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'bdo_tracker',
  entities: [
    User,
    Character,
    Item,
    ItemCategory,
    KnowledgeEntry,
    KnowledgeTheme,
    KnowledgeProgress,
    KnowledgeRequirement,
    KnowledgeEnergy,
  ],
  migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  synchronize: false,
  logging:
    process.env.NODE_ENV === 'development' &&
    process.env.BDO_SEED_SQL_LOGGING === 'true',
});
