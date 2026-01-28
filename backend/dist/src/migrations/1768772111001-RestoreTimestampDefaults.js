"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreTimestampDefaults1768772111001 = void 0;
class RestoreTimestampDefaults1768772111001 {
    async up(queryRunner) {
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
    async down(queryRunner) {
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
exports.RestoreTimestampDefaults1768772111001 = RestoreTimestampDefaults1768772111001;
//# sourceMappingURL=1768772111001-RestoreTimestampDefaults.js.map