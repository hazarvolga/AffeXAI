"use strict";
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
exports.ImageComponent = void 0;
const react_1 = __importStar(require("react"));
const image_1 = __importDefault(require("next/image"));
const utils_1 = require("@/lib/utils");
const preview_context_1 = require("@/components/cms/preview-context");
const editable_text_1 = require("@/components/cms/editor/editable-text");
const ImageComponent = ({ id, src: initialSrc, mediaId, alt, className, width, height, fit = 'cover', position = 'center', caption, rounded = 'none', shadow = 'none', border = false, borderColor = 'default', lazy = true, }) => {
    // Use preview context instead of editor context
    const previewContext = (0, preview_context_1.usePreview)();
    const isEditMode = previewContext?.isEditMode || false;
    // In live mode, we don't need to update component props
    const updateComponentProps = () => { };
    // Helper: Check if a string looks like a UUID (mediaId)
    const isUUID = (str) => {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
    };
    // Don't use initialSrc if it looks like a UUID (it's a mediaId, not a URL)
    const validInitialSrc = initialSrc && !isUUID(initialSrc) ? initialSrc : '';
    const [src, setSrc] = (0, react_1.useState)(validInitialSrc);
    const [loading, setLoading] = (0, react_1.useState)(!!mediaId);
    // Fetch media URL from mediaId
    (0, react_1.useEffect)(() => {
        const fetchMediaUrl = async () => {
            if (mediaId) {
                try {
                    setLoading(true);
                    // Call media API to get URL
                    const response = await fetch(`/api/media/${mediaId}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.url) {
                            setSrc(data.url);
                        }
                        else {
                            setSrc(validInitialSrc);
                        }
                    }
                    else {
                        setSrc(validInitialSrc);
                    }
                }
                catch (error) {
                    console.error('Error fetching media URL:', error);
                    setSrc(validInitialSrc);
                }
                finally {
                    setLoading(false);
                }
            }
            else {
                setSrc(validInitialSrc);
                setLoading(false);
            }
        };
        fetchMediaUrl();
    }, [mediaId, validInitialSrc]);
    const getRoundedClass = () => {
        switch (rounded) {
            case 'sm': return 'rounded-sm';
            case 'md': return 'rounded-md';
            case 'lg': return 'rounded-lg';
            case 'full': return 'rounded-full';
            default: return '';
        }
    };
    const getShadowClass = () => {
        switch (shadow) {
            case 'sm': return 'shadow-sm';
            case 'md': return 'shadow';
            case 'lg': return 'shadow-lg';
            default: return '';
        }
    };
    const getBorderColorClass = () => {
        switch (borderColor) {
            case 'primary': return 'border-primary';
            case 'secondary': return 'border-secondary';
            default: return 'border-border';
        }
    };
    const handleCaptionChange = (newCaption) => {
        updateComponentProps();
    };
    const imageClasses = (0, utils_1.cn)('block', getRoundedClass(), getShadowClass(), fit === 'cover' && 'object-cover', fit === 'contain' && 'object-contain', fit === 'fill' && 'object-fill', fit === 'none' && 'object-none', position === 'center' && 'object-center', position === 'top' && 'object-top', position === 'bottom' && 'object-bottom', position === 'left' && 'object-left', position === 'right' && 'object-right', border && ['border', getBorderColorClass()], className);
    // Don't render the image if src is empty or still loading
    if (loading) {
        return (<figure id={id} className="relative">
        <div className={(0, utils_1.cn)("bg-gray-100 border rounded-xl w-full h-48 flex items-center justify-center animate-pulse", className)}>
          <span className="text-gray-400">Loading image...</span>
        </div>
      </figure>);
    }
    if (!src) {
        return (<figure id={id} className="relative">
        <div className={(0, utils_1.cn)("bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center", className)}>
          <span className="text-gray-500">No image selected</span>
        </div>
        {caption !== undefined && (isEditMode ? (<editable_text_1.EditableText value={caption} onChange={handleCaptionChange} tagName="figcaption" className="text-center text-sm text-muted-foreground mt-2 outline-none focus:outline focus:outline-blue-300" placeholder="Enter caption..."/>) : (<figcaption className="text-center text-sm text-muted-foreground mt-2">
              {caption}
            </figcaption>))}
      </figure>);
    }
    return (<figure id={id} className="relative">
      <image_1.default src={src} alt={alt} className={imageClasses} width={typeof width === 'number' ? width : parseInt(width) || 800} height={typeof height === 'number' ? height : parseInt(height) || 600} loading={lazy ? 'lazy' : 'eager'}/>
      {caption !== undefined && (isEditMode ? (<editable_text_1.EditableText value={caption} onChange={handleCaptionChange} tagName="figcaption" className="text-center text-sm text-muted-foreground mt-2 outline-none focus:outline focus:outline-blue-300" placeholder="Enter caption..."/>) : (<figcaption className="text-center text-sm text-muted-foreground mt-2">
            {caption}
          </figcaption>))}
    </figure>);
};
exports.ImageComponent = ImageComponent;
exports.default = exports.ImageComponent;
//# sourceMappingURL=image-component.js.map