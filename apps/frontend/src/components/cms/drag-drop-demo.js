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
exports.DragDropDemo = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const DragDropDemo = () => {
    const [availableComponents] = (0, react_1.useState)([
        { id: 'text', type: 'text', label: 'Text', icon: 'T' },
        { id: 'button', type: 'button', label: 'Button', icon: 'B' },
        { id: 'image', type: 'image', label: 'Image', icon: 'I' },
        { id: 'container', type: 'container', label: 'Container', icon: 'C' },
        { id: 'card', type: 'card', label: 'Card', icon: 'C' },
        { id: 'grid', type: 'grid', label: 'Grid', icon: 'G' },
    ]);
    const [pageComponents, setPageComponents] = (0, react_1.useState)([]);
    const [selectedComponent, setSelectedComponent] = (0, react_1.useState)(null);
    const handleDragStart = (e, componentType) => {
        e.dataTransfer.setData('componentType', componentType);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const componentType = e.dataTransfer.getData('componentType');
        if (componentType) {
            const newComponent = {
                id: `comp-${Date.now()}`,
                type: componentType,
                props: {},
            };
            setPageComponents([...pageComponents, newComponent]);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const removeComponent = (id) => {
        setPageComponents(pageComponents.filter(comp => comp.id !== id));
    };
    return (<div className="flex gap-6">
      {/* Component Palette */}
      <div className="w-1/4">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Components</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-2">
            {availableComponents.map((component) => (<div key={component.id} draggable onDragStart={(e) => handleDragStart(e, component.type)} className="flex items-center gap-2 p-2 border rounded cursor-move hover:bg-muted transition-colors">
                <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded">
                  {component.icon}
                </span>
                <span>{component.label}</span>
              </div>))}
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Page Canvas */}
      <div className="w-3/4">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Page Canvas</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="min-h-[400px] border-2 border-dashed rounded-lg p-4" onDrop={handleDrop} onDragOver={handleDragOver}>
            {pageComponents.length === 0 ? (<div className="h-full flex items-center justify-center text-muted-foreground">
                Drag components here to build your page
              </div>) : (<div className="space-y-4">
                {pageComponents.map((component) => (<div key={component.id} className={(0, utils_1.cn)('p-3 border rounded relative group', selectedComponent === component.id ? 'ring-2 ring-primary' : '')} onClick={() => setSelectedComponent(component.id)}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{component.type} Component</span>
                      <button_1.Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    removeComponent(component.id);
                }}>
                        Remove
                      </button_1.Button>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Click to configure properties
                    </div>
                  </div>))}
              </div>)}
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
};
exports.DragDropDemo = DragDropDemo;
exports.default = exports.DragDropDemo;
//# sourceMappingURL=drag-drop-demo.js.map