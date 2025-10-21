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
exports.SendTimeOptimizationService = void 0;
const common_1 = require("@nestjs/common");
let SendTimeOptimizationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SendTimeOptimizationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SendTimeOptimizationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        openHistoryRepository;
        subscriberRepository;
        constructor(openHistoryRepository, subscriberRepository) {
            this.openHistoryRepository = openHistoryRepository;
            this.subscriberRepository = subscriberRepository;
        }
        /**
         * Her abone için kişiselleştirilmiş optimal gönderim zamanı hesaplar
         */
        async calculateOptimalTimeForSubscriber(subscriberId, minDataPoints = 5) {
            // Abonenin email açma geçmişini al
            const history = await this.openHistoryRepository.find({
                where: { subscriberId },
                order: { openedAt: 'DESC' },
                take: 100, // Son 100 açılmayı al
            });
            if (history.length < minDataPoints) {
                // Yeterli veri yoksa global ortalamayı kullan
                const globalOptimal = await this.calculateGlobalOptimalTime();
                return {
                    subscriberId,
                    optimalHour: globalOptimal.hour,
                    optimalDayOfWeek: globalOptimal.dayOfWeek,
                    confidence: 0.3, // Düşük güven skoru
                    timezone: 'UTC',
                    basedOnDataPoints: history.length,
                };
            }
            // Saat bazlı açılma dağılımı
            const hourDistribution = {};
            const dayDistribution = {};
            let mostCommonTimezone = 'UTC';
            history.forEach((record) => {
                if (record.hourOfDay !== null) {
                    hourDistribution[record.hourOfDay] =
                        (hourDistribution[record.hourOfDay] || 0) + 1;
                }
                if (record.dayOfWeek !== null) {
                    dayDistribution[record.dayOfWeek] =
                        (dayDistribution[record.dayOfWeek] || 0) + 1;
                }
                if (record.timezone) {
                    mostCommonTimezone = record.timezone;
                }
            });
            // En popüler saati bul
            const optimalHour = this.findOptimalValue(hourDistribution);
            const optimalDayOfWeek = this.findOptimalValue(dayDistribution);
            // Güven skorunu hesapla (veri noktası sayısına göre)
            const confidence = Math.min(history.length / 30, 1); // 30 veri noktasında tam güven
            return {
                subscriberId,
                optimalHour,
                optimalDayOfWeek,
                confidence,
                timezone: mostCommonTimezone,
                basedOnDataPoints: history.length,
            };
        }
        /**
         * Tüm kampanya için optimal gönderim zamanı hesaplar
         */
        async calculateOptimalTimeForCampaign(subscriberIds) {
            const individualTimes = new Map();
            const allOptimalTimes = [];
            // Her abone için optimal zamanı hesapla
            for (const subscriberId of subscriberIds) {
                const optimalTime = await this.calculateOptimalTimeForSubscriber(subscriberId);
                allOptimalTimes.push(optimalTime);
                // Bireysel optimal zamanı hesapla
                const now = new Date();
                const targetDate = this.getNextOccurrence(optimalTime.optimalDayOfWeek, optimalTime.optimalHour);
                individualTimes.set(subscriberId, targetDate);
            }
            // Global optimal zamanı hesapla (ağırlıklı ortalama)
            const globalOptimal = this.calculateWeightedAverage(allOptimalTimes);
            const globalTime = this.getNextOccurrence(globalOptimal.dayOfWeek, globalOptimal.hour);
            return { globalTime, individualTimes };
        }
        /**
         * Global optimal gönderim zamanını hesaplar
         */
        async calculateGlobalOptimalTime() {
            const result = await this.openHistoryRepository
                .createQueryBuilder('history')
                .select('history.hourOfDay', 'hour')
                .addSelect('history.dayOfWeek', 'day')
                .addSelect('COUNT(*)', 'count')
                .where('history.hourOfDay IS NOT NULL')
                .andWhere('history.dayOfWeek IS NOT NULL')
                .groupBy('history.hourOfDay')
                .addGroupBy('history.dayOfWeek')
                .orderBy('count', 'DESC')
                .limit(1)
                .getRawOne();
            if (!result) {
                // Varsayılan: Salı sabah 10:00
                return {
                    hour: 10,
                    dayOfWeek: 2,
                    averageOpenRate: 0.25,
                };
            }
            return {
                hour: parseInt(result.hour),
                dayOfWeek: parseInt(result.day),
                averageOpenRate: 0.25, // TODO: Gerçek açılma oranını hesapla
            };
        }
        /**
         * Bir aboneye ait email açma geçmişini kaydeder
         */
        async recordEmailOpen(subscriberId, campaignId, metadata = {}) {
            const now = new Date();
            const hourOfDay = now.getHours();
            const dayOfWeek = now.getDay();
            const openHistory = this.openHistoryRepository.create({
                subscriberId,
                campaignId,
                openedAt: now,
                hourOfDay,
                dayOfWeek,
                ...metadata,
            });
            await this.openHistoryRepository.save(openHistory);
        }
        /**
         * Belirli bir segment için optimal gönderim zamanı önerileri
         */
        async getSegmentOptimalTimes(segmentId) {
            // TODO: Segment bazlı analiz
            const globalOptimal = await this.calculateGlobalOptimalTime();
            return {
                recommendations: [
                    {
                        time: `${this.getDayName(globalOptimal.dayOfWeek)} ${globalOptimal.hour}:00`,
                        expectedOpenRate: 0.28,
                        reason: 'Segmentinizin en aktif olduğu zaman',
                    },
                    {
                        time: `${this.getDayName((globalOptimal.dayOfWeek + 1) % 7)} ${globalOptimal.hour}:00`,
                        expectedOpenRate: 0.24,
                        reason: 'İkinci en iyi alternatif',
                    },
                    {
                        time: `${this.getDayName(globalOptimal.dayOfWeek)} ${(globalOptimal.hour + 2) % 24}:00`,
                        expectedOpenRate: 0.22,
                        reason: 'Farklı zaman dilimindeki aboneler için',
                    },
                ],
            };
        }
        /**
         * Dağılımdan optimal değeri bulur
         */
        findOptimalValue(distribution) {
            let maxCount = 0;
            let optimalValue = 0;
            Object.entries(distribution).forEach(([value, count]) => {
                if (count > maxCount) {
                    maxCount = count;
                    optimalValue = parseInt(value);
                }
            });
            return optimalValue;
        }
        /**
         * Ağırlıklı ortalama hesaplar
         */
        calculateWeightedAverage(times) {
            let totalWeight = 0;
            let weightedHour = 0;
            let weightedDay = 0;
            times.forEach((time) => {
                const weight = time.confidence * time.basedOnDataPoints;
                totalWeight += weight;
                weightedHour += time.optimalHour * weight;
                weightedDay += time.optimalDayOfWeek * weight;
            });
            if (totalWeight === 0) {
                return { hour: 10, dayOfWeek: 2 }; // Varsayılan
            }
            return {
                hour: Math.round(weightedHour / totalWeight),
                dayOfWeek: Math.round(weightedDay / totalWeight),
            };
        }
        /**
         * Bir sonraki belirtilen gün ve saati hesaplar
         */
        getNextOccurrence(dayOfWeek, hour) {
            const now = new Date();
            const target = new Date();
            // Hedef saati ayarla
            target.setHours(hour, 0, 0, 0);
            // Hedef günü bul
            const currentDay = now.getDay();
            let daysToAdd = dayOfWeek - currentDay;
            if (daysToAdd < 0 || (daysToAdd === 0 && target <= now)) {
                daysToAdd += 7;
            }
            target.setDate(target.getDate() + daysToAdd);
            return target;
        }
        /**
         * Gün numarasından gün adını döndürür
         */
        getDayName(dayNumber) {
            const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
            return days[dayNumber];
        }
    };
    return SendTimeOptimizationService = _classThis;
})();
exports.SendTimeOptimizationService = SendTimeOptimizationService;
//# sourceMappingURL=send-time-optimization.service.js.map