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
exports.BusinessHoursService = void 0;
const common_1 = require("@nestjs/common");
let BusinessHoursService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BusinessHoursService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BusinessHoursService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new common_1.Logger(BusinessHoursService.name);
        // Default business hours configuration (Turkey)
        config = {
            timezone: 'Europe/Istanbul',
            workDays: [1, 2, 3, 4, 5], // Monday to Friday
            workHours: {
                start: '09:00',
                end: '18:00',
            },
            holidays: [
                // 2025 Turkish National Holidays (example)
                new Date('2025-01-01'), // New Year
                new Date('2025-04-23'), // National Sovereignty Day
                new Date('2025-05-01'), // Labor Day
                new Date('2025-05-19'), // Youth and Sports Day
                new Date('2025-08-30'), // Victory Day
                new Date('2025-10-29'), // Republic Day
                // Religious holidays would be added based on lunar calendar
            ],
        };
        /**
         * Update business hours configuration
         */
        setConfig(config) {
            this.config = { ...this.config, ...config };
            this.logger.log('Business hours configuration updated');
        }
        /**
         * Get current configuration
         */
        getConfig() {
            return this.config;
        }
        /**
         * Check if a given date/time is within business hours
         */
        isBusinessHours(date) {
            // Check if it's a work day
            if (!this.config.workDays.includes(date.getDay())) {
                return false;
            }
            // Check if it's a holiday
            if (this.isHoliday(date)) {
                return false;
            }
            // Check if time is within work hours
            const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            return timeStr >= this.config.workHours.start && timeStr < this.config.workHours.end;
        }
        /**
         * Check if a date is a holiday
         */
        isHoliday(date) {
            return this.config.holidays.some(holiday => holiday.getFullYear() === date.getFullYear() &&
                holiday.getMonth() === date.getMonth() &&
                holiday.getDate() === date.getDate());
        }
        /**
         * Get the next business hour timestamp
         */
        getNextBusinessHour(from) {
            const next = new Date(from);
            // If already in business hours, return as is
            if (this.isBusinessHours(next)) {
                return next;
            }
            // Move to next business hour
            while (!this.isBusinessHours(next)) {
                // If after work hours, move to next day's start
                const timeStr = `${next.getHours().toString().padStart(2, '0')}:${next.getMinutes().toString().padStart(2, '0')}`;
                if (timeStr >= this.config.workHours.end) {
                    // Move to next day
                    next.setDate(next.getDate() + 1);
                    const [startHour, startMinute] = this.config.workHours.start.split(':').map(Number);
                    next.setHours(startHour, startMinute, 0, 0);
                }
                else if (timeStr < this.config.workHours.start) {
                    // Move to start of work day
                    const [startHour, startMinute] = this.config.workHours.start.split(':').map(Number);
                    next.setHours(startHour, startMinute, 0, 0);
                }
                else {
                    // Weekend or holiday, move to next day
                    next.setDate(next.getDate() + 1);
                    const [startHour, startMinute] = this.config.workHours.start.split(':').map(Number);
                    next.setHours(startHour, startMinute, 0, 0);
                }
            }
            return next;
        }
        /**
         * Calculate business hours duration between two timestamps
         */
        calculateBusinessHoursDuration(start, end) {
            let totalMinutes = 0;
            const current = new Date(start);
            while (current < end) {
                if (this.isBusinessHours(current)) {
                    totalMinutes++;
                }
                // Move to next minute
                current.setMinutes(current.getMinutes() + 1);
            }
            return {
                hours: Math.floor(totalMinutes / 60),
                minutes: totalMinutes % 60,
                totalMinutes,
            };
        }
        /**
         * Add business hours to a timestamp
         * @param from - Starting timestamp
         * @param hours - Number of business hours to add
         */
        addBusinessHours(from, hours) {
            const result = new Date(from);
            let remainingMinutes = hours * 60;
            // Move to next business hour if starting outside business hours
            if (!this.isBusinessHours(result)) {
                const nextBH = this.getNextBusinessHour(result);
                result.setTime(nextBH.getTime());
            }
            while (remainingMinutes > 0) {
                if (this.isBusinessHours(result)) {
                    result.setMinutes(result.getMinutes() + 1);
                    remainingMinutes--;
                }
                else {
                    // Move to next business hour
                    const nextBH = this.getNextBusinessHour(result);
                    result.setTime(nextBH.getTime());
                }
            }
            return result;
        }
        /**
         * Calculate SLA due date considering business hours
         * @param startDate - Ticket creation time
         * @param slaHours - SLA in hours
         * @param useBusinessHours - Whether to use business hours (default: true)
         */
        calculateSLADueDate(startDate, slaHours, useBusinessHours = true) {
            if (!useBusinessHours) {
                // Simple calculation without business hours
                const dueDate = new Date(startDate);
                dueDate.setHours(dueDate.getHours() + slaHours);
                return dueDate;
            }
            // Calculate with business hours
            return this.addBusinessHours(startDate, slaHours);
        }
        /**
         * Get remaining business hours until deadline
         */
        getRemainingBusinessHours(deadline, now = new Date()) {
            if (now >= deadline) {
                return { hours: 0, minutes: 0, totalMinutes: 0 };
            }
            return this.calculateBusinessHoursDuration(now, deadline);
        }
        /**
         * Check if SLA is breached considering business hours
         */
        isSLABreached(dueDate, now = new Date()) {
            return now > dueDate;
        }
        /**
         * Get business hours percentage remaining
         */
        getSLAProgressPercentage(startDate, dueDate, now = new Date()) {
            const total = this.calculateBusinessHoursDuration(startDate, dueDate);
            const elapsed = this.calculateBusinessHoursDuration(startDate, now);
            if (total.totalMinutes === 0)
                return 100;
            const percentage = (elapsed.totalMinutes / total.totalMinutes) * 100;
            return Math.min(100, Math.max(0, percentage));
        }
        /**
         * Add a holiday to the configuration
         */
        addHoliday(date) {
            if (!this.isHoliday(date)) {
                this.config.holidays.push(date);
                this.logger.log(`Added holiday: ${date.toDateString()}`);
            }
        }
        /**
         * Remove a holiday from the configuration
         */
        removeHoliday(date) {
            this.config.holidays = this.config.holidays.filter(holiday => !(holiday.getFullYear() === date.getFullYear() &&
                holiday.getMonth() === date.getMonth() &&
                holiday.getDate() === date.getDate()));
            this.logger.log(`Removed holiday: ${date.toDateString()}`);
        }
        /**
         * Get all holidays for a given year
         */
        getHolidaysForYear(year) {
            return this.config.holidays.filter(holiday => holiday.getFullYear() === year);
        }
        /**
         * Get business hours statistics for a time range
         */
        getBusinessHoursStats(startDate, endDate) {
            let totalDays = 0;
            let businessDays = 0;
            let weekendDays = 0;
            let holidays = 0;
            const current = new Date(startDate);
            const [startHour, startMinute] = this.config.workHours.start.split(':').map(Number);
            const [endHour, endMinute] = this.config.workHours.end.split(':').map(Number);
            const hoursPerDay = endHour - startHour + (endMinute - startMinute) / 60;
            while (current <= endDate) {
                totalDays++;
                if (this.isHoliday(current)) {
                    holidays++;
                }
                else if (this.config.workDays.includes(current.getDay())) {
                    businessDays++;
                }
                else {
                    weekendDays++;
                }
                current.setDate(current.getDate() + 1);
            }
            return {
                totalDays,
                businessDays,
                weekendDays,
                holidays,
                totalBusinessHours: businessDays * hoursPerDay,
            };
        }
    };
    return BusinessHoursService = _classThis;
})();
exports.BusinessHoursService = BusinessHoursService;
//# sourceMappingURL=business-hours.service.js.map