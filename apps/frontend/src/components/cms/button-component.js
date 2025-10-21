"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonComponent = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const editable_text_1 = require("@/components/cms/editor/editable-text");
const preview_context_1 = require("@/components/cms/preview-context");
const ButtonComponent = ({ id, text, href, target = '_self', className, variant = 'default', size = 'default', disabled = false, onClick, icon, iconPosition = 'left', fullWidth = false, borderRadius = 'md', }) => {
    // Use preview context instead of editor context
    const previewContext = (0, preview_context_1.usePreview)();
    const isEditMode = previewContext?.isEditMode || false;
    // In live mode, we don't need to update component props
    const updateComponentProps = () => { };
    const getBorderRadiusClass = () => {
        switch (borderRadius) {
            case 'none': return 'rounded-none';
            case 'sm': return 'rounded-sm';
            case 'md': return 'rounded-md';
            case 'lg': return 'rounded-lg';
            case 'full': return 'rounded-full';
            default: return '';
        }
    };
    const buttonClasses = (0, utils_1.cn)(getBorderRadiusClass(), fullWidth && 'w-full', className);
    const handleTextChange = (newText) => {
        updateComponentProps();
    };
    const renderButtonContent = () => {
        if (isEditMode) {
            return (<>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          <editable_text_1.EditableText value={text} onChange={handleTextChange} className="inline-block"/>
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>);
        }
        return (<>
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {text}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </>);
    };
    if (href) {
        return (<a id={id} href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={buttonClasses}>
        <button_1.Button variant={variant} size={size} disabled={disabled} className="w-full">
          {renderButtonContent()}
        </button_1.Button>
      </a>);
    }
    return (<button_1.Button id={id} variant={variant} size={size} disabled={disabled} onClick={onClick} className={buttonClasses}>
      {renderButtonContent()}
    </button_1.Button>);
};
exports.ButtonComponent = ButtonComponent;
exports.default = exports.ButtonComponent;
//# sourceMappingURL=button-component.js.map