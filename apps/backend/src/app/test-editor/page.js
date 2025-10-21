"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestEditorPage;
const react_1 = __importDefault(require("react"));
const visual_editor_1 = require("@/components/cms/editor/visual-editor");
function TestEditorPage() {
    return (<div className="h-screen">
      <visual_editor_1.VisualEditor />
    </div>);
}
//# sourceMappingURL=page.js.map