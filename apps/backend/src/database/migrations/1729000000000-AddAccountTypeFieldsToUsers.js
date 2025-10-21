"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAccountTypeFieldsToUsers1729000000000 = void 0;
const typeorm_1 = require("typeorm");
class AddAccountTypeFieldsToUsers1729000000000 {
    async up(queryRunner) {
        // Check if metadata column exists
        const table = await queryRunner.getTable('users');
        const hasMetadata = table?.columns.find(c => c.name === 'metadata');
        if (!hasMetadata) {
            // Add metadata column (JSONB for account type flags)
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'metadata',
                type: 'jsonb',
                isNullable: true,
                comment: 'Account type metadata (isCustomer, isStudent, isSubscriber, etc.)',
            }));
        }
        const hasCustomerNumber = table?.columns.find(c => c.name === 'customerNumber');
        if (!hasCustomerNumber) {
            // Add customer number column
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'customerNumber',
                type: 'varchar',
                length: '50',
                isNullable: true,
                isUnique: true,
                comment: 'Unique customer number for customer accounts',
            }));
        }
        const hasSchoolName = table?.columns.find(c => c.name === 'schoolName');
        if (!hasSchoolName) {
            // Add school name column
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'schoolName',
                type: 'varchar',
                length: '200',
                isNullable: true,
                comment: 'School name for student accounts',
            }));
        }
        const hasStudentId = table?.columns.find(c => c.name === 'studentId');
        if (!hasStudentId) {
            // Add student ID column
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'studentId',
                type: 'varchar',
                length: '50',
                isNullable: true,
                comment: 'Student ID for student accounts',
            }));
        }
        const hasNewsletter = table?.columns.find(c => c.name === 'isSubscribedToNewsletter');
        if (!hasNewsletter) {
            // Add newsletter subscription flag
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'isSubscribedToNewsletter',
                type: 'boolean',
                default: false,
                comment: 'Newsletter subscription status',
            }));
        }
        // Create index on customerNumber for faster lookups if it doesn't exist
        if (hasCustomerNumber) {
            try {
                await queryRunner.query(`
          CREATE INDEX IF NOT EXISTS idx_users_customer_number ON users("customerNumber");
        `);
            }
            catch (error) {
                // Index might already exist, ignore
            }
        }
    }
    async down(queryRunner) {
        // Drop index
        await queryRunner.query(`DROP INDEX IF EXISTS idx_users_customer_number;`);
        // Drop columns
        await queryRunner.dropColumn('users', 'isSubscribedToNewsletter');
        await queryRunner.dropColumn('users', 'studentId');
        await queryRunner.dropColumn('users', 'schoolName');
        await queryRunner.dropColumn('users', 'customerNumber');
        await queryRunner.dropColumn('users', 'metadata');
    }
}
exports.AddAccountTypeFieldsToUsers1729000000000 = AddAccountTypeFieldsToUsers1729000000000;
//# sourceMappingURL=1729000000000-AddAccountTypeFieldsToUsers.js.map