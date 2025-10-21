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
exports.FloatingInput = void 0;
const React = __importStar(require("react"));
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const utils_1 = require("@/lib/utils");
const FloatingInput = React.forwardRef(({ className, label, id, ...props }, ref) => {
    const inputId = id || `floating-input-${label.toLowerCase().replace(/\s/g, '-')}`;
    return (<div className="relative">
        <input_1.Input ref={ref} id={inputId} className={(0, utils_1.cn)('peer placeholder-transparent', className)} placeholder={label} {...props}/>
        <label_1.Label htmlFor={inputId} className={(0, utils_1.cn)('absolute left-2 -top-2.5 bg-background px-1 text-xs font-medium text-muted-foreground', 'transition-all duration-200 ease-in-out', 'peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground', 'peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary', 'peer-disabled:opacity-50')}>
          {label}
        </label_1.Label>
      </div>);
});
exports.FloatingInput = FloatingInput;
FloatingInput.displayName = 'FloatingInput';
//# sourceMappingURL=floating-input.js.map