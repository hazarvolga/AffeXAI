import { TicketEscalationRulesService } from '../services/ticket-escalation-rules.service';
import { TicketEscalationRule } from '../entities/ticket-escalation-rule.entity';
export declare class TicketEscalationRulesController {
    private readonly escalationRulesService;
    constructor(escalationRulesService: TicketEscalationRulesService);
    findAll(): Promise<TicketEscalationRule[]>;
    findActive(): Promise<TicketEscalationRule[]>;
    findOne(id: string): Promise<TicketEscalationRule>;
    create(data: Partial<TicketEscalationRule>): Promise<TicketEscalationRule>;
    update(id: string, data: Partial<TicketEscalationRule>): Promise<TicketEscalationRule>;
    delete(id: string): Promise<void>;
    toggle(id: string): Promise<TicketEscalationRule>;
}
//# sourceMappingURL=ticket-escalation-rules.controller.d.ts.map