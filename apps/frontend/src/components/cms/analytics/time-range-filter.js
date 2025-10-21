"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRangeFilter = TimeRangeFilter;
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const calendar_1 = require("@/components/ui/calendar");
const popover_1 = require("@/components/ui/popover");
const lucide_react_1 = require("lucide-react");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const utils_1 = require("@/lib/utils");
const TIME_RANGE_OPTIONS = [
    { value: 'today', label: 'Bugün' },
    { value: 'yesterday', label: 'Dün' },
    { value: 'last7days', label: 'Son 7 Gün' },
    { value: 'last30days', label: 'Son 30 Gün' },
    { value: 'last90days', label: 'Son 90 Gün' },
    { value: 'custom', label: 'Özel Tarih Aralığı' },
];
function TimeRangeFilter({ timeRange, onTimeRangeChange, customStartDate, customEndDate, onCustomDateChange, }) {
    const isCustomRange = timeRange === 'custom';
    return (<div className="flex flex-col sm:flex-row gap-3">
      <select_1.Select value={timeRange} onValueChange={(value) => onTimeRangeChange(value)}>
        <select_1.SelectTrigger className="w-full sm:w-[200px]">
          <select_1.SelectValue placeholder="Zaman aralığı seç"/>
        </select_1.SelectTrigger>
        <select_1.SelectContent>
          {TIME_RANGE_OPTIONS.map((option) => (<select_1.SelectItem key={option.value} value={option.value}>
              {option.label}
            </select_1.SelectItem>))}
        </select_1.SelectContent>
      </select_1.Select>

      {isCustomRange && onCustomDateChange && (<div className="flex gap-2">
          <popover_1.Popover>
            <popover_1.PopoverTrigger asChild>
              <button_1.Button variant="outline" className={(0, utils_1.cn)('w-[180px] justify-start text-left font-normal', !customStartDate && 'text-muted-foreground')}>
                <lucide_react_1.CalendarIcon className="mr-2 h-4 w-4"/>
                {customStartDate ? ((0, date_fns_1.format)(customStartDate, 'PPP', { locale: locale_1.tr })) : (<span>Başlangıç tarihi</span>)}
              </button_1.Button>
            </popover_1.PopoverTrigger>
            <popover_1.PopoverContent className="w-auto p-0" align="start">
              <calendar_1.Calendar mode="single" selected={customStartDate} onSelect={(date) => onCustomDateChange(date, customEndDate)} initialFocus disabled={(date) => date > new Date() || (customEndDate ? date > customEndDate : false)}/>
            </popover_1.PopoverContent>
          </popover_1.Popover>

          <popover_1.Popover>
            <popover_1.PopoverTrigger asChild>
              <button_1.Button variant="outline" className={(0, utils_1.cn)('w-[180px] justify-start text-left font-normal', !customEndDate && 'text-muted-foreground')}>
                <lucide_react_1.CalendarIcon className="mr-2 h-4 w-4"/>
                {customEndDate ? ((0, date_fns_1.format)(customEndDate, 'PPP', { locale: locale_1.tr })) : (<span>Bitiş tarihi</span>)}
              </button_1.Button>
            </popover_1.PopoverTrigger>
            <popover_1.PopoverContent className="w-auto p-0" align="start">
              <calendar_1.Calendar mode="single" selected={customEndDate} onSelect={(date) => onCustomDateChange(customStartDate, date)} initialFocus disabled={(date) => date > new Date() || (customStartDate ? date < customStartDate : false)}/>
            </popover_1.PopoverContent>
          </popover_1.Popover>
        </div>)}
    </div>);
}
//# sourceMappingURL=time-range-filter.js.map