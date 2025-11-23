import { ChatSupportAssignmentService } from '../services/chat-support-assignment.service';
import { CreateSupportAssignmentDto, TransferSupportAssignmentDto, EscalateSupportAssignmentDto, CompleteSupportAssignmentDto, SupportAssignmentQueryDto, SupportTeamAvailabilityResponseDto, AssignmentStatsResponseDto } from '../dto/support-assignment.dto';
import { ChatSupportAssignment } from '../entities/chat-support-assignment.entity';
export declare class SupportAssignmentController {
    private readonly supportAssignmentService;
    constructor(supportAssignmentService: ChatSupportAssignmentService);
    createAssignment(createDto: CreateSupportAssignmentDto, req: any): Promise<ChatSupportAssignment>;
    transferAssignment(transferDto: TransferSupportAssignmentDto, req: any): Promise<ChatSupportAssignment>;
    escalateAssignment(escalateDto: EscalateSupportAssignmentDto, req: any): Promise<ChatSupportAssignment>;
    completeAssignment(completeDto: CompleteSupportAssignmentDto, req: any): Promise<ChatSupportAssignment>;
    autoAssignSupport(sessionId: string): Promise<ChatSupportAssignment | null>;
    getActiveAssignment(sessionId: string): Promise<ChatSupportAssignment | null>;
    getSessionAssignments(sessionId: string): Promise<ChatSupportAssignment[]>;
    getSupportUserAssignments(userId: string): Promise<ChatSupportAssignment[]>;
    getMyAssignments(req: any): Promise<ChatSupportAssignment[]>;
    getSupportTeamAvailability(userIds?: string): Promise<SupportTeamAvailabilityResponseDto[]>;
    getAssignmentStats(query: SupportAssignmentQueryDto): Promise<AssignmentStatsResponseDto>;
    getAssignments(query: SupportAssignmentQueryDto): Promise<ChatSupportAssignment[]>;
}
//# sourceMappingURL=support-assignment.controller.d.ts.map