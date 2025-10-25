"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatSocket = useChatSocket;
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
function useChatSocket(options = {}) {
    const [isConnected, setIsConnected] = (0, react_1.useState)(false);
    const [connectionError, setConnectionError] = (0, react_1.useState)(null);
    const [connectionQuality, setConnectionQuality] = (0, react_1.useState)('offline');
    const [lastPingTime, setLastPingTime] = (0, react_1.useState)(null);
    const socketRef = (0, react_1.useRef)(null);
    const reconnectTimeoutRef = (0, react_1.useRef)(null);
    const heartbeatTimeoutRef = (0, react_1.useRef)(null);
    const pingIntervalRef = (0, react_1.useRef)(null);
    const reconnectAttempts = (0, react_1.useRef)(0);
    const maxReconnectAttempts = 5;
    const messageQueue = (0, react_1.useRef)([]);
    const { onMessageReceived, onAiResponseStart, onAiResponseChunk, onAiResponseComplete, onFileProcessingStatus, onUrlProcessingStatus, onSupportJoined, onSupportLeft, onTypingIndicator, onSessionUpdated, onConnectionStatusChange, onEscalationSuggested } = options;
    // Initialize socket connection
    const initializeSocket = (0, react_1.useCallback)(() => {
        if (socketRef.current?.connected) {
            return;
        }
        try {
            // Create socket connection
            const socket = (0, socket_io_client_1.io)(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
                transports: ['websocket', 'polling'],
                timeout: 20000,
                forceNew: true,
                reconnection: true,
                reconnectionAttempts: maxReconnectAttempts,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                auth: {
                    // Add authentication token if available
                    token: localStorage.getItem('auth_token')
                }
            });
            socketRef.current = socket;
            // Connection event handlers
            socket.on('connect', () => {
                console.log('Chat socket connected');
                setIsConnected(true);
                setConnectionError(null);
                setConnectionQuality('good');
                reconnectAttempts.current = 0;
                onConnectionStatusChange?.(true);
                // Process queued messages
                processMessageQueue();
                // Start heartbeat monitoring
                startHeartbeat();
                // Start ping monitoring for connection quality
                startPingMonitoring();
            });
            socket.on('disconnect', (reason) => {
                console.log('Chat socket disconnected:', reason);
                setIsConnected(false);
                setConnectionQuality('offline');
                onConnectionStatusChange?.(false);
                // Clear monitoring intervals
                clearHeartbeat();
                clearPingMonitoring();
                if (reason === 'io server disconnect') {
                    // Server initiated disconnect, try to reconnect
                    attemptReconnect();
                }
                else if (reason === 'transport close' || reason === 'transport error') {
                    // Network issues, attempt reconnect
                    attemptReconnect();
                }
            });
            socket.on('connect_error', (error) => {
                console.error('Chat socket connection error:', error);
                setConnectionError(error.message);
                setIsConnected(false);
                setConnectionQuality('offline');
                onConnectionStatusChange?.(false);
                attemptReconnect();
            });
            // Enhanced connection monitoring
            socket.on('connection-established', (data) => {
                console.log('Connection established:', data);
                setConnectionQuality('good');
            });
            socket.on('heartbeat-request', (data) => {
                socket.emit('heartbeat', { timestamp: new Date().toISOString() });
            });
            socket.on('heartbeat-ack', (data) => {
                // Connection is healthy
                setConnectionQuality('good');
            });
            socket.on('pong', (data) => {
                const now = Date.now();
                const pingTime = now - parseInt(data.clientTimestamp);
                setLastPingTime(pingTime);
                // Update connection quality based on ping time
                if (pingTime < 100) {
                    setConnectionQuality('good');
                }
                else if (pingTime < 500) {
                    setConnectionQuality('poor');
                }
                else {
                    setConnectionQuality('poor');
                }
            });
            // Error handling with structured error responses
            socket.on('error', (error) => {
                console.error('Socket error:', error);
                setConnectionError(error.message || 'Unknown error');
                if (!error.retryable) {
                    // Don't retry for non-retryable errors
                    setConnectionError(`${error.message} (Code: ${error.code})`);
                }
            });
            // Chat event handlers
            socket.on('message-received', (message) => {
                onMessageReceived?.(message);
            });
            socket.on('ai-response-start', (sessionId) => {
                onAiResponseStart?.(sessionId);
            });
            socket.on('ai-response-chunk', (data) => {
                onAiResponseChunk?.(data);
            });
            socket.on('ai-response-complete', (message) => {
                onAiResponseComplete?.(message);
            });
            socket.on('file-processing-status', (status) => {
                onFileProcessingStatus?.(status);
            });
            socket.on('url-processing-status', (status) => {
                onUrlProcessingStatus?.(status);
            });
            socket.on('support-joined', (data) => {
                onSupportJoined?.(data);
            });
            socket.on('support-left', (data) => {
                onSupportLeft?.(data);
            });
            socket.on('typing-indicator', (data) => {
                onTypingIndicator?.(data);
            });
            socket.on('session-updated', (session) => {
                onSessionUpdated?.(session);
            });
            socket.on('escalation-suggested', (data) => {
                onEscalationSuggested?.(data);
            });
        }
        catch (error) {
            console.error('Failed to initialize socket:', error);
            setConnectionError('Failed to initialize connection');
        }
    }, [
        onMessageReceived,
        onAiResponseStart,
        onAiResponseChunk,
        onAiResponseComplete,
        onFileProcessingStatus,
        onUrlProcessingStatus,
        onSupportJoined,
        onSupportLeft,
        onTypingIndicator,
        onSessionUpdated,
        onConnectionStatusChange,
        onEscalationSuggested
    ]);
    // Reconnection logic
    const attemptReconnect = (0, react_1.useCallback)(() => {
        if (reconnectAttempts.current >= maxReconnectAttempts) {
            setConnectionError('Maximum reconnection attempts reached');
            return;
        }
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectAttempts.current++;
        reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})`);
            initializeSocket();
        }, delay);
    }, [initializeSocket]);
    // Helper functions for connection management
    const processMessageQueue = (0, react_1.useCallback)(() => {
        if (socketRef.current?.connected && messageQueue.current.length > 0) {
            console.log(`Processing ${messageQueue.current.length} queued messages`);
            messageQueue.current.forEach(queuedMessage => {
                socketRef.current?.emit(queuedMessage.event, queuedMessage.data);
            });
            messageQueue.current = [];
        }
    }, []);
    const startHeartbeat = (0, react_1.useCallback)(() => {
        if (heartbeatTimeoutRef.current) {
            clearTimeout(heartbeatTimeoutRef.current);
        }
        // Monitor for heartbeat requests from server
        heartbeatTimeoutRef.current = setTimeout(() => {
            if (socketRef.current?.connected) {
                console.warn('No heartbeat received from server, connection may be stale');
                setConnectionQuality('poor');
            }
        }, 90000); // 90 seconds timeout
    }, []);
    const clearHeartbeat = (0, react_1.useCallback)(() => {
        if (heartbeatTimeoutRef.current) {
            clearTimeout(heartbeatTimeoutRef.current);
            heartbeatTimeoutRef.current = null;
        }
    }, []);
    const startPingMonitoring = (0, react_1.useCallback)(() => {
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
        }
        // Send ping every 30 seconds to monitor connection quality
        pingIntervalRef.current = setInterval(() => {
            if (socketRef.current?.connected) {
                const timestamp = Date.now().toString();
                socketRef.current.emit('ping', { timestamp });
            }
        }, 30000);
    }, []);
    const clearPingMonitoring = (0, react_1.useCallback)(() => {
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
            pingIntervalRef.current = null;
        }
    }, []);
    const queueMessage = (0, react_1.useCallback)((event, data) => {
        messageQueue.current.push({ event, data, timestamp: Date.now() });
        // Limit queue size to prevent memory issues
        if (messageQueue.current.length > 100) {
            messageQueue.current = messageQueue.current.slice(-50);
        }
    }, []);
    // Initialize socket on mount
    (0, react_1.useEffect)(() => {
        initializeSocket();
        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (heartbeatTimeoutRef.current) {
                clearTimeout(heartbeatTimeoutRef.current);
            }
            if (pingIntervalRef.current) {
                clearInterval(pingIntervalRef.current);
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [initializeSocket]);
    // Socket methods
    const joinSession = (0, react_1.useCallback)((sessionId) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit('join-session', sessionId);
        }
    }, []);
    const sendMessage = (0, react_1.useCallback)(async (data) => {
        return new Promise((resolve, reject) => {
            if (!socketRef.current?.connected) {
                // Queue message for when connection is restored
                queueMessage('send-message', data);
                reject(new Error('Socket not connected - message queued for retry'));
                return;
            }
            socketRef.current.emit('send-message', data, (response) => {
                if (response?.success) {
                    resolve();
                }
                else {
                    reject(new Error(response?.error || 'Failed to send message'));
                }
            });
        });
    }, [queueMessage]);
    const uploadFile = (0, react_1.useCallback)(async (data) => {
        return new Promise((resolve, reject) => {
            if (!socketRef.current?.connected) {
                reject(new Error('Socket not connected'));
                return;
            }
            // Convert file to base64 for transmission
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = {
                    sessionId: data.sessionId,
                    messageId: data.messageId,
                    fileName: data.file.name,
                    fileType: data.file.type,
                    fileSize: data.file.size,
                    fileData: reader.result
                };
                socketRef.current.emit('upload-file', fileData, (response) => {
                    if (response.success) {
                        resolve();
                    }
                    else {
                        reject(new Error(response.error || 'Failed to upload file'));
                    }
                });
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(data.file);
        });
    }, []);
    const processUrl = (0, react_1.useCallback)(async (data) => {
        return new Promise((resolve, reject) => {
            if (!socketRef.current?.connected) {
                reject(new Error('Socket not connected'));
                return;
            }
            socketRef.current.emit('process-url', data, (response) => {
                if (response.success) {
                    resolve();
                }
                else {
                    reject(new Error(response.error || 'Failed to process URL'));
                }
            });
        });
    }, []);
    const startTyping = (0, react_1.useCallback)((sessionId) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit('typing-start', { sessionId });
        }
    }, []);
    const stopTyping = (0, react_1.useCallback)((sessionId) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit('typing-stop', { sessionId });
        }
    }, []);
    const reconnect = (0, react_1.useCallback)(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
        reconnectAttempts.current = 0;
        setConnectionError(null);
        initializeSocket();
    }, [initializeSocket]);
    return {
        isConnected,
        connectionError,
        connectionQuality,
        lastPingTime,
        queuedMessageCount: messageQueue.current.length,
        joinSession,
        sendMessage,
        uploadFile,
        processUrl,
        startTyping,
        stopTyping,
        reconnect
    };
}
//# sourceMappingURL=use-chat-socket.js.map