"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTopBar = AdminTopBar;
const lucide_react_1 = require("lucide-react");
const select_1 = require("@/components/ui/select");
const roles_data_1 = require("@/lib/roles-data");
const react_1 = __importDefault(require("react"));
const navigation_1 = require("next/navigation");
const roleUrlMap = {
    'Admin': '/portal/dashboard/admin',
    'Editor': '/portal/dashboard/editor',
    'Support Team': '/portal/dashboard/support-team',
    'Marketing Team': '/portal/dashboard/marketing-team',
    'Viewer': '/portal/dashboard/viewer',
    'Customer': '/portal/dashboard/customer',
};
function AdminTopBar({ currentRole }) {
    const router = (0, navigation_1.useRouter)();
    const handleRoleChange = (newRole) => {
        const newUrl = roleUrlMap[newRole];
        if (newUrl) {
            router.push(newUrl);
        }
    };
    return (<div className="bg-destructive text-destructive-foreground p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <lucide_react_1.Shield className="h-5 w-5"/>
          <span>Admin Görünümü</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-sm">Portalı şu rol olarak görüntüle:</span>
           <select_1.Select value={currentRole} onValueChange={handleRoleChange}>
              <select_1.SelectTrigger className="w-[180px] h-8 bg-destructive-foreground/20 border-destructive-foreground/50 text-destructive-foreground">
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                 {roles_data_1.roles.map(role => (<select_1.SelectItem key={role.id} value={role.name}>{role.name}</select_1.SelectItem>))}
              </select_1.SelectContent>
            </select_1.Select>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=admin-top-bar.js.map