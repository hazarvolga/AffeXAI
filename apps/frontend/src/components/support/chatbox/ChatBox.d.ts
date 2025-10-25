import React from 'react';
import { ChatMessage } from './ChatMessage';
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
export interface ChatSession {
    id: string;
    userId: string;
    sessionType: 'support' | 'general';
    status: 'active' | 'closed' | 'transferred';
    title?: string;
    metadata?: {
        aiProvider?: string;
        modelUsed?: string;
        contextSources?: number;
        messageCount?: number;
        supportAssigned?: boolean;
        customerSatisfaction?: number;
    };
    createdAt: Date;
    updatedAt: Date;
    closedAt?: Date;
}
interface ChatBoxProps {
    sessionType?: 'support' | 'general';
    className?: string;
    onSessionCreate?: (session: ChatSession) => void;
    onMessageSent?: (message: ChatMessage) => void;
    embedded?: boolean;
    showHeader?: boolean;
    height?: string;
}
export declare function ChatBox({ sessionType, className, onSessionCreate, onMessageSent, embedded, showHeader, height }: ChatBoxProps): React.JSX.Element;
export {};
//# sourceMappingURL=ChatBox.d.ts.map