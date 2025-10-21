"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const visual_editor_1 = require("@/components/cms/editor/visual-editor");
const navigation_1 = require("next/navigation");
const CmsEditorPage = () => {
    const searchParams = (0, navigation_1.useSearchParams)();
    const pageId = searchParams.get('pageId') || undefined;
    return (<div className="w-full h-screen overflow-hidden">
      <visual_editor_1.VisualEditor pageId={pageId}/>
    </div>);
};
exports.default = CmsEditorPage;
//# sourceMappingURL=page.js.map