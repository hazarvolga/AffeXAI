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
const react_1 = __importStar(require("react"));
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const container_component_1 = require("@/components/cms/container-component");
const card_component_1 = require("@/components/cms/card-component");
const grid_component_1 = require("@/components/cms/grid-component");
const CmsComponentTestPage = () => {
    const [buttonClickCount, setButtonClickCount] = (0, react_1.useState)(0);
    const handleButtonClick = () => {
        setButtonClickCount(buttonClickCount + 1);
    };
    return (<div className="container mx-auto py-8">
      <container_component_1.ContainerComponent padding="lg" background="primary" rounded={true} className="mb-8 text-center">
        <text_component_1.TextComponent id="heading" content="CMS Component Testing" variant="heading1" align="center" className="text-white mb-4"/>
        <text_component_1.TextComponent id="subtitle" content="Interactive demonstration of all CMS components" variant="heading2" align="center" className="text-white/90" color="secondary"/>
      </container_component_1.ContainerComponent>

      <container_component_1.ContainerComponent padding="md" className="mb-8">
        <text_component_1.TextComponent id="text-section" content="Text Component Examples" variant="heading2" className="mb-6"/>
        
        <div className="space-y-4">
          <text_component_1.TextComponent id="heading1-example" content="Heading 1 Example" variant="heading1"/>
          <text_component_1.TextComponent id="heading2-example" content="Heading 2 Example" variant="heading2"/>
          <text_component_1.TextComponent id="heading3-example" content="Heading 3 Example" variant="heading3"/>
          <text_component_1.TextComponent id="body-example" content="This is a body text example. It demonstrates the default text styling for paragraphs and general content." variant="body"/>
          <text_component_1.TextComponent id="caption-example" content="This is a caption text example. It's smaller and typically used for supplementary information." variant="caption" color="secondary"/>
          <text_component_1.TextComponent id="colored-example" content="This text uses color variations to demonstrate semantic styling." variant="body" color="success"/>
        </div>
      </container_component_1.ContainerComponent>

      <container_component_1.ContainerComponent padding="md" className="mb-8">
        <text_component_1.TextComponent id="button-section" content="Button Component Examples" variant="heading2" className="mb-6"/>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <button_component_1.ButtonComponent id="default-button" text="Default Button" variant="default" onClick={handleButtonClick}/>
          <button_component_1.ButtonComponent id="secondary-button" text="Secondary Button" variant="secondary" onClick={handleButtonClick}/>
          <button_component_1.ButtonComponent id="outline-button" text="Outline Button" variant="outline" onClick={handleButtonClick}/>
          <button_component_1.ButtonComponent id="destructive-button" text="Destructive Button" variant="destructive" onClick={handleButtonClick}/>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <button_component_1.ButtonComponent id="small-button" text="Small Button" variant="default" size="sm" onClick={handleButtonClick}/>
          <button_component_1.ButtonComponent id="large-button" text="Large Button" variant="default" size="lg" onClick={handleButtonClick}/>
        </div>
        
        <text_component_1.TextComponent id="button-click-count" content={`Button clicked ${buttonClickCount} times`} variant="body" color="secondary"/>
      </container_component_1.ContainerComponent>

      <container_component_1.ContainerComponent padding="md" className="mb-8">
        <text_component_1.TextComponent id="layout-section" content="Layout Components" variant="heading2" className="mb-6"/>
        
        <grid_component_1.GridComponent columns="auto" gap="lg">
          <card_component_1.CardComponent padding="lg" rounded="lg" shadow="md">
            <text_component_1.TextComponent id="card1-title" content="Card Component" variant="heading3" className="mb-2"/>
            <text_component_1.TextComponent id="card1-text" content="This is a card component demonstrating container styling with padding, rounded corners, and shadow effects." variant="body" color="secondary"/>
            <button_component_1.ButtonComponent id="card1-button" text="Card Action" variant="default" className="mt-4" onClick={handleButtonClick}/>
          </card_component_1.CardComponent>

          <card_component_1.CardComponent padding="lg" rounded="lg" shadow="md" background="muted">
            <text_component_1.TextComponent id="card2-title" content="Card with Background" variant="heading3" className="mb-2"/>
            <text_component_1.TextComponent id="card2-text" content="Cards can have different background colors for visual distinction." variant="body" color="secondary"/>
          </card_component_1.CardComponent>
        </grid_component_1.GridComponent>
      </container_component_1.ContainerComponent>

      <container_component_1.ContainerComponent padding="xl" background="muted" rounded="lg" className="text-center">
        <text_component_1.TextComponent id="conclusion" content="Component Testing Complete" variant="heading2" className="mb-4"/>
        <text_component_1.TextComponent id="conclusion-text" content="All CMS components are working correctly. You can interact with the buttons to see state changes." variant="body" color="secondary"/>
      </container_component_1.ContainerComponent>
    </div>);
};
exports.default = CmsComponentTestPage;
//# sourceMappingURL=page.js.map