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
const dynamic_1 = __importDefault(require("next/dynamic"));
const components_library_1 = require("./components-library");
const editor_canvas_1 = require("./editor-canvas");
const properties_panel_1 = require("./properties-panel");
const history_panel_1 = require("./history-panel");
const component_tree_1 = require("./component-tree");
const seo_panel_1 = require("./seo-panel");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const tabs_1 = require("@/components/ui/tabs");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const use_toast_1 = require("@/hooks/use-toast");
const cms_service_1 = require("@/lib/cms/cms-service");
const templateService_1 = require("@/lib/api/templateService");
const skeleton_1 = require("@/components/loading/skeleton");
const lucide_react_1 = require("lucide-react");
const framer_motion_1 = require("framer-motion");
// Lazy load MediaLibrary - only loaded when media tab is selected
const MediaLibrary = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./media-library'))).then(mod => ({ default: mod.MediaLibrary })), {
    loading: () => <skeleton_1.Skeleton className="h-full w-full"/>,
    ssr: false,
});
const VisualEditor = ({ pageId, templateId }) => {
    const { toast } = (0, use_toast_1.useToast)();
    const [components, setComponents] = (0, react_1.useState)([]);
    const [selectedComponentId, setSelectedComponentId] = (0, react_1.useState)(null);
    const [selectedComponentType, setSelectedComponentType] = (0, react_1.useState)('');
    const [history, setHistory] = (0, react_1.useState)([{ components: [], timestamp: Date.now() }]);
    const [historyIndex, setHistoryIndex] = (0, react_1.useState)(0);
    const [pageTitle, setPageTitle] = (0, react_1.useState)('');
    const [pageSlug, setPageSlug] = (0, react_1.useState)('');
    const [pageDescription, setPageDescription] = (0, react_1.useState)('');
    const [isLeftPanelOpen, setIsLeftPanelOpen] = (0, react_1.useState)(true);
    const [isRightPanelOpen, setIsRightPanelOpen] = (0, react_1.useState)(true);
    const [activeTab, setActiveTab] = (0, react_1.useState)('templates');
    const [isSEOExpanded, setIsSEOExpanded] = (0, react_1.useState)(false);
    // Component Tree Sidebar states
    const [isTreeSidebarOpen, setIsTreeSidebarOpen] = (0, react_1.useState)(false);
    const [treeSidebarWidth, setTreeSidebarWidth] = (0, react_1.useState)(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('treeSidebarWidth');
            return saved ? parseInt(saved) : 400;
        }
        return 400;
    });
    const [isTreePinned, setIsTreePinned] = (0, react_1.useState)(false);
    const [isResizing, setIsResizing] = (0, react_1.useState)(false);
    const [isDocked, setIsDocked] = (0, react_1.useState)(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('treeSidebarDocked');
            return saved ? saved === 'true' : true;
        }
        return true;
    });
    const [floatingPosition, setFloatingPosition] = (0, react_1.useState)(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('treeSidebarPosition');
            if (saved) {
                return JSON.parse(saved);
            }
        }
        return { x: 100, y: 100 };
    });
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [dragOffset, setDragOffset] = (0, react_1.useState)({ x: 0, y: 0 });
    // Preview mode states
    const [previewMode, setPreviewMode] = (0, react_1.useState)('desktop');
    const [isPreviewMode, setIsPreviewMode] = (0, react_1.useState)(false);
    // Layout options state
    const [showHeader, setShowHeader] = (0, react_1.useState)(true);
    const [showFooter, setShowFooter] = (0, react_1.useState)(true);
    const [isFullWidth, setIsFullWidth] = (0, react_1.useState)(false);
    // Category & Menu state
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [menus, setMenus] = (0, react_1.useState)([]);
    const [selectedCategoryId, setSelectedCategoryId] = (0, react_1.useState)('');
    const [selectedMenuIds, setSelectedMenuIds] = (0, react_1.useState)([]);
    const [selectedParentItemId, setSelectedParentItemId] = (0, react_1.useState)('');
    const [selectedPosition, setSelectedPosition] = (0, react_1.useState)('last');
    const [selectedAfterItemId, setSelectedAfterItemId] = (0, react_1.useState)('');
    // SEO data state
    const [seoData, setSeoData] = (0, react_1.useState)({
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        canonicalUrl: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        ogType: 'website',
        ogUrl: '',
        twitterCard: 'summary_large_image',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        twitterCreator: '',
        robotsIndex: true,
        robotsFollow: true,
        structuredData: '',
    });
    // Save state to history
    const saveToHistory = (0, react_1.useCallback)((newComponents) => {
        const newHistory = [...history.slice(0, historyIndex + 1), { components: newComponents, timestamp: Date.now() }];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);
    // Move component up in the list
    const handleMoveUp = (0, react_1.useCallback)(() => {
        if (!selectedComponentId)
            return;
        const selectedIndex = components.findIndex(comp => comp.id === selectedComponentId);
        if (selectedIndex <= 0)
            return; // Already at the top or not found
        const newComponents = [...components];
        // Swap with the previous component
        [newComponents[selectedIndex], newComponents[selectedIndex - 1]] =
            [newComponents[selectedIndex - 1], newComponents[selectedIndex]];
        setComponents(newComponents);
        saveToHistory(newComponents);
    }, [components, selectedComponentId, saveToHistory]);
    // Move component down in the list
    const handleMoveDown = (0, react_1.useCallback)(() => {
        if (!selectedComponentId)
            return;
        const selectedIndex = components.findIndex(comp => comp.id === selectedComponentId);
        if (selectedIndex === -1 || selectedIndex >= components.length - 1)
            return; // Already at the bottom or not found
        const newComponents = [...components];
        // Swap with the next component
        [newComponents[selectedIndex], newComponents[selectedIndex + 1]] =
            [newComponents[selectedIndex + 1], newComponents[selectedIndex]];
        setComponents(newComponents);
        saveToHistory(newComponents);
    }, [components, selectedComponentId, saveToHistory]);
    // Helper: Build hierarchical menu tree structure
    const buildMenuTree = (0, react_1.useCallback)((items) => {
        const itemMap = new Map();
        const rootItems = [];
        // First pass: create map of all items
        items.forEach(item => {
            itemMap.set(item.id, { ...item, children: [] });
        });
        // Second pass: build tree structure
        items.forEach(item => {
            const node = itemMap.get(item.id);
            if (item.parentId) {
                const parent = itemMap.get(item.parentId);
                if (parent) {
                    parent.children = parent.children || [];
                    parent.children.push(node);
                }
                else {
                    rootItems.push(node);
                }
            }
            else {
                rootItems.push(node);
            }
        });
        // Sort by orderIndex at each level
        const sortByOrder = (items) => {
            items.sort((a, b) => a.orderIndex - b.orderIndex);
            items.forEach(item => {
                if (item.children && item.children.length > 0) {
                    sortByOrder(item.children);
                }
            });
        };
        sortByOrder(rootItems);
        return rootItems;
    }, []);
    // Helper: Get current menu items
    const getCurrentMenuItems = (0, react_1.useCallback)(() => {
        if (!selectedMenuIds[0])
            return [];
        const menu = menus.find(m => m.id === selectedMenuIds[0]);
        return menu?.items || [];
    }, [selectedMenuIds, menus]);
    // Helper: Calculate order index for new item
    const calculateOrderIndex = (0, react_1.useCallback)((menuItems, parentId, position, afterItemId) => {
        const siblings = menuItems.filter(item => (parentId ? item.parentId === parentId : !item.parentId));
        if (siblings.length === 0)
            return 0;
        if (position === 'first') {
            const minOrder = Math.min(...siblings.map(s => s.orderIndex));
            return Math.max(0, minOrder - 1);
        }
        if (position === 'last') {
            const maxOrder = Math.max(...siblings.map(s => s.orderIndex));
            return maxOrder + 1;
        }
        // position === 'after'
        if (afterItemId) {
            const afterItem = siblings.find(s => s.id === afterItemId);
            if (afterItem) {
                return afterItem.orderIndex + 0.5; // Insert between items
            }
        }
        return siblings.length;
    }, []);
    // Load page data if pageId is provided
    (0, react_1.useEffect)(() => {
        if (pageId) {
            const loadPageData = async () => {
                try {
                    const page = await cms_service_1.cmsService.getPage(pageId);
                    setPageTitle(page.title);
                    setPageSlug(page.slug);
                    setPageDescription(page.description || '');
                    // Load layout options
                    if (page.layoutOptions) {
                        setShowHeader(page.layoutOptions.showHeader !== false); // default true
                        setShowFooter(page.layoutOptions.showFooter !== false); // default true
                    }
                    // Load category if exists
                    if (page.categoryId) {
                        setSelectedCategoryId(page.categoryId);
                    }
                    // Load components from page response if they exist, otherwise load separately
                    if (page.components && page.components.length > 0) {
                        console.log('Loaded components from page response:', page.components);
                        // Transform components: if type is 'block', restore blockId from props as type
                        const transformedComponents = page.components.map((comp) => ({
                            ...comp,
                            type: comp.type === 'block' && comp.props?.blockId ? comp.props.blockId : comp.type,
                        }));
                        setComponents(transformedComponents);
                        setHistory([{ components: transformedComponents, timestamp: Date.now() }]);
                        setHistoryIndex(0);
                    }
                    else {
                        // Load components separately since they might not be included in page response
                        try {
                            const pageComponents = await cms_service_1.cmsService.getComponents(pageId);
                            console.log('Loaded components separately:', pageComponents);
                            // Transform components: if type is 'block', restore blockId from props as type
                            const transformedComponents = pageComponents.map((comp) => ({
                                ...comp,
                                type: comp.type === 'block' && comp.props?.blockId ? comp.props.blockId : comp.type,
                            }));
                            console.log('Transformed components:', transformedComponents);
                            setComponents(transformedComponents);
                            setHistory([{ components: transformedComponents, timestamp: Date.now() }]);
                            setHistoryIndex(0);
                        }
                        catch (componentError) {
                            console.error('Failed to load components:', componentError);
                            // Initialize with empty components if loading fails
                            setComponents([]);
                            setHistory([{ components: [], timestamp: Date.now() }]);
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
    // Load template if templateId is provided
    (0, react_1.useEffect)(() => {
        if (templateId && !pageId) {
            const loadTemplate = async () => {
                try {
                    const template = await templateService_1.templateService.getById(templateId);
                    // Transform template blocks to editor components
                    const editorComponents = template.blocks
                        .sort((a, b) => a.order - b.order)
                        .map((block, index) => ({
                        id: `${block.id}-${Date.now()}-${index}`,
                        type: block.type,
                        props: block.config || {},
                        orderIndex: index,
                        parentId: null,
                        children: []
                    }));
                    // Set components in editor
                    setComponents(editorComponents);
                    // Initialize history with template
                    setHistory([{ components: editorComponents, timestamp: Date.now() }]);
                    setHistoryIndex(0);
                    // Set page title from template name
                    setPageTitle(template.name);
                    const slug = template.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    setPageSlug(slug);
                    setPageDescription(template.description);
                    toast({
                        title: 'Template Yüklendi',
                        description: `"${template.name}" şablonu editöre yüklendi. Artık düzenleyebilirsiniz.`,
                    });
                }
                catch (error) {
                    console.error('Error loading template:', error);
                    toast({
                        variant: 'destructive',
                        title: 'Hata',
                        description: 'Template yüklenirken bir hata oluştu.',
                    });
                }
            };
            loadTemplate();
        }
    }, [templateId, pageId, toast]);
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
    // Handle Tree Sidebar Resize
    const handleResizeStart = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!isResizing)
            return;
        const handleMouseMove = (e) => {
            if (isDocked) {
                const newWidth = window.innerWidth - e.clientX;
                const clampedWidth = Math.max(300, Math.min(600, newWidth));
                setTreeSidebarWidth(clampedWidth);
                localStorage.setItem('treeSidebarWidth', clampedWidth.toString());
            }
            else {
                // Floating mode - resize from drag point
                const newWidth = Math.max(300, Math.min(600, e.clientX - floatingPosition.x));
                setTreeSidebarWidth(newWidth);
                localStorage.setItem('treeSidebarWidth', newWidth.toString());
            }
        };
        const handleMouseUp = () => {
            setIsResizing(false);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, isDocked, floatingPosition.x]);
    // Handle Floating Mode Drag
    const handleDragStart = (0, react_1.useCallback)((e) => {
        if (isDocked)
            return;
        e.preventDefault();
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - floatingPosition.x,
            y: e.clientY - floatingPosition.y,
        });
    }, [isDocked, floatingPosition]);
    (0, react_1.useEffect)(() => {
        if (!isDragging)
            return;
        const handleMouseMove = (e) => {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            // Keep within viewport bounds
            const maxX = window.innerWidth - treeSidebarWidth;
            const maxY = window.innerHeight - 200; // Minimum 200px visible
            const clampedPosition = {
                x: Math.max(0, Math.min(maxX, newX)),
                y: Math.max(0, Math.min(maxY, newY)),
            };
            setFloatingPosition(clampedPosition);
            localStorage.setItem('treeSidebarPosition', JSON.stringify(clampedPosition));
        };
        const handleMouseUp = () => {
            setIsDragging(false);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, treeSidebarWidth]);
    // Toggle Dock/Float mode
    const handleToggleDock = (0, react_1.useCallback)(() => {
        setIsDocked(!isDocked);
        localStorage.setItem('treeSidebarDocked', (!isDocked).toString());
    }, [isDocked]);
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
    // Toggle preview mode (hide panels and edit controls)
    const handleTogglePreview = (0, react_1.useCallback)(() => {
        const newPreviewMode = !isPreviewMode;
        setIsPreviewMode(newPreviewMode);
        if (newPreviewMode) {
            // Entering preview mode - hide panels and clear selection
            setIsLeftPanelOpen(false);
            setIsRightPanelOpen(false);
            setSelectedComponentId(null);
            toast({
                title: "Preview Mode",
                description: "Panels hidden. Click again to exit preview mode.",
            });
        }
        else {
            // Exiting preview mode - restore panels
            setIsLeftPanelOpen(true);
            setIsRightPanelOpen(true);
            toast({
                title: "Edit Mode",
                description: "Panels restored. You can now edit components.",
            });
        }
    }, [isPreviewMode, toast]);
    // Open published page in new tab
    const handleViewLive = (0, react_1.useCallback)(() => {
        if (!pageSlug) {
            toast({
                title: "Page Not Saved",
                description: "Please save the page first to view it live.",
                variant: "destructive",
            });
            return;
        }
        // Open the published page URL
        const liveUrl = `/pages/${pageSlug}`;
        window.open(liveUrl, '_blank');
        toast({
            title: "Opening Live Page",
            description: "Published page opened in new tab",
        });
    }, [pageSlug, toast]);
    // Open preview in new tab
    const handleOpenPreview = (0, react_1.useCallback)(() => {
        // Save components to sessionStorage for preview page
        sessionStorage.setItem('previewComponents', JSON.stringify(components));
        // Build preview URL with layout options
        const previewUrl = `/cms/preview?showHeader=${showHeader}&showFooter=${showFooter}`;
        // Open in new tab
        window.open(previewUrl, '_blank');
        toast({
            title: "Preview Opened",
            description: "Preview opened in new tab",
        });
    }, [components, showHeader, showFooter, toast]);
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
            // First, verify that the page exists
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
                return;
            }
            // Update page metadata with layout options and category
            await cms_service_1.cmsService.updatePage(pageId, {
                title: pageTitle,
                slug: pageSlug,
                description: pageDescription,
                layoutOptions: {
                    showHeader,
                    showFooter,
                },
                categoryId: selectedCategoryId || undefined,
            });
            // Save components to the backend
            // First, get existing components for this page
            const existingComponents = await cms_service_1.cmsService.getComponents(pageId);
            console.log('Existing components:', existingComponents);
            // Delete components that no longer exist
            const componentIds = components.map(c => c.id);
            const componentsToDelete = existingComponents.filter(c => !componentIds.includes(c.id));
            console.log('Components to delete:', componentsToDelete);
            await Promise.all(componentsToDelete.map(c => cms_service_1.cmsService.deleteComponent(c.id)));
            // Log components we're about to save
            console.log('Components to save:', components);
            // Track successfully saved components
            const savedComponents = [];
            // Create or update components
            await Promise.all(components.map(async (component) => {
                const existingComponent = existingComponents.find(c => c.id === component.id);
                // For prebuild blocks, use type 'block' and store block ID in props
                const isPrebuildBlock = !['text', 'button', 'image', 'container', 'card', 'grid'].includes(component.type);
                const componentData = {
                    pageId,
                    parentId: null,
                    type: isPrebuildBlock ? 'block' : component.type,
                    props: isPrebuildBlock
                        ? { ...component.props, blockId: component.type } // Store original block ID in props
                        : component.props,
                    orderIndex: component.orderIndex || 0,
                };
                // Log the component data for debugging
                console.log('Saving component:', {
                    originalType: component.type,
                    isPrebuildBlock,
                    componentData
                });
                if (existingComponent) {
                    // Update existing component
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
                    // Create new component
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
            // Handle hierarchical menu assignment with advanced placement
            if (selectedMenuIds.length > 0 && selectedMenuIds[0]) {
                const menuId = selectedMenuIds[0];
                try {
                    const menu = await cms_service_1.cmsService.getMenu(menuId);
                    const menuItems = menu.items || [];
                    const existingItem = menuItems.find(item => item.pageId === pageId);
                    if (!existingItem) {
                        // Calculate the correct order index based on position settings
                        const parentId = selectedParentItemId || null;
                        const orderIndex = calculateOrderIndex(menuItems, parentId, selectedPosition, selectedAfterItemId || undefined);
                        // Add page to menu with full hierarchical placement support
                        await cms_service_1.cmsService.addPageToMenu(menuId, pageId, pageTitle, orderIndex, parentId || undefined);
                        console.log(`Page added to menu: ${menuId}, parent: ${parentId || 'root'}, orderIndex: ${orderIndex}, position: ${selectedPosition}`);
                    }
                    else {
                        // Page already exists in menu
                        console.log('Page already exists in menu, skipping assignment');
                    }
                }
                catch (error) {
                    console.error('Failed to assign page to menu:', error);
                    toast({
                        title: "Warning",
                        description: "Page saved but menu assignment failed",
                        variant: "destructive",
                    });
                }
            }
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
    }, [
        pageId,
        pageTitle,
        pageSlug,
        pageDescription,
        components,
        showHeader,
        showFooter,
        selectedCategoryId,
        selectedMenuIds,
        selectedParentItemId,
        selectedPosition,
        selectedAfterItemId,
        calculateOrderIndex,
        toast
    ]);
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
            // Ctrl/Cmd + Shift + Arrow Up to move component up
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'ArrowUp' && selectedComponentId) {
                e.preventDefault();
                handleMoveUp();
                toast({
                    title: "Component Moved",
                    description: "Component moved up",
                });
            }
            // Ctrl/Cmd + Shift + Arrow Down to move component down
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'ArrowDown' && selectedComponentId) {
                e.preventDefault();
                handleMoveDown();
                toast({
                    title: "Component Moved",
                    description: "Component moved down",
                });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleUndo, handleRedo, handleDelete, handleToggleLock, handleMoveUp, handleMoveDown, selectedComponentId, components, saveToHistory, toast]);
    // Listen for prebuild component drop events
    (0, react_1.useEffect)(() => {
        const handleAddPrebuildComponentAtPosition = (e) => {
            const { componentId, defaultProps, parentId, index } = e.detail;
            const newComponent = {
                id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: componentId,
                props: defaultProps,
                parentId: parentId || undefined,
                orderIndex: index,
                children: [],
                locked: false,
            };
            const newComponents = [...components];
            if (parentId === null) {
                // Add to root level at specific index
                newComponents.splice(index, 0, newComponent);
            }
            else {
                // Add as child to parent
                newComponents.push(newComponent);
            }
            setComponents(newComponents);
            saveToHistory(newComponents);
            // Auto-select the newly added component
            setSelectedComponentId(newComponent.id);
            setSelectedComponentType(newComponent.type);
            toast({
                title: "Component Added",
                description: `${componentId} has been added to the page`,
            });
        };
        window.addEventListener('addPrebuildComponentAtPosition', handleAddPrebuildComponentAtPosition);
        return () => {
            window.removeEventListener('addPrebuildComponentAtPosition', handleAddPrebuildComponentAtPosition);
        };
    }, [components, saveToHistory, toast]);
    const handleComponentUpdate = (id, propsOrUpdates) => {
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
        // If propsOrUpdates has 'props' key, it's a full update object
        // Otherwise, treat it as props only (backwards compatibility)
        const updates = propsOrUpdates.props
            ? propsOrUpdates
            : { props: propsOrUpdates };
        const newComponents = components.map(comp => comp.id === id ? { ...comp, ...updates } : comp);
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
    // Add prebuild component from Components Library
    const handleAddPrebuildComponent = (0, react_1.useCallback)((componentId, defaultProps) => {
        const newComponent = {
            id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: componentId,
            props: defaultProps,
            children: [],
            locked: false,
        };
        const newComponents = [...components, newComponent];
        setComponents(newComponents);
        saveToHistory(newComponents);
        // Auto-select the newly added component
        setSelectedComponentId(newComponent.id);
        setSelectedComponentType(newComponent.type);
        toast({
            title: "Component Added",
            description: `${componentId} has been added to the page`,
        });
    }, [components, saveToHistory, toast]);
    const handleMediaSelect = (media) => {
        // Note: Media is now used within prebuild blocks via Properties Panel
        // Direct media-to-canvas functionality removed with basic elements
        toast({
            title: "Media Selected",
            description: "Use Properties Panel to add media to your blocks",
        });
    };
    const selectedComponent = components.find(comp => comp.id === selectedComponentId);
    const selectedComponentProps = selectedComponent ? selectedComponent.props : {};
    const isComponentLocked = selectedComponent?.locked || false;
    const selectedIndex = selectedComponentId ? components.findIndex(comp => comp.id === selectedComponentId) : -1;
    const canMoveUp = !!(selectedComponentId && selectedIndex > 0);
    const canMoveDown = !!(selectedComponentId && selectedIndex < components.length - 1 && selectedIndex !== -1);
    // SEO data handler
    const handleSEODataChange = (0, react_1.useCallback)((data) => {
        setSeoData(data);
    }, []);
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
            
            {/* SEO Button */}
            <div className="flex items-center gap-2">
              <button_1.Button variant="outline" size="sm" onClick={() => setIsSEOExpanded(!isSEOExpanded)} className="flex items-center gap-2">
                <lucide_react_1.Settings className="h-4 w-4"/>
                SEO
                {isSEOExpanded ? <lucide_react_1.ChevronUp className="h-3 w-3 ml-1"/> : <lucide_react_1.ChevronDown className="h-3 w-3 ml-1"/>}
              </button_1.Button>
            </div>
            
          </div>
          
        </card_1.CardHeader>
        
        {/* SEO Section - Collapsible */}
        <framer_motion_1.AnimatePresence>
          {isSEOExpanded && (<framer_motion_1.motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <card_1.CardContent className="pt-4 border-t">
                <seo_panel_1.SEOPanel seoData={seoData} onSEODataChange={handleSEODataChange} showHeader={showHeader} showFooter={showFooter} onShowHeaderChange={setShowHeader} onShowFooterChange={setShowFooter}/>
              </card_1.CardContent>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
      </card_1.Card>

      {/* Page Layout & Actions Bar */}
      <div className="mx-4 mb-4">
        <card_1.Card>
          <card_1.CardContent className="py-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Page Layout Controls - Left Side */}
              <div className="flex items-center gap-2 flex-wrap">
                <button_1.Button variant={showHeader ? "default" : "outline"} size="sm" onClick={() => setShowHeader(!showHeader)} className="flex items-center gap-2">
                  {showHeader ? <lucide_react_1.Eye className="h-4 w-4"/> : <lucide_react_1.EyeOff className="h-4 w-4"/>}
                  Header
                </button_1.Button>
                <button_1.Button variant={showFooter ? "default" : "outline"} size="sm" onClick={() => setShowFooter(!showFooter)} className="flex items-center gap-2">
                  {showFooter ? <lucide_react_1.Eye className="h-4 w-4"/> : <lucide_react_1.EyeOff className="h-4 w-4"/>}
                  Footer
                </button_1.Button>
                {/* Layout Mode - Segmented Control */}
                <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                  <button_1.Button variant="ghost" size="sm" onClick={() => setIsFullWidth(false)} className={`flex items-center gap-2 transition-all ${!isFullWidth
            ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90'
            : 'text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100'}`}>
                    <lucide_react_1.Square className="h-4 w-4"/>
                    Boxed
                  </button_1.Button>
                  <button_1.Button variant="ghost" size="sm" onClick={() => setIsFullWidth(true)} className={`flex items-center gap-2 transition-all ${isFullWidth
            ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90'
            : 'text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100'}`}>
                    <lucide_react_1.Maximize2 className="h-4 w-4"/>
                    Full Width
                  </button_1.Button>
                </div>

                {/* Category Selection */}
                <div className="flex items-center gap-2">
                  <label_1.Label htmlFor="category-select" className="text-sm whitespace-nowrap">Category:</label_1.Label>
                  <select_1.Select value={selectedCategoryId || undefined} onValueChange={(value) => setSelectedCategoryId(value || '')}>
                    <select_1.SelectTrigger id="category-select" className="w-[180px] h-9">
                      <select_1.SelectValue placeholder="Select category"/>
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      {categories.map((category) => (<select_1.SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </select_1.SelectItem>))}
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>

                {/* Menu Assignment - Step 1: Select Menu */}
                <div className="flex items-center gap-2">
                  <label_1.Label htmlFor="menu-select" className="text-sm whitespace-nowrap">Menu:</label_1.Label>
                  <select_1.Select value={selectedMenuIds[0] || undefined} onValueChange={(value) => {
            if (value) {
                setSelectedMenuIds([value]);
                setSelectedParentItemId(''); // Reset parent when menu changes
                setSelectedPosition('last');
            }
            else {
                setSelectedMenuIds([]);
                setSelectedParentItemId('');
            }
        }}>
                    <select_1.SelectTrigger id="menu-select" className="w-[180px] h-9">
                      <select_1.SelectValue placeholder="Select menu"/>
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      {menus.map((menu) => (<select_1.SelectItem key={menu.id} value={menu.id}>
                          {menu.name}
                        </select_1.SelectItem>))}
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>

                {/* Menu Assignment - Step 2: Hierarchical Placement */}
                {selectedMenuIds[0] && (() => {
            const menuItems = getCurrentMenuItems();
            const menuTree = buildMenuTree(menuItems);
            // Recursive function to render menu items with indentation
            const renderMenuItems = (items, level = 0) => {
                return items.map((item) => (<react_1.default.Fragment key={item.id}>
                        <select_1.SelectItem value={item.id}>
                          <span style={{ paddingLeft: `${level * 16}px` }}>
                            {level > 0 && '└─ '}{item.label}
                          </span>
                        </select_1.SelectItem>
                        {item.children && item.children.length > 0 && renderMenuItems(item.children, level + 1)}
                      </react_1.default.Fragment>));
            };
            return (<>
                      {/* Parent Item Selection */}
                      <div className="flex items-center gap-2">
                        <label_1.Label htmlFor="parent-item-select" className="text-sm whitespace-nowrap">Place under:</label_1.Label>
                        <select_1.Select value={selectedParentItemId || 'root'} onValueChange={(value) => {
                    setSelectedParentItemId(value === 'root' ? '' : value);
                }}>
                          <select_1.SelectTrigger id="parent-item-select" className="w-[200px] h-9">
                            <select_1.SelectValue placeholder="Select parent"/>
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="root">📁 Root (Main Level)</select_1.SelectItem>
                            {menuTree.length > 0 && renderMenuItems(menuTree)}
                          </select_1.SelectContent>
                        </select_1.Select>
                      </div>

                      {/* Position Control */}
                      <div className="flex items-center gap-2">
                        <label_1.Label htmlFor="position-select" className="text-sm whitespace-nowrap">Position:</label_1.Label>
                        <select_1.Select value={selectedPosition} onValueChange={(value) => {
                    setSelectedPosition(value);
                    if (value !== 'after') {
                        setSelectedAfterItemId('');
                    }
                }}>
                          <select_1.SelectTrigger id="position-select" className="w-[140px] h-9">
                            <select_1.SelectValue />
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="first">↑ First</select_1.SelectItem>
                            <select_1.SelectItem value="last">↓ Last</select_1.SelectItem>
                            <select_1.SelectItem value="after">→ After item</select_1.SelectItem>
                          </select_1.SelectContent>
                        </select_1.Select>
                      </div>

                      {/* After Item Selection (only if position is 'after') */}
                      {selectedPosition === 'after' && (() => {
                    const siblings = menuItems.filter(item => selectedParentItemId ? item.parentId === selectedParentItemId : !item.parentId);
                    return siblings.length > 0 ? (<div className="flex items-center gap-2">
                            <label_1.Label htmlFor="after-item-select" className="text-sm whitespace-nowrap">After:</label_1.Label>
                            <select_1.Select value={selectedAfterItemId || undefined} onValueChange={setSelectedAfterItemId}>
                              <select_1.SelectTrigger id="after-item-select" className="w-[160px] h-9">
                                <select_1.SelectValue placeholder="Select item"/>
                              </select_1.SelectTrigger>
                              <select_1.SelectContent>
                                {siblings.map((item) => (<select_1.SelectItem key={item.id} value={item.id}>
                                    {item.label}
                                  </select_1.SelectItem>))}
                              </select_1.SelectContent>
                            </select_1.Select>
                          </div>) : null;
                })()}

                      {/* Visual Preview of Menu Placement */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-md border border-border">
                        <span className="text-xs font-medium text-muted-foreground">Preview:</span>
                        <span className="text-xs">
                          {pageTitle} → {' '}
                          {selectedParentItemId ? (<>📁 {menuItems.find(i => i.id === selectedParentItemId)?.label || 'Parent'} / </>) : (<>📁 Root / </>)}
                          {selectedPosition === 'first' && '↑ First'}
                          {selectedPosition === 'last' && '↓ Last'}
                          {selectedPosition === 'after' && selectedAfterItemId && (<>→ After "{menuItems.find(i => i.id === selectedAfterItemId)?.label}"</>)}
                        </span>
                      </div>
                    </>);
        })()}
              </div>

              {/* Action Buttons - Right Side */}
              <div className="flex items-center gap-2 flex-wrap">
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
                <button_1.Button variant="outline" size="sm" onClick={handleSavePage} className="flex items-center gap-2">
                  <lucide_react_1.Save className="h-4 w-4"/>
                  Save Draft
                </button_1.Button>
                
                {/* Preview Mode Toggle */}
                <div className="flex items-center gap-1 border rounded-md p-1">
                  <button_1.Button variant={previewMode === 'desktop' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewMode('desktop')} className="h-7 px-2" title="Desktop Preview">
                    <lucide_react_1.Monitor className="h-4 w-4"/>
                  </button_1.Button>
                  <button_1.Button variant={previewMode === 'tablet' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewMode('tablet')} className="h-7 px-2" title="Tablet Preview">
                    <lucide_react_1.Tablet className="h-4 w-4"/>
                  </button_1.Button>
                  <button_1.Button variant={previewMode === 'mobile' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewMode('mobile')} className="h-7 px-2" title="Mobile Preview">
                    <lucide_react_1.Smartphone className="h-4 w-4"/>
                  </button_1.Button>
                </div>
                
                <button_1.Button size="sm" variant={isPreviewMode ? "default" : "outline"} onClick={handleTogglePreview} className="flex items-center gap-2">
                  <lucide_react_1.Eye className="h-4 w-4"/>
                  {isPreviewMode ? "Exit Preview" : "Preview"}
                </button_1.Button>
                
                <button_1.Button size="sm" variant="default" onClick={handleViewLive} className="flex items-center gap-2" disabled={!pageSlug} title={!pageSlug ? "Save page first to view live" : "Open published page in new tab"}>
                  <lucide_react_1.ExternalLink className="h-4 w-4"/>
                  View Live
                </button_1.Button>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 mx-4 mb-4 overflow-hidden">
        {/* Left Panel - Component Library, History, and Media */}
        <framer_motion_1.AnimatePresence>
          {isLeftPanelOpen && (<framer_motion_1.motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
              <card_1.Card className="flex-shrink-0">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Elements & Templates</h3>
                  <div className="flex items-center gap-2">
                    <button_1.Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setIsTreeSidebarOpen(!isTreeSidebarOpen)}>
                      <lucide_react_1.Network className="h-4 w-4"/>
                      <span className="hidden md:inline">Tree View</span>
                    </button_1.Button>
                    <button_1.Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsLeftPanelOpen(false)}>
                      <lucide_react_1.X className="h-4 w-4"/>
                    </button_1.Button>
                  </div>
                </div>
                <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <tabs_1.TabsList className="grid w-full grid-cols-3">
                    <tabs_1.TabsTrigger value="templates">
                      <lucide_react_1.Package className="h-4 w-4 mr-1"/>
                      <span className="hidden sm:inline">Components</span>
                      <span className="sm:hidden">Blocks</span>
                    </tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="media">
                      <lucide_react_1.Image className="h-4 w-4 mr-1"/>
                      Media
                    </tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="history">
                      <lucide_react_1.History className="h-4 w-4 mr-1"/>
                      History
                    </tabs_1.TabsTrigger>
                  </tabs_1.TabsList>
                  <tabs_1.TabsContent value="templates" className="mt-0 h-[calc(100vh-338px)] overflow-hidden">
                    <components_library_1.ComponentsLibrary onAddComponent={handleAddPrebuildComponent}/>
                  </tabs_1.TabsContent>
                  <tabs_1.TabsContent value="media" className="mt-0 h-[calc(100vh-338px)] overflow-hidden">
                    <MediaLibrary onMediaSelect={handleMediaSelect}/>
                  </tabs_1.TabsContent>
                  <tabs_1.TabsContent value="history" className="mt-0 h-[calc(100vh-338px)] overflow-hidden">
                    <history_panel_1.HistoryPanel history={history} currentIndex={historyIndex} onHistorySelect={handleHistorySelect}/>
                  </tabs_1.TabsContent>
                </tabs_1.Tabs>
              </card_1.Card>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>

        {/* Editor Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile menu buttons */}
          {(!isLeftPanelOpen || !isRightPanelOpen) && (<div className="flex justify-end gap-2 mb-2 md:hidden">
              {!isLeftPanelOpen && (<button_1.Button variant="outline" size="sm" onClick={() => setIsLeftPanelOpen(true)}>
                  <Menu className="h-4 w-4"/>
                </button_1.Button>)}
              {!isRightPanelOpen && (<button_1.Button variant="outline" size="sm" onClick={() => setIsRightPanelOpen(true)}>
                  <Menu className="h-4 w-4"/>
                </button_1.Button>)}
            </div>)}
          <card_1.Card className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto bg-muted/20">
              {/* Preview Mode Wrapper */}
              <div className={`h-full flex items-center justify-center ${isPreviewMode ? 'p-8' : ''}`}>
                <div className={`
                    ${isPreviewMode ? 'bg-background shadow-2xl rounded-lg overflow-hidden transition-all duration-300' : 'w-full h-full'}
                    ${previewMode === 'desktop' ? 'w-full max-w-[1920px]' : ''}
                    ${previewMode === 'tablet' ? 'w-[768px] h-[1024px]' : ''}
                    ${previewMode === 'mobile' ? 'w-[375px] h-[667px]' : ''}
                  `} style={{
            minHeight: isPreviewMode && previewMode === 'desktop' ? '800px' : undefined,
        }}>
                  {isPreviewMode && (<div className="bg-muted/50 px-4 py-2 border-b flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {previewMode === 'desktop' && <lucide_react_1.Monitor className="h-4 w-4"/>}
                        {previewMode === 'tablet' && <lucide_react_1.Tablet className="h-4 w-4"/>}
                        {previewMode === 'mobile' && <lucide_react_1.Smartphone className="h-4 w-4"/>}
                        <span className="text-sm font-medium capitalize">{previewMode} Preview</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {previewMode === 'desktop' && 'Full Width'}
                        {previewMode === 'tablet' && '768 × 1024'}
                        {previewMode === 'mobile' && '375 × 667'}
                      </div>
                    </div>)}
                  <div className={`${isPreviewMode ? 'overflow-auto' : ''} h-full`}>
                    <editor_canvas_1.EditorCanvas components={components} onComponentUpdate={handleComponentUpdate} onComponentDelete={handleComponentDelete} onComponentSelect={(id, type) => {
            setSelectedComponentId(id);
            if (type) {
                setSelectedComponentType(type);
            }
        }} selectedComponentId={selectedComponentId} onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} isPreviewMode={isPreviewMode} isFullWidth={isFullWidth} onReorderComponents={(componentId, newParentId, newIndex) => {
            // Handle nested component reordering
            const newComponents = [...components];
            const componentIndex = newComponents.findIndex(c => c.id === componentId);
            if (componentIndex !== -1) {
                const component = newComponents[componentIndex];
                component.parentId = newParentId;
                component.orderIndex = newIndex;
                setComponents(newComponents);
                saveToHistory(newComponents);
            }
        }}/>
                  </div>
                </div>
              </div>
            </div>
          </card_1.Card>
        </div>

        {/* Properties Panel - Only shown when a component is selected */}
        <framer_motion_1.AnimatePresence>
          {isRightPanelOpen && selectedComponentId && (<framer_motion_1.motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
              <card_1.Card className="flex-shrink-0 h-full flex flex-col">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Properties</h3>
                  <button_1.Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsRightPanelOpen(false)}>
                    <lucide_react_1.X className="h-4 w-4"/>
                  </button_1.Button>
                </div>
                <div className="flex-1 overflow-auto">
                  <properties_panel_1.PropertiesPanel componentType={selectedComponentType} componentProps={selectedComponentProps} onPropsChange={handlePropertyChange} isLocked={isComponentLocked} onMoveUp={canMoveUp ? handleMoveUp : undefined} onMoveDown={canMoveDown ? handleMoveDown : undefined} canMoveUp={canMoveUp} canMoveDown={canMoveDown}/>
                </div>
              </card_1.Card>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
      </div>

      {/* Resizable Component Tree Sidebar */}
      <framer_motion_1.AnimatePresence>
        {isTreeSidebarOpen && (<>
            {/* Overlay - only show when unpinned in docked mode or when dragging in floating mode */}
            {((!isTreePinned && isDocked) || (isDragging && !isDocked)) && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 z-40" onClick={() => !isDragging && setIsTreeSidebarOpen(false)}/>)}
            
            {/* Sidebar */}
            <framer_motion_1.motion.div initial={isDocked ? { x: '100%' } : { opacity: 0, scale: 0.95 }} animate={isDocked ? { x: 0 } : { opacity: 1, scale: 1 }} exit={isDocked ? { x: '100%' } : { opacity: 0, scale: 0.95 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className={`${isDocked
                ? 'fixed right-0 top-0 bottom-0'
                : 'fixed'} bg-background border-2 ${isDocked ? 'border-l border-border' : 'border-primary rounded-lg shadow-2xl'} z-50 flex ${isDragging ? 'cursor-move' : ''}`} style={isDocked
                ? { width: `${treeSidebarWidth}px` }
                : {
                    width: `${treeSidebarWidth}px`,
                    left: `${floatingPosition.x}px`,
                    top: `${floatingPosition.y}px`,
                    maxHeight: '80vh',
                }}>
              {/* Resize Handle - Left edge for docked, right edge for floating */}
              <div className={`absolute ${isDocked ? 'left-0' : 'right-0'} top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 active:bg-primary group`} onMouseDown={handleResizeStart}>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <lucide_react_1.GripVertical className="h-8 w-8 text-muted-foreground"/>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className={`flex-1 flex flex-col ${isDocked ? 'ml-4' : 'mr-4'}`}>
                {/* Header - Draggable in floating mode */}
                <div className={`flex items-center justify-between p-4 border-b ${!isDocked ? 'cursor-move' : ''}`} onMouseDown={!isDocked ? handleDragStart : undefined}>
                  <h3 className="font-semibold text-lg">Component Tree</h3>
                  <div className="flex items-center gap-2">
                    <button_1.Button variant="ghost" size="sm" onClick={handleToggleDock} className="h-8 w-8 p-0" title={isDocked ? 'Detach to floating mode' : 'Dock to right edge'}>
                      {isDocked ? (<lucide_react_1.Maximize2 className="h-4 w-4"/>) : (<lucide_react_1.Minimize2 className="h-4 w-4"/>)}
                    </button_1.Button>
                    {isDocked && (<button_1.Button variant="ghost" size="sm" onClick={() => setIsTreePinned(!isTreePinned)} className="h-8 w-8 p-0" title={isTreePinned ? 'Unpin sidebar' : 'Pin sidebar'}>
                        {isTreePinned ? (<lucide_react_1.PinOff className="h-4 w-4"/>) : (<lucide_react_1.Pin className="h-4 w-4"/>)}
                      </button_1.Button>)}
                    <button_1.Button variant="ghost" size="sm" onClick={() => setIsTreeSidebarOpen(false)} className="h-8 w-8 p-0">
                      <lucide_react_1.X className="h-4 w-4"/>
                    </button_1.Button>
                  </div>
                </div>

                {/* Tree Content */}
                <div className="flex-1 overflow-hidden">
                  <component_tree_1.ComponentTree components={components} selectedComponentId={selectedComponentId} onSelectComponent={(id) => {
                setSelectedComponentId(id);
                if (id) {
                    const comp = components.find(c => c.id === id);
                    if (comp) {
                        setSelectedComponentType(comp.type);
                    }
                }
                else {
                    setSelectedComponentType('');
                }
            }} onDeleteComponent={handleComponentDelete} onUpdateComponent={handleComponentUpdate} onReorderComponents={(componentId, newParentId, newIndex) => {
                const newComponents = [...components];
                const componentIndex = newComponents.findIndex(c => c.id === componentId);
                if (componentIndex !== -1) {
                    const [component] = newComponents.splice(componentIndex, 1);
                    component.parentId = newParentId;
                    component.orderIndex = newIndex;
                    setComponents(newComponents);
                    saveToHistory(newComponents);
                }
            }} className="h-full"/>
                </div>

                {/* Footer - Resize Indicator */}
                <div className="p-2 border-t text-xs text-muted-foreground text-center">
                  {treeSidebarWidth}px {isResizing && '(resizing...)'} {isDragging && '(moving...)'}
                  {!isDocked && ` • Floating mode`}
                </div>
              </div>
            </framer_motion_1.motion.div>
          </>)}
      </framer_motion_1.AnimatePresence>
    </div>);
};
exports.VisualEditor = VisualEditor;
exports.default = exports.VisualEditor;
//# sourceMappingURL=visual-editor.js.map