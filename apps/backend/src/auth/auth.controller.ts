import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../modules/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
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
      await this.authService.sendVerificationEmail(
        user.id,
        user.email,
        user.firstName
      );

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
    } catch (error) {
      console.error('❌ Register error:', {
        message: error.message,
        status: error.status,
        name: error.name,
        stack: error.stack,
      });
      
      if (error.status === 409) {
        throw new HttpException(
          'Bu email adresi zaten kayıtlı',
          HttpStatus.CONFLICT
        );
      }
      throw error;
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    if (!result) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return result;
  }

  @Post('check-email')
  async checkEmail(@Body('email') email: string) {
    const exists = await this.authService.checkEmailExists(email);
    return {
      exists,
      message: exists
        ? 'Bu email adresi zaten kayıtlı'
        : 'Email adresi kullanılabilir',
    };
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException('Refresh token required', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.authService.refreshAccessToken(refreshToken);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Token refresh failed',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    const user = await this.authService.verifyEmail(token);
    
    if (!user) {
      throw new HttpException(
        'Geçersiz veya süresi dolmuş doğrulama linki',
        HttpStatus.BAD_REQUEST
      );
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req) {
    const user = await this.usersService.findOne(req.user.userId);
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
}