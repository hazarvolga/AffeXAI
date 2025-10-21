"use strict";
/**
 * Trigger Configuration Form
 * Form for configuring automation triggers
 */
'use client';
/**
 * Trigger Configuration Form
 * Form for configuring automation triggers
 */
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
exports.TriggerConfigForm = TriggerConfigForm;
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const z = __importStar(require("zod"));
const automation_1 = require("@/types/automation");
const form_1 = require("@/components/ui/form");
const select_1 = require("@/components/ui/select");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const checkbox_1 = require("@/components/ui/checkbox");
const lucide_react_1 = require("lucide-react");
// Form schema
const triggerConfigSchema = z.object({
    triggerType: z.nativeEnum(automation_1.TriggerType),
    segmentId: z.string().optional(),
    config: z.any(), // Will be validated based on trigger type
});
function TriggerConfigForm({ initialData, onUpdate, onSubmit, onCancel, }) {
    const [triggerType, setTriggerType] = (0, react_1.useState)(initialData?.triggerType || automation_1.TriggerType.EVENT);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(triggerConfigSchema),
        defaultValues: {
            triggerType: initialData?.triggerType || automation_1.TriggerType.EVENT,
            segmentId: initialData?.segmentId,
            config: initialData?.config || {},
        },
    });
    const handleSubmit = (data) => {
        const submitData = {
            triggerType: data.triggerType,
            config: data.config,
            segmentId: data.segmentId,
        };
        if (onUpdate) {
            onUpdate(submitData);
        }
        if (onSubmit) {
            onSubmit(submitData);
        }
    };
    const handleTriggerTypeChange = (value) => {
        setTriggerType(value);
        form.setValue('triggerType', value);
        // Reset config when trigger type changes
        form.setValue('config', {});
    };
    return (<form_1.Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Trigger Type Selection */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.Zap className="h-5 w-5"/>
              Trigger Type
            </card_1.CardTitle>
            <card_1.CardDescription>
              Select when this automation should be triggered
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <form_1.FormField control={form.control} name="triggerType" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Trigger Type</form_1.FormLabel>
                  <select_1.Select value={field.value} onValueChange={handleTriggerTypeChange}>
                    <form_1.FormControl>
                      <select_1.SelectTrigger>
                        <select_1.SelectValue placeholder="Select trigger type"/>
                      </select_1.SelectTrigger>
                    </form_1.FormControl>
                    <select_1.SelectContent>
                      <select_1.SelectItem value={automation_1.TriggerType.EVENT}>
                        <span className="flex items-center gap-2">
                          <lucide_react_1.Zap className="h-4 w-4"/>
                          Event-Based
                        </span>
                      </select_1.SelectItem>
                      <select_1.SelectItem value={automation_1.TriggerType.BEHAVIOR}>
                        <span className="flex items-center gap-2">
                          <lucide_react_1.Target className="h-4 w-4"/>
                          Behavior-Based
                        </span>
                      </select_1.SelectItem>
                      <select_1.SelectItem value={automation_1.TriggerType.TIME_BASED}>
                        <span className="flex items-center gap-2">
                          <lucide_react_1.Clock className="h-4 w-4"/>
                          Time-Based
                        </span>
                      </select_1.SelectItem>
                      <select_1.SelectItem value={automation_1.TriggerType.ATTRIBUTE}>
                        <span className="flex items-center gap-2">
                          <lucide_react_1.Users className="h-4 w-4"/>
                          Attribute Change
                        </span>
                      </select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            {/* Segment Selection */}
            <form_1.FormField control={form.control} name="segmentId" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Target Segment (Optional)</form_1.FormLabel>
                  <select_1.Select value={field.value || 'all'} onValueChange={(value) => field.onChange(value === 'all' ? undefined : value)}>
                    <form_1.FormControl>
                      <select_1.SelectTrigger>
                        <select_1.SelectValue placeholder="All subscribers"/>
                      </select_1.SelectTrigger>
                    </form_1.FormControl>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="all">All subscribers</select_1.SelectItem>
                      {/* TODO: Load segments from API */}
                      <select_1.SelectItem value="segment-1">Active Subscribers</select_1.SelectItem>
                      <select_1.SelectItem value="segment-2">VIP Customers</select_1.SelectItem>
                      <select_1.SelectItem value="segment-3">Recent Signups</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                  <form_1.FormDescription>
                    Optionally limit this automation to a specific segment
                  </form_1.FormDescription>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
          </card_1.CardContent>
        </card_1.Card>

        {/* Trigger-Specific Configuration */}
        {triggerType === automation_1.TriggerType.EVENT && (<EventTriggerConfigSection form={form}/>)}
        {triggerType === automation_1.TriggerType.BEHAVIOR && (<BehaviorTriggerConfigSection form={form}/>)}
        {triggerType === automation_1.TriggerType.TIME_BASED && (<TimeBasedTriggerConfigSection form={form}/>)}
        {triggerType === automation_1.TriggerType.ATTRIBUTE && (<AttributeTriggerConfigSection form={form}/>)}

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          {onCancel && (<button_1.Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </button_1.Button>)}
          <button_1.Button type="submit">Continue to Workflow</button_1.Button>
        </div>
      </form>
    </form_1.Form>);
}
/**
 * Event Trigger Configuration Section
 */
