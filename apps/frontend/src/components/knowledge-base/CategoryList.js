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
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const button_1 = require("../ui/button");
const input_1 = require("../ui/input");
const badge_1 = require("../ui/badge");
const card_1 = require("../ui/card");
const use_toast_1 = require("../../hooks/use-toast");
const CategoryList = ({ categories, onCategorySelect, onCategoryEdit, onCategoryDelete, onCategoryReorder, onCategoryCreate, isLoading = false, showActions = true, allowReorder = true, searchable = true, }) => {
    const [expandedCategories, setExpandedCategories] = (0, react_1.useState)(new Set());
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [filteredCategories, setFilteredCategories] = (0, react_1.useState)(categories);
    const { toast } = (0, use_toast_1.useToast)();
    (0, react_1.useEffect)(() => {
        if (searchQuery.trim()) {
            const filtered = filterCategories(categories, searchQuery.toLowerCase());
            setFilteredCategories(filtered);
            // Auto-expand all categories when searching
            const allIds = getAllCategoryIds(filtered);
            setExpandedCategories(new Set(allIds));
        }
        else {
            setFilteredCategories(categories);
        }
    }, [categories, searchQuery]);
    const filterCategories = (cats, query) => {
        return cats.reduce((acc, category) => {
            const matchesQuery = category.name.toLowerCase().includes(query) ||
                category.slug.toLowerCase().includes(query);
            const filteredChildren = filterCategories(category.children, query);
            if (matchesQuery || filteredChildren.length > 0) {
                acc.push({
                    ...category,
                    children: filteredChildren,
                });
            }
            return acc;
        }, []);
    };
    const getAllCategoryIds = (cats) => {
        const ids = [];
        const traverse = (categories) => {
            categories.forEach(cat => {
                ids.push(cat.id);
                if (cat.children.length > 0) {
                    traverse(cat.children);
                }
            });
        };
        traverse(cats);
        return ids;
    };
    const toggleExpanded = (categoryId) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        }
        else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    };
    const handleReorder = (categoryId, direction) => {
        if (!allowReorder)
            return;
        // Simple reordering logic - in a real implementation, this would be more sophisticated
        const flatCategories = flattenCategories(filteredCategories);
        const currentIndex = flatCategories.indexOf(categoryId);
        if (currentIndex === -1)
            return;
        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0 || newIndex >= flatCategories.length)
            return;
        const reorderedIds = [...flatCategories];
        [reorderedIds[currentIndex], reorderedIds[newIndex]] = [reorderedIds[newIndex], reorderedIds[currentIndex]];
        onCategoryReorder?.(reorderedIds);
    };
    const flattenCategories = (cats) => {
        const ids = [];
        const traverse = (categories) => {
            categories.forEach(cat => {
                ids.push(cat.id);
                if (expandedCategories.has(cat.id) && cat.children.length > 0) {
                    traverse(cat.children);
                }
            });
        };
        traverse(cats);
        return ids;
    };
    const getColorClasses = (color) => {
        const colorMap = {
            blue: 'bg-blue-100 text-blue-800 border-blue-200',
            green: 'bg-green-100 text-green-800 border-green-200',
            red: 'bg-red-100 text-red-800 border-red-200',
            yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            purple: 'bg-purple-100 text-purple-800 border-purple-200',
            pink: 'bg-pink-100 text-pink-800 border-pink-200',
            indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            gray: 'bg-gray-100 text-gray-800 border-gray-200',
        };
        return colorMap[color] || colorMap.gray;
    };
    const getIconComponent = (iconName) => {
        const iconMap = {
            folder: lucide_react_1.Folder,
            // Add more icons as needed
        };
        const IconComponent = iconMap[iconName] || lucide_react_1.Folder;
        return <IconComponent className="h-4 w-4"/>;
    };
    const renderCategory = (category, index, level = 0) => {
        const isExpanded = expandedCategories.has(category.id);
        const hasChildren = category.children.length > 0;
        const paddingLeft = level * 24;
        return (<div key={category.id} className={`${!category.isActive ? 'opacity-50' : ''}`}>
        <div className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50" style={{ paddingLeft: paddingLeft + 12 }}>
          <div className="flex items-center space-x-3 flex-1">
            {/* Reorder Buttons */}
            {allowReorder && (<div className="flex flex-col space-y-1">
                <button onClick={() => handleReorder(category.id, 'up')} className="text-gray-400 hover:text-gray-600 p-1" title="Yukarı taşı">
                  <lucide_react_1.ChevronDown className="h-3 w-3 rotate-180"/>
                </button>
                <button onClick={() => handleReorder(category.id, 'down')} className="text-gray-400 hover:text-gray-600 p-1" title="Aşağı taşı">
                  <lucide_react_1.ChevronDown className="h-3 w-3"/>
                </button>
              </div>)}

            {/* Expand/Collapse Button */}
            {hasChildren ? (<button onClick={() => toggleExpanded(category.id)} className="text-gray-400 hover:text-gray-600">
                {isExpanded ? (<lucide_react_1.ChevronDown className="h-4 w-4"/>) : (<lucide_react_1.ChevronRight className="h-4 w-4"/>)}
              </button>) : (<div className="w-4 h-4"/>)}

            {/* Category Icon */}
            <div className={`p-1 rounded ${getColorClasses(category.color)}`}>
              {getIconComponent(category.icon)}
            </div>

            {/* Category Info */}
            <div className="flex-1 cursor-pointer" onClick={() => onCategorySelect?.(category)}>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{category.name}</span>
                {category.articleCount > 0 && (<badge_1.Badge variant="secondary" className="text-xs">
                    {category.articleCount}
                  </badge_1.Badge>)}
                {!category.isActive && (<badge_1.Badge variant="destructive" className="text-xs">
                    Pasif
                  </badge_1.Badge>)}
              </div>
              <div className="text-sm text-gray-500">/{category.slug}</div>
            </div>
          </div>

          {/* Actions */}
          {showActions && (<div className="flex items-center space-x-1">
              {hasChildren && (<button_1.Button variant="ghost" size="sm" onClick={() => onCategoryCreate?.(category.id)} className="h-8 w-8 p-0">
                  <lucide_react_1.Plus className="h-4 w-4"/>
                </button_1.Button>)}
              <button_1.Button variant="ghost" size="sm" onClick={() => onCategoryEdit?.(category)} className="h-8 w-8 p-0">
                <lucide_react_1.Pencil className="h-4 w-4"/>
              </button_1.Button>
              <button_1.Button variant="ghost" size="sm" onClick={() => onCategoryDelete?.(category.id)} className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                <lucide_react_1.Trash2 className="h-4 w-4"/>
              </button_1.Button>
            </div>)}
        </div>

        {/* Children */}
        {isExpanded && hasChildren && (<div>
            {category.children.map((child, childIndex) => renderCategory(child, childIndex, level + 1))}
          </div>)}
      </div>);
    };
    if (isLoading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Categories</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (<div key={i} className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>);
    }
    return (<card_1.Card>
      <card_1.CardHeader>
        <div className="flex items-center justify-between">
          <card_1.CardTitle>Kategoriler</card_1.CardTitle>
          {showActions && (<button_1.Button onClick={() => onCategoryCreate?.()} size="sm" className="flex items-center space-x-2">
              <lucide_react_1.Plus className="h-4 w-4"/>
              <span>Kategori Ekle</span>
            </button_1.Button>)}
        </div>
        
        {searchable && (<div className="relative">
            <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
            <input_1.Input placeholder="Kategori ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
          </div>)}
      </card_1.CardHeader>
      
      <card_1.CardContent className="p-0">
        {filteredCategories.length === 0 ? (<div className="p-8 text-center text-gray-500">
            {searchQuery ? 'Aramanızla eşleşen kategori bulunamadı.' : 'Henüz kategori bulunmuyor.'}
          </div>) : (<div className="min-h-[200px]">
            {filteredCategories.map((category, index) => renderCategory(category, index))}
          </div>)}
      </card_1.CardContent>
    </card_1.Card>);
};
exports.default = CategoryList;
//# sourceMappingURL=CategoryList.js.map