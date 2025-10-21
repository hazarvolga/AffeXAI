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
exports.default = AbTestSetup;
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const z = __importStar(require("zod"));
const navigation_1 = require("next/navigation");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const label_1 = require("@/components/ui/label");
const slider_1 = require("@/components/ui/slider");
const card_1 = require("@/components/ui/card");
const select_1 = require("@/components/ui/select");
const switch_1 = require("@/components/ui/switch");
const badge_1 = require("@/components/ui/badge");
const use_toast_1 = require("@/components/ui/use-toast");
const lucide_react_1 = require("lucide-react");
const alert_1 = require("@/components/ui/alert");
// Types
var TestType;
(function (TestType) {
    TestType["SUBJECT"] = "subject";
    TestType["CONTENT"] = "content";
    TestType["SEND_TIME"] = "send_time";
    TestType["FROM_NAME"] = "from_name";
    TestType["COMBINED"] = "combined";
})(TestType || (TestType = {}));
var WinnerCriteria;
(function (WinnerCriteria) {
    WinnerCriteria["OPEN_RATE"] = "open_rate";
    WinnerCriteria["CLICK_RATE"] = "click_rate";
    WinnerCriteria["CONVERSION_RATE"] = "conversion_rate";
    WinnerCriteria["REVENUE"] = "revenue";
})(WinnerCriteria || (WinnerCriteria = {}));
// Validation Schema
const variantSchema = z.object({
    label: z.string().min(1, 'Label is required').max(1, 'Label must be A-E'),
    subject: z.string().min(1, 'Subject is required').max(200, 'Max 200 characters'),
    content: z.string().min(10, 'Content too short (min 10 chars)').max(10000, 'Content too long'),
    fromName: z.string().max(100).optional(),
    sendTimeOffset: z.number().min(0).max(168).optional(),
    splitPercentage: z.number().min(0).max(100),
});
const abTestSchema = z.object({
    campaignId: z.string().uuid('Invalid campaign ID'),
    testType: z.nativeEnum(TestType),
    winnerCriteria: z.nativeEnum(WinnerCriteria),
    autoSelectWinner: z.boolean(),
    testDuration: z.number().min(1).max(168),
    confidenceLevel: z.number().min(90).max(99.9),
    minSampleSize: z.number().min(50),
    variants: z.array(variantSchema).min(2, 'Minimum 2 variants').max(5, 'Maximum 5 variants'),
}).refine((data) => {
    const totalSplit = data.variants.reduce((sum, v) => sum + v.splitPercentage, 0);
    return Math.abs(totalSplit - 100) < 0.01; // Allow tiny floating point errors
}, {
    message: 'Split percentages must sum to 100%',
    path: ['variants'],
});
const VARIANT_LABELS = ['A', 'B', 'C', 'D', 'E'];
const VARIANT_COLORS = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
];
function AbTestSetup({ campaignId, onSuccess }) {
    const router = (0, navigation_1.useRouter)();
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [totalSplit, setTotalSplit] = (0, react_1.useState)(100);
    const { register, control, handleSubmit, watch, setValue, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(abTestSchema),
        defaultValues: {
            campaignId,
            testType: TestType.SUBJECT,
            winnerCriteria: WinnerCriteria.OPEN_RATE,
            autoSelectWinner: true,
            testDuration: 24,
            confidenceLevel: 95,
            minSampleSize: 100,
            variants: [
                {
                    label: 'A',
                    subject: '',
                    content: '',
                    fromName: '',
                    sendTimeOffset: 0,
                    splitPercentage: 50,
                },
                {
                    label: 'B',
                    subject: '',
                    content: '',
                    fromName: '',
                    sendTimeOffset: 0,
                    splitPercentage: 50,
                },
            ],
        },
    });
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({
        control,
        name: 'variants',
    });
    const variants = watch('variants');
    const testType = watch('testType');
    // Calculate total split percentage
    (0, react_1.useEffect)(() => {
        const total = variants.reduce((sum, v) => sum + (v.splitPercentage || 0), 0);
        setTotalSplit(total);
    }, [variants]);
    // Add variant
    const addVariant = () => {
        if (fields.length >= 5) {
            (0, use_toast_1.toast)({
                variant: 'destructive',
                title: 'Maximum variants reached',
                description: 'You can have up to 5 variants (A-E)',
            });
            return;
        }
        const newLabel = VARIANT_LABELS[fields.length];
        const equalSplit = Math.floor(100 / (fields.length + 1));
        const remainder = 100 - equalSplit * (fields.length + 1);
        // Redistribute percentages equally
        variants.forEach((_, index) => {
            setValue(`variants.${index}.splitPercentage`, equalSplit);
        });
        append({
            label: newLabel,
            subject: '',
            content: '',
            fromName: '',
            sendTimeOffset: 0,
            splitPercentage: equalSplit + remainder, // Give remainder to new variant
        });
    };
    // Remove variant
    const removeVariant = (index) => {
        if (fields.length <= 2) {
            (0, use_toast_1.toast)({
                variant: 'destructive',
                title: 'Minimum variants required',
                description: 'You need at least 2 variants for A/B testing',
            });
            return;
        }
        const removedPercentage = variants[index].splitPercentage;
        remove(index);
        // Redistribute removed percentage to remaining variants
        const newVariantCount = fields.length - 1;
        if (newVariantCount > 0) {
            const addPerVariant = Math.floor(removedPercentage / newVariantCount);
            const remainder = removedPercentage - addPerVariant * newVariantCount;
            variants.forEach((_, i) => {
                if (i !== index && i < newVariantCount) {
                    const current = variants[i].splitPercentage;
                    const extra = i === 0 ? remainder : 0; // Give remainder to first variant
                    setValue(`variants.${i}.splitPercentage`, current + addPerVariant + extra);
                }
            });
        }
    };
    // Handle split percentage change
    const handleSplitChange = (index, value) => {
        const oldValue = variants[index].splitPercentage;
        const diff = value - oldValue;
        setValue(`variants.${index}.splitPercentage`, value);
        // Distribute difference among other variants
        const otherIndices = variants
            .map((_, i) => i)
            .filter((i) => i !== index);
        if (otherIndices.length > 0) {
            const adjustPerVariant = -diff / otherIndices.length;
            otherIndices.forEach((i) => {
                const newValue = Math.max(0, Math.min(100, variants[i].splitPercentage + adjustPerVariant));
                setValue(`variants.${i}.splitPercentage`, parseFloat(newValue.toFixed(1)));
            });
        }
    };
    // Submit form
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/email-marketing/ab-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create A/B test');
            }
            const result = await response.json();
            (0, use_toast_1.toast)({
                title: 'A/B Test Created',
                description: `Successfully created test with ${data.variants.length} variants`,
            });
            if (onSuccess) {
                onSuccess(result.id);
            }
            else {
                router.push(`/dashboard/email-marketing/ab-test/${result.id}/results`);
            }
        }
        catch (error) {
            console.error('Error creating A/B test:', error);
            (0, use_toast_1.toast)({
                variant: 'destructive',
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create A/B test',
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Test Configuration */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Test Configuration</card_1.CardTitle>
          <card_1.CardDescription>Configure your A/B test parameters</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          {/* Test Type */}
          <div className="space-y-2">
            <label_1.Label htmlFor="testType">Test Type</label_1.Label>
            <select_1.Select value={testType} onValueChange={(value) => setValue('testType', value)}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value={TestType.SUBJECT}>Subject Line</select_1.SelectItem>
                <select_1.SelectItem value={TestType.CONTENT}>Email Content</select_1.SelectItem>
                <select_1.SelectItem value={TestType.SEND_TIME}>Send Time</select_1.SelectItem>
                <select_1.SelectItem value={TestType.FROM_NAME}>From Name</select_1.SelectItem>
                <select_1.SelectItem value={TestType.COMBINED}>Combined (Multiple Elements)</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
            {errors.testType && (<p className="text-sm text-destructive">{errors.testType.message}</p>)}
          </div>

          {/* Winner Criteria */}
          <div className="space-y-2">
            <label_1.Label htmlFor="winnerCriteria">Winner Criteria</label_1.Label>
            <select_1.Select value={watch('winnerCriteria')} onValueChange={(value) => setValue('winnerCriteria', value)}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value={WinnerCriteria.OPEN_RATE}>Open Rate</select_1.SelectItem>
                <select_1.SelectItem value={WinnerCriteria.CLICK_RATE}>Click Rate</select_1.SelectItem>
                <select_1.SelectItem value={WinnerCriteria.CONVERSION_RATE}>Conversion Rate</select_1.SelectItem>
                <select_1.SelectItem value={WinnerCriteria.REVENUE}>Revenue</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
            {errors.winnerCriteria && (<p className="text-sm text-destructive">{errors.winnerCriteria.message}</p>)}
          </div>

          {/* Grid: Duration, Confidence, Sample Size */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="testDuration">Test Duration (hours)</label_1.Label>
              <input_1.Input id="testDuration" type="number" {...register('testDuration', { valueAsNumber: true })} min={1} max={168}/>
              {errors.testDuration && (<p className="text-sm text-destructive">{errors.testDuration.message}</p>)}
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="confidenceLevel">Confidence Level (%)</label_1.Label>
              <input_1.Input id="confidenceLevel" type="number" {...register('confidenceLevel', { valueAsNumber: true })} min={90} max={99.9} step={0.1}/>
              {errors.confidenceLevel && (<p className="text-sm text-destructive">{errors.confidenceLevel.message}</p>)}
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="minSampleSize">Min Sample Size</label_1.Label>
              <input_1.Input id="minSampleSize" type="number" {...register('minSampleSize', { valueAsNumber: true })} min={50}/>
              {errors.minSampleSize && (<p className="text-sm text-destructive">{errors.minSampleSize.message}</p>)}
            </div>
          </div>

          {/* Auto-Select Winner */}
          <div className="flex items-center space-x-2">
            <switch_1.Switch id="autoSelectWinner" checked={watch('autoSelectWinner')} onCheckedChange={(checked) => setValue('autoSelectWinner', checked)}/>
            <label_1.Label htmlFor="autoSelectWinner" className="cursor-pointer">
              Automatically select winner when test completes
            </label_1.Label>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Variants */}
      <card_1.Card>
        <card_1.CardHeader className="flex flex-row items-center justify-between">
          <div>
            <card_1.CardTitle>Variants</card_1.CardTitle>
            <card_1.CardDescription>
              Create {fields.length} variants (min 2, max 5)
            </card_1.CardDescription>
          </div>
          <button_1.Button type="button" variant="outline" size="sm" onClick={addVariant} disabled={fields.length >= 5}>
            <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
            Add Variant
          </button_1.Button>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-6">
          {/* Split Percentage Visualization */}
          <div className="space-y-2">
            <label_1.Label>Traffic Distribution</label_1.Label>
            <div className="flex h-8 rounded-md overflow-hidden border">
              {fields.map((field, index) => (<div key={field.id} className={`${VARIANT_COLORS[index]} flex items-center justify-center text-white text-sm font-medium transition-all`} style={{ width: `${variants[index].splitPercentage}%` }}>
                  {variants[index].splitPercentage > 10 &&
                `${variants[index].label}: ${variants[index].splitPercentage.toFixed(1)}%`}
                </div>))}
            </div>
            {Math.abs(totalSplit - 100) > 0.01 && (<alert_1.Alert variant="destructive">
                <lucide_react_1.AlertCircle className="h-4 w-4"/>
                <alert_1.AlertDescription>
                  Total split is {totalSplit.toFixed(1)}%. Must equal 100%.
                </alert_1.AlertDescription>
              </alert_1.Alert>)}
          </div>

          {/* Variant Forms */}
          {fields.map((field, index) => (<card_1.Card key={field.id} className="border-l-4" style={{ borderLeftColor: VARIANT_COLORS[index].replace('bg-', '') }}>
              <card_1.CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <badge_1.Badge className={VARIANT_COLORS[index]}>Variant {variants[index].label}</badge_1.Badge>
                  <span className="text-sm text-muted-foreground">
                    {variants[index].splitPercentage.toFixed(1)}% of traffic
                  </span>
                </div>
                {fields.length > 2 && (<button_1.Button type="button" variant="ghost" size="sm" onClick={() => removeVariant(index)}>
                    <lucide_react_1.Trash2 className="h-4 w-4 text-destructive"/>
                  </button_1.Button>)}
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                {/* Subject */}
                <div className="space-y-2">
                  <label_1.Label htmlFor={`variants.${index}.subject`}>Subject Line</label_1.Label>
                  <input_1.Input id={`variants.${index}.subject`} {...register(`variants.${index}.subject`)} placeholder="Enter subject line"/>
                  {errors.variants?.[index]?.subject && (<p className="text-sm text-destructive">
                      {errors.variants[index]?.subject?.message}
                    </p>)}
                </div>

                {/* Content (if applicable) */}
                {(testType === TestType.CONTENT || testType === TestType.COMBINED) && (<div className="space-y-2">
                    <label_1.Label htmlFor={`variants.${index}.content`}>Email Content</label_1.Label>
                    <textarea_1.Textarea id={`variants.${index}.content`} {...register(`variants.${index}.content`)} placeholder="Enter email content" rows={6}/>
                    {errors.variants?.[index]?.content && (<p className="text-sm text-destructive">
                        {errors.variants[index]?.content?.message}
                      </p>)}
                  </div>)}

                {/* From Name (if applicable) */}
                {(testType === TestType.FROM_NAME || testType === TestType.COMBINED) && (<div className="space-y-2">
                    <label_1.Label htmlFor={`variants.${index}.fromName`}>From Name (Optional)</label_1.Label>
                    <input_1.Input id={`variants.${index}.fromName`} {...register(`variants.${index}.fromName`)} placeholder="e.g., John Doe"/>
                  </div>)}

                {/* Send Time Offset (if applicable) */}
                {(testType === TestType.SEND_TIME || testType === TestType.COMBINED) && (<div className="space-y-2">
                    <label_1.Label htmlFor={`variants.${index}.sendTimeOffset`}>
                      Send Time Offset (hours from base)
                    </label_1.Label>
                    <input_1.Input id={`variants.${index}.sendTimeOffset`} type="number" {...register(`variants.${index}.sendTimeOffset`, { valueAsNumber: true })} min={0} max={168}/>
                  </div>)}

                {/* Split Percentage Slider */}
                <div className="space-y-2">
                  <label_1.Label>Traffic Split: {variants[index].splitPercentage.toFixed(1)}%</label_1.Label>
                  <slider_1.Slider value={[variants[index].splitPercentage]} onValueChange={(value) => handleSplitChange(index, value[0])} min={0} max={100} step={0.1} className="py-4"/>
                </div>
              </card_1.CardContent>
            </card_1.Card>))}
        </card_1.CardContent>
      </card_1.Card>

      {/* Info Alert */}
      <alert_1.Alert>
        <lucide_react_1.Info className="h-4 w-4"/>
        <alert_1.AlertDescription>
          The test will run for {watch('testDuration')} hours and automatically select a winner
          if confidence level reaches {watch('confidenceLevel')}% with at least{' '}
          {watch('minSampleSize')} samples per variant.
        </alert_1.AlertDescription>
      </alert_1.Alert>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button_1.Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </button_1.Button>
        <button_1.Button type="submit" disabled={isSubmitting || Math.abs(totalSplit - 100) > 0.01}>
          {isSubmitting && <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
          Create A/B Test
        </button_1.Button>
      </div>
    </form>);
}
//# sourceMappingURL=AbTestSetup.js.map