function EventTriggerConfigSection({ form }) {
    const [selectedEvents, setSelectedEvents] = (0, react_1.useState)(form.getValues('config.events') || []);
    const toggleEvent = (event) => {
        const updated = selectedEvents.includes(event)
            ? selectedEvents.filter((e) => e !== event)
            : [...selectedEvents, event];
        setSelectedEvents(updated);
        form.setValue('config.events', updated);
    };
    const eventGroups = [
        {
            title: 'Subscriber Events',
            events: [
                { value: automation_1.TriggerEvent.SUBSCRIBER_CREATED, label: 'New Subscriber' },
                { value: automation_1.TriggerEvent.SUBSCRIBER_UPDATED, label: 'Subscriber Updated' },
                { value: automation_1.TriggerEvent.SUBSCRIBER_UNSUBSCRIBED, label: 'Unsubscribed' },
            ],
        },
        {
            title: 'Email Events',
            events: [
                { value: automation_1.TriggerEvent.EMAIL_OPENED, label: 'Email Opened' },
                { value: automation_1.TriggerEvent.EMAIL_CLICKED, label: 'Link Clicked' },
                { value: automation_1.TriggerEvent.EMAIL_BOUNCED, label: 'Email Bounced' },
            ],
        },
        {
            title: 'Campaign Events',
            events: [
                { value: automation_1.TriggerEvent.CAMPAIGN_SENT, label: 'Campaign Sent' },
                { value: automation_1.TriggerEvent.SEGMENT_JOINED, label: 'Joined Segment' },
                { value: automation_1.TriggerEvent.SEGMENT_LEFT, label: 'Left Segment' },
            ],
        },
    ];
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Event Configuration</card_1.CardTitle>
        <card_1.CardDescription>
          Select one or more events that will trigger this automation
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-6">
        {eventGroups.map((group) => (<div key={group.title} className="space-y-3">
            <h4 className="text-sm font-medium">{group.title}</h4>
            <div className="space-y-2">
              {group.events.map((event) => {
                const checkboxId = `event-${event.value}`;
                return (<div key={event.value} className="flex items-center space-x-2">
                    <checkbox_1.Checkbox id={checkboxId} checked={selectedEvents.includes(event.value)} onCheckedChange={() => toggleEvent(event.value)}/>
                    <label htmlFor={checkboxId} className="text-sm cursor-pointer flex-1">
                      {event.label}
                    </label>
                  </div>);
            })}
            </div>
          </div>))}

        {selectedEvents.length === 0 && (<div className="p-4 border border-dashed rounded-lg text-center text-sm text-muted-foreground">
            <lucide_react_1.Info className="h-5 w-5 mx-auto mb-2"/>
            Select at least one event to trigger this automation
          </div>)}
      </card_1.CardContent>
    </card_1.Card>);
}
/**
 * Behavior Trigger Configuration Section
 */
