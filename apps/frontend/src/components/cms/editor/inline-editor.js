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
exports.InlineEditor = void 0;
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const textarea_1 = require("@/components/ui/textarea");
const input_1 = require("@/components/ui/input");
const lucide_react_1 = require("lucide-react");
const InlineEditor = ({ value, onChange, onCancel, type = 'text', placeholder = '', className = '', }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [editValue, setEditValue] = (0, react_1.useState)(value);
    const inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    const handleStartEdit = () => {
        setEditValue(value);
        setIsEditing(true);
    };
    const handleSave = () => {
        onChange(editValue);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
        onCancel?.();
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && type !== 'textarea') {
            handleSave();
        }
        else if (e.key === 'Escape') {
            handleCancel();
        }
    };
    if (isEditing) {
        return (<div className={`flex flex-col gap-2 ${className}`}>
        {type === 'textarea' ? (<textarea_1.Textarea ref={inputRef} value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} className="min-h-[100px]"/>) : (<input_1.Input ref={inputRef} value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder}/>)}
        <div className="flex gap-2">
          <button_1.Button size="sm" onClick={handleSave} className="h-8">
            <lucide_react_1.Check className="h-4 w-4 mr-1"/>
            Save
          </button_1.Button>
          <button_1.Button size="sm" variant="outline" onClick={handleCancel} className="h-8">
            <lucide_react_1.X className="h-4 w-4 mr-1"/>
            Cancel
          </button_1.Button>
        </div>
      </div>);
    }
    return (<div className={`cursor-pointer group ${className}`} onClick={handleStartEdit}>
      <div className="group-hover:underline">
        {value || <span className="text-muted-foreground italic">{placeholder || 'Click to edit'}</span>}
      </div>
    </div>);
};
exports.InlineEditor = InlineEditor;
//# sourceMappingURL=inline-editor.js.map