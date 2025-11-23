import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSubscribersTable17171717171717 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("subscribers");
    }
}