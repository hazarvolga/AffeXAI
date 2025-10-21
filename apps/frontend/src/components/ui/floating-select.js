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
exports.FloatingSelect = void 0;
const React = __importStar(require("react"));
const select_1 = require("@/components/ui/select");
const label_1 = require("@/components/ui/label");
const utils_1 = require("@/lib/utils");
const FloatingSelect = ({ label, value, onValueChange, disabled, children, id, placeholder, }) => {
    const selectId = id || `floating-select-${label.toLowerCase().replace(/\s/g, '-')}`;
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = value !== undefined && value !== '' && value !== null;
    return (<div className="relative">
      <select_1.Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <select_1.SelectTrigger id={selectId} className={(0, utils_1.cn)('peer', hasValue || isFocused ? 'pt-5 pb-1' : '')} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
          <select_1.SelectValue placeholder={placeholder || label}/>
        </select_1.SelectTrigger>
        <select_1.SelectContent>
          {children}
        </select_1.SelectContent>
      </select_1.Select>
      <label_1.Label htmlFor={selectId} className={(0, utils_1.cn)('absolute left-3 bg-background px-1 text-xs font-medium text-muted-foreground pointer-events-none', 'transition-all duration-200 ease-in-out', hasValue || isFocused
            ? '-top-2.5 text-xs text-primary'
            : 'top-2.5 text-sm text-muted-foreground', disabled && 'opacity-50')}>
        {label}
      </label_1.Label>
    </div>);
};
exports.FloatingSelect = FloatingSelect;
FloatingSelect.displayName = 'FloatingSelect';
//# sourceMappingURL=floating-select.js.map