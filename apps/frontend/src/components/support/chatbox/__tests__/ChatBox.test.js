"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const ChatBox_1 = require("../ChatBox");
const use_chat_socket_1 = require("@/hooks/use-chat-socket");
// Mock the custom hook
jest.mock('@/hooks/use-chat-socket');
// Mock sub-components
jest.mock('../ChatMessage', () => ({
    ChatMessage: ({ message }) => (<div data-testid={`message-${message.id}`}>
      {message.content}
    </div>),
}));
jest.mock('../FileUploadArea', () => ({
    FileUploadArea: ({ onFileSelect }) => (<div data-testid="file-upload-area">
      <button onClick={() => onFileSelect([{ name: 'test.pdf' }])}>
        Upload File
      </button>
    </div>),
}));
jest.mock('../UrlInputArea', () => ({
    UrlInputArea: ({ onUrlSubmit }) => (<div data-testid="url-input-area">
      <button onClick={() => onUrlSubmit('https://example.com')}>
        Submit URL
      </button>
    </div>),
}));
jest.mock('../TypingIndicator', () => ({
    TypingIndicator: () => (<div data-testid="typing-indicator">Typing...</div>),
}));
jest.mock('../ContextSourceVisualization', () => ({
    ContextSourceVisualization: ({ sources }) => (<div data-testid="context-sources">
      {sources.length} sources
    </div>),
}));
jest.mock('../ConnectionStatus', () => ({
    ConnectionStatus: ({ status }) => (<div data-testid="connection-status">{status}</div>),
}));
describe('ChatBox Component', () => {
    const mockUseChatSocket = use_chat_socket_1.useChatSocket;
    const defaultMockSocket = {
        session: {
            id: 'test-session-123',
            sessionType: 'support',
            status: 'active',
            userId: 'user-123',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        messages: [],
        isConnected: true,
        isTyping: false,
        connectionQuality: 'good',
        sendMessage: jest.fn(),
        uploadFile: jest.fn(),
        processUrl: jest.fn(),
        joinSession: jest.fn(),
        leaveSession: jest.fn(),
        startTyping: jest.fn(),
        stopTyping: jest.fn(),
        requestSupportHandoff: jest.fn(),
    };
    beforeEach(() => {
        mockUseChatSocket.mockReturnValue(defaultMockSocket);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('Rendering', () => {
        it('should render without crashing', () => {
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByTestId('connection-status')).toBeInTheDocument();
        });
        it('should render with custom height', () => {
            const { container } = (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support" height="800px"/>);
            const chatBox = container.firstChild;
            expect(chatBox.style.height).toBe('800px');
        });
        it('should display header when showHeader is true', () => {
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support" showHeader={true}/>);
            expect(react_2.screen.getByText(/AI Destek Asistanı|Support Chat/i)).toBeInTheDocument();
        });
        it('should hide header when showHeader is false', () => {
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support" showHeader={false}/>);
            expect(react_2.screen.queryByText(/AI Destek Asistanı|Support Chat/i)).not.toBeInTheDocument();
        });
        it('should apply embedded styles when embedded prop is true', () => {
            const { container } = (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support" embedded={true}/>);
            expect(container.firstChild).toHaveClass('embedded');
        });
    });
    describe('Connection Status', () => {
        it('should display connected status', () => {
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                isConnected: true,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByTestId('connection-status')).toHaveTextContent('connected');
        });
        it('should display disconnected status', () => {
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                isConnected: false,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByTestId('connection-status')).toHaveTextContent('disconnected');
        });
        it('should show reconnecting indicator', () => {
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                isConnected: false,
                connectionQuality: 'reconnecting',
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByTestId('connection-status')).toHaveTextContent('reconnecting');
        });
    });
    describe('Message Handling', () => {
        it('should display messages from session', () => {
            const mockMessages = [
                {
                    id: 'msg-1',
                    sessionId: 'test-session',
                    senderType: 'user',
                    content: 'Hello, I need help!',
                    messageType: 'text',
                    createdAt: new Date(),
                },
                {
                    id: 'msg-2',
                    sessionId: 'test-session',
                    senderType: 'ai',
                    content: 'Hello! How can I assist you?',
                    messageType: 'text',
                    createdAt: new Date(),
                },
            ];
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                messages: mockMessages,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByTestId('message-msg-1')).toHaveTextContent('Hello, I need help!');
            expect(react_2.screen.getByTestId('message-msg-2')).toHaveTextContent('Hello! How can I assist you?');
        });
        it('should send message when user submits', async () => {
            const user = user_event_1.default.setup();
            const mockSendMessage = jest.fn();
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                sendMessage: mockSendMessage,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const input = react_2.screen.getByPlaceholderText(/Mesajınızı yazın|Type your message/i);
            const sendButton = react_2.screen.getByRole('button', { name: /send|gönder/i });
            await user.type(input, 'Test message');
            await user.click(sendButton);
            expect(mockSendMessage).toHaveBeenCalledWith({
                content: 'Test message',
                messageType: 'text',
            });
        });
        it('should not send empty messages', async () => {
            const user = user_event_1.default.setup();
            const mockSendMessage = jest.fn();
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                sendMessage: mockSendMessage,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const sendButton = react_2.screen.getByRole('button', { name: /send|gönder/i });
            await user.click(sendButton);
            expect(mockSendMessage).not.toHaveBeenCalled();
        });
        it('should clear input after sending message', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const input = react_2.screen.getByPlaceholderText(/Mesajınızı yazın|Type your message/i);
            const sendButton = react_2.screen.getByRole('button', { name: /send|gönder/i });
            await user.type(input, 'Test message');
            await user.click(sendButton);
            expect(input.value).toBe('');
        });
    });
    describe('Typing Indicators', () => {
        it('should show typing indicator when isTyping is true', () => {
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                isTyping: true,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByTestId('typing-indicator')).toBeInTheDocument();
        });
        it('should hide typing indicator when isTyping is false', () => {
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                isTyping: false,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.queryByTestId('typing-indicator')).not.toBeInTheDocument();
        });
        it('should call startTyping when user types', async () => {
            const user = user_event_1.default.setup();
            const mockStartTyping = jest.fn();
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                startTyping: mockStartTyping,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const input = react_2.screen.getByPlaceholderText(/Mesajınızı yazın|Type your message/i);
            await user.type(input, 'T');
            await (0, react_2.waitFor)(() => {
                expect(mockStartTyping).toHaveBeenCalled();
            });
        });
        it('should call stopTyping when user stops typing', async () => {
            const user = user_event_1.default.setup();
            const mockStopTyping = jest.fn();
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                stopTyping: mockStopTyping,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const input = react_2.screen.getByPlaceholderText(/Mesajınızı yazın|Type your message/i);
            await user.type(input, 'Test');
            // Wait for typing timeout
            await (0, react_2.waitFor)(() => {
                expect(mockStopTyping).toHaveBeenCalled();
            }, { timeout: 3000 });
        });
    });
    describe('File Upload', () => {
        it('should show file upload area when toggled', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const fileButton = react_2.screen.getByRole('button', { name: /attach|dosya|file/i });
            await user.click(fileButton);
            expect(react_2.screen.getByTestId('file-upload-area')).toBeInTheDocument();
        });
        it('should upload file when selected', async () => {
            const user = user_event_1.default.setup();
            const mockUploadFile = jest.fn();
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                uploadFile: mockUploadFile,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const fileButton = react_2.screen.getByRole('button', { name: /attach|dosya|file/i });
            await user.click(fileButton);
            const uploadButton = react_2.screen.getByText('Upload File');
            await user.click(uploadButton);
            expect(mockUploadFile).toHaveBeenCalled();
        });
    });
    describe('URL Processing', () => {
        it('should show URL input area when toggled', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const urlButton = react_2.screen.getByRole('button', { name: /link|url/i });
            await user.click(urlButton);
            expect(react_2.screen.getByTestId('url-input-area')).toBeInTheDocument();
        });
        it('should process URL when submitted', async () => {
            const user = user_event_1.default.setup();
            const mockProcessUrl = jest.fn();
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                processUrl: mockProcessUrl,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const urlButton = react_2.screen.getByRole('button', { name: /link|url/i });
            await user.click(urlButton);
            const submitButton = react_2.screen.getByText('Submit URL');
            await user.click(submitButton);
            expect(mockProcessUrl).toHaveBeenCalledWith('https://example.com');
        });
    });
    describe('Session Management', () => {
        it('should call onSessionCreate when session is created', () => {
            const mockOnSessionCreate = jest.fn();
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support" onSessionCreate={mockOnSessionCreate}/>);
            expect(mockOnSessionCreate).toHaveBeenCalledWith(defaultMockSocket.session);
        });
        it('should call onMessageSent when message is sent', async () => {
            const user = user_event_1.default.setup();
            const mockOnMessageSent = jest.fn();
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support" onMessageSent={mockOnMessageSent}/>);
            const input = react_2.screen.getByPlaceholderText(/Mesajınızı yazın|Type your message/i);
            const sendButton = react_2.screen.getByRole('button', { name: /send|gönder/i });
            await user.type(input, 'Test message');
            await user.click(sendButton);
            await (0, react_2.waitFor)(() => {
                expect(mockOnMessageSent).toHaveBeenCalled();
            });
        });
    });
    describe('Context Sources', () => {
        it('should display context sources in AI messages', () => {
            const mockMessages = [
                {
                    id: 'msg-ai',
                    sessionId: 'test-session',
                    senderType: 'ai',
                    content: 'Based on our knowledge base...',
                    messageType: 'text',
                    metadata: {
                        contextSources: [
                            {
                                sourceType: 'knowledge_base',
                                title: 'KB Article',
                                relevanceScore: 0.9,
                            },
                        ],
                    },
                    createdAt: new Date(),
                },
            ];
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                messages: mockMessages,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByTestId('context-sources')).toBeInTheDocument();
            expect(react_2.screen.getByTestId('context-sources')).toHaveTextContent('1 sources');
        });
    });
    describe('Accessibility', () => {
        it('should have proper ARIA labels', () => {
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByRole('textbox')).toHaveAttribute('aria-label');
            expect(react_2.screen.getByRole('button', { name: /send|gönder/i })).toBeInTheDocument();
        });
        it('should be keyboard navigable', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const input = react_2.screen.getByPlaceholderText(/Mesajınızı yazın|Type your message/i);
            await user.tab();
            expect(input).toHaveFocus();
        });
        it('should support Enter key to send message', async () => {
            const user = user_event_1.default.setup();
            const mockSendMessage = jest.fn();
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                sendMessage: mockSendMessage,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const input = react_2.screen.getByPlaceholderText(/Mesajınızı yazın|Type your message/i);
            await user.type(input, 'Test message{Enter}');
            expect(mockSendMessage).toHaveBeenCalled();
        });
    });
    describe('Error Handling', () => {
        it('should display error when session is null', () => {
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                session: null,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            expect(react_2.screen.getByText(/Oturum bulunamadı|Session not found/i)).toBeInTheDocument();
        });
        it('should handle send message errors gracefully', async () => {
            const user = user_event_1.default.setup();
            const mockSendMessage = jest.fn().mockRejectedValue(new Error('Network error'));
            mockUseChatSocket.mockReturnValue({
                ...defaultMockSocket,
                sendMessage: mockSendMessage,
            });
            (0, react_2.render)(<ChatBox_1.ChatBox sessionType="support"/>);
            const input = react_2.screen.getByPlaceholderText(/Mesajınızı yazın|Type your message/i);
            const sendButton = react_2.screen.getByRole('button', { name: /send|gönder/i });
            await user.type(input, 'Test message');
            await user.click(sendButton);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.getByText(/hata|error/i)).toBeInTheDocument();
            });
        });
    });
});
//# sourceMappingURL=ChatBox.test.js.map