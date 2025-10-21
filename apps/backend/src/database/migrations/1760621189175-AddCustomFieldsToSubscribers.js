"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomFieldsToSubscribers1760621189175 = void 0;
class AddCustomFieldsToSubscribers1760621189175 {
    name = 'AddCustomFieldsToSubscribers1760621189175';
    async up(queryRunner) {
        // Add custom_fields column to subscribers table
        await queryRunner.query(`
      ALTER TABLE subscribers 
      ADD COLUMN custom_fields JSON NULL 
      COMMENT 'Dynamic custom fields data'
    `);
    }
    async down(queryRunner) {
        // Drop custom_fields column from subscribers table
        await queryRunner.query(`ALTER TABLE subscribers DROP COLUMN custom_fields`);
    }
}
exports.AddCustomFieldsToSubscribers1760621189175 = AddCustomFieldsToSubscribers1760621189175;
//# sourceMappingURL=1760621189175-AddCustomFieldsToSubscribers.js.map