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
exports.PropertiesPanel = void 0;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const checkbox_1 = require("@/components/ui/checkbox");
const button_1 = require("@/components/ui/button");
const alert_1 = require("@/components/ui/alert");
const dialog_1 = require("@/components/ui/dialog");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const block_configs_1 = require("@/components/cms/blocks/block-configs");
const media_library_1 = require("@/components/cms/editor/media-library");
const layout_component_1 = require("./layout-component"); // Import LayoutComponent
const PropertiesPanel = ({ componentType, componentProps, onPropsChange, isLocked = false, onMoveUp, onMoveDown, canMoveUp = true, canMoveDown = true, layoutOptions, onLayoutOptionsChange, }) => {
    const [localProps, setLocalProps] = (0, react_1.useState)(componentProps);
    const [mediaModalOpen, setMediaModalOpen] = (0, react_1.useState)({});
    const [activeTab, setActiveTab] = (0, react_1.useState)('content');
    (0, react_1.useEffect)(() => {
        setLocalProps(componentProps);
    }, [componentProps]);
    const updateProp = (key, value) => {
        if (isLocked)
            return;
        let newProps = { ...localProps };
        if (key.includes('.')) {
            const parts = key.split('.');
            if (parts.length === 3) {
                const [listKey, indexStr, itemKey] = parts;
                const index = parseInt(indexStr, 10);
                const list = [...(newProps[listKey] || [])];
                if (list[index]) {
                    list[index] = { ...list[index], [itemKey]: value };
                }
                else {
                    list[index] = { [itemKey]: value };
                }
                newProps = { ...newProps, [listKey]: list };
            }
        }
        else {
            newProps = { ...newProps, [key]: value };
        }
        setLocalProps(newProps);
        onPropsChange(newProps);
    };
    // Separate content and style properties for tabbed interface
    const getContentProperties = () => {
        switch (componentType) {
            case 'text':
                return (<div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="content">Content</label_1.Label>
              <textarea_1.Textarea id="content" value={localProps.content || ''} onChange={(e) => updateProp('content', e.target.value)} disabled={isLocked}/>
            </div>
          </div>);
            case 'button':
                return (<div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="text">Button Text</label_1.Label>
              <input_1.Input id="text" value={localProps.text || ''} onChange={(e) => updateProp('text', e.target.value)} disabled={isLocked}/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="href">Link URL (optional)</label_1.Label>
              <input_1.Input id="href" value={localProps.href || ''} onChange={(e) => updateProp('href', e.target.value)} disabled={isLocked}/>
            </div>
          </div>);
            case 'image':
                return (<div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="src">Image URL</label_1.Label>
              <input_1.Input id="src" value={localProps.src || ''} onChange={(e) => updateProp('src', e.target.value)} disabled={isLocked}/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="alt">Alt Text</label_1.Label>
              <input_1.Input id="alt" value={localProps.alt || ''} onChange={(e) => updateProp('alt', e.target.value)} disabled={isLocked}/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="caption">Caption (optional)</label_1.Label>
              <input_1.Input id="caption" value={localProps.caption || ''} onChange={(e) => updateProp('caption', e.target.value)} disabled={isLocked}/>
            </div>
          </div>);
            case 'block':
                const blockId = componentProps.blockId;
                const blockConfig = blockId ? block_configs_1.allBlockConfigs[blockId] : null;
                if (!blockConfig) {
                    return (<div className="space-y-4">
              <div className="text-center text-muted-foreground py-4">
                <p>Block components are pre-built designs with limited editable properties.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label_1.Label htmlFor="blockId">Block ID</label_1.Label>
                  <input_1.Input id="blockId" value={componentProps.blockId || ''} readOnly/>
                </div>
              </div>
            </div>);
                }
                // Render block-specific content properties
                return (<div className="space-y-4">
            <div className="text-center text-muted-foreground py-2">
              <p>Edit block content</p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(blockConfig).map(([key, config]) => {
                        // For blocks, we'll show all properties in the content tab for now
                        // In the future, we might want to categorize them properly
                        return (<div key={key} className="space-y-2">
                    <label_1.Label htmlFor={key}>{config.label}</label_1.Label>
                    {renderPropertyInput(key, config, componentProps[key])}
                  </div>);
                    })}
            </div>
          </div>);
            default:
                return (<div className="text-center text-muted-foreground py-8">
            <p>Select a component to edit its content properties</p>
          </div>);
        }
    };
    const getStyleProperties = () => {
        switch (componentType) {
            case 'text':
                return (<div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="variant">Variant</label_1.Label>
              <select_1.Select value={localProps.variant || 'body'} onValueChange={(value) => updateProp('variant', value)} disabled={isLocked}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="heading1">Heading 1</select_1.SelectItem>
                  <select_1.SelectItem value="heading2">Heading 2</select_1.SelectItem>
                  <select_1.SelectItem value="heading3">Heading 3</select_1.SelectItem>
                  <select_1.SelectItem value="body">Body</select_1.SelectItem>
                  <select_1.SelectItem value="caption">Caption</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="align">Alignment</label_1.Label>
              <select_1.Select value={localProps.align || 'left'} onValueChange={(value) => updateProp('align', value)} disabled={isLocked}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="left">Left</select_1.SelectItem>
                  <select_1.SelectItem value="center">Center</select_1.SelectItem>
                  <select_1.SelectItem value="right">Right</select_1.SelectItem>
                  <select_1.SelectItem value="justify">Justify</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="color">Color</label_1.Label>
              <select_1.Select value={localProps.color || 'primary'} onValueChange={(value) => updateProp('color', value)} disabled={isLocked}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="primary">Primary</select_1.SelectItem>
                  <select_1.SelectItem value="secondary">Secondary</select_1.SelectItem>
                  <select_1.SelectItem value="muted">Muted</select_1.SelectItem>
                  <select_1.SelectItem value="success">Success</select_1.SelectItem>
                  <select_1.SelectItem value="warning">Warning</select_1.SelectItem>
                  <select_1.SelectItem value="error">Error</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>);
            case 'button':
                return (<div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="variant">Variant</label_1.Label>
              <select_1.Select value={localProps.variant || 'default'} onValueChange={(value) => updateProp('variant', value)} disabled={isLocked}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="default">Default</select_1.SelectItem>
                  <select_1.SelectItem value="destructive">Destructive</select_1.SelectItem>
                  <select_1.SelectItem value="outline">Outline</select_1.SelectItem>
                  <select_1.SelectItem value="secondary">Secondary</select_1.SelectItem>
                  <select_1.SelectItem value="ghost">Ghost</select_1.SelectItem>
                  <select_1.SelectItem value="link">Link</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="size">Size</label_1.Label>
              <select_1.Select value={localProps.size || 'default'} onValueChange={(value) => updateProp('size', value)} disabled={isLocked}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="sm">Small</select_1.SelectItem>
                  <select_1.SelectItem value="default">Default</select_1.SelectItem>
                  <select_1.SelectItem value="lg">Large</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <checkbox_1.Checkbox id="disabled" checked={localProps.disabled || false} onCheckedChange={(checked) => updateProp('disabled', checked)} disabled={isLocked}/>
              <label_1.Label htmlFor="disabled">Disabled</label_1.Label>
            </div>
          </div>);
            case 'image':
                return (<div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label>Width</label_1.Label>
              <input_1.Input type="number" value={localProps.width || ''} onChange={(e) => updateProp('width', e.target.value)} disabled={isLocked}/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label>Height</label_1.Label>
              <input_1.Input type="number" value={localProps.height || ''} onChange={(e) => updateProp('height', e.target.value)} disabled={isLocked}/>
            </div>
          </div>);
            case 'container':
                return (<div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="padding">Padding</label_1.Label>
              <select_1.Select value={localProps.padding || 'md'} onValueChange={(value) => updateProp('padding', value)} disabled={isLocked}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="none">None</select_1.SelectItem>
                  <select_1.SelectItem value="xs">Extra Small</select_1.SelectItem>
                  <select_1.SelectItem value="sm">Small</select_1.SelectItem>
                  <select_1.SelectItem value="md">Medium</select_1.SelectItem>
                  <select_1.SelectItem value="lg">Large</select_1.SelectItem>
                  <select_1.SelectItem value="xl">Extra Large</select_1.SelectItem>
                  <select_1.SelectItem value="2xl">2X Large</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="background">Background</label_1.Label>
              <select_1.Select value={localProps.background || 'none'} onValueChange={(value) => updateProp('background', value)} disabled={isLocked}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="none">None</select_1.SelectItem>
                  <select_1.SelectItem value="primary">Primary</select_1.SelectItem>
                  <select_1.SelectItem value="secondary">Secondary</select_1.SelectItem>
                  <select_1.SelectItem value="muted">Muted</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>);
            case 'block':
                const blockId = componentProps.blockId;
                const blockConfig = blockId ? block_configs_1.allBlockConfigs[blockId] : null;
                if (!blockConfig) {
                    return (<div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label_1.Label htmlFor="blockClass">CSS Classes</label_1.Label>
                  <input_1.Input id="blockClass" value={componentProps.className || ''} onChange={(e) => updateProp('className', e.target.value)} placeholder="Additional CSS classes"/>
                </div>
                
                <div className="space-y-2">
                  <label_1.Label htmlFor="blockMargin">Margin</label_1.Label>
                  <select_1.Select value={componentProps.margin || 'default'} onValueChange={(value) => updateProp('margin', value)}>
                    <select_1.SelectTrigger>
                      <select_1.SelectValue />
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="default">Default</select_1.SelectItem>
                      <select_1.SelectItem value="none">None</select_1.SelectItem>
                      <select_1.SelectItem value="small">Small</select_1.SelectItem>
                      <select_1.SelectItem value="medium">Medium</select_1.SelectItem>
                      <select_1.SelectItem value="large">Large</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
                
                <div className="space-y-2">
                  <label_1.Label htmlFor="blockPadding">Padding</label_1.Label>
                  <select_1.Select value={componentProps.padding || 'default'} onValueChange={(value) => updateProp('padding', value)}>
                    <select_1.SelectTrigger>
                      <select_1.SelectValue />
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="default">Default</select_1.SelectItem>
                      <select_1.SelectItem value="none">None</select_1.SelectItem>
                      <select_1.SelectItem value="small">Small</select_1.SelectItem>
                      <select_1.SelectItem value="medium">Medium</select_1.SelectItem>
                      <select_1.SelectItem value="large">Large</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
              </div>
            </div>);
                }
                // Define style property keywords
                const isStyleProperty = (propName) => {
                    const styleKeywords = [
                        'color', 'background', 'padding', 'margin', 'width', 'height',
                        'size', 'variant', 'align', 'weight', 'border', 'shadow',
                        'opacity', 'radius', 'rounded', 'spacing', 'gap', 'font'
                    ];
                    const lowerProp = propName.toLowerCase();
                    return styleKeywords.some(keyword => lowerProp.includes(keyword));
                };
                // For block components, show actual style properties from the block config
                const styleProperties = Object.entries(blockConfig).filter(([key, config]) => {
                    // Filter for style-related properties using keywords
                    return isStyleProperty(key) && key !== 'className';
                });
                if (styleProperties.length === 0) {
                    return (<div className="space-y-4">
              <div className="text-center text-muted-foreground py-8">
                <p>No editable style properties for this block.</p>
                <p className="mt-2">Block styles are predefined in the block design.</p>
                <p className="mt-2">To change styles, select a different block variant.</p>
              </div>
            </div>);
                }
                return (<div className="space-y-4">
            <div className="text-center text-muted-foreground py-2">
              <p>Edit block styles</p>
            </div>
            
            <div className="space-y-4">
              {styleProperties.map(([key, config]) => (<div key={key} className="space-y-2">
                  <label_1.Label htmlFor={key}>{config.label}</label_1.Label>
                  {renderPropertyInput(key, config, componentProps[key])}
                </div>))}
            </div>
          </div>);
            default:
                return (<div className="text-center text-muted-foreground py-8">
            <p>Select a component to edit its style properties</p>
          </div>);
        }
    };
    // Add layout properties function
    const getLayoutProperties = () => {
        if (!layoutOptions || !onLayoutOptionsChange) {
            return (<div className="text-center text-muted-foreground py-8">
          <p>Layout options not available</p>
        </div>);
        }
        // Create a wrapper function to convert the signature
        const handleLayoutChange = (newOptions) => {
            onLayoutOptionsChange(newOptions);
        };
        return (<div className="space-y-4">
        <layout_component_1.LayoutComponent showHeader={layoutOptions.showHeader} showFooter={layoutOptions.showFooter} fullWidth={layoutOptions.fullWidth} backgroundColor={layoutOptions.backgroundColor} showTitle={layoutOptions.showTitle} onLayoutChange={handleLayoutChange}/>
      </div>);
    };
    const renderPropertyInput = (key, propConfig, value) => {
        switch (propConfig.type) {
            case 'text':
                return (<input_1.Input id={key} value={value || ''} onChange={(e) => updateProp(key, e.target.value)}/>);
            case 'textarea':
                return (<textarea_1.Textarea id={key} value={value || ''} onChange={(e) => updateProp(key, e.target.value)}/>);
            case 'number':
                return (<input_1.Input id={key} type="number" value={value || ''} onChange={(e) => updateProp(key, parseFloat(e.target.value) || 0)}/>);
            case 'boolean':
                return (<div className="flex items-center space-x-2">
            <checkbox_1.Checkbox id={key} checked={value || false} onCheckedChange={(checked) => updateProp(key, checked)}/>
            <label_1.Label htmlFor={key}>{propConfig.label}</label_1.Label>
          </div>);
            case 'color':
                return (<div className="flex items-center space-x-2">
            <input_1.Input id={key} type="color" value={value || '#000000'} onChange={(e) => updateProp(key, e.target.value)} className="w-16 h-10 p-1"/>
            <input_1.Input type="text" value={value || '#000000'} onChange={(e) => updateProp(key, e.target.value)} className="flex-1"/>
          </div>);
            case 'select':
                return (<select_1.Select value={value || propConfig.options?.[0] || ''} onValueChange={(newValue) => updateProp(key, newValue)}>
            <select_1.SelectTrigger>
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              {propConfig.options?.map((option) => (<select_1.SelectItem key={option} value={option}>
                  {option}
                </select_1.SelectItem>))}
            </select_1.SelectContent>
          </select_1.Select>);
            case 'image':
                return (<div className="space-y-1">
            <label_1.Label className="text-xs text-gray-600">{propConfig.label}</label_1.Label>

            {value ? (<div className="relative group">
                <img src={value} alt="" className="w-full h-32 object-cover rounded border"/>
                <button onClick={() => updateProp(key, "")} className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs px-2 opacity-80 hover:opacity-100">
                  <lucide_react_1.X className="h-3 w-3"/>
                </button>
              </div>) : (<div className="border border-dashed rounded p-3 text-center text-xs text-gray-500">
                No image selected
              </div>)}

            <button_1.Button onClick={() => setMediaModalOpen(prev => ({ ...prev, [key]: true }))} className="text-xs text-blue-600 underline" variant="link" size="sm">
              Select Image
            </button_1.Button>

            <dialog_1.Dialog open={mediaModalOpen[key] || false} onOpenChange={(open) => setMediaModalOpen(prev => ({ ...prev, [key]: open }))}>
              <dialog_1.DialogContent className="max-w-4xl max-h-[80vh]">
                <dialog_1.DialogHeader>
                  <dialog_1.DialogTitle>Select Image</dialog_1.DialogTitle>
                </dialog_1.DialogHeader>
                <media_library_1.MediaLibrary onMediaSelect={(media) => {
                        updateProp(key, media.url);
                        setMediaModalOpen(prev => ({ ...prev, [key]: false }));
                    }}/>
              </dialog_1.DialogContent>
            </dialog_1.Dialog>
          </div>);
            case 'list':
                const list = value || [];
                return (<div className="space-y-3">
            {list.map((item, index) => (<div key={index} className="border p-3 rounded bg-gray-50 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-gray-600">
                    {propConfig.label} #{index + 1}
                  </h4>
                  <button_1.Button variant="ghost" size="sm" onClick={() => {
                            const updated = list.filter((_, i) => i !== index);
                            updateProp(key, updated);
                        }} className="text-red-500 hover:text-red-700 h-6 w-6 p-0">
                    ×
                  </button_1.Button>
                </div>
                {propConfig.itemSchema && Object.entries(propConfig.itemSchema).map(([subKey, subConfig]) => (<div key={subKey}>
                    <label_1.Label className="text-xs text-gray-500">{subConfig.label}</label_1.Label>
                    {renderPropertyInput(`${key}.${index}.${subKey}`, subConfig, item[subKey])}
                  </div>))}
              </div>))}
            <button_1.Button variant="outline" size="sm" onClick={() => {
                        const newItem = {};
                        if (propConfig.itemSchema) {
                            Object.entries(propConfig.itemSchema).forEach(([subKey, subConfig]) => {
                                newItem[subKey] = subConfig.defaultValue || '';
                            });
                        }
                        const updated = [...list, newItem];
                        updateProp(key, updated);
                    }} className="w-full">
              + Add New Item
            </button_1.Button>
          </div>);
            default:
                return (<input_1.Input id={key} value={value || ''} onChange={(e) => updateProp(key, e.target.value)}/>);
        }
    };
    return (<card_1.Card className="h-full flex flex-col">
      <card_1.CardHeader>
        <card_1.CardTitle>
          {componentType ? `${componentType.charAt(0).toUpperCase() + componentType.slice(1)} Properties` : 'Page Properties'}
          {isLocked && <lucide_react_1.Lock className="inline-block ml-2 h-4 w-4"/>}
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="flex-1 overflow-auto">
        {/* Move buttons at the top */}
        {(onMoveUp || onMoveDown) && (<div className="flex justify-center gap-2 mb-4">
            <button_1.Button variant="outline" size="sm" onClick={onMoveUp} disabled={!canMoveUp} className="flex items-center gap-1">
              <lucide_react_1.ArrowUp className="h-4 w-4"/>
              Move Up
            </button_1.Button>
            <button_1.Button variant="outline" size="sm" onClick={onMoveDown} disabled={!canMoveDown} className="flex items-center gap-1">
              <lucide_react_1.ArrowDown className="h-4 w-4"/>
              Move Down
            </button_1.Button>
          </div>)}
        
        {/* Tabbed interface for Content, Style, and Layout */}
        {componentType || layoutOptions ? (<tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <tabs_1.TabsList className="grid w-full grid-cols-2">
              <tabs_1.TabsTrigger value="content">Content</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value="style">Style</tabs_1.TabsTrigger>
            </tabs_1.TabsList>
            <tabs_1.TabsContent value="content" className="mt-4">
              {isLocked ? (<alert_1.Alert>
                  <lucide_react_1.Lock className="h-4 w-4"/>
                  <alert_1.AlertDescription>
                    This component is locked. Unlock it to make changes.
                  </alert_1.AlertDescription>
                </alert_1.Alert>) : (getContentProperties())}
            </tabs_1.TabsContent>
            <tabs_1.TabsContent value="style" className="mt-4">
              {isLocked ? (<alert_1.Alert>
                  <lucide_react_1.Lock className="h-4 w-4"/>
                  <alert_1.AlertDescription>
                    This component is locked. Unlock it to make changes.
                  </alert_1.AlertDescription>
                </alert_1.Alert>) : (getStyleProperties())}
            </tabs_1.TabsContent>
          </tabs_1.Tabs>) : (<div className="text-center text-muted-foreground py-8">
            <p>Select a component to edit its properties</p>
          </div>)}
      </card_1.CardContent>
    </card_1.Card>);
};
exports.PropertiesPanel = PropertiesPanel;
exports.default = exports.PropertiesPanel;
//# sourceMappingURL=properties-panel.js.map