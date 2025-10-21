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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
let EventsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('events')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _getStats_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _generateCertificates_decorators;
    let _getCertificateStats_decorators;
    let _getEventCertificates_decorators;
    let _sendInvitation_decorators;
    let _sendReminder_decorators;
    let _sendCancellation_decorators;
    let _sendUpdate_decorators;
    var EventsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)()];
            _findAll_decorators = [(0, common_1.Get)()];
            _getStats_decorators = [(0, common_1.Get)('stats')];
            _findOne_decorators = [(0, common_1.Get)(':id')];
            _update_decorators = [(0, common_1.Patch)(':id')];
            _remove_decorators = [(0, common_1.Delete)(':id')];
            _generateCertificates_decorators = [(0, common_1.Post)(':id/certificates/generate')];
            _getCertificateStats_decorators = [(0, common_1.Get)(':id/certificates/stats')];
            _getEventCertificates_decorators = [(0, common_1.Get)(':id/certificates')];
            _sendInvitation_decorators = [(0, common_1.Post)(':id/emails/invitation')];
            _sendReminder_decorators = [(0, common_1.Post)(':id/emails/reminder')];
            _sendCancellation_decorators = [(0, common_1.Post)(':id/emails/cancellation')];
            _sendUpdate_decorators = [(0, common_1.Post)(':id/emails/update')];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateCertificates_decorators, { kind: "method", name: "generateCertificates", static: false, private: false, access: { has: obj => "generateCertificates" in obj, get: obj => obj.generateCertificates }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCertificateStats_decorators, { kind: "method", name: "getCertificateStats", static: false, private: false, access: { has: obj => "getCertificateStats" in obj, get: obj => obj.getCertificateStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEventCertificates_decorators, { kind: "method", name: "getEventCertificates", static: false, private: false, access: { has: obj => "getEventCertificates" in obj, get: obj => obj.getEventCertificates }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendInvitation_decorators, { kind: "method", name: "sendInvitation", static: false, private: false, access: { has: obj => "sendInvitation" in obj, get: obj => obj.sendInvitation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendReminder_decorators, { kind: "method", name: "sendReminder", static: false, private: false, access: { has: obj => "sendReminder" in obj, get: obj => obj.sendReminder }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendCancellation_decorators, { kind: "method", name: "sendCancellation", static: false, private: false, access: { has: obj => "sendCancellation" in obj, get: obj => obj.sendCancellation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendUpdate_decorators, { kind: "method", name: "sendUpdate", static: false, private: false, access: { has: obj => "sendUpdate" in obj, get: obj => obj.sendUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EventsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        eventsService = __runInitializers(this, _instanceExtraInitializers);
        bulkCertificateService;
        constructor(eventsService, bulkCertificateService) {
            this.eventsService = eventsService;
            this.bulkCertificateService = bulkCertificateService;
        }
        create(createEventDto) {
            return this.eventsService.create(createEventDto);
        }
        findAll() {
            return this.eventsService.findAll();
        }
        getStats() {
            return this.eventsService.getDashboardStats();
        }
        findOne(id) {
            return this.eventsService.findOne(id);
        }
        update(id, updateEventDto) {
            return this.eventsService.update(id, updateEventDto);
        }
        remove(id) {
            return this.eventsService.remove(id);
        }
        /**
         * Generate certificates for event participants
         */
        async generateCertificates(eventId, body) {
            const event = await this.eventsService.findOne(eventId);
            // No null check needed - findOne throws NotFoundException if not found
            if (!event.certificateConfig?.enabled) {
                throw new common_1.BadRequestException('Certificates are not enabled for this event');
            }
            // Get participants from registration if no specific IDs provided
            let participants = [];
            if (body.participantIds && body.participantIds.length > 0) {
                // Get specific participants - implement this based on your registration system
                // For now, we'll use a placeholder
                participants = body.participantIds.map(id => ({
                    recipientName: 'Participant Name', // Get from registration
                    recipientEmail: 'participant@email.com', // Get from registration
                    userId: id,
                }));
            }
            else {
                // Get all approved registrations - implement based on your system
                throw new common_1.BadRequestException('Please provide participant IDs');
            }
            const certificates = await this.bulkCertificateService.generateForEvent(eventId, event.title, {
                templateId: event.certificateConfig.templateId,
                logoMediaId: event.certificateConfig.logoMediaId,
                description: event.certificateConfig.description,
                validityDays: event.certificateConfig.validityDays,
            }, participants);
            return {
                message: `${certificates.length} certificates generated successfully`,
                count: certificates.length,
                certificates,
            };
        }
        /**
         * Get certificate statistics for event
         */
        async getCertificateStats(eventId) {
            return this.bulkCertificateService.getEventCertificateStats(eventId);
        }
        /**
         * Get all certificates for event
         */
        async getEventCertificates(eventId) {
            return this.bulkCertificateService.getCertificatesForEvent(eventId);
        }
        /**
         * Send event invitation email to participant
         */
        async sendInvitation(eventId, body) {
            const event = await this.eventsService.findOne(eventId);
            await this.eventsService.sendEventInvitation(event, body.email, body.name, body.additionalInfo);
            return { message: 'Invitation email sent successfully' };
        }
        /**
         * Send event reminder email to participant
         */
        async sendReminder(eventId, body) {
            const event = await this.eventsService.findOne(eventId);
            await this.eventsService.sendEventReminder(event, body.email, body.name);
            return { message: 'Reminder email sent successfully' };
        }
        /**
         * Send event cancellation email to participant
         */
        async sendCancellation(eventId, body) {
            const event = await this.eventsService.findOne(eventId);
            await this.eventsService.sendEventCancellation(event, body.email, body.name, body.reason);
            return { message: 'Cancellation email sent successfully' };
        }
        /**
         * Send event update notification to participant
         */
        async sendUpdate(eventId, body) {
            const event = await this.eventsService.findOne(eventId);
            await this.eventsService.sendEventUpdate(event, body.email, body.name, body.changes);
            return { message: 'Update email sent successfully' };
        }
    };
    return EventsController = _classThis;
})();
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map