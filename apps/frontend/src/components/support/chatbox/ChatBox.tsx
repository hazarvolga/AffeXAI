'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2, 
  X,
  Bot,
  User,
  Loader2,
  Paperclip,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from './ChatMessage';
import { FileUploadArea } from './FileUploadArea';
import { UrlInputArea } from './UrlInputArea';
import { TypingIndicator } from './TypingIndicator';
import { ContextSourceVisualization, ContextSource } from './ContextSourceVisualization';
import { ConnectionStatus } from './ConnectionStatus';
import { useChatSocket } from '@/hooks/use-chat-socket';

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
}

export function ChatBox({ 
  sessionType = 'support', 
  className,
  onSessionCreate,
  onMessageSent 
}: ChatBoxProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize chat socket connection
  const {
    isConnected,
    connectionError,
    connectionQuality,
    lastPingTime,
    queuedMessageCount,
    sendMessage,
    joinSession,
    uploadFile,
    processUrl,
    startTyping,
    stopTyping,
    reconnect
  } = useChatSocket({
    onMessageReceived: handleMessageReceived,
    onAiResponseStart: handleAiResponseStart,
    onAiResponseChunk: handleAiResponseChunk,
    onAiResponseComplete: handleAiResponseComplete,
    onTypingIndicator: handleTypingIndicator,
    onSessionUpdated: handleSessionUpdated
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when expanded
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
  }, [sessionType]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      // Create new chat session
      const newSession: ChatSession = {
        id: generateId(),
        userId: 'current-user-id', // This should come from auth context
        sessionType,
        status: 'active',
        title: `${sessionType === 'support' ? 'Destek' : 'Genel'} Sohbeti`,
        metadata: {
          aiProvider: 'openai',
          modelUsed: 'gpt-4o',
          contextSources: 0,
          messageCount: 0,
          supportAssigned: false
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setSession(newSession);
      onSessionCreate?.(newSession);
      
      // Join the session via WebSocket
      if (isConnected) {
        joinSession(newSession.id);
      }
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: generateId(),
        sessionId: newSession.id,
        senderType: 'ai',
        content: sessionType === 'support' 
          ? 'Merhaba! Size nasıl yardımcı olabilirim? Sorularınızı sorabilir, dosya yükleyebilir veya web sayfası linklerini paylaşabilirsiniz.'
          : 'Merhaba! Genel sorularınız için buradayım. Size nasıl yardımcı olabilirim?',
        messageType: 'text',
        metadata: {
          aiModel: 'gpt-4o',
          confidence: 1.0
        },
        createdAt: new Date()
      };
      
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Failed to initialize chat session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !session || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      sessionId: session.id,
      senderType: 'user',
      senderId: session.userId,
      content: currentMessage.trim(),
      messageType: 'text',
      createdAt: new Date()
    };

    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      // Send message via WebSocket
      if (isConnected) {
        await sendMessage({
          sessionId: session.id,
          content: userMessage.content,
          messageType: 'text'
        });
      }
      
      onMessageSent?.(userMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
      // TODO: Add error handling UI
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
    
    // Handle typing indicators
    if (e.target.value && !isTyping) {
      setIsTyping(true);
      startTyping(session?.id || '');
    } else if (!e.target.value && isTyping) {
      setIsTyping(false);
      stopTyping(session?.id || '');
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (!session) return;
    
    for (const file of files) {
      try {
        setIsLoading(true);
        
        // Create file message
        const fileMessage: ChatMessage = {
          id: generateId(),
          sessionId: session.id,
          senderType: 'user',
          senderId: session.userId,
          content: `Dosya yüklendi: ${file.name}`,
          messageType: 'file',
          metadata: {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type
          },
          createdAt: new Date()
        };
        
        setMessages(prev => [...prev, fileMessage]);
        
        // Upload file via WebSocket
        if (isConnected) {
          await uploadFile({
            sessionId: session.id,
            file,
            messageId: fileMessage.id
          });
        }
        
      } catch (error) {
        console.error('Failed to upload file:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    setShowFileUpload(false);
  };

  const handleUrlProcess = async (url: string) => {
    if (!session) return;
    
    try {
      setIsLoading(true);
      
      // Create URL message
      const urlMessage: ChatMessage = {
        id: generateId(),
        sessionId: session.id,
        senderType: 'user',
        senderId: session.userId,
        content: `URL paylaşıldı: ${url}`,
        messageType: 'url',
        metadata: {
          url
        },
        createdAt: new Date()
      };
      
      setMessages(prev => [...prev, urlMessage]);
      
      // Process URL via WebSocket
      if (isConnected) {
        await processUrl({
          sessionId: session.id,
          url,
          messageId: urlMessage.id
        });
      }
      
    } catch (error) {
      console.error('Failed to process URL:', error);
    } finally {
      setIsLoading(false);
      setShowUrlInput(false);
    }
  };

  // WebSocket event handlers
  function handleMessageReceived(message: ChatMessage) {
    setMessages(prev => [...prev, message]);
  }

  function handleAiResponseStart(sessionId: string) {
    setIsLoading(true);
  }

  function handleAiResponseChunk(data: { sessionId: string; chunk: string }) {
    // Handle streaming response chunks
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && lastMessage.senderType === 'ai' && lastMessage.metadata?.streaming) {
        return [
          ...prev.slice(0, -1),
          {
            ...lastMessage,
            content: lastMessage.content + data.chunk
          }
        ];
      } else {
        // Create new streaming message
        const streamingMessage: ChatMessage = {
          id: generateId(),
          sessionId: data.sessionId,
          senderType: 'ai',
          content: data.chunk,
          messageType: 'text',
          metadata: {
            streaming: true,
            aiModel: 'gpt-4o'
          },
          createdAt: new Date()
        };
        return [...prev, streamingMessage];
      }
    });
  }

  function handleAiResponseComplete(message: ChatMessage) {
    setIsLoading(false);
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && lastMessage.senderType === 'ai' && lastMessage.metadata?.streaming) {
        return [
          ...prev.slice(0, -1),
          {
            ...message,
            metadata: {
              ...message.metadata,
              streaming: false
            }
          }
        ];
      }
      return prev;
    });
  }

  function handleTypingIndicator(data: { sessionId: string; userId: string; userName: string; isTyping: boolean }) {
    if (data.isTyping) {
      setTypingUser(data.userName);
    } else {
      setTypingUser(null);
    }
  }

  function handleSessionUpdated(updatedSession: ChatSession) {
    setSession(updatedSession);
  }

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  if (isMinimized) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className)}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full h-12 w-12 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        {!isConnected && (
          <Badge variant="destructive" className="absolute -top-2 -left-2">
            Bağlantı Yok
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 transition-all duration-300",
      isExpanded ? "inset-4" : "w-96 h-[600px]",
      className
    )}>
      <Card className="h-full flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">
                {sessionType === 'support' ? 'AI Destek' : 'AI Asistan'}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isConnected ? "bg-green-500" : "bg-red-500"
              )} />
              <span className="text-xs text-muted-foreground">
                {isConnected ? 'Bağlı' : 'Bağlantı Yok'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8"
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <Separator />
        
        {/* Connection Status */}
        <ConnectionStatus
          isConnected={isConnected}
          connectionQuality={connectionQuality}
          connectionError={connectionError}
          lastPingTime={lastPingTime}
          queuedMessageCount={queuedMessageCount}
          onReconnect={reconnect}
        />
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {typingUser && (
                <TypingIndicator userName={typingUser} />
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <Separator />
          
          {/* File Upload Area */}
          {showFileUpload && (
            <div className="p-4 border-t">
              <FileUploadArea
                onFilesSelected={handleFileUpload}
                onCancel={() => setShowFileUpload(false)}
              />
            </div>
          )}
          
          {/* URL Input Area */}
          {showUrlInput && (
            <div className="p-4 border-t">
              <UrlInputArea
                onUrlSubmit={handleUrlProcess}
                onCancel={() => setShowUrlInput(false)}
              />
            </div>
          )}
          
          {/* Input Area */}
          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFileUpload(!showFileUpload)}
                disabled={isLoading}
                className="h-9 w-9"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowUrlInput(!showUrlInput)}
                disabled={isLoading}
                className="h-9 w-9"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={currentMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  disabled={isLoading}
                  className="pr-10"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {session && (
              <div className="text-xs text-muted-foreground text-center">
                Oturum: {session.id.slice(0, 8)}... • {messages.length} mesaj
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}