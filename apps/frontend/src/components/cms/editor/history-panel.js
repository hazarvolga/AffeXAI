"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryPanel = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const scroll_area_1 = require("@/components/ui/scroll-area");
const button_1 = require("@/components/ui/button");
const HistoryPanel = ({ history, currentIndex, onHistorySelect, }) => {
    return (<card_1.Card className="h-full flex flex-col">
      <card_1.CardHeader>
        <card_1.CardTitle>History</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="flex-1 p-0">
        <scroll_area_1.ScrollArea className="h-full w-full">
          <div className="p-4 space-y-2">
            {history.map((item, index) => (<button_1.Button key={index} variant={index === currentIndex ? "default" : "outline"} className="w-full justify-start h-auto py-3 px-4" onClick={() => onHistorySelect(index)}>
                <div className="text-left">
                  <div className="font-medium">
                    {index === 0 ? 'Initial State' : `Action ${index}`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </button_1.Button>))}
          </div>
        </scroll_area_1.ScrollArea>
      </card_1.CardContent>
    </card_1.Card>);
};
exports.HistoryPanel = HistoryPanel;
exports.default = exports.HistoryPanel;
//# sourceMappingURL=history-panel.js.map