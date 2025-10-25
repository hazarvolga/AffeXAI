import React from 'react';
import { ContextSource } from './ContextSourceVisualization';
export interface ChatMessage {
    id: string;
    sessionId: string;
    senderType: 'user' | 'ai' | 'support';
    senderId?: string;
    content: string;
    messageType: 'text' | 'file' | 'url' | 'system';
    metadata?: {
        aiModel?: string;
        processingTime?: number;
        contextSources?: ContextSource[];
        confidence?: number;
        supportUserId?: string;
        supportUserName?: string;
        fileName?: string;
        fileSize?: number;
        fileType?: string;
        url?: string;
        streaming?: boolean;
    };
    createdAt: Date;
}
interface ChatMessageProps {
    message: ChatMessage;
    showAvatar?: boolean;
    showTimestamp?: boolean;
}
export declare function ChatMessage({ message, showAvatar, showTimestamp }: ChatMessageProps): React.JSX.Element;
export {};
//# sourceMappingURL=ChatMessage.d.ts.map