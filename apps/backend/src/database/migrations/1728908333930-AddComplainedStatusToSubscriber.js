"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddComplainedStatusToSubscriber1728908333930 = void 0;
class AddComplainedStatusToSubscriber1728908333930 {
    async up(queryRunner) {
        // Add 'complained' to subscriber_status enum
        // Check if enum exists first, if not skip this migration
        const enumExists = await queryRunner.query(`
      SELECT 1 FROM pg_type WHERE typname = 'subscribers_status_enum'
    `);
        if (enumExists.length > 0) {
            await queryRunner.query(`
        ALTER TYPE "subscribers_status_enum" ADD VALUE IF NOT EXISTS 'complained';
      `);
        }
        else {
            console.log('subscribers_status_enum does not exist, skipping migration');
        }
    }
    async down(queryRunner) {
        // PostgreSQL doesn't support removing enum values directly
        // Would require recreating the enum and column
        console.log('Cannot remove enum value in PostgreSQL - this migration is not reversible');
    }
}
exports.AddComplainedStatusToSubscriber1728908333930 = AddComplainedStatusToSubscriber1728908333930;
//# sourceMappingURL=1728908333930-AddComplainedStatusToSubscriber.js.map