"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRenderer = void 0;
const react_1 = __importDefault(require("react"));
const text_component_1 = require("./text-component");
const button_component_1 = require("./button-component");
const image_component_1 = require("./image-component");
const container_component_1 = require("./container-component");
const card_component_1 = require("./card-component");
const grid_component_1 = require("./grid-component");
const preview_context_1 = require("./preview-context");
const PageRenderer = ({ components }) => {
    const renderComponent = (component) => {
        switch (component.type) {
            case 'text':
                return <text_component_1.TextComponent key={component.id} {...component.props}/>;
            case 'button':
                return <button_component_1.ButtonComponent key={component.id} {...component.props}/>;
            case 'image':
                return <image_component_1.ImageComponent key={component.id} {...component.props}/>;
            case 'container':
                return (<container_component_1.ContainerComponent key={component.id} {...component.props}>
            {component.children?.map(renderComponent)}
          </container_component_1.ContainerComponent>);
            case 'card':
                return (<card_component_1.CardComponent key={component.id} {...component.props}>
            {component.children?.map(renderComponent)}
          </card_component_1.CardComponent>);
            case 'grid':
                return (<grid_component_1.GridComponent key={component.id} {...component.props}>
            {component.children?.map(renderComponent)}
          </grid_component_1.GridComponent>);
            default:
                return null;
        }
    };
    return (<preview_context_1.PreviewProvider initialMode="public">
      <div className="cms-page">
        {components.map(renderComponent)}
      </div>
    </preview_context_1.PreviewProvider>);
};
exports.PageRenderer = PageRenderer;
exports.default = exports.PageRenderer;
//# sourceMappingURL=page-renderer.js.map