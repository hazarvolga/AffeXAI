"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypingIndicator = TypingIndicator;
const react_1 = __importDefault(require("react"));
const avatar_1 = require("@/components/ui/avatar");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
function TypingIndicator({ userName = 'AI Asistan', userType = 'ai', className }) {
    const isAI = userType === 'ai';
    return (<div className={(0, utils_1.cn)("flex space-x-3", className)}>
      {/* Avatar */}
      <avatar_1.Avatar className="h-8 w-8 flex-shrink-0">
        <avatar_1.AvatarFallback className={(0, utils_1.cn)("text-xs", isAI ? "bg-secondary text-secondary-foreground" : "bg-blue-500 text-white")}>
          {isAI ? <lucide_react_1.Bot className="h-4 w-4"/> : <lucide_react_1.UserCheck className="h-4 w-4"/>}
        </avatar_1.AvatarFallback>
      </avatar_1.Avatar>
      
      {/* Typing Indicator */}
      <div className="flex-1 max-w-[80%]">
        {/* User Name */}
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-xs font-medium text-muted-foreground">
            {userName}
          </span>
          <span className="text-xs text-muted-foreground">yazıyor...</span>
        </div>
        
        {/* Typing Animation */}
        <card_1.Card className="bg-muted">
          <card_1.CardContent className="p-3">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"/>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"/>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"/>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
}
//# sourceMappingURL=TypingIndicator.js.map