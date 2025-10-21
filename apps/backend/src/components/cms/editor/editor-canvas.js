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
exports.EditorCanvas = void 0;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const text_component_1 = require("../text-component");
const button_component_1 = require("../button-component");
const image_component_1 = require("../image-component");
const container_component_1 = require("../container-component");
const card_component_1 = require("../card-component");
const grid_component_1 = require("../grid-component");
const block_renderer_1 = require("./block-renderer");
const lucide_react_1 = require("lucide-react");
const framer_motion_1 = require("framer-motion");
const EditorCanvas = ({ components, onComponentUpdate, onComponentDelete, onComponentSelect, selectedComponentId, onMoveUp, onMoveDown, }) => {
    const [dragOverId, setDragOverId] = (0, react_1.useState)(null);
    const [hoveredComponentId, setHoveredComponentId] = (0, react_1.useState)(null);
    const [copiedComponent, setCopiedComponent] = (0, react_1.useState)(null);
    // Copy component to clipboard
    const handleCopyComponent = (0, react_1.useCallback)((component) => {
        if (component.locked)
            return;
        setCopiedComponent(component);
    }, []);
    const renderComponent = (component) => {
        const isSelected = selectedComponentId === component.id;
        const isHovered = hoveredComponentId === component.id;
        const isDragOver = dragOverId === component.id;
        const isLocked = component.locked;
        const componentIndex = components.findIndex(c => c.id === component.id);
        const isFirst = componentIndex === 0;
        const isLast = componentIndex === components.length - 1;
        // Enhanced styling with better visual feedback
        const baseClasses = `
      relative border-2 border-dashed rounded transition-all duration-200
      ${isSelected
            ? 'border-primary ring-4 ring-primary/30 shadow-lg'
            : isHovered
                ? 'border-primary/50 ring-2 ring-primary/20'
                : 'border-transparent'}
      ${isDragOver ? 'border-primary bg-primary/10' : ''}
      ${isLocked ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
    `;
        const handleClick = (e) => {
            e.stopPropagation();
            if (isLocked)
                return;
            onComponentSelect(component.id, component.type);
        };
        const handleDelete = (e) => {
            e.stopPropagation();
            onComponentDelete(component.id);
        };
        const handleCopy = (e) => {
            e.stopPropagation();
            handleCopyComponent(component);
        };
        const handleMoveUp = (e) => {
            e.stopPropagation();
            onMoveUp && onMoveUp(component.id);
        };
        const handleMoveDown = (e) => {
            e.stopPropagation();
            onMoveDown && onMoveDown(component.id);
        };
        const componentWithHandlers = {
            ...component.props,
            id: component.id,
            key: component.id,
            className: `${component.props.className || ''} ${baseClasses}`,
            onClick: handleClick,
        };
        // Enhanced action buttons with animations
        const renderActionButtons = () => {
            if (isLocked || !isSelected)
                return null;
            return (<framer_motion_1.motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute -top-3 -right-3 flex space-x-1 bg-background p-1 rounded-lg shadow-lg z-20 border">
          {onMoveUp && !isFirst && (<button_1.Button variant="secondary" size="sm" onClick={handleMoveUp} className="h-7 w-7 p-0" title="Move Up">
              <lucide_react_1.ArrowUp className="h-3 w-3"/>
            </button_1.Button>)}
          {onMoveDown && !isLast && (<button_1.Button variant="secondary" size="sm" onClick={handleMoveDown} className="h-7 w-7 p-0" title="Move Down">
              <lucide_react_1.ArrowDown className="h-3 w-3"/>
            </button_1.Button>)}
          <button_1.Button variant="secondary" size="sm" onClick={handleCopy} className="h-7 w-7 p-0" title="Copy Component">
            <lucide_react_1.Copy className="h-3 w-3"/>
          </button_1.Button>
          <button_1.Button variant="destructive" size="sm" onClick={handleDelete} className="h-7 w-7 p-0" title="Delete Component">
            <lucide_react_1.Trash2 className="h-3 w-3"/>
          </button_1.Button>
        </framer_motion_1.motion.div>);
        };
        // Enhanced locked indicator
        const renderLockedIndicator = () => {
            if (!isLocked)
                return null;
            return (<framer_motion_1.motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1 z-10">
          <lucide_react_1.Lock className="h-3 w-3"/>
        </framer_motion_1.motion.div>);
        };
        switch (component.type) {
            case 'text':
                return (<framer_motion_1.motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} onMouseEnter={() => setHoveredComponentId(component.id)} onMouseLeave={() => setHoveredComponentId(null)}>
            <text_component_1.TextComponent {...componentWithHandlers}/>
            <framer_motion_1.AnimatePresence>
              {renderActionButtons()}
            </framer_motion_1.AnimatePresence>
            {renderLockedIndicator()}
          </framer_motion_1.motion.div>);
            case 'button':
                return (<framer_motion_1.motion.div className={baseClasses} onClick={handleClick} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} onMouseEnter={() => setHoveredComponentId(component.id)} onMouseLeave={() => setHoveredComponentId(null)}>
            <button_component_1.ButtonComponent {...component.props}/>
            <framer_motion_1.AnimatePresence>
              {renderActionButtons()}
            </framer_motion_1.AnimatePresence>
            {renderLockedIndicator()}
          </framer_motion_1.motion.div>);
            case 'image':
                return (<framer_motion_1.motion.div className={baseClasses} onClick={handleClick} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} onMouseEnter={() => setHoveredComponentId(component.id)} onMouseLeave={() => setHoveredComponentId(null)}>
            <image_component_1.ImageComponent {...component.props}/>
            <framer_motion_1.AnimatePresence>
              {renderActionButtons()}
            </framer_motion_1.AnimatePresence>
            {renderLockedIndicator()}
          </framer_motion_1.motion.div>);
            case 'container':
                return (<framer_motion_1.motion.div className={baseClasses} onClick={handleClick} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} onMouseEnter={() => setHoveredComponentId(component.id)} onMouseLeave={() => setHoveredComponentId(null)}>
            <container_component_1.ContainerComponent {...component.props}>
              {component.children?.map(renderComponent)}
            </container_component_1.ContainerComponent>
            <framer_motion_1.AnimatePresence>
              {renderActionButtons()}
            </framer_motion_1.AnimatePresence>
            {renderLockedIndicator()}
          </framer_motion_1.motion.div>);
            case 'card':
                return (<framer_motion_1.motion.div className={baseClasses} onClick={handleClick} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} onMouseEnter={() => setHoveredComponentId(component.id)} onMouseLeave={() => setHoveredComponentId(null)}>
            <card_component_1.CardComponent {...component.props}>
              {component.children?.map(renderComponent)}
            </card_component_1.CardComponent>
            <framer_motion_1.AnimatePresence>
              {renderActionButtons()}
            </framer_motion_1.AnimatePresence>
            {renderLockedIndicator()}
          </framer_motion_1.motion.div>);
            case 'grid':
                return (<framer_motion_1.motion.div className={baseClasses} onClick={handleClick} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} onMouseEnter={() => setHoveredComponentId(component.id)} onMouseLeave={() => setHoveredComponentId(null)}>
            <grid_component_1.GridComponent {...component.props}>
              {component.children?.map(renderComponent)}
            </grid_component_1.GridComponent>
            <framer_motion_1.AnimatePresence>
              {renderActionButtons()}
            </framer_motion_1.AnimatePresence>
            {renderLockedIndicator()}
          </framer_motion_1.motion.div>);
            case 'block':
                return (<framer_motion_1.motion.div key={component.id} className={baseClasses} onClick={handleClick} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} onMouseEnter={() => setHoveredComponentId(component.id)} onMouseLeave={() => setHoveredComponentId(null)}>
            {component.props.blockId ? (<block_renderer_1.BlockRenderer blockId={component.props.blockId} props={component.props}/>) : (<div className="p-4 text-center text-muted-foreground border border-dashed rounded">
                Block component not properly configured
              </div>)}
            <framer_motion_1.AnimatePresence>
              {renderActionButtons()}
            </framer_motion_1.AnimatePresence>
            {renderLockedIndicator()}
          </framer_motion_1.motion.div>);
            default:
                return (<framer_motion_1.motion.div className="p-4 text-center text-muted-foreground border border-dashed rounded" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} onMouseEnter={() => setHoveredComponentId(component.id)} onMouseLeave={() => setHoveredComponentId(null)}>
            Unknown component type: {component.type}
          </framer_motion_1.motion.div>);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOverId(null);
        // Handle drop logic would go here
    };
    return (<card_1.Card className="h-full flex flex-col">
      <card_1.CardHeader>
        <card_1.CardTitle>Page Canvas</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="flex-1 p-4 overflow-auto h-full" onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={() => setDragOverId(null)}>
        {components.length === 0 ? (<framer_motion_1.motion.div key="empty-canvas" className="h-full min-h-[400px] flex items-center justify-center text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center">
              <p className="mb-2">Drag components here to start building your page</p>
              <p className="text-sm">Select a component from the library to add it to the canvas</p>
            </div>
          </framer_motion_1.motion.div>) : (<framer_motion_1.motion.div className="space-y-4 min-h-[400px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {components.map((component) => (<framer_motion_1.motion.div key={component.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                {renderComponent(component)}
              </framer_motion_1.motion.div>))}
          </framer_motion_1.motion.div>)}
      </card_1.CardContent>
    </card_1.Card>);
};
exports.EditorCanvas = EditorCanvas;
exports.default = exports.EditorCanvas;
//# sourceMappingURL=editor-canvas.js.map