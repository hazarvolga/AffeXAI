"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const text_component_1 = require("@/components/cms/text-component");
const button_component_1 = require("@/components/cms/button-component");
const container_component_1 = require("@/components/cms/container-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const CmsResponsiveDemoPage = () => {
    return (<div className="container mx-auto py-8">
      <container_component_1.ContainerComponent padding="lg" background="primary" rounded={true} className="mb-8 text-center">
        <text_component_1.TextComponent id="heading" content="Responsive CMS Demo" variant="heading1" align="center" className="text-white mb-4"/>
        <text_component_1.TextComponent id="subtitle" content="Showcasing responsive design across all components" variant="heading2" align="center" className="text-white/90" color="secondary"/>
      </container_component_1.ContainerComponent>

      <container_component_1.ContainerComponent padding="md" className="mb-8">
        <text_component_1.TextComponent id="section1-heading" content="Responsive Text Components" variant="heading2" className="mb-4"/>
        <text_component_1.TextComponent id="section1-text1" content="This is a body text that will adapt to different screen sizes. On mobile devices, the text will be easier to read with appropriate spacing and sizing." variant="body" className="mb-4"/>
        <text_component_1.TextComponent id="section1-text2" content="Notice how the alignment and spacing adjust based on the viewport size." variant="body" color="secondary"/>
      </container_component_1.ContainerComponent>

      <container_component_1.ContainerComponent padding="md" className="mb-8">
        <text_component_1.TextComponent id="section2-heading" content="Responsive Grid Layout" variant="heading2" className="mb-6"/>
        <grid_component_1.GridComponent columns="auto" gap="lg">
          <card_component_1.CardComponent padding="lg" rounded="lg" shadow="md" className="text-center">
            <text_component_1.TextComponent id="card1-title" content="Mobile First" variant="heading3" className="mb-2"/>
            <text_component_1.TextComponent id="card1-text" content="This card layout adjusts from 1 column on mobile to 3 columns on desktop." variant="body" color="secondary"/>
            <button_component_1.ButtonComponent id="card1-button" text="Learn More" variant="default" className="mt-4"/>
          </card_component_1.CardComponent>

          <card_component_1.CardComponent padding="lg" rounded="lg" shadow="md" className="text-center">
            <text_component_1.TextComponent id="card2-title" content="Flexible Grid" variant="heading3" className="mb-2"/>
            <text_component_1.TextComponent id="card2-text" content="The grid system automatically adjusts based on available space." variant="body" color="secondary"/>
            <button_component_1.ButtonComponent id="card2-button" text="Explore" variant="outline" className="mt-4"/>
          </card_component_1.CardComponent>

          <card_component_1.CardComponent padding="lg" rounded="lg" shadow="md" className="text-center">
            <text_component_1.TextComponent id="card3-title" content="Consistent Design" variant="heading3" className="mb-2"/>
            <text_component_1.TextComponent id="card3-text" content="All components maintain consistent styling across devices." variant="body" color="secondary"/>
            <button_component_1.ButtonComponent id="card3-button" text="Get Started" variant="secondary" className="mt-4"/>
          </card_component_1.CardComponent>
        </grid_component_1.GridComponent>
      </container_component_1.ContainerComponent>

      <container_component_1.ContainerComponent padding="xl" background="muted" rounded="lg" className="text-center mb-8">
        <text_component_1.TextComponent id="cta-heading" content="Experience Responsive Design" variant="heading2" className="mb-4"/>
        <text_component_1.TextComponent id="cta-text" content="Resize your browser window to see how components adapt to different screen sizes." variant="body" color="secondary" className="mb-6"/>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button_component_1.ButtonComponent id="cta-button1" text="View Documentation" variant="default" size="lg"/>
          <button_component_1.ButtonComponent id="cta-button2" text="Try Demo" variant="outline" size="lg"/>
        </div>
      </container_component_1.ContainerComponent>

      <container_component_1.ContainerComponent padding="md">
        <text_component_1.TextComponent id="footer-heading" content="Cross-Device Consistency" variant="heading3" className="mb-4 text-center"/>
        <text_component_1.TextComponent id="footer-text" content="All CMS components are built with responsive design principles, ensuring a consistent experience across desktop, tablet, and mobile devices. The flexible grid system, adaptive typography, and scalable components work together to provide an optimal viewing experience on any device." variant="body" align="center" color="secondary"/>
      </container_component_1.ContainerComponent>
    </div>);
};
exports.default = CmsResponsiveDemoPage;
//# sourceMappingURL=page.js.map