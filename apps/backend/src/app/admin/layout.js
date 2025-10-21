"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
const react_1 = __importDefault(require("react"));
const dashboard_sidebar_1 = require("@/components/admin/dashboard-sidebar");
const dashboard_header_1 = require("@/components/admin/dashboard-header");
const navigation_1 = require("next/navigation");
function DashboardLayout({ children }) {
    const pathname = (0, navigation_1.usePathname)();
    // Don't show sidebar and header on login page
    const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';
    if (isLoginPage) {
        return <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">{children}</div>;
    }
    return (<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <dashboard_sidebar_1.DashboardSidebar />
      <div className="flex flex-col">
        <dashboard_header_1.DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>);
}
//# sourceMappingURL=layout.js.map