import { BaseApiService } from './base-service';

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: Array<{
      type: 'kb' | 'faq' | 'document';
      title: string;
      excerpt?: string;
      url?: string;
    }>;
    suggestedActions?: string[];
    relatedTickets?: Array<{
      id: string;
      subject: string;
      status: string;
    }>;
  };
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  context?: {
    currentPage?: string;
    userAgent?: string;
    previousMessages?: ChatMessage[];
  };
}

export interface ChatResponse {
  success: boolean;
  message: ChatMessage;
  conversationId: string;
  aiAvailable: boolean;
  error?: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  metadata?: {
    userAgent?: string;
    startPage?: string;
    totalMessages?: number;
    avgResponseTime?: number;
    satisfaction?: number;
  };
}

export interface ChatFeedback {
  messageId: string;
  isHelpful: boolean;
  comment?: string;
  rating?: number; // 1-5
}

/**
 * Chat Service
 * Handles AI chat interactions
 */
class ChatService extends BaseApiService<ChatSession, any, any> {
  constructor() {
    super({ 
      endpoint: '/chat',
      defaultHeaders: {
        'Content-Type': 'application/json',
      }
    });
  }

  /**
   * Send message to AI chat
   */
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    return this.client.postWrapped<ChatResponse>(`${this.endpoint}/message`, request);
  }

  /**
   * Get chat session history
   */
  async getChatSession(sessionId?: string): Promise<ChatSession> {
    const endpoint = sessionId 
      ? `${this.endpoint}/session/${sessionId}`
      : `${this.endpoint}/session/current`;
    
    return this.client.getWrapped<ChatSession>(endpoint);
  }

  /**
   * Start new chat session
   */
  async startNewSession(): Promise<ChatSession> {
    return this.client.postWrapped<ChatSession>(`${this.endpoint}/session/new`, {});
  }

  /**
   * End chat session
   */
  async endSession(sessionId: string): Promise<void> {
    await this.client.postWrapped(`${this.endpoint}/session/${sessionId}/end`, {});
  }

  /**
   * Provide feedback on AI response
   */
  async provideFeedback(feedback: ChatFeedback): Promise<void> {
    await this.client.postWrapped(`${this.endpoint}/feedback`, feedback);
  }

  /**
   * Get chat availability status
   */
  async getChatStatus(): Promise<{
    available: boolean;
    reason?: string;
    estimatedWaitTime?: number;
    activeAgents?: number;
  }> {
    return this.client.getWrapped(`${this.endpoint}/status`);
  }

  /**
   * Search chat history
   */
  async searchChatHistory(query: string, limit: number = 10): Promise<{
    sessions: ChatSession[];
    total: number;
  }> {
    return this.client.getWrapped(`${this.endpoint}/search`, {
      params: { query, limit }
    });
  }

  /**
   * Get suggested questions based on current context
   */
  async getSuggestedQuestions(context?: {
    currentPage?: string;
    category?: string;
  }): Promise<string[]> {
    return this.client.postWrapped(`${this.endpoint}/suggestions`, context || {});
  }

  /**
   * Report chat issue
   */
  async reportIssue(issue: {
    sessionId: string;
    messageId?: string;
    type: 'inappropriate' | 'incorrect' | 'unhelpful' | 'technical';
    description: string;
  }): Promise<void> {
    await this.client.postWrapped(`${this.endpoint}/report`, issue);
  }

  /**
   * Get chat analytics (admin only)
   */
  async getChatAnalytics(period: 'day' | 'week' | 'month' = 'week'): Promise<{
    totalSessions: number;
    totalMessages: number;
    avgSessionDuration: number;
    avgResponseTime: number;
    satisfactionScore: number;
    topQuestions: Array<{
      question: string;
      count: number;
      avgSatisfaction: number;
    }>;
    resolutionRate: number;
  }> {
    return this.client.getWrapped(`${this.endpoint}/analytics`, {
      params: { period }
    });
  }

  /**
   * Export chat session (for support purposes)
   */
  async exportSession(sessionId: string, format: 'json' | 'txt' | 'pdf' = 'json'): Promise<Blob> {
    const response = await this.client.get(`${this.endpoint}/session/${sessionId}/export`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  }
}

// Export singleton instance
export const chatService = new ChatService();