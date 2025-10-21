"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionConfigForm = ConditionConfigForm;
const react_1 = require("react");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const separator_1 = require("@/components/ui/separator");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
// Available subscriber fields
const AVAILABLE_FIELDS = [
    { value: 'email', label: 'Email Address', type: 'string' },
    { value: 'firstName', label: 'First Name', type: 'string' },
    { value: 'lastName', label: 'Last Name', type: 'string' },
    { value: 'status', label: 'Subscriber Status', type: 'select' },
    { value: 'createdAt', label: 'Subscription Date', type: 'date' },
    { value: 'lastOpenedAt', label: 'Last Opened', type: 'date' },
    { value: 'lastClickedAt', label: 'Last Clicked', type: 'date' },
    { value: 'totalOpens', label: 'Total Opens', type: 'number' },
    { value: 'totalClicks', label: 'Total Clicks', type: 'number' },
    { value: 'tags', label: 'Tags', type: 'array' },
];
// Operators based on field type
const OPERATORS_BY_TYPE = {
    string: [
        { value: 'equals', label: 'Equals' },
        { value: 'notEquals', label: 'Not Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'notContains', label: 'Does Not Contain' },
        { value: 'startsWith', label: 'Starts With' },
        { value: 'endsWith', label: 'Ends With' },
    ],
    number: [
        { value: 'equals', label: 'Equals' },
        { value: 'notEquals', label: 'Not Equals' },
        { value: 'greaterThan', label: 'Greater Than' },
        { value: 'lessThan', label: 'Less Than' },
        { value: 'greaterOrEqual', label: 'Greater or Equal' },
        { value: 'lessOrEqual', label: 'Less or Equal' },
    ],
    date: [
        { value: 'equals', label: 'On' },
        { value: 'before', label: 'Before' },
        { value: 'after', label: 'After' },
        { value: 'inLast', label: 'In Last (days)' },
        { value: 'notInLast', label: 'Not In Last (days)' },
    ],
    select: [
        { value: 'equals', label: 'Is' },
        { value: 'notEquals', label: 'Is Not' },
    ],
    array: [
        { value: 'contains', label: 'Has Tag' },
        { value: 'notContains', label: 'Does Not Have Tag' },
    ],
};
// Status options for select fields
const STATUS_OPTIONS = [
    { value: 'subscribed', label: 'Subscribed' },
    { value: 'unsubscribed', label: 'Unsubscribed' },
    { value: 'bounced', label: 'Bounced' },
    { value: 'complained', label: 'Complained' },
];
function ConditionConfigForm({ data, onUpdate, className, }) {
    const [formData, setFormData] = (0, react_1.useState)(data);
    // Update parent whenever form changes
    (0, react_1.useEffect)(() => {
        const isConfigured = !!(formData.field && formData.operator && formData.value);
        // Generate human-readable condition
        let condition = '';
        if (isConfigured) {
            const field = AVAILABLE_FIELDS.find((f) => f.value === formData.field);
            const fieldType = field?.type || 'string';
            const operator = OPERATORS_BY_TYPE[fieldType]?.find((o) => o.value === formData.operator);
            condition = `${field?.label} ${operator?.label?.toLowerCase()} "${formData.value}"`;
        }
        onUpdate({ ...formData, condition, configured: isConfigured });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]); // Only depend on formData, not onUpdate
    const selectedField = AVAILABLE_FIELDS.find((f) => f.value === formData.field);
    const fieldType = selectedField?.type || 'string';
    const availableOperators = OPERATORS_BY_TYPE[fieldType] || [];
    const handleFieldChange = (field) => {
        setFormData((prev) => ({
            ...prev,
            field,
            operator: undefined, // Reset operator when field changes
            value: undefined, // Reset value when field changes
        }));
    };
    const handleOperatorChange = (operator) => {
        setFormData((prev) => ({ ...prev, operator }));
    };
    const handleValueChange = (e) => {
        setFormData((prev) => ({ ...prev, value: e.target.value }));
    };
    const handleSelectValueChange = (value) => {
        setFormData((prev) => ({ ...prev, value }));
    };
    const renderValueInput = () => {
        if (!formData.field || !formData.operator)
            return null;
        if (fieldType === 'select' && formData.field === 'status') {
            return (<select_1.Select value={formData.value} onValueChange={handleSelectValueChange}>
          <select_1.SelectTrigger>
            <select_1.SelectValue placeholder="Select status"/>
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            {STATUS_OPTIONS.map((option) => (<select_1.SelectItem key={option.value} value={option.value}>
                {option.label}
              </select_1.SelectItem>))}
          </select_1.SelectContent>
        </select_1.Select>);
        }
        if (fieldType === 'number') {
            return (<input_1.Input type="number" placeholder="Enter number..." value={formData.value || ''} onChange={handleValueChange}/>);
        }
        if (fieldType === 'date') {
            if (formData.operator === 'inLast' || formData.operator === 'notInLast') {
                return (<div className="flex gap-2 items-center">
            <input_1.Input type="number" placeholder="Number of days" value={formData.value || ''} onChange={handleValueChange} className="flex-1"/>
            <span className="text-sm text-muted-foreground">days</span>
          </div>);
            }
            return (<input_1.Input type="date" value={formData.value || ''} onChange={handleValueChange}/>);
        }
        return (<input_1.Input type="text" placeholder="Enter value..." value={formData.value || ''} onChange={handleValueChange}/>);
    };
    return (<div className={(0, utils_1.cn)('space-y-4', className)}>
      {/* Field Selection */}
      <div className="space-y-2">
        <label_1.Label htmlFor="field" className="flex items-center gap-2">
          <lucide_react_1.GitBranch className="h-4 w-4"/>
          Subscriber Field
          <span className="text-destructive">*</span>
        </label_1.Label>
        <select_1.Select value={formData.field} onValueChange={handleFieldChange}>
          <select_1.SelectTrigger id="field">
            <select_1.SelectValue placeholder="Select a field"/>
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            {AVAILABLE_FIELDS.map((field) => (<select_1.SelectItem key={field.value} value={field.value}>
                <div className="flex items-center justify-between gap-2">
                  <span>{field.label}</span>
                  <badge_1.Badge variant="outline" className="text-xs capitalize">
                    {field.type}
                  </badge_1.Badge>
                </div>
              </select_1.SelectItem>))}
          </select_1.SelectContent>
        </select_1.Select>
      </div>

      {/* Operator Selection */}
      {formData.field && (<div className="space-y-2">
          <label_1.Label htmlFor="operator" className="flex items-center gap-2">
            Condition Operator
            <span className="text-destructive">*</span>
          </label_1.Label>
          <select_1.Select value={formData.operator} onValueChange={handleOperatorChange}>
            <select_1.SelectTrigger id="operator">
              <select_1.SelectValue placeholder="Select operator"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              {availableOperators.map((operator) => (<select_1.SelectItem key={operator.value} value={operator.value}>
                  {operator.label}
                </select_1.SelectItem>))}
            </select_1.SelectContent>
          </select_1.Select>
        </div>)}

      {/* Value Input */}
      {formData.field && formData.operator && (<div className="space-y-2">
          <label_1.Label htmlFor="value" className="flex items-center gap-2">
            Comparison Value
            <span className="text-destructive">*</span>
          </label_1.Label>
          {renderValueInput()}
        </div>)}

      <separator_1.Separator />

      {/* Condition Preview */}
      {formData.field && formData.operator && formData.value && (<div className="space-y-3">
          <label_1.Label className="text-sm font-medium">Condition Preview</label_1.Label>
          <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 p-4 border border-purple-200 dark:border-purple-900">
            <p className="text-sm font-mono text-purple-900 dark:text-purple-100">
              {formData.condition}
            </p>
          </div>
          
          {/* Branch Paths */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3 border border-green-200 dark:border-green-900">
              <div className="flex items-center gap-2 mb-1">
                <lucide_react_1.CheckCircle2 className="h-4 w-4 text-green-600"/>
                <span className="text-xs font-medium text-green-700 dark:text-green-400">
                  TRUE Branch
                </span>
              </div>
              <p className="text-xs text-green-600 dark:text-green-500">
                Condition matches
              </p>
            </div>
            <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 border border-red-200 dark:border-red-900">
              <div className="flex items-center gap-2 mb-1">
                <lucide_react_1.XCircle className="h-4 w-4 text-red-600"/>
                <span className="text-xs font-medium text-red-700 dark:text-red-400">
                  FALSE Branch
                </span>
              </div>
              <p className="text-xs text-red-600 dark:text-red-500">
                Condition fails
              </p>
            </div>
          </div>
        </div>)}

      <separator_1.Separator />

      {/* Info Section */}
      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 border border-blue-200 dark:border-blue-900 flex gap-2">
        <lucide_react_1.Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"/>
        <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
          <p className="font-medium">About Condition Step:</p>
          <ul className="list-disc list-inside space-y-0.5 text-blue-600 dark:text-blue-500">
            <li>Creates two paths: TRUE (left) and FALSE (right)</li>
            <li>Subscribers are routed based on condition result</li>
            <li>Connect both outputs to handle all cases</li>
          </ul>
        </div>
      </div>

      {/* Configuration Status */}
      {formData.field && formData.operator && formData.value ? (<div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3 border border-green-200 dark:border-green-900">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">
            ✓ Configuration complete
          </p>
        </div>) : (<div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 border border-amber-200 dark:border-amber-900">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            ⚠ Please configure all condition parameters
          </p>
        </div>)}
    </div>);
}
//# sourceMappingURL=condition-config-form.js.map