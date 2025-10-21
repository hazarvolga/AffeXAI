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
const use_toast_1 = require("@/hooks/use-toast");
const media_library_1 = require("./media-library");
const cms_service_1 = require("@/lib/cms/cms-service");
const VisualEditor = ({ pageId }) => {
    const { toast } = (0, use_toast_1.useToast)();
    const [components, setComponents] = (0, react_1.useState)([]);
    const [selectedComponentId, setSelectedComponentId] = (0, react_1.useState)(null);
    const [selectedComponentType, setSelectedComponentType] = (0, react_1.useState)('');
    const [history, setHistory] = (0, react_1.useState)([{ components: [], timestamp: Date.now() }]);
    const [historyIndex, setHistoryIndex] = (0, react_1.useState)(0);
    const [pageTitle, setPageTitle] = (0, react_1.useState)('');
    const [pageSlug, setPageSlug] = (0, react_1.useState)('');
    const [pageDescription, setPageDescription] = (0, react_1.useState)('');
    // Load page data if pageId is provided
    (0, react_1.useEffect)(() => {
        if (pageId) {
            const loadPageData = async () => {
                try {
                    const page = await cms_service_1.cmsService.getPage(pageId);
                    setPageTitle(page.title);
                    setPageSlug(page.slug);
                    setPageDescription(page.description || '');
                    // Load components if they exist
                    if (page.components) {
                        setComponents(page.components);
                        setHistory([{ components: page.components, timestamp: Date.now() }]);
                        setHistoryIndex(0);
                    }
                }
                catch (error) {
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
    // Save state to history
    const saveToHistory = (0, react_1.useCallback)((newComponents) => {
        const newHistory = [...history.slice(0, historyIndex + 1), { components: newComponents, timestamp: Date.now() }];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);
    // Undo functionality
    const handleUndo = (0, react_1.useCallback)(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const prevState = history[newIndex];
            setComponents(prevState.components);
            // Clear selection if component no longer exists
            if (selectedComponentId && !prevState.components.find(c => c.id === selectedComponentId)) {
                setSelectedComponentId(null);
                setSelectedComponentType('');
            }
        }
    }, [history, historyIndex, selectedComponentId]);
    // Redo functionality
    const handleRedo = (0, react_1.useCallback)(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            const nextState = history[newIndex];
            setComponents(nextState.components);
            // Clear selection if component no longer exists
            if (selectedComponentId && !nextState.components.find(c => c.id === selectedComponentId)) {
                setSelectedComponentId(null);
                setSelectedComponentType('');
            }
        }
    }, [history, historyIndex, selectedComponentId]);
    // Jump to specific history item
    const handleHistorySelect = (0, react_1.useCallback)((index) => {
        if (index >= 0 && index < history.length) {
            setHistoryIndex(index);
            const state = history[index];
            setComponents(state.components);
            // Clear selection if component no longer exists
            if (selectedComponentId && !state.components.find(c => c.id === selectedComponentId)) {
                setSelectedComponentId(null);
                setSelectedComponentType('');
            }
        }
    }, [history, selectedComponentId]);
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
            saveToHistory(newComponents);
            setSelectedComponentId(null);
            setSelectedComponentType('');
        }
    }, [components, selectedComponentId, saveToHistory, toast]);
    // Toggle component lock
    const handleToggleLock = (0, react_1.useCallback)(() => {
        if (selectedComponentId) {
            const newComponents = components.map(comp => comp.id === selectedComponentId ? { ...comp, locked: !comp.locked } : comp);
            setComponents(newComponents);
            saveToHistory(newComponents);
            const isLocked = components.find(c => c.id === selectedComponentId)?.locked;
            toast({
                title: "Component Updated",
                description: `Component ${isLocked ? 'unlocked' : 'locked'}`,
            });
        }
    }, [components, selectedComponentId, saveToHistory, toast]);
    // Save page
    const handleSavePage = (0, react_1.useCallback)(async () => {
        if (!pageId)
            return;
        try {
            // Update page metadata
            await cms_service_1.cmsService.updatePage(pageId, {
                title: pageTitle,
                slug: pageSlug,
                description: pageDescription,
            });
            // TODO: Save components to the backend
            // This would require implementing component saving in the CMS service
            toast({
                title: "Success",
                description: "Page saved successfully",
            });
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to save page",
                variant: "destructive",
            });
        }
    }, [pageId, pageTitle, pageSlug, pageDescription, toast]);
    // Keyboard shortcuts
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (e) => {
            // Only handle shortcuts when not in an input field
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            // Ctrl/Cmd + Z for undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                handleUndo();
                toast({
                    title: "Action Performed",
                    description: "Undo action performed",
                });
            }
            // Ctrl/Cmd + Shift + Z for redo
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') {
                e.preventDefault();
                handleRedo();
                toast({
                    title: "Action Performed",
                    description: "Redo action performed",
                });
            }
            // Delete key for deleting selected component
            if (e.key === 'Delete' && selectedComponentId) {
                e.preventDefault();
                handleDelete();
                toast({
                    title: "Component Deleted",
                    description: "Component has been deleted",
                });
            }
            // Ctrl/Cmd + D for duplicating component
            if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedComponentId) {
                e.preventDefault();
                const componentToDuplicate = components.find(comp => comp.id === selectedComponentId);
                if (componentToDuplicate) {
                    const newComponent = {
                        ...componentToDuplicate,
                        id: `comp-${Date.now()}`,
                        props: {
                            ...componentToDuplicate.props,
                            // Add "copy" to text content to indicate duplication
                            content: componentToDuplicate.props.content ? `${componentToDuplicate.props.content} (copy)` : undefined
                        }
                    };
                    const newComponents = [...components, newComponent];
                    setComponents(newComponents);
                    saveToHistory(newComponents);
                    toast({
                        title: "Component Duplicated",
                        description: "Component has been duplicated",
                    });
                }
            }
            // Ctrl/Cmd + L for locking/unlocking component
            if ((e.ctrlKey || e.metaKey) && e.key === 'l' && selectedComponentId) {
                e.preventDefault();
                handleToggleLock();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleUndo, handleRedo, handleDelete, handleToggleLock, selectedComponentId, components, saveToHistory, toast]);
    const handleComponentSelect = (componentType) => {
        const newComponent = {
            id: `comp-${Date.now()}`,
            type: componentType,
            props: getDefaultProps(componentType),
        };
        const newComponents = [...components, newComponent];
        setComponents(newComponents);
        saveToHistory(newComponents);
        setSelectedComponentId(newComponent.id);
        setSelectedComponentType(componentType);
    };
    const handleBlockSelect = (block) => {
        // Create a block component
        const newComponent = {
            id: `block-${Date.now()}`,
            type: 'block',
            props: {
                blockId: block.id,
                className: 'w-full',
            },
        };
        const newComponents = [...components, newComponent];
        setComponents(newComponents);
        saveToHistory(newComponents);
        setSelectedComponentId(newComponent.id);
        setSelectedComponentType('block');
        toast({
            title: "Block Added",
            description: `${block.name} has been added to the canvas`,
        });
    };
    const handleComponentUpdate = (id, props) => {
        // Check if component is locked
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
        saveToHistory(newComponents);
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
        saveToHistory(newComponents);
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
        // Create an image component when media is selected
        if (media.type === 'image') {
            const newComponent = {
                id: `comp-${Date.now()}`,
                type: 'image',
                props: {
                    src: media.url,
                    alt: media.altText || media.originalName,
                    caption: media.title || '',
                },
            };
            const newComponents = [...components, newComponent];
            setComponents(newComponents);
            saveToHistory(newComponents);
            setSelectedComponentId(newComponent.id);
            setSelectedComponentType('image');
            toast({
                title: "Media Added",
                description: "Image added to the canvas",
            });
        }
    };
    const selectedComponent = components.find(comp => comp.id === selectedComponentId);
    const selectedComponentProps = selectedComponent ? selectedComponent.props : {};
    const isComponentLocked = selectedComponent?.locked || false;
    return (<div className="h-screen flex flex-col">
      <card_1.Card className="m-4">
        <card_1.CardHeader>
          <card_1.CardTitle>Visual CMS Editor</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <input type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} placeholder="Page Title" className="font-bold text-lg bg-transparent border-none focus:outline-none focus:ring-0 p-0"/>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Slug:</span>
                  <input type="text" value={pageSlug} onChange={(e) => setPageSlug(e.target.value)} placeholder="page-slug" className="bg-transparent border-none focus:outline-none focus:ring-0 p-0"/>
                </div>
              </div>
            </div>
            <div className="space-x-2">
              <button_1.Button variant="outline" onClick={handleUndo} disabled={historyIndex === 0}>
                Undo (Ctrl+Z)
              </button_1.Button>
              <button_1.Button variant="outline" onClick={handleRedo} disabled={historyIndex === history.length - 1}>
                Redo (Ctrl+Shift+Z)
              </button_1.Button>
              <button_1.Button variant="outline" onClick={handleToggleLock} disabled={!selectedComponentId}>
                {selectedComponent?.locked ? 'Unlock' : 'Lock'} (Ctrl+L)
              </button_1.Button>
              <button_1.Button variant="outline" onClick={handleSavePage}>Save Draft</button_1.Button>
              <button_1.Button>Preview</button_1.Button>
              <button_1.Button variant="default">Publish</button_1.Button>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      <div className="flex-1 flex gap-4 mx-4 mb-4">
        {/* Left Panel - Component Library, History, and Media */}
        <div className="w-1/4 flex flex-col gap-4">
          <tabs_1.Tabs defaultValue="components" className="w-full">
            <tabs_1.TabsList className="grid w-full grid-cols-3">
              <tabs_1.TabsTrigger value="components">Components</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value="media">Media</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value="history">History</tabs_1.TabsTrigger>
            </tabs_1.TabsList>
            <tabs_1.TabsContent value="components" className="mt-0">
              <component_library_1.ComponentLibrary onComponentSelect={handleComponentSelect} onBlockSelect={handleBlockSelect}/>
            </tabs_1.TabsContent>
            <tabs_1.TabsContent value="media" className="mt-0">
              <media_library_1.MediaLibrary onMediaSelect={handleMediaSelect}/>
            </tabs_1.TabsContent>
            <tabs_1.TabsContent value="history" className="mt-0">
              <history_panel_1.HistoryPanel history={history} currentIndex={historyIndex} onHistorySelect={handleHistorySelect}/>
            </tabs_1.TabsContent>
          </tabs_1.Tabs>
        </div>

        {/* Editor Canvas */}
        <div className="w-1/2">
          <editor_canvas_1.EditorCanvas components={components} onComponentUpdate={handleComponentUpdate} onComponentDelete={handleComponentDelete} onComponentSelect={(id, type) => {
            setSelectedComponentId(id);
            if (type) {
                setSelectedComponentType(type);
            }
        }} selectedComponentId={selectedComponentId}/>
        </div>

        {/* Properties Panel */}
        <div className="w-1/4">
          <properties_panel_1.PropertiesPanel componentType={selectedComponentType} componentProps={selectedComponentProps} onPropsChange={handlePropertyChange} isLocked={isComponentLocked}/>
        </div>
      </div>
    </div>);
};
exports.VisualEditor = VisualEditor;
exports.default = exports.VisualEditor;
//# sourceMappingURL=visual-editor.backup.js.map