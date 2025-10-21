"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockRegistry = void 0;
exports.isBlockType = isBlockType;
const text_component_1 = require("./text-component");
const button_component_1 = require("./button-component");
const image_component_1 = require("./image-component");
const container_component_1 = require("./container-component");
const card_component_1 = require("./card-component");
const grid_component_1 = require("./grid-component");
// Block registry pattern - maps component types to their implementations
exports.blockRegistry = {
    text: text_component_1.TextComponent,
    button: button_component_1.ButtonComponent,
    image: image_component_1.ImageComponent,
    container: container_component_1.ContainerComponent,
    card: card_component_1.CardComponent,
    grid: grid_component_1.GridComponent,
};
// Type guard to check if a type is a valid block type
function isBlockType(type) {
    return type in exports.blockRegistry;
}
//# sourceMappingURL=block-registry.js.map