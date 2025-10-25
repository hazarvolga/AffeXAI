"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBox = ChatBox;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const scroll_area_1 = require("@/components/ui/scroll-area");
const badge_1 = require("@/components/ui/badge");
const separator_1 = require("@/components/ui/separator");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const ChatMessage_1 = require("./ChatMessage");
const FileUploadArea_1 = require("./FileUploadArea");
const UrlInputArea_1 = require("./UrlInputArea");
const TypingIndicator_1 = require("./TypingIndicator");
const ConnectionStatus_1 = require("./ConnectionStatus");
const use_chat_socket_1 = require("@/hooks/use-chat-socket");
function ChatBox({ sessionType = 'support', className, onSessionCreate, onMessageSent, embedded = false, showHeader = true, height = '600px' }) {
    const [isMinimized, setIsMinimized] = (0, react_1.useState)(false);
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const [currentMessage, setCurrentMessage] = (0, react_1.useState)('');
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [session, setSession] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [showFileUpload, setShowFileUpload] = (0, react_1.useState)(false);
    const [showUrlInput, setShowUrlInput] = (0, react_1.useState)(false);
    const [isTyping, setIsTyping] = (0, react_1.useState)(false);
    const [typingUser, setTypingUser] = (0, react_1.useState)(null);
    const [showEscalationSuggestion, setShowEscalationSuggestion] = (0, react_1.useState)(false);
    const [escalationReason, setEscalationReason] = (0, react_1.useState)(null);
    const messagesEndRef = (0, react_1.useRef)(null);
    const inputRef = (0, react_1.useRef)(null);
    // Initialize chat socket connection
    const { isConnected, connectionError, connectionQuality, lastPingTime, queuedMessageCount, sendMessage, joinSession, uploadFile, processUrl, startTyping, stopTyping, reconnect } = (0, use_chat_socket_1.useChatSocket)({
        onMessageReceived: handleMessageReceived,
        onAiResponseStart: handleAiResponseStart,
        onAiResponseChunk: handleAiResponseChunk,
        onAiResponseComplete: handleAiResponseComplete,
        onTypingIndicator: handleTypingIndicator,
        onSessionUpdated: handleSessionUpdated,
        onEscalationSuggested: handleEscalationSuggested
    });
    // Auto-scroll to bottom when new messages arrive
    (0, react_1.useEffect)(() => {
        scrollToBottom();
    }, [messages]);
    // Focus input when expanded
    (0, react_1.useEffect)(() => {
        if (!isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isMinimized]);
    // Initialize session on mount
    (0, react_1.useEffect)(() => {
        initializeSession();
    }, [sessionType]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const initializeSession = async () => {
        try {
            setIsLoading(true);
            // Create session via API based on session type
            let newSession;
            if (sessionType === 'general') {
                // Create general communication session
                const response = await fetch('/api/chat/general/sessions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    },
                    body: JSON.stringify({
                        title: 'Genel Sohbet',
                        language: 'tr'
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to create general session');
                }
                const data = await response.json();
                newSession = data.session;
                // Set conversation starters if available
                if (data.conversationStarters) {
                    // You could show these as quick reply buttons
                    console.log('Conversation starters:', data.conversationStarters);
                }
            }
            else {
                // Create support session (existing logic)
                newSession = {
                    id: generateId(),
                    userId: 'current-user-id', // This should come from auth context
                    sessionType,
                    status: 'active',
                    title: 'Destek Sohbeti',
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
            }
            setSession(newSession);
            onSessionCreate?.(newSession);
            // Join the session via WebSocket
            if (isConnected) {
                joinSession(newSession.id);
            }
            // Add welcome message
            const welcomeMessage = {
                id: generateId(),
                sessionId: newSession.id,
                senderType: 'ai',
                content: sessionType === 'support'
                    ? 'Merhaba! Size nasıl yardımcı olabilirim? Sorularınızı sorabilir, dosya yükleyebilir veya web sayfası linklerini paylaşabilirsiniz.'
                    : 'Merhaba! Platform hakkında genel sorularınız için buradayım. Size nasıl yardımcı olabilirim?',
                messageType: 'text',
                metadata: {
                    aiModel: sessionType === 'general' ? 'general-communication' : 'gpt-4o',
                    confidence: 1.0,
                    responseType: 'welcome'
                },
                createdAt: new Date()
            };
            setMessages([welcomeMessage]);
        }
        catch (error) {
            console.error('Failed to initialize chat session:', error);
            // Fallback to local session creation
            const fallbackSession = {
                id: generateId(),
                userId: 'current-user-id',
                sessionType,
                status: 'active',
                title: `${sessionType === 'support' ? 'Destek' : 'Genel'} Sohbeti`,
                metadata: {
                    aiProvider: 'openai',
                    modelUsed: sessionType === 'general' ? 'general-communication' : 'gpt-4o',
                    contextSources: 0,
                    messageCount: 0,
                    supportAssigned: false,
                    fallback: true
                },
                createdAt: new Date(),
                updatedAt: new Date()
            };
            setSession(fallbackSession);
            onSessionCreate?.(fallbackSession);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSendMessage = async () => {
        if (!currentMessage.trim() || !session || isLoading)
            return;
        const userMessage = {
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
        }
        catch (error) {
            console.error('Failed to send message:', error);
            // TODO: Add error handling UI
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleInputChange = (e) => {
        setCurrentMessage(e.target.value);
        // Handle typing indicators
        if (e.target.value && !isTyping) {
            setIsTyping(true);
            startTyping(session?.id || '');
        }
        else if (!e.target.value && isTyping) {
            setIsTyping(false);
            stopTyping(session?.id || '');
        }
    };
    const handleFileUpload = async (files) => {
        if (!session)
            return;
        for (const file of files) {
            try {
                setIsLoading(true);
                // Create file message
                const fileMessage = {
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
            }
            catch (error) {
                console.error('Failed to upload file:', error);
            }
            finally {
                setIsLoading(false);
            }
        }
        setShowFileUpload(false);
    };
    const handleUrlProcess = async (url) => {
        if (!session)
            return;
        try {
            setIsLoading(true);
            // Create URL message
            const urlMessage = {
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
        }
        catch (error) {
            console.error('Failed to process URL:', error);
        }
        finally {
            setIsLoading(false);
            setShowUrlInput(false);
        }
    };
    // WebSocket event handlers
    function handleMessageReceived(message) {
        setMessages(prev => [...prev, message]);
    }
    function handleAiResponseStart(sessionId) {
        setIsLoading(true);
    }
    function handleAiResponseChunk(data) {
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
            }
            else {
                // Create new streaming message
                const streamingMessage = {
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
    function handleAiResponseComplete(message) {
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
    function handleTypingIndicator(data) {
        if (data.isTyping) {
            setTypingUser(data.userName);
        }
        else {
            setTypingUser(null);
        }
    }
    function handleSessionUpdated(updatedSession) {
        setSession(updatedSession);
    }
    function handleEscalationSuggested(data) {
        if (data.sessionId === session?.id) {
            setShowEscalationSuggestion(true);
            setEscalationReason(data.reason);
        }
    }
    const handleEscalateToSupport = async () => {
        if (!session)
            return;
        try {
            setIsLoading(true);
            // Send escalation via WebSocket
            if (isConnected) {
                // Use WebSocket for real-time escalation
                const escalationData = {
                    sessionId: session.id,
                    reason: escalationReason || 'user-requested',
                    notes: 'Kullanıcı destek ekibiyle iletişime geçmek istiyor'
                };
                // Emit escalation event (this would be handled by the WebSocket)
                // For now, we'll make an API call
                const response = await fetch(`/api/chat/general/sessions/${session.id}/escalate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    },
                    body: JSON.stringify(escalationData)
                });
                if (response.ok) {
                    const data = await response.json();
                    setSession(data.session);
                    setShowEscalationSuggestion(false);
                    setEscalationReason(null);
                    // Add system message
                    const escalationMessage = {
                        id: generateId(),
                        sessionId: session.id,
                        senderType: 'ai',
                        content: 'Sohbet destek ekibine yönlendirildi. Bir destek temsilcisi kısa süre içinde size yardımcı olacak.',
                        messageType: 'system',
                        metadata: {
                            escalation: true,
                            escalatedAt: new Date()
                        },
                        createdAt: new Date()
                    };
                    setMessages(prev => [...prev, escalationMessage]);
                }
            }
        }
        catch (error) {
            console.error('Failed to escalate to support:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const generateId = () => {
        return Math.random().toString(36).substr(2, 9);
    };
    // Don't show minimized state in embedded mode
    if (isMinimized && !embedded) {
        return (<div className={(0, utils_1.cn)("fixed bottom-4 right-4 z-50", className)}>
        <button_1.Button onClick={() => setIsMinimized(false)} className="rounded-full h-12 w-12 shadow-lg" size="icon">
          <lucide_react_1.MessageCircle className="h-6 w-6"/>
        </button_1.Button>
        {!isConnected && (<badge_1.Badge variant="destructive" className="absolute -top-2 -left-2">
            Bağlantı Yok
          </badge_1.Badge>)}
      </div>);
    }
    return (<div className={(0, utils_1.cn)(embedded
            ? "w-full h-full"
            : "fixed bottom-4 right-4 z-50 transition-all duration-300", !embedded && (isExpanded ? "inset-4" : `w-96`), className)} style={embedded ? { height } : undefined}>
      <card_1.Card className={(0, utils_1.cn)("h-full flex flex-col", embedded ? "shadow-none border-0" : "shadow-2xl")}>
        {showHeader && (<card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <lucide_react_1.Bot className="h-5 w-5 text-primary"/>
                <card_1.CardTitle className="text-lg">
                  {sessionType === 'support' ? 'AI Destek' : 'AI Asistan'}
                </card_1.CardTitle>
              </div>
              <div className="flex items-center space-x-1">
                <div className={(0, utils_1.cn)("w-2 h-2 rounded-full", isConnected ? "bg-green-500" : "bg-red-500")}/>
                <span className="text-xs text-muted-foreground">
                  {isConnected ? 'Bağlı' : 'Bağlantı Yok'}
                </span>
              </div>
            </div>
            {!embedded && (<div className="flex items-center space-x-1">
                <button_1.Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8">
                  {isExpanded ? <lucide_react_1.Minimize2 className="h-4 w-4"/> : <lucide_react_1.Maximize2 className="h-4 w-4"/>}
                </button_1.Button>
                <button_1.Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-8 w-8">
                  <lucide_react_1.X className="h-4 w-4"/>
                </button_1.Button>
              </div>)}
          </card_1.CardHeader>)}
        
        {showHeader && <separator_1.Separator />}

        
        {/* Connection Status */}
        <ConnectionStatus_1.ConnectionStatus isConnected={isConnected} connectionQuality={connectionQuality} connectionError={connectionError} lastPingTime={lastPingTime} queuedMessageCount={queuedMessageCount} onReconnect={reconnect}/>
        
        <card_1.CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <scroll_area_1.ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (<ChatMessage_1.ChatMessage key={message.id} message={message}/>))}
              {typingUser && (<TypingIndicator_1.TypingIndicator userName={typingUser}/>)}
              <div ref={messagesEndRef}/>
            </div>
          </scroll_area_1.ScrollArea>
          
          <separator_1.Separator />
          
          {/* File Upload Area */}
          {showFileUpload && (<div className="p-4 border-t">
              <FileUploadArea_1.FileUploadArea onFilesSelected={handleFileUpload} onCancel={() => setShowFileUpload(false)}/>
            </div>)}
          
          {/* URL Input Area */}
          {showUrlInput && (<div className="p-4 border-t">
              <UrlInputArea_1.UrlInputArea onUrlSubmit={handleUrlProcess} onCancel={() => setShowUrlInput(false)}/>
            </div>)}
          
          {/* Escalation Suggestion */}
          {showEscalationSuggestion && sessionType === 'general' && (<div className="p-4 border-t bg-blue-50 dark:bg-blue-950">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <lucide_react_1.User className="h-4 w-4 text-blue-600 dark:text-blue-400"/>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Destek Ekibiyle İletişim
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Bu konuda size daha iyi yardımcı olabilmek için destek ekibimizle iletişime geçmenizi öneriyorum.
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <button_1.Button size="sm" onClick={handleEscalateToSupport} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Destek Ekibiyle İletişim
                    </button_1.Button>
                    <button_1.Button size="sm" variant="outline" onClick={() => setShowEscalationSuggestion(false)} className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      Devam Et
                    </button_1.Button>
                  </div>
                </div>
              </div>
            </div>)}
          
          {/* Input Area */}
          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <button_1.Button variant="outline" size="icon" onClick={() => setShowFileUpload(!showFileUpload)} disabled={isLoading} className="h-9 w-9">
                <lucide_react_1.Paperclip className="h-4 w-4"/>
              </button_1.Button>
              <button_1.Button variant="outline" size="icon" onClick={() => setShowUrlInput(!showUrlInput)} disabled={isLoading} className="h-9 w-9">
                <lucide_react_1.Link className="h-4 w-4"/>
              </button_1.Button>
              <div className="flex-1 relative">
                <input_1.Input ref={inputRef} value={currentMessage} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Mesajınızı yazın..." disabled={isLoading} className="pr-10"/>
                <button_1.Button onClick={handleSendMessage} disabled={!currentMessage.trim() || isLoading} size="icon" className="absolute right-1 top-1 h-7 w-7">
                  {isLoading ? (<lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>) : (<lucide_react_1.Send className="h-4 w-4"/>)}
                </button_1.Button>
              </div>
            </div>
            
            {session && (<div className="text-xs text-muted-foreground text-center">
                Oturum: {session.id.slice(0, 8)}... • {messages.length} mesaj
              </div>)}
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=ChatBox.js.map