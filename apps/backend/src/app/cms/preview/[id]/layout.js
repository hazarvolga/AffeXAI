"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CmsPreviewLayout;
// This layout provides a basic structure for CMS preview pages
// Header and footer are now handled per-page based on layout options
function CmsPreviewLayout({ children, }) {
    return (<div className="flex min-h-screen flex-col bg-background">
      {children}
    </div>);
}
//# sourceMappingURL=layout.js.map