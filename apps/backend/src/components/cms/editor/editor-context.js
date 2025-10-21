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
exports.useEditor = exports.EditorProvider = void 0;
const react_1 = __importStar(require("react"));
const EditorContext = (0, react_1.createContext)(undefined);
const EditorProvider = ({ children, onComponentUpdate }) => {
    const [isEditMode, setIsEditMode] = (0, react_1.useState)(true);
    const updateComponentProps = (componentId, props) => {
        onComponentUpdate(componentId, props);
    };
    return (<EditorContext.Provider value={{
            isEditMode,
            setIsEditMode,
            updateComponentProps
        }}>
      {children}
    </EditorContext.Provider>);
};
exports.EditorProvider = EditorProvider;
const useEditor = () => {
    const context = (0, react_1.useContext)(EditorContext);
    if (context === undefined) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
};
exports.useEditor = useEditor;
//# sourceMappingURL=editor-context.js.map