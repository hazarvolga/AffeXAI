"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionStatus = ConnectionStatus;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
function ConnectionStatus({ isConnected, connectionQuality, connectionError, lastPingTime, queuedMessageCount = 0, onReconnect }) {
    const getStatusIcon = () => {
        if (!isConnected) {
            return <lucide_react_1.WifiOff className="w-4 h-4 text-red-500"/>;
        }
        switch (connectionQuality) {
            case 'good':
                return <lucide_react_1.CheckCircle className="w-4 h-4 text-green-500"/>;
            case 'poor':
                return <lucide_react_1.AlertTriangle className="w-4 h-4 text-yellow-500"/>;
            default:
                return <lucide_react_1.WifiOff className="w-4 h-4 text-red-500"/>;
        }
    };
    const getStatusText = () => {
        if (!isConnected) {
            return 'Disconnected';
        }
        switch (connectionQuality) {
            case 'good':
                return 'Connected';
            case 'poor':
                return 'Poor connection';
            default:
                return 'Offline';
        }
    };
    const getStatusColor = () => {
        if (!isConnected) {
            return 'text-red-600 bg-red-50 border-red-200';
        }
        switch (connectionQuality) {
            case 'good':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'poor':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default:
                return 'text-red-600 bg-red-50 border-red-200';
        }
    };
    const formatPingTime = (pingTime) => {
        if (pingTime < 100)
            return `${pingTime}ms (Excellent)`;
        if (pingTime < 300)
            return `${pingTime}ms (Good)`;
        if (pingTime < 500)
            return `${pingTime}ms (Fair)`;
        return `${pingTime}ms (Poor)`;
    };
    return (<div className={`flex items-center justify-between px-3 py-2 text-sm border-b ${getStatusColor()}`}>
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className="font-medium">{getStatusText()}</span>
        
        {lastPingTime && isConnected && (<span className="text-xs opacity-75">
            ({formatPingTime(lastPingTime)})
          </span>)}
      </div>

      <div className="flex items-center space-x-2">
        {queuedMessageCount > 0 && (<span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
            {queuedMessageCount} queued
          </span>)}
        
        {!isConnected && onReconnect && (<button onClick={onReconnect} className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Reconnect
          </button>)}
      </div>

      {connectionError && (<div className="absolute top-full left-0 right-0 bg-red-100 border-l-4 border-red-500 p-2 text-xs text-red-700 z-10">
          <strong>Connection Error:</strong> {connectionError}
        </div>)}
    </div>);
}
//# sourceMappingURL=ConnectionStatus.js.map