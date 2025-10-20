'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Plus, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  componentsRegistry,
  getComponentsByCategory,
  getAllCategories,
  searchComponents,
  type ComponentCategory,
  type ComponentRegistryItem,
} from '@/lib/cms/components-registry';

interface ComponentsLibraryProps {
  onAddComponent: (componentId: string, defaultProps: any) => void;
}

export const ComponentsLibrary: React.FC<ComponentsLibraryProps> = ({ onAddComponent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('Navigation');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categories = getAllCategories();

  // Check scroll position to show/hide arrows and gradients
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
    }
  };

  useEffect(() => {
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
  useEffect(() => {
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
  const filteredComponents = useMemo(() => {
    if (searchQuery.trim()) {
      return searchComponents(searchQuery);
    }
    return getComponentsByCategory(selectedCategory);
  }, [searchQuery, selectedCategory]);

  // Get component count per category for badges
  const getCategoryCount = (category: ComponentCategory) => {
    return getComponentsByCategory(category).length;
  };

  const handleAddComponent = (component: ComponentRegistryItem) => {
    onAddComponent(component.id, component.defaultProps);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ComponentCategory)}>
          <div className="border-b px-4 py-2 relative">{/* Left Gradient Shadow */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
            )}
            
            {/* Right Gradient Shadow */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />
            )}
            
            <div className="flex items-center gap-2">
              {/* Left Arrow Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {/* Scrollable Tabs */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-x-auto scrollbar-hide"
              >
                <TabsList className="inline-flex h-auto justify-start gap-2 bg-transparent p-0 w-max">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      ref={selectedCategory === category ? activeTabRef : null}
                      className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {category}
                      <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                        {getCategoryCount(category)}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {/* Right Arrow Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={scrollRight}
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Tabs>
      )}

      {/* Components Grid */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredComponents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No components found' : 'No components in this category'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredComponents.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onAdd={handleAddComponent}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

interface ComponentCardProps {
  component: ComponentRegistryItem;
  onAdd: (component: ComponentRegistryItem) => void;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component, onAdd }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
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

  return (
    <div 
      className={`group relative rounded-lg border bg-card p-4 hover:border-primary transition-colors cursor-move ${isDragging ? 'opacity-50' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Drag Handle - Top Right */}
      <div className="absolute top-2 right-2 p-1 rounded bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Component Info */}
      <div className="space-y-2 pr-8">
        <h3 className="font-semibold text-sm leading-tight">{component.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {component.description}
        </p>
      </div>

      {/* Add Button */}
      <Button
        size="sm"
        variant="outline"
        className="mt-3 w-full"
        onClick={() => onAdd(component)}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add to Page
      </Button>
    </div>
  );
};

export default ComponentsLibrary;
