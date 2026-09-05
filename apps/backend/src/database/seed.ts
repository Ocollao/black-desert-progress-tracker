import 'reflect-metadata';
import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { Item } from '../item/item.entity';
import { ItemCategory } from '../item/item-category.entity';
import { KnowledgeEntry, KnowledgeTheme } from '../knowledge/knowledge.entity';
import { importItems, importKnowledge } from './importer';

const rootPath = path.resolve(__dirname, '../../../..');
dotenv.config({ path: path.resolve(rootPath, '.env') });
dotenv.config({ path: path.resolve(rootPath, '.env.local') });

async function seed(): Promise<void> {
  const dataDirectory = process.env.BDO_DATA_DIR;
  if (!dataDirectory) {
    throw new Error(
      'BDO_DATA_DIR must point to the extracted BDO data directory',
    );
  }

  await AppDataSource.initialize();
  if (process.env.NODE_ENV !== 'production') {
    await AppDataSource.synchronize();
  } else {
    await AppDataSource.runMigrations();
  }

  const itemCount = await importItems(
    dataDirectory,
    AppDataSource.getRepository(Item),
    AppDataSource.getRepository(ItemCategory),
  );
  const knowledgeCount = await importKnowledge(
    dataDirectory,
    AppDataSource.getRepository(KnowledgeEntry),
    AppDataSource.getRepository(KnowledgeTheme),
  );
  console.log(
    `Imported ${itemCount} items, ${knowledgeCount.entries} knowledge entries and ${knowledgeCount.themes} knowledge themes.`,
  );
  await AppDataSource.destroy();
}

seed().catch(async (error: unknown) => {
  console.error('Data import failed:', error);
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exitCode = 1;
});
