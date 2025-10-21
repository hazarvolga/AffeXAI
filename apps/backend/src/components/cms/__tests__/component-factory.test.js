"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_factory_1 = __importDefault(require("../component-factory"));
describe('ComponentFactory', () => {
    it('creates a text component with correct default props', () => {
        const component = component_factory_1.default.createComponent('text');
        expect(component).toHaveProperty('id');
        expect(component).toHaveProperty('type', 'text');
        expect(component).toHaveProperty('props');
        expect(component.props).toHaveProperty('content', 'New text component');
        expect(component.props).toHaveProperty('variant', 'body');
    });
    it('creates a button component with correct default props', () => {
        const component = component_factory_1.default.createComponent('button');
        expect(component).toHaveProperty('id');
        expect(component).toHaveProperty('type', 'button');
        expect(component).toHaveProperty('props');
        expect(component.props).toHaveProperty('text', 'Click me');
        expect(component.props).toHaveProperty('variant', 'default');
    });
    it('creates an image component with correct default props', () => {
        const component = component_factory_1.default.createComponent('image');
        expect(component).toHaveProperty('id');
        expect(component).toHaveProperty('type', 'image');
        expect(component).toHaveProperty('props');
        expect(component.props).toHaveProperty('src', '/placeholder-image.jpg');
        expect(component.props).toHaveProperty('alt', 'Placeholder image');
    });
    it('creates a container component with correct default props', () => {
        const component = component_factory_1.default.createComponent('container');
        expect(component).toHaveProperty('id');
        expect(component).toHaveProperty('type', 'container');
        expect(component).toHaveProperty('props');
        expect(component.props).toHaveProperty('padding', 'md');
        expect(component.props).toHaveProperty('background', 'none');
    });
    it('creates a block component with specified blockId', () => {
        const component = component_factory_1.default.createBlockComponent('hero-1');
        expect(component).toHaveProperty('id');
        expect(component).toHaveProperty('type', 'block');
        expect(component.props).toHaveProperty('blockId', 'hero-1');
    });
    it('creates a text component with custom content', () => {
        const component = component_factory_1.default.createTextComponent('Custom content');
        expect(component).toHaveProperty('type', 'text');
        expect(component.props).toHaveProperty('content', 'Custom content');
    });
    it('creates a button component with custom text', () => {
        const component = component_factory_1.default.createButtonComponent('Custom button');
        expect(component).toHaveProperty('type', 'button');
        expect(component.props).toHaveProperty('text', 'Custom button');
    });
    it('creates an image component with custom src and alt', () => {
        const component = component_factory_1.default.createImageComponent('https://example.com/image.jpg', 'Custom alt');
        expect(component).toHaveProperty('type', 'image');
        expect(component.props).toHaveProperty('src', 'https://example.com/image.jpg');
        expect(component.props).toHaveProperty('alt', 'Custom alt');
    });
    it('clones a component with a new ID', () => {
        const originalComponent = component_factory_1.default.createComponent('text');
        const clonedComponent = component_factory_1.default.cloneComponent(originalComponent);
        expect(clonedComponent).toHaveProperty('id');
        expect(clonedComponent.id).not.toBe(originalComponent.id);
        expect(clonedComponent.type).toBe(originalComponent.type);
        expect(clonedComponent.props).toEqual(originalComponent.props);
    });
    it('merges custom props with default props', () => {
        const component = component_factory_1.default.createComponent('text', {
            content: 'Custom content',
            color: 'primary'
        });
        expect(component.props).toHaveProperty('content', 'Custom content');
        expect(component.props).toHaveProperty('color', 'primary');
        expect(component.props).toHaveProperty('variant', 'body'); // default prop preserved
    });
    it('creates components with unique IDs', () => {
        const component1 = component_factory_1.default.createComponent('text');
        const component2 = component_factory_1.default.createComponent('text');
        expect(component1.id).not.toBe(component2.id);
    });
});
//# sourceMappingURL=component-factory.test.js.map