import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateKnowledgeEnergy1725400000000 implements MigrationInterface {
  name = 'CreateKnowledgeEnergy1725400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "knowledge_energy" ("theme_urn" character varying(120) NOT NULL, "energy" integer NOT NULL DEFAULT '0', "source" character varying(20) NOT NULL DEFAULT 'manual', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_knowledge_energy" PRIMARY KEY ("theme_urn"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "knowledge_energy"`);
  }
}
