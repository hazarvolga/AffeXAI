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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("./shared/shared.module");
const events_module_1 = require("./modules/events/events.module");
const email_marketing_module_1 = require("./modules/email-marketing/email-marketing.module");
const nestjs_1 = require("@bull-board/nestjs");
const express_1 = require("@bull-board/express");
const media_module_1 = require("./modules/media/media.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const settings_module_1 = require("./modules/settings/settings.module");
const certificates_module_1 = require("./modules/certificates/certificates.module");
const cms_module_1 = require("./modules/cms/cms.module");
const mail_module_1 = require("./modules/mail/mail.module");
const tickets_module_1 = require("./modules/tickets/tickets.module");
const roles_module_1 = require("./modules/roles/roles.module");
const ai_module_1 = require("./modules/ai/ai.module");
const user_ai_preferences_module_1 = require("./modules/user-ai-preferences/user-ai-preferences.module");
const platform_integration_module_1 = require("./modules/platform-integration/platform-integration.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
let AppModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                config_module_1.ConfigModule,
                event_emitter_1.EventEmitterModule.forRoot({
                    // Use this instance across the entire Nest application
                    wildcard: false,
                    delimiter: '.',
                    newListener: false,
                    removeListener: false,
                    maxListeners: 10,
                    verboseMemoryLeak: false,
                    ignoreErrors: false,
                }),
                cache_manager_1.CacheModule.register({
                    ttl: 60, // seconds
                    max: 100, // maximum number of items in cache
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5433,
                    username: 'postgres',
                    password: 'postgres',
                    database: 'aluplan_dev',
                    autoLoadEntities: true,
                    synchronize: true, // Temporary: Will sync schema with entities
                    logging: ['error', 'warn'], // Log only errors and warnings
                }),
                nestjs_1.BullBoardModule.forRoot({
                    route: '/admin/queues',
                    adapter: express_1.ExpressAdapter,
                }),
                schedule_1.ScheduleModule.forRoot(), // Enable scheduling for the entire application
                shared_module_1.SharedModule,
                mail_module_1.MailModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                events_module_1.EventsModule,
                email_marketing_module_1.EmailMarketingModule,
                media_module_1.MediaModule,
                notifications_module_1.NotificationsModule,
                settings_module_1.SettingsModule,
                certificates_module_1.CertificatesModule,
                cms_module_1.CmsModule,
                tickets_module_1.TicketsModule,
                roles_module_1.RolesModule,
                ai_module_1.AiModule,
                user_ai_preferences_module_1.UserAiPreferencesModule,
                platform_integration_module_1.PlatformIntegrationModule,
                analytics_module_1.AnalyticsModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AppModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map