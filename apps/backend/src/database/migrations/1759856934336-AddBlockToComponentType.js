"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBlockToComponentType1759856934336 = void 0;
class AddBlockToComponentType1759856934336 {
    async up(queryRunner) {
        // Add 'block' to the cms_components_type_enum if it doesn't exist
        await queryRunner.query(`
            DO $$ BEGIN
                ALTER TYPE "public"."cms_components_type_enum" ADD VALUE 'block';
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);
    }
    async down(queryRunner) {
        // Note: PostgreSQL doesn't support removing values from enums directly
        // To rollback, we would need to recreate the enum without 'block'
        // This is a complex operation and generally not recommended
        // In practice, we would leave the enum value in place
    }
}
exports.AddBlockToComponentType1759856934336 = AddBlockToComponentType1759856934336;
//# sourceMappingURL=1759856934336-AddBlockToComponentType.js.map