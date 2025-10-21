"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailConfigForm = SendEmailConfigForm;
const react_1 = require("react");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const badge_1 = require("@/components/ui/badge");
const separator_1 = require("@/components/ui/separator");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
// Mock email templates - in production, fetch from API
const mockTemplates = [
    { id: 'welcome-1', name: 'Welcome Email', category: 'Onboarding' },
    { id: 'promo-1', name: 'Summer Sale Promotion', category: 'Marketing' },
    { id: 'newsletter-1', name: 'Monthly Newsletter', category: 'Newsletter' },
    { id: 'abandoned-1', name: 'Abandoned Cart Reminder', category: 'Behavioral' },
    { id: 'reengagement-1', name: 'Re-engagement Campaign', category: 'Lifecycle' },
];
function SendEmailConfigForm({ data, onUpdate, className, }) {
    const [formData, setFormData] = (0, react_1.useState)(data);
    // Update parent whenever form changes
    (0, react_1.useEffect)(() => {
        const isConfigured = !!(formData.templateId && formData.subject);
        onUpdate({ ...formData, configured: isConfigured });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]); // Only depend on formData, not onUpdate
    const selectedTemplate = mockTemplates.find((t) => t.id === formData.templateId);
    const handleTemplateChange = (templateId) => {
        setFormData((prev) => ({ ...prev, templateId }));
    };
    const handleSubjectChange = (e) => {
        setFormData((prev) => ({ ...prev, subject: e.target.value }));
    };
    const handleFromNameChange = (e) => {
        setFormData((prev) => ({ ...prev, fromName: e.target.value }));
    };
    const handleFromEmailChange = (e) => {
        setFormData((prev) => ({ ...prev, fromEmail: e.target.value }));
    };
    const insertVariable = (variable) => {
        const currentSubject = formData.subject || '';
        setFormData((prev) => ({
            ...prev,
            subject: currentSubject + `{{${variable}}}`,
        }));
    };
    return (<div className={(0, utils_1.cn)('space-y-4', className)}>
      {/* Template Selection */}
      <div className="space-y-2">
        <label_1.Label htmlFor="template" className="flex items-center gap-2">
          <lucide_react_1.Mail className="h-4 w-4"/>
          Email Template
          <span className="text-destructive">*</span>
        </label_1.Label>
        <select_1.Select value={formData.templateId} onValueChange={handleTemplateChange}>
          <select_1.SelectTrigger id="template">
            <select_1.SelectValue placeholder="Select a template"/>
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            {mockTemplates.map((template) => (<select_1.SelectItem key={template.id} value={template.id}>
                <div className="flex items-center justify-between gap-2">
                  <span>{template.name}</span>
                  <badge_1.Badge variant="outline" className="text-xs">
                    {template.category}
                  </badge_1.Badge>
                </div>
              </select_1.SelectItem>))}
          </select_1.SelectContent>
        </select_1.Select>
        {selectedTemplate && (<p className="text-sm text-muted-foreground">
            Category: {selectedTemplate.category}
          </p>)}
      </div>

      <separator_1.Separator />

      {/* Subject Line */}
      <div className="space-y-2">
        <label_1.Label htmlFor="subject" className="flex items-center gap-2">
          <lucide_react_1.Sparkles className="h-4 w-4"/>
          Subject Line
          <span className="text-destructive">*</span>
        </label_1.Label>
        <input_1.Input id="subject" type="text" placeholder="Enter email subject..." value={formData.subject || ''} onChange={handleSubjectChange}/>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs text-muted-foreground">Insert variable:</span>
          {['firstName', 'lastName', 'email', 'company'].map((variable) => (<button_1.Button key={variable} variant="outline" size="sm" className="h-6 text-xs" onClick={() => insertVariable(variable)}>
              {`{{${variable}}}`}
            </button_1.Button>))}
        </div>
      </div>

      <separator_1.Separator />

      {/* Sender Override (Optional) */}
      <div className="space-y-3">
        <label_1.Label className="text-sm font-medium">Sender Information (Optional)</label_1.Label>
        <div className="space-y-2">
          <label_1.Label htmlFor="fromName" className="text-xs text-muted-foreground">
            From Name
          </label_1.Label>
          <input_1.Input id="fromName" type="text" placeholder="Default sender name" value={formData.fromName || ''} onChange={handleFromNameChange}/>
        </div>
        <div className="space-y-2">
          <label_1.Label htmlFor="fromEmail" className="text-xs text-muted-foreground">
            From Email
          </label_1.Label>
          <input_1.Input id="fromEmail" type="email" placeholder="noreply@company.com" value={formData.fromEmail || ''} onChange={handleFromEmailChange}/>
        </div>
      </div>

      <separator_1.Separator />

      {/* Preview Button */}
      <button_1.Button variant="outline" className="w-full" disabled>
        <lucide_react_1.Eye className="h-4 w-4 mr-2"/>
        Preview Email (Coming Soon)
      </button_1.Button>

      {/* Configuration Status */}
      {formData.templateId && formData.subject ? (<div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3 border border-green-200 dark:border-green-900">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">
            ✓ Configuration complete
          </p>
        </div>) : (<div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 border border-amber-200 dark:border-amber-900">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            ⚠ Please select a template and enter a subject line
          </p>
        </div>)}
    </div>);
}
//# sourceMappingURL=send-email-config-form.js.map