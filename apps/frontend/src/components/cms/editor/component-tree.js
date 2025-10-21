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
exports.ComponentTree = ComponentTree;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const scroll_area_1 = require("@/components/ui/scroll-area");
const badge_1 = require("@/components/ui/badge");
const input_1 = require("@/components/ui/input");
function ComponentTree({ components, selectedComponentId, onSelectComponent, onDeleteComponent, onReorderComponents, onUpdateComponent, className, }) {
    // Build tree structure from flat array
    const buildTree = (items) => {
        const map = new Map();
        const roots = [];
        // Initialize map
        items.forEach((item) => {
            map.set(item.id, { ...item, children: [] });
        });
        // Build tree
        items.forEach((item) => {
            const node = map.get(item.id);
            if (item.parentId && map.has(item.parentId)) {
                const parent = map.get(item.parentId);
                parent.children = parent.children || [];
                parent.children.push(node);
            }
            else {
                roots.push(node);
            }
        });
        // Sort by orderIndex
        const sortByOrder = (nodes) => {
            nodes.sort((a, b) => a.orderIndex - b.orderIndex);
            nodes.forEach((node) => {
                if (node.children && node.children.length > 0) {
                    sortByOrder(node.children);
                }
            });
        };
        sortByOrder(roots);
        return roots;
    };
    const tree = buildTree(components);
    return (<div className={(0, utils_1.cn)('bg-card', className)}>
      <scroll_area_1.ScrollArea className="h-full">
        <div className="p-2">
          {tree.length === 0 ? (<div className="text-center text-muted-foreground py-8 text-sm">
              No components yet. Add components from the library.
            </div>) : (tree.map((component) => (<TreeItem key={component.id} component={component} depth={0} selectedId={selectedComponentId} onSelect={onSelectComponent} onDelete={onDeleteComponent} onReorder={onReorderComponents} onUpdate={onUpdateComponent}/>)))}
        </div>
      </scroll_area_1.ScrollArea>
    </div>);
}
function TreeItem({ component, depth, selectedId, onSelect, onDelete, onReorder, onUpdate, }) {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(true);
    const [isDragOver, setIsDragOver] = (0, react_1.useState)(false);
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [editValue, setEditValue] = (0, react_1.useState)('');
    const inputRef = (0, react_1.useRef)(null);
    const hasChildren = component.children && component.children.length > 0;
    const isSelected = selectedId === component.id;
    const maxDepth = 3;
    const canHaveChildren = depth < maxDepth;
    // Focus input when editing starts
    (0, react_1.useEffect)(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    // Handle double click to edit
    const handleDoubleClick = (e) => {
        e.stopPropagation();
        if (!onUpdate)
            return;
        const currentName = component.props?.customName || component.props?.title || '';
        setEditValue(currentName);
        setIsEditing(true);
    };
    // Handle save
    const handleSave = () => {
        if (!onUpdate)
            return;
        const trimmedValue = editValue.trim();
        onUpdate(component.id, {
            props: {
                ...component.props,
                customName: trimmedValue || undefined, // Remove if empty
            },
        });
        setIsEditing(false);
    };
    // Handle cancel
    const handleCancel = () => {
        setIsEditing(false);
        setEditValue('');
    };
    // Handle key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
        else if (e.key === 'Escape') {
            handleCancel();
        }
    };
    // Get component display name and icon
    const getComponentInfo = (type) => {
        // Safety check
        if (!type) {
            return { label: 'Unknown', color: 'bg-gray-500' };
        }
        const typeMap = {
            HERO: { label: 'Hero', color: 'bg-purple-500' },
            TEXT: { label: 'Text', color: 'bg-blue-500' },
            IMAGE: { label: 'Image', color: 'bg-green-500' },
            GALLERY: { label: 'Gallery', color: 'bg-yellow-500' },
            CTA: { label: 'CTA', color: 'bg-red-500' },
            ACCORDION: { label: 'Accordion', color: 'bg-indigo-500' },
            FEATURES: { label: 'Features', color: 'bg-pink-500' },
            TESTIMONIALS: { label: 'Testimonials', color: 'bg-cyan-500' },
            PRICING: { label: 'Pricing', color: 'bg-orange-500' },
            CONTACT_FORM: { label: 'Contact', color: 'bg-teal-500' },
            VIDEO: { label: 'Video', color: 'bg-violet-500' },
            TEAM: { label: 'Team', color: 'bg-lime-500' },
            STATS: { label: 'Stats', color: 'bg-fuchsia-500' },
            LOGO_CLOUD: { label: 'Logos', color: 'bg-amber-500' },
            NEWSLETTER: { label: 'Newsletter', color: 'bg-rose-500' },
            CONTAINER: { label: 'Container', color: 'bg-slate-500' },
            GRID: { label: 'Grid', color: 'bg-stone-500' },
            CARD: { label: 'Card', color: 'bg-zinc-500' },
            BLOCK: { label: 'Block', color: 'bg-neutral-500' },
            BUTTON: { label: 'Button', color: 'bg-sky-500' },
        };
        // If type is found in map, return it
        if (typeMap[type.toUpperCase()]) {
            return typeMap[type.toUpperCase()];
        }
        // Otherwise, capitalize first letter and return
        const capitalized = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        return { label: capitalized, color: 'bg-gray-500' };
    };
    const componentInfo = getComponentInfo(component?.type || '');
    // Get component display title
    const getDisplayTitle = (comp) => {
        // 1. Try to get custom name (user-defined)
        if (comp.props?.customName) {
            return comp.props.customName;
        }
        // 2. Try to get title from props
        if (comp.props?.title) {
            return comp.props.title;
        }
        // 3. Try to get content preview
        if (comp.props?.content && typeof comp.props.content === 'string') {
            const preview = comp.props.content.substring(0, 30);
            return preview.length < comp.props.content.length ? `${preview}...` : preview;
        }
        // 4. Try to get heading
        if (comp.props?.heading) {
            return comp.props.heading;
        }
        // 5. Try to get text
        if (comp.props?.text) {
            const preview = comp.props.text.substring(0, 30);
            return preview.length < comp.props.text.length ? `${preview}...` : preview;
        }
        // 6. Try to get alt (for images)
        if (comp.props?.alt) {
            return comp.props.alt;
        }
        // 7. Try to get label (for buttons)
        if (comp.props?.label) {
            return comp.props.label;
        }
        // 8. Default to component type (e.g., "Container", "Button", "Text")
        return componentInfo.label;
    };
    const displayTitle = getDisplayTitle(component);
    // Drag and drop handlers
    const handleDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('componentId', component.id);
        e.stopPropagation();
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!canHaveChildren)
            return;
        setIsDragOver(true);
    };
    const handleDragLeave = (e) => {
        e.stopPropagation();
        setIsDragOver(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (!canHaveChildren)
            return;
        const draggedId = e.dataTransfer.getData('componentId');
        if (draggedId && draggedId !== component.id) {
            // Check if trying to drop component into its own children (prevent circular reference)
            const isCircular = checkCircularReference(component, draggedId);
            if (!isCircular) {
                const newIndex = component.children ? component.children.length : 0;
                onReorder(draggedId, component.id, newIndex);
                setIsExpanded(true);
            }
        }
    };
    // Check for circular reference
    const checkCircularReference = (node, targetId) => {
        if (node.id === targetId)
            return true;
        if (!node.children || node.children.length === 0)
            return false;
        return node.children.some((child) => checkCircularReference(child, targetId));
    };
    return (<div className="select-none">
      <div draggable onDragStart={handleDragStart} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => onSelect(component.id)} className={(0, utils_1.cn)('group flex items-center gap-1 py-1.5 px-2 rounded-md hover:bg-accent cursor-pointer transition-colors', isSelected && 'bg-accent ring-2 ring-primary', isDragOver && canHaveChildren && 'bg-primary/10 ring-2 ring-primary ring-dashed')} style={{ paddingLeft: `${depth * 20 + 8}px` }}>
        {/* Expand/Collapse */}
        {hasChildren ? (<button_1.Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
            }}>
            {isExpanded ? (<lucide_react_1.ChevronDown className="h-3 w-3"/>) : (<lucide_react_1.ChevronRight className="h-3 w-3"/>)}
          </button_1.Button>) : (<div className="h-5 w-5"/>)}

        {/* Drag Handle */}
        <lucide_react_1.GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"/>

        {/* Component Title - Editable */}
        {isEditing ? (<input_1.Input ref={inputRef} value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleSave} onClick={(e) => e.stopPropagation()} className="flex-1 h-6 text-sm px-2 py-0" placeholder={componentInfo.label}/>) : (<span className="flex-1 text-sm truncate font-medium" onDoubleClick={handleDoubleClick} title={onUpdate ? 'Double-click to edit' : displayTitle}>
            {displayTitle}
          </span>)}
        
        {/* Type Badge - Small subtle indicator */}
        <badge_1.Badge variant="outline" className="text-xs text-muted-foreground">
          {componentInfo.label}
        </badge_1.Badge>

        {/* Depth Indicator */}
        {depth > 0 && (<badge_1.Badge variant="outline" className="text-xs">
            L{depth + 1}
          </badge_1.Badge>)}

        {/* Children Count */}
        {hasChildren && (<badge_1.Badge variant="outline" className="text-xs">
            {component.children.length}
          </badge_1.Badge>)}

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button_1.Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive" onClick={(e) => {
            e.stopPropagation();
            // Cancel editing if active before deleting
            if (isEditing) {
                setIsEditing(false);
            }
            if (confirm(`Delete ${componentInfo.label}?`)) {
                onDelete(component.id);
            }
        }}>
            <lucide_react_1.Trash2 className="h-3 w-3"/>
          </button_1.Button>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (<div className="ml-2">
          {component.children.map((child) => (<TreeItem key={child.id} component={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} onDelete={onDelete} onReorder={onReorder} onUpdate={onUpdate}/>))}
        </div>)}

      {/* Max Depth Warning */}
      {depth >= maxDepth - 1 && (<div className="ml-12 text-xs text-muted-foreground italic py-1">
          Max nesting depth reached
        </div>)}
    </div>);
}
//# sourceMappingURL=component-tree.js.map