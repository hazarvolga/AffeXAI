"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicLayout;
const header_1 = require("@/components/layout/header");
const footer_1 = require("@/components/layout/footer");
function PublicLayout({ children, }) {
    return (<div className="flex min-h-screen flex-col bg-background">
      <header_1.Header />
      <main className="flex-1">{children}</main>
      <footer_1.Footer />
    </div>);
}
//# sourceMappingURL=layout.js.map