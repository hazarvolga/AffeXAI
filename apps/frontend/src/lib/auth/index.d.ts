/**
 * Authentication Module
 *
 * Barrel export for all authentication-related exports.
 */
export { AuthProvider, useAuth } from './auth-context';
export type { AuthState, AuthContextValue, AuthProviderProps } from './auth-context';
export { authService } from '../api/authService';
export { tokenStorage } from './token-storage';
export type { StorageType, TokenStorageConfig } from './token-storage';
export { ProtectedRoute, withAuth } from './protected-route';
export type { ProtectedRouteProps } from './protected-route';
export type { LoginDto, LoginResponse, RefreshTokenDto, RefreshTokenResponse, PasswordResetRequestDto, PasswordResetDto, ChangePasswordDto, AuthSession, TokenPayload, } from '@affexai/shared-types';
//# sourceMappingURL=index.d.ts.map