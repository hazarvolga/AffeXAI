"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSupportEnhancements1760789879830 = void 0;
class AddSupportEnhancements1760789879830 {
    name = 'AddSupportEnhancements1760789879830';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "ticket_audit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ticketId" uuid NOT NULL, "userId" uuid, "action" character varying(100) NOT NULL, "entityType" character varying(100), "entityId" uuid, "oldValues" jsonb, "newValues" jsonb, "description" text, "ipAddress" character varying(50), "userAgent" text, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85a83e381a0dcbb6a363ea9f679" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket_audit_logs" ADD CONSTRAINT "FK_c584466e3bc7801f47b7a4ff942" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_audit_logs" ADD CONSTRAINT "FK_b3ff67749c7228645b2ded79966" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ticket_audit_logs" DROP CONSTRAINT "FK_b3ff67749c7228645b2ded79966"`);
        await queryRunner.query(`ALTER TABLE "ticket_audit_logs" DROP CONSTRAINT "FK_c584466e3bc7801f47b7a4ff942"`);
        await queryRunner.query(`DROP TABLE "ticket_audit_logs"`);
    }
}
exports.AddSupportEnhancements1760789879830 = AddSupportEnhancements1760789879830;
//# sourceMappingURL=1760789879830-AddSupportEnhancements.js.map