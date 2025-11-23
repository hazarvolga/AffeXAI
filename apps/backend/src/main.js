"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const helmet_1 = __importDefault(require("helmet"));
const compression = __importStar(require("compression"));
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const interceptors_1 = require("./common/interceptors");
const filters_1 = require("./common/filters");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        // Serve static files from uploads directory
        app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
            prefix: '/uploads/',
        });
        // Get configuration service
        const configService = app.get(config_1.ConfigService);
        // Set global API prefix
        app.setGlobalPrefix('api');
        // Security with Helmet
        app.use((0, helmet_1.default)());
        // Response compression
        app.use(compression());
        // CORS configuration (environment-based)
        const allowedOrigins = configService
            .get('CORS_ORIGINS', 'http://localhost:9002')
            .split(',')
            .map(origin => origin.trim());
        console.log('🌐 CORS enabled for origins:', allowedOrigins);
        app.enableCors({
            origin: (origin, callback) => {
                // Allow requests with no origin (like mobile apps or curl requests)
                if (!origin) {
                    return callback(null, true);
                }
                // Check if origin is in allowed list
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }
                // In development, allow all localhost/127.0.0.1 origins
                if (process.env.NODE_ENV === 'development') {
                    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
                        return callback(null, true);
                    }
                }
                callback(new Error('Not allowed by CORS'));
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
            exposedHeaders: ['Authorization'],
            maxAge: 86400, // 24 hours
        });
        // Global validation pipe
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        // Global ClassSerializerInterceptor for @Exclude() decorators
        app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
        // Global response interceptor (wraps all responses in ApiResponse format)
        app.useGlobalInterceptors(new interceptors_1.ResponseInterceptor());
        // Global exception filter (formats all errors in ApiResponse format)
        app.useGlobalFilters(new filters_1.GlobalExceptionFilter());
        // Swagger setup
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Aluplan API')
            .setDescription('API documentation for Aluplan application')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document);
        // Get port from environment variables or default to 9005
        const port = configService.get('PORT', 9005);
        // Start the application
        await app.listen(port, '0.0.0.0');
        console.log(`Application is running on: http://localhost:${port}`);
        // Graceful shutdown
        process.on('SIGTERM', async () => {
            console.log('SIGTERM signal received: closing HTTP server');
            await app.close();
            console.log('HTTP server closed');
        });
        process.on('SIGINT', async () => {
            console.log('SIGINT signal received: closing HTTP server');
            await app.close();
            console.log('HTTP server closed');
        });
    }
    catch (error) {
        console.error('Error starting the application:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map