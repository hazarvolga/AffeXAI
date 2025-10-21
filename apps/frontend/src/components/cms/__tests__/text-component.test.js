"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const text_component_1 = require("../text-component");
// Mock the editor context
jest.mock('../editor/editor-context', () => ({
    useEditor: () => ({
        isEditMode: true,
        updateComponentProps: jest.fn(),
    }),
}));
describe('TextComponent', () => {
    const defaultProps = {
        id: 'test-text',
        content: 'Test content',
        variant: 'body',
        align: 'left',
    };
    it('renders correctly with default props', () => {
        (0, react_2.render)(<text_component_1.TextComponent {...defaultProps}/>);
        expect(react_2.screen.getByText('Test content')).toBeInTheDocument();
        expect(react_2.screen.getByText('Test content')).toHaveClass('text-base');
    });
    it('applies correct classes for heading variants', () => {
        (0, react_2.render)(<text_component_1.TextComponent {...defaultProps} variant="heading1"/>);
        expect(react_2.screen.getByText('Test content')).toHaveClass('text-4xl', 'font-bold');
    });
    it('applies correct classes for alignment', () => {
        (0, react_2.render)(<text_component_1.TextComponent {...defaultProps} align="center"/>);
        expect(react_2.screen.getByText('Test content')).toHaveClass('text-center');
    });
    it('shows placeholder in edit mode when content is empty', () => {
        (0, react_2.render)(<text_component_1.TextComponent {...defaultProps} content=""/>);
        expect(react_2.screen.getByText('Click to edit...')).toBeInTheDocument();
    });
    it('handles content updates in edit mode', () => {
        (0, react_2.render)(<text_component_1.TextComponent {...defaultProps}/>);
        const textElement = react_2.screen.getByText('Test content');
        react_2.fireEvent.doubleClick(textElement);
        expect(textElement).toHaveAttribute('contentEditable', 'true');
    });
});
//# sourceMappingURL=text-component.test.js.map