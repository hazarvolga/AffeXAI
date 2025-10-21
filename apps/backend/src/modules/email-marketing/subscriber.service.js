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
exports.SubscriberService = void 0;
const common_1 = require("@nestjs/common");
let SubscriberService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SubscriberService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SubscriberService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        subscribersRepository;
        emailValidationService;
        advancedEmailValidationService;
        constructor(subscribersRepository, emailValidationService, advancedEmailValidationService) {
            this.subscribersRepository = subscribersRepository;
            this.emailValidationService = emailValidationService;
            this.advancedEmailValidationService = advancedEmailValidationService;
        }
        async create(createSubscriberDto, senderIp) {
            // If mailerCheckResult is not provided, validate the email automatically
            let mailerCheckResult = createSubscriberDto.mailerCheckResult;
            if (!mailerCheckResult) {
                // Use advanced validation with IP reputation checking for better accuracy
                const validationResult = await this.advancedEmailValidationService.validateEmail(createSubscriberDto.email, senderIp);
                mailerCheckResult = validationResult.status;
            }
            const subscriber = this.subscribersRepository.create({
                ...createSubscriberDto,
                mailerCheckResult,
                status: createSubscriberDto.status || 'pending',
                groups: createSubscriberDto.groups || [],
                segments: createSubscriberDto.segments || [],
            });
            return this.subscribersRepository.save(subscriber);
        }
        async findAll() {
            return this.subscribersRepository.find();
        }
        async findOne(id) {
            const subscriber = await this.subscribersRepository.findOne({ where: { id } });
            if (!subscriber) {
                throw new common_1.NotFoundException(`Subscriber with ID ${id} not found`);
            }
            return subscriber;
        }
        async findByEmail(email) {
            const subscriber = await this.subscribersRepository.findOne({ where: { email } });
            if (!subscriber) {
                throw new common_1.NotFoundException(`Subscriber with email ${email} not found`);
            }
            return subscriber;
        }
        async update(id, updateSubscriberDto) {
            const subscriber = await this.findOne(id);
            Object.assign(subscriber, updateSubscriberDto);
            return this.subscribersRepository.save(subscriber);
        }
        async remove(id) {
            const subscriber = await this.findOne(id);
            await this.subscribersRepository.remove(subscriber);
        }
        async subscribe(email, senderIp) {
            let subscriber = await this.subscribersRepository.findOne({ where: { email } });
            if (subscriber) {
                // If subscriber exists, update their status to active
                subscriber.status = 'active';
                subscriber.lastUpdated = new Date();
            }
            else {
                // If subscriber doesn't exist, create a new one
                // Validate email with IP reputation checking before creating subscriber
                const validationResult = await this.advancedEmailValidationService.validateEmail(email, senderIp);
                const mailerCheckResult = validationResult.status;
                subscriber = this.subscribersRepository.create({
                    email,
                    mailerCheckResult,
                    status: 'active',
                    groups: [],
                    segments: [],
                    subscribedAt: new Date(),
                    lastUpdated: new Date(),
                });
            }
            return this.subscribersRepository.save(subscriber);
        }
        async unsubscribe(email) {
            const subscriber = await this.findByEmail(email);
            subscriber.status = 'unsubscribed';
            subscriber.lastUpdated = new Date();
            return this.subscribersRepository.save(subscriber);
        }
        /**
         * Update subscriber status based on webhook events
         * Called by WebhookService when bounce/complaint events occur
         */
        async updateStatusFromWebhook(email, status, metadata) {
            try {
                const subscriber = await this.subscribersRepository.findOne({ where: { email } });
                if (!subscriber) {
                    // Subscriber not found - this is OK, they might not be in marketing list
                    return null;
                }
                // Update status
                subscriber.status = status;
                subscriber.lastUpdated = new Date();
                // Store webhook metadata if provided
                if (metadata) {
                    subscriber.mailerCheckResult = metadata.bounceType || metadata.reason || subscriber.mailerCheckResult;
                }
                await this.subscribersRepository.save(subscriber);
                return subscriber;
            }
            catch (error) {
                // Log error but don't throw - webhook processing should continue
                console.error(`Failed to update subscriber ${email} from webhook:`, error);
                return null;
            }
        }
        /**
         * Check if email is suppressed (bounced, complained, or unsubscribed)
         * Should be checked before sending any marketing email
         */
        async isEmailSuppressed(email) {
            const subscriber = await this.subscribersRepository.findOne({ where: { email } });
            if (!subscriber) {
                return false;
            }
            return ['bounced', 'complained', 'unsubscribed'].includes(subscriber.status);
        }
    };
    return SubscriberService = _classThis;
})();
exports.SubscriberService = SubscriberService;
//# sourceMappingURL=subscriber.service.js.map