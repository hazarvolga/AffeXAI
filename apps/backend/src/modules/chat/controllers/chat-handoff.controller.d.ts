import { ChatHandoffService } from '../services/chat-handoff.service';
import { ExecuteHandoffDto, ExecuteEscalationDto, AddHandoffNoteDto, HandoffContextResponseDto, HandoffNoteResponseDto, HandoffHistoryResponseDto } from '../dto/chat-handoff.dto';
export declare class ChatHandoffController {
    private readonly chatHandoffService;
    constructor(chatHandoffService: ChatHandoffService);
    getHandoffContext(sessionId: string): Promise<HandoffContextResponseDto>;
    executeHandoff(handoffDto: ExecuteHandoffDto, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    executeEscalation(escalationDto: ExecuteEscalationDto, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    addHandoffNote(noteDto: AddHandoffNoteDto, req: any): Promise<HandoffNoteResponseDto>;
    getHandoffNotes(sessionId: string, includePrivate?: boolean): Promise<HandoffNoteResponseDto[]>;
    getHandoffHistory(sessionId: string): Promise<HandoffHistoryResponseDto>;
}
//# sourceMappingURL=chat-handoff.controller.d.ts.map