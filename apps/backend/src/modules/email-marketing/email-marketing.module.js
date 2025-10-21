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
exports.EmailMarketingModule = void 0;
const common_1 = require("@nestjs/common");
const email_marketing_service_1 = require("./email-marketing.service");
const email_marketing_controller_1 = require("./email-marketing.controller");
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
const bull_config_1 = require("../../config/bull.config");
const email_processor_1 = require("./processors/email.processor");
const typeorm_1 = require("@nestjs/typeorm");
const email_campaign_entity_1 = require("./entities/email-campaign.entity");
const email_campaign_variant_entity_1 = require("./entities/email-campaign-variant.entity");
const email_log_entity_1 = require("./entities/email-log.entity");
const subscriber_entity_1 = require("./entities/subscriber.entity");
const segment_entity_1 = require("./entities/segment.entity");
const group_entity_1 = require("./entities/group.entity");
const email_template_entity_1 = require("./entities/email-template.entity");
const email_campaign_service_1 = require("./email-campaign.service");
const email_campaign_controller_1 = require("./email-campaign.controller");
const subscriber_service_1 = require("./subscriber.service");
const subscriber_controller_1 = require("./subscriber.controller");
const segment_service_1 = require("./segment.service");
const segment_controller_1 = require("./segment.controller");
const group_service_1 = require("./group.service");
const group_controller_1 = require("./group.controller");
const template_service_1 = require("./template.service");
const template_controller_1 = require("./template.controller");
const template_file_service_1 = require("./services/template-file.service");
const template_preview_service_1 = require("./services/template-preview.service");
const email_validation_service_1 = require("./services/email-validation.service");
const advanced_email_validation_service_1 = require("./services/advanced-email-validation.service");
const ip_reputation_service_1 = require("./services/ip-reputation.service");
const ip_reputation_controller_1 = require("./ip-reputation.controller");
const ab_test_service_1 = require("./services/ab-test.service");
const ab_test_statistics_service_1 = require("./services/ab-test-statistics.service");
const ab_test_controller_1 = require("./controllers/ab-test.controller");
const trigger_evaluator_service_1 = require("./services/trigger-evaluator.service");
const automation_service_1 = require("./services/automation.service");
const automation_queue_service_1 = require("./services/automation-queue.service");
const workflow_executor_service_1 = require("./services/workflow-executor.service");
const automation_scheduler_service_1 = require("./services/automation-scheduler.service");
const automation_processor_1 = require("./processors/automation.processor");
const automation_controller_1 = require("./controllers/automation.controller");
const analytics_controller_1 = require("./analytics.controller");
const analytics_service_1 = require("./analytics.service");
const tracking_controller_1 = require("./tracking.controller");
const tracking_service_1 = require("./tracking.service");
const campaign_scheduler_service_1 = require("./campaign-scheduler.service");
const email_automation_entity_1 = require("./entities/email-automation.entity");
const automation_trigger_entity_1 = require("./entities/automation-trigger.entity");
const automation_execution_entity_1 = require("./entities/automation-execution.entity");
const automation_schedule_entity_1 = require("./entities/automation-schedule.entity");
const import_job_entity_1 = require("./entities/import-job.entity");
const export_job_entity_1 = require("./entities/export-job.entity");
const import_result_entity_1 = require("./entities/import-result.entity");
const custom_field_entity_1 = require("./entities/custom-field.entity");
const consent_record_entity_1 = require("./entities/consent-record.entity");
const data_subject_request_entity_1 = require("./entities/data-subject-request.entity");
const email_open_history_entity_1 = require("./entities/email-open-history.entity");
const file_processing_service_1 = require("./services/file-processing.service");
const file_upload_service_1 = require("./services/file-upload.service");
const enhanced_file_security_service_1 = require("./services/enhanced-file-security.service");
const custom_field_service_1 = require("./services/custom-field.service");
const gdpr_compliance_service_1 = require("./services/gdpr-compliance.service");
const bulk_operations_compliance_service_1 = require("./services/bulk-operations-compliance.service");
const file_upload_controller_1 = require("./controllers/file-upload.controller");
const bulk_export_controller_1 = require("./controllers/bulk-export.controller");
const bulk_import_controller_1 = require("./controllers/bulk-import.controller");
const job_management_controller_1 = require("./controllers/job-management.controller");
const custom_field_controller_1 = require("./controllers/custom-field.controller");
const gdpr_compliance_controller_1 = require("./controllers/gdpr-compliance.controller");
const bulk_import_service_1 = require("./services/bulk-import.service");
const bulk_export_service_1 = require("./services/bulk-export.service");
const export_cleanup_service_1 = require("./services/export-cleanup.service");
const export_job_processor_1 = require("./processors/export-job.processor");
const import_integration_service_1 = require("./services/import-integration.service");
const batch_processing_service_1 = require("./services/batch-processing.service");
const import_job_processor_1 = require("./processors/import-job.processor");
const validation_job_processor_1 = require("./processors/validation-job.processor");
const shared_module_1 = require("../../shared/shared.module");
const settings_module_1 = require("../settings/settings.module");
const schedule_1 = require("@nestjs/schedule");
const platform_integration_module_1 = require("../platform-integration/platform-integration.module");
const users_module_1 = require("../users/users.module");
const stats_controller_1 = require("./controllers/stats.controller");
const stats_service_1 = require("./services/stats.service");
const send_time_optimization_service_1 = require("./services/send-time-optimization.service");
const send_time_optimization_controller_1 = require("./controllers/send-time-optimization.controller");
const predictive_analytics_service_1 = require("./services/predictive-analytics.service");
const predictive_analytics_controller_1 = require("./controllers/predictive-analytics.controller");
const opt_in_out_service_1 = require("./services/opt-in-out.service");
const opt_in_out_controller_1 = require("./controllers/opt-in-out.controller");
let EmailMarketingModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    email_campaign_entity_1.EmailCampaign,
                    email_campaign_variant_entity_1.EmailCampaignVariant,
                    email_log_entity_1.EmailLog,
                    subscriber_entity_1.Subscriber,
                    segment_entity_1.Segment,
                    group_entity_1.Group,
                    email_template_entity_1.EmailTemplate,
                    email_automation_entity_1.EmailAutomation,
                    automation_trigger_entity_1.AutomationTrigger,
                    automation_execution_entity_1.AutomationExecution,
                    automation_schedule_entity_1.AutomationSchedule,
                    import_job_entity_1.ImportJob,
                    export_job_entity_1.ExportJob,
                    import_result_entity_1.ImportResult,
                    custom_field_entity_1.CustomField,
                    consent_record_entity_1.ConsentRecord,
                    data_subject_request_entity_1.DataSubjectRequest,
                    email_open_history_entity_1.EmailOpenHistory,
                ]),
                bullmq_1.BullModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: bull_config_1.bullConfig,
                    inject: [config_1.ConfigService],
                }),
                bullmq_1.BullModule.registerQueue({
                    name: 'email',
                }),
                bullmq_1.BullModule.registerQueue({
                    name: 'automation',
                }),
                bullmq_1.BullModule.registerQueue({
                    name: 'import',
                }),
                bullmq_1.BullModule.registerQueue({
                    name: 'validation',
                }),
                bullmq_1.BullModule.registerQueue({
                    name: 'export',
                }),
                settings_module_1.SettingsModule,
                shared_module_1.SharedModule,
                schedule_1.ScheduleModule.forRoot(),
                platform_integration_module_1.PlatformIntegrationModule,
                users_module_1.UsersModule, // Required for JwtAuthGuard
            ],
            controllers: [
                email_marketing_controller_1.EmailMarketingController,
                email_campaign_controller_1.EmailCampaignController,
                subscriber_controller_1.SubscriberController,
                segment_controller_1.SegmentController,
                group_controller_1.GroupController,
                template_controller_1.TemplateController,
                ip_reputation_controller_1.IpReputationController,
                ab_test_controller_1.AbTestController,
                automation_controller_1.AutomationController,
                analytics_controller_1.AnalyticsController,
                tracking_controller_1.TrackingController,
                file_upload_controller_1.FileUploadController,
                bulk_import_controller_1.BulkImportController,
                bulk_export_controller_1.BulkExportController,
                job_management_controller_1.JobManagementController,
                custom_field_controller_1.CustomFieldController,
                gdpr_compliance_controller_1.GdprComplianceController,
                stats_controller_1.StatsController,
                send_time_optimization_controller_1.SendTimeOptimizationController,
                predictive_analytics_controller_1.PredictiveAnalyticsController,
                opt_in_out_controller_1.OptInOutController,
            ],
            providers: [
                email_marketing_service_1.EmailMarketingService,
                email_processor_1.EmailProcessor,
                email_campaign_service_1.EmailCampaignService,
                subscriber_service_1.SubscriberService,
                segment_service_1.SegmentService,
                group_service_1.GroupService,
                template_service_1.TemplateService,
                template_file_service_1.TemplateFileService,
                template_preview_service_1.TemplatePreviewService,
                email_validation_service_1.EmailValidationService,
                advanced_email_validation_service_1.AdvancedEmailValidationService,
                ip_reputation_service_1.IpReputationService,
                ab_test_service_1.AbTestService,
                ab_test_statistics_service_1.AbTestStatisticsService,
                trigger_evaluator_service_1.TriggerEvaluatorService,
                automation_service_1.AutomationService,
                automation_queue_service_1.AutomationQueueService,
                workflow_executor_service_1.WorkflowExecutorService,
                automation_scheduler_service_1.AutomationSchedulerService,
                automation_processor_1.AutomationProcessor,
                analytics_service_1.AnalyticsService,
                tracking_service_1.TrackingService,
                campaign_scheduler_service_1.CampaignSchedulerService,
                file_processing_service_1.FileProcessingService,
                file_upload_service_1.FileUploadService,
                bulk_import_service_1.BulkImportService,
                bulk_export_service_1.BulkExportService,
                export_cleanup_service_1.ExportCleanupService,
                import_integration_service_1.ImportIntegrationService,
                batch_processing_service_1.BatchProcessingService,
                import_job_processor_1.ImportJobProcessor,
                validation_job_processor_1.ValidationJobProcessor,
                export_job_processor_1.ExportJobProcessor,
                enhanced_file_security_service_1.EnhancedFileSecurityService,
                custom_field_service_1.CustomFieldService,
                gdpr_compliance_service_1.GdprComplianceService,
                bulk_operations_compliance_service_1.BulkOperationsComplianceService,
                opt_in_out_service_1.OptInOutService,
                stats_service_1.StatsService,
                send_time_optimization_service_1.SendTimeOptimizationService,
                predictive_analytics_service_1.PredictiveAnalyticsService,
            ],
            exports: [
                bullmq_1.BullModule,
                email_campaign_service_1.EmailCampaignService,
                subscriber_service_1.SubscriberService,
                segment_service_1.SegmentService,
                group_service_1.GroupService,
                template_service_1.TemplateService,
                template_file_service_1.TemplateFileService,
                template_preview_service_1.TemplatePreviewService,
                email_validation_service_1.EmailValidationService,
                advanced_email_validation_service_1.AdvancedEmailValidationService,
                ip_reputation_service_1.IpReputationService,
                file_processing_service_1.FileProcessingService,
                file_upload_service_1.FileUploadService,
                bulk_import_service_1.BulkImportService,
                bulk_export_service_1.BulkExportService,
                import_integration_service_1.ImportIntegrationService,
                batch_processing_service_1.BatchProcessingService,
                enhanced_file_security_service_1.EnhancedFileSecurityService,
                custom_field_service_1.CustomFieldService,
                gdpr_compliance_service_1.GdprComplianceService,
                bulk_operations_compliance_service_1.BulkOperationsComplianceService
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmailMarketingModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailMarketingModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return EmailMarketingModule = _classThis;
})();
exports.EmailMarketingModule = EmailMarketingModule;
//# sourceMappingURL=email-marketing.module.js.map