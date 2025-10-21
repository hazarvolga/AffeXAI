"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const visual_editor_1 = require("../editor/visual-editor");
// Mock the cmsService
jest.mock('@/lib/cms/cms-service', () => ({
    cmsService: {
        getPage: jest.fn(),
        getComponents: jest.fn(),
        updatePage: jest.fn(),
        createComponent: jest.fn(),
        updateComponent: jest.fn(),
        deleteComponent: jest.fn(),
    },
}));
// Mock child components
jest.mock('../editor/component-library', () => ({
    ComponentLibrary: () => <div data-testid="component-library">Component Library</div>,
}));
jest.mock('../editor/editor-canvas', () => ({
    EditorCanvas: () => <div data-testid="editor-canvas">Editor Canvas</div>,
}));
jest.mock('../editor/properties-panel', () => ({
    PropertiesPanel: () => <div data-testid="properties-panel">Properties Panel</div>,
}));
jest.mock('../editor/history-panel', () => ({
    HistoryPanel: () => <div data-testid="history-panel">History Panel</div>,
}));
jest.mock('../editor/media-library', () => ({
    MediaLibrary: () => <div data-testid="media-library">Media Library</div>,
}));
jest.mock('../editor/layout-options-panel', () => ({
    LayoutOptionsPanel: () => <div data-testid="layout-options-panel">Layout Options Panel</div>,
}));
jest.mock('../editor/debug-panel', () => ({
    DebugPanel: () => <div data-testid="debug-panel">Debug Panel</div>,
}));
jest.mock('../editor/template-manager', () => ({
    TemplateManager: () => <div data-testid="template-manager">Template Manager</div>,
}));
// Mock useToast
jest.mock('@/hooks/use-toast', () => ({
    useToast: () => ({
        toast: jest.fn(),
    }),
}));
describe('VisualEditor', () => {
    const mockPageId = 'test-page-id';
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('renders without crashing', () => {
        (0, react_2.render)(<visual_editor_1.VisualEditor pageId={mockPageId}/>);
        expect(react_2.screen.getByText('Visual CMS Editor')).toBeInTheDocument();
    });
    it('displays the component library by default', () => {
        (0, react_2.render)(<visual_editor_1.VisualEditor pageId={mockPageId}/>);
        expect(react_2.screen.getByTestId('component-library')).toBeInTheDocument();
    });
    it('switches between tabs correctly', async () => {
        (0, react_2.render)(<visual_editor_1.VisualEditor pageId={mockPageId}/>);
        // Click on the Media tab
        const mediaTab = react_2.screen.getByText('Media');
        react_2.fireEvent.click(mediaTab);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByTestId('media-library')).toBeInTheDocument();
        });
        // Click on the Layout tab
        const layoutTab = react_2.screen.getByText('Layout');
        react_2.fireEvent.click(layoutTab);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByTestId('layout-options-panel')).toBeInTheDocument();
        });
    });
    it('shows save button and handles save action', () => {
        (0, react_2.render)(<visual_editor_1.VisualEditor pageId={mockPageId}/>);
        const saveButton = react_2.screen.getByText('Save Draft');
        expect(saveButton).toBeInTheDocument();
    });
    it('shows preview button and handles preview toggle', () => {
        (0, react_2.render)(<visual_editor_1.VisualEditor pageId={mockPageId}/>);
        const previewButton = react_2.screen.getByText('Preview');
        expect(previewButton).toBeInTheDocument();
    });
    it('renders editor canvas', () => {
        (0, react_2.render)(<visual_editor_1.VisualEditor pageId={mockPageId}/>);
        expect(react_2.screen.getByTestId('editor-canvas')).toBeInTheDocument();
    });
    it('renders properties panel', () => {
        (0, react_2.render)(<visual_editor_1.VisualEditor pageId={mockPageId}/>);
        expect(react_2.screen.getByTestId('properties-panel')).toBeInTheDocument();
    });
    it('handles keyboard shortcuts', () => {
        (0, react_2.render)(<visual_editor_1.VisualEditor pageId={mockPageId}/>);
        // Simulate Ctrl+Z (undo)
        react_2.fireEvent.keyDown(window, { key: 'z', ctrlKey: true });
        // Simulate Ctrl+Shift+Z (redo)
        react_2.fireEvent.keyDown(window, { key: 'Z', ctrlKey: true, shiftKey: true });
    });
});
//# sourceMappingURL=visual-editor.test.js.map