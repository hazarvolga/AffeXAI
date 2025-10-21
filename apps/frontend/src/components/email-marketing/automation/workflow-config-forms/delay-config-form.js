"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayConfigForm = DelayConfigForm;
const react_1 = require("react");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const separator_1 = require("@/components/ui/separator");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
function DelayConfigForm({ data, onUpdate, className, }) {
    const [formData, setFormData] = (0, react_1.useState)(data);
    // Update parent whenever form changes
    (0, react_1.useEffect)(() => {
        const isConfigured = !!(formData.duration && formData.unit && formData.duration > 0);
        onUpdate({ ...formData, configured: isConfigured });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]); // Only depend on formData, not onUpdate
    const handleDurationChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setFormData((prev) => ({ ...prev, duration: value > 0 ? value : undefined }));
    };
    const handleUnitChange = (unit) => {
        setFormData((prev) => ({ ...prev, unit }));
    };
    const getDurationDisplay = () => {
        if (!formData.duration || !formData.unit)
            return 'Not configured';
        const duration = formData.duration;
        const unit = formData.unit;
        // Convert to human-readable format
        if (unit === 'minutes') {
            if (duration >= 60) {
                const hours = Math.floor(duration / 60);
                const mins = duration % 60;
                return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
            }
            return `${duration} minute${duration > 1 ? 's' : ''}`;
        }
        if (unit === 'hours') {
            if (duration >= 24) {
                const days = Math.floor(duration / 24);
                const hrs = duration % 24;
                return hrs > 0 ? `${days}d ${hrs}h` : `${days} day${days > 1 ? 's' : ''}`;
            }
            return `${duration} hour${duration > 1 ? 's' : ''}`;
        }
        return `${duration} day${duration > 1 ? 's' : ''}`;
    };
    const getMinMaxForUnit = () => {
        switch (formData.unit) {
            case 'minutes':
                return { min: 1, max: 1440, step: 1 }; // Max 24 hours in minutes
            case 'hours':
                return { min: 1, max: 720, step: 1 }; // Max 30 days in hours
            case 'days':
                return { min: 1, max: 365, step: 1 }; // Max 1 year
            default:
                return { min: 1, max: 100, step: 1 };
        }
    };
    const { min, max, step } = getMinMaxForUnit();
    return (<div className={(0, utils_1.cn)('space-y-4', className)}>
      {/* Duration Input */}
      <div className="space-y-2">
        <label_1.Label htmlFor="duration" className="flex items-center gap-2">
          <lucide_react_1.Clock className="h-4 w-4"/>
          Wait Duration
          <span className="text-destructive">*</span>
        </label_1.Label>
        <div className="flex gap-2">
          <input_1.Input id="duration" type="number" placeholder="Enter number" value={formData.duration || ''} onChange={handleDurationChange} min={min} max={max} step={step} className="flex-1"/>
          <select_1.Select value={formData.unit} onValueChange={handleUnitChange}>
            <select_1.SelectTrigger className="w-[130px]">
              <select_1.SelectValue placeholder="Select unit"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="minutes">Minutes</select_1.SelectItem>
              <select_1.SelectItem value="hours">Hours</select_1.SelectItem>
              <select_1.SelectItem value="days">Days</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
        {formData.unit && (<p className="text-xs text-muted-foreground">
            Valid range: {min} - {max} {formData.unit}
          </p>)}
      </div>

      <separator_1.Separator />

      {/* Duration Display */}
      <div className="rounded-lg bg-muted p-4">
        <label_1.Label className="text-sm font-medium mb-2 block">Wait Time</label_1.Label>
        <p className="text-2xl font-bold text-primary">
          {getDurationDisplay()}
        </p>
      </div>

      <separator_1.Separator />

      {/* Info Section */}
      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 border border-blue-200 dark:border-blue-900 flex gap-2">
        <lucide_react_1.Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"/>
        <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
          <p className="font-medium">About Wait Step:</p>
          <ul className="list-disc list-inside space-y-0.5 text-blue-600 dark:text-blue-500">
            <li>Workflow execution pauses for the specified duration</li>
            <li>Subscribers continue to next step after delay</li>
            <li>Useful for drip campaigns and follow-ups</li>
          </ul>
        </div>
      </div>

      {/* Configuration Status */}
      {formData.duration && formData.unit ? (<div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3 border border-green-200 dark:border-green-900">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">
            ✓ Configuration complete
          </p>
        </div>) : (<div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 border border-amber-200 dark:border-amber-900">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            ⚠ Please enter a duration and select a time unit
          </p>
        </div>)}
    </div>);
}
//# sourceMappingURL=delay-config-form.js.map