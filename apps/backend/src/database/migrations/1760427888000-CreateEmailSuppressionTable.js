"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailSuppressionTable1760427888000 = void 0;
const typeorm_1 = require("typeorm");
class CreateEmailSuppressionTable1760427888000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "email_suppressions",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "reason",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "provider",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "eventType",
                    type: "enum",
                    enum: [
                        "delivered",
                        "bounced",
                        "soft_bounced",
                        "opened",
                        "clicked",
                        "complained",
                        "spam",
                        "unsubscribed",
                        "dropped",
                        "deferred",
                    ],
                    isNullable: false,
                },
                {
                    name: "bounceReason",
                    type: "enum",
                    enum: [
                        "mailbox_not_found",
                        "domain_not_found",
                        "recipient_rejected",
                        "mailbox_full",
                        "message_too_large",
                        "temporary_failure",
                        "blocked",
                        "unknown",
                    ],
                    isNullable: true,
                },
                {
                    name: "suppressedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false,
                },
                {
                    name: "metadata",
                    type: "json",
                    isNullable: true,
                },
            ],
        }), true);
        // Create unique index on email (IF NOT EXISTS to prevent duplicate errors)
        await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "IDX_email_suppressions_email_unique" 
            ON "email_suppressions" ("email")
        `);
        // Create index for faster lookups
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_email_suppressions_provider" 
            ON "email_suppressions" ("provider")
        `);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("email_suppressions");
    }
}
exports.CreateEmailSuppressionTable1760427888000 = CreateEmailSuppressionTable1760427888000;
//# sourceMappingURL=1760427888000-CreateEmailSuppressionTable.js.map