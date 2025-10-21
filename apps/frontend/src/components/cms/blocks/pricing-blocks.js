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
exports.pricingBlocks = exports.PricingToggleSwitch = exports.PricingComparisonDetailed = exports.PricingTableThreeColumn = void 0;
const react_1 = __importStar(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const button_component_1 = require("@/components/cms/button-component");
const lucide_react_1 = require("lucide-react");
// Pricing Block 1: Three Column Pricing Table
const PricingTableThreeColumn = ({ props }) => {
    const title = props?.title || "Choose Your Plan";
    const subtitle = props?.subtitle || "Select the perfect plan for your needs";
    const plans = props?.plans || [
        {
            name: "Starter",
            price: "$19",
            period: "/month",
            description: "Perfect for individuals and small teams",
            features: [
                { text: "Up to 5 projects", included: true },
                { text: "10 GB storage", included: true },
                { text: "Basic support", included: true },
                { text: "Advanced analytics", included: false },
                { text: "Custom integrations", included: false }
            ],
            buttonText: "Get Started",
            buttonUrl: "#",
            highlighted: false
        },
        {
            name: "Professional",
            price: "$49",
            period: "/month",
            description: "Ideal for growing businesses",
            features: [
                { text: "Unlimited projects", included: true },
                { text: "100 GB storage", included: true },
                { text: "Priority support", included: true },
                { text: "Advanced analytics", included: true },
                { text: "Custom integrations", included: false }
            ],
            buttonText: "Get Started",
            buttonUrl: "#",
            highlighted: true
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "/month",
            description: "For large organizations",
            features: [
                { text: "Unlimited everything", included: true },
                { text: "Unlimited storage", included: true },
                { text: "24/7 dedicated support", included: true },
                { text: "Advanced analytics", included: true },
                { text: "Custom integrations", included: true }
            ],
            buttonText: "Contact Sales",
            buttonUrl: "#",
            highlighted: false
        }
    ];
    return (<container_component_1.ContainerComponent id="pricing-table-container" padding="xl" background="muted" className="py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <text_component_1.TextComponent id="pricing-table-title" content={title} variant="heading2" align="center" color="primary" weight="bold" className="mb-3"/>
        <text_component_1.TextComponent id="pricing-table-subtitle" content={subtitle} variant="body" align="center" color="muted" className="text-muted-foreground"/>
      </div>

      {/* Pricing Cards */}
      <grid_component_1.GridComponent id="pricing-table-grid" columns={3} gap="lg">
        {plans.map((plan, index) => (<card_component_1.CardComponent key={index} id={`pricing-plan-${index}`} padding="xl" className={`relative h-full flex flex-col ${plan.highlighted ? 'border-primary border-2 shadow-xl' : ''}`}>
            {/* Highlighted Badge */}
            {plan.highlighted && (<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>)}

            {/* Plan Name */}
            <text_component_1.TextComponent id={`pricing-plan-name-${index}`} content={plan.name} variant="heading3" align="center" color="primary" weight="bold" className="mb-2 text-center"/>

            {/* Price */}
            <div className="text-center mb-4">
              <span className="text-5xl font-bold text-primary">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>

            {/* Description */}
            <text_component_1.TextComponent id={`pricing-plan-description-${index}`} content={plan.description} variant="body" align="center" color="muted" className="text-center text-muted-foreground mb-6"/>

            {/* Features */}
            <div className="flex-1 space-y-3 mb-6">
              {plan.features.map((feature, fIndex) => (<div key={fIndex} className="flex items-start gap-2">
                  {feature.included ? (<lucide_react_1.Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"/>) : (<lucide_react_1.X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5"/>)}
                  <text_component_1.TextComponent id={`pricing-feature-${index}-${fIndex}`} content={feature.text} variant="body" align="left" color={feature.included ? "primary" : "muted"} className={`text-sm ${!feature.included ? 'text-muted-foreground line-through' : ''}`}/>
                </div>))}
            </div>

            {/* CTA Button */}
            <button_component_1.ButtonComponent id={`pricing-button-${index}`} text={plan.buttonText} href={plan.buttonUrl} variant={plan.highlighted ? "default" : "outline"} className="w-full"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.PricingTableThreeColumn = PricingTableThreeColumn;
// Pricing Block 2: Comparison Table (Detailed)
const PricingComparisonDetailed = ({ props }) => {
    const title = props?.title || "Compare Plans";
    const plans = props?.plans || [
        { name: "Starter", price: "$19" },
        { name: "Pro", price: "$49" },
        { name: "Enterprise", price: "$99" }
    ];
    const features = props?.features || [
        {
            category: "Core Features",
            items: [
                { feature: "Projects", values: ["5", "Unlimited", "Unlimited"] },
                { feature: "Storage", values: ["10 GB", "100 GB", "Unlimited"] },
                { feature: "Team Members", values: ["3", "10", "Unlimited"] }
            ]
        },
        {
            category: "Support",
            items: [
                { feature: "Email Support", values: [true, true, true] },
                { feature: "Priority Support", values: [false, true, true] },
                { feature: "24/7 Support", values: [false, false, true] }
            ]
        },
        {
            category: "Advanced",
            items: [
                { feature: "Analytics", values: [false, true, true] },
                { feature: "API Access", values: [false, true, true] },
                { feature: "Custom Integrations", values: [false, false, true] }
            ]
        }
    ];
    return (<container_component_1.ContainerComponent id="pricing-comparison-container" padding="xl" background="none" className="py-16">
      {/* Title */}
      <text_component_1.TextComponent id="pricing-comparison-title" content={title} variant="heading2" align="center" color="primary" weight="bold" className="text-center mb-12"/>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left p-4 font-semibold">Features</th>
              {plans.map((plan, index) => (<th key={index} className="p-4 text-center">
                  <div className="font-bold text-lg">{plan.name}</div>
                  <div className="text-2xl font-bold text-primary mt-2">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">/month</div>
                </th>))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {features.map((category, catIndex) => (<react_1.default.Fragment key={catIndex}>
                {/* Category Header */}
                <tr className="bg-muted">
                  <td colSpan={plans.length + 1} className="p-3 font-semibold">
                    {category.category}
                  </td>
                </tr>
                
                {/* Category Items */}
                {category.items.map((item, itemIndex) => (<tr key={itemIndex} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">{item.feature}</td>
                    {item.values.map((value, valIndex) => (<td key={valIndex} className="p-4 text-center">
                        {typeof value === 'boolean' ? (value ? (<lucide_react_1.Check className="h-5 w-5 text-primary mx-auto"/>) : (<lucide_react_1.X className="h-5 w-5 text-muted-foreground mx-auto"/>)) : (<span className="font-medium">{value}</span>)}
                      </td>))}
                  </tr>))}
              </react_1.default.Fragment>))}
          </tbody>
        </table>
      </div>

      {/* CTA Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        {plans.map((plan, index) => (<button_component_1.ButtonComponent key={index} id={`pricing-comparison-button-${index}`} text={`Choose ${plan.name}`} href="#" variant={index === 1 ? "default" : "outline"}/>))}
      </div>
    </container_component_1.ContainerComponent>);
};
exports.PricingComparisonDetailed = PricingComparisonDetailed;
// Pricing Block 3: Toggle Switch (Monthly/Yearly)
const PricingToggleSwitch = ({ props }) => {
    const [isYearly, setIsYearly] = (0, react_1.useState)(false);
    const title = props?.title || "Simple, Transparent Pricing";
    const subtitle = props?.subtitle || "Save 20% with yearly billing";
    const plans = props?.plans || [
        {
            name: "Basic",
            monthlyPrice: "$29",
            yearlyPrice: "$279",
            description: "Essential features for getting started",
            features: [
                "10 Projects",
                "50 GB Storage",
                "Email Support",
                "Basic Analytics"
            ],
            buttonText: "Start Free Trial"
        },
        {
            name: "Professional",
            monthlyPrice: "$79",
            yearlyPrice: "$759",
            description: "Advanced features for professionals",
            features: [
                "Unlimited Projects",
                "500 GB Storage",
                "Priority Support",
                "Advanced Analytics",
                "API Access"
            ],
            buttonText: "Start Free Trial",
            highlighted: true
        },
        {
            name: "Business",
            monthlyPrice: "$199",
            yearlyPrice: "$1,899",
            description: "Complete solution for teams",
            features: [
                "Unlimited Everything",
                "Unlimited Storage",
                "24/7 Dedicated Support",
                "Custom Analytics",
                "Custom Integrations",
                "SLA Guarantee"
            ],
            buttonText: "Contact Sales"
        }
    ];
    return (<container_component_1.ContainerComponent id="pricing-toggle-container" padding="xl" background="muted" className="py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <text_component_1.TextComponent id="pricing-toggle-title" content={title} variant="heading2" align="center" color="primary" weight="bold" className="mb-3"/>
        <text_component_1.TextComponent id="pricing-toggle-subtitle" content={subtitle} variant="body" className="text-muted-foreground mb-6"/>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-4">
          <span className={`font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button onClick={() => setIsYearly(!isYearly)} className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-primary' : 'bg-border'}`}>
            <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-7' : 'translate-x-0'}`}/>
          </button>
          <span className={`font-medium ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
            Yearly
            <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-1 rounded">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <grid_component_1.GridComponent id="pricing-toggle-grid" columns={3} gap="lg">
        {plans.map((plan, index) => (<card_component_1.CardComponent key={index} id={`pricing-toggle-plan-${index}`} padding="xl" className={`h-full flex flex-col ${plan.highlighted ? 'border-primary border-2 shadow-xl scale-105' : ''}`}>
            {plan.highlighted && (<div className="absolute -top-3 right-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Popular
                </span>
              </div>)}

            <text_component_1.TextComponent id={`pricing-toggle-name-${index}`} content={plan.name} variant="heading3" align="center" color="primary" weight="bold" className="mb-2 text-center"/>

            <div className="text-center mb-4">
              <span className="text-5xl font-bold text-primary">
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-muted-foreground">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>

            <text_component_1.TextComponent id={`pricing-toggle-description-${index}`} content={plan.description} variant="body" className="text-center text-muted-foreground mb-6 text-sm"/>

            <div className="flex-1 space-y-2 mb-6">
              {plan.features.map((feature, fIndex) => (<div key={fIndex} className="flex items-center gap-2">
                  <lucide_react_1.Check className="h-4 w-4 text-primary flex-shrink-0"/>
                  <span className="text-sm">{feature}</span>
                </div>))}
            </div>

            <button_component_1.ButtonComponent id={`pricing-toggle-button-${index}`} text={plan.buttonText} href="#" variant={plan.highlighted ? "default" : "outline"} className="w-full"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.PricingToggleSwitch = PricingToggleSwitch;
// Export array for registry
exports.pricingBlocks = [
    {
        id: 'pricing-table-three-column',
        component: exports.PricingTableThreeColumn,
        name: 'Pricing Table (3 Columns)',
        category: 'Pricing',
        defaultProps: {
            title: "Choose Your Plan",
            subtitle: "Select the perfect plan for your needs",
            plans: [
                {
                    name: "Starter",
                    price: "$19",
                    period: "/month",
                    description: "Perfect for individuals and small teams",
                    features: [
                        { text: "Up to 5 projects", included: true },
                        { text: "10 GB storage", included: true },
                        { text: "Basic support", included: true },
                        { text: "Advanced analytics", included: false },
                        { text: "Custom integrations", included: false }
                    ],
                    buttonText: "Get Started",
                    buttonUrl: "#",
                    highlighted: false
                },
                {
                    name: "Professional",
                    price: "$49",
                    period: "/month",
                    description: "Ideal for growing businesses",
                    features: [
                        { text: "Unlimited projects", included: true },
                        { text: "100 GB storage", included: true },
                        { text: "Priority support", included: true },
                        { text: "Advanced analytics", included: true },
                        { text: "Custom integrations", included: false }
                    ],
                    buttonText: "Get Started",
                    buttonUrl: "#",
                    highlighted: true
                },
                {
                    name: "Enterprise",
                    price: "$99",
                    period: "/month",
                    description: "For large organizations",
                    features: [
                        { text: "Unlimited everything", included: true },
                        { text: "Unlimited storage", included: true },
                        { text: "24/7 dedicated support", included: true },
                        { text: "Advanced analytics", included: true },
                        { text: "Custom integrations", included: true }
                    ],
                    buttonText: "Contact Sales",
                    buttonUrl: "#",
                    highlighted: false
                }
            ]
        }
    },
    {
        id: 'pricing-comparison-detailed',
        component: exports.PricingComparisonDetailed,
        name: 'Pricing Comparison Table',
        category: 'Pricing',
        defaultProps: {
            title: "Compare Plans",
            plans: [
                { name: "Starter", price: "$19" },
                { name: "Pro", price: "$49" },
                { name: "Enterprise", price: "$99" }
            ],
            features: [
                {
                    category: "Core Features",
                    items: [
                        { feature: "Projects", values: ["5", "Unlimited", "Unlimited"] },
                        { feature: "Storage", values: ["10 GB", "100 GB", "Unlimited"] },
                        { feature: "Team Members", values: ["3", "10", "Unlimited"] }
                    ]
                },
                {
                    category: "Support",
                    items: [
                        { feature: "Email Support", values: [true, true, true] },
                        { feature: "Priority Support", values: [false, true, true] },
                        { feature: "24/7 Support", values: [false, false, true] }
                    ]
                },
                {
                    category: "Advanced",
                    items: [
                        { feature: "Analytics", values: [false, true, true] },
                        { feature: "API Access", values: [false, true, true] },
                        { feature: "Custom Integrations", values: [false, false, true] }
                    ]
                }
            ]
        }
    },
    {
        id: 'pricing-toggle-switch',
        component: exports.PricingToggleSwitch,
        name: 'Pricing with Monthly/Yearly Toggle',
        category: 'Pricing',
        defaultProps: {
            title: "Simple, Transparent Pricing",
            subtitle: "Save 20% with yearly billing",
            plans: [
                {
                    name: "Basic",
                    monthlyPrice: "$29",
                    yearlyPrice: "$279",
                    description: "Essential features for getting started",
                    features: [
                        "10 Projects",
                        "50 GB Storage",
                        "Email Support",
                        "Basic Analytics"
                    ],
                    buttonText: "Start Free Trial"
                },
                {
                    name: "Professional",
                    monthlyPrice: "$79",
                    yearlyPrice: "$759",
                    description: "Advanced features for professionals",
                    features: [
                        "Unlimited Projects",
                        "500 GB Storage",
                        "Priority Support",
                        "Advanced Analytics",
                        "API Access"
                    ],
                    buttonText: "Start Free Trial",
                    highlighted: true
                },
                {
                    name: "Business",
                    monthlyPrice: "$199",
                    yearlyPrice: "$1,899",
                    description: "Complete solution for teams",
                    features: [
                        "Unlimited Everything",
                        "Unlimited Storage",
                        "24/7 Dedicated Support",
                        "Custom Analytics",
                        "Custom Integrations",
                        "SLA Guarantee"
                    ],
                    buttonText: "Contact Sales"
                }
            ]
        }
    }
];
//# sourceMappingURL=pricing-blocks.js.map