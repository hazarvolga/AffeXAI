"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = ChatMessage;
const react_1 = __importDefault(require("react"));
const avatar_1 = require("@/components/ui/avatar");
const badge_1 = require("@/components/ui/badge");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const react_2 = require("react");
const ContextSourceVisualization_1 = require("./ContextSourceVisualization");
function ChatMessage({ message, showAvatar = true, showTimestamp = true }) {
    const [copied, setCopied] = (0, react_2.useState)(false);
    const isUser = message.senderType === 'user';
    const isAI = message.senderType === 'ai';
    const isSupport = message.senderType === 'support';
    const isStreaming = message.metadata?.streaming;
    const getSenderInfo = () => {
        if (isUser) {
            return {
                name: 'Siz',
                avatar: <lucide_react_1.User className="h-4 w-4"/>,
                color: 'bg-primary text-primary-foreground'
            };
        }
        else if (isAI) {
            return {
                name: 'AI Asistan',
                avatar: <lucide_react_1.Bot className="h-4 w-4"/>,
                color: 'bg-secondary text-secondary-foreground'
            };
        }
        else if (isSupport) {
            return {
                name: message.metadata?.supportUserName || 'Destek Ekibi',
                avatar: <lucide_react_1.UserCheck className="h-4 w-4"/>,
                color: 'bg-blue-500 text-white'
            };
        }
        return {
            name: 'Sistem',
            avatar: <lucide_react_1.Bot className="h-4 w-4"/>,
            color: 'bg-muted text-muted-foreground'
        };
    };
    const senderInfo = getSenderInfo();
    const handleCopyMessage = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (error) {
            console.error('Failed to copy message:', error);
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    const renderMessageContent = () => {
        switch (message.messageType) {
            case 'file':
                return (<div className="space-y-2">
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
              <lucide_react_1.FileText className="h-5 w-5 text-muted-foreground"/>
              <div className="flex-1">
                <p className="font-medium text-sm">{message.metadata?.fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {message.metadata?.fileSize && formatFileSize(message.metadata.fileSize)}
                  {message.metadata?.fileType && ` • ${message.metadata.fileType}`}
                </p>
              </div>
            </div>
            {message.content !== `Dosya yüklendi: ${message.metadata?.fileName}` && (<p className="text-sm">{message.content}</p>)}
          </div>);
            case 'url':
                return (<div className="space-y-2">
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
              <lucide_react_1.Link className="h-5 w-5 text-muted-foreground"/>
              <div className="flex-1">
                <p className="font-medium text-sm">Web Sayfası</p>
                <a href={message.metadata?.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center space-x-1">
                  <span>{message.metadata?.url}</span>
                  <lucide_react_1.ExternalLink className="h-3 w-3"/>
                </a>
              </div>
            </div>
            {message.content !== `URL paylaşıldı: ${message.metadata?.url}` && (<p className="text-sm">{message.content}</p>)}
          </div>);
            case 'system':
                return (<div className="text-center">
            <badge_1.Badge variant="outline" className="text-xs">
              {message.content}
            </badge_1.Badge>
          </div>);
            default:
                return (<div className="space-y-2">
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
              {isStreaming && (<span className="inline-block w-2 h-4 bg-current animate-pulse ml-1"/>)}
            </p>
            
            {/* Context Sources */}
            {message.metadata?.contextSources && message.metadata.contextSources.length > 0 && (<div className="mt-3 pt-2 border-t border-border/50">
                <ContextSourceVisualization_1.ContextSourceVisualization sources={message.metadata.contextSources} maxSources={3} showRelevanceScores={true}/>
              </div>)}
            
            {/* AI Metadata */}
            {isAI && message.metadata && (<div className="mt-2 flex items-center space-x-2 text-xs text-muted-foreground">
                {message.metadata.aiModel && (<badge_1.Badge variant="outline" className="text-xs">
                    {message.metadata.aiModel}
                  </badge_1.Badge>)}
                {message.metadata.confidence && (<badge_1.Badge variant="outline" className="text-xs">
                    Güven: {Math.round(message.metadata.confidence * 100)}%
                  </badge_1.Badge>)}
                {message.metadata.processingTime && (<div className="flex items-center space-x-1">
                    <lucide_react_1.Clock className="h-3 w-3"/>
                    <span>{message.metadata.processingTime}ms</span>
                  </div>)}
              </div>)}
          </div>);
        }
    };
    return (<div className={(0, utils_1.cn)("flex space-x-3", isUser && "flex-row-reverse space-x-reverse")}>
      {/* Avatar */}
      {showAvatar && (<avatar_1.Avatar className="h-8 w-8 flex-shrink-0">
          <avatar_1.AvatarFallback className={(0, utils_1.cn)("text-xs", senderInfo.color)}>
            {senderInfo.avatar}
          </avatar_1.AvatarFallback>
        </avatar_1.Avatar>)}
      
      {/* Message Content */}
      <div className={(0, utils_1.cn)("flex-1 max-w-[80%]", isUser && "flex flex-col items-end")}>
        {/* Sender Name & Timestamp */}
        {showAvatar && (<div className={(0, utils_1.cn)("flex items-center space-x-2 mb-1", isUser && "flex-row-reverse space-x-reverse")}>
            <span className="text-xs font-medium text-muted-foreground">
              {senderInfo.name}
            </span>
            {showTimestamp && (<span className="text-xs text-muted-foreground">
                {(0, date_fns_1.format)(message.createdAt, 'HH:mm', { locale: locale_1.tr })}
              </span>)}
          </div>)}
        
        {/* Message Bubble */}
        <card_1.Card className={(0, utils_1.cn)("relative group", isUser ? "bg-primary text-primary-foreground" : "bg-muted", message.messageType === 'system' && "bg-transparent border-none shadow-none")}>
          <card_1.CardContent className={(0, utils_1.cn)("p-3", message.messageType === 'system' && "p-1")}>
            {renderMessageContent()}
          </card_1.CardContent>
          
          {/* Message Actions */}
          {message.messageType !== 'system' && (<div className={(0, utils_1.cn)("absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity", isUser ? "left-2" : "right-2")}>
              <button_1.Button variant="ghost" size="icon" onClick={handleCopyMessage} className="h-6 w-6">
                {copied ? (<lucide_react_1.Check className="h-3 w-3"/>) : (<lucide_react_1.Copy className="h-3 w-3"/>)}
              </button_1.Button>
            </div>)}
        </card_1.Card>
      </div>
    </div>);
}
//# sourceMappingURL=ChatMessage.js.map