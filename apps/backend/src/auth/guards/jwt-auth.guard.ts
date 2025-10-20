import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../../modules/users/users.service';

/**
 * JWT Authentication Guard
 * Validates JWT token from Authorization header
 * Fetches fresh user data with roles from DB on each request
 * Validates tokenVersion to invalidate old tokens on role changes
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    console.log('🔐 JwtAuthGuard: Checking authorization header:', {
      hasAuthHeader: !!request.headers.authorization,
      authHeaderValue: request.headers.authorization ? request.headers.authorization.substring(0, 20) + '...' : 'MISSING',
      hasToken: !!token,
      url: request.url,
      method: request.method
    });
    
    if (!token) {
      console.log('🔐 JwtAuthGuard: No token provided');
      throw new UnauthorizedException('No token provided');
    }
    
    try {
      // Step 1: Verify JWT signature
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'aluplan-secret-key',
      });

      console.log('🔐 JwtAuthGuard: Token verified for user:', payload.email);

      // Step 2: Fetch fresh user data with roles from DB
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        console.log('🔐 JwtAuthGuard: User not found:', payload.sub);
        throw new UnauthorizedException('User not found');
      }

      if (!user.isActive) {
        console.log('🔐 JwtAuthGuard: User is inactive:', payload.sub);
        throw new UnauthorizedException('User is inactive');
      }

      // Step 3: Validate tokenVersion (invalidate old tokens on role changes)
      const tokenVersion = payload.tokenVersion || 1;
      const currentVersion = user.tokenVersion || 1;

      if (tokenVersion !== currentVersion) {
        console.log('🔐 JwtAuthGuard: Token version mismatch (role changed):', {
          tokenVersion,
          currentVersion,
          userId: user.id,
        });
        throw new UnauthorizedException('Token expired due to role change');
      }

      console.log('🔐 JwtAuthGuard: User authenticated with roles:', user.roleNames);

      // Step 4: Attach fresh user data to request (with all current roles)
      request['user'] = {
        id: user.id,
        email: user.email,
        roles: user.roles, // Fresh roles from DB
        roleNames: user.roleNames, // Fresh role names
        primaryRole: user.primaryRole, // Fresh primary role
      };
    } catch (error) {
      console.log('🔐 JwtAuthGuard: Authentication failed:', error.message);
      throw new UnauthorizedException(error.message || 'Invalid token');
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
