"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CmsLayout;
// This layout provides a basic structure for CMS pages
// Header and footer are now handled per-page based on layout options
function CmsLayout({ children, }) {
    return (<div className="flex min-h-screen flex-col bg-background">
      {children}
    </div>);
}
//# sourceMappingURL=layout.js.map