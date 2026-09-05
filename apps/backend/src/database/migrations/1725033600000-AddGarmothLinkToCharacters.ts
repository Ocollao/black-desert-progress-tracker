import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddGarmothLinkToCharacters1725033600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('characters', [
      new TableColumn({
        name: 'garmothUrl',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'garmothCode',
        type: 'varchar',
        length: '100',
        isNullable: true,
      }),
      new TableColumn({
        name: 'linkedGearScore',
        type: 'int',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('characters', 'linkedGearScore');
    await queryRunner.dropColumn('characters', 'garmothCode');
    await queryRunner.dropColumn('characters', 'garmothUrl');
  }
}
