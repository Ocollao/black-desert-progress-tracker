import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique } from 'typeorm';

export class CreateKnowledgeProgress1725292800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({ name: 'knowledge_progress', columns: [
      { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
      { name: 'user_id', type: 'uuid' }, { name: 'knowledge_id', type: 'uuid' },
      { name: 'obtained', type: 'boolean', default: false },
      { name: 'obtained_at', type: 'timestamp with time zone', isNullable: true },
      { name: 'notes', type: 'text', isNullable: true },
      { name: 'createdAt', type: 'timestamp with time zone', default: 'now()' },
      { name: 'updatedAt', type: 'timestamp with time zone', default: 'now()' },
    ], uniques: [new TableUnique({ name: 'UQ_knowledge_progress_user_entry', columnNames: ['user_id', 'knowledge_id'] })] }), true);
    await queryRunner.createForeignKey('knowledge_progress', new TableForeignKey({ columnNames: ['user_id'], referencedTableName: 'users', referencedColumnNames: ['id'], onDelete: 'CASCADE' }));
    await queryRunner.createForeignKey('knowledge_progress', new TableForeignKey({ columnNames: ['knowledge_id'], referencedTableName: 'knowledge_entries', referencedColumnNames: ['id'], onDelete: 'CASCADE' }));
    await queryRunner.createTable(new Table({ name: 'knowledge_requirements', columns: [
      { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
      { name: 'knowledge_id', type: 'uuid' }, { name: 'required_knowledge_id', type: 'uuid' }, { name: 'description', type: 'text', isNullable: true },
    ], uniques: [new TableUnique({ name: 'UQ_knowledge_requirement_pair', columnNames: ['knowledge_id', 'required_knowledge_id'] })] }), true);
    await queryRunner.createForeignKey('knowledge_requirements', new TableForeignKey({ columnNames: ['knowledge_id'], referencedTableName: 'knowledge_entries', referencedColumnNames: ['id'], onDelete: 'CASCADE' }));
    await queryRunner.createForeignKey('knowledge_requirements', new TableForeignKey({ columnNames: ['required_knowledge_id'], referencedTableName: 'knowledge_entries', referencedColumnNames: ['id'], onDelete: 'CASCADE' }));
    await queryRunner.createIndex('knowledge_progress', new TableIndex({ name: 'idx_knowledge_progress_user', columnNames: ['user_id'] }));
    await queryRunner.createIndex('knowledge_requirements', new TableIndex({ name: 'idx_knowledge_requirements_entry', columnNames: ['knowledge_id'] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('knowledge_requirements');
    await queryRunner.dropTable('knowledge_progress');
  }
}