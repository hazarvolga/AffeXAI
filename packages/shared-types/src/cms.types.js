"use strict";
/**
 * CMS types - Pages and Components
 * Based on backend CMS entities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemType = exports.MenuLocation = exports.ComponentType = exports.PageStatus = void 0;
/**
 * Page status enum
 */
var PageStatus;
(function (PageStatus) {
    PageStatus["DRAFT"] = "draft";
    PageStatus["PUBLISHED"] = "published";
    PageStatus["ARCHIVED"] = "archived";
})(PageStatus || (exports.PageStatus = PageStatus = {}));
/**
 * Component type enum
 */
var ComponentType;
(function (ComponentType) {
    ComponentType["TEXT"] = "text";
    ComponentType["BUTTON"] = "button";
    ComponentType["IMAGE"] = "image";
    ComponentType["CONTAINER"] = "container";
    ComponentType["CARD"] = "card";
    ComponentType["GRID"] = "grid";
    ComponentType["BLOCK"] = "block";
})(ComponentType || (exports.ComponentType = ComponentType = {}));
/**
 * Menu Location - where the menu will be displayed
 */
var MenuLocation;
(function (MenuLocation) {
    MenuLocation["HEADER"] = "header";
    MenuLocation["FOOTER"] = "footer";
    MenuLocation["SIDEBAR"] = "sidebar";
    MenuLocation["MOBILE"] = "mobile";
})(MenuLocation || (exports.MenuLocation = MenuLocation = {}));
/**
 * Menu Item Type
 */
var MenuItemType;
(function (MenuItemType) {
    MenuItemType["LINK"] = "link";
    MenuItemType["PAGE"] = "page";
    MenuItemType["CATEGORY"] = "category";
    MenuItemType["DROPDOWN"] = "dropdown";
    MenuItemType["MEGA_MENU"] = "mega-menu";
    MenuItemType["CUSTOM"] = "custom";
})(MenuItemType || (exports.MenuItemType = MenuItemType = {}));
//# sourceMappingURL=cms.types.js.map