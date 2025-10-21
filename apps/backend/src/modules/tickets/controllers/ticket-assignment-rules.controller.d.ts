import { TicketAssignmentRulesService } from '../services/ticket-assignment-rules.service';
import { TicketAssignmentRule } from '../entities/ticket-assignment-rule.entity';
export declare class TicketAssignmentRulesController {
    private readonly assignmentRulesService;
    constructor(assignmentRulesService: TicketAssignmentRulesService);
    findAll(): Promise<TicketAssignmentRule[]>;
    findActive(): Promise<TicketAssignmentRule[]>;
    findOne(id: string): Promise<TicketAssignmentRule>;
    create(data: Partial<TicketAssignmentRule>): Promise<TicketAssignmentRule>;
    update(id: string, data: Partial<TicketAssignmentRule>): Promise<TicketAssignmentRule>;
    delete(id: string): Promise<void>;
    toggle(id: string): Promise<TicketAssignmentRule>;
}
//# sourceMappingURL=ticket-assignment-rules.controller.d.ts.map