import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateItemCatalog1725120000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item_categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '30',
            isUnique: true,
          },
          { name: 'name', type: 'varchar', length: '80' },
          { name: 'description', type: 'text', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          { name: 'name', type: 'varchar', length: '120', isUnique: true },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'category_id', type: 'uuid' },
          { name: 'grade', type: 'varchar', length: '20', default: "'WHITE'" },
          { name: 'enhancement_level', type: 'int', default: 0 },
          {
            name: 'icon_url',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          { name: 'metadata', type: 'jsonb', default: "'{}'" },
          { name: 'isActive', type: 'boolean', default: true },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'item_categories',
        onDelete: 'RESTRICT',
      }),
    );
    await queryRunner.createIndex(
      'items',
      new TableIndex({
        name: 'idx_items_category_id',
        columnNames: ['category_id'],
      }),
    );

    await queryRunner.query(`
      INSERT INTO item_categories (code, name, description) VALUES
        ('WEAPON', 'Weapon', 'Main, awakening and offhand weapons'),
        ('ARMOR', 'Armor', 'Armor pieces and defensive equipment'),
        ('ACCESSORY', 'Accessory', 'Jewelry and other accessories'),
        ('LIFESKILL', 'Life Skill', 'Items related to life skill progression'),
        ('OTHER', 'Other', 'Miscellaneous progression items')
    `);

    await queryRunner.query(`
      INSERT INTO items (name, description, category_id, grade, enhancement_level, metadata)
      SELECT item.name, item.description, categories.id, item.grade, item.enhancement_level, item.metadata::jsonb
      FROM (VALUES
        ('Practice Longsword', 'A starter weapon for the item catalog.', 'WEAPON', 'WHITE', 0, '{"slot":"main_weapon"}'),
        ('Reinforced Grunil Helmet', 'A sample armor item.', 'ARMOR', 'GREEN', 3, '{"slot":"helmet"}'),
        ('Forest Eye Earring', 'A sample accessory item.', 'ACCESSORY', 'BLUE', 0, '{"slot":"earring"}'),
        ('Beginner Cooking Utensil', 'A sample life skill item.', 'LIFESKILL', 'WHITE', 0, '{"slot":"tool"}'),
        ('Memory Fragment', 'A sample miscellaneous progression item.', 'OTHER', 'YELLOW', 0, '{"stackable":true}')
      ) AS item(name, description, category_code, grade, enhancement_level, metadata)
      JOIN item_categories categories ON categories.code = item.category_code
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
    await queryRunner.dropTable('item_categories');
  }
}
