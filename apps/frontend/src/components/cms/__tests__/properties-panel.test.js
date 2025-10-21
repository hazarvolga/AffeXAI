"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const properties_panel_1 = require("../editor/properties-panel");
describe('PropertiesPanel', () => {
    const defaultProps = {
        componentType: '',
        componentProps: {},
        onPropsChange: jest.fn(),
    };
    it('renders empty state when no component is selected', () => {
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...defaultProps}/>);
        expect(react_2.screen.getByText('Select a component to edit its properties')).toBeInTheDocument();
    });
    it('renders text component properties', () => {
        const props = {
            ...defaultProps,
            componentType: 'text',
            componentProps: {
                content: 'Test content',
                variant: 'heading1',
                align: 'center',
            },
        };
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...props}/>);
        expect(react_2.screen.getByText('Text Properties')).toBeInTheDocument();
        expect(react_2.screen.getByLabelText('Content')).toBeInTheDocument();
        expect(react_2.screen.getByDisplayValue('Test content')).toBeInTheDocument();
    });
    it('renders button component properties', () => {
        const props = {
            ...defaultProps,
            componentType: 'button',
            componentProps: {
                text: 'Click me',
                variant: 'default',
                size: 'lg',
            },
        };
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...props}/>);
        expect(react_2.screen.getByText('Button Properties')).toBeInTheDocument();
        expect(react_2.screen.getByLabelText('Button Text')).toBeInTheDocument();
        expect(react_2.screen.getByDisplayValue('Click me')).toBeInTheDocument();
    });
    it('renders image component properties', () => {
        const props = {
            ...defaultProps,
            componentType: 'image',
            componentProps: {
                src: 'https://example.com/image.jpg',
                alt: 'Test image',
                caption: 'Test caption',
            },
        };
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...props}/>);
        expect(react_2.screen.getByText('Image Properties')).toBeInTheDocument();
        expect(react_2.screen.getByLabelText('Image URL')).toBeInTheDocument();
        expect(react_2.screen.getByDisplayValue('https://example.com/image.jpg')).toBeInTheDocument();
    });
    it('renders container component properties', () => {
        const props = {
            ...defaultProps,
            componentType: 'container',
            componentProps: {
                padding: 'lg',
                background: 'primary',
            },
        };
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...props}/>);
        expect(react_2.screen.getByText('Container Properties')).toBeInTheDocument();
        expect(react_2.screen.getByLabelText('Padding')).toBeInTheDocument();
    });
    it('renders block component properties', () => {
        const props = {
            ...defaultProps,
            componentType: 'block',
            componentProps: {
                blockId: 'hero-1',
            },
        };
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...props}/>);
        expect(react_2.screen.getByText('Block Properties')).toBeInTheDocument();
        expect(react_2.screen.getByLabelText('Block ID')).toBeInTheDocument();
        expect(react_2.screen.getByDisplayValue('hero-1')).toBeInTheDocument();
    });
    it('handles property changes', () => {
        const onPropsChange = jest.fn();
        const props = {
            ...defaultProps,
            componentType: 'text',
            componentProps: {
                content: 'Test content',
            },
            onPropsChange,
        };
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...props}/>);
        const textarea = react_2.screen.getByLabelText('Content');
        react_2.fireEvent.change(textarea, { target: { value: 'New content' } });
        expect(onPropsChange).toHaveBeenCalledWith({ content: 'New content' });
    });
    it('shows locked state when component is locked', () => {
        const props = {
            ...defaultProps,
            componentType: 'text',
            componentProps: {
                content: 'Test content',
            },
            isLocked: true,
        };
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...props}/>);
        expect(react_2.screen.getByText('This component is locked. Unlock it to make changes.')).toBeInTheDocument();
    });
    it('renders move buttons when callbacks are provided', () => {
        const props = {
            ...defaultProps,
            componentType: 'text',
            componentProps: {
                content: 'Test content',
            },
            onMoveUp: jest.fn(),
            onMoveDown: jest.fn(),
        };
        (0, react_2.render)(<properties_panel_1.PropertiesPanel {...props}/>);
        expect(react_2.screen.getByText('Move Up')).toBeInTheDocument();
        expect(react_2.screen.getByText('Move Down')).toBeInTheDocument();
    });
});
//# sourceMappingURL=properties-panel.test.js.map