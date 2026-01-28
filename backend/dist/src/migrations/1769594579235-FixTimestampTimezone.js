"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixTimestampTimezone1769594579235 = void 0;
class FixTimestampTimezone1769594579235 {
    constructor() {
        this.name = 'FixTimestampTimezone1769594579235';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Posts" DROP CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_68844d71da70caf0f0f4b0ed72d"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_aa80cd9ae4c341f0aeba2401b10"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_11e2470fb8467a2a49ac3de38aa"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_68844d71da70caf0f0f4b0ed72d" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_aa80cd9ae4c341f0aeba2401b10" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_11e2470fb8467a2a49ac3de38aa" FOREIGN KEY ("parentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_11e2470fb8467a2a49ac3de38aa"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_aa80cd9ae4c341f0aeba2401b10"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_68844d71da70caf0f0f4b0ed72d"`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_11e2470fb8467a2a49ac3de38aa" FOREIGN KEY ("parentId") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_aa80cd9ae4c341f0aeba2401b10" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_68844d71da70caf0f0f4b0ed72d" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD CONSTRAINT "FK_a8237eded7a9a311081b65ed0b8" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.FixTimestampTimezone1769594579235 = FixTimestampTimezone1769594579235;
//# sourceMappingURL=1769594579235-FixTimestampTimezone.js.map