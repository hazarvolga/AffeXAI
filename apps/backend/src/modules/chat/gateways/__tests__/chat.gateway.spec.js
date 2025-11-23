"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const socket_io_client_1 = require("socket.io-client");
const chat_gateway_1 = require("../chat.gateway");
const chat_session_service_1 = require("../../services/chat-session.service");
const chat_message_service_1 = require("../../services/chat-message.service");
const chat_ai_service_1 = require("../../services/chat-ai.service");
const document_processor_service_1 = require("../../services/document-processor.service");
const url_processor_service_1 = require("../../services/url-processor.service");
const chat_handoff_service_1 = require("../../services/chat-handoff.service");
describe('ChatGateway (Integration)', () => {
    let app;
    let gateway;
    let clientSocket;
    let serverPort;
    const mockChatSessionService = {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        getUserActiveSessions: jest.fn(),
    };
    const mockChatMessageService = {
        create: jest.fn(),
        findBySession: jest.fn(),
        update: jest.fn(),
    };
    const mockChatAiService = {
        generateResponse: jest.fn(),
        streamResponse: jest.fn(),
    };
    const mockDocumentProcessorService = {
        processDocument: jest.fn(),
        extractText: jest.fn(),
    };
    const mockUrlProcessorService = {
        processUrl: jest.fn(),
        extractContent: jest.fn(),
    };
    const mockChatHandoffService = {
        assignSupport: jest.fn(),
        transferSession: jest.fn(),
    };
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            providers: [
                chat_gateway_1.ChatGateway,
                {
                    provide: chat_session_service_1.ChatSessionService,
                    useValue: mockChatSessionService,
                },
                {
                    provide: chat_message_service_1.ChatMessageService,
                    useValue: mockChatMessageService,
                },
                {
                    provide: chat_ai_service_1.ChatAiService,
                    useValue: mockChatAiService,
                },
                {
                    provide: document_processor_service_1.DocumentProcessorService,
                    useValue: mockDocumentProcessorService,
                },
                {
                    provide: url_processor_service_1.UrlProcessorService,
                    useValue: mockUrlProcessorService,
                },
                {
                    provide: chat_handoff_service_1.ChatHandoffService,
                    useValue: mockChatHandoffService,
                },
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        gateway = moduleFixture.get(chat_gateway_1.ChatGateway);
        await app.listen(0); // Random available port
        serverPort = app.getHttpServer().address().port;
    });
    afterAll(async () => {
        await app.close();
    });
    beforeEach((done) => {
        clientSocket = (0, socket_io_client_1.io)(`http://localhost:${serverPort}`, {
            transports: ['websocket'],
            auth: {
                token: 'test-jwt-token', // Mock JWT
            },
        });
        clientSocket.on('connect', () => {
            done();
        });
        clientSocket.on('connect_error', (error) => {
            done(error);
        });
    });
    afterEach(() => {
        if (clientSocket.connected) {
            clientSocket.disconnect();
        }
        jest.clearAllMocks();
    });
    describe('Connection Handling', () => {
        it('should successfully connect to WebSocket server', (done) => {
            expect(clientSocket.connected).toBe(true);
            done();
        });
        it('should disconnect gracefully', (done) => {
            clientSocket.on('disconnect', () => {
                expect(clientSocket.connected).toBe(false);
                done();
            });
            clientSocket.disconnect();
        });
        it('should handle connection errors', (done) => {
            const badSocket = (0, socket_io_client_1.io)(`http://localhost:${serverPort}`, {
                transports: ['websocket'],
                auth: {
                    token: 'invalid-token',
                },
            });
            badSocket.on('connect_error', (error) => {
                expect(error).toBeDefined();
                badSocket.disconnect();
                done();
            });
        });
    });
    describe('Session Management', () => {
        it('should join a chat session', (done) => {
            const sessionId = 'test-session-123';
            mockChatSessionService.findOne.mockResolvedValue({
                id: sessionId,
                userId: 'user-123',
                sessionType: 'support',
                status: 'active',
            });
            clientSocket.emit('join-session', { sessionId });
            clientSocket.on('session-joined', (data) => {
                expect(data.sessionId).toBe(sessionId);
                expect(mockChatSessionService.findOne).toHaveBeenCalledWith(sessionId);
                done();
            });
        });
        it('should create a new chat session', (done) => {
            const newSession = {
                id: 'new-session-456',
                userId: 'user-123',
                sessionType: 'support',
                status: 'active',
            };
            mockChatSessionService.create.mockResolvedValue(newSession);
            clientSocket.emit('create-session', { sessionType: 'support' });
            clientSocket.on('session-created', (data) => {
                expect(data.session.id).toBe(newSession.id);
                expect(mockChatSessionService.create).toHaveBeenCalled();
                done();
            });
        });
        it('should leave a chat session', (done) => {
            const sessionId = 'test-session-789';
            clientSocket.emit('leave-session', { sessionId });
            clientSocket.on('session-left', (data) => {
                expect(data.sessionId).toBe(sessionId);
                done();
            });
        });
    });
    describe('Message Handling', () => {
        it('should send and receive messages', (done) => {
            const message = {
                sessionId: 'test-session',
                content: 'Hello, I need help!',
                messageType: 'text',
            };
            const savedMessage = {
                id: 'msg-123',
                ...message,
                senderType: 'user',
                createdAt: new Date(),
            };
            mockChatMessageService.create.mockResolvedValue(savedMessage);
            mockChatAiService.generateResponse.mockResolvedValue({
                content: 'Hello! How can I assist you today?',
                contextSources: [],
            });
            clientSocket.emit('send-message', message);
            clientSocket.on('message-received', (data) => {
                expect(data.message.id).toBe(savedMessage.id);
                expect(data.message.content).toBe(message.content);
                done();
            });
        });
        it('should broadcast AI responses', (done) => {
            const message = {
                sessionId: 'test-session',
                content: 'What is your refund policy?',
                messageType: 'text',
            };
            mockChatMessageService.create.mockResolvedValue({
                id: 'msg-456',
                ...message,
            });
            mockChatAiService.generateResponse.mockResolvedValue({
                content: 'Our refund policy allows returns within 30 days...',
                contextSources: [
                    {
                        sourceType: 'knowledge_base',
                        title: 'Refund Policy',
                        relevanceScore: 0.9,
                    },
                ],
            });
            clientSocket.emit('send-message', message);
            clientSocket.on('ai-response', (data) => {
                expect(data.message.senderType).toBe('ai');
                expect(data.message.content).toContain('refund policy');
                expect(data.message.metadata.contextSources).toHaveLength(1);
                done();
            });
        });
        it('should handle typing indicators', (done) => {
            const sessionId = 'test-session';
            clientSocket.emit('typing-start', { sessionId });
            clientSocket.on('user-typing', (data) => {
                expect(data.sessionId).toBe(sessionId);
                expect(data.isTyping).toBe(true);
                done();
            });
        });
        it('should stop typing indicators', (done) => {
            const sessionId = 'test-session';
            clientSocket.emit('typing-stop', { sessionId });
            clientSocket.on('user-typing', (data) => {
                expect(data.sessionId).toBe(sessionId);
                expect(data.isTyping).toBe(false);
                done();
            });
        });
    });
    describe('File Upload Events', () => {
        it('should handle file upload initiation', (done) => {
            const fileData = {
                sessionId: 'test-session',
                fileName: 'document.pdf',
                fileSize: 1024000,
                fileType: 'application/pdf',
            };
            mockDocumentProcessorService.processDocument.mockResolvedValue({
                id: 'doc-123',
                extractedContent: 'This is the document content...',
                status: 'processed',
            });
            clientSocket.emit('upload-file', fileData);
            clientSocket.on('file-processing-started', (data) => {
                expect(data.fileName).toBe(fileData.fileName);
                expect(data.status).toBe('processing');
                done();
            });
        });
        it('should emit file processing progress', (done) => {
            const fileData = {
                sessionId: 'test-session',
                fileName: 'large-document.pdf',
            };
            clientSocket.emit('upload-file', fileData);
            const progressValues = [];
            clientSocket.on('file-processing-progress', (data) => {
                progressValues.push(data.progress);
                if (data.progress === 100) {
                    expect(progressValues.length).toBeGreaterThan(0);
                    expect(Math.max(...progressValues)).toBe(100);
                    done();
                }
            });
        });
    });
    describe('URL Processing Events', () => {
        it('should process shared URLs', (done) => {
            const urlData = {
                sessionId: 'test-session',
                url: 'https://example.com/article',
            };
            mockUrlProcessorService.processUrl.mockResolvedValue({
                id: 'url-123',
                url: urlData.url,
                title: 'Example Article',
                content: 'This is the article content...',
                status: 'processed',
            });
            clientSocket.emit('process-url', urlData);
            clientSocket.on('url-processing-started', (data) => {
                expect(data.url).toBe(urlData.url);
                done();
            });
        });
        it('should handle URL processing errors', (done) => {
            const urlData = {
                sessionId: 'test-session',
                url: 'https://invalid-url.com/404',
            };
            mockUrlProcessorService.processUrl.mockRejectedValue(new Error('URL not accessible'));
            clientSocket.emit('process-url', urlData);
            clientSocket.on('url-processing-error', (data) => {
                expect(data.error).toBeDefined();
                expect(data.url).toBe(urlData.url);
                done();
            });
        });
    });
    describe('Support Team Handoff', () => {
        it('should notify when support team joins', (done) => {
            const handoffData = {
                sessionId: 'test-session',
                supportUserId: 'support-123',
            };
            mockChatHandoffService.assignSupport.mockResolvedValue({
                sessionId: handoffData.sessionId,
                supportUserId: handoffData.supportUserId,
                assignedAt: new Date(),
            });
            clientSocket.emit('request-support-handoff', { sessionId: handoffData.sessionId });
            clientSocket.on('support-joined', (data) => {
                expect(data.sessionId).toBe(handoffData.sessionId);
                expect(data.supportUser).toBeDefined();
                done();
            });
        });
        it('should disable AI when support takes over', (done) => {
            const sessionId = 'test-session';
            clientSocket.emit('request-support-handoff', { sessionId });
            clientSocket.on('support-joined', (data) => {
                expect(data.aiEnabled).toBe(false);
                done();
            });
        });
    });
    describe('Error Handling', () => {
        it('should handle invalid session ID', (done) => {
            mockChatSessionService.findOne.mockResolvedValue(null);
            clientSocket.emit('join-session', { sessionId: 'non-existent' });
            clientSocket.on('error', (data) => {
                expect(data.message).toContain('Session not found');
                done();
            });
        });
        it('should handle message send failures', (done) => {
            mockChatMessageService.create.mockRejectedValue(new Error('Database error'));
            clientSocket.emit('send-message', {
                sessionId: 'test-session',
                content: 'Test message',
            });
            clientSocket.on('message-error', (data) => {
                expect(data.error).toBeDefined();
                done();
            });
        });
    });
    describe('Connection Quality', () => {
        it('should handle reconnection attempts', (done) => {
            clientSocket.disconnect();
            setTimeout(() => {
                clientSocket.connect();
                clientSocket.on('connect', () => {
                    expect(clientSocket.connected).toBe(true);
                    done();
                });
            }, 100);
        });
        it('should maintain session state after reconnection', (done) => {
            const sessionId = 'test-session';
            mockChatSessionService.findOne.mockResolvedValue({
                id: sessionId,
                status: 'active',
            });
            clientSocket.emit('join-session', { sessionId });
            clientSocket.once('session-joined', () => {
                clientSocket.disconnect();
                setTimeout(() => {
                    clientSocket.connect();
                    clientSocket.once('connect', () => {
                        clientSocket.emit('join-session', { sessionId });
                        clientSocket.on('session-joined', (data) => {
                            expect(data.sessionId).toBe(sessionId);
                            done();
                        });
                    });
                }, 100);
            });
        });
    });
});
//# sourceMappingURL=chat.gateway.spec.js.map