"use strict";
/**
 * Media management types
 * Based on backend Media entity
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageType = exports.MediaType = void 0;
/**
 * Media type enum
 */
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "image";
    MediaType["DOCUMENT"] = "document";
    MediaType["VIDEO"] = "video";
    MediaType["AUDIO"] = "audio";
})(MediaType || (exports.MediaType = MediaType = {}));
/**
 * Storage type enum
 */
var StorageType;
(function (StorageType) {
    StorageType["LOCAL"] = "local";
    StorageType["CLOUD"] = "cloud";
})(StorageType || (exports.StorageType = StorageType = {}));
//# sourceMappingURL=media.types.js.map