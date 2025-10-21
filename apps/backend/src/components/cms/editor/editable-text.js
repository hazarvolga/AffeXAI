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
exports.EditableText = void 0;
const react_1 = __importStar(require("react"));
const EditableText = ({ value, onChange, className = '', placeholder = 'Click to edit...', tagName: Tag = 'span', }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [localValue, setLocalValue] = (0, react_1.useState)(value);
    const elementRef = (0, react_1.useRef)(null);
    // Update local value when prop value changes
    (0, react_1.useEffect)(() => {
        setLocalValue(value);
    }, [value]);
    const handleFocus = () => {
        setIsEditing(true);
        // Select all text when focusing
        setTimeout(() => {
            if (elementRef.current) {
                const range = document.createRange();
                range.selectNodeContents(elementRef.current);
                const selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        }, 0);
    };
    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };
    const handleInput = (e) => {
        const newValue = e.currentTarget.textContent || '';
        setLocalValue(newValue);
    };
    const handleKeyDown = (e) => {
        // Exit editing mode on Enter (but allow Shift+Enter for line breaks)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            elementRef.current?.blur();
        }
        // Exit editing mode on Escape
        if (e.key === 'Escape') {
            setLocalValue(value); // Revert to original value
            elementRef.current?.blur();
        }
    };
    // Handle double click to enter edit mode
    const handleDoubleClick = () => {
        if (!isEditing) {
            setIsEditing(true);
            setTimeout(() => {
                if (elementRef.current) {
                    elementRef.current.focus();
                }
            }, 0);
        }
    };
    return (<Tag ref={elementRef} contentEditable={isEditing} suppressContentEditableWarning className={`outline-none focus:outline focus:outline-blue-300 ${className} ${!localValue && !isEditing ? 'text-gray-400 italic' : ''} ${isEditing ? 'bg-yellow-50 border border-yellow-200 rounded px-1' : 'cursor-pointer hover:bg-gray-50'}`} onFocus={handleFocus} onBlur={handleBlur} onInput={handleInput} onKeyDown={handleKeyDown} onDoubleClick={handleDoubleClick}>
      {localValue || placeholder}
    </Tag>);
};
exports.EditableText = EditableText;
exports.default = exports.EditableText;
//# sourceMappingURL=editable-text.js.map