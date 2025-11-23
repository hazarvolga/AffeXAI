"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const mail_service_interface_1 = require("../modules/mail/interfaces/mail-service.interface");
let AuthService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        usersService;
        jwtService;
        authUtilsService;
        mailService;
        constructor(usersService, jwtService, authUtilsService, mailService) {
            this.usersService = usersService;
            this.jwtService = jwtService;
            this.authUtilsService = authUtilsService;
            this.mailService = mailService;
        }
        async validateUser(email, password) {
            const user = await this.usersService.findByEmail(email);
            if (user && await this.authUtilsService.comparePassword(password, user.password)) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        async login(loginDto) {
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
            const refreshToken = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
            // Store refresh token in database
            const refreshTokenExpires = new Date();
            refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7);
            await this.usersService.updateUser(user.id, {
                refreshToken,
                refreshTokenExpires,
                lastLoginAt: new Date(),
            });
            // Return user info for initial frontend state (NOT in JWT)
            // Frontend will call getCurrentUser() for full role information
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: 3600, // 60 minutes in seconds
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    // Note: roleId kept for backward compatibility but will be deprecated
                    // Frontend should use getCurrentUser() for accurate role information
                    roleId: user.primaryRole?.displayName || user.roleEntity?.displayName || null,
                },
            };
        }
        async checkEmailExists(email) {
            // Skip cache for accurate email existence check
            const user = await this.usersService.findByEmail(email, true);
            return !!user;
        }
        /**
         * Refresh access token using refresh token
         */
        async refreshAccessToken(refreshToken) {
            try {
                // Verify refresh token
                const payload = this.jwtService.verify(refreshToken);
                // Validate token type
                if (payload.type !== 'refresh') {
                    throw new common_1.UnauthorizedException('Invalid token type');
                }
                // Get user and verify stored refresh token
                const user = await this.usersService.findOne(payload.sub);
                if (!user) {
                    throw new common_1.UnauthorizedException('User not found');
                }
                if (user.refreshToken !== refreshToken) {
                    throw new common_1.UnauthorizedException('Invalid refresh token');
                }
                if (user.refreshTokenExpires && user.refreshTokenExpires < new Date()) {
                    throw new common_1.UnauthorizedException('Refresh token expired');
                }
                // Generate new access token with minimal payload
                const newPayload = {
                    sub: user.id,
                    email: user.email,
                    tokenVersion: user.tokenVersion || 1,
                };
                const newAccessToken = this.jwtService.sign(newPayload, { expiresIn: '60m' });
                // Rotate refresh token (security best practice)
                const newRefreshToken = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
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
            }
            catch (error) {
                console.error('Token refresh failed:', error);
                throw new common_1.UnauthorizedException('Token refresh failed');
            }
        }
        /**
         * Generate email verification token
         */
        generateVerificationToken() {
            return (0, crypto_1.randomBytes)(32).toString('hex');
        }
        /**
         * Create email verification token for user
         * Returns the token (to be sent via email)
         */
        async createEmailVerificationToken(userId) {
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
        async verifyEmail(token) {
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
        async sendVerificationEmail(userId, email, firstName) {
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
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                });
            }
            catch (error) {
                console.error('Failed to send verification email:', error);
                // Don't throw error - user creation should succeed even if email fails
            }
        }
    };
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map