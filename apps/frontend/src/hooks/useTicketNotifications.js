"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTicketNotifications = useTicketNotifications;
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
const sonner_1 = require("sonner");
function useTicketNotifications() {
    const [isConnected, setIsConnected] = (0, react_1.useState)(false);
    const socketRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // Get auth token from localStorage or cookies
        const token = localStorage.getItem('authToken') || '';
        if (!token) {
            console.warn('No auth token found, WebSocket connection skipped');
            return;
        }
        // Connect to WebSocket server
        const socket = (0, socket_io_client_1.io)('http://localhost:5001/tickets', {
            auth: { token },
            transports: ['websocket', 'polling'],
        });
        socketRef.current = socket;
        // Connection events
        socket.on('connect', () => {
            console.log('✅ WebSocket connected');
            setIsConnected(true);
        });
        socket.on('disconnect', () => {
            console.log('❌ WebSocket disconnected');
            setIsConnected(false);
        });
        socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
            setIsConnected(false);
        });
        // Ticket events
        socket.on('ticket:created', (data) => {
            sonner_1.toast.success('Yeni Ticket Oluşturuldu', {
                description: `Ticket #${data.ticketId} başarıyla oluşturuldu`,
            });
        });
        socket.on('ticket:assigned', (data) => {
            sonner_1.toast.info('Ticket Atandı', {
                description: `Ticket #${data.ticketId} size atandı`,
            });
        });
        socket.on('ticket:message', (data) => {
            sonner_1.toast.info('Yeni Mesaj', {
                description: `Ticket #${data.ticketId} için yeni mesaj alındı`,
            });
        });
        socket.on('ticket:statusChanged', (data) => {
            sonner_1.toast.info('Durum Değişti', {
                description: `Ticket #${data.ticketId} durumu güncellendi`,
            });
        });
        socket.on('ticket:priorityChanged', (data) => {
            sonner_1.toast.warning('Öncelik Değişti', {
                description: `Ticket #${data.ticketId} önceliği güncellendi`,
            });
        });
        socket.on('ticket:slaAlert', (data) => {
            sonner_1.toast.error('SLA Uyarısı', {
                description: `Ticket #${data.ticketId} için SLA yaklaşıyor!`,
                duration: 10000,
            });
        });
        socket.on('ticket:slaBreach', (data) => {
            sonner_1.toast.error('SLA İhlali', {
                description: `Ticket #${data.ticketId} için SLA ihlal edildi!`,
                duration: 15000,
            });
        });
        socket.on('ticket:escalated', (data) => {
            sonner_1.toast.error('Ticket Yükseltildi', {
                description: `Ticket #${data.ticketId} yöneticiye yükseltildi`,
            });
        });
        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);
    return {
        isConnected,
        socket: socketRef.current,
    };
}
//# sourceMappingURL=useTicketNotifications.js.map