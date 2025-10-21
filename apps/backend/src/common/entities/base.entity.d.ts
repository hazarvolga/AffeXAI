/**
 * Base Entity with common timestamp fields
 * All entities should extend this class
 */
export declare abstract class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
//# sourceMappingURL=base.entity.d.ts.map