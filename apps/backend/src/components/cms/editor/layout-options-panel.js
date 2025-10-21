"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutOptionsPanel = void 0;
const react_1 = __importDefault(require("react"));
const layout_component_1 = require("./layout-component");
const LayoutOptionsPanel = ({ layoutOptions, onLayoutOptionsChange }) => {
    return (<div className="p-4">
      <layout_component_1.LayoutComponent showHeader={layoutOptions.showHeader} showFooter={layoutOptions.showFooter} fullWidth={layoutOptions.fullWidth} backgroundColor={layoutOptions.backgroundColor} showTitle={layoutOptions.showTitle} onLayoutChange={onLayoutOptionsChange}/>
    </div>);
};
exports.LayoutOptionsPanel = LayoutOptionsPanel;
exports.default = exports.LayoutOptionsPanel;
//# sourceMappingURL=layout-options-panel.js.map