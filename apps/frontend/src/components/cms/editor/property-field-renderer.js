"use strict";
/**
 * PropertyFieldRenderer Component
 *
 * Renders appropriate input field based on property schema
 * Includes token support for color, spacing, and typography properties
 */
'use client';
/**
 * PropertyFieldRenderer Component
 *
 * Renders appropriate input field based on property schema
 * Includes token support for color, spacing, and typography properties
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyFieldRenderer = PropertyFieldRenderer;
exports.CompactPropertyFieldRenderer = CompactPropertyFieldRenderer;
const react_1 = __importDefault(require("react"));
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const checkbox_1 = require("@/components/ui/checkbox");
const select_1 = require("@/components/ui/select");
const label_1 = require("@/components/ui/label");
const token_picker_1 = require("./token-picker");
/**
 * Determine if a property should use TokenPicker
 */
function shouldUseTokenPicker(type, tokenReference) {
    return !!tokenReference || type === 'token';
}
/**
 * Map property type to token category
 */
function getTokenCategoryFromType(type) {
    switch (type) {
        case 'color':
            return 'color';
        case 'token':
            return 'color'; // Default to color, will be overridden by tokenReference
        default:
            return null;
    }
}
function PropertyFieldRenderer({ propertyKey, propertySchema, value, onChange, disabled = false, }) {
    const { type, label, options, tokenReference } = propertySchema;
    // Check if this property should use TokenPicker
    if (shouldUseTokenPicker(type, tokenReference)) {
        const category = tokenReference?.category || getTokenCategoryFromType(type) || 'color';
        return (<div className="space-y-2">
        <token_picker_1.TokenPicker category={category} value={value || ''} onChange={onChange} allowCustom={tokenReference?.allowCustom ?? true} label={label} description={tokenReference?.description} disabled={disabled}/>
      </div>);
    }
    // Regular property rendering
    switch (type) {
        case 'text':
            return (<div className="space-y-2">
          <label_1.Label htmlFor={propertyKey}>{label}</label_1.Label>
          <input_1.Input id={propertyKey} type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} disabled={disabled}/>
        </div>);
        case 'textarea':
            return (<div className="space-y-2">
          <label_1.Label htmlFor={propertyKey}>{label}</label_1.Label>
          <textarea_1.Textarea id={propertyKey} value={value || ''} onChange={(e) => onChange(e.target.value)} disabled={disabled} rows={4}/>
        </div>);
        case 'number':
            return (<div className="space-y-2">
          <label_1.Label htmlFor={propertyKey}>{label}</label_1.Label>
          <input_1.Input id={propertyKey} type="number" value={value || ''} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} disabled={disabled}/>
        </div>);
        case 'boolean':
            return (<div className="flex items-center space-x-2">
          <checkbox_1.Checkbox id={propertyKey} checked={value || false} onCheckedChange={onChange} disabled={disabled}/>
          <label_1.Label htmlFor={propertyKey} className="cursor-pointer">
            {label}
          </label_1.Label>
        </div>);
        case 'color':
            // Without token reference, just a simple color input
            return (<div className="space-y-2">
          <label_1.Label htmlFor={propertyKey}>{label}</label_1.Label>
          <div className="flex gap-2">
            <input_1.Input id={propertyKey} type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} disabled={disabled} placeholder="#000000 or hsl(...)"/>
            <div className="w-10 h-10 rounded border border-border" style={{
                    backgroundColor: value?.includes(' ') ? `hsl(${value})` : value,
                }}/>
          </div>
        </div>);
        case 'select':
            return (<div className="space-y-2">
          <label_1.Label htmlFor={propertyKey}>{label}</label_1.Label>
          <select_1.Select value={value || options?.[0]} onValueChange={onChange} disabled={disabled}>
            <select_1.SelectTrigger id={propertyKey}>
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              {options?.map((option) => (<select_1.SelectItem key={option} value={option}>
                  {option}
                </select_1.SelectItem>))}
            </select_1.SelectContent>
          </select_1.Select>
        </div>);
        case 'image':
            // This will be handled by the parent component with MediaLibrary
            return (<div className="space-y-2">
          <label_1.Label htmlFor={propertyKey}>{label}</label_1.Label>
          <input_1.Input id={propertyKey} type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} disabled={disabled} placeholder="Image URL or media ID"/>
        </div>);
        default:
            return (<div className="space-y-2">
          <label_1.Label htmlFor={propertyKey}>{label}</label_1.Label>
          <input_1.Input id={propertyKey} type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} disabled={disabled}/>
        </div>);
    }
}
/**
 * Compact version for inline property editing
 */
function CompactPropertyFieldRenderer({ propertyKey, propertySchema, value, onChange, disabled = false, }) {
    const { type, tokenReference } = propertySchema;
    // Check if this property should use CompactTokenPicker
    if (shouldUseTokenPicker(type, tokenReference)) {
        const category = tokenReference?.category || getTokenCategoryFromType(type) || 'color';
        return (<token_picker_1.CompactTokenPicker category={category} value={value || ''} onChange={onChange} allowCustom={tokenReference?.allowCustom ?? true}/>);
    }
    // Fallback to regular field renderer
    return (<PropertyFieldRenderer propertyKey={propertyKey} propertySchema={propertySchema} value={value} onChange={onChange} disabled={disabled}/>);
}
//# sourceMappingURL=property-field-renderer.js.map