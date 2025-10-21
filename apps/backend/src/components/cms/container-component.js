"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerComponent = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
const ContainerComponent = ({ id, children, className, padding = 'md', margin = 'none', background = 'none', rounded = 'none', shadow = 'none', border = false, borderColor = 'default', maxWidth = 'none', height = 'auto', flex = false, flexDirection = 'row', alignItems = 'stretch', justifyContent = 'start', }) => {
    const getPaddingClass = () => {
        switch (padding) {
            case 'xs': return 'p-1';
            case 'sm': return 'p-2';
            case 'md': return 'p-4';
            case 'lg': return 'p-6';
            case 'xl': return 'p-8';
            case '2xl': return 'p-12';
            default: return '';
        }
    };
    const getMarginClass = () => {
        switch (margin) {
            case 'xs': return 'm-1';
            case 'sm': return 'm-2';
            case 'md': return 'm-4';
            case 'lg': return 'm-6';
            case 'xl': return 'm-8';
            case '2xl': return 'm-12';
            default: return '';
        }
    };
    const getBackgroundClass = () => {
        switch (background) {
            case 'primary': return 'bg-primary';
            case 'secondary': return 'bg-secondary';
            case 'muted': return 'bg-muted';
            case 'success': return 'bg-success-100';
            case 'warning': return 'bg-warning-100';
            case 'error': return 'bg-destructive/10';
            default: return '';
        }
    };
    const getRoundedClass = () => {
        switch (rounded) {
            case 'sm': return 'rounded-sm';
            case 'md': return 'rounded-md';
            case 'lg': return 'rounded-lg';
            case 'xl': return 'rounded-xl';
            case '2xl': return 'rounded-2xl';
            case '3xl': return 'rounded-3xl';
            case 'full': return 'rounded-full';
            default: return '';
        }
    };
    const getShadowClass = () => {
        switch (shadow) {
            case 'sm': return 'shadow-sm';
            case 'md': return 'shadow';
            case 'lg': return 'shadow-lg';
            case 'xl': return 'shadow-xl';
            case '2xl': return 'shadow-2xl';
            case 'inner': return 'shadow-inner';
            default: return '';
        }
    };
    const getBorderClass = () => {
        if (!border)
            return '';
        switch (borderColor) {
            case 'primary': return 'border border-primary';
            case 'secondary': return 'border border-secondary';
            case 'success': return 'border border-success-500';
            case 'warning': return 'border border-warning-500';
            case 'error': return 'border border-destructive';
            default: return 'border border-border';
        }
    };
    const getMaxWidthClass = () => {
        switch (maxWidth) {
            case 'sm': return 'max-w-sm';
            case 'md': return 'max-w-md';
            case 'lg': return 'max-w-lg';
            case 'xl': return 'max-w-xl';
            case '2xl': return 'max-w-2xl';
            case '3xl': return 'max-w-3xl';
            case '4xl': return 'max-w-4xl';
            case '5xl': return 'max-w-5xl';
            case '6xl': return 'max-w-6xl';
            case '7xl': return 'max-w-7xl';
            case 'full': return 'max-w-full';
            case 'min': return 'max-w-min';
            case 'max': return 'max-w-max';
            default: return '';
        }
    };
    const getHeightClass = () => {
        switch (height) {
            case 'full': return 'h-full';
            case 'screen': return 'h-screen';
            case 'min': return 'h-min';
            case 'max': return 'h-max';
            default: return '';
        }
    };
    const getFlexClasses = () => {
        if (!flex)
            return '';
        return (0, utils_1.cn)('flex', flexDirection === 'col' && 'flex-col', flexDirection === 'row-reverse' && 'flex-row-reverse', flexDirection === 'col-reverse' && 'flex-col-reverse', alignItems === 'start' && 'items-start', alignItems === 'center' && 'items-center', alignItems === 'end' && 'items-end', alignItems === 'stretch' && 'items-stretch', alignItems === 'baseline' && 'items-baseline', justifyContent === 'center' && 'justify-center', justifyContent === 'end' && 'justify-end', justifyContent === 'between' && 'justify-between', justifyContent === 'around' && 'justify-around', justifyContent === 'evenly' && 'justify-evenly');
    };
    const containerClasses = (0, utils_1.cn)(getPaddingClass(), getMarginClass(), getBackgroundClass(), getRoundedClass(), getShadowClass(), getBorderClass(), getMaxWidthClass(), getHeightClass(), getFlexClasses(), className);
    return (<div id={id} className={containerClasses}>
      {children}
    </div>);
};
exports.ContainerComponent = ContainerComponent;
exports.default = exports.ContainerComponent;
//# sourceMappingURL=container-component.js.map