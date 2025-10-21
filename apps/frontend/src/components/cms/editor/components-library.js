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
exports.ComponentsLibrary = void 0;
const react_1 = __importStar(require("react"));
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const scroll_area_1 = require("@/components/ui/scroll-area");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const components_registry_1 = require("@/lib/cms/components-registry");
const ComponentsLibrary = ({ onAddComponent }) => {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)('Navigation');
    const scrollContainerRef = (0, react_1.useRef)(null);
    const activeTabRef = (0, react_1.useRef)(null);
    const [canScrollLeft, setCanScrollLeft] = (0, react_1.useState)(false);
    const [canScrollRight, setCanScrollRight] = (0, react_1.useState)(false);
    const categories = (0, components_registry_1.getAllCategories)();
    // Check scroll position to show/hide arrows and gradients
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
        }
    };
    (0, react_1.useEffect)(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            // Check on mount and window resize
            window.addEventListener('resize', checkScrollPosition);
            return () => {
                container.removeEventListener('scroll', checkScrollPosition);
                window.removeEventListener('resize', checkScrollPosition);
            };
        }
    }, []);
    // Auto-scroll active tab to center when category changes
    (0, react_1.useEffect)(() => {
        if (activeTabRef.current && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const activeTab = activeTabRef.current;
            // Calculate position to center the active tab
            const containerWidth = container.clientWidth;
            const tabLeft = activeTab.offsetLeft;
            const tabWidth = activeTab.offsetWidth;
            const scrollPosition = tabLeft - (containerWidth / 2) + (tabWidth / 2);
            container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }, [selectedCategory]);
    // Scroll functions
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };
    // Filter components based on search query
    const filteredComponents = (0, react_1.useMemo)(() => {
        if (searchQuery.trim()) {
            return (0, components_registry_1.searchComponents)(searchQuery);
        }
        return (0, components_registry_1.getComponentsByCategory)(selectedCategory);
    }, [searchQuery, selectedCategory]);
    // Get component count per category for badges
    const getCategoryCount = (category) => {
        return (0, components_registry_1.getComponentsByCategory)(category).length;
    };
    const handleAddComponent = (component) => {
        onAddComponent(component.id, component.defaultProps);
    };
    return (<div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        {/* Search Bar */}
        <div className="relative">
          <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
          <input_1.Input placeholder="Search components..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9"/>
        </div>
      </div>

      {/* Category Tabs */}
      {!searchQuery && (<tabs_1.Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v)}>
          <div className="border-b px-4 py-2 relative">{/* Left Gradient Shadow */}
            {canScrollLeft && (<div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10"/>)}
            
            {/* Right Gradient Shadow */}
            {canScrollRight && (<div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10"/>)}
            
            <div className="flex items-center gap-2">
              {/* Left Arrow Button */}
              <button_1.Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={scrollLeft} disabled={!canScrollLeft}>
                <lucide_react_1.ChevronLeft className="h-4 w-4"/>
              </button_1.Button>
              
              {/* Scrollable Tabs */}
              <div ref={scrollContainerRef} className="flex-1 overflow-x-auto scrollbar-hide">
                <tabs_1.TabsList className="inline-flex h-auto justify-start gap-2 bg-transparent p-0 w-max">
                  {categories.map((category) => (<tabs_1.TabsTrigger key={category} value={category} ref={selectedCategory === category ? activeTabRef : null} className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      {category}
                      <badge_1.Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                        {getCategoryCount(category)}
                      </badge_1.Badge>
                    </tabs_1.TabsTrigger>))}
                </tabs_1.TabsList>
              </div>
              
              {/* Right Arrow Button */}
              <button_1.Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={scrollRight} disabled={!canScrollRight}>
                <lucide_react_1.ChevronRight className="h-4 w-4"/>
              </button_1.Button>
            </div>
          </div>
        </tabs_1.Tabs>)}

      {/* Components Grid */}
      <scroll_area_1.ScrollArea className="flex-1">
        <div className="p-4">
          {filteredComponents.length === 0 ? (<div className="flex flex-col items-center justify-center py-12 text-center">
              <lucide_react_1.Search className="h-12 w-12 text-muted-foreground mb-3"/>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No components found' : 'No components in this category'}
              </p>
            </div>) : (<div className="grid grid-cols-1 gap-3">
              {filteredComponents.map((component) => (<ComponentCard key={component.id} component={component} onAdd={handleAddComponent}/>))}
            </div>)}
        </div>
      </scroll_area_1.ScrollArea>
    </div>);
};
exports.ComponentsLibrary = ComponentsLibrary;
const ComponentCard = ({ component, onAdd }) => {
    const [isDragging, setIsDragging] = react_1.default.useState(false);
    const handleDragStart = (e) => {
        setIsDragging(true);
        // Set drag data
        e.dataTransfer.setData('application/json', JSON.stringify({
            type: 'prebuild-component',
            componentId: component.id,
            defaultProps: component.defaultProps,
        }));
        e.dataTransfer.effectAllowed = 'copy';
    };
    const handleDragEnd = () => {
        setIsDragging(false);
    };
    return (<div className={`group relative rounded-lg border bg-card p-4 hover:border-primary transition-colors cursor-move ${isDragging ? 'opacity-50' : ''}`} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {/* Drag Handle - Top Right */}
      <div className="absolute top-2 right-2 p-1 rounded bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <lucide_react_1.GripVertical className="h-4 w-4 text-muted-foreground"/>
      </div>

      {/* Component Info */}
      <div className="space-y-2 pr-8">
        <h3 className="font-semibold text-sm leading-tight">{component.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {component.description}
        </p>
      </div>

      {/* Add Button */}
      <button_1.Button size="sm" variant="outline" className="mt-3 w-full" onClick={() => onAdd(component)}>
        <lucide_react_1.Plus className="h-4 w-4 mr-1"/>
        Add to Page
      </button_1.Button>
    </div>);
};
exports.default = exports.ComponentsLibrary;
//# sourceMappingURL=components-library.js.map