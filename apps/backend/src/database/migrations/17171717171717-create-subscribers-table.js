"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscribersTable17171717171717 = void 0;
const typeorm_1 = require("typeorm");
class CreateSubscribersTable17171717171717 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "subscribers",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    length: "255",
                },
                {
                    name: "status",
                    type: "varchar",
                    length: "20",
                    default: "'pending'",
                },
                {
                    name: "groups",
                    type: "json",
                    isNullable: true,
                },
                {
                    name: "segments",
                    type: "json",
                    isNullable: true,
                },
                {
                    name: "subscribedAt",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "lastUpdated",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("subscribers");
    }
}
exports.CreateSubscribersTable17171717171717 = CreateSubscribersTable17171717171717;
//# sourceMappingURL=17171717171717-create-subscribers-table.js.map