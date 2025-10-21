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
exports.TicketAutoTaggingService = void 0;
const common_1 = require("@nestjs/common");
let TicketAutoTaggingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketAutoTaggingService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketAutoTaggingService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ticketRepository;
        logger = new common_1.Logger(TicketAutoTaggingService.name);
        // Tag rules with keywords (Turkish + English)
        tagRules = [
            // Technical Issues
            {
                tag: 'bug',
                keywords: [
                    'bug', 'hata', 'sorun', 'problem', 'çalışmıyor', 'not working',
                    'error', 'crash', 'broken', 'fail', 'failed', 'bozuk', 'arıza',
                ],
                priority: 10,
            },
            {
                tag: 'performance',
                keywords: [
                    'slow', 'yavaş', 'ağır', 'lag', 'latency', 'freeze', 'donma',
                    'takılıyor', 'kasma', 'gecikmeli', 'timeout', '느림',
                ],
                priority: 8,
            },
            // Feature & Enhancement
            {
                tag: 'feature-request',
                keywords: [
                    'feature', 'özellik', 'request', 'istek', 'can you add', 'ekleyebilir misiniz',
                    'would be nice', 'suggestion', 'öneri', 'improvement', 'iyileştirme',
                    'enhancement', 'geliştirme',
                ],
                priority: 7,
            },
            {
                tag: 'enhancement',
                keywords: [
                    'better', 'daha iyi', 'improve', 'geliştir', 'optimize', 'optimize et',
                    'faster', 'daha hızlı', 'easier', 'daha kolay', 'modernize',
                ],
                priority: 6,
            },
            // Account & Authentication
            {
                tag: 'authentication',
                keywords: [
                    'login', 'giriş', 'password', 'şifre', 'sign in', 'oturum',
                    'logout', 'çıkış', 'forgot password', 'şifremi unuttum',
                    'reset password', 'şifre sıfırlama', '2fa', 'two-factor',
                ],
                priority: 9,
            },
            {
                tag: 'account',
                keywords: [
                    'account', 'hesap', 'profile', 'profil', 'settings', 'ayarlar',
                    'delete account', 'hesabı sil', 'suspend', 'askıya al',
                ],
                priority: 8,
            },
            // Billing & Payments
            {
                tag: 'billing',
                keywords: [
                    'billing', 'fatura', 'invoice', 'payment', 'ödeme', 'charge',
                    'ücret', 'subscription', 'abonelik', 'plan', 'upgrade',
                    'yükselt', 'downgrade', 'düşür', 'refund', 'iade',
                ],
                priority: 9,
            },
            {
                tag: 'payment-failed',
                keywords: [
                    'payment failed', 'ödeme başarısız', 'declined', 'reddedildi',
                    'credit card', 'kredi kartı', 'insufficient funds', 'yetersiz bakiye',
                ],
                priority: 10,
            },
            // Questions & Support
            {
                tag: 'question',
                keywords: [
                    'how to', 'nasıl', 'how do i', 'how can i', 'nasıl yapabilirim',
                    'what is', 'nedir', 'where is', 'nerede', 'why', 'neden',
                    'soru', 'question', 'help', 'yardım',
                ],
                priority: 5,
            },
            {
                tag: 'documentation',
                keywords: [
                    'documentation', 'dokümantasyon', 'guide', 'kılavuz', 'tutorial',
                    'how-to', 'manual', 'kullanım kılavuzu', 'instructions', 'talimatlar',
                ],
                priority: 4,
            },
            // Integration & API
            {
                tag: 'api',
                keywords: [
                    'api', 'endpoint', 'webhook', 'integration', 'entegrasyon',
                    'rest', 'graphql', 'sdk', 'library', 'kütüphane',
                ],
                priority: 7,
            },
            {
                tag: 'integration',
                keywords: [
                    'integration', 'entegrasyon', 'connect', 'bağlan', 'sync', 'senkronize',
                    'import', 'export', 'dışa aktar', 'içe aktar', 'third-party',
                ],
                priority: 7,
            },
            // Security & Privacy
            {
                tag: 'security',
                keywords: [
                    'security', 'güvenlik', 'hack', 'breach', 'ihlal', 'vulnerability',
                    'zafiyet', 'encrypt', 'şifreleme', 'ssl', 'https', 'secure',
                ],
                priority: 10,
            },
            {
                tag: 'privacy',
                keywords: [
                    'privacy', 'gizlilik', 'gdpr', 'kvkk', 'personal data', 'kişisel veri',
                    'delete data', 'veriyi sil', 'data protection', 'veri koruma',
                ],
                priority: 9,
            },
            // Mobile & Desktop
            {
                tag: 'mobile',
                keywords: [
                    'mobile', 'mobil', 'ios', 'android', 'phone', 'telefon',
                    'tablet', 'app', 'uygulama',
                ],
                priority: 6,
            },
            {
                tag: 'desktop',
                keywords: [
                    'desktop', 'masaüstü', 'windows', 'mac', 'linux',
                    'electron', 'application',
                ],
                priority: 6,
            },
            // UI/UX
            {
                tag: 'ui',
                keywords: [
                    'ui', 'user interface', 'arayüz', 'design', 'tasarım',
                    'button', 'buton', 'menu', 'menü', 'layout', 'düzen',
                ],
                priority: 5,
            },
            {
                tag: 'ux',
                keywords: [
                    'ux', 'user experience', 'kullanıcı deneyimi', 'confusing', 'kafa karıştırıcı',
                    'difficult', 'zor', 'complicated', 'karmaşık', 'usability',
                ],
                priority: 5,
            },
            // Data & Export
            {
                tag: 'data-loss',
                keywords: [
                    'data loss', 'veri kaybı', 'lost data', 'kayıp veri', 'missing', 'eksik',
                    'disappeared', 'kayboldu', 'deleted', 'silindi',
                ],
                priority: 10,
            },
            {
                tag: 'export',
                keywords: [
                    'export', 'dışa aktar', 'download', 'indir', 'csv', 'excel',
                    'pdf', 'backup', 'yedek',
                ],
                priority: 5,
            },
            // Notification & Email
            {
                tag: 'notification',
                keywords: [
                    'notification', 'bildirim', 'alert', 'uyarı', 'email notification',
                    'e-posta bildirimi', 'push notification',
                ],
                priority: 4,
            },
            {
                tag: 'email',
                keywords: [
                    'email', 'e-posta', 'mail', 'posta', 'inbox', 'gelen kutusu',
                    'spam', 'newsletter', 'bülten',
                ],
                priority: 4,
            },
        ];
        constructor(ticketRepository) {
            this.ticketRepository = ticketRepository;
        }
        /**
         * Automatically tag a ticket based on content
         */
        async autoTag(ticket) {
            const content = `${ticket.subject} ${ticket.description}`.toLowerCase();
            const detectedTags = [];
            // Check each rule
            for (const rule of this.tagRules) {
                let score = 0;
                for (const keyword of rule.keywords) {
                    const keywordLower = keyword.toLowerCase();
                    const occurrences = (content.match(new RegExp(keywordLower, 'g')) || []).length;
                    if (occurrences > 0) {
                        // Weight by keyword occurrence and priority
                        score += occurrences * (rule.priority || 1);
                    }
                }
                if (score > 0) {
                    detectedTags.push({ tag: rule.tag, score });
                }
            }
            // Sort by score and take top tags
            detectedTags.sort((a, b) => b.score - a.score);
            const selectedTags = detectedTags.slice(0, 5).map(t => t.tag);
            this.logger.log(`Auto-tagged ticket ${ticket.id} with: ${selectedTags.join(', ')} (from ${detectedTags.length} detected tags)`);
            return selectedTags;
        }
        /**
         * Update ticket with auto-generated tags
         */
        async applyAutoTags(ticketId) {
            const ticket = await this.ticketRepository.findOne({
                where: { id: ticketId },
            });
            if (!ticket) {
                throw new Error(`Ticket ${ticketId} not found`);
            }
            const autoTags = await this.autoTag(ticket);
            // Merge with existing tags (avoid duplicates)
            const existingTags = ticket.tags || [];
            const mergedTags = Array.from(new Set([...existingTags, ...autoTags]));
            ticket.tags = mergedTags;
            await this.ticketRepository.save(ticket);
            this.logger.log(`Applied auto-tags to ticket ${ticketId}: ${autoTags.join(', ')}`);
            return ticket;
        }
        /**
         * Get suggested tags without applying them
         */
        async getSuggestedTags(ticketId) {
            const ticket = await this.ticketRepository.findOne({
                where: { id: ticketId },
            });
            if (!ticket) {
                throw new Error(`Ticket ${ticketId} not found`);
            }
            return await this.autoTag(ticket);
        }
        /**
         * Add custom tag rule
         */
        addTagRule(rule) {
            this.tagRules.push(rule);
            this.logger.log(`Added custom tag rule: ${rule.tag}`);
        }
        /**
         * Get all tag rules
         */
        getTagRules() {
            return this.tagRules;
        }
    };
    return TicketAutoTaggingService = _classThis;
})();
exports.TicketAutoTaggingService = TicketAutoTaggingService;
//# sourceMappingURL=ticket-auto-tagging.service.js.map