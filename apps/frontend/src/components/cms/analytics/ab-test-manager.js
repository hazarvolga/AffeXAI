"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABTestManager = ABTestManager;
/**
 * A/B Test Manager Component
 *
 * Create and manage A/B tests for components:
 * - Create new tests with variants
 * - Monitor test progress
 * - View statistical significance
 * - Declare winners
 */
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
function ABTestManager({ tests, onCreateTest, onUpdateTest, onDeleteTest, onDeclareWinner, }) {
    const [isCreating, setIsCreating] = (0, react_1.useState)(false);
    const [selectedTest, setSelectedTest] = (0, react_1.useState)(null);
    const runningTests = tests.filter((t) => t.status === 'running');
    const completedTests = tests.filter((t) => t.status === 'completed');
    const draftTests = tests.filter((t) => t.status === 'draft');
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">A/B Test Manager</h2>
          <p className="text-muted-foreground">
            Create and manage component experiments
          </p>
        </div>
        <button_1.Button onClick={() => setIsCreating(true)}>
          Create New Test
        </button_1.Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <card_1.Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <lucide_react_1.PlayIcon className="h-5 w-5 text-blue-500"/>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Running</div>
              <div className="text-2xl font-bold">{runningTests.length}</div>
            </div>
          </div>
        </card_1.Card>
        <card_1.Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <lucide_react_1.CheckCircle2Icon className="h-5 w-5 text-green-500"/>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Completed</div>
              <div className="text-2xl font-bold">{completedTests.length}</div>
            </div>
          </div>
        </card_1.Card>
        <card_1.Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-500/10">
              <lucide_react_1.AlertCircleIcon className="h-5 w-5 text-gray-500"/>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Drafts</div>
              <div className="text-2xl font-bold">{draftTests.length}</div>
            </div>
          </div>
        </card_1.Card>
      </div>

      {/* Running tests */}
      {runningTests.length > 0 && (<div>
          <h3 className="font-semibold mb-3">Running Tests</h3>
          <div className="space-y-3">
            {runningTests.map((test) => (<TestCard key={test.id} test={test} onUpdate={(updates) => onUpdateTest?.(test.id, updates)} onDeclareWinner={(variantId) => onDeclareWinner?.(test.id, variantId)} onSelect={() => setSelectedTest(test)}/>))}
          </div>
        </div>)}

      {/* Completed tests */}
      {completedTests.length > 0 && (<div>
          <h3 className="font-semibold mb-3">Completed Tests</h3>
          <div className="space-y-3">
            {completedTests.map((test) => (<TestCard key={test.id} test={test} onSelect={() => setSelectedTest(test)}/>))}
          </div>
        </div>)}

      {/* Draft tests */}
      {draftTests.length > 0 && (<div>
          <h3 className="font-semibold mb-3">Draft Tests</h3>
          <div className="space-y-3">
            {draftTests.map((test) => (<TestCard key={test.id} test={test} onUpdate={(updates) => onUpdateTest?.(test.id, updates)} onDelete={() => onDeleteTest?.(test.id)} onSelect={() => setSelectedTest(test)}/>))}
          </div>
        </div>)}

      {/* Create test modal */}
      {isCreating && (<CreateTestModal onClose={() => setIsCreating(false)} onCreate={(test) => {
                onCreateTest?.(test);
                setIsCreating(false);
            }}/>)}

      {/* Test details modal */}
      {selectedTest && (<TestDetailsModal test={selectedTest} onClose={() => setSelectedTest(null)} onUpdate={(updates) => {
                onUpdateTest?.(selectedTest.id, updates);
                setSelectedTest(null);
            }}/>)}
    </div>);
}
function TestCard({ test, onUpdate, onDelete, onDeclareWinner, onSelect }) {
    const winnerVariant = test.winnerVariantId
        ? test.variants.find((v) => v.id === test.winnerVariantId)
        : null;
    const bestPerformingVariant = [...test.variants].sort((a, b) => b.metrics.conversionRate - a.metrics.conversionRate)[0];
    return (<card_1.Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onSelect}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{test.name}</h4>
              <badge_1.Badge variant={test.status === 'running' ? 'default' : 'secondary'}>
                {test.status}
              </badge_1.Badge>
              {test.statisticalSignificance?.achieved && (<badge_1.Badge variant="secondary">
                  <lucide_react_1.TrendingUpIcon className="h-3 w-3 mr-1"/>
                  {test.statisticalSignificance.confidenceLevel}% confident
                </badge_1.Badge>)}
            </div>
            {test.description && (<p className="text-sm text-muted-foreground">{test.description}</p>)}
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Goal: {test.conversionGoal}</span>
              <span>•</span>
              <span>
                {new Date(test.period.start).toLocaleDateString()}
                {test.period.end && ` - ${new Date(test.period.end).toLocaleDateString()}`}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {test.status === 'running' && (<button_1.Button variant="ghost" size="sm" onClick={(e) => {
                e.stopPropagation();
                onUpdate?.({ status: 'paused' });
            }}>
                <lucide_react_1.PauseIcon className="h-4 w-4"/>
              </button_1.Button>)}
            {test.status === 'paused' && (<button_1.Button variant="ghost" size="sm" onClick={(e) => {
                e.stopPropagation();
                onUpdate?.({ status: 'running' });
            }}>
                <lucide_react_1.PlayIcon className="h-4 w-4"/>
              </button_1.Button>)}
            {test.status === 'draft' && (<button_1.Button variant="ghost" size="sm" onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
            }}>
                Delete
              </button_1.Button>)}
          </div>
        </div>

        {/* Variants */}
        <div className="grid grid-cols-3 gap-3">
          {test.variants.map((variant) => (<div key={variant.id} className={`p-3 rounded-lg border ${variant.id === test.winnerVariantId
                ? 'border-green-500 bg-green-50 dark:bg-green-950'
                : variant.id === bestPerformingVariant.id
                    ? 'border-primary'
                    : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{variant.name}</span>
                {variant.id === test.winnerVariantId && (<badge_1.Badge variant="default" className="bg-green-500">
                    Winner
                  </badge_1.Badge>)}
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {(variant.metrics.conversionRate * 100).toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {variant.metrics.conversions} / {variant.metrics.impressions} conversions
                </div>
                <div className="text-xs text-muted-foreground">
                  Avg engagement: {(variant.metrics.averageEngagementTime / 1000).toFixed(1)}s
                </div>
              </div>

              {test.status === 'running' && !test.winnerVariantId && (<button_1.Button variant="outline" size="sm" className="w-full mt-2" onClick={(e) => {
                    e.stopPropagation();
                    onDeclareWinner?.(variant.id);
                }}>
                  Declare Winner
                </button_1.Button>)}
            </div>))}
        </div>

        {/* Statistical significance progress */}
        {test.statisticalSignificance && test.status === 'running' && (<div className="pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Statistical Confidence</span>
              <span className="text-sm font-medium">
                {test.statisticalSignificance.confidenceLevel}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full transition-all ${test.statisticalSignificance.achieved
                ? 'bg-green-500'
                : 'bg-primary'}`} style={{
                width: `${test.statisticalSignificance.confidenceLevel}%`,
            }}/>
            </div>
          </div>)}
      </div>
    </card_1.Card>);
}
function CreateTestModal({ onClose, onCreate }) {
    const [testName, setTestName] = (0, react_1.useState)('');
    const [description, setDescription] = (0, react_1.useState)('');
    const [componentId, setComponentId] = (0, react_1.useState)('');
    const [conversionGoal, setConversionGoal] = (0, react_1.useState)('');
    const [variants, setVariants] = (0, react_1.useState)([
        { name: 'Control', trafficAllocation: 50 },
        { name: 'Variant A', trafficAllocation: 50 },
    ]);
    const handleSubmit = () => {
        onCreate({
            name: testName,
            description,
            componentId,
            conversionGoal,
            variants: variants,
            status: 'draft',
            period: {
                start: new Date(),
            },
        });
    };
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <card_1.Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-xl font-bold mb-4">Create A/B Test</h3>

        <div className="space-y-4">
          <div>
            <label_1.Label htmlFor="testName">Test Name</label_1.Label>
            <input_1.Input id="testName" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="E.g., Hero Button Color Test"/>
          </div>

          <div>
            <label_1.Label htmlFor="description">Description</label_1.Label>
            <input_1.Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of what you're testing"/>
          </div>

          <div>
            <label_1.Label htmlFor="componentId">Component ID</label_1.Label>
            <input_1.Input id="componentId" value={componentId} onChange={(e) => setComponentId(e.target.value)} placeholder="Component to test"/>
          </div>

          <div>
            <label_1.Label htmlFor="conversionGoal">Conversion Goal</label_1.Label>
            <input_1.Input id="conversionGoal" value={conversionGoal} onChange={(e) => setConversionGoal(e.target.value)} placeholder="E.g., Button Click, Form Submit"/>
          </div>

          <div className="flex gap-4 pt-4">
            <button_1.Button onClick={handleSubmit} className="flex-1">
              Create Test
            </button_1.Button>
            <button_1.Button onClick={onClose} variant="outline">
              Cancel
            </button_1.Button>
          </div>
        </div>
      </card_1.Card>
    </div>);
}
function TestDetailsModal({ test, onClose, onUpdate }) {
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <card_1.Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">{test.name}</h3>
            {test.description && (<p className="text-muted-foreground">{test.description}</p>)}
          </div>
          <button_1.Button variant="ghost" onClick={onClose}>
            Close
          </button_1.Button>
        </div>

        {/* Detailed metrics and charts would go here */}
        <div className="space-y-6">
          {/* Variant comparison */}
          <div>
            <h4 className="font-semibold mb-3">Variant Performance</h4>
            <div className="grid grid-cols-2 gap-4">
              {test.variants.map((variant) => (<card_1.Card key={variant.id} className="p-4">
                  <h5 className="font-medium mb-3">{variant.name}</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Conversion Rate</span>
                      <span className="font-semibold">
                        {(variant.metrics.conversionRate * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Impressions</span>
                      <span className="font-semibold">
                        {variant.metrics.impressions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Conversions</span>
                      <span className="font-semibold">
                        {variant.metrics.conversions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Engagement</span>
                      <span className="font-semibold">
                        {(variant.metrics.averageEngagementTime / 1000).toFixed(1)}s
                      </span>
                    </div>
                  </div>
                </card_1.Card>))}
            </div>
          </div>
        </div>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=ab-test-manager.js.map