import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { ObjectLiteral, QueryDeepPartialEntity, Repository } from 'typeorm';
import { ItemCategory, ItemCategoryCode } from '../item/item-category.entity';
import { Item, ItemGrade } from '../item/item.entity';
import { KnowledgeEntry, KnowledgeTheme } from '../knowledge/knowledge.entity';

type SourceRecord = Record<string, unknown>;

const BATCH_SIZE = 500;

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function asGameText(value: unknown): string | null {
  const text = asString(value);
  if (!text || !/[ÃÂâ]/.test(text)) {
    return text;
  }
  return Buffer.from(text, 'latin1').toString('utf8');
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function toAssetPath(value: unknown, folder: string): string | null {
  const sourcePath = asString(value);
  if (!sourcePath) {
    return null;
  }
  const normalized = sourcePath.replaceAll('\\', '/').toLowerCase();
  const withoutExtension = normalized.replace(
    /\.(dds|png|jpg|jpeg|webp)$/i,
    '',
  );
  const endpoint = folder === 'knowledge_icons' ? 'knowledge' : 'items';
  return `/api/assets/${endpoint}?path=${encodeURIComponent(`${withoutExtension}.webp`)}`;
}

function mapCategory(sourceCategory: string | null): ItemCategoryCode {
  if (sourceCategory === 'MainWeapon' || sourceCategory === 'SubWeapon') {
    return ItemCategoryCode.WEAPON;
  }
  if (sourceCategory === 'Armor') {
    return ItemCategoryCode.ARMOR;
  }
  if (sourceCategory === 'Accessory' || sourceCategory === 'Jewel') {
    return ItemCategoryCode.ACCESSORY;
  }
  if (
    sourceCategory === 'Cook' ||
    sourceCategory === 'Alchemy' ||
    sourceCategory === 'Fish' ||
    sourceCategory === 'Seed' ||
    sourceCategory === 'Gathering' ||
    sourceCategory === 'Processing'
  ) {
    return ItemCategoryCode.LIFESKILL;
  }
  return ItemCategoryCode.OTHER;
}

function mapGrade(value: unknown): ItemGrade {
  const grades = [
    ItemGrade.WHITE,
    ItemGrade.GREEN,
    ItemGrade.BLUE,
    ItemGrade.YELLOW,
    ItemGrade.RED,
  ];
  const grade = asNumber(value);
  return grade !== null && grade >= 0 && grade < grades.length
    ? grades[grade]
    : ItemGrade.WHITE;
}

function itemMetadata(record: SourceRecord): Record<string, unknown> {
  return {
    sourceCategory: record.category ?? null,
    itemType: record.itemType ?? null,
    equipInfo: record.equipInfo ?? null,
    classes: record.classes ?? [],
    weight: record.weight ?? null,
    buyPrice: record.buyPrice ?? null,
    sellPrice: record.sellPrice ?? null,
    stackable: record.stackable ?? false,
    maxEnhance: record.maxEnhance ?? null,
  };
}

async function readJson<T>(
  dataDirectory: string,
  filename: string,
): Promise<T> {
  const content = await fs.readFile(path.join(dataDirectory, filename), 'utf8');
  return JSON.parse(content) as T;
}

async function upsertInBatches<T extends ObjectLiteral>(
  repository: Repository<T>,
  records: QueryDeepPartialEntity<T>[],
  conflictPath: keyof T,
): Promise<void> {
  for (let index = 0; index < records.length; index += BATCH_SIZE) {
    const batch = records.slice(index, index + BATCH_SIZE);
    await repository.upsert(batch, [conflictPath as string]);
  }
}

export async function importItems(
  dataDirectory: string,
  itemRepository: Repository<Item>,
  categoryRepository: Repository<ItemCategory>,
): Promise<number> {
  const sourceItems = await readJson<SourceRecord[]>(
    dataDirectory,
    'items.json',
  );
  const categories = new Map<ItemCategoryCode, ItemCategory>();
  for (const code of Object.values(ItemCategoryCode)) {
    let category = await categoryRepository.findOne({ where: { code } });
    if (!category) {
      category = await categoryRepository.save(
        categoryRepository.create({ code, name: code, description: null }),
      );
    }
    categories.set(code, category);
  }

  const records = sourceItems.flatMap((sourceItem) => {
    const sourceUrn = asString(sourceItem.urn);
    const sourceId = asNumber(sourceItem.id);
    const name = asString(sourceItem.name);
    const sourceCategory = asString(sourceItem.category);
    const category = categories.get(mapCategory(sourceCategory));
    if (!sourceUrn || sourceId === null || !name || !category) {
      return [];
    }
    return [
      {
        sourceUrn,
        sourceId,
        sourceCategory,
        name: asGameText(name) ?? name,
        description: asGameText(sourceItem.description),
        categoryId: category.id,
        grade: mapGrade(sourceItem.grade),
        enhancementLevel: asNumber(sourceItem.maxEnhance) ?? 0,
        iconUrl: toAssetPath(sourceItem.icon, 'icons'),
        metadata: itemMetadata(sourceItem),
        isActive: true,
      } as QueryDeepPartialEntity<Item>,
    ];
  });
  await upsertInBatches(itemRepository, records, 'sourceUrn');
  return records.length;
}

export async function importKnowledge(
  dataDirectory: string,
  entryRepository: Repository<KnowledgeEntry>,
  themeRepository: Repository<KnowledgeTheme>,
): Promise<{ entries: number; themes: number }> {
  const source = await readJson<{
    entries: SourceRecord[];
    themes: SourceRecord[];
  }>(dataDirectory, 'knowledge.json');
  const themes = source.themes.flatMap((record) => {
    const sourceUrn = asString(record.urn);
    const name = asString(record.name);
    if (!sourceUrn || !name) {
      return [];
    }
    return [
      {
        sourceUrn,
        sourceKey: asNumber(record.key),
        name: asGameText(name) ?? name,
        parentUrn: asString(record.parent),
        metadata: { source: record },
      },
    ];
  });
  await upsertInBatches(themeRepository, themes, 'sourceUrn');

  const entries = source.entries.flatMap((record) => {
    const sourceUrn = asString(record.urn);
    const name = asString(record.name);
    if (!sourceUrn || !name) {
      return [];
    }
    return [
      {
        sourceUrn,
        sourceKey: asNumber(record.key),
        name,
        description: asGameText(record.description),
        acquisition: asGameText(record.acquisition),
        imagePath: toAssetPath(record.image, 'knowledge_icons'),
        themeUrn: asString(record.theme),
        itemUrn: asString(record.item),
        characterUrn: asString(record.character),
        minFavor: asNumber(record.minFavor),
        maxFavor: asNumber(record.maxFavor),
        interest: asNumber(record.interest),
        metadata: { source: record },
      },
    ];
  });
  await upsertInBatches(entryRepository, entries, 'sourceUrn');
  return { entries: entries.length, themes: themes.length };
}
