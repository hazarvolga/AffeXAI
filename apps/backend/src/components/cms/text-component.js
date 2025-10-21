"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextComponent = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
const editable_text_1 = require("@/components/cms/editor/editable-text");
const preview_context_1 = require("@/components/cms/preview-context");
const TextComponent = ({ id, content, className, variant = 'body', align = 'left', color = 'primary', weight = 'normal', italic = false, underline = false, strikethrough = false, }) => {
    // Use preview context instead of editor context
    const previewContext = (0, preview_context_1.usePreview)();
    const isEditMode = previewContext?.isEditMode || false;
    // In live mode, we don't need to update component props
    const updateComponentProps = () => { };
    const getTag = () => {
        switch (variant) {
            case 'heading1': return 'h1';
            case 'heading2': return 'h2';
            case 'heading3': return 'h3';
            default: return 'p';
        }
    };
    const getVariantClasses = () => {
        switch (variant) {
            case 'heading1':
                return 'text-4xl font-bold';
            case 'heading2':
                return 'text-3xl font-bold';
            case 'heading3':
                return 'text-2xl font-semibold';
            case 'body':
                return 'text-base';
            case 'caption':
                return 'text-sm';
            default:
                return '';
        }
    };
    const getColorClasses = () => {
        switch (color) {
            case 'primary': return 'text-foreground';
            case 'secondary': return 'text-muted-foreground';
            case 'muted': return 'text-muted';
            case 'success': return 'text-success-500';
            case 'warning': return 'text-warning-500';
            case 'error': return 'text-destructive';
            default: return '';
        }
    };
    const getWeightClasses = () => {
        switch (weight) {
            case 'normal': return 'font-normal';
            case 'medium': return 'font-medium';
            case 'semibold': return 'font-semibold';
            case 'bold': return 'font-bold';
            default: return '';
        }
    };
    const getAlignmentClasses = () => {
        switch (align) {
            case 'center': return 'text-center';
            case 'right': return 'text-right';
            case 'justify': return 'text-justify';
            default: return 'text-left';
        }
    };
    const getTextDecorationClasses = () => {
        return (0, utils_1.cn)(italic && 'italic', underline && 'underline', strikethrough && 'line-through');
    };
    const Tag = getTag();
    const handleContentChange = (newContent) => {
        updateComponentProps();
    };
    if (isEditMode) {
        return (<editable_text_1.EditableText value={content} onChange={handleContentChange} tagName={Tag} className={(0, utils_1.cn)(getVariantClasses(), getColorClasses(), getWeightClasses(), getAlignmentClasses(), getTextDecorationClasses(), className)}/>);
    }
    return (<Tag id={id} className={(0, utils_1.cn)(getVariantClasses(), getColorClasses(), getWeightClasses(), getAlignmentClasses(), getTextDecorationClasses(), className)}>
      {content}
    </Tag>);
};
exports.TextComponent = TextComponent;
exports.default = exports.TextComponent;
//# sourceMappingURL=text-component.js.map