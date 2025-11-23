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
exports.MonitoringAlertingService = exports.AlertType = exports.AlertSeverity = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["INFO"] = "info";
    AlertSeverity["WARNING"] = "warning";
    AlertSeverity["ERROR"] = "error";
    AlertSeverity["CRITICAL"] = "critical";
})(AlertSeverity || (exports.AlertSeverity = AlertSeverity = {}));
var AlertType;
(function (AlertType) {
    AlertType["SYSTEM_HEALTH"] = "system_health";
    AlertType["PIPELINE_FAILURE"] = "pipeline_failure";
    AlertType["PERFORMANCE_DEGRADATION"] = "performance_degradation";
    AlertType["LOW_APPROVAL_RATE"] = "low_approval_rate";
    AlertType["HIGH_ERROR_RATE"] = "high_error_rate";
    AlertType["PROVIDER_FAILURE"] = "provider_failure";
    AlertType["QUEUE_OVERFLOW"] = "queue_overflow";
})(AlertType || (exports.AlertType = AlertType = {}));
let MonitoringAlertingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _performHealthCheck_decorators;
    let _checkPerformanceMetrics_decorators;
    var MonitoringAlertingService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _performHealthCheck_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES)];
            _checkPerformanceMetrics_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR)];
            __esDecorate(this, null, _performHealthCheck_decorators, { kind: "method", name: "performHealthCheck", static: false, private: false, access: { has: obj => "performHealthCheck" in obj, get: obj => obj.performHealthCheck }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _checkPerformanceMetrics_decorators, { kind: "method", name: "checkPerformanceMetrics", static: false, private: false, access: { has: obj => "checkPerformanceMetrics" in obj, get: obj => obj.checkPerformanceMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MonitoringAlertingService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configRepository = __runInitializers(this, _instanceExtraInitializers);
        analyticsService;
        mailService;
        logger = new common_1.Logger(MonitoringAlertingService.name);
        alerts = [];
        MAX_ALERTS = 100;
        constructor(configRepository, analyticsService, mailService) {
            this.configRepository = configRepository;
            this.analyticsService = analyticsService;
            this.mailService = mailService;
        }
        async performHealthCheck() {
            this.logger.log('Performing system health check');
            try {
                const health = await this.getSystemHealth();
                if (health.overall === 'critical') {
                    await this.createAlert({
                        type: AlertType.SYSTEM_HEALTH,
                        severity: AlertSeverity.CRITICAL,
                        title: 'System Health Critical',
                        message: 'FAQ Learning System is in critical state',
                        metadata: { health },
                    });
                }
                else if (health.overall === 'degraded') {
                    await this.createAlert({
                        type: AlertType.SYSTEM_HEALTH,
                        severity: AlertSeverity.WARNING,
                        title: 'System Health Degraded',
                        message: 'FAQ Learning System performance is degraded',
                        metadata: { health },
                    });
                }
                this.logger.log(`Health check completed: ${health.overall}`);
            }
            catch (error) {
                this.logger.error('Health check failed:', error);
            }
        }
        async checkPerformanceMetrics() {
            this.logger.log('Checking performance metrics');
            try {
                const thresholds = await this.getMonitoringThresholds();
                const effectiveness = await this.analyticsService.getLearningEffectiveness('day');
                if (effectiveness.approvalRate < thresholds.minApprovalRate) {
                    await this.createAlert({
                        type: AlertType.LOW_APPROVAL_RATE,
                        severity: AlertSeverity.WARNING,
                        title: 'Low FAQ Approval Rate',
                        message: `Approval rate (${effectiveness.approvalRate}%) is below threshold (${thresholds.minApprovalRate}%)`,
                        metadata: { effectiveness, threshold: thresholds.minApprovalRate },
                    });
                }
                const providerPerformance = await this.analyticsService.getProviderPerformance('day');
                providerPerformance.forEach(provider => {
                    const errorRate = 100 - provider.successRate;
                    if (errorRate > thresholds.maxErrorRate) {
                        this.createAlert({
                            type: AlertType.HIGH_ERROR_RATE,
                            severity: AlertSeverity.ERROR,
                            title: `High Error Rate for ${provider.providerName}`,
                            message: `Error rate (${errorRate.toFixed(1)}%) exceeds threshold (${thresholds.maxErrorRate}%)`,
                            metadata: { provider, threshold: thresholds.maxErrorRate },
                        });
                    }
                    if (provider.avgResponseTime > thresholds.maxResponseTime) {
                        this.createAlert({
                            type: AlertType.PERFORMANCE_DEGRADATION,
                            severity: AlertSeverity.WARNING,
                            title: `Slow Response Time for ${provider.providerName}`,
                            message: `Average response time (${provider.avgResponseTime}ms) exceeds threshold (${thresholds.maxResponseTime}ms)`,
                            metadata: { provider, threshold: thresholds.maxResponseTime },
                        });
                    }
                });
                this.logger.log('Performance metrics check completed');
            }
            catch (error) {
                this.logger.error('Performance metrics check failed:', error);
            }
        }
        async getSystemHealth() {
            const [learningPipeline, aiProviders, database, queue] = await Promise.all([
                this.checkLearningPipelineHealth(),
                this.checkAiProvidersHealth(),
                this.checkDatabaseHealth(),
                this.checkQueueHealth(),
            ]);
            const components = { learningPipeline, aiProviders, database, queue };
            const criticalCount = Object.values(components).filter(c => c.status === 'critical').length;
            const degradedCount = Object.values(components).filter(c => c.status === 'degraded').length;
            let overall;
            if (criticalCount > 0) {
                overall = 'critical';
            }
            else if (degradedCount > 0) {
                overall = 'degraded';
            }
            else {
                overall = 'healthy';
            }
            return {
                overall,
                components,
                lastCheck: new Date(),
                alerts: this.getActiveAlerts(),
            };
        }
        async checkLearningPipelineHealth() {
            try {
                const effectiveness = await this.analyticsService.getLearningEffectiveness('day');
                if (effectiveness.totalFaqsGenerated === 0) {
                    return {
                        status: 'degraded',
                        message: 'No FAQs generated in the last 24 hours',
                        metrics: effectiveness,
                    };
                }
                if (effectiveness.approvalRate < 30) {
                    return {
                        status: 'degraded',
                        message: `Low approval rate: ${effectiveness.approvalRate}%`,
                        metrics: effectiveness,
                    };
                }
                return {
                    status: 'healthy',
                    message: 'Learning pipeline operating normally',
                    metrics: effectiveness,
                };
            }
            catch (error) {
                return {
                    status: 'critical',
                    message: `Pipeline health check failed: ${error.message}`,
                };
            }
        }
        async checkAiProvidersHealth() {
            try {
                const providers = await this.analyticsService.getProviderPerformance('day');
                if (providers.length === 0) {
                    return {
                        status: 'critical',
                        message: 'No AI providers available',
                    };
                }
                const failedProviders = providers.filter(p => p.successRate < 50);
                if (failedProviders.length === providers.length) {
                    return {
                        status: 'critical',
                        message: 'All AI providers are failing',
                        metrics: { providers },
                    };
                }
                if (failedProviders.length > 0) {
                    return {
                        status: 'degraded',
                        message: `${failedProviders.length} provider(s) experiencing issues`,
                        metrics: { failedProviders },
                    };
                }
                return {
                    status: 'healthy',
                    message: 'All AI providers operating normally',
                    metrics: { providers },
                };
            }
            catch (error) {
                return {
                    status: 'critical',
                    message: `Provider health check failed: ${error.message}`,
                };
            }
        }
        async checkDatabaseHealth() {
            try {
                const config = await this.configRepository.findOne({
                    where: { configKey: 'system_status' },
                });
                return {
                    status: 'healthy',
                    message: 'Database connection healthy',
                };
            }
            catch (error) {
                return {
                    status: 'critical',
                    message: `Database connection failed: ${error.message}`,
                };
            }
        }
        async checkQueueHealth() {
            try {
                return {
                    status: 'healthy',
                    message: 'Processing queue healthy',
                    metrics: { queueSize: 0 },
                };
            }
            catch (error) {
                return {
                    status: 'degraded',
                    message: `Queue health check failed: ${error.message}`,
                };
            }
        }
        async createAlert(alertData) {
            const alert = {
                id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                ...alertData,
                timestamp: new Date(),
                resolved: false,
            };
            this.alerts.unshift(alert);
            if (this.alerts.length > this.MAX_ALERTS) {
                this.alerts = this.alerts.slice(0, this.MAX_ALERTS);
            }
            this.logger.warn(`Alert created: [${alert.severity}] ${alert.title}`);
            if (alert.severity === AlertSeverity.CRITICAL || alert.severity === AlertSeverity.ERROR) {
                await this.sendAlertNotification(alert);
            }
            return alert;
        }
        async resolveAlert(alertId) {
            const alert = this.alerts.find(a => a.id === alertId);
            if (alert && !alert.resolved) {
                alert.resolved = true;
                alert.resolvedAt = new Date();
                this.logger.log(`Alert resolved: ${alertId}`);
                return true;
            }
            return false;
        }
        getActiveAlerts() {
            return this.alerts.filter(a => !a.resolved);
        }
        getAllAlerts(limit = 50) {
            return this.alerts.slice(0, limit);
        }
        getAlertsByType(type) {
            return this.alerts.filter(a => a.type === type);
        }
        getAlertsBySeverity(severity) {
            return this.alerts.filter(a => a.severity === severity);
        }
        clearResolvedAlerts() {
            const beforeCount = this.alerts.length;
            this.alerts = this.alerts.filter(a => !a.resolved);
            const clearedCount = beforeCount - this.alerts.length;
            this.logger.log(`Cleared ${clearedCount} resolved alerts`);
            return clearedCount;
        }
        async sendAlertNotification(alert) {
            try {
                const adminEmails = await this.getAdminEmails();
                if (adminEmails.length === 0) {
                    this.logger.warn('No admin emails configured for alerts');
                    return;
                }
                const subject = `[${alert.severity.toUpperCase()}] FAQ Learning System Alert: ${alert.title}`;
                const body = `
        <h2>System Alert</h2>
        <p><strong>Severity:</strong> ${alert.severity}</p>
        <p><strong>Type:</strong> ${alert.type}</p>
        <p><strong>Time:</strong> ${alert.timestamp.toISOString()}</p>
        <p><strong>Message:</strong> ${alert.message}</p>
        ${alert.metadata ? `<p><strong>Details:</strong> <pre>${JSON.stringify(alert.metadata, null, 2)}</pre></p>` : ''}
      `;
                for (const email of adminEmails) {
                    await this.mailService.sendMail({
                        to: { email },
                        subject,
                        html: body,
                        channel: 'system',
                        priority: alert.severity === AlertSeverity.CRITICAL ? 'high' : 'normal',
                    });
                }
                this.logger.log(`Alert notification sent to ${adminEmails.length} admin(s)`);
            }
            catch (error) {
                this.logger.error('Failed to send alert notification:', error);
            }
        }
        async getAdminEmails() {
            try {
                const config = await this.configRepository.findOne({
                    where: { configKey: 'notification_settings' },
                });
                return config?.configValue?.adminEmails || [];
            }
            catch (error) {
                this.logger.error('Failed to get admin emails:', error);
                return [];
            }
        }
        async getMonitoringThresholds() {
            try {
                const config = await this.configRepository.findOne({
                    where: { configKey: 'monitoring_thresholds' },
                });
                const defaultThresholds = {
                    minApprovalRate: 50,
                    maxErrorRate: 20,
                    maxResponseTime: 5000,
                    maxQueueSize: 1000,
                    minDailyFaqs: 5,
                };
                return config?.configValue || defaultThresholds;
            }
            catch (error) {
                this.logger.error('Failed to load monitoring thresholds:', error);
                return {
                    minApprovalRate: 50,
                    maxErrorRate: 20,
                    maxResponseTime: 5000,
                    maxQueueSize: 1000,
                    minDailyFaqs: 5,
                };
            }
        }
        async getAlertStatistics() {
            const activeAlerts = this.getActiveAlerts();
            const last24h = this.alerts.filter(a => a.timestamp.getTime() > Date.now() - 24 * 60 * 60 * 1000);
            const bySeverity = {
                info: this.alerts.filter(a => a.severity === AlertSeverity.INFO).length,
                warning: this.alerts.filter(a => a.severity === AlertSeverity.WARNING).length,
                error: this.alerts.filter(a => a.severity === AlertSeverity.ERROR).length,
                critical: this.alerts.filter(a => a.severity === AlertSeverity.CRITICAL).length,
            };
            const byType = Object.values(AlertType).reduce((acc, type) => {
                acc[type] = this.alerts.filter(a => a.type === type).length;
                return acc;
            }, {});
            return {
                total: this.alerts.length,
                active: activeAlerts.length,
                resolved: this.alerts.filter(a => a.resolved).length,
                last24h: last24h.length,
                bySeverity,
                byType,
            };
        }
    };
    return MonitoringAlertingService = _classThis;
})();
exports.MonitoringAlertingService = MonitoringAlertingService;
//# sourceMappingURL=monitoring-alerting.service.js.map