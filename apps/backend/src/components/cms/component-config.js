"use strict";
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
exports.ComponentConfig = void 0;
const react_1 = __importStar(require("react"));
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const switch_1 = require("@/components/ui/switch");
const ComponentConfig = ({ componentType, initialProps, onPropsChange, }) => {
    const [props, setProps] = (0, react_1.useState)(initialProps);
    const updateProp = (key, value) => {
        const newProps = { ...props, [key]: value };
        setProps(newProps);
        onPropsChange(newProps);
    };
    const renderTextConfig = () => (<div className="space-y-4">
      <div>
        <label_1.Label htmlFor="content">Content</label_1.Label>
        <textarea_1.Textarea id="content" value={props.content || ''} onChange={(e) => updateProp('content', e.target.value)}/>
      </div>
      
      <div>
        <label_1.Label htmlFor="variant">Variant</label_1.Label>
        <select_1.Select value={props.variant || 'body'} onValueChange={(value) => updateProp('variant', value)}>
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
      
      <div>
        <label_1.Label htmlFor="align">Alignment</label_1.Label>
        <select_1.Select value={props.align || 'left'} onValueChange={(value) => updateProp('align', value)}>
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
      
      <div>
        <label_1.Label htmlFor="color">Color</label_1.Label>
        <select_1.Select value={props.color || 'primary'} onValueChange={(value) => updateProp('color', value)}>
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
    const renderButtonConfig = () => (<div className="space-y-4">
      <div>
        <label_1.Label htmlFor="text">Button Text</label_1.Label>
        <input_1.Input id="text" value={props.text || ''} onChange={(e) => updateProp('text', e.target.value)}/>
      </div>
      
      <div>
        <label_1.Label htmlFor="href">Link URL (optional)</label_1.Label>
        <input_1.Input id="href" value={props.href || ''} onChange={(e) => updateProp('href', e.target.value)}/>
      </div>
      
      <div>
        <label_1.Label htmlFor="variant">Variant</label_1.Label>
        <select_1.Select value={props.variant || 'default'} onValueChange={(value) => updateProp('variant', value)}>
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
      
      <div>
        <label_1.Label htmlFor="size">Size</label_1.Label>
        <select_1.Select value={props.size || 'default'} onValueChange={(value) => updateProp('size', value)}>
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
        <switch_1.Switch id="disabled" checked={props.disabled || false} onCheckedChange={(checked) => updateProp('disabled', checked)}/>
        <label_1.Label htmlFor="disabled">Disabled</label_1.Label>
      </div>
    </div>);
    const renderContainerConfig = () => (<div className="space-y-4">
      <div>
        <label_1.Label htmlFor="padding">Padding</label_1.Label>
        <select_1.Select value={props.padding || 'md'} onValueChange={(value) => updateProp('padding', value)}>
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
      
      <div>
        <label_1.Label htmlFor="background">Background</label_1.Label>
        <select_1.Select value={props.background || 'none'} onValueChange={(value) => updateProp('background', value)}>
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
      
      <div>
        <label_1.Label htmlFor="rounded">Rounded</label_1.Label>
        <select_1.Select value={props.rounded || 'none'} onValueChange={(value) => updateProp('rounded', value)}>
          <select_1.SelectTrigger>
            <select_1.SelectValue />
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectItem value="none">None</select_1.SelectItem>
            <select_1.SelectItem value="sm">Small</select_1.SelectItem>
            <select_1.SelectItem value="md">Medium</select_1.SelectItem>
            <select_1.SelectItem value="lg">Large</select_1.SelectItem>
            <select_1.SelectItem value="full">Full</select_1.SelectItem>
          </select_1.SelectContent>
        </select_1.Select>
      </div>
    </div>);
    const getConfigPanel = () => {
        switch (componentType) {
            case 'text':
                return renderTextConfig();
            case 'button':
                return renderButtonConfig();
            case 'container':
                return renderContainerConfig();
            default:
                return <p>Configuration not available for this component type.</p>;
        }
    };
    return (<div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Configure {componentType}</h3>
      {getConfigPanel()}
    </div>);
};
exports.ComponentConfig = ComponentConfig;
exports.default = exports.ComponentConfig;
//# sourceMappingURL=component-config.js.map