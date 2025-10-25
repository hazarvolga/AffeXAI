import React from 'react';
interface ConnectionStatusProps {
    isConnected: boolean;
    connectionQuality: 'good' | 'poor' | 'offline';
    connectionError?: string | null;
    lastPingTime?: number | null;
    queuedMessageCount?: number;
    onReconnect?: () => void;
}
export declare function ConnectionStatus({ isConnected, connectionQuality, connectionError, lastPingTime, queuedMessageCount, onReconnect }: ConnectionStatusProps): React.JSX.Element;
export {};
//# sourceMappingURL=ConnectionStatus.d.ts.map