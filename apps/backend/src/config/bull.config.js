"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bullConfig = void 0;
const bullConfig = (configService) => ({
    connection: {
        host: configService.get('REDIS_HOST', 'localhost'),
        port: configService.get('REDIS_PORT', 6379),
        password: configService.get('REDIS_PASSWORD', ''),
        db: configService.get('REDIS_DB', 0),
    },
});
exports.bullConfig = bullConfig;
//# sourceMappingURL=bull.config.js.map