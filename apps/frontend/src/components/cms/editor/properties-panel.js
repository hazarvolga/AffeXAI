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
exports.PropertiesPanel = void 0;
const react_1 = __importStar(require("react"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const image_1 = __importDefault(require("next/image"));
const MediaPicker_1 = __importDefault(require("@/components/media/MediaPicker"));
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
const skeleton_1 = require("@/components/loading/skeleton");
const use_toast_1 = require("@/hooks/use-toast");
// Lazy load MediaLibrary - only loaded when media selector is opened
const MediaLibrary = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('@/components/cms/editor/media-library'))).then(mod => ({ default: mod.MediaLibrary })), {
    loading: () => <skeleton_1.Skeleton className="h-[400px] w-full"/>,
    ssr: false,
});
const PropertiesPanel = ({ componentType, componentProps, onPropsChange, isLocked = false, onMoveUp, onMoveDown, canMoveUp = true, canMoveDown = true, }) => {
    const [localProps, setLocalProps] = (0, react_1.useState)(componentProps);
    const [activeTab, setActiveTab] = (0, react_1.useState)('content');
    const [mediaModalOpen, setMediaModalOpen] = (0, react_1.useState)({});
    const [loadingMedia, setLoadingMedia] = (0, react_1.useState)({});
    const { toast } = (0, use_toast_1.useToast)();
    // Normalize component type - detect if it's a block component
    const normalizedComponentType = (() => {
        const knownTypes = ['text', 'button', 'image', 'video', 'container', 'gallery'];
        // If it's a known basic type, return as is
        if (knownTypes.includes(componentType)) {
            return componentType;
        }
        // If it's not a known type, it's likely a block component (nav-logo-cta, hero-split, etc.)
        // Check if componentProps has blockId or if componentType looks like a block ID
        if (componentType.includes('-') || componentProps.blockId) {
            return 'block';
        }
        // Fallback to original type
        return componentType;
    })();
    (0, react_1.useEffect)(() => {
        setLocalProps(componentProps);
    }, [componentProps]);
    const updateProp = (key, value) => {
        // Don't allow changes to locked components
        if (isLocked)
            return;
        let newProps = { ...localProps };
        // Handle nested properties (for list items)
        if (key.includes('.')) {
            const parts = key.split('.');
            if (parts.length === 3) {
                // Format: "items.0.question" - updating a specific item in a list
                const [listKey, indexStr, itemKey] = parts;
                const index = parseInt(indexStr, 10);
                // Create a copy of the list
                const list = [...(newProps[listKey] || [])];
                // Update the specific item
                if (list[index]) {
                    list[index] = { ...list[index], [itemKey]: value };
                }
                else {
                    // Create the item if it doesn't exist
                    list[index] = { [itemKey]: value };
                }
                newProps = { ...newProps, [listKey]: list };
            }
        }
        else {
            // Regular property update
            newProps = { ...newProps, [key]: value };
        }
        setLocalProps(newProps);
        onPropsChange(newProps);
    };
    // ============================================================================
    // CONTENT PROPERTIES (What to display)
    // ============================================================================
    const renderTextContentProperties = () => (<div className="space-y-4">
      <div className="space-y-2">
        <label_1.Label htmlFor="content">Content</label_1.Label>
        <textarea_1.Textarea id="content" value={localProps.content || ''} onChange={(e) => updateProp('content', e.target.value)} disabled={isLocked} rows={4}/>
      </div>
    </div>);
    // ============================================================================
    // STYLE PROPERTIES (How to style)
    // ============================================================================
    const renderTextStyleProperties = () => (<div className="space-y-4">
      <div className="space-y-2">
        <label_1.Label htmlFor="variant">Typography Variant</label_1.Label>
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
        <label_1.Label htmlFor="align">Text Alignment</label_1.Label>
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
        <label_1.Label htmlFor="color">Text Color</label_1.Label>
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

      <div className="space-y-2">
        <label_1.Label htmlFor="weight">Font Weight</label_1.Label>
        <select_1.Select value={localProps.weight || 'normal'} onValueChange={(value) => updateProp('weight', value)} disabled={isLocked}>
          <select_1.SelectTrigger>
            <select_1.SelectValue />
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectItem value="light">Light</select_1.SelectItem>
            <select_1.SelectItem value="normal">Normal</select_1.SelectItem>
            <select_1.SelectItem value="medium">Medium</select_1.SelectItem>
            <select_1.SelectItem value="semibold">Semibold</select_1.SelectItem>
            <select_1.SelectItem value="bold">Bold</select_1.SelectItem>
          </select_1.SelectContent>
        </select_1.Select>
      </div>
    </div>);
    // Backward compatibility wrapper
    const renderTextProperties = () => renderTextContentProperties();
    const renderButtonContentProperties = () => (<div className="space-y-4">
      <div className="space-y-2">
        <label_1.Label htmlFor="text">Button Text</label_1.Label>
        <input_1.Input id="text" value={localProps.text || ''} onChange={(e) => updateProp('text', e.target.value)} disabled={isLocked}/>
      </div>
      
      <div className="space-y-2">
        <label_1.Label htmlFor="href">Link URL (optional)</label_1.Label>
        <input_1.Input id="href" value={localProps.href || ''} onChange={(e) => updateProp('href', e.target.value)} placeholder="https://example.com or /page" disabled={isLocked}/>
      </div>
    </div>);
    const renderButtonStyleProperties = () => (<div className="space-y-4">
      <div className="space-y-2">
        <label_1.Label htmlFor="variant">Button Variant</label_1.Label>
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
        <label_1.Label htmlFor="size">Button Size</label_1.Label>
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
        <label_1.Label htmlFor="disabled">Disabled State</label_1.Label>
      </div>
    </div>);
    // Backward compatibility wrapper
    const renderButtonProperties = () => renderButtonContentProperties();
    const renderImageContentProperties = () => (<div className="space-y-4">
      {/* Media Picker */}
      <div className="space-y-2">
        <label_1.Label>Image</label_1.Label>
        <MediaPicker_1.default value={localProps.mediaId || null} onChange={async (mediaId) => {
            if (mediaId) {
                setLoadingMedia({ ...loadingMedia, image: true });
                try {
                    const res = await fetch(`/api/media/${mediaId}`);
                    if (!res.ok)
                        throw new Error('Failed to fetch media');
                    const media = await res.json();
                    updateProp('mediaId', mediaId);
                    updateProp('src', media.url);
                    if (!localProps.alt) {
                        updateProp('alt', media.title || media.originalName);
                    }
                    toast({
                        title: "Image selected",
                        description: media.title || media.originalName,
                    });
                }
                catch (err) {
                    console.error('Failed to fetch media:', err);
                    toast({
                        title: "Error",
                        description: "Failed to load image. Please try again.",
                        variant: "destructive",
                    });
                }
                finally {
                    setLoadingMedia({ ...loadingMedia, image: false });
                }
            }
            else {
                updateProp('mediaId', null);
                updateProp('src', '');
            }
        }} placeholder="Select an image"/>
        {loadingMedia.image && (<div className="flex items-center gap-2 text-sm text-muted-foreground">
            <lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>
            Loading image...
          </div>)}
      </div>

      {/* Preview */}
      {localProps.src && (<div className="space-y-2">
          <label_1.Label>Preview</label_1.Label>
          <div className="relative w-full h-48 border rounded-md overflow-hidden bg-muted">
            <image_1.default src={localProps.src} alt={localProps.alt || 'Image preview'} fill className="object-contain"/>
          </div>
        </div>)}
      
      {/* Manual URL Input (fallback) */}
      <div className="space-y-2">
        <label_1.Label htmlFor="src">Image URL (Manual)</label_1.Label>
        <input_1.Input id="src" value={localProps.src || ''} onChange={(e) => updateProp('src', e.target.value)} disabled={isLocked} placeholder="https://example.com/image.jpg"/>
        <p className="text-xs text-muted-foreground">
          Or use the media picker above
        </p>
      </div>
      
      <div className="space-y-2">
        <label_1.Label htmlFor="alt">Alt Text</label_1.Label>
        <input_1.Input id="alt" value={localProps.alt || ''} onChange={(e) => updateProp('alt', e.target.value)} disabled={isLocked} placeholder="Describe the image"/>
      </div>
      
      <div className="space-y-2">
        <label_1.Label htmlFor="caption">Caption (optional)</label_1.Label>
        <input_1.Input id="caption" value={localProps.caption || ''} onChange={(e) => updateProp('caption', e.target.value)} disabled={isLocked} placeholder="Image caption"/>
      </div>
    </div>);
    const renderImageStyleProperties = () => (<div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label_1.Label htmlFor="width">Width</label_1.Label>
          <input_1.Input type="text" id="width" value={localProps.width || ''} onChange={(e) => updateProp('width', e.target.value)} disabled={isLocked} placeholder="auto or 500px"/>
        </div>
        
        <div className="space-y-2">
          <label_1.Label htmlFor="height">Height</label_1.Label>
          <input_1.Input type="text" id="height" value={localProps.height || ''} onChange={(e) => updateProp('height', e.target.value)} disabled={isLocked} placeholder="auto or 300px"/>
        </div>
      </div>

      <div className="space-y-2">
        <label_1.Label htmlFor="objectFit">Object Fit</label_1.Label>
        <select_1.Select value={localProps.objectFit || 'cover'} onValueChange={(value) => updateProp('objectFit', value)} disabled={isLocked}>
          <select_1.SelectTrigger>
            <select_1.SelectValue />
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectItem value="cover">Cover</select_1.SelectItem>
            <select_1.SelectItem value="contain">Contain</select_1.SelectItem>
            <select_1.SelectItem value="fill">Fill</select_1.SelectItem>
            <select_1.SelectItem value="none">None</select_1.SelectItem>
          </select_1.SelectContent>
        </select_1.Select>
      </div>

      <div className="space-y-2">
        <label_1.Label htmlFor="rounded">Border Radius</label_1.Label>
        <select_1.Select value={localProps.rounded || 'none'} onValueChange={(value) => updateProp('rounded', value)} disabled={isLocked}>
          <select_1.SelectTrigger>
            <select_1.SelectValue />
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectItem value="none">None</select_1.SelectItem>
            <select_1.SelectItem value="sm">Small</select_1.SelectItem>
            <select_1.SelectItem value="md">Medium</select_1.SelectItem>
            <select_1.SelectItem value="lg">Large</select_1.SelectItem>
            <select_1.SelectItem value="full">Full (Circle)</select_1.SelectItem>
          </select_1.SelectContent>
        </select_1.Select>
      </div>
    </div>);
    // Backward compatibility wrapper
    const renderImageProperties = () => renderImageContentProperties();
    const renderContainerContentProperties = () => (<div className="text-center text-muted-foreground py-8">
      <p>Container has no editable content</p>
      <p className="text-sm mt-2">Containers hold other components</p>
    </div>);
    const renderContainerStyleProperties = () => (<div className="space-y-4">
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
    // Backward compatibility wrapper
    const renderContainerProperties = () => renderContainerContentProperties();
    /**
     * BLOCK COMPONENT PROPERTIES
     * Blocks have dynamic properties based on blockId
     * We categorize them into Content and Style properties
     */
    // Content properties keywords
    const isContentProperty = (propName) => {
        const contentKeywords = [
            'text', 'title', 'subtitle', 'description', 'content',
            'url', 'href', 'link', 'alt', 'caption', 'author', 'role',
            'items', 'nav', 'cta', 'button', 'logo', 'social',
            'heading', 'subheading', 'label', 'placeholder', 'name',
            'email', 'phone', 'address', 'company', 'position', 'type'
        ];
        const lowerProp = propName.toLowerCase();
        return contentKeywords.some(keyword => lowerProp.includes(keyword));
    };
    // Style properties keywords
    const isStyleProperty = (propName) => {
        const styleKeywords = [
            'color', 'background', 'padding', 'margin', 'width', 'height',
            'size', 'variant', 'align', 'weight', 'border', 'shadow',
            'opacity', 'radius', 'rounded', 'spacing', 'gap', 'font'
        ];
        const lowerProp = propName.toLowerCase();
        return styleKeywords.some(keyword => lowerProp.includes(keyword));
    };
    // Helper function to render a single property input (moved to component level)
    const renderPropertyInput = (key, propConfig, value) => {
        // Special handling for mediaId fields (logoMediaId, imageMediaId, etc.)
        if (key.toLowerCase().includes('mediaid')) {
            // Determine the corresponding URL field name (logoMediaId -> logoUrl, imageMediaId -> imageUrl)
            const urlFieldName = key.replace(/MediaId$/i, 'Url').replace(/mediaid$/i, 'url');
            const currentUrl = localProps[urlFieldName];
            return (<div className="space-y-2">
          <div className="border rounded-lg p-3 bg-gray-50">
            <MediaPicker_1.default value={value || undefined} onChange={async (mediaId) => {
                    if (mediaId) {
                        // Update mediaId
                        updateProp(key, mediaId);
                        // Fetch and update corresponding URL field
                        try {
                            const response = await fetch(`/api/media/${mediaId}`);
                            if (!response.ok) {
                                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                            }
                            const data = await response.json();
                            if (data.url) {
                                updateProp(urlFieldName, data.url);
                            }
                            else {
                                throw new Error('Media URL not found in response');
                            }
                        }
                        catch (err) {
                            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                            console.error('Error fetching media URL:', errorMessage, err);
                            toast({
                                title: 'Error',
                                description: `Failed to load media URL: ${errorMessage}`,
                                variant: 'destructive',
                            });
                        }
                    }
                    else {
                        // Clear both mediaId and URL
                        updateProp(key, null);
                        updateProp(urlFieldName, '');
                    }
                }} placeholder={`Select ${propConfig.label || 'media'}`}/>
          </div>
          {currentUrl && (<div className="relative group">
              <image_1.default src={currentUrl} alt="Preview" width={300} height={128} className="w-full h-32 object-contain rounded border bg-white"/>
              <button onClick={() => {
                        updateProp(key, null);
                        updateProp(urlFieldName, '');
                    }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100" disabled={isLocked}>
                <lucide_react_1.X className="h-3 w-3"/>
              </button>
            </div>)}
          {value && (<div className="text-xs text-muted-foreground">
              Media ID: {value}
            </div>)}
        </div>);
        }
        switch (propConfig.type) {
            case 'text':
                return (<input_1.Input id={key} value={value || ''} onChange={(e) => updateProp(key, e.target.value)} disabled={isLocked}/>);
            case 'textarea':
                return (<textarea_1.Textarea id={key} value={value || ''} onChange={(e) => updateProp(key, e.target.value)} disabled={isLocked}/>);
            case 'number':
                return (<input_1.Input id={key} type="number" value={value || ''} onChange={(e) => updateProp(key, parseFloat(e.target.value) || 0)} disabled={isLocked}/>);
            case 'boolean':
                return (<div className="flex items-center space-x-2">
            <checkbox_1.Checkbox id={key} checked={value || false} onCheckedChange={(checked) => updateProp(key, checked)} disabled={isLocked}/>
            <label_1.Label htmlFor={key}>{propConfig.label}</label_1.Label>
          </div>);
            case 'color':
                return (<div className="flex items-center space-x-2">
            <input_1.Input id={key} type="color" value={value || '#000000'} onChange={(e) => updateProp(key, e.target.value)} className="w-16 h-10 p-1" disabled={isLocked}/>
            <input_1.Input type="text" value={value || '#000000'} onChange={(e) => updateProp(key, e.target.value)} className="flex-1" disabled={isLocked}/>
          </div>);
            case 'select':
                return (<select_1.Select value={value || propConfig.options?.[0] || ''} onValueChange={(newValue) => updateProp(key, newValue)} disabled={isLocked}>
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
                // Special handling for logo images - use MediaPicker
                if (key.toLowerCase().includes('logo')) {
                    return (<div className="space-y-2">
              <div className="border rounded-lg p-3 bg-gray-50">
                <MediaPicker_1.default value={undefined} onChange={(mediaId) => {
                            if (mediaId) {
                                fetch(`/api/media/${mediaId}`)
                                    .then(res => res.json())
                                    .then(data => {
                                    if (data.url) {
                                        updateProp(key, data.url);
                                    }
                                })
                                    .catch(err => console.error('Error fetching media URL:', err));
                            }
                            else {
                                updateProp(key, '');
                            }
                        }} placeholder="Select logo image" filterType="image"/>
              </div>
              {value && (<div className="relative group">
                  <image_1.default src={value} alt="Logo preview" width={300} height={128} className="w-full h-32 object-contain rounded border bg-white"/>
                  <button onClick={() => updateProp(key, "")} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100" disabled={isLocked}>
                    <lucide_react_1.X className="h-3 w-3"/>
                  </button>
                </div>)}
            </div>);
                }
                // Default image handling
                return (<div className="space-y-1">
            <label_1.Label className="text-xs text-gray-600">{propConfig.label}</label_1.Label>
            {value ? (<div className="relative group">
                <image_1.default src={value} alt="Property image" width={300} height={128} className="w-full h-32 object-cover rounded border"/>
                <button onClick={() => updateProp(key, "")} className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs px-2 opacity-80 hover:opacity-100" disabled={isLocked}>
                  <lucide_react_1.X className="h-3 w-3"/>
                </button>
              </div>) : (<div className="border border-dashed rounded p-3 text-center text-xs text-gray-500">
                No image selected
              </div>)}
            <button_1.Button onClick={() => setMediaModalOpen(prev => ({ ...prev, [key]: true }))} className="text-xs text-blue-600 underline" variant="link" size="sm" disabled={isLocked}>
              Select Image
            </button_1.Button>
            <dialog_1.Dialog open={mediaModalOpen[key] || false} onOpenChange={(open) => setMediaModalOpen(prev => ({ ...prev, [key]: open }))}>
              <dialog_1.DialogContent className="max-w-4xl max-h-[80vh]">
                <dialog_1.DialogHeader>
                  <dialog_1.DialogTitle>Select Image</dialog_1.DialogTitle>
                </dialog_1.DialogHeader>
                <MediaLibrary onMediaSelect={(media) => {
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
                        }} className="text-red-500 hover:text-red-700 h-6 w-6 p-0" disabled={isLocked}>
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
                    }} className="w-full" disabled={isLocked}>
              + Add New Item
            </button_1.Button>
          </div>);
            default:
                return (<input_1.Input id={key} value={value || ''} onChange={(e) => updateProp(key, e.target.value)} disabled={isLocked}/>);
        }
    };
    const renderBlockContentProperties = () => {
        // Block ID is the original componentType (e.g., "nav-logo-cta", "hero-split")
        const blockId = componentType;
        if (!blockId) {
            return (<div className="text-center text-muted-foreground py-8">
          <p>Block ID not found</p>
        </div>);
        }
        // Get block configuration from allBlockConfigs
        const blockConfig = block_configs_1.allBlockConfigs[blockId];
        if (!blockConfig) {
            return (<div className="text-center text-muted-foreground py-8">
          <p>Block configuration not found for: {blockId}</p>
        </div>);
        }
        // Get all content properties from block config (not just from localProps)
        const contentPropertyKeys = Object.keys(blockConfig).filter(key => {
            // Exclude style properties and className
            if (isStyleProperty(key) || key === 'className')
                return false;
            // Exclude URL fields if corresponding mediaId field exists
            // (logoUrl hidden if logoMediaId exists, imageUrl hidden if imageMediaId exists)
            if (key.toLowerCase().endsWith('url')) {
                const mediaIdKey = key.replace(/Url$/i, 'MediaId');
                if (blockConfig[mediaIdKey]) {
                    return false; // Hide URL field, use MediaPicker via mediaId instead
                }
            }
            return true;
        });
        if (contentPropertyKeys.length === 0) {
            return (<div className="text-center text-muted-foreground py-8">
          <p>No content properties</p>
          <p className="text-sm mt-2">This block is style-only</p>
        </div>);
        }
        return (<div className="space-y-4">
        <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          Block: {blockId}
        </div>
        
        {/* Render all properties from block config */}
        {contentPropertyKeys.map(propKey => {
                const propConfig = blockConfig[propKey];
                const propValue = localProps[propKey] !== undefined ? localProps[propKey] : propConfig.defaultValue;
                return (<div key={propKey} className="space-y-2">
              <label_1.Label htmlFor={propKey} className="text-sm font-medium">
                {propConfig.label || propKey.replace(/([A-Z])/g, ' $1').trim()}
              </label_1.Label>
              {renderPropertyInput(propKey, propConfig, propValue)}
            </div>);
            })}
      </div>);
    };
    const renderBlockStyleProperties = () => {
        // Block ID is the original componentType (e.g., "nav-logo-cta", "hero-split")
        const blockId = componentType;
        if (!blockId) {
            return (<div className="text-center text-muted-foreground py-8">
          <p>Block ID not found</p>
        </div>);
        }
        // Get block configuration from allBlockConfigs
        const blockConfig = block_configs_1.allBlockConfigs[blockId];
        if (!blockConfig) {
            return (<div className="text-center text-muted-foreground py-8">
          <p>Block configuration not found for: {blockId}</p>
        </div>);
        }
        // Filter style properties from block configuration (not just from localProps)
        const stylePropertyKeys = Object.keys(blockConfig).filter(key => isStyleProperty(key) && key !== 'className');
        if (stylePropertyKeys.length === 0) {
            return (<div className="text-center text-muted-foreground py-8">
          <p>No style properties</p>
          <p className="text-sm mt-2">Use Advanced tab for styling</p>
        </div>);
        }
        return (<div className="space-y-4">
        <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          Block: {blockId}
        </div>
        {stylePropertyKeys.map(propKey => {
                const propConfig = blockConfig[propKey];
                const propValue = localProps[propKey] !== undefined ? localProps[propKey] : propConfig.defaultValue;
                // Skip undefined/null values
                if (propValue === undefined || propValue === null)
                    return null;
                // Handle color
                if (propKey.toLowerCase().includes('color')) {
                    return (<div key={propKey} className="space-y-2">
                <label_1.Label htmlFor={propKey}>
                  {propConfig.label || propKey.replace(/([A-Z])/g, ' $1').trim()}
                </label_1.Label>
                <div className="flex gap-2">
                  <input_1.Input id={propKey} type="color" value={String(propValue)} onChange={(e) => updateProp(propKey, e.target.value)} disabled={isLocked} className="w-16 h-10"/>
                  <input_1.Input type="text" value={String(propValue)} onChange={(e) => updateProp(propKey, e.target.value)} disabled={isLocked} placeholder="#000000"/>
                </div>
              </div>);
                }
                // Handle number
                if (typeof propValue === 'number') {
                    return (<div key={propKey} className="space-y-2">
                <label_1.Label htmlFor={propKey}>
                  {propConfig.label || propKey.replace(/([A-Z])/g, ' $1').trim()}
                </label_1.Label>
                <input_1.Input id={propKey} type="number" value={propValue} onChange={(e) => updateProp(propKey, Number(e.target.value))} disabled={isLocked}/>
              </div>);
                }
                // Handle boolean
                if (typeof propValue === 'boolean') {
                    return (<div key={propKey} className="flex items-center space-x-2">
                <checkbox_1.Checkbox id={propKey} checked={propValue} onCheckedChange={(checked) => updateProp(propKey, checked)} disabled={isLocked}/>
                <label_1.Label htmlFor={propKey} className="text-sm">
                  {propConfig.label || propKey.replace(/([A-Z])/g, ' $1').trim()}
                </label_1.Label>
              </div>);
                }
                // Handle select
                if (propConfig.type === 'select' && propConfig.options) {
                    return (<div key={propKey} className="space-y-2">
                <label_1.Label htmlFor={propKey}>
                  {propConfig.label || propKey.replace(/([A-Z])/g, ' $1').trim()}
                </label_1.Label>
                <select_1.Select value={String(propValue)} onValueChange={(value) => updateProp(propKey, value)} disabled={isLocked}>
                  <select_1.SelectTrigger>
                    <select_1.SelectValue />
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    {propConfig.options.map((option) => (<select_1.SelectItem key={option} value={option}>
                        {option}
                      </select_1.SelectItem>))}
                  </select_1.SelectContent>
                </select_1.Select>
              </div>);
                }
                // Default: text input
                return (<div key={propKey} className="space-y-2">
              <label_1.Label htmlFor={propKey}>
                {propConfig.label || propKey.replace(/([A-Z])/g, ' $1').trim()}
              </label_1.Label>
              <input_1.Input id={propKey} type="text" value={String(propValue)} onChange={(e) => updateProp(propKey, e.target.value)} disabled={isLocked}/>
            </div>);
            })}
      </div>);
    };
    const renderGalleryProperties = () => {
        const items = localProps.items || [];
        const addItem = () => {
            const newItems = [
                ...items,
                {
                    mediaId: null,
                    image: '/placeholder-image.jpg',
                    title: `Item ${items.length + 1}`,
                    caption: '',
                },
            ];
            updateProp('items', newItems);
        };
        const removeItem = (index) => {
            const newItems = items.filter((_, i) => i !== index);
            updateProp('items', newItems);
        };
        const updateItem = (index, field, value) => {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], [field]: value };
            updateProp('items', newItems);
        };
        const moveItem = (fromIndex, toIndex) => {
            if (toIndex < 0 || toIndex >= items.length)
                return;
            const newItems = [...items];
            const [movedItem] = newItems.splice(fromIndex, 1);
            newItems.splice(toIndex, 0, movedItem);
            updateProp('items', newItems);
        };
        return (<div className="space-y-4">
        {/* Gallery Title */}
        <div className="space-y-2">
          <label_1.Label htmlFor="title">Gallery Title</label_1.Label>
          <input_1.Input id="title" value={localProps.title || ''} onChange={(e) => updateProp('title', e.target.value)} disabled={isLocked} placeholder="Featured Highlights"/>
        </div>

        {/* Gallery Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label_1.Label>Gallery Items ({items.length})</label_1.Label>
            <button_1.Button type="button" size="sm" variant="outline" onClick={addItem} disabled={isLocked} className="h-8">
              <lucide_react_1.Plus className="h-4 w-4 mr-1"/>
              Add Image
            </button_1.Button>
          </div>

          {items.length === 0 && (<div className="text-center py-8 border-2 border-dashed rounded-lg">
              <lucide_react_1.Image className="h-12 w-12 mx-auto text-muted-foreground mb-2"/>
              <p className="text-sm text-muted-foreground">No images yet</p>
              <button_1.Button type="button" size="sm" variant="outline" onClick={addItem} disabled={isLocked} className="mt-2">
                <lucide_react_1.Plus className="h-4 w-4 mr-1"/>
                Add First Image
              </button_1.Button>
            </div>)}

          {items.map((item, index) => (<div key={index} className="border rounded-lg p-3 space-y-3 bg-muted/50">
              {/* Item Header with Drag Handle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <lucide_react_1.GripVertical className="h-4 w-4 text-muted-foreground cursor-move"/>
                  <span className="text-sm font-medium">Image {index + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button_1.Button type="button" size="sm" variant="ghost" onClick={() => moveItem(index, index - 1)} disabled={isLocked || index === 0} className="h-7 w-7 p-0">
                    <lucide_react_1.ArrowUp className="h-3 w-3"/>
                  </button_1.Button>
                  <button_1.Button type="button" size="sm" variant="ghost" onClick={() => moveItem(index, index + 1)} disabled={isLocked || index === items.length - 1} className="h-7 w-7 p-0">
                    <lucide_react_1.ArrowDown className="h-3 w-3"/>
                  </button_1.Button>
                  <button_1.Button type="button" size="sm" variant="ghost" onClick={() => removeItem(index)} disabled={isLocked} className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                    <lucide_react_1.Trash2 className="h-3 w-3"/>
                  </button_1.Button>
                </div>
              </div>

              {/* MediaPicker */}
              <div className="space-y-2">
                <label_1.Label>Image</label_1.Label>
                <MediaPicker_1.default value={item.mediaId || null} onChange={(mediaId) => {
                    if (mediaId) {
                        fetch(`/api/media/${mediaId}`)
                            .then((res) => res.json())
                            .then((media) => {
                            updateItem(index, 'mediaId', mediaId);
                            updateItem(index, 'image', media.url);
                            if (!item.title) {
                                updateItem(index, 'title', media.title || media.originalName);
                            }
                        })
                            .catch((err) => console.error('Failed to fetch media:', err));
                    }
                    else {
                        updateItem(index, 'mediaId', null);
                        updateItem(index, 'image', '');
                    }
                }} placeholder="Select an image"/>
              </div>

              {/* Preview */}
              {item.image && (<div className="relative w-full h-32 border rounded overflow-hidden bg-background">
                  <image_1.default src={item.image} alt={item.title || `Image ${index + 1}`} fill className="object-cover"/>
                </div>)}

              {/* Title */}
              <div className="space-y-2">
                <label_1.Label>Title</label_1.Label>
                <input_1.Input value={item.title || ''} onChange={(e) => updateItem(index, 'title', e.target.value)} disabled={isLocked} placeholder="Image title"/>
              </div>

              {/* Caption (optional) */}
              <div className="space-y-2">
                <label_1.Label>Caption (optional)</label_1.Label>
                <textarea_1.Textarea value={item.caption || ''} onChange={(e) => updateItem(index, 'caption', e.target.value)} disabled={isLocked} placeholder="Image caption or description" rows={2}/>
              </div>
            </div>))}
        </div>
      </div>);
    };
    const renderVideoProperties = () => (<div className="space-y-4">
      {/* Video Source */}
      <div className="space-y-2">
        <label_1.Label>Video</label_1.Label>
        <MediaPicker_1.default value={localProps.mediaId || null} onChange={async (mediaId) => {
            if (mediaId) {
                setLoadingMedia({ ...loadingMedia, video: true });
                try {
                    const res = await fetch(`/api/media/${mediaId}`);
                    if (!res.ok)
                        throw new Error('Failed to fetch media');
                    const media = await res.json();
                    updateProp('mediaId', mediaId);
                    updateProp('src', media.url);
                    if (!localProps.title) {
                        updateProp('title', media.title || media.originalName);
                    }
                    toast({
                        title: "Video selected",
                        description: media.title || media.originalName,
                    });
                }
                catch (err) {
                    console.error('Failed to fetch media:', err);
                    toast({
                        title: "Error",
                        description: "Failed to load video. Please try again.",
                        variant: "destructive",
                    });
                }
                finally {
                    setLoadingMedia({ ...loadingMedia, video: false });
                }
            }
            else {
                updateProp('mediaId', null);
                updateProp('src', '');
            }
        }} filterType="video" placeholder="Select a video"/>
        {loadingMedia.video && (<div className="flex items-center gap-2 text-sm text-muted-foreground">
            <lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>
            Loading video...
          </div>)}
      </div>

      {/* Video Preview */}
      {localProps.src && (<div className="space-y-2">
          <label_1.Label>Preview</label_1.Label>
          <div className="relative w-full border rounded-md overflow-hidden bg-black">
            <video src={localProps.src} poster={localProps.poster} controls className="w-full" style={{ maxHeight: '300px' }}>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>)}

      {/* Manual URL Input (fallback) */}
      <div className="space-y-2">
        <label_1.Label htmlFor="src">Video URL (Manual)</label_1.Label>
        <input_1.Input id="src" value={localProps.src || ''} onChange={(e) => updateProp('src', e.target.value)} disabled={isLocked} placeholder="https://example.com/video.mp4"/>
        <p className="text-xs text-muted-foreground">
          Or use the media picker above
        </p>
      </div>

      {/* Poster Image (Thumbnail) */}
      <div className="space-y-2">
        <label_1.Label>Poster Image (Thumbnail)</label_1.Label>
        <MediaPicker_1.default value={localProps.posterMediaId || null} onChange={async (mediaId) => {
            if (mediaId) {
                setLoadingMedia({ ...loadingMedia, poster: true });
                try {
                    const res = await fetch(`/api/media/${mediaId}`);
                    if (!res.ok)
                        throw new Error('Failed to fetch media');
                    const media = await res.json();
                    updateProp('posterMediaId', mediaId);
                    updateProp('poster', media.url);
                    toast({
                        title: "Poster image selected",
                        description: media.title || media.originalName,
                    });
                }
                catch (err) {
                    console.error('Failed to fetch media:', err);
                    toast({
                        title: "Error",
                        description: "Failed to load poster image. Please try again.",
                        variant: "destructive",
                    });
                }
                finally {
                    setLoadingMedia({ ...loadingMedia, poster: false });
                }
            }
            else {
                updateProp('posterMediaId', null);
                updateProp('poster', '');
            }
        }} filterType="image" placeholder="Select poster image"/>
        {loadingMedia.poster && (<div className="flex items-center gap-2 text-sm text-muted-foreground">
            <lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>
            Loading poster...
          </div>)}
      </div>

      {/* Poster Preview */}
      {localProps.poster && (<div className="space-y-2">
          <label_1.Label>Poster Preview</label_1.Label>
          <div className="relative w-full h-32 border rounded-md overflow-hidden bg-muted">
            <image_1.default src={localProps.poster} alt="Video poster" fill className="object-cover"/>
          </div>
        </div>)}

      {/* Title */}
      <div className="space-y-2">
        <label_1.Label htmlFor="title">Title</label_1.Label>
        <input_1.Input id="title" value={localProps.title || ''} onChange={(e) => updateProp('title', e.target.value)} disabled={isLocked} placeholder="Video title"/>
      </div>

      {/* Caption */}
      <div className="space-y-2">
        <label_1.Label htmlFor="caption">Caption (optional)</label_1.Label>
        <textarea_1.Textarea id="caption" value={localProps.caption || ''} onChange={(e) => updateProp('caption', e.target.value)} disabled={isLocked} placeholder="Video description" rows={2}/>
      </div>

      {/* Video Controls */}
      <div className="space-y-3 pt-3 border-t">
        <label_1.Label className="text-sm font-semibold">Playback Options</label_1.Label>
        
        <div className="flex items-center space-x-2">
          <checkbox_1.Checkbox id="controls" checked={localProps.controls !== false} onCheckedChange={(checked) => updateProp('controls', checked)} disabled={isLocked}/>
          <label_1.Label htmlFor="controls" className="font-normal cursor-pointer">
            Show controls
          </label_1.Label>
        </div>

        <div className="flex items-center space-x-2">
          <checkbox_1.Checkbox id="autoplay" checked={localProps.autoplay || false} onCheckedChange={(checked) => updateProp('autoplay', checked)} disabled={isLocked}/>
          <label_1.Label htmlFor="autoplay" className="font-normal cursor-pointer">
            Autoplay
          </label_1.Label>
        </div>

        <div className="flex items-center space-x-2">
          <checkbox_1.Checkbox id="loop" checked={localProps.loop || false} onCheckedChange={(checked) => updateProp('loop', checked)} disabled={isLocked}/>
          <label_1.Label htmlFor="loop" className="font-normal cursor-pointer">
            Loop video
          </label_1.Label>
        </div>

        <div className="flex items-center space-x-2">
          <checkbox_1.Checkbox id="muted" checked={localProps.muted || false} onCheckedChange={(checked) => updateProp('muted', checked)} disabled={isLocked}/>
          <label_1.Label htmlFor="muted" className="font-normal cursor-pointer">
            Muted by default
          </label_1.Label>
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t">
        <div className="space-y-2">
          <label_1.Label>Width</label_1.Label>
          <input_1.Input type="text" value={localProps.width || ''} onChange={(e) => updateProp('width', e.target.value)} disabled={isLocked} placeholder="100% or 800px"/>
        </div>

        <div className="space-y-2">
          <label_1.Label>Height</label_1.Label>
          <input_1.Input type="text" value={localProps.height || ''} onChange={(e) => updateProp('height', e.target.value)} disabled={isLocked} placeholder="auto or 450px"/>
        </div>
      </div>
    </div>);
    // ============================================================================
    // 3-TAB SYSTEM: Content | Style | Advanced
    // ============================================================================
    /**
     * TAB 1: CONTENT PROPERTIES
     * Purpose: "What to display?" - Semantic properties
     * Properties: title, subtitle, content, text, buttonText, imageUrl, mediaId,
     *            alt, caption, href, link, items[], author, role, etc.
     */
    const getContentProperties = () => {
        switch (normalizedComponentType) {
            case 'text':
                return renderTextProperties();
            case 'button':
                return renderButtonProperties();
            case 'image':
                return renderImageProperties();
            case 'video':
                return renderVideoProperties();
            case 'container':
                return renderContainerProperties();
            case 'block':
                // Block content properties - dynamic based on blockId
                return renderBlockContentProperties();
            default:
                return (<div className="text-center text-muted-foreground py-8">
            <p>Select a component to edit content</p>
          </div>);
        }
    };
    /**
     * TAB 2: STYLE PROPERTIES
     * Purpose: "How to style?" - Typography & visual styles
     * Properties: variant, align, color, weight, size, buttonVariant,
     *            imageWidth, imageHeight, typography props (titleVariant,
     *            titleAlign, titleColor, titleWeight, etc.)
     */
    const getStyleProperties = () => {
        switch (normalizedComponentType) {
            case 'text':
                return renderTextStyleProperties();
            case 'button':
                return renderButtonStyleProperties();
            case 'image':
                return renderImageStyleProperties();
            case 'container':
                return renderContainerStyleProperties();
            case 'block':
                // Block styling properties - dynamic based on blockId
                return renderBlockStyleProperties();
            default:
                return (<div className="text-center text-muted-foreground py-8">
            <p>Select a component to edit styles</p>
          </div>);
        }
    };
    /**
     * TAB 3: ADVANCED PROPERTIES
     * Purpose: "Layout & advanced styling" - Developer features
     * Properties: margin, padding, width, height, gridItem, position,
     *            motionEffects, transform, background, border, shadow,
     *            mask, responsive attributes (mobile/tablet/desktop)
     */
    const getAdvancedProperties = () => {
        return (<div className="space-y-6">
        <div className="text-center text-muted-foreground py-2">
          <p className="font-medium">Advanced Properties</p>
          <p className="text-xs mt-1">Layout, effects, and responsive settings</p>
        </div>
        
        {/* CSS Classes */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium border-b pb-1">Custom Styling</h4>
          <div className="space-y-2">
            <label_1.Label htmlFor="className">CSS Classes</label_1.Label>
            <input_1.Input id="className" value={localProps.className || ''} onChange={(e) => updateProp('className', e.target.value)} placeholder="custom-class another-class" disabled={isLocked}/>
            <p className="text-xs text-muted-foreground">
              Add custom Tailwind or CSS classes
            </p>
          </div>
        </div>

        {/* Spacing Controls */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium border-b pb-1">Spacing</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label_1.Label htmlFor="marginTop">Margin Top</label_1.Label>
              <input_1.Input id="marginTop" type="text" value={localProps.marginTop || ''} onChange={(e) => updateProp('marginTop', e.target.value)} placeholder="0, 4, 8, 16..." disabled={isLocked}/>
            </div>
            <div className="space-y-2">
              <label_1.Label htmlFor="marginBottom">Margin Bottom</label_1.Label>
              <input_1.Input id="marginBottom" type="text" value={localProps.marginBottom || ''} onChange={(e) => updateProp('marginBottom', e.target.value)} placeholder="0, 4, 8, 16..." disabled={isLocked}/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label_1.Label htmlFor="paddingTop">Padding Top</label_1.Label>
              <input_1.Input id="paddingTop" type="text" value={localProps.paddingTop || ''} onChange={(e) => updateProp('paddingTop', e.target.value)} placeholder="0, 4, 8, 16..." disabled={isLocked}/>
            </div>
            <div className="space-y-2">
              <label_1.Label htmlFor="paddingBottom">Padding Bottom</label_1.Label>
              <input_1.Input id="paddingBottom" type="text" value={localProps.paddingBottom || ''} onChange={(e) => updateProp('paddingBottom', e.target.value)} placeholder="0, 4, 8, 16..." disabled={isLocked}/>
            </div>
          </div>
        </div>

        {/* Layout Controls */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium border-b pb-1">Layout</h4>
          
          <div className="space-y-2">
            <label_1.Label htmlFor="display">Display</label_1.Label>
            <select_1.Select value={localProps.display || 'block'} onValueChange={(value) => updateProp('display', value)} disabled={isLocked}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="block">Block</select_1.SelectItem>
                <select_1.SelectItem value="flex">Flex</select_1.SelectItem>
                <select_1.SelectItem value="grid">Grid</select_1.SelectItem>
                <select_1.SelectItem value="inline-block">Inline Block</select_1.SelectItem>
                <select_1.SelectItem value="hidden">Hidden</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label_1.Label htmlFor="maxWidth">Max Width</label_1.Label>
              <input_1.Input id="maxWidth" type="text" value={localProps.maxWidth || ''} onChange={(e) => updateProp('maxWidth', e.target.value)} placeholder="container, 7xl, 1200px" disabled={isLocked}/>
            </div>
            <div className="space-y-2">
              <label_1.Label htmlFor="minHeight">Min Height</label_1.Label>
              <input_1.Input id="minHeight" type="text" value={localProps.minHeight || ''} onChange={(e) => updateProp('minHeight', e.target.value)} placeholder="screen, 500px" disabled={isLocked}/>
            </div>
          </div>
        </div>

        {/* Visual Effects */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium border-b pb-1">Visual Effects</h4>
          
          <div className="space-y-2">
            <label_1.Label htmlFor="shadow">Box Shadow</label_1.Label>
            <select_1.Select value={localProps.shadow || 'none'} onValueChange={(value) => updateProp('shadow', value)} disabled={isLocked}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="none">None</select_1.SelectItem>
                <select_1.SelectItem value="sm">Small</select_1.SelectItem>
                <select_1.SelectItem value="md">Medium</select_1.SelectItem>
                <select_1.SelectItem value="lg">Large</select_1.SelectItem>
                <select_1.SelectItem value="xl">Extra Large</select_1.SelectItem>
                <select_1.SelectItem value="2xl">2X Large</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="opacity">Opacity</label_1.Label>
            <select_1.Select value={localProps.opacity || '100'} onValueChange={(value) => updateProp('opacity', value)} disabled={isLocked}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="0">0%</select_1.SelectItem>
                <select_1.SelectItem value="25">25%</select_1.SelectItem>
                <select_1.SelectItem value="50">50%</select_1.SelectItem>
                <select_1.SelectItem value="75">75%</select_1.SelectItem>
                <select_1.SelectItem value="100">100%</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>
        </div>

        {/* Coming Soon - Animation/Motion */}
        <div className="space-y-2 opacity-50 border-t pt-3">
          <h4 className="text-sm font-medium">Animation & Motion (Coming Soon)</h4>
          <p className="text-xs text-muted-foreground">
            Motion effects, transforms, and transitions will be available here
          </p>
        </div>

        {/* Coming Soon - Responsive */}
        <div className="space-y-2 opacity-50">
          <h4 className="text-sm font-medium">Responsive Settings (Coming Soon)</h4>
          <p className="text-xs text-muted-foreground">
            Breakpoint-specific settings for mobile, tablet, desktop
          </p>
        </div>
      </div>);
    };
    const renderProperties = () => {
        if (isLocked) {
            return (<alert_1.Alert>
          <lucide_react_1.Lock className="h-4 w-4"/>
          <alert_1.AlertDescription>
            This component is locked. Unlock it to make changes.
          </alert_1.AlertDescription>
        </alert_1.Alert>);
        }
        // Note: renderPropertyInput is now defined at component level (above)
        switch (normalizedComponentType) {
            case 'text':
                return renderTextProperties();
            case 'button':
                return renderButtonProperties();
            case 'image':
                return renderImageProperties();
            case 'video':
                return renderVideoProperties();
            case 'container':
                return renderContainerProperties();
            case 'block':
                // Get block config based on blockId
                const blockId = componentProps.blockId;
                // Check if this is a gallery block
                if (blockId && blockId.toLowerCase().includes('gallery')) {
                    return renderGalleryProperties();
                }
                // Check if this is a video block
                if (blockId && blockId.toLowerCase().includes('video')) {
                    return renderVideoProperties();
                }
                const blockConfig = blockId ? block_configs_1.allBlockConfigs[blockId] : null;
                if (!blockConfig) {
                    return (<div className="space-y-4">
              <div className="text-center text-muted-foreground py-4">
                <p>Block components are pre-built designs with limited editable properties.</p>
              </div>
              
              {/* Editable properties for blocks */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label_1.Label htmlFor="blockId">Block ID</label_1.Label>
                  <input_1.Input id="blockId" value={componentProps.blockId || ''} readOnly/>
                </div>
                
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
                // Render block-specific properties
                return (<div className="space-y-4">
            <div className="text-center text-muted-foreground py-2">
              <p>Edit block properties</p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(blockConfig).map(([key, config]) => (<div key={key} className="space-y-2">
                  <label_1.Label htmlFor={key}>{config.label}</label_1.Label>
                  {renderPropertyInput(key, config, componentProps[key])}
                </div>))}
            </div>
          </div>);
            default:
                // Check if this is a prebuild component (from components registry)
                const prebuildConfig = block_configs_1.allBlockConfigs[componentType];
                if (prebuildConfig) {
                    // Render prebuild component properties dynamically
                    return (<div className="space-y-4">
              <div className="text-sm text-muted-foreground py-2 border-b">
                <p className="font-medium">{componentType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
              </div>
              
              <div className="space-y-4">
                {Object.entries(prebuildConfig).map(([key, config]) => (<div key={key} className="space-y-2">
                    <label_1.Label htmlFor={key}>{config.label}</label_1.Label>
                    {renderPropertyInput(key, config, localProps[key])}
                  </div>))}
              </div>
            </div>);
                }
                // Unknown component type
                return (<div className="text-center text-muted-foreground py-8">
            <p>Select a component to edit its properties</p>
          </div>);
        }
    };
    return (<card_1.Card className="h-full flex flex-col">
      <card_1.CardHeader>
        <card_1.CardTitle>
          {componentType ? `${componentType.charAt(0).toUpperCase() + componentType.slice(1)} Properties` : 'Properties'}
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
        
        {/* 3-Tab System: Content | Style | Advanced */}
        {isLocked ? (<alert_1.Alert>
            <lucide_react_1.Lock className="h-4 w-4"/>
            <alert_1.AlertDescription>
              This component is locked. Unlock it to make changes.
            </alert_1.AlertDescription>
          </alert_1.Alert>) : componentType ? (<tabs_1.Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
            <tabs_1.TabsList className="grid w-full grid-cols-3">
              <tabs_1.TabsTrigger value="content">Content</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value="style">Style</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value="advanced">Advanced</tabs_1.TabsTrigger>
            </tabs_1.TabsList>
            
            <tabs_1.TabsContent value="content" className="mt-4">
              {getContentProperties()}
            </tabs_1.TabsContent>
            
            <tabs_1.TabsContent value="style" className="mt-4">
              {getStyleProperties()}
            </tabs_1.TabsContent>
            
            <tabs_1.TabsContent value="advanced" className="mt-4">
              {getAdvancedProperties()}
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