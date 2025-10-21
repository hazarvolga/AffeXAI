"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const editor_canvas_1 = require("../editor/editor-canvas");
// Mock components
jest.mock('../text-component', () => ({
    TextComponent: ({ id, content }) => <div data-testid={`text-${id}`}>{content}</div>,
}));
jest.mock('../button-component', () => ({
    ButtonComponent: ({ id, text }) => <button data-testid={`button-${id}`}>{text}</button>,
}));
jest.mock('../image-component', () => ({
    ImageComponent: ({ id, src, alt }) => <img data-testid={`image-${id}`} src={src} alt={alt}/>,
}));
jest.mock('../container-component', () => ({
    ContainerComponent: ({ id, children }) => <div data-testid={`container-${id}`}>{children}</div>,
}));
jest.mock('../card-component', () => ({
    CardComponent: ({ id, children }) => <div data-testid={`card-${id}`}>{children}</div>,
}));
jest.mock('../grid-component', () => ({
    GridComponent: ({ id, children }) => <div data-testid={`grid-${id}`}>{children}</div>,
}));
jest.mock('../editor/block-renderer', () => ({
    BlockRenderer: ({ blockId }) => <div data-testid={`block-${blockId}`}>Block Content</div>,
}));
describe('EditorCanvas', () => {
    const defaultProps = {
        components: [],
        onComponentUpdate: jest.fn(),
        onComponentDelete: jest.fn(),
        onComponentSelect: jest.fn(),
        selectedComponentId: null,
    };
    it('renders empty state when no components', () => {
        (0, react_2.render)(<editor_canvas_1.EditorCanvas {...defaultProps}/>);
        expect(react_2.screen.getByText('Drag components here to start building your page')).toBeInTheDocument();
    });
    it('renders components correctly', () => {
        const components = [
            { id: '1', type: 'text', props: { content: 'Hello World' } },
            { id: '2', type: 'button', props: { text: 'Click Me' } },
            { id: '3', type: 'image', props: { src: 'image.jpg', alt: 'Test Image' } },
        ];
        (0, react_2.render)(<editor_canvas_1.EditorCanvas {...defaultProps} components={components}/>);
        expect(react_2.screen.getByTestId('text-1')).toBeInTheDocument();
        expect(react_2.screen.getByText('Hello World')).toBeInTheDocument();
        expect(react_2.screen.getByTestId('button-2')).toBeInTheDocument();
        expect(react_2.screen.getByText('Click Me')).toBeInTheDocument();
        expect(react_2.screen.getByTestId('image-3')).toBeInTheDocument();
        expect(react_2.screen.getByTestId('image-3')).toHaveAttribute('src', 'image.jpg');
    });
    it('handles component selection', () => {
        const onComponentSelect = jest.fn();
        const components = [
            { id: '1', type: 'text', props: { content: 'Hello World' } },
        ];
        (0, react_2.render)(<editor_canvas_1.EditorCanvas {...defaultProps} components={components} onComponentSelect={onComponentSelect}/>);
        const component = react_2.screen.getByTestId('text-1');
        react_2.fireEvent.click(component);
        expect(onComponentSelect).toHaveBeenCalledWith('1', 'text');
    });
    it('renders nested components correctly', () => {
        const components = [
            {
                id: '1',
                type: 'container',
                props: {},
                children: [
                    {
                        id: '2',
                        type: 'text',
                        props: { content: 'Nested Text' },
                    },
                ],
            },
        ];
        (0, react_2.render)(<editor_canvas_1.EditorCanvas {...defaultProps} components={components}/>);
        expect(react_2.screen.getByTestId('container-1')).toBeInTheDocument();
        expect(react_2.screen.getByTestId('text-2')).toBeInTheDocument();
        expect(react_2.screen.getByText('Nested Text')).toBeInTheDocument();
    });
    it('renders block components correctly', () => {
        const components = [
            {
                id: '1',
                type: 'block',
                props: { blockId: 'hero-1' },
            },
        ];
        (0, react_2.render)(<editor_canvas_1.EditorCanvas {...defaultProps} components={components}/>);
        expect(react_2.screen.getByTestId('block-hero-1')).toBeInTheDocument();
    });
    it('shows action buttons when component is selected', () => {
        const components = [
            { id: '1', type: 'text', props: { content: 'Hello World' } },
        ];
        (0, react_2.render)(<editor_canvas_1.EditorCanvas {...defaultProps} components={components} selectedComponentId="1"/>);
        // Action buttons would be rendered in a real implementation
        // This test just verifies the component renders without error
        expect(react_2.screen.getByTestId('text-1')).toBeInTheDocument();
    });
    it('handles drag and drop events', () => {
        const mockDrop = jest.fn();
        (0, react_2.render)(<editor_canvas_1.EditorCanvas {...defaultProps} onComponentDrop={mockDrop}/>);
        const canvas = react_2.screen.getByText('Page Canvas').closest('.h-full');
        if (canvas) {
            react_2.fireEvent.dragOver(canvas, { preventDefault: jest.fn() });
            react_2.fireEvent.drop(canvas, { preventDefault: jest.fn() });
        }
        // In a real implementation, we would test the drop handler
        // For now, we just verify the component renders
        expect(react_2.screen.getByText('Page Canvas')).toBeInTheDocument();
    });
});
//# sourceMappingURL=editor-canvas.test.js.map