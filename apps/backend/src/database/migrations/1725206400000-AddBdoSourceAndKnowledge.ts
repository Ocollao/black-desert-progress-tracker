import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableIndex,
} from 'typeorm';

export class AddBdoSourceAndKnowledge1725206400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('items', [
      new TableColumn({
        name: 'source_urn',
        type: 'varchar',
        length: '120',
        isNullable: true,
        isUnique: true,
      }),
      new TableColumn({
        name: 'source_id',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'source_category',
        type: 'varchar',
        length: '80',
        isNullable: true,
      }),
    ]);

    await queryRunner.createTable(
      new Table({
        name: 'knowledge_themes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'source_urn',
            type: 'varchar',
            length: '120',
            isUnique: true,
          },
          { name: 'source_key', type: 'int', isNullable: true },
          { name: 'name', type: 'varchar', length: '255' },
          {
            name: 'parent_urn',
            type: 'varchar',
            length: '120',
            isNullable: true,
          },
          { name: 'metadata', type: 'jsonb', default: "'{}'" },
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
    await queryRunner.createTable(
      new Table({
        name: 'knowledge_entries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'source_urn',
            type: 'varchar',
            length: '120',
            isUnique: true,
          },
          { name: 'source_key', type: 'int', isNullable: true },
          { name: 'name', type: 'varchar', length: '255' },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'acquisition', type: 'text', isNullable: true },
          {
            name: 'image_path',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'theme_urn',
            type: 'varchar',
            length: '120',
            isNullable: true,
          },
          {
            name: 'item_urn',
            type: 'varchar',
            length: '120',
            isNullable: true,
          },
          {
            name: 'character_urn',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          { name: 'min_favor', type: 'int', isNullable: true },
          { name: 'max_favor', type: 'int', isNullable: true },
          { name: 'interest', type: 'int', isNullable: true },
          { name: 'metadata', type: 'jsonb', default: "'{}'" },
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
    await queryRunner.createIndex(
      'items',
      new TableIndex({
        name: 'idx_items_source_id',
        columnNames: ['source_id'],
      }),
    );
    await queryRunner.createIndex(
      'knowledge_entries',
      new TableIndex({
        name: 'idx_knowledge_entries_theme_urn',
        columnNames: ['theme_urn'],
      }),
    );
    await queryRunner.createIndex(
      'knowledge_entries',
      new TableIndex({
        name: 'idx_knowledge_entries_item_urn',
        columnNames: ['item_urn'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('knowledge_entries');
    await queryRunner.dropTable('knowledge_themes');
    await queryRunner.dropIndex('items', 'idx_items_source_id');
    await queryRunner.dropColumn('items', 'source_category');
    await queryRunner.dropColumn('items', 'source_id');
    await queryRunner.dropColumn('items', 'source_urn');
  }
}
