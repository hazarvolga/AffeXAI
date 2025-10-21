"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutOptionsPanel = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const switch_1 = require("@/components/ui/switch");
const select_1 = require("@/components/ui/select");
const LayoutOptionsPanel = ({ layoutOptions, onLayoutOptionsChange }) => {
    const handleToggle = (field, value) => {
        console.log('Toggle changed:', field, value);
        const newLayoutOptions = {
            ...layoutOptions,
            [field]: value
        };
        console.log('New layout options:', newLayoutOptions);
        onLayoutOptionsChange(newLayoutOptions);
    };
    const handleBackgroundColorChange = (value) => {
        console.log('Background color changed:', value);
        const newLayoutOptions = {
            ...layoutOptions,
            backgroundColor: value
        };
        console.log('New layout options:', newLayoutOptions);
        onLayoutOptionsChange(newLayoutOptions);
    };
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Layout Options</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <label_1.Label htmlFor="show-title">Show Title</label_1.Label>
          <switch_1.Switch id="show-title" checked={layoutOptions.showTitle} onCheckedChange={(checked) => handleToggle('showTitle', checked)}/>
        </div>
        
        <div className="flex items-center justify-between">
          <label_1.Label htmlFor="show-header">Show Header</label_1.Label>
          <switch_1.Switch id="show-header" checked={layoutOptions.showHeader} onCheckedChange={(checked) => handleToggle('showHeader', checked)}/>
        </div>
        
        <div className="flex items-center justify-between">
          <label_1.Label htmlFor="show-footer">Show Footer</label_1.Label>
          <switch_1.Switch id="show-footer" checked={layoutOptions.showFooter} onCheckedChange={(checked) => handleToggle('showFooter', checked)}/>
        </div>
        
        <div className="flex items-center justify-between">
          <label_1.Label htmlFor="full-width">Full Width</label_1.Label>
          <switch_1.Switch id="full-width" checked={layoutOptions.fullWidth} onCheckedChange={(checked) => handleToggle('fullWidth', checked)}/>
        </div>
        
        <div className="space-y-2">
          <label_1.Label>Background Color</label_1.Label>
          <select_1.Select value={layoutOptions.backgroundColor} onValueChange={handleBackgroundColorChange}>
            <select_1.SelectTrigger>
              <select_1.SelectValue placeholder="Select background color"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="bg-background">Default</select_1.SelectItem>
              <select_1.SelectItem value="bg-white">White</select_1.SelectItem>
              <select_1.SelectItem value="bg-gray-50">Light Gray</select_1.SelectItem>
              <select_1.SelectItem value="bg-gray-100">Gray</select_1.SelectItem>
              <select_1.SelectItem value="bg-blue-50">Light Blue</select_1.SelectItem>
              <select_1.SelectItem value="bg-green-50">Light Green</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
};
exports.LayoutOptionsPanel = LayoutOptionsPanel;
exports.default = exports.LayoutOptionsPanel;
//# sourceMappingURL=layout-options-panel.js.map