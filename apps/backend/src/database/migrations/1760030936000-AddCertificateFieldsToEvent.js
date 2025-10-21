"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCertificateFieldsToEvent1760030936000 = void 0;
class AddCertificateFieldsToEvent1760030936000 {
    name = 'AddCertificateFieldsToEvent1760030936000';
    async up(queryRunner) {
        await queryRunner.query(`
            DO $$ BEGIN
                ALTER TABLE "events" ADD COLUMN "grantsCertificate" boolean NOT NULL DEFAULT false;
            EXCEPTION
                WHEN duplicate_column THEN NULL;
            END $$;
        `);
        await queryRunner.query(`
            DO $$ BEGIN
                ALTER TABLE "events" ADD COLUMN "certificateTitle" character varying;
            EXCEPTION
                WHEN duplicate_column THEN NULL;
            END $$;
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "events" 
            DROP COLUMN "certificateTitle"
        `);
        await queryRunner.query(`
            ALTER TABLE "events" 
            DROP COLUMN "grantsCertificate"
        `);
    }
}
exports.AddCertificateFieldsToEvent1760030936000 = AddCertificateFieldsToEvent1760030936000;
//# sourceMappingURL=1760030936000-AddCertificateFieldsToEvent.js.map