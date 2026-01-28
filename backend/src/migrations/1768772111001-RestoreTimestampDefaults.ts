import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestoreTimestampDefaults1768772111001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Restore defaults for Users table
    await queryRunner.query(`
      ALTER TABLE "Users" 
      ALTER COLUMN "createdAt" SET DEFAULT now(),
      ALTER COLUMN "updatedAt" SET DEFAULT now();
    `);

    // Restore defaults for Posts table
    await queryRunner.query(`
      ALTER TABLE "Posts" 
      ALTER COLUMN "createdAt" SET DEFAULT now(),
      ALTER COLUMN "updatedAt" SET DEFAULT now();
    `);

    // Restore defaults for Comments table
    await queryRunner.query(`
      ALTER TABLE "Comments" 
      ALTER COLUMN "createdAt" SET DEFAULT now(),
      ALTER COLUMN "updatedAt" SET DEFAULT now();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove defaults (rollback)
    await queryRunner.query(`
      ALTER TABLE "Users" 
      ALTER COLUMN "createdAt" DROP DEFAULT,
      ALTER COLUMN "updatedAt" DROP DEFAULT;
    `);

    await queryRunner.query(`
      ALTER TABLE "Posts" 
      ALTER COLUMN "createdAt" DROP DEFAULT,
      ALTER COLUMN "updatedAt" DROP DEFAULT;
    `);

    await queryRunner.query(`
      ALTER TABLE "Comments" 
      ALTER COLUMN "createdAt" DROP DEFAULT,
      ALTER COLUMN "updatedAt" DROP DEFAULT;
    `);
  }
}
