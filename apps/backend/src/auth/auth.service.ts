import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { MailService } from '../modules/mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { AuthUtilsService } from '../shared/auth-utils.service';
import { randomBytes } from 'crypto';
import { MailChannel } from '../modules/mail/interfaces/mail-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authUtilsService: AuthUtilsService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.authUtilsService.comparePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return null;
    }

    // JWT Payload Strategy: Minimal data to avoid stale role/permission issues
    // Role information is fetched fresh from DB on each request via JWT strategy
    const payload = {
      sub: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion || 1, // For invalidating tokens on role changes
    };

    // Generate access token (60 minutes)
    const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });

    // Generate refresh token (7 days)
    const refreshToken = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: '7d' }
    );

    // Store refresh token in database
    const refreshTokenExpires = new Date();
    refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7);

    await this.usersService.updateUser(user.id, {
      refreshToken,
      refreshTokenExpires,
      lastLoginAt: new Date(),
    });

    // Return user info for initial frontend state (NOT in JWT)
    // Include role information for immediate UI rendering
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600, // 60 minutes in seconds
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        // Legacy roleId for backward compatibility
        roleId: user.roleEntity?.name || null,
        // Multi-role support: include all roles with full details
        roles: user.userRoles?.map(ur => ({
          id: ur.role.id,
          name: ur.role.name,
          displayName: ur.role.displayName,
          isPrimary: ur.isPrimary,
        })) || [],
        // Primary role for quick access
        primaryRole: user.userRoles?.find(ur => ur.isPrimary)?.role
          ? {
              id: user.userRoles.find(ur => ur.isPrimary).role.id,
              name: user.userRoles.find(ur => ur.isPrimary).role.name,
              displayName: user.userRoles.find(ur => ur.isPrimary).role.displayName,
            }
          : user.roleEntity
          ? {
              id: user.roleEntity.id,
              name: user.roleEntity.name,
              displayName: user.roleEntity.displayName,
            }
          : null,
      },
    };
  }

  async checkEmailExists(email: string): Promise<boolean> {
    // Skip cache for accurate email existence check
    const user = await this.usersService.findByEmail(email, true);
    return !!user;
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken);

      // Validate token type
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Get user and verify stored refresh token
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (user.refreshTokenExpires && user.refreshTokenExpires < new Date()) {
        throw new UnauthorizedException('Refresh token expired');
      }

      // Generate new access token with minimal payload
      const newPayload = {
        sub: user.id,
        email: user.email,
        tokenVersion: user.tokenVersion || 1,
      };

      const newAccessToken = this.jwtService.sign(newPayload, { expiresIn: '60m' });

      // Rotate refresh token (security best practice)
      const newRefreshToken = this.jwtService.sign(
        { sub: user.id, type: 'refresh' },
        { expiresIn: '7d' }
      );

      const refreshTokenExpires = new Date();
      refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7);

      await this.usersService.updateUser(user.id, {
        refreshToken: newRefreshToken,
        refreshTokenExpires,
      });

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: 3600,
      };
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw new UnauthorizedException('Token refresh failed');
    }
  }

  /**
   * Generate email verification token
   */
  generateVerificationToken(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Create email verification token for user
   * Returns the token (to be sent via email)
   */
  async createEmailVerificationToken(userId: string): Promise<string> {
    const token = this.generateVerificationToken();
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // Token valid for 24 hours

    await this.usersService.updateUser(userId, {
      emailVerificationToken: token,
      emailVerificationExpires: expires,
    });

    return token;
  }

  /**
   * Verify email with token
   * Returns user if successful, null if token invalid/expired
   */
  async verifyEmail(token: string): Promise<any> {
    const user = await this.usersService.findByVerificationToken(token);
    
    if (!user) {
      return null;
    }

    // Check if token is expired
    if (user.emailVerificationExpires && new Date() > user.emailVerificationExpires) {
      return null;
    }

    // Mark email as verified
    await this.usersService.updateUser(user.id, {
      emailVerified: true,
      emailVerifiedAt: new Date(),
      emailVerificationToken: undefined,
      emailVerificationExpires: undefined,
      isActive: true, // Activate user after email verification
    });

    return user;
  }

  /**
   * Send verification email to user
   */
  async sendVerificationEmail(userId: string, email: string, firstName: string): Promise<void> {
    const token = await this.createEmailVerificationToken(userId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
    const verificationLink = `${baseUrl}/verify-email/${token}`;

    try {
      await this.mailService.sendMail({
        to: [{ email, name: firstName }],
        subject: 'Email Adresinizi Doğrulayın - Aluplan',
        html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Email Adresinizi Doğrulayın</h2>
                <p>Merhaba ${firstName},</p>
                <p>Aluplan hesabınızı etkinleştirmek için lütfen aşağıdaki butona tıklayın. Bu bağlantı 24 saat süreyle geçerlidir.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationLink}" 
                     style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    E-posta Adresimi Doğrula
                  </a>
                </div>
                <p>Veya bu linki tarayıcınıza kopyalayın:</p>
                <p style="word-break: break-all; color: #666;">${verificationLink}</p>
                <p>Eğer bu talebi siz yapmadıysanız, bu e-postayı güvenle görmezden gelebilirsiniz.</p>
                <p>Teşekkürler,<br/>Aluplan Ekibi</p>
              </div>
            </body>
          </html>
        `,
        text: `Merhaba ${firstName},\n\nAluplan hesabınızı etkinleştirmek için lütfen aşağıdaki linke tıklayın:\n${verificationLink}\n\nBu bağlantı 24 saat süreyle geçerlidir.\n\nTeşekkürler,\nAluplan Ekibi`,
        channel: MailChannel.TRANSACTIONAL,
      });
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // Don't throw error - user creation should succeed even if email fails
    }
  }
}