function BehaviorTriggerConfigSection({ form }) {
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Behavior Configuration</card_1.CardTitle>
        <card_1.CardDescription>
          Configure behavior-based trigger conditions
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <form_1.FormField control={form.control} name="config.behaviorType" render={({ field }) => (<form_1.FormItem>
              <form_1.FormLabel>Behavior Type</form_1.FormLabel>
              <select_1.Select value={field.value} onValueChange={field.onChange}>
                <form_1.FormControl>
                  <select_1.SelectTrigger>
                    <select_1.SelectValue placeholder="Select behavior"/>
                  </select_1.SelectTrigger>
                </form_1.FormControl>
                <select_1.SelectContent>
                  <select_1.SelectItem value="cart_abandonment">
                    Cart Abandonment
                  </select_1.SelectItem>
                  <select_1.SelectItem value="inactive_subscriber">
                    Inactive Subscriber
                  </select_1.SelectItem>
                  <select_1.SelectItem value="browsing_pattern">
                    Browsing Pattern
                  </select_1.SelectItem>
                  <select_1.SelectItem value="purchase_behavior">
                    Purchase Behavior
                  </select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
              <form_1.FormMessage />
            </form_1.FormItem>)}/>

        <form_1.FormField control={form.control} name="config.timeWindow" render={({ field }) => (<form_1.FormItem>
              <form_1.FormLabel>Time Window (minutes)</form_1.FormLabel>
              <form_1.FormControl>
                <input_1.Input type="number" placeholder="30" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))}/>
              </form_1.FormControl>
              <form_1.FormDescription>
                How long to wait before triggering the automation
              </form_1.FormDescription>
              <form_1.FormMessage />
            </form_1.FormItem>)}/>
      </card_1.CardContent>
    </card_1.Card>);
}
/**
 * Time-Based Trigger Configuration Section
 */
function TimeBasedTriggerConfigSection({ form }) {
    const scheduleType = form.watch('config.scheduleType');
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Time-Based Configuration</card_1.CardTitle>
        <card_1.CardDescription>
          Schedule when this automation should run
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <form_1.FormField control={form.control} name="config.scheduleType" render={({ field }) => (<form_1.FormItem>
              <form_1.FormLabel>Schedule Type</form_1.FormLabel>
              <select_1.Select value={field.value} onValueChange={field.onChange}>
                <form_1.FormControl>
                  <select_1.SelectTrigger>
                    <select_1.SelectValue placeholder="Select schedule"/>
                  </select_1.SelectTrigger>
                </form_1.FormControl>
                <select_1.SelectContent>
                  <select_1.SelectItem value="daily">Daily</select_1.SelectItem>
                  <select_1.SelectItem value="weekly">Weekly</select_1.SelectItem>
                  <select_1.SelectItem value="monthly">Monthly</select_1.SelectItem>
                  <select_1.SelectItem value="birthday">Birthday</select_1.SelectItem>
                  <select_1.SelectItem value="anniversary">Anniversary</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
              <form_1.FormMessage />
            </form_1.FormItem>)}/>

        <form_1.FormField control={form.control} name="config.time" render={({ field }) => (<form_1.FormItem>
              <form_1.FormLabel>Time</form_1.FormLabel>
              <form_1.FormControl>
                <input_1.Input type="time" {...field}/>
              </form_1.FormControl>
              <form_1.FormDescription>Time of day to send (24-hour format)</form_1.FormDescription>
              <form_1.FormMessage />
            </form_1.FormItem>)}/>

        {scheduleType === 'weekly' && (<form_1.FormField control={form.control} name="config.dayOfWeek" render={({ field }) => (<form_1.FormItem>
                <form_1.FormLabel>Day of Week</form_1.FormLabel>
                <select_1.Select value={field.value?.toString()} onValueChange={(v) => field.onChange(parseInt(v))}>
                  <form_1.FormControl>
                    <select_1.SelectTrigger>
                      <select_1.SelectValue placeholder="Select day"/>
                    </select_1.SelectTrigger>
                  </form_1.FormControl>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="0">Sunday</select_1.SelectItem>
                    <select_1.SelectItem value="1">Monday</select_1.SelectItem>
                    <select_1.SelectItem value="2">Tuesday</select_1.SelectItem>
                    <select_1.SelectItem value="3">Wednesday</select_1.SelectItem>
                    <select_1.SelectItem value="4">Thursday</select_1.SelectItem>
                    <select_1.SelectItem value="5">Friday</select_1.SelectItem>
                    <select_1.SelectItem value="6">Saturday</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
                <form_1.FormMessage />
              </form_1.FormItem>)}/>)}

        {scheduleType === 'monthly' && (<form_1.FormField control={form.control} name="config.dayOfMonth" render={({ field }) => (<form_1.FormItem>
                <form_1.FormLabel>Day of Month</form_1.FormLabel>
                <form_1.FormControl>
                  <input_1.Input type="number" min="1" max="31" placeholder="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))}/>
                </form_1.FormControl>
                <form_1.FormMessage />
              </form_1.FormItem>)}/>)}

        {(scheduleType === 'birthday' || scheduleType === 'anniversary') && (<>
            <form_1.FormField control={form.control} name="config.dateField" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Date Field</form_1.FormLabel>
                  <select_1.Select value={field.value} onValueChange={field.onChange}>
                    <form_1.FormControl>
                      <select_1.SelectTrigger>
                        <select_1.SelectValue placeholder="Select field"/>
                      </select_1.SelectTrigger>
                    </form_1.FormControl>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="birthday">Birthday</select_1.SelectItem>
                      <select_1.SelectItem value="anniversary">Anniversary</select_1.SelectItem>
                      <select_1.SelectItem value="custom_date">Custom Date</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <form_1.FormField control={form.control} name="config.offsetDays" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Offset Days</form_1.FormLabel>
                  <form_1.FormControl>
                    <input_1.Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))}/>
                  </form_1.FormControl>
                  <form_1.FormDescription>
                    Days before (-) or after (+) the date (0 = on the date)
                  </form_1.FormDescription>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
          </>)}
      </card_1.CardContent>
    </card_1.Card>);
}
/**
 * Attribute Trigger Configuration Section
 */
