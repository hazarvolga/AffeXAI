"use strict";
/**
 * Main export file for @aluplan/shared-types
 *
 * This file exports all shared types used across frontend and backend
 */
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Common types
__exportStar(require("./common.types"), exports);
// User types
__exportStar(require("./user.types"), exports);
// Authentication types
__exportStar(require("./auth.types"), exports);
// CMS types
__exportStar(require("./cms.types"), exports);
// Media types
__exportStar(require("./media.types"), exports);
// Notification types
__exportStar(require("./notification.types"), exports);
// Event types
__exportStar(require("./event.types"), exports);
// Email Marketing types
__exportStar(require("./email-marketing.types"), exports);
//# sourceMappingURL=index.js.map