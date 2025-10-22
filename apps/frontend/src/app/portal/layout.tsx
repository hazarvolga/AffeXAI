'use client';

import { ReactNode, Suspense, useState, useEffect, useCallback } from "react";
import { PortalHeader } from "@/components/portal/portal-header";
import { CollapsiblePortalSidebar } from "@/components/portal/collapsible-portal-sidebar";
import { AdminTopBar } from "@/components/portal/admin-top-bar";
import { usePathname, useRouter } from 'next/navigation';
import { authService, usersService, type CurrentUser } from '@/lib/api';
import { useAuth } from '@/lib/auth/auth-context';
import { useUserSync } from '@/hooks/useUserSync';
import { useToast } from '@/hooks/use-toast';
// import { User } from 'types-shared';
import { isStaffRole, isPortalRole } from '@/lib/permissions/constants';
import { ChatProvider } from '@/components/chat/chat-provider';

// Role name mapping from role ID
const roleIdToName: { [key: string]: string } = {
    'a1b2c3d4-e5f6-4789-abcd-000000000001': 'Admin',
    'a1b2c3d4-e5f6-4789-abcd-000000000002': 'Editor',
    'a1b2c3d4-e5f6-4789-abcd-000000000003': 'Customer',
    'a1b2c3d4-e5f6-4789-abcd-000000000004': 'Support Team',
    'a1b2c3d4-e5f6-4789-abcd-000000000005': 'Viewer',
};

// Helper to extract role from pathname
const getRoleFromPathname = (pathname: string): string => {
    const parts = pathname.split('/');
    if (parts.length > 3 && parts[1] === 'portal' && parts[2] === 'dashboard') {
        const rolePart = parts[3];
        // Handle URL encoding for "Support Team" etc.
        const roleName = rolePart ? decodeURIComponent(rolePart.replace(/\+/g, ' ')) : 'Customer';
        // Capitalize role names correctly e.g. "support-team" -> "Support Team"
        return roleName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return 'Customer';
}

export default function PortalLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();
    const { user: authUser, updateUser, isLoading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    
    // Use AuthContext user directly
    const currentUser = authUser;

    // Don't show sidebar and header on login page
    const isLoginPage = pathname === '/portal/login';

    /**
     * Handle role changes detected by useUserSync
     */
    const handleRoleChange = useCallback((newUser: any, oldUser: any) => {
        console.log('🔄 Role change detected in portal layout', {
            old: oldUser.roleNames,
            new: newUser.roleNames,
        });

        // Update AuthContext with new user data
        updateUser(newUser as any);

        // Show toast notification
        toast({
            title: "Yetkiniz Güncellendi",
            description: `Rol değişikliği tespit edildi. Yeni rolünüz: ${newUser.roleNames?.join(', ')}`,
            variant: "roleChange",
            duration: 5000,
        });

        // Check role transitions using helper functions
        const hasPortalRole = newUser.roles?.some((r: any) => isPortalRole(r.name));
        const hasStaffRole = newUser.roles?.some((r: any) => isStaffRole(r.name));
        const hadStaffRole = oldUser.roles?.some((r: any) => isStaffRole(r.name));

        // SCENARIO 1: Lost all portal roles, only staff roles remain → redirect to admin
        if (!hasPortalRole && hasStaffRole) {
            console.log('💡 User lost portal roles, only staff roles remain → redirect to admin');
            toast({
                title: "Rolünüz Değişti",
                description: "Artık sadece yönetici rolünüz var. Admin panele yönlendiriliyorsunuz...",
                variant: "roleChange",
                duration: 3000,
            });

            setTimeout(() => {
                router.push('/admin');
            }, 1500);
        }
        // SCENARIO 2: Demoted from staff to customer-only → stay in portal (already here)
        else if (hadStaffRole && !hasStaffRole && hasPortalRole) {
            console.log('📉 User demoted from staff to customer → staying in portal');
            toast({
                title: "Rolünüz Güncellendi",
                description: "Kullanıcı rolünüze geçiş yaptınız. Portal'da kalıyorsunuz.",
                variant: "roleChange",
                duration: 3000,
            });
            // Just stay in portal, no redirect needed
        }
        // SCENARIO 3: Other role changes → update widgets
        else {
            console.log('✅ Dashboard will auto-update with new role widgets');
        }
    }, [router, toast]);

    /**
     * Handle sync errors
     */
    const handleSyncError = useCallback((error: Error) => {
        console.error('❌ User sync error:', error);

        // Only show toast for non-network errors
        if (!error.message.includes('Network') && !error.message.includes('fetch')) {
            toast({
                title: "Senkronizasyon Hatası",
                description: "Kullanıcı bilgileri güncellenirken bir hata oluştu.",
                variant: "destructive",
                duration: 3000,
            });
        }
    }, [toast]);

    /**
     * Setup user sync (only when authenticated and not on login page)
     */
    const { isPolling, lastSync, syncNow } = useUserSync({
        enabled: !isLoginPage && !authLoading && !!authUser,
        onRoleChange: handleRoleChange,
        onError: handleSyncError,
        pollInterval: 10 * 1000, // 10 seconds for testing (change to 3 * 60 * 1000 for production)
    });
    
    // Check authentication and redirect logic (only on initial load)
    useEffect(() => {
        if (isLoginPage) {
            setLoading(false);
            return;
        }

        // Wait for AuthContext to load
        if (authLoading) {
            return;
        }

        // Check if user is authenticated
        if (!authUser) {
            console.log('🔄 No authenticated user, redirecting to login');
            router.push('/login');
            return;
        }

        // FLEXIBLE MULTI-PANEL ACCESS:
        // Staff roles can access portal if they also have portal roles
        // Only redirect if they have NO portal access at all
        const hasStaffRole = authUser.roles?.some((r: any) => isStaffRole(r.name));
        const hasPortalRole = authUser.roles?.some((r: any) => isPortalRole(r.name));

        // Only redirect to admin if:
        // 1. User has staff role AND
        // 2. User has NO portal role AND  
        // 3. This is NOT a direct navigation (pathname already /portal)
        const shouldSuggestAdminPanel = hasStaffRole && !hasPortalRole && pathname === '/portal/dashboard';

        if (shouldSuggestAdminPanel) {
            console.log('💡 Staff user without portal roles - suggesting admin panel');
            // Don't force redirect, just show a suggestion in the UI
            // They might be trying to access portal features
        }

        setLoading(false);
    }, [isLoginPage, authUser, authLoading]); // Removed pathname and router from deps to avoid loop

    if (authLoading || loading) {
        return (
            <div className="theme-portal flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (isLoginPage) {
        return <div className="theme-portal min-h-screen w-full">{children}</div>;
    }

    // Get user's role name
    const userRoleName = currentUser ? roleIdToName[currentUser.roleId] || 'Customer' : 'Customer';
    
    // Determine role from URL path first, then fallback to user's actual role
    const effectiveRole = getRoleFromPathname(pathname);

    // Show the admin bar only if the user has admin role ID
    const ADMIN_ROLE_ID = 'a1b2c3d4-e5f6-4789-abcd-000000000001';
    const isAdmin = currentUser?.roleId === ADMIN_ROLE_ID;

    return (
        <ChatProvider enableChat={true}>
            <div className="theme-portal flex min-h-screen w-full">
                <CollapsiblePortalSidebar user={currentUser} />
                <div className="flex flex-col flex-1 min-w-0">
                    {isAdmin && <AdminTopBar currentRole={effectiveRole} />}
                    <PortalHeader currentUser={currentUser} />
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
                        {children}
                    </main>
                </div>
            </div>
        </ChatProvider>
    );
}