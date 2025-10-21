"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutComponent = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const checkbox_1 = require("@/components/ui/checkbox");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const LayoutComponent = ({ showHeader = true, showFooter = true, fullWidth = false, backgroundColor = 'bg-background', showTitle = true, onLayoutChange, }) => {
    const handleToggle = (field, value) => {
        onLayoutChange({ [field]: value });
    };
    const handleSelectChange = (field, value) => {
        onLayoutChange({ [field]: value });
    };
    return (<card_1.Card className="w-full">
      <card_1.CardHeader>
        <card_1.CardTitle>Layout Options</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <checkbox_1.Checkbox id="showHeader" checked={showHeader} onCheckedChange={(checked) => handleToggle('showHeader', !!checked)}/>
            <label_1.Label htmlFor="showHeader">Show Header</label_1.Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <checkbox_1.Checkbox id="showFooter" checked={showFooter} onCheckedChange={(checked) => handleToggle('showFooter', !!checked)}/>
            <label_1.Label htmlFor="showFooter">Show Footer</label_1.Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <checkbox_1.Checkbox id="fullWidth" checked={fullWidth} onCheckedChange={(checked) => handleToggle('fullWidth', !!checked)}/>
            <label_1.Label htmlFor="fullWidth">Full Width Layout</label_1.Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <checkbox_1.Checkbox id="showTitle" checked={showTitle} onCheckedChange={(checked) => handleToggle('showTitle', !!checked)}/>
            <label_1.Label htmlFor="showTitle">Show Page Title</label_1.Label>
          </div>
        </div>
        
        <div className="space-y-2">
          <label_1.Label htmlFor="backgroundColor">Background Color</label_1.Label>
          <select_1.Select value={backgroundColor} onValueChange={(value) => handleSelectChange('backgroundColor', value)}>
            <select_1.SelectTrigger>
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="bg-background">Default Background</select_1.SelectItem>
              <select_1.SelectItem value="bg-white">White</select_1.SelectItem>
              <select_1.SelectItem value="bg-gray-50">Light Gray</select_1.SelectItem>
              <select_1.SelectItem value="bg-gray-100">Gray</select_1.SelectItem>
              <select_1.SelectItem value="bg-blue-50">Light Blue</select_1.SelectItem>
              <select_1.SelectItem value="bg-green-50">Light Green</select_1.SelectItem>
              <select_1.SelectItem value="bg-yellow-50">Light Yellow</select_1.SelectItem>
              <select_1.SelectItem value="bg-red-50">Light Red</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
};
exports.LayoutComponent = LayoutComponent;
exports.default = exports.LayoutComponent;
//# sourceMappingURL=layout-component.js.map