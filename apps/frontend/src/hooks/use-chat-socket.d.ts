interface ChatMessage {
    id: string;
    sessionId: string;
    senderType: 'user' | 'ai' | 'support';
    senderId?: string;
    content: string;
    messageType: 'text' | 'file' | 'url' | 'system';
    metadata?: any;
    createdAt: Date;
}
interface ChatSession {
    id: string;
    userId: string;
    sessionType: 'support' | 'general';
    status: 'active' | 'closed' | 'transferred';
    title?: string;
    metadata?: any;
    createdAt: Date;
    updatedAt: Date;
    closedAt?: Date;
}
interface SendMessageData {
    sessionId: string;
    content: string;
    messageType: 'text' | 'file' | 'url' | 'system';
}
interface FileUploadData {
    sessionId: string;
    file: File;
    messageId: string;
}
interface UrlProcessData {
    sessionId: string;
    url: string;
    messageId: string;
}
interface FileProcessingStatus {
    sessionId: string;
    messageId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress?: number;
    error?: string;
}
interface UrlProcessingStatus {
    sessionId: string;
    messageId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress?: number;
    error?: string;
    preview?: {
        title?: string;
        description?: string;
        image?: string;
    };
}
interface SupportJoinedData {
    sessionId: string;
    supportUserId: string;
    supportUserName: string;
}
interface SupportLeftData {
    sessionId: string;
    supportUserId: string;
    supportUserName: string;
}
interface TypingIndicatorData {
    sessionId: string;
    userId: string;
    userName: string;
    isTyping: boolean;
}
interface UseChatSocketOptions {
    onMessageReceived?: (message: ChatMessage) => void;
    onAiResponseStart?: (sessionId: string) => void;
    onAiResponseChunk?: (data: {
        sessionId: string;
        chunk: string;
    }) => void;
    onAiResponseComplete?: (message: ChatMessage) => void;
    onFileProcessingStatus?: (status: FileProcessingStatus) => void;
    onUrlProcessingStatus?: (status: UrlProcessingStatus) => void;
    onSupportJoined?: (data: SupportJoinedData) => void;
    onSupportLeft?: (data: SupportLeftData) => void;
    onTypingIndicator?: (data: TypingIndicatorData) => void;
    onSessionUpdated?: (session: ChatSession) => void;
    onConnectionStatusChange?: (isConnected: boolean) => void;
    onEscalationSuggested?: (data: {
        sessionId: string;
        reason: string;
        message: string;
    }) => void;
}
export declare function useChatSocket(options?: UseChatSocketOptions): {
    isConnected: boolean;
    connectionError: string | null;
    connectionQuality: "offline" | "good" | "poor";
    lastPingTime: number | null;
    queuedMessageCount: number;
    joinSession: (sessionId: string) => void;
    sendMessage: (data: SendMessageData) => Promise<void>;
    uploadFile: (data: FileUploadData) => Promise<void>;
    processUrl: (data: UrlProcessData) => Promise<void>;
    startTyping: (sessionId: string) => void;
    stopTyping: (sessionId: string) => void;
    reconnect: () => void;
};
export {};
//# sourceMappingURL=use-chat-socket.d.ts.map