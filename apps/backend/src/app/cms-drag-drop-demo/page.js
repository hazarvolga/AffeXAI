"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const drag_drop_demo_1 = require("@/components/cms/drag-drop-demo");
const CmsDragDropDemoPage = () => {
    return (<div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CMS Drag & Drop Demo</h1>
        <p className="text-muted-foreground">
          Demonstration of the drag-and-drop interface for the Aluplan CMS
        </p>
      </div>
      
      <drag_drop_demo_1.DragDropDemo />
      
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-2">How it works</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Drag components from the left panel to the canvas</li>
          <li>Click on components to select and configure them</li>
          <li>Remove components using the remove button</li>
          <li>In a full implementation, this would be connected to a visual editor</li>
        </ul>
      </div>
    </div>);
};
exports.default = CmsDragDropDemoPage;
//# sourceMappingURL=page.js.map