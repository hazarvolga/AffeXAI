"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PortalDashboardRootPage;
const navigation_1 = require("next/navigation");
// This page now acts as a simple entry point to the portal's default view.
// The role-based routing and display logic is now handled by the layout and the specific /portal/dashboard/[role] pages.
// We redirect to the 'customer' dashboard as the default landing page for the portal.
function PortalDashboardRootPage() {
    (0, navigation_1.redirect)('/portal/dashboard/customer');
}
//# sourceMappingURL=page.js.map