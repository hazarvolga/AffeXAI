"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const text_component_1 = require("@/components/cms/text-component");
describe('TextComponent', () => {
    test('renders content correctly', () => {
        (0, react_2.render)(<text_component_1.TextComponent id="test" content="Hello World"/>);
        expect(react_2.screen.getByText('Hello World')).toBeInTheDocument();
    });
    test('renders as h1 for heading1 variant', () => {
        (0, react_2.render)(<text_component_1.TextComponent id="test" content="Heading" variant="heading1"/>);
        const heading = react_2.screen.getByText('Heading');
        expect(heading.tagName).toBe('H1');
    });
    test('renders as h2 for heading2 variant', () => {
        (0, react_2.render)(<text_component_1.TextComponent id="test" content="Heading" variant="heading2"/>);
        const heading = react_2.screen.getByText('Heading');
        expect(heading.tagName).toBe('H2');
    });
    test('renders as h3 for heading3 variant', () => {
        (0, react_2.render)(<text_component_1.TextComponent id="test" content="Heading" variant="heading3"/>);
        const heading = react_2.screen.getByText('Heading');
        expect(heading.tagName).toBe('H3');
    });
    test('renders as p for body variant', () => {
        (0, react_2.render)(<text_component_1.TextComponent id="test" content="Body text" variant="body"/>);
        const paragraph = react_2.screen.getByText('Body text');
        expect(paragraph.tagName).toBe('P');
    });
    test('applies correct alignment classes', () => {
        (0, react_2.render)(<text_component_1.TextComponent id="test" content="Centered text" align="center"/>);
        const text = react_2.screen.getByText('Centered text');
        expect(text).toHaveClass('text-center');
    });
    test('applies custom className', () => {
        (0, react_2.render)(<text_component_1.TextComponent id="test" content="Styled text" className="custom-class"/>);
        const text = react_2.screen.getByText('Styled text');
        expect(text).toHaveClass('custom-class');
    });
});
//# sourceMappingURL=text-component.test.js.map