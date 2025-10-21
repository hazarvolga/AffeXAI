"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerWithRange = DatePickerWithRange;
const React = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const calendar_1 = require("@/components/ui/calendar");
const popover_1 = require("@/components/ui/popover");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
function DatePickerWithRange({ className, date, onDateChange, }) {
    return (<div className={(0, utils_1.cn)('grid gap-2', className)}>
      <popover_1.Popover>
        <popover_1.PopoverTrigger asChild>
          <button_1.Button id="date" variant={'outline'} className={(0, utils_1.cn)('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <lucide_react_1.CalendarIcon className="mr-2 h-4 w-4"/>
            {date?.from ? (date.to ? (<>
                  {(0, date_fns_1.format)(date.from, 'dd MMM yyyy', { locale: locale_1.tr })} -{' '}
                  {(0, date_fns_1.format)(date.to, 'dd MMM yyyy', { locale: locale_1.tr })}
                </>) : ((0, date_fns_1.format)(date.from, 'dd MMM yyyy', { locale: locale_1.tr }))) : (<span>Tarih aralığı seçin</span>)}
          </button_1.Button>
        </popover_1.PopoverTrigger>
        <popover_1.PopoverContent className="w-auto p-0" align="start">
          <calendar_1.Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={onDateChange} numberOfMonths={2} locale={locale_1.tr}/>
        </popover_1.PopoverContent>
      </popover_1.Popover>
    </div>);
}
//# sourceMappingURL=date-range-picker.js.map