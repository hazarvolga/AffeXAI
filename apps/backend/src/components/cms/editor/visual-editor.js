"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualEditor = void 0;
const react_1 = __importStar(require("react"));
const component_library_1 = require("./component-library");
const editor_canvas_1 = require("./editor-canvas");
const properties_panel_1 = require("./properties-panel");
const history_panel_1 = require("./history-panel");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const tabs_1 = require("@/components/ui/tabs");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const label_1 = require("@/components/ui/label");
const use_toast_1 = require("@/hooks/use-toast");
const media_library_1 = require("./media-library");
const cms_service_1 = require("@/lib/cms/cms-service");
const component_factory_1 = __importDefault(require("@/components/cms/component-factory"));
const use_cms_tracking_1 = require("@/hooks/use-cms-tracking");
const lucide_react_1 = require("lucide-react");
const framer_motion_1 = require("framer-motion");
const debug_panel_1 = require("./debug-panel");
const template_manager_1 = require("./template-manager");
const editor_context_1 = require("./editor-context"); // Import EditorProvider
const layout_component_1 = require("./layout-component"); // Import LayoutComponent
const VisualEditor = ({ pageId }) => {
    const { toast } = (0, use_toast_1.useToast)();
    const trackActivity = (0, use_cms_tracking_1.useActivityTracking)();
    const [components, setComponents] = (0, react_1.useState)([]);
    const [selectedComponentId, setSelectedComponentId] = (0, react_1.useState)(null);
    const [selectedComponentType, setSelectedComponentType] = (0, react_1.useState)('');
    const [history, setHistory] = (0, react_1.useState)([
        {
            components: [],
            timestamp: Date.now(),
            action: "Initial state"
        }
    ]);
    const [historyIndex, setHistoryIndex] = (0, react_1.useState)(0);
    const [pageTitle, setPageTitle] = (0, react_1.useState)('');
    const [pageSlug, setPageSlug] = (0, react_1.useState)('');
    const [pageDescription, setPageDescription] = (0, react_1.useState)('');
    const [layoutOptions, setLayoutOptions] = (0, react_1.useState)({
        showHeader: true,
        showFooter: true,
        fullWidth: false,
        backgroundColor: 'bg-background',
        showTitle: true
    });
    const [isLeftPanelOpen, setIsLeftPanelOpen] = (0, react_1.useState)(true);
    const [isRightPanelOpen, setIsRightPanelOpen] = (0, react_1.useState)(true);
    const [activeTab, setActiveTab] = (0, react_1.useState)('components');
    const [isPreviewMode, setIsPreviewMode] = (0, react_1.useState)(false); // New state for preview mode
    // Category and Menu states
    const [selectedCategoryId, setSelectedCategoryId] = (0, react_1.useState)('');
    const [selectedMenuIds, setSelectedMenuIds] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [menus, setMenus] = (0, react_1.useState)([]);
    // Refs for tracking state changes
    const lastActionRef = (0, react_1.useRef)("");
    const isSavingRef = (0, react_1.useRef)(false);
    // Save state to history with action description
    const saveToHistory = (0, react_1.useCallback)((newComponents, action) => {
        // Don't save to history if we're in the middle of saving
        if (isSavingRef.current)
            return;
        // If this is the same action as the last one, update the last history item instead of creating a new one
        if (action === lastActionRef.current && historyIndex === history.length - 1) {
            const newHistory = [...history];
            newHistory[historyIndex] = {
                components: [...newComponents],
                timestamp: Date.now(),
                action
            };
            setHistory(newHistory);
            return;
        }
        // Otherwise, add a new history item
        const newHistory = [...history.slice(0, historyIndex + 1), {
                components: [...newComponents],
                timestamp: Date.now(),
                action
            }];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        lastActionRef.current = action;
    }, [history, historyIndex]);
    // Move component up in the list
    const handleMoveUp = (0, react_1.useCallback)(() => {
        if (!selectedComponentId)
            return;
        const selectedIndex = components.findIndex(comp => comp.id === selectedComponentId);
        if (selectedIndex <= 0)
            return;
        const newComponents = [...components];
        [newComponents[selectedIndex], newComponents[selectedIndex - 1]] =
            [newComponents[selectedIndex - 1], newComponents[selectedIndex]];
        setComponents(newComponents);
        saveToHistory(newComponents, `Moved component up: ${selectedComponentId}`);
    }, [components, selectedComponentId, saveToHistory]);
    // Move component down in the list
    const handleMoveDown = (0, react_1.useCallback)(() => {
        if (!selectedComponentId)
            return;
        const selectedIndex = components.findIndex(comp => comp.id === selectedComponentId);
        if (selectedIndex === -1 || selectedIndex >= components.length - 1)
            return;
        const newComponents = [...components];
        [newComponents[selectedIndex], newComponents[selectedIndex + 1]] =
            [newComponents[selectedIndex + 1], newComponents[selectedIndex]];
        setComponents(newComponents);
        saveToHistory(newComponents, `Moved component down: ${selectedComponentId}`);
    }, [components, selectedComponentId, saveToHistory]);
    // Handle layout options change
    const handleLayoutOptionsChange = (0, react_1.useCallback)((newLayoutOptions) => {
        setLayoutOptions(prev => ({ ...prev, ...newLayoutOptions }));
        // Save to history when layout options change
        saveToHistory(components, "Updated layout options");
    }, [components, saveToHistory]);
    // Load page data if pageId is provided
    (0, react_1.useEffect)(() => {
        if (pageId) {
            const loadPageData = async () => {
                try {
                    const page = await cms_service_1.cmsService.getPage(pageId);
                    setPageTitle(page.title);
                    setPageSlug(page.slug);
                    setPageDescription(page.description || '');
                    setSelectedCategoryId(page.categoryId || '');
                    if (page.layoutOptions) {
                        setLayoutOptions({
                            showHeader: page.layoutOptions.showHeader ?? true,
                            showFooter: page.layoutOptions.showFooter ?? true,
                            fullWidth: page.layoutOptions.fullWidth ?? false,
                            backgroundColor: page.layoutOptions.backgroundColor ?? 'bg-background',
                            showTitle: page.layoutOptions.showTitle ?? true
                        });
                    }
                    if (page.components && page.components.length > 0) {
                        console.log('Loaded components from page response:', page.components);
                        setComponents(page.components);
                        setHistory([{
                                components: page.components,
                                timestamp: Date.now(),
                                action: "Loaded page data"
                            }]);
                        setHistoryIndex(0);
                    }
                    else {
                        try {
                            const pageComponents = await cms_service_1.cmsService.getComponents(pageId);
                            console.log('Loaded components separately:', pageComponents);
                            setComponents(pageComponents);
                            setHistory([{
                                    components: pageComponents,
                                    timestamp: Date.now(),
                                    action: "Loaded components"
                                }]);
                            setHistoryIndex(0);
                        }
                        catch (componentError) {
                            console.error('Failed to load components:', componentError);
                            setComponents([]);
                            setHistory([{
                                    components: [],
                                    timestamp: Date.now(),
                                    action: "Initialized with empty components"
                                }]);
                            setHistoryIndex(0);
                        }
                    }
                }
                catch (error) {
                    console.error('Failed to load page data:', error);
                    toast({
                        title: "Error",
                        description: "Failed to load page data",
                        variant: "destructive",
                    });
                }
            };
            loadPageData();
        }
    }, [pageId, toast]);
    // Load categories and menus
    (0, react_1.useEffect)(() => {
        const loadCategoriesAndMenus = async () => {
            try {
                const [categoriesData, menusData] = await Promise.all([
                    cms_service_1.cmsService.getCategories(),
                    cms_service_1.cmsService.getMenus(),
                ]);
                setCategories(categoriesData);
                setMenus(menusData);
                // If we have a pageId, check which menus contain this page
                if (pageId && menusData.length > 0) {
                    const pageMenuIds = [];
                    menusData.forEach(menu => {
                        if (menu.items?.some(item => item.pageId === pageId)) {
                            pageMenuIds.push(menu.id);
                        }
                    });
                    setSelectedMenuIds(pageMenuIds);
                }
            }
            catch (error) {
                console.error('Failed to load categories and menus:', error);
            }
        };
        loadCategoriesAndMenus();
    }, [pageId]);
    // Undo functionality
    const handleUndo = (0, react_1.useCallback)(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const prevState = history[newIndex];
            setComponents(prevState.components);
            toast({
                title: "Undo",
                description: `Reverted: ${prevState.action}`,
            });
            if (selectedComponentId && !prevState.components.find(c => c.id === selectedComponentId)) {
                setSelectedComponentId(null);
                setSelectedComponentType('');
            }
        }
    }, [history, historyIndex, selectedComponentId, toast]);
    // Redo functionality
    const handleRedo = (0, react_1.useCallback)(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            const nextState = history[newIndex];
            setComponents(nextState.components);
            toast({
                title: "Redo",
                description: `Reapplied: ${nextState.action}`,
            });
            if (selectedComponentId && !nextState.components.find(c => c.id === selectedComponentId)) {
                setSelectedComponentId(null);
                setSelectedComponentType('');
            }
        }
    }, [history, historyIndex, selectedComponentId, toast]);
    // Jump to specific history item
    const handleHistorySelect = (0, react_1.useCallback)((index) => {
        if (index >= 0 && index < history.length) {
            setHistoryIndex(index);
            const state = history[index];
            setComponents(state.components);
            toast({
                title: "History Navigation",
                description: `Loaded state: ${state.action}`,
            });
            if (selectedComponentId && !state.components.find(c => c.id === selectedComponentId)) {
                setSelectedComponentId(null);
                setSelectedComponentType('');
            }
        }
    }, [history, selectedComponentId, toast]);
    // Duplicate selected component
    const handleDuplicate = (0, react_1.useCallback)(() => {
        if (selectedComponentId) {
            const componentToDuplicate = components.find(comp => comp.id === selectedComponentId);
            if (componentToDuplicate) {
                const newComponent = {
                    ...componentToDuplicate,
                    id: `comp-${Date.now()}`,
                    props: {
                        ...componentToDuplicate.props,
                        content: componentToDuplicate.props.content ? `${componentToDuplicate.props.content} (copy)` : undefined
                    }
                };
                const newComponents = [...components, newComponent];
                setComponents(newComponents);
                saveToHistory(newComponents, `Duplicated component: ${selectedComponentId}`);
                setSelectedComponentId(newComponent.id);
                setSelectedComponentType(newComponent.type);
                toast({
                    title: "Component Duplicated",
                    description: "Component has been duplicated",
                });
            }
        }
    }, [components, selectedComponentId, saveToHistory, toast]);
    // Delete selected component
    const handleDelete = (0, react_1.useCallback)(() => {
        if (selectedComponentId) {
            const componentToDelete = components.find(comp => comp.id === selectedComponentId);
            if (componentToDelete?.locked) {
                toast({
                    title: "Action Denied",
                    description: "Cannot delete locked component",
                    variant: "destructive",
                });
                return;
            }
            const newComponents = components.filter(comp => comp.id !== selectedComponentId);
            setComponents(newComponents);
            saveToHistory(newComponents, `Deleted component: ${selectedComponentId}`);
            setSelectedComponentId(null);
            setSelectedComponentType('');
            toast({
                title: "Component Deleted",
                description: "Component has been deleted",
            });
        }
    }, [components, selectedComponentId, saveToHistory, toast]);
    // Toggle component lock
    const handleToggleLock = (0, react_1.useCallback)(() => {
        if (selectedComponentId) {
            const newComponents = components.map(comp => comp.id === selectedComponentId ? { ...comp, locked: !comp.locked } : comp);
            setComponents(newComponents);
            saveToHistory(newComponents, `Toggled lock for component: ${selectedComponentId}`);
            const isLocked = components.find(c => c.id === selectedComponentId)?.locked;
            toast({
                title: "Component Updated",
                description: `Component ${isLocked ? 'unlocked' : 'locked'}`,
            });
        }
    }, [components, selectedComponentId, saveToHistory, toast]);
    // Toggle preview mode
    const handleTogglePreview = (0, react_1.useCallback)(() => {
        setIsPreviewMode(!isPreviewMode);
        toast({
            title: "Preview Mode",
            description: `Preview mode ${!isPreviewMode ? 'enabled' : 'disabled'}`,
        });
    }, [isPreviewMode, toast]);
    // Save page
    const handleSavePage = (0, react_1.useCallback)(async () => {
        if (!pageId) {
            toast({
                title: "Error",
                description: "No page ID provided",
                variant: "destructive",
            });
            return;
        }
        try {
            isSavingRef.current = true;
            try {
                const page = await cms_service_1.cmsService.getPage(pageId);
                console.log('Page exists:', page);
            }
            catch (error) {
                console.error('Page not found:', error);
                toast({
                    title: "Error",
                    description: "Page not found. Please make sure you're editing a valid page.",
                    variant: "destructive",
                });
                isSavingRef.current = false;
                return;
            }
            await cms_service_1.cmsService.updatePage(pageId, {
                title: pageTitle,
                slug: pageSlug,
                description: pageDescription,
                layoutOptions: layoutOptions,
                categoryId: selectedCategoryId || undefined,
            });
            // Track edit activity
            await trackActivity('edit', pageId, pageTitle);
            // Handle menu assignment
            // Note: For simplicity, we're handling single menu assignment
            // If a menu is selected, ensure the page is in that menu
            if (selectedMenuIds.length > 0 && selectedMenuIds[0]) {
                const menuId = selectedMenuIds[0];
                try {
                    // Check if page already exists in this menu
                    const menu = await cms_service_1.cmsService.getMenu(menuId);
                    const existingItem = menu.items?.find(item => item.pageId === pageId);
                    if (!existingItem) {
                        // Add page to menu
                        await cms_service_1.cmsService.addPageToMenu(menuId, pageId, pageTitle);
                    }
                }
                catch (error) {
                    console.error('Failed to assign page to menu:', error);
                    // Don't fail the entire save operation if menu assignment fails
                }
            }
            const existingComponents = await cms_service_1.cmsService.getComponents(pageId);
            console.log('Existing components:', existingComponents);
            const componentIds = components.map(c => c.id);
            const componentsToDelete = existingComponents.filter(c => !componentIds.includes(c.id));
            console.log('Components to delete:', componentsToDelete);
            await Promise.all(componentsToDelete.map(c => cms_service_1.cmsService.deleteComponent(c.id)));
            console.log('Components to save:', components);
            const savedComponents = [];
            await Promise.all(components.map(async (component) => {
                const existingComponent = existingComponents.find(c => c.id === component.id);
                const componentData = {
                    pageId,
                    type: component.type,
                    props: component.props,
                    orderIndex: 0,
                };
                console.log('Saving component:', componentData);
                if (existingComponent) {
                    try {
                        const result = await cms_service_1.cmsService.updateComponent(component.id, componentData);
                        console.log(`Updated component ${component.id}:`, result);
                        savedComponents.push(result);
                    }
                    catch (error) {
                        console.error(`Failed to update component ${component.id}:`, error);
                        throw error;
                    }
                }
                else {
                    try {
                        const result = await cms_service_1.cmsService.createComponent(componentData);
                        console.log(`Created component ${component.id}:`, result);
                        savedComponents.push(result);
                    }
                    catch (error) {
                        console.error(`Failed to create component ${component.id}:`, error);
                        throw error;
                    }
                }
            }));
            console.log('All saved components:', savedComponents);
            // Add save action to history
            saveToHistory(components, "Saved page");
            toast({
                title: "Success",
                description: "Page saved successfully",
            });
        }
        catch (error) {
            console.error('Save error:', error);
            toast({
                title: "Error",
                description: `Failed to save page: ${error.message || error}`,
                variant: "destructive",
            });
        }
        finally {
            isSavingRef.current = false;
        }
    }, [pageId, pageTitle, pageSlug, pageDescription, layoutOptions, components, saveToHistory, toast]);
    // Keyboard shortcuts
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (e) => {
            // Ignore if we're in an input field
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            // Ctrl/Cmd + Z for undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                handleUndo();
            }
            // Ctrl/Cmd + Shift + Z for redo
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') {
                e.preventDefault();
                handleRedo();
            }
            // Delete key for deleting selected component
            if (e.key === 'Delete' && selectedComponentId) {
                e.preventDefault();
                handleDelete();
            }
            // Ctrl/Cmd + D for duplicating component
            if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedComponentId) {
                e.preventDefault();
                handleDuplicate();
            }
            // Ctrl/Cmd + L for locking/unlocking component
            if ((e.ctrlKey || e.metaKey) && e.key === 'l' && selectedComponentId) {
                e.preventDefault();
                handleToggleLock();
            }
            // Ctrl/Cmd + Shift + Arrow Up to move component up
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'ArrowUp' && selectedComponentId) {
                e.preventDefault();
                handleMoveUp();
            }
            // Ctrl/Cmd + Shift + Arrow Down to move component down
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'ArrowDown' && selectedComponentId) {
                e.preventDefault();
                handleMoveDown();
            }
            // Ctrl/Cmd + P for preview mode
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                handleTogglePreview();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        handleUndo,
        handleRedo,
        handleDelete,
        handleDuplicate,
        handleToggleLock,
        handleMoveUp,
        handleMoveDown,
        handleTogglePreview,
        selectedComponentId
    ]);
    const handleComponentSelect = (componentType) => {
        // Use the ComponentFactory to create a new component
        const newComponent = component_factory_1.default.createComponent(componentType);
        const newComponents = [...components, newComponent];
        setComponents(newComponents);
        saveToHistory(newComponents, `Added new ${componentType} component`);
        setSelectedComponentId(newComponent.id);
        setSelectedComponentType(newComponent.type);
    };
    const handleBlockSelect = (block) => {
        // Use the ComponentFactory to create a new block component
        const newComponent = component_factory_1.default.createBlockComponent(block.id);
        const newComponents = [...components, newComponent];
        setComponents(newComponents);
        saveToHistory(newComponents, `Added block: ${block.name}`);
        setSelectedComponentId(newComponent.id);
        setSelectedComponentType('block');
        toast({
            title: "Block Added",
            description: `${block.name} has been added to the canvas`,
        });
    };
    const handleComponentUpdate = (id, props) => {
        const componentToUpdate = components.find(comp => comp.id === id);
        if (componentToUpdate?.locked) {
            toast({
                title: "Action Denied",
                description: "Cannot edit locked component",
                variant: "destructive",
            });
            return;
        }
        const newComponents = components.map(comp => comp.id === id ? { ...comp, props } : comp);
        setComponents(newComponents);
        // We don't save to history here to avoid too many history items for small changes
        // History will be saved when user performs explicit actions
    };
    const handleComponentDelete = (id) => {
        const componentToDelete = components.find(comp => comp.id === id);
        if (componentToDelete?.locked) {
            toast({
                title: "Action Denied",
                description: "Cannot delete locked component",
                variant: "destructive",
            });
            return;
        }
        const newComponents = components.filter(comp => comp.id !== id);
        setComponents(newComponents);
        saveToHistory(newComponents, `Deleted component: ${id}`);
        if (selectedComponentId === id) {
            setSelectedComponentId(null);
            setSelectedComponentType('');
        }
    };
    const handlePropertyChange = (props) => {
        if (selectedComponentId) {
            handleComponentUpdate(selectedComponentId, props);
        }
    };
    const getDefaultProps = (type) => {
        switch (type) {
            case 'text':
                return {
                    content: 'New text component',
                    variant: 'body',
                    align: 'left',
                };
            case 'button':
                return {
                    text: 'Click me',
                    variant: 'default',
                    size: 'default',
                };
            case 'image':
                return {
                    src: '/placeholder-image.jpg',
                    alt: 'Placeholder image',
                };
            case 'container':
                return {
                    padding: 'md',
                    background: 'none',
                };
            case 'card':
                return {
                    padding: 'md',
                    rounded: 'lg',
                };
            case 'grid':
                return {
                    columns: 3,
                    gap: 'md',
                };
            default:
                return {};
        }
    };
    const handleMediaSelect = (media) => {
        // Use the ComponentFactory to create a new image component
        const newComponent = component_factory_1.default.createImageComponent(media.url, media.altText || media.originalName, {
            caption: media.title || '',
        });
        const newComponents = [...components, newComponent];
        setComponents(newComponents);
        saveToHistory(newComponents, `Added image: ${media.title}`);
        setSelectedComponentId(newComponent.id);
        setSelectedComponentType('image');
        toast({
            title: "Media Added",
            description: "Image added to the canvas",
        });
    };
    const selectedComponent = components.find(comp => comp.id === selectedComponentId);
    const selectedComponentProps = selectedComponent ? selectedComponent.props : {};
    const isComponentLocked = selectedComponent?.locked || false;
    const selectedIndex = selectedComponentId ? components.findIndex(comp => comp.id === selectedComponentId) : -1;
    const canMoveUp = !!(selectedComponentId && selectedIndex > 0);
    const canMoveDown = !!(selectedComponentId && selectedIndex < components.length - 1 && selectedIndex !== -1);
    const [isMobileToolbarOpen, setIsMobileToolbarOpen] = (0, react_1.useState)(false);
    // Handle loading a template
    const handleLoadTemplate = (0, react_1.useCallback)((template) => {
        setComponents(template.components);
        setLayoutOptions(template.layoutOptions);
        saveToHistory(template.components, `Loaded template: ${template.name}`);
        toast({
            title: "Template Loaded",
            description: `${template.name} has been loaded successfully`,
        });
    }, [saveToHistory, toast]);
    return (<div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <card_1.Card className="m-4 rounded-lg shadow-sm">
        <card_1.CardHeader className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <h1 className="text-xl font-bold">Visual CMS Editor</h1>
              <div className="flex flex-col w-full md:w-auto">
                <input_1.Input type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} placeholder="Page Title" className="font-bold text-lg bg-transparent border-none focus:outline-none focus:ring-0 p-0 h-auto"/>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Slug:</span>
                  <input_1.Input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value)} placeholder="page-slug" className="bg-transparent border-none focus:outline-none focus:ring-0 p-0 h-auto text-sm"/>
                </div>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <button_1.Button variant="outline" size="sm" onClick={handleUndo} disabled={historyIndex === 0} className="flex items-center gap-2">
                <lucide_react_1.Undo2 className="h-4 w-4"/>
                Undo
              </button_1.Button>
              <button_1.Button variant="outline" size="sm" onClick={handleRedo} disabled={historyIndex === history.length - 1} className="flex items-center gap-2">
                <lucide_react_1.Redo2 className="h-4 w-4"/>
                Redo
              </button_1.Button>
              <button_1.Button variant="outline" size="sm" onClick={handleToggleLock} disabled={!selectedComponentId} className="flex items-center gap-2">
                {selectedComponent?.locked ? (<>
                    <lucide_react_1.Unlock className="h-4 w-4"/>
                    Unlock
                  </>) : (<>
                    <lucide_react_1.Lock className="h-4 w-4"/>
                    Lock
                  </>)}
              </button_1.Button>
              <button_1.Button variant="outline" size="sm" onClick={handleDuplicate} disabled={!selectedComponentId} className="flex items-center gap-2">
                <lucide_react_1.Copy className="h-4 w-4"/>
                Duplicate
              </button_1.Button>
              <button_1.Button variant="outline" size="sm" onClick={handleDelete} disabled={!selectedComponentId} className="flex items-center gap-2">
                <lucide_react_1.Trash2 className="h-4 w-4"/>
                Delete
              </button_1.Button>
              <button_1.Button variant="outline" size="sm" onClick={handleSavePage} className="flex items-center gap-2">
                <lucide_react_1.Save className="h-4 w-4"/>
                Save Draft
              </button_1.Button>
              <button_1.Button variant={isPreviewMode ? "default" : "outline"} size="sm" onClick={handleTogglePreview} className="flex items-center gap-2">
                <lucide_react_1.Eye className="h-4 w-4"/>
                {isPreviewMode ? "Exit Preview" : "Preview"}
              </button_1.Button>
              <button_1.Button variant="default" size="sm" className="flex items-center gap-2">
                <lucide_react_1.Upload className="h-4 w-4"/>
                Publish
              </button_1.Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button_1.Button variant="outline" size="sm" className="md:hidden flex items-center gap-2" onClick={() => setIsMobileToolbarOpen(!isMobileToolbarOpen)}>
              {isMobileToolbarOpen ? <lucide_react_1.X className="h-4 w-4"/> : <lucide_react_1.Menu className="h-4 w-4"/>}
              Actions
            </button_1.Button>
          </div>
          
          {/* Mobile Actions - Collapsible */}
          <framer_motion_1.AnimatePresence>
            {isMobileToolbarOpen && (<framer_motion_1.motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden mt-4 flex flex-wrap gap-2">
                <button_1.Button variant="outline" size="sm" onClick={handleUndo} disabled={historyIndex === 0} className="flex items-center gap-2">
                  <lucide_react_1.Undo2 className="h-4 w-4"/>
                  Undo
                </button_1.Button>
                <button_1.Button variant="outline" size="sm" onClick={handleRedo} disabled={historyIndex === history.length - 1} className="flex items-center gap-2">
                  <lucide_react_1.Redo2 className="h-4 w-4"/>
                  Redo
                </button_1.Button>
                <button_1.Button variant="outline" size="sm" onClick={handleToggleLock} disabled={!selectedComponentId} className="flex items-center gap-2">
                  {selectedComponent?.locked ? (<>
                      <lucide_react_1.Unlock className="h-4 w-4"/>
                      Unlock
                    </>) : (<>
                      <lucide_react_1.Lock className="h-4 w-4"/>
                      Lock
                    </>)}
                </button_1.Button>
                <button_1.Button variant="outline" size="sm" onClick={handleDuplicate} disabled={!selectedComponentId} className="flex items-center gap-2">
                  <lucide_react_1.Copy className="h-4 w-4"/>
                  Duplicate
                </button_1.Button>
                <button_1.Button variant="outline" size="sm" onClick={handleDelete} disabled={!selectedComponentId} className="flex items-center gap-2">
                  <lucide_react_1.Trash2 className="h-4 w-4"/>
                  Delete
                </button_1.Button>
                <button_1.Button variant="outline" size="sm" onClick={handleSavePage} className="flex items-center gap-2">
                  <lucide_react_1.Save className="h-4 w-4"/>
                  Save
                </button_1.Button>
                <button_1.Button variant={isPreviewMode ? "default" : "outline"} size="sm" onClick={handleTogglePreview} className="flex items-center gap-2">
                  <lucide_react_1.Eye className="h-4 w-4"/>
                  {isPreviewMode ? "Exit" : "Preview"}
                </button_1.Button>
                <button_1.Button variant="default" size="sm" className="flex items-center gap-2">
                  <lucide_react_1.Upload className="h-4 w-4"/>
                  Publish
                </button_1.Button>
              </framer_motion_1.motion.div>)}
          </framer_motion_1.AnimatePresence>
        </card_1.CardHeader>
      </card_1.Card>

      {/* Layout Options and Template Manager Cards - Three Column Layout */}
      <div className="m-4 mt-0 flex flex-col md:flex-row gap-4">
        {/* Layout Options Card */}
        <card_1.Card className="flex-1 rounded-lg shadow-sm">
          <card_1.CardContent className="p-4">
            <layout_component_1.LayoutComponent showHeader={layoutOptions.showHeader} showFooter={layoutOptions.showFooter} fullWidth={layoutOptions.fullWidth} backgroundColor={layoutOptions.backgroundColor} showTitle={layoutOptions.showTitle} onLayoutChange={handleLayoutOptionsChange}/>
          </card_1.CardContent>
        </card_1.Card>

        {/* Category and Menu Management Card */}
        <card_1.Card className="flex-1 rounded-lg shadow-sm">
          <card_1.CardHeader className="pb-3">
            <card_1.CardTitle className="text-sm font-medium">Category & Menu</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="p-4 pt-0 space-y-4">
            {/* Category Selection */}
            <div className="space-y-2">
              <label_1.Label htmlFor="category-select" className="text-xs">Category</label_1.Label>
              <select_1.Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                <select_1.SelectTrigger id="category-select" className="w-full">
                  <select_1.SelectValue placeholder="Select category"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="">No Category</select_1.SelectItem>
                  {categories.map((category) => (<select_1.SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </select_1.SelectItem>))}
                </select_1.SelectContent>
              </select_1.Select>
            </div>

            {/* Menu Assignment */}
            <div className="space-y-2">
              <label_1.Label htmlFor="menu-select" className="text-xs">Assign to Menu</label_1.Label>
              <select_1.Select value={selectedMenuIds[0] || ''} onValueChange={(value) => {
            if (value) {
                setSelectedMenuIds([value]);
            }
            else {
                setSelectedMenuIds([]);
            }
        }}>
                <select_1.SelectTrigger id="menu-select" className="w-full">
                  <select_1.SelectValue placeholder="Select menu"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="">No Menu</select_1.SelectItem>
                  {menus.map((menu) => (<select_1.SelectItem key={menu.id} value={menu.id}>
                      {menu.name}
                    </select_1.SelectItem>))}
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        {/* Template Manager Card */}
        <card_1.Card className="flex-1 rounded-lg shadow-sm">
          <card_1.CardContent className="p-4">
            <template_manager_1.TemplateManager onSaveTemplate={(template) => {
            // In a real implementation, you would save to a database
            console.log('Save template:', template);
        }} onLoadTemplate={handleLoadTemplate} currentComponents={components} currentLayoutOptions={layoutOptions}/>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 mx-4 mb-4 overflow-hidden">
        {/* Left Panel - Component Library, History, and Media */}
        <framer_motion_1.AnimatePresence>
          {isLeftPanelOpen && (<framer_motion_1.motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full md:w-[600px] flex-shrink-0 flex flex-col gap-4">
              <card_1.Card className="flex-shrink-0">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Components & Blocks</h3>
                  <button_1.Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsLeftPanelOpen(false)}>
                    <lucide_react_1.X className="h-4 w-4"/>
                  </button_1.Button>
                </div>
                <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <tabs_1.TabsList className="grid w-full grid-cols-3">
                    <tabs_1.TabsTrigger value="components">Components</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="history">History</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="debug">Debug</tabs_1.TabsTrigger>
                  </tabs_1.TabsList>
                  <tabs_1.TabsContent value="components" className="mt-0 h-[calc(100vh-200px)] overflow-hidden">
                    <component_library_1.ComponentLibrary onComponentSelect={handleComponentSelect} onBlockSelect={handleBlockSelect} displayMode="blocks" // Show only prebuilt blocks in the Components tab
        />
                  </tabs_1.TabsContent>
                  <tabs_1.TabsContent value="media" className="mt-0 h-[calc(100vh-200px)] overflow-hidden">
                    <media_library_1.MediaLibrary onMediaSelect={handleMediaSelect}/>
                  </tabs_1.TabsContent>
                  <tabs_1.TabsContent value="blocks" className="mt-0 h-[calc(100vh-200px)] overflow-hidden">
                    <component_library_1.ComponentLibrary onComponentSelect={handleComponentSelect} onBlockSelect={handleBlockSelect} displayMode="blocks" // Show only prebuilt blocks in the Blocks tab as well
        />
                  </tabs_1.TabsContent>
                  <tabs_1.TabsContent value="history" className="mt-0 h-[calc(100vh-200px)] overflow-hidden">
                    <history_panel_1.HistoryPanel history={history} currentIndex={historyIndex} onHistorySelect={handleHistorySelect}/>
                  </tabs_1.TabsContent>
                  <tabs_1.TabsContent value="debug" className="mt-0 h-[calc(100vh-200px)] overflow-hidden">
                    <debug_panel_1.DebugPanel pageData={{
                id: pageId,
                title: pageTitle,
                slug: pageSlug,
                description: pageDescription,
            }} components={components} layoutOptions={layoutOptions}/>
                  </tabs_1.TabsContent>
                </tabs_1.Tabs>

              </card_1.Card>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>

        {/* Editor Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Editor Canvas</h2>
            <div className="flex gap-2">
              {!isLeftPanelOpen && (<button_1.Button variant="outline" size="sm" onClick={() => setIsLeftPanelOpen(true)} className="md:hidden">
                  <lucide_react_1.Menu className="h-4 w-4"/>
                </button_1.Button>)}
              {!isRightPanelOpen && (<button_1.Button variant="outline" size="sm" onClick={() => setIsRightPanelOpen(true)} className="md:hidden">
                  <lucide_react_1.Menu className="h-4 w-4"/>
                </button_1.Button>)}
            </div>
          </div>
          <card_1.Card className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto">
              {/* Wrap EditorCanvas with EditorProvider */}
              <editor_context_1.EditorProvider onComponentUpdate={handleComponentUpdate}>
                <editor_canvas_1.EditorCanvas components={components} onComponentUpdate={handleComponentUpdate} onComponentDelete={handleComponentDelete} onComponentSelect={(id, type) => {
            setSelectedComponentId(id);
            if (type) {
                setSelectedComponentType(type);
            }
        }} selectedComponentId={selectedComponentId} onMoveUp={handleMoveUp} onMoveDown={handleMoveDown}/>
              </editor_context_1.EditorProvider>
            </div>
          </card_1.Card>
        </div>

        {/* Properties Panel */}
        <framer_motion_1.AnimatePresence>
          {isRightPanelOpen && (<framer_motion_1.motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
              <card_1.Card className="flex-shrink-0 h-full flex flex-col">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Properties</h3>
                  <button_1.Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsRightPanelOpen(false)}>
                    <lucide_react_1.X className="h-4 w-4"/>
                  </button_1.Button>
                </div>
                <div className="flex-1 overflow-auto">
                  <properties_panel_1.PropertiesPanel componentType={selectedComponentType} componentProps={selectedComponentProps} onPropsChange={handlePropertyChange} isLocked={isComponentLocked} onMoveUp={canMoveUp ? handleMoveUp : undefined} onMoveDown={canMoveDown ? handleMoveDown : undefined} canMoveUp={canMoveUp} canMoveDown={canMoveDown} 
        // Pass layout options and change handler when no component is selected
        layoutOptions={!selectedComponentId ? layoutOptions : undefined} onLayoutOptionsChange={!selectedComponentId ? handleLayoutOptionsChange : undefined}/>
                </div>
              </card_1.Card>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
      </div>
    </div>);
};
exports.VisualEditor = VisualEditor;
exports.default = exports.VisualEditor;
//# sourceMappingURL=visual-editor.js.map