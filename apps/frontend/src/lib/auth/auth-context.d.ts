/**
 * Authentication Context
 *
 * Provides authentication state and methods throughout the application.
 * Uses React Context API for global state management.
 */
import React from 'react';
import type { LoginDto, LoginResponse, UserRole } from '@affexai/shared-types';
import type { CurrentUser } from '../api/authService';
/**
 * Authentication state
 */
export interface AuthState {
    user: CurrentUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
/**
 * Authentication context value
 */
export interface AuthContextValue extends AuthState {
    login: (credentials: LoginDto) => Promise<LoginResponse>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    updateUser: (user: Partial<CurrentUser>) => void;
    hasRole: (role: UserRole) => boolean;
    hasAnyRole: (roles: UserRole[]) => boolean;
    clearError: () => void;
}
declare const AuthContext: React.Context<AuthContextValue | undefined>;
export interface AuthProviderProps {
    children: React.ReactNode;
}
/**
 * Authentication Provider
 *
 * Wraps the application to provide authentication state and methods.
 * Automatically restores session from stored tokens on mount.
 */
export declare function AuthProvider({ children }: AuthProviderProps): React.JSX.Element;
/**
 * Use authentication context
 *
 * @throws Error if used outside AuthProvider
 * @returns Authentication context value
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 *
 * if (isAuthenticated) {
 *   return <div>Welcome, {user.name}!</div>;
 * }
 * ```
 */
export declare function useAuth(): AuthContextValue;
export default AuthContext;
//# sourceMappingURL=auth-context.d.ts.map