"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthController = (() => {
    let _classDecorators = [(0, common_1.Controller)('auth'), (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _register_decorators;
    let _login_decorators;
    let _checkEmail_decorators;
    let _refresh_decorators;
    let _verifyEmail_decorators;
    let _getCurrentUser_decorators;
    var AuthController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _register_decorators = [(0, common_1.Post)('register')];
            _login_decorators = [(0, common_1.Post)('login')];
            _checkEmail_decorators = [(0, common_1.Post)('check-email')];
            _refresh_decorators = [(0, common_1.Post)('refresh')];
            _verifyEmail_decorators = [(0, common_1.Get)('verify-email/:token')];
            _getCurrentUser_decorators = [(0, common_1.Get)('me'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
            __esDecorate(this, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: obj => "register" in obj, get: obj => obj.register }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: obj => "login" in obj, get: obj => obj.login }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _checkEmail_decorators, { kind: "method", name: "checkEmail", static: false, private: false, access: { has: obj => "checkEmail" in obj, get: obj => obj.checkEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _refresh_decorators, { kind: "method", name: "refresh", static: false, private: false, access: { has: obj => "refresh" in obj, get: obj => obj.refresh }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: obj => "verifyEmail" in obj, get: obj => obj.verifyEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCurrentUser_decorators, { kind: "method", name: "getCurrentUser", static: false, private: false, access: { has: obj => "getCurrentUser" in obj, get: obj => obj.getCurrentUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        authService = __runInitializers(this, _instanceExtraInitializers);
        usersService;
        constructor(authService, usersService) {
            this.authService = authService;
            this.usersService = usersService;
        }
        async register(createUserDto) {
            try {
                console.log('📝 Register request received:', {
                    email: createUserDto.email,
                    firstName: createUserDto.firstName,
                    lastName: createUserDto.lastName,
                    hasPhone: !!createUserDto.phone,
                    hasMetadata: !!createUserDto.metadata,
                    roleId: createUserDto.roleId,
                });
                // Create user
                const user = await this.usersService.create(createUserDto);
                console.log('✓ User created, sending verification email...');
                // Send verification email
                await this.authService.sendVerificationEmail(user.id, user.email, user.firstName);
                console.log('✓ Verification email sent successfully');
                return {
                    success: true,
                    message: 'Kayıt başarılı! Email adresinize doğrulama linki gönderildi.',
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                };
            }
            catch (error) {
                console.error('❌ Register error:', {
                    message: error.message,
                    status: error.status,
                    name: error.name,
                    stack: error.stack,
                });
                if (error.status === 409) {
                    throw new common_1.HttpException('Bu email adresi zaten kayıtlı', common_1.HttpStatus.CONFLICT);
                }
                throw error;
            }
        }
        async login(loginDto) {
            const result = await this.authService.login(loginDto);
            if (!result) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            return result;
        }
        async checkEmail(email) {
            const exists = await this.authService.checkEmailExists(email);
            return {
                exists,
                message: exists
                    ? 'Bu email adresi zaten kayıtlı'
                    : 'Email adresi kullanılabilir',
            };
        }
        async refresh(refreshToken) {
            if (!refreshToken) {
                throw new common_1.HttpException('Refresh token required', common_1.HttpStatus.BAD_REQUEST);
            }
            try {
                const result = await this.authService.refreshAccessToken(refreshToken);
                return {
                    success: true,
                    data: result,
                };
            }
            catch (error) {
                throw new common_1.HttpException(error.message || 'Token refresh failed', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        async verifyEmail(token) {
            const user = await this.authService.verifyEmail(token);
            if (!user) {
                throw new common_1.HttpException('Geçersiz veya süresi dolmuş doğrulama linki', common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                success: true,
                message: 'Email adresiniz başarıyla doğrulandı! Artık giriş yapabilirsiniz.',
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            };
        }
        async getCurrentUser(req) {
            const user = await this.usersService.findOne(req.user.userId);
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roleId: user.roleId,
                    phone: user.phone,
                    city: user.city,
                    country: user.country,
                    address: user.address,
                    bio: user.bio,
                    isActive: user.isActive,
                    emailVerified: user.emailVerified,
                    emailVerifiedAt: user.emailVerifiedAt,
                    metadata: user.metadata,
                }
            };
        }
    };
    return AuthController = _classThis;
})();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map