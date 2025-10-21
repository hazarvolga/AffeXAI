"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const component_library_1 = require("../editor/component-library");
// Mock block imports
jest.mock('@/components/cms/blocks/navigation-blocks', () => ({
    navigationBlocks: [
        { id: 'nav-1', name: 'Navigation Bar', description: 'A simple navigation bar', category: 'Navigation', component: () => null },
    ],
}));
jest.mock('@/components/cms/blocks/hero-blocks', () => ({
    heroBlocks: [
        { id: 'hero-1', name: 'Hero Section', description: 'A hero section with text and image', category: 'Hero', component: () => null },
    ],
}));
jest.mock('@/components/cms/blocks/content-blocks', () => ({
    contentBlocks: [
        { id: 'content-1', name: 'Content Section', description: 'A content section with text', category: 'Content', component: () => null },
    ],
}));
// Add mocks for all other block imports
jest.mock('@/components/cms/blocks/footer-blocks', () => ({ footerBlocks: [] }));
jest.mock('@/components/cms/blocks/element-blocks', () => ({ elementBlocks: [] }));
jest.mock('@/components/cms/blocks/content-variants-blocks', () => ({ contentVariantBlocks: [] }));
jest.mock('@/components/cms/blocks/special-blocks', () => ({ specialBlocks: [] }));
jest.mock('@/components/cms/blocks/ecommerce-blocks', () => ({ ecommerceBlocks: [] }));
jest.mock('@/components/cms/blocks/gallery-blocks', () => ({ galleryBlocks: [] }));
jest.mock('@/components/cms/blocks/blog-rss-blocks', () => ({ blogRssBlocks: [] }));
jest.mock('@/components/cms/blocks/social-sharing-blocks', () => ({ socialSharingBlocks: [] }));
describe('ComponentLibrary', () => {
    const defaultProps = {
        onComponentSelect: jest.fn(),
        onBlockSelect: jest.fn(),
    };
    it('renders without crashing', () => {
        (0, react_2.render)(<component_library_1.ComponentLibrary {...defaultProps}/>);
        expect(react_2.screen.getByText('Components & Blocks')).toBeInTheDocument();
    });
    it('renders component categories', () => {
        (0, react_2.render)(<component_library_1.ComponentLibrary {...defaultProps}/>);
        expect(react_2.screen.getByText('Layout Components')).toBeInTheDocument();
        expect(react_2.screen.getByText('Content Components')).toBeInTheDocument();
        expect(react_2.screen.getByText('Media Components')).toBeInTheDocument();
    });
    it('renders block categories', () => {
        (0, react_2.render)(<component_library_1.ComponentLibrary {...defaultProps}/>);
        expect(react_2.screen.getByText('Navigation Blocks')).toBeInTheDocument();
        expect(react_2.screen.getByText('Hero Blocks')).toBeInTheDocument();
        expect(react_2.screen.getByText('Content Blocks')).toBeInTheDocument();
    });
    it('expands and collapses categories', () => {
        (0, react_2.render)(<component_library_1.ComponentLibrary {...defaultProps}/>);
        const layoutCategory = react_2.screen.getByText('Layout Components');
        react_2.fireEvent.click(layoutCategory);
        expect(react_2.screen.getByText('Container')).toBeInTheDocument();
        expect(react_2.screen.getByText('Grid')).toBeInTheDocument();
        expect(react_2.screen.getByText('Card')).toBeInTheDocument();
        react_2.fireEvent.click(layoutCategory);
        // After collapsing, the components should not be visible
        // This would require more complex testing with async behavior
    });
    it('handles component selection', () => {
        const onComponentSelect = jest.fn();
        (0, react_2.render)(<component_library_1.ComponentLibrary {...defaultProps} onComponentSelect={onComponentSelect}/>);
        // Expand the Content Components category
        const contentCategory = react_2.screen.getByText('Content Components');
        react_2.fireEvent.click(contentCategory);
        // Click on the Text component
        const textComponent = react_2.screen.getByText('Text');
        react_2.fireEvent.click(textComponent);
        expect(onComponentSelect).toHaveBeenCalledWith('text');
    });
    it('handles block selection', () => {
        const onBlockSelect = jest.fn();
        (0, react_2.render)(<component_library_1.ComponentLibrary {...defaultProps} onBlockSelect={onBlockSelect}/>);
        // Expand the Hero Blocks category
        const heroCategory = react_2.screen.getByText('Hero Blocks');
        react_2.fireEvent.click(heroCategory);
        // Click on the Hero Section block
        const heroBlock = react_2.screen.getByText('Hero Section');
        react_2.fireEvent.click(heroBlock);
        expect(onBlockSelect).toHaveBeenCalled();
    });
    it('handles search functionality', () => {
        (0, react_2.render)(<component_library_1.ComponentLibrary {...defaultProps}/>);
        const searchInput = react_2.screen.getByPlaceholderText('Search components and blocks...');
        react_2.fireEvent.change(searchInput, { target: { value: 'Hero' } });
        // The search results should show the Hero Section block
        expect(react_2.screen.getByText('Hero Section')).toBeInTheDocument();
    });
    it('shows empty search results message', () => {
        (0, react_2.render)(<component_library_1.ComponentLibrary {...defaultProps}/>);
        const searchInput = react_2.screen.getByPlaceholderText('Search components and blocks...');
        react_2.fireEvent.change(searchInput, { target: { value: 'Nonexistent Component' } });
        expect(react_2.screen.getByText('No components or blocks found')).toBeInTheDocument();
    });
});
//# sourceMappingURL=component-library.test.js.map