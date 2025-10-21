"use strict";
/**
 * User Menu Component
 *
 * Displays user profile and logout option.
 */
'use client';
/**
 * User Menu Component
 *
 * Displays user profile and logout option.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMenu = UserMenu;
const auth_1 = require("@/lib/auth");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const avatar_1 = require("@/components/ui/avatar");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
function UserMenu() {
    const router = (0, navigation_1.useRouter)();
    const { user, logout } = (0, auth_1.useAuth)();
    if (!user)
        return null;
    const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };
    return (<dropdown_menu_1.DropdownMenu>
      <dropdown_menu_1.DropdownMenuTrigger asChild>
        <button_1.Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <avatar_1.Avatar className="h-10 w-10">
            <avatar_1.AvatarImage src={user.profilePictureUrl} alt={`${user.firstName} ${user.lastName}`}/>
            <avatar_1.AvatarFallback>{initials}</avatar_1.AvatarFallback>
          </avatar_1.Avatar>
        </button_1.Button>
      </dropdown_menu_1.DropdownMenuTrigger>
      <dropdown_menu_1.DropdownMenuContent className="w-56" align="end" forceMount>
        <dropdown_menu_1.DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </dropdown_menu_1.DropdownMenuLabel>
        <dropdown_menu_1.DropdownMenuSeparator />
        <dropdown_menu_1.DropdownMenuItem onClick={() => router.push('/admin/profile')}>
          <lucide_react_1.User className="mr-2 h-4 w-4"/>
          <span>Profil</span>
        </dropdown_menu_1.DropdownMenuItem>
        <dropdown_menu_1.DropdownMenuItem onClick={() => router.push('/admin/settings')}>
          <lucide_react_1.Settings className="mr-2 h-4 w-4"/>
          <span>Ayarlar</span>
        </dropdown_menu_1.DropdownMenuItem>
        <dropdown_menu_1.DropdownMenuSeparator />
        <dropdown_menu_1.DropdownMenuItem onClick={handleLogout}>
          <lucide_react_1.LogOut className="mr-2 h-4 w-4"/>
          <span>Çıkış Yap</span>
        </dropdown_menu_1.DropdownMenuItem>
      </dropdown_menu_1.DropdownMenuContent>
    </dropdown_menu_1.DropdownMenu>);
}
//# sourceMappingURL=user-menu.js.map