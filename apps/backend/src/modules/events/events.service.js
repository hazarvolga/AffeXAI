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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_interface_1 = require("../mail/interfaces/mail-service.interface");
let EventsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EventsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EventsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        eventsRepository;
        cacheService;
        mailService;
        eventBusService;
        logger = new common_1.Logger(EventsService.name);
        constructor(eventsRepository, cacheService, mailService, eventBusService) {
            this.eventsRepository = eventsRepository;
            this.cacheService = cacheService;
            this.mailService = mailService;
            this.eventBusService = eventBusService;
        }
        async create(createEventDto) {
            const event = this.eventsRepository.create(createEventDto);
            const savedEvent = await this.eventsRepository.save(event);
            // Clear cache for findAll
            await this.cacheService.del('events:all');
            // Publish platform event
            await this.eventBusService.publishEventCreated(savedEvent.id, {
                title: savedEvent.title,
                startDate: savedEvent.startDate,
                endDate: savedEvent.endDate,
                location: savedEvent.location,
                capacity: savedEvent.capacity,
            }, 'system');
            return savedEvent;
        }
        async findAll() {
            const cached = await this.cacheService.get('events:all');
            if (cached) {
                return cached;
            }
            const events = await this.eventsRepository.find();
            await this.cacheService.set('events:all', events, 30); // 30 seconds TTL
            return events;
        }
        async findOne(id) {
            const cached = await this.cacheService.get(`events:${id}`);
            if (cached) {
                return cached;
            }
            const event = await this.eventsRepository.findOne({ where: { id } });
            if (!event) {
                throw new common_1.NotFoundException(`Event with ID ${id} not found`);
            }
            await this.cacheService.set(`events:${id}`, event, 60); // 60 seconds TTL
            return event;
        }
        // New method to get dashboard statistics
        async getDashboardStats() {
            const allEvents = await this.findAll();
            const now = new Date();
            // Count upcoming events (events that haven't started yet)
            const upcomingEvents = allEvents.filter(event => new Date(event.startDate) > now).length;
            // For ticket sales, we'll simulate based on event capacity (assuming 75% average attendance)
            const totalTicketSales = allEvents.reduce((total, event) => {
                return total + Math.floor(event.capacity * 0.75);
            }, 0);
            // For participants, we'll use the same calculation as ticket sales
            const totalParticipants = totalTicketSales;
            // For revenue, we'll calculate based on price and attendance
            const monthlyRevenue = allEvents.reduce((total, event) => {
                const attendance = Math.floor(event.capacity * 0.75);
                const price = Number(event.price) || 0; // Handle case where price might be null
                return total + (attendance * price);
            }, 0);
            // Calculate revenue change (simplified - using 10% as a mock value)
            const revenueChange = 10;
            return {
                upcomingEvents,
                totalTicketSales,
                totalParticipants,
                monthlyRevenue,
                revenueChange
            };
        }
        async update(id, updateEventDto) {
            // First check if event exists
            const existingEvent = await this.eventsRepository.findOne({ where: { id } });
            if (!existingEvent) {
                throw new common_1.NotFoundException(`Event with ID ${id} not found`);
            }
            await this.eventsRepository.update(id, updateEventDto);
            const event = await this.findOne(id);
            // Clear cache for this event and all events
            await this.cacheService.del(`events:${id}`);
            await this.cacheService.del('events:all');
            // Publish platform event for significant updates
            if (updateEventDto.status === 'published') {
                await this.eventBusService.publishEventPublished(event.id, {
                    title: event.title,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    location: event.location,
                    capacity: event.capacity,
                }, 'system');
            }
            return event;
        }
        async remove(id) {
            // First check if event exists
            const existingEvent = await this.eventsRepository.findOne({ where: { id } });
            if (!existingEvent) {
                throw new common_1.NotFoundException(`Event with ID ${id} not found`);
            }
            await this.eventsRepository.delete(id);
            // Clear cache for this event and all events
            await this.cacheService.del(`events:${id}`);
            await this.cacheService.del('events:all');
        }
        /**
         * Send event invitation email to participant
         */
        async sendEventInvitation(event, participantEmail, participantName, additionalInfo) {
            try {
                const eventDate = new Date(event.startDate).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
                const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9fafb; }
              .event-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
              .detail-row { margin: 10px 0; }
              .label { font-weight: bold; color: #1f2937; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
              .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Etkinlik Daveti</h1>
              </div>
              <div class="content">
                <p>Merhaba ${participantName},</p>
                <p>Aşağıdaki etkinliğe davetlisiniz:</p>
                
                <div class="event-details">
                  <h2>${event.title}</h2>
                  <div class="detail-row">
                    <span class="label">Tarih:</span> ${eventDate}
                  </div>
                  <div class="detail-row">
                    <span class="label">Konum:</span> ${event.location}
                  </div>
                  <div class="detail-row">
                    <span class="label">Kapasite:</span> ${event.capacity} kişi
                  </div>
                  ${event.price > 0 ? `<div class="detail-row"><span class="label">Fiyat:</span> ${event.price} TL</div>` : ''}
                  <div class="detail-row">
                    <p>${event.description}</p>
                  </div>
                </div>

                ${event.grantsCertificate ? '<p><strong>✨ Bu etkinlik sonunda sertifika alacaksınız!</strong></p>' : ''}
                
                <p>Katılımınızı bekliyoruz!</p>
              </div>
              <div class="footer">
                <p>© 2025 Aluplan. Tüm hakları saklıdır.</p>
                <p>Bu email info@aluplan.tr tarafından gönderilmiştir.</p>
              </div>
            </div>
          </body>
        </html>
      `;
                await this.mailService.sendMail({
                    to: { email: participantEmail, name: participantName },
                    subject: `Etkinlik Daveti: ${event.title}`,
                    html: htmlContent,
                    channel: mail_service_interface_1.MailChannel.EVENT,
                    priority: mail_service_interface_1.MailPriority.NORMAL,
                    metadata: {
                        eventId: event.id,
                        eventTitle: event.title,
                        participantName,
                        ...additionalInfo,
                    },
                });
                this.logger.log(`Event invitation sent to ${participantEmail} for event: ${event.title}`);
            }
            catch (error) {
                this.logger.error(`Failed to send event invitation: ${error.message}`);
                throw error;
            }
        }
        /**
         * Send event reminder email (24 hours before event)
         */
        async sendEventReminder(event, participantEmail, participantName) {
            try {
                const eventDate = new Date(event.startDate).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
                const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #fffbeb; }
              .event-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
              .detail-row { margin: 10px 0; }
              .label { font-weight: bold; color: #1f2937; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
              .reminder-badge { background: #fbbf24; color: #78350f; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⏰ Etkinlik Hatırlatması</h1>
              </div>
              <div class="content">
                <p>Merhaba ${participantName},</p>
                <p><span class="reminder-badge">Yarın gerçekleşecek!</span></p>
                <p>Katılacağınız etkinlik yaklaşıyor:</p>
                
                <div class="event-details">
                  <h2>${event.title}</h2>
                  <div class="detail-row">
                    <span class="label">📅 Tarih:</span> ${eventDate}
                  </div>
                  <div class="detail-row">
                    <span class="label">📍 Konum:</span> ${event.location}
                  </div>
                </div>

                <p>Lütfen zamanında katılmayı unutmayın!</p>
              </div>
              <div class="footer">
                <p>© 2025 Aluplan. Tüm hakları saklıdır.</p>
              </div>
            </div>
          </body>
        </html>
      `;
                await this.mailService.sendMail({
                    to: { email: participantEmail, name: participantName },
                    subject: `Hatırlatma: ${event.title} - Yarın Gerçekleşecek!`,
                    html: htmlContent,
                    channel: mail_service_interface_1.MailChannel.EVENT,
                    priority: mail_service_interface_1.MailPriority.HIGH,
                    metadata: {
                        eventId: event.id,
                        eventTitle: event.title,
                        participantName,
                        reminderType: '24h',
                    },
                });
                this.logger.log(`Event reminder sent to ${participantEmail} for event: ${event.title}`);
            }
            catch (error) {
                this.logger.error(`Failed to send event reminder: ${error.message}`);
                throw error;
            }
        }
        /**
         * Send event cancellation email
         */
        async sendEventCancellation(event, participantEmail, participantName, cancellationReason) {
            try {
                const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #fef2f2; }
              .event-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
              .detail-row { margin: 10px 0; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
              .cancel-badge { background: #ef4444; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>❌ Etkinlik İptali</h1>
              </div>
              <div class="content">
                <p>Merhaba ${participantName},</p>
                <p><span class="cancel-badge">İPTAL EDİLDİ</span></p>
                <p>Üzülerek bildiririz ki aşağıdaki etkinlik iptal edilmiştir:</p>
                
                <div class="event-details">
                  <h2>${event.title}</h2>
                  ${cancellationReason ? `<p><strong>İptal Nedeni:</strong> ${cancellationReason}</p>` : ''}
                </div>

                <p>Bu durumdan dolayı özür dileriz. Gelecek etkinliklerimizden haberdar olmak için takipte kalın.</p>
              </div>
              <div class="footer">
                <p>© 2025 Aluplan. Tüm hakları saklıdır.</p>
                <p>Sorularınız için: destek@aluplan.tr</p>
              </div>
            </div>
          </body>
        </html>
      `;
                await this.mailService.sendMail({
                    to: { email: participantEmail, name: participantName },
                    subject: `İptal: ${event.title}`,
                    html: htmlContent,
                    channel: mail_service_interface_1.MailChannel.EVENT,
                    priority: mail_service_interface_1.MailPriority.HIGH,
                    metadata: {
                        eventId: event.id,
                        eventTitle: event.title,
                        participantName,
                        cancellationReason: cancellationReason || 'Belirtilmedi',
                    },
                });
                this.logger.log(`Event cancellation sent to ${participantEmail} for event: ${event.title}`);
            }
            catch (error) {
                this.logger.error(`Failed to send event cancellation: ${error.message}`);
                throw error;
            }
        }
        /**
         * Send event update notification
         */
        async sendEventUpdate(event, participantEmail, participantName, changes) {
            try {
                const eventDate = new Date(event.startDate).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
                const changesHtml = changes.map(change => `<li>${change}</li>`).join('');
                const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0891b2; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #ecfeff; }
              .event-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
              .changes-list { background: #f0f9ff; padding: 15px; margin: 15px 0; border-left: 4px solid #0891b2; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📢 Etkinlik Güncellendi</h1>
              </div>
              <div class="content">
                <p>Merhaba ${participantName},</p>
                <p>Katılacağınız etkinlikte değişiklik yapılmıştır:</p>
                
                <div class="event-details">
                  <h2>${event.title}</h2>
                  <p><strong>Yeni Tarih:</strong> ${eventDate}</p>
                  <p><strong>Konum:</strong> ${event.location}</p>
                </div>

                <div class="changes-list">
                  <strong>Yapılan Değişiklikler:</strong>
                  <ul>
                    ${changesHtml}
                  </ul>
                </div>

                <p>Lütfen bu değişiklikleri not alın.</p>
              </div>
              <div class="footer">
                <p>© 2025 Aluplan. Tüm hakları saklıdır.</p>
              </div>
            </div>
          </body>
        </html>
      `;
                await this.mailService.sendMail({
                    to: { email: participantEmail, name: participantName },
                    subject: `Güncelleme: ${event.title}`,
                    html: htmlContent,
                    channel: mail_service_interface_1.MailChannel.EVENT,
                    priority: mail_service_interface_1.MailPriority.NORMAL,
                    metadata: {
                        eventId: event.id,
                        eventTitle: event.title,
                        participantName,
                        changes,
                    },
                });
                this.logger.log(`Event update sent to ${participantEmail} for event: ${event.title}`);
            }
            catch (error) {
                this.logger.error(`Failed to send event update: ${error.message}`);
                throw error;
            }
        }
    };
    return EventsService = _classThis;
})();
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map