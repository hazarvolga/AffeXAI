'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle,
  Filter,
  RefreshCw
} from 'lucide-react';
import { componentsRegistry, type ComponentCategory } from '@/lib/cms/components-registry';
import { allBlockConfigs } from '@/components/cms/blocks/block-configs';
import { BlockRenderer } from '@/components/cms/editor/block-renderer';
import { PropertiesPanel } from '@/components/cms/editor/properties-panel';
import { EditorProvider } from '@/components/cms/editor/editor-context';

// Status types
type ComponentStatus = 'ok' | 'warning' | 'error';

interface ComponentTestResult {
  id: string;
  name: string;
  category: ComponentCategory;
  status: ComponentStatus;
  issues: string[];
  hasContentTab: boolean;
  hasStyleTab: boolean;
  hasPlaceholders: boolean;
  placeholders: string[];
}

export default function TestPrebuildsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ComponentStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<ComponentCategory | 'all'>('all');
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(new Set());
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [componentProps, setComponentProps] = useState<Record<string, any>>({});

  // Analyze all components
  const testResults = useMemo(() => {
    const results: ComponentTestResult[] = [];

    componentsRegistry.forEach((component) => {
      const config = allBlockConfigs[component.id];
      const issues: string[] = [];
      const placeholders: string[] = [];
      let status: ComponentStatus = 'ok';
      let hasContent = false;
      let hasStyle = false;

      // Check if config exists
      if (!config) {
        issues.push('❌ Block configuration not found');
        status = 'error';
      } else {
        // Check for Content and Style tabs by analyzing property names
        // Instead of checking for config.content and config.style objects,
        // we check if there are properties that would be categorized as content or style
        const propertyKeys = Object.keys(config);
        const contentProperties = propertyKeys.filter(key => {
          const contentKeywords = [
            'text', 'title', 'subtitle', 'description', 'content', 
            'url', 'href', 'link', 'alt', 'caption', 'author', 'role',
            'items', 'nav', 'cta', 'button', 'logo', 'social',
            'heading', 'subheading', 'label', 'placeholder', 'name',
            'email', 'phone', 'address', 'company', 'position', 'type'
          ];
          const lowerKey = key.toLowerCase();
          return contentKeywords.some(keyword => lowerKey.includes(keyword));
        });
        
        const styleProperties = propertyKeys.filter(key => {
          const styleKeywords = [
            'color', 'background', 'padding', 'margin', 'width', 'height',
            'size', 'variant', 'align', 'weight', 'border', 'shadow',
            'opacity', 'radius', 'rounded', 'spacing', 'gap', 'font'
          ];
          const lowerKey = key.toLowerCase();
          return styleKeywords.some(keyword => lowerKey.includes(keyword));
        });

        hasContent = contentProperties.length > 0;
        hasStyle = styleProperties.length > 0;

        if (!hasContent) {
          issues.push('⚠️ No Content properties defined');
          status = status === 'ok' ? 'warning' : status;
        }

        if (!hasStyle) {
          issues.push('⚠️ No Style properties defined');
          status = status === 'ok' ? 'warning' : status;
        }

        // Check for placeholder values in default props
        const checkPlaceholders = (obj: any, prefix = '') => {
          if (!obj) return;
          
          Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string') {
              const lowerValue = value.toLowerCase();
              const lowerKey = key.toLowerCase();
              
              // Skip valid alignment/position values
              const isAlignmentProperty = lowerKey.includes('align') || lowerKey.includes('position') || lowerKey.includes('justify');
              const isValidAlignmentValue = ['center', 'left', 'right', 'top', 'bottom', 'start', 'end', 'justify'].includes(lowerValue);
              
              if (isAlignmentProperty && isValidAlignmentValue) {
                return; // Skip - this is a valid value
              }
              
              // Check for actual placeholders
              if (
                lowerValue.includes('headline') ||
                lowerValue.includes('placeholder') ||
                lowerValue.match(/^(h1|h2|h3|h4|h5|h6)$/i) ||
                lowerValue.includes('lorem ipsum') ||
                lowerValue.includes('sample text') ||
                lowerValue.includes('your text here')
              ) {
                placeholders.push(`${prefix}${key}: "${value}"`);
              }
            } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              checkPlaceholders(value, `${prefix}${key}.`);
            }
          });
        };

        checkPlaceholders(component.defaultProps);

        if (placeholders.length > 0) {
          issues.push(`⚠️ Found ${placeholders.length} placeholder value(s)`);
          status = status === 'ok' ? 'warning' : status;
        }
      }

      results.push({
        id: component.id,
        name: component.name,
        category: component.category,
        status,
        issues,
        hasContentTab: hasContent,
        hasStyleTab: hasStyle,
        hasPlaceholders: placeholders.length > 0,
        placeholders,
      });
    });

    return results.sort((a, b) => {
      // Sort by status (error > warning > ok), then by name
      const statusOrder = { error: 0, warning: 1, ok: 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return a.name.localeCompare(b.name);
    });
  }, []);

  // Filter results
  const filteredResults = useMemo(() => {
    return testResults.filter((result) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !result.name.toLowerCase().includes(query) &&
          !result.id.toLowerCase().includes(query) &&
          !result.category.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Status filter
      if (filterStatus !== 'all' && result.status !== filterStatus) {
        return false;
      }

      // Category filter
      if (filterCategory !== 'all' && result.category !== filterCategory) {
        return false;
      }

      return true;
    });
  }, [testResults, searchQuery, filterStatus, filterCategory]);

  // Statistics
  const stats = useMemo(() => {
    const total = testResults.length;
    const errors = testResults.filter((r) => r.status === 'error').length;
    const warnings = testResults.filter((r) => r.status === 'warning').length;
    const ok = testResults.filter((r) => r.status === 'ok').length;
    const withPlaceholders = testResults.filter((r) => r.hasPlaceholders).length;

    return { total, errors, warnings, ok, withPlaceholders };
  }, [testResults]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<ComponentCategory>();
    testResults.forEach((r) => cats.add(r.category));
    return Array.from(cats).sort();
  }, [testResults]);

  // Toggle component expansion
  const toggleComponent = (id: string) => {
    const newExpanded = new Set(expandedComponents);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
      if (selectedComponent === id) {
        setSelectedComponent(null);
      }
    } else {
      newExpanded.add(id);
      setSelectedComponent(id);
      // Initialize props if not exists
      if (!componentProps[id]) {
        const component = componentsRegistry.find(c => c.id === id);
        if (component) {
          setComponentProps((prev) => ({
            ...prev,
            [id]: { ...component.defaultProps },
          }));
        }
      }
    }
    setExpandedComponents(newExpanded);
  };

  // Handle component prop update
  const handleComponentUpdate = (componentId: string, newProps: any) => {
    setComponentProps((prev) => ({
      ...prev,
      [componentId]: newProps,
    }));
  };

  // Status badge
  const StatusBadge = ({ status }: { status: ComponentStatus }) => {
    const config = {
      ok: { icon: CheckCircle2, color: 'bg-success/10 text-success border-success/20', label: 'OK' },
      warning: { icon: AlertTriangle, color: 'bg-warning/10 text-warning border-warning/20', label: 'Warning' },
      error: { icon: AlertCircle, color: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Error' },
    };

    const { icon: Icon, color, label } = config[status];

    return (
      <Badge variant="outline" className={`${color} gap-1`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Prebuild Components Test Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive testing tool for all CMS prebuild components
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-destructive">Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.errors}</div>
            </CardContent>
          </Card>

          <Card className="border-warning/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-warning">Warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.warnings}</div>
            </CardContent>
          </Card>

          <Card className="border-success/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-success">OK</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.ok}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">With Placeholders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.withPlaceholders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="error">Errors Only</option>
                  <option value="warning">Warnings Only</option>
                  <option value="ok">OK Only</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterCategory('all');
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground mb-2">
            Showing {filteredResults.length} of {testResults.length} components
          </div>

          <ScrollArea className="h-[calc(100vh-500px)]">
            <div className="space-y-2 pr-4">
              {filteredResults.map((result) => {
                const isExpanded = expandedComponents.has(result.id);
                const component = componentsRegistry.find(c => c.id === result.id);
                const currentProps = componentProps[result.id] || component?.defaultProps || {};

                return (
                  <Card key={result.id} className="overflow-hidden">
                    {/* Header - Clickable */}
                    <button
                      onClick={() => toggleComponent(result.id)}
                      className="w-full text-left hover:bg-muted/50 transition-colors"
                    >
                      <CardHeader className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronUp className="h-5 w-5 text-muted-foreground rotate-180" />
                            )}
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{result.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {result.category}
                                </Badge>
                                <StatusBadge status={result.status} />
                              </div>
                              <p className="text-sm text-muted-foreground font-mono">{result.id}</p>
                            </div>
                          </div>

                          {/* Quick Info Icons */}
                          <div className="flex items-center gap-2">
                            {!result.hasContentTab && (
                              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                                No Content
                              </Badge>
                            )}
                            {!result.hasStyleTab && (
                              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                                No Style
                              </Badge>
                            )}
                            {result.hasPlaceholders && (
                              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                                {result.placeholders.length} Placeholders
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <CardContent className="border-t pt-6">
                        {/* Issues List */}
                        {result.issues.length > 0 && (
                          <div className="mb-6 p-4 bg-muted rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4" />
                              Issues Found ({result.issues.length})
                            </h4>
                            <ul className="space-y-1">
                              {result.issues.map((issue, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground">
                                  {issue}
                                </li>
                              ))}
                            </ul>

                            {/* Placeholders Detail */}
                            {result.hasPlaceholders && (
                              <div className="mt-4 pt-4 border-t">
                                <h5 className="font-medium mb-2 text-sm">Placeholder Values:</h5>
                                <ul className="space-y-1">
                                  {result.placeholders.map((placeholder, idx) => (
                                    <li key={idx} className="text-xs font-mono text-muted-foreground bg-background p-1 rounded">
                                      {placeholder}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Component Preview & Properties */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Left: Preview */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              Preview
                            </h4>
                            <div className="border rounded-lg p-4 bg-background min-h-[300px]">
                              <EditorProvider onComponentUpdate={() => {}}>
                                <BlockRenderer blockId={result.id} props={currentProps} />
                              </EditorProvider>
                            </div>
                          </div>

                          {/* Right: Properties Panel */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              Properties Panel
                            </h4>
                            <div className="border rounded-lg bg-background">
                              <PropertiesPanel
                                componentType={result.id}
                                componentProps={currentProps}
                                onPropsChange={(newProps: any) => handleComponentUpdate(result.id, newProps)}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}

              {filteredResults.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No components match your filters</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
