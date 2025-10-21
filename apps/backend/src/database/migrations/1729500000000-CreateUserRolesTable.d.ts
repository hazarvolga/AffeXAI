import { MigrationInterface, QueryRunner } from 'typeorm';
/**
 * Migration: Create user_roles table for multi-role support
 *
 * This migration creates a junction table to support many-to-many relationship
 * between users and roles, allowing a user to have multiple roles with one
 * designated as primary.
 *
 * Features:
 * - Multiple role assignment per user
 * - Primary role designation (isPrimary flag)
 * - Audit trail (assignedAt, assignedBy)
 * - Prevent duplicate assignments (unique constraint)
 * - Ensure only one primary role per user
 * - Cascade delete when user is deleted
 * - Restrict delete when role has assignments
 */
export declare class CreateUserRolesTable1729500000000 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
//# sourceMappingURL=1729500000000-CreateUserRolesTable.d.ts.map