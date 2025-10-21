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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaReplacer = void 0;
const react_1 = __importStar(require("react"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const image_1 = __importDefault(require("next/image"));
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const lucide_react_1 = require("lucide-react");
const skeleton_1 = require("@/components/loading/skeleton");
// Lazy load MediaLibrary - only loaded when dialog is opened
const MediaLibrary = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./media-library'))).then(mod => ({ default: mod.MediaLibrary })), {
    loading: () => <skeleton_1.Skeleton className="h-[400px] w-full"/>,
    ssr: false,
});
const MediaReplacer = ({ currentSrc, onMediaSelect, className = '' }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const handleMediaSelect = (media) => {
        onMediaSelect(media);
        setIsOpen(false);
    };
    return (<dialog_1.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <dialog_1.DialogTrigger asChild>
        <button_1.Button variant="outline" size="sm" className={`flex items-center gap-2 ${className}`}>
          <lucide_react_1.Upload className="h-4 w-4"/>
          Replace Media
        </button_1.Button>
      </dialog_1.DialogTrigger>
      <dialog_1.DialogContent className="max-w-4xl max-h-[80vh]">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Replace Media</dialog_1.DialogTitle>
        </dialog_1.DialogHeader>
        <div className="py-4">
          {currentSrc && (<div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Current Media</h4>
              <div className="border rounded-lg p-2 inline-block">
                <image_1.default src={currentSrc} alt="Current media" width={128} height={128} className="max-h-32 max-w-full object-contain"/>
              </div>
            </div>)}
          <MediaLibrary onMediaSelect={handleMediaSelect}/>
        </div>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
};
exports.MediaReplacer = MediaReplacer;
exports.default = exports.MediaReplacer;
//# sourceMappingURL=media-replacer.js.map