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
exports.OptInOutService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_interface_1 = require("../../mail/interfaces/mail-service.interface");
const shared_types_1 = require("@affexai/shared-types");
const uuid_1 = require("uuid");
let OptInOutService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OptInOutService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OptInOutService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        subscriberRepository;
        mailService;
        constructor(subscriberRepository, mailService) {
            this.subscriberRepository = subscriberRepository;
            this.mailService = mailService;
        }
        /**
         * Subscribe a new email with double opt-in
         */
        async subscribeWithDoubleOptIn(email, data, ipAddress) {
            // Check if already subscribed
            let subscriber = await this.subscriberRepository.findOne({
                where: { email },
            });
            if (subscriber) {
                if (subscriber.status === shared_types_1.SubscriberStatus.ACTIVE) {
                    return {
                        message: 'Bu email adresi zaten kayıtlı.',
                        requiresConfirmation: false,
                    };
                }
                if (subscriber.status === shared_types_1.SubscriberStatus.PENDING && !subscriber.isDoubleOptIn) {
                    // Resend confirmation email
                    await this.sendOptInConfirmationEmail(subscriber);
                    return {
                        message: 'Onay emaili tekrar gönderildi. Lütfen email kutunuzu kontrol edin.',
                        requiresConfirmation: true,
                    };
                }
            }
            // Create new subscriber
            const optInToken = (0, uuid_1.v4)();
            const unsubscribeToken = (0, uuid_1.v4)();
            subscriber = this.subscriberRepository.create({
                email,
                firstName: data?.firstName,
                lastName: data?.lastName,
                company: data?.company,
                status: shared_types_1.SubscriberStatus.PENDING,
                isDoubleOptIn: false,
                optInToken,
                unsubscribeToken,
                optInIp: ipAddress,
                emailNotifications: true,
                marketingEmails: data?.marketingEmails !== false,
                transactionalEmails: true,
            });
            await this.subscriberRepository.save(subscriber);
            // Send confirmation email
            await this.sendOptInConfirmationEmail(subscriber);
            return {
                message: 'Aboneliğinizi onaylamak için email adresinize gönderilen linke tıklayın.',
                requiresConfirmation: true,
            };
        }
        /**
         * Confirm double opt-in subscription
         */
        async confirmOptIn(token, ipAddress) {
            const subscriber = await this.subscriberRepository.findOne({
                where: { optInToken: token },
            });
            if (!subscriber) {
                throw new common_1.NotFoundException('Geçersiz veya süresi dolmuş onay linki.');
            }
            if (subscriber.isDoubleOptIn) {
                return {
                    success: true,
                    message: 'Aboneliğiniz zaten onaylanmış.',
                };
            }
            // Update subscriber
            subscriber.isDoubleOptIn = true;
            subscriber.status = shared_types_1.SubscriberStatus.ACTIVE;
            subscriber.optInDate = new Date();
            subscriber.optInIp = ipAddress || subscriber.optInIp;
            subscriber.optInToken = null; // Clear token after use
            await this.subscriberRepository.save(subscriber);
            // Send welcome email
            await this.sendWelcomeEmail(subscriber);
            return {
                success: true,
                message: 'Aboneliğiniz başarıyla onaylandı! Hoş geldiniz.',
            };
        }
        /**
         * Unsubscribe using token (one-click unsubscribe)
         */
        async unsubscribeWithToken(token, reason, ipAddress) {
            const subscriber = await this.subscriberRepository.findOne({
                where: { unsubscribeToken: token },
            });
            if (!subscriber) {
                throw new common_1.NotFoundException('Geçersiz abonelikten çıkma linki.');
            }
            if (subscriber.status === shared_types_1.SubscriberStatus.UNSUBSCRIBED) {
                return {
                    success: true,
                    message: 'Zaten abonelikten çıkmışsınız.',
                };
            }
            // Update subscriber
            subscriber.status = shared_types_1.SubscriberStatus.UNSUBSCRIBED;
            subscriber.optOutDate = new Date();
            subscriber.optOutReason = reason || '';
            subscriber.optOutIp = ipAddress || '';
            subscriber.emailNotifications = false;
            subscriber.marketingEmails = false;
            // Keep transactional emails as true (legal/important emails)
            await this.subscriberRepository.save(subscriber);
            // Send goodbye email
            await this.sendGoodbyeEmail(subscriber);
            return {
                success: true,
                message: 'Abonelikten başarıyla çıktınız. Tekrar görüşmek üzere!',
            };
        }
        /**
         * Update email preferences
         */
        async updatePreferences(email, preferences) {
            const subscriber = await this.subscriberRepository.findOne({
                where: { email },
            });
            if (!subscriber) {
                throw new common_1.NotFoundException('Abone bulunamadı.');
            }
            if (preferences.marketingEmails !== undefined) {
                subscriber.marketingEmails = preferences.marketingEmails;
            }
            if (preferences.emailNotifications !== undefined) {
                subscriber.emailNotifications = preferences.emailNotifications;
            }
            return await this.subscriberRepository.save(subscriber);
        }
        /**
         * Re-subscribe (opt back in)
         */
        async resubscribe(email, ipAddress) {
            const subscriber = await this.subscriberRepository.findOne({
                where: { email },
            });
            if (!subscriber) {
                throw new common_1.NotFoundException('Bu email adresi sistemde kayıtlı değil.');
            }
            if (subscriber.status === shared_types_1.SubscriberStatus.ACTIVE) {
                return {
                    success: true,
                    message: 'Zaten aktif abonesiniz.',
                };
            }
            // Generate new opt-in token for re-confirmation
            subscriber.optInToken = (0, uuid_1.v4)();
            subscriber.status = shared_types_1.SubscriberStatus.PENDING;
            subscriber.isDoubleOptIn = false;
            subscriber.optOutDate = null;
            subscriber.optOutReason = null;
            await this.subscriberRepository.save(subscriber);
            // Send re-confirmation email
            await this.sendOptInConfirmationEmail(subscriber);
            return {
                success: true,
                message: 'Yeniden abone olmak için email adresinize gönderilen linke tıklayın.',
            };
        }
        /**
         * Get subscriber preferences
         */
        async getPreferences(email) {
            const subscriber = await this.subscriberRepository.findOne({
                where: { email },
            });
            if (!subscriber) {
                throw new common_1.NotFoundException('Abone bulunamadı.');
            }
            return {
                emailNotifications: subscriber.emailNotifications,
                marketingEmails: subscriber.marketingEmails,
                transactionalEmails: subscriber.transactionalEmails,
                status: subscriber.status,
            };
        }
        /**
         * Send opt-in confirmation email
         */
        async sendOptInConfirmationEmail(subscriber) {
            const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/confirm-subscription?token=${subscriber.optInToken}`;
            await this.mailService.sendMail({
                to: { email: subscriber.email },
                subject: 'Aboneliğinizi Onaylayın',
                html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Aboneliğinizi Onaylayın</h2>
              <p>Merhaba ${subscriber.firstName || 'Değerli Abone'},</p>
              <p>Aluplan haber bültenimize abone olmak için lütfen aşağıdaki butona tıklayın. Bu bağlantı tek kullanımlıktır.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${confirmationUrl}" 
                   style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Aboneliği Onayla
                </a>
              </div>
              <p>Veya bu linki tarayıcınıza kopyalayın:</p>
              <p style="word-break: break-all; color: #666;">${confirmationUrl}</p>
              <p>Eğer bu talebi siz yapmadıysanız, bu e-postayı güvenle görmezden gelebilirsiniz.</p>
              <p>Teşekkürler,<br/>Aluplan Ekibi</p>
            </div>
          </body>
        </html>
      `,
                text: `Merhaba ${subscriber.firstName || 'Değerli Abone'},

Aluplan haber bültenimize abone olmak için lütfen aşağıdaki linke tıklayın:
${confirmationUrl}

Teşekkürler,
Aluplan Ekibi`,
                channel: mail_service_interface_1.MailChannel.MARKETING,
                priority: mail_service_interface_1.MailPriority.NORMAL,
            });
        }
        /**
         * Send welcome email
         */
        async sendWelcomeEmail(subscriber) {
            const preferencesUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/email-preferences?email=${subscriber.email}`;
            await this.mailService.sendMail({
                to: { email: subscriber.email },
                subject: 'Hoş Geldiniz!',
                html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Hoş Geldiniz!</h2>
              <p>Merhaba ${subscriber.firstName || 'Değerli Abone'},</p>
              <p>Aluplan haber bültenimize abone olduğunuz için teşekkür ederiz! Artık en yeni haberler ve kampanyalardan ilk siz haberdar olacaksınız.</p>
              <p>E-posta tercihlerinizi dilediğiniz zaman <a href="${preferencesUrl}">buradan</a> değiştirebilirsiniz.</p>
              <p>Teşekkürler,<br/>Aluplan Ekibi</p>
            </div>
          </body>
        </html>
      `,
                text: `Merhaba ${subscriber.firstName || 'Değerli Abone'},

Aluplan haber bültenimize abone olduğunuz için teşekkür ederiz! Artık en yeni haberler ve kampanyalardan ilk siz haberdar olacaksınız.

E-posta tercihlerinizi dilediğiniz zaman buradan değiştirebilirsiniz: ${preferencesUrl}

Teşekkürler,
Aluplan Ekibi`,
                channel: mail_service_interface_1.MailChannel.MARKETING,
                priority: mail_service_interface_1.MailPriority.NORMAL,
            });
        }
        /**
         * Send goodbye email
         */
        async sendGoodbyeEmail(subscriber) {
            const resubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resubscribe?email=${subscriber.email}`;
            await this.mailService.sendMail({
                to: { email: subscriber.email },
                subject: 'Görüşmek Üzere',
                html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Görüşmek Üzere</h2>
              <p>Merhaba ${subscriber.firstName || 'Değerli Abone'},</p>
              <p>Aluplan haber bülteninden ayrıldığınız için üzgünüz. Artık size pazarlama e-postaları göndermeyeceğiz.</p>
              <p>Fikrinizi değiştirirseniz, dilediğiniz zaman <a href="${resubscribeUrl}">buraya tıklayarak</a> yeniden abone olabilirsiniz.</p>
              <p>Teşekkürler,<br/>Aluplan Ekibi</p>
            </div>
          </body>
        </html>
      `,
                text: `Merhaba ${subscriber.firstName || 'Değerli Abone'},

Aluplan haber bülteninden ayrıldığınız için üzgünüz. Artık size pazarlama e-postaları göndermeyeceğiz.

Fikrinizi değiştirirseniz, dilediğiniz zaman yeniden abone olabilirsiniz: ${resubscribeUrl}

Teşekkürler,
Aluplan Ekibi`,
                channel: mail_service_interface_1.MailChannel.MARKETING,
                priority: mail_service_interface_1.MailPriority.NORMAL,
            });
        }
        /**
         * Check if email can receive marketing emails
         */
        async canReceiveMarketingEmails(email) {
            const subscriber = await this.subscriberRepository.findOne({
                where: { email },
            });
            if (!subscriber) {
                return false;
            }
            return (subscriber.status === shared_types_1.SubscriberStatus.ACTIVE &&
                subscriber.isDoubleOptIn &&
                subscriber.marketingEmails &&
                subscriber.emailNotifications);
        }
        /**
         * Check if email can receive transactional emails
         */
        async canReceiveTransactionalEmails(email) {
            const subscriber = await this.subscriberRepository.findOne({
                where: { email },
            });
            // Transactional emails can always be sent (legal requirement)
            return subscriber?.transactionalEmails !== false;
        }
    };
    return OptInOutService = _classThis;
})();
exports.OptInOutService = OptInOutService;
//# sourceMappingURL=opt-in-out.service.js.map