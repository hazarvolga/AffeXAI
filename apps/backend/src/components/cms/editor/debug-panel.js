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
exports.DebugPanel = void 0;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const textarea_1 = require("@/components/ui/textarea");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
const DebugPanel = ({ pageData, components, layoutOptions }) => {
    const { toast } = (0, use_toast_1.useToast)();
    const [debugView, setDebugView] = (0, react_1.useState)('page');
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard",
            description: "Debug information copied successfully",
        });
    };
    const exportToJson = (data, filename) => {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({
            title: "Exported",
            description: `${filename} exported successfully`,
        });
    };
    const renderDebugView = () => {
        switch (debugView) {
            case 'page':
                return (<div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Page Data</h3>
              <button_1.Button size="sm" variant="outline" onClick={() => copyToClipboard(JSON.stringify(pageData, null, 2))}>
                <lucide_react_1.Copy className="h-4 w-4 mr-1"/>
                Copy
              </button_1.Button>
            </div>
            <textarea_1.Textarea value={JSON.stringify(pageData, null, 2)} readOnly className="min-h-[200px] font-mono text-xs"/>
            <button_1.Button onClick={() => exportToJson(pageData, 'page-data.json')} className="w-full">
              <lucide_react_1.Download className="h-4 w-4 mr-1"/>
              Export Page Data
            </button_1.Button>
          </div>);
            case 'components':
                return (<div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Components ({components.length})</h3>
              <button_1.Button size="sm" variant="outline" onClick={() => copyToClipboard(JSON.stringify(components, null, 2))}>
                <lucide_react_1.Copy className="h-4 w-4 mr-1"/>
                Copy
              </button_1.Button>
            </div>
            <textarea_1.Textarea value={JSON.stringify(components, null, 2)} readOnly className="min-h-[200px] font-mono text-xs"/>
            <button_1.Button onClick={() => exportToJson(components, 'components.json')} className="w-full">
              <lucide_react_1.Download className="h-4 w-4 mr-1"/>
              Export Components
            </button_1.Button>
          </div>);
            case 'layout':
                return (<div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Layout Options</h3>
              <button_1.Button size="sm" variant="outline" onClick={() => copyToClipboard(JSON.stringify(layoutOptions, null, 2))}>
                <lucide_react_1.Copy className="h-4 w-4 mr-1"/>
                Copy
              </button_1.Button>
            </div>
            <textarea_1.Textarea value={JSON.stringify(layoutOptions, null, 2)} readOnly className="min-h-[200px] font-mono text-xs"/>
            <button_1.Button onClick={() => exportToJson(layoutOptions, 'layout-options.json')} className="w-full">
              <lucide_react_1.Download className="h-4 w-4 mr-1"/>
              Export Layout Options
            </button_1.Button>
          </div>);
            default:
                return null;
        }
    };
    return (<card_1.Card className="h-full flex flex-col">
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center">
          <lucide_react_1.Bug className="h-5 w-5 mr-2"/>
          Debug Panel
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="flex-1 overflow-auto">
        <alert_1.Alert className="mb-4">
          <alert_1.AlertDescription>
            This panel provides debugging information for the CMS editor. Use it to inspect page data, components, and layout options.
          </alert_1.AlertDescription>
        </alert_1.Alert>
        
        <div className="flex space-x-2 mb-4">
          <button_1.Button variant={debugView === 'page' ? 'default' : 'outline'} size="sm" onClick={() => setDebugView('page')}>
            Page
          </button_1.Button>
          <button_1.Button variant={debugView === 'components' ? 'default' : 'outline'} size="sm" onClick={() => setDebugView('components')}>
            Components
          </button_1.Button>
          <button_1.Button variant={debugView === 'layout' ? 'default' : 'outline'} size="sm" onClick={() => setDebugView('layout')}>
            Layout
          </button_1.Button>
        </div>
        
        {renderDebugView()}
      </card_1.CardContent>
    </card_1.Card>);
};
exports.DebugPanel = DebugPanel;
exports.default = exports.DebugPanel;
//# sourceMappingURL=debug-panel.js.map