function AttributeTriggerConfigSection({ form }) {
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Attribute Change Configuration</card_1.CardTitle>
        <card_1.CardDescription>
          Trigger when a subscriber attribute changes
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <form_1.FormField control={form.control} name="config.attribute" render={({ field }) => (<form_1.FormItem>
              <form_1.FormLabel>Attribute</form_1.FormLabel>
              <select_1.Select value={field.value} onValueChange={field.onChange}>
                <form_1.FormControl>
                  <select_1.SelectTrigger>
                    <select_1.SelectValue placeholder="Select attribute"/>
                  </select_1.SelectTrigger>
                </form_1.FormControl>
                <select_1.SelectContent>
                  <select_1.SelectItem value="status">Status</select_1.SelectItem>
                  <select_1.SelectItem value="email">Email</select_1.SelectItem>
                  <select_1.SelectItem value="name">Name</select_1.SelectItem>
                  <select_1.SelectItem value="tags">Tags</select_1.SelectItem>
                  <select_1.SelectItem value="custom_field">Custom Field</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
              <form_1.FormMessage />
            </form_1.FormItem>)}/>

        <form_1.FormField control={form.control} name="config.changeType" render={({ field }) => (<form_1.FormItem>
              <form_1.FormLabel>Change Type</form_1.FormLabel>
              <select_1.Select value={field.value} onValueChange={field.onChange}>
                <form_1.FormControl>
                  <select_1.SelectTrigger>
                    <select_1.SelectValue placeholder="Select change type"/>
                  </select_1.SelectTrigger>
                </form_1.FormControl>
                <select_1.SelectContent>
                  <select_1.SelectItem value="any">Any change</select_1.SelectItem>
                  <select_1.SelectItem value="specific">Specific value</select_1.SelectItem>
                  <select_1.SelectItem value="increased">Increased</select_1.SelectItem>
                  <select_1.SelectItem value="decreased">Decreased</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
              <form_1.FormMessage />
            </form_1.FormItem>)}/>

        {form.watch('config.changeType') === 'specific' && (<>
            <form_1.FormField control={form.control} name="config.oldValue" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Old Value (Optional)</form_1.FormLabel>
                  <form_1.FormControl>
                    <input_1.Input placeholder="Previous value" {...field}/>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <form_1.FormField control={form.control} name="config.newValue" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>New Value</form_1.FormLabel>
                  <form_1.FormControl>
                    <input_1.Input placeholder="New value" {...field}/>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
          </>)}
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=trigger-config-form.js.map