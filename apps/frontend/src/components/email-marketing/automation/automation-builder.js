"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationBuilder = AutomationBuilder;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const separator_1 = require("@/components/ui/separator");
const progress_1 = require("@/components/ui/progress");
const use_toast_1 = require("@/hooks/use-toast");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const trigger_config_form_1 = require("./trigger-config-form");
const workflow_builder_1 = require("./workflow-builder");
function AutomationBuilder({ automationId, initialData, mode = 'create', }) {
    const router = (0, navigation_1.useRouter)();
    const { toast } = (0, use_toast_1.useToast)();
    const [currentStep, setCurrentStep] = (0, react_1.useState)('trigger');
    const [automationData, setAutomationData] = (0, react_1.useState)(initialData || {
        name: '',
        description: '',
    });
    const [isSaving, setIsSaving] = (0, react_1.useState)(false);
    const steps = [
        {
            id: 'trigger',
            label: 'Configure Trigger',
            description: 'When should this automation start?',
        },
        {
            id: 'workflow',
            label: 'Build Workflow',
            description: 'What actions should happen?',
        },
        {
            id: 'review',
            label: 'Review & Activate',
            description: 'Review and activate your automation',
        },
    ];
    const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
    const progress = ((currentStepIndex + 1) / steps.length) * 100;
    const handleTriggerUpdate = (0, react_1.useCallback)((triggerData) => {
        setAutomationData((prev) => ({
            ...prev,
            trigger: triggerData,
        }));
    }, []);
    const handleWorkflowUpdate = (0, react_1.useCallback)((workflowData) => {
        setAutomationData((prev) => ({
            ...prev,
            workflow: workflowData,
        }));
    }, []);
    const canProceedToNext = () => {
        switch (currentStep) {
            case 'trigger':
                return !!automationData.trigger;
            case 'workflow':
                return !!(automationData.workflow?.nodes &&
                    automationData.workflow.nodes.length > 1);
            case 'review':
                return true;
            default:
                return false;
        }
    };
    const handleNext = () => {
        if (currentStep === 'trigger') {
            setCurrentStep('workflow');
        }
        else if (currentStep === 'workflow') {
            setCurrentStep('review');
        }
    };
    const handleBack = () => {
        if (currentStep === 'workflow') {
            setCurrentStep('trigger');
        }
        else if (currentStep === 'review') {
            setCurrentStep('workflow');
        }
    };
    const handleSaveDraft = async () => {
        setIsSaving(true);
        try {
            // Save to backend API
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            toast({
                title: 'Draft saved',
                description: 'Your automation has been saved as a draft.',
            });
        }
        catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to save draft. Please try again.',
                variant: 'destructive',
            });
        }
        finally {
            setIsSaving(false);
        }
    };
    const handleActivate = async () => {
        setIsSaving(true);
        try {
            // Activate automation via backend API
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
            toast({
                title: 'Automation activated!',
                description: 'Your automation is now running.',
            });
            router.push('/admin/email-marketing/automations');
        }
        catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to activate automation. Please try again.',
                variant: 'destructive',
            });
        }
        finally {
            setIsSaving(false);
        }
    };
    const handleTestFlow = () => {
        toast({
            title: 'Test Started',
            description: 'A test execution has been initiated with your email.',
        });
    };
    const renderStepContent = () => {
        switch (currentStep) {
            case 'trigger':
                return (<card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Configure Trigger</card_1.CardTitle>
              <card_1.CardDescription>
                Define when this automation should start for your subscribers
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <trigger_config_form_1.TriggerConfigForm initialData={automationData.trigger} onUpdate={handleTriggerUpdate}/>
            </card_1.CardContent>
          </card_1.Card>);
            case 'workflow':
                return (<div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Build Your Workflow</h3>
                <p className="text-sm text-muted-foreground">
                  Drag steps from the library to create your automation flow
                </p>
              </div>
              <badge_1.Badge variant="outline" className="text-xs">
                {automationData.workflow?.nodes?.length || 0} steps added
              </badge_1.Badge>
            </div>
            <div className="border rounded-lg overflow-hidden h-[600px]">
              <workflow_builder_1.WorkflowBuilder initialNodes={automationData.workflow?.nodes} initialEdges={automationData.workflow?.edges} onChange={handleWorkflowUpdate}/>
            </div>
          </div>);
            case 'review':
                return (<div className="space-y-6">
            {/* Automation Summary */}
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Automation Summary</card_1.CardTitle>
                <card_1.CardDescription>
                  Review your automation configuration before activating
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                {/* Trigger Info */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <lucide_react_1.CheckCircle2 className="h-4 w-4 text-green-600"/>
                    Trigger Configuration
                  </h4>
                  <div className="ml-6 space-y-1 text-sm text-muted-foreground">
                    <p>Type: {automationData.trigger?.type || 'Not configured'}</p>
                    {automationData.trigger?.eventType && (<p>Event: {automationData.trigger.eventType}</p>)}
                    {automationData.trigger?.segment && (<p>Segment: {automationData.trigger.segment}</p>)}
                  </div>
                </div>

                <separator_1.Separator />

                {/* Workflow Info */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <lucide_react_1.CheckCircle2 className="h-4 w-4 text-green-600"/>
                    Workflow Steps
                  </h4>
                  <div className="ml-6 space-y-2 text-sm">
                    {automationData.workflow?.nodes?.map((node, index) => (<div key={node.id} className="flex items-center gap-2">
                        <badge_1.Badge variant="outline" className="text-xs">
                          Step {index + 1}
                        </badge_1.Badge>
                        <span className="text-muted-foreground">
                          {node.data?.label || node.type}
                        </span>
                        {node.data?.configured === false && (<lucide_react_1.AlertTriangle className="h-3 w-3 text-amber-600"/>)}
                      </div>))}
                  </div>
                </div>

                <separator_1.Separator />

                {/* Validation Warnings */}
                {automationData.workflow?.nodes?.some((n) => n.data?.configured === false) && (<div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-4 border border-amber-200 dark:border-amber-900">
                    <div className="flex gap-2">
                      <lucide_react_1.AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5"/>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          Unconfigured Steps
                        </h4>
                        <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
                          Some workflow steps are not fully configured. Please review
                          and complete all step configurations before activating.
                        </p>
                      </div>
                    </div>
                  </div>)}
              </card_1.CardContent>
            </card_1.Card>

            {/* Action Buttons */}
            <div className="grid gap-3 md:grid-cols-2">
              <button_1.Button variant="outline" onClick={handleTestFlow} className="w-full">
                <lucide_react_1.Eye className="h-4 w-4 mr-2"/>
                Test Flow
              </button_1.Button>
              <button_1.Button onClick={handleActivate} disabled={isSaving} className="w-full">
                <lucide_react_1.Play className="h-4 w-4 mr-2"/>
                {isSaving ? 'Activating...' : 'Activate Automation'}
              </button_1.Button>
            </div>
          </div>);
            default:
                return null;
        }
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {mode === 'edit' ? 'Edit Automation' : 'Create New Automation'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Build powerful automated workflows for your subscribers
          </p>
        </div>
        <button_1.Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
          <lucide_react_1.Save className="h-4 w-4 mr-2"/>
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button_1.Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <progress_1.Progress value={progress} className="h-2"/>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {currentStepIndex + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = index < currentStepIndex;
            return (<div key={step.id} className="flex-1">
              <div className="flex items-center">
                <div className={(0, utils_1.cn)('flex items-center gap-2 cursor-pointer', isActive && 'text-primary font-medium')} onClick={() => setCurrentStep(step.id)}>
                  {isCompleted ? (<lucide_react_1.CheckCircle2 className="h-5 w-5 text-green-600"/>) : (<lucide_react_1.Circle className={(0, utils_1.cn)('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground')}/>)}
                  <div className="hidden sm:block">
                    <div className="text-sm">{step.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (<separator_1.Separator className="flex-1 mx-4"/>)}
              </div>
            </div>);
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <button_1.Button variant="outline" onClick={handleBack} disabled={currentStepIndex === 0}>
          <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
          Back
        </button_1.Button>

        {currentStep !== 'review' ? (<button_1.Button onClick={handleNext} disabled={!canProceedToNext()}>
            Next
            <lucide_react_1.ArrowRight className="h-4 w-4 ml-2"/>
          </button_1.Button>) : (<div className="text-sm text-muted-foreground">
            Review complete
          </div>)}
      </div>
    </div>);
}
//# sourceMappingURL=automation-builder.js.map