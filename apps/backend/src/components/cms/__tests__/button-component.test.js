"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const button_component_1 = require("../button-component");
describe('ButtonComponent', () => {
    const defaultProps = {
        id: 'test-button',
        text: 'Click me',
        variant: 'default',
        size: 'default',
    };
    it('renders correctly with default props', () => {
        (0, react_2.render)(<button_component_1.ButtonComponent {...defaultProps}/>);
        expect(react_2.screen.getByText('Click me')).toBeInTheDocument();
    });
    it('applies correct classes for different variants', () => {
        const { rerender } = (0, react_2.render)(<button_component_1.ButtonComponent {...defaultProps} variant="destructive"/>);
        expect(react_2.screen.getByText('Click me')).toHaveClass('bg-destructive');
        rerender(<button_component_1.ButtonComponent {...defaultProps} variant="outline"/>);
        expect(react_2.screen.getByText('Click me')).toHaveClass('border');
    });
    it('applies correct classes for different sizes', () => {
        const { rerender } = (0, react_2.render)(<button_component_1.ButtonComponent {...defaultProps} size="sm"/>);
        expect(react_2.screen.getByText('Click me')).toHaveClass('h-8');
        rerender(<button_component_1.ButtonComponent {...defaultProps} size="lg"/>);
        expect(react_2.screen.getByText('Click me')).toHaveClass('h-10');
    });
    it('renders as a link when href is provided', () => {
        (0, react_2.render)(<button_component_1.ButtonComponent {...defaultProps} href="https://example.com"/>);
        const button = react_2.screen.getByText('Click me');
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('A');
        expect(button).toHaveAttribute('href', 'https://example.com');
    });
    it('is disabled when disabled prop is true', () => {
        (0, react_2.render)(<button_component_1.ButtonComponent {...defaultProps} disabled={true}/>);
        expect(react_2.screen.getByText('Click me')).toBeDisabled();
    });
});
//# sourceMappingURL=button-component.test.js.map