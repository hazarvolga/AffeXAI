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
exports.AuditLoggingService = exports.AuditSeverity = exports.AuditAction = void 0;
const common_1 = require("@nestjs/common");
var AuditAction;
(function (AuditAction) {
    AuditAction["FAQ_CREATED"] = "faq_created";
    AuditAction["FAQ_UPDATED"] = "faq_updated";
    AuditAction["FAQ_DELETED"] = "faq_deleted";
    AuditAction["FAQ_APPROVED"] = "faq_approved";
    AuditAction["FAQ_REJECTED"] = "faq_rejected";
    AuditAction["FAQ_PUBLISHED"] = "faq_published";
    AuditAction["CONFIG_UPDATED"] = "config_updated";
    AuditAction["PROVIDER_SWITCHED"] = "provider_switched";
    AuditAction["BATCH_PROCESSED"] = "batch_processed";
    AuditAction["PATTERN_CREATED"] = "pattern_created";
    AuditAction["USER_ACCESS"] = "user_access";
    AuditAction["SECURITY_EVENT"] = "security_event";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
var AuditSeverity;
(function (AuditSeverity) {
    AuditSeverity["INFO"] = "info";
    AuditSeverity["WARNING"] = "warning";
    AuditSeverity["ERROR"] = "error";
    AuditSeverity["CRITICAL"] = "critical";
})(AuditSeverity || (exports.AuditSeverity = AuditSeverity = {}));
let AuditLoggingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuditLoggingService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuditLoggingService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configRepository;
        logger = new common_1.Logger(AuditLoggingService.name);
        auditLogs = [];
        MAX_LOGS = 10000;
        constructor(configRepository) {
            this.configRepository = configRepository;
        }
        async logAction(data) {
            const log = {
                id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                action: data.action,
                severity: data.severity || AuditSeverity.INFO,
                userId: data.userId,
                userName: data.userName,
                resourceType: data.resourceType,
                resourceId: data.resourceId,
                details: data.details || {},
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
                timestamp: new Date(),
                success: data.success !== false,
                errorMessage: data.errorMessage,
            };
            this.auditLogs.unshift(log);
            if (this.auditLogs.length > this.MAX_LOGS) {
                this.auditLogs = this.auditLogs.slice(0, this.MAX_LOGS);
            }
            const logMessage = `[${log.severity.toUpperCase()}] ${log.action} by ${log.userName || log.userId || 'system'} on ${log.resourceType}${log.resourceId ? `:${log.resourceId}` : ''}`;
            if (log.severity === AuditSeverity.CRITICAL || log.severity === AuditSeverity.ERROR) {
                this.logger.error(logMessage, log.details);
            }
            else if (log.severity === AuditSeverity.WARNING) {
                this.logger.warn(logMessage, log.details);
            }
            else {
                this.logger.log(logMessage);
            }
            return log;
        }
        async checkAccess(data) {
            const rolePermissions = await this.getRolePermissions();
            const requiredRole = this.getRequiredRole(data.action, data.resourceType);
            const allowed = this.hasPermission(data.userRole, requiredRole, rolePermissions);
            await this.logAction({
                action: AuditAction.USER_ACCESS,
                severity: allowed ? AuditSeverity.INFO : AuditSeverity.WARNING,
                userId: data.userId,
                resourceType: data.resourceType,
                resourceId: data.resourceId,
                details: {
                    action: data.action,
                    userRole: data.userRole,
                    requiredRole,
                    allowed,
                },
                success: allowed,
                errorMessage: allowed ? undefined : 'Access denied',
            });
            return {
                allowed,
                reason: allowed ? undefined : 'Insufficient permissions',
                requiredRole,
                userRole: data.userRole,
            };
        }
        async logSecurityEvent(data) {
            await this.logAction({
                action: AuditAction.SECURITY_EVENT,
                severity: data.severity,
                userId: data.userId,
                resourceType: 'security',
                details: {
                    eventType: data.eventType,
                    ...data.details,
                },
                ipAddress: data.ipAddress,
                success: true,
            });
        }
        getAuditLogs(filters) {
            let logs = this.auditLogs;
            if (filters) {
                if (filters.action) {
                    logs = logs.filter(log => log.action === filters.action);
                }
                if (filters.userId) {
                    logs = logs.filter(log => log.userId === filters.userId);
                }
                if (filters.resourceType) {
                    logs = logs.filter(log => log.resourceType === filters.resourceType);
                }
                if (filters.severity) {
                    logs = logs.filter(log => log.severity === filters.severity);
                }
                if (filters.startDate) {
                    logs = logs.filter(log => log.timestamp >= filters.startDate);
                }
                if (filters.endDate) {
                    logs = logs.filter(log => log.timestamp <= filters.endDate);
                }
            }
            const limit = filters?.limit || 100;
            return logs.slice(0, limit);
        }
        getAuditStatistics(period = 'week') {
            const now = new Date();
            const startDate = new Date();
            switch (period) {
                case 'day':
                    startDate.setDate(now.getDate() - 1);
                    break;
                case 'week':
                    startDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    startDate.setMonth(now.getMonth() - 1);
                    break;
            }
            const periodLogs = this.auditLogs.filter(log => log.timestamp >= startDate);
            const byAction = Object.values(AuditAction).reduce((acc, action) => {
                acc[action] = periodLogs.filter(log => log.action === action).length;
                return acc;
            }, {});
            const bySeverity = Object.values(AuditSeverity).reduce((acc, severity) => {
                acc[severity] = periodLogs.filter(log => log.severity === severity).length;
                return acc;
            }, {});
            const uniqueUsers = new Set(periodLogs.map(log => log.userId).filter(Boolean));
            const failedActions = periodLogs.filter(log => !log.success).length;
            return {
                total: periodLogs.length,
                byAction,
                bySeverity,
                uniqueUsers: uniqueUsers.size,
                failedActions,
                successRate: periodLogs.length > 0
                    ? ((periodLogs.length - failedActions) / periodLogs.length) * 100
                    : 100,
            };
        }
        async exportAuditLogs(filters) {
            const logs = this.getAuditLogs({
                startDate: filters?.startDate,
                endDate: filters?.endDate,
                limit: 10000,
            });
            if (filters?.format === 'csv') {
                return this.convertToCSV(logs);
            }
            return JSON.stringify(logs, null, 2);
        }
        async getRolePermissions() {
            try {
                const config = await this.configRepository.findOne({
                    where: { configKey: 'role_permissions' },
                });
                return config?.configValue || {
                    admin: ['*'],
                    moderator: ['faq:read', 'faq:approve', 'faq:reject', 'faq:update'],
                    user: ['faq:read'],
                };
            }
            catch (error) {
                this.logger.error('Failed to load role permissions:', error);
                return {
                    admin: ['*'],
                    moderator: ['faq:read', 'faq:approve', 'faq:reject'],
                    user: ['faq:read'],
                };
            }
        }
        getRequiredRole(action, resourceType) {
            const actionMap = {
                'create': 'moderator',
                'update': 'moderator',
                'delete': 'admin',
                'approve': 'moderator',
                'reject': 'moderator',
                'publish': 'moderator',
                'config': 'admin',
                'read': 'user',
            };
            return actionMap[action] || 'user';
        }
        hasPermission(userRole, requiredRole, rolePermissions) {
            const roleHierarchy = ['user', 'moderator', 'admin'];
            const userRoleIndex = roleHierarchy.indexOf(userRole);
            const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
            if (userRoleIndex === -1 || requiredRoleIndex === -1) {
                return false;
            }
            return userRoleIndex >= requiredRoleIndex;
        }
        convertToCSV(logs) {
            const headers = ['ID', 'Action', 'Severity', 'User', 'Resource Type', 'Resource ID', 'Timestamp', 'Success'];
            const rows = logs.map(log => [
                log.id,
                log.action,
                log.severity,
                log.userName || log.userId || '',
                log.resourceType,
                log.resourceId || '',
                log.timestamp.toISOString(),
                log.success ? 'Yes' : 'No',
            ]);
            return [
                headers.join(','),
                ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
            ].join('\n');
        }
    };
    return AuditLoggingService = _classThis;
})();
exports.AuditLoggingService = AuditLoggingService;
//# sourceMappingURL=audit-logging.service.js.map