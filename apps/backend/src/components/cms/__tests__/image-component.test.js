"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const image_component_1 = require("../image-component");
// Mock the editor context
jest.mock('../editor/editor-context', () => ({
    useEditor: () => ({
        isEditMode: false,
        updateComponentProps: jest.fn(),
    }),
}));
describe('ImageComponent', () => {
    const defaultProps = {
        id: 'test-image',
        src: 'https://example.com/image.jpg',
        alt: 'Test image',
    };
    it('renders correctly with default props', () => {
        (0, react_2.render)(<image_component_1.ImageComponent {...defaultProps}/>);
        const image = react_2.screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
        expect(image).toHaveAttribute('alt', 'Test image');
    });
    it('applies correct classes for fit and position', () => {
        (0, react_2.render)(<image_component_1.ImageComponent {...defaultProps} fit="cover" position="center"/>);
        const image = react_2.screen.getByRole('img');
        expect(image).toHaveClass('object-cover', 'object-center');
    });
    it('applies correct classes for rounded corners', () => {
        (0, react_2.render)(<image_component_1.ImageComponent {...defaultProps} rounded="lg"/>);
        const image = react_2.screen.getByRole('img');
        expect(image).toHaveClass('rounded-lg');
    });
    it('applies correct classes for shadow', () => {
        (0, react_2.render)(<image_component_1.ImageComponent {...defaultProps} shadow="md"/>);
        const image = react_2.screen.getByRole('img');
        expect(image).toHaveClass('shadow');
    });
    it('shows caption when provided', () => {
        (0, react_2.render)(<image_component_1.ImageComponent {...defaultProps} caption="Test caption"/>);
        expect(react_2.screen.getByText('Test caption')).toBeInTheDocument();
    });
    it('shows placeholder when src is empty', () => {
        (0, react_2.render)(<image_component_1.ImageComponent {...defaultProps} src=""/>);
        expect(react_2.screen.getByText('No image selected')).toBeInTheDocument();
    });
    it('applies border classes when border is enabled', () => {
        (0, react_2.render)(<image_component_1.ImageComponent {...defaultProps} border={true} borderColor="primary"/>);
        const image = react_2.screen.getByRole('img');
        expect(image).toHaveClass('border', 'border-primary');
    });
    it('sets loading attribute based on lazy prop', () => {
        const { rerender } = (0, react_2.render)(<image_component_1.ImageComponent {...defaultProps} lazy={true}/>);
        let image = react_2.screen.getByRole('img');
        expect(image).toHaveAttribute('loading', 'lazy');
        rerender(<image_component_1.ImageComponent {...defaultProps} lazy={false}/>);
        image = react_2.screen.getByRole('img');
        expect(image).toHaveAttribute('loading', 'eager');
    });
});
//# sourceMappingURL=image-component.test.js.map