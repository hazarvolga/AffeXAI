/**
 * Business Hours Service
 * Handles business hour calculations for SLA tracking
 */
export interface BusinessHoursConfig {
    timezone: string;
    workDays: number[];
    workHours: {
        start: string;
        end: string;
    };
    holidays: Date[];
}
export interface BusinessHoursDuration {
    hours: number;
    minutes: number;
    totalMinutes: number;
}
export declare class BusinessHoursService {
    private readonly logger;
    private config;
    /**
     * Update business hours configuration
     */
    setConfig(config: Partial<BusinessHoursConfig>): void;
    /**
     * Get current configuration
     */
    getConfig(): BusinessHoursConfig;
    /**
     * Check if a given date/time is within business hours
     */
    isBusinessHours(date: Date): boolean;
    /**
     * Check if a date is a holiday
     */
    isHoliday(date: Date): boolean;
    /**
     * Get the next business hour timestamp
     */
    getNextBusinessHour(from: Date): Date;
    /**
     * Calculate business hours duration between two timestamps
     */
    calculateBusinessHoursDuration(start: Date, end: Date): BusinessHoursDuration;
    /**
     * Add business hours to a timestamp
     * @param from - Starting timestamp
     * @param hours - Number of business hours to add
     */
    addBusinessHours(from: Date, hours: number): Date;
    /**
     * Calculate SLA due date considering business hours
     * @param startDate - Ticket creation time
     * @param slaHours - SLA in hours
     * @param useBusinessHours - Whether to use business hours (default: true)
     */
    calculateSLADueDate(startDate: Date, slaHours: number, useBusinessHours?: boolean): Date;
    /**
     * Get remaining business hours until deadline
     */
    getRemainingBusinessHours(deadline: Date, now?: Date): BusinessHoursDuration;
    /**
     * Check if SLA is breached considering business hours
     */
    isSLABreached(dueDate: Date, now?: Date): boolean;
    /**
     * Get business hours percentage remaining
     */
    getSLAProgressPercentage(startDate: Date, dueDate: Date, now?: Date): number;
    /**
     * Add a holiday to the configuration
     */
    addHoliday(date: Date): void;
    /**
     * Remove a holiday from the configuration
     */
    removeHoliday(date: Date): void;
    /**
     * Get all holidays for a given year
     */
    getHolidaysForYear(year: number): Date[];
    /**
     * Get business hours statistics for a time range
     */
    getBusinessHoursStats(startDate: Date, endDate: Date): {
        totalDays: number;
        businessDays: number;
        weekendDays: number;
        holidays: number;
        totalBusinessHours: number;
    };
}
//# sourceMappingURL=business-hours.service.d.ts.map