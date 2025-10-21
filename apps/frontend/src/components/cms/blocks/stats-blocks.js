"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsBlocks = exports.StatsWithBackground = exports.StatsMinimal = exports.StatsCircularProgress = exports.StatsCounterAnimated = exports.StatsFourColumn = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const lucide_react_1 = require("lucide-react");
// Stats Block 1: Four Column Stats
const StatsFourColumn = ({ props }) => {
    const title = props?.title || "Our Impact in Numbers";
    const titleVariant = props?.titleVariant || "heading2";
    const titleAlign = props?.titleAlign || "center";
    const titleColor = props?.titleColor || "primary";
    const titleWeight = props?.titleWeight || "bold";
    const stats = props?.stats || [
        { value: "10K+", label: "Active Users", icon: "users" },
        { value: "50M+", label: "Revenue Generated", icon: "trendingUp" },
        { value: "99.9%", label: "Uptime Guarantee", icon: "award" },
        { value: "24/7", label: "Customer Support", icon: "target" }
    ];
    const iconMap = {
        users: lucide_react_1.Users,
        trendingUp: lucide_react_1.TrendingUp,
        award: lucide_react_1.Award,
        target: lucide_react_1.Target
    };
    return (<container_component_1.ContainerComponent id="stats-four-column-container" padding="xl" background="primary" className="py-16 text-primary-foreground">
      {/* Title */}
      <text_component_1.TextComponent id="stats-four-column-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="text-center mb-12 text-primary-foreground"/>

      {/* Stats Grid */}
      <grid_component_1.GridComponent id="stats-four-column-grid" columns={4} gap="lg">
        {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || lucide_react_1.Users;
            return (<div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <IconComponent className="h-10 w-10 text-primary-foreground/80"/>
              </div>

              {/* Value */}
              <text_component_1.TextComponent id={`stats-value-${index}`} content={stat.value} variant="heading1" align="center" color="primary" weight="bold" className="mb-2 text-primary-foreground font-bold"/>

              {/* Label */}
              <text_component_1.TextComponent id={`stats-label-${index}`} content={stat.label} variant="body" align="center" color="muted" className="text-primary-foreground/80"/>
            </div>);
        })}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.StatsFourColumn = StatsFourColumn;
// Stats Block 2: Counter Animated (Simple version)
const StatsCounterAnimated = ({ props }) => {
    const stats = props?.stats || [
        { value: "250+", label: "Projects Completed", suffix: "" },
        { value: "98%", label: "Client Satisfaction", suffix: "" },
        { value: "$5M", label: "Revenue Managed", suffix: "+" }
    ];
    return (<container_component_1.ContainerComponent id="stats-counter-container" padding="xl" background="muted" className="py-16">
      <grid_component_1.GridComponent id="stats-counter-grid" columns={3} gap="xl">
        {stats.map((stat, index) => (<div key={index} className="text-center">
            {/* Counter Value */}
            <div className="mb-3">
              <text_component_1.TextComponent id={`stats-counter-value-${index}`} content={stat.value} variant="heading1" align="center" color="primary" weight="bold" className="text-primary font-bold text-5xl"/>
            </div>

            {/* Label */}
            <text_component_1.TextComponent id={`stats-counter-label-${index}`} content={stat.label} variant="body" align="center" color="muted" weight="medium" className="text-muted-foreground font-medium"/>
          </div>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.StatsCounterAnimated = StatsCounterAnimated;
// Stats Block 3: Circular Progress (Visual representation)
const StatsCircularProgress = ({ props }) => {
    const title = props?.title || "Our Performance";
    const stats = props?.stats || [
        { value: 95, label: "Customer Satisfaction", color: "primary" },
        { value: 87, label: "Project Success Rate", color: "primary" },
        { value: 92, label: "On-Time Delivery", color: "primary" },
        { value: 99, label: "Client Retention", color: "primary" }
    ];
    return (<container_component_1.ContainerComponent id="stats-circular-container" padding="xl" background="none" className="py-16">
      {/* Title */}
      <text_component_1.TextComponent id="stats-circular-title" content={title} variant="heading2" align="center" color="primary" weight="bold" className="text-center mb-12"/>

      {/* Stats Grid */}
      <grid_component_1.GridComponent id="stats-circular-grid" columns={4} gap="lg">
        {stats.map((stat, index) => (<card_component_1.CardComponent key={index} id={`stats-circular-card-${index}`} padding="lg" className="text-center">
            {/* Circular Progress (Simple representation) */}
            <div className="relative mx-auto mb-4" style={{ width: '120px', height: '120px' }}>
              <svg className="transform -rotate-90" width="120" height="120">
                {/* Background Circle */}
                <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted"/>
                {/* Progress Circle */}
                <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 52}`} strokeDashoffset={`${2 * Math.PI * 52 * (1 - stat.value / 100)}`} className="text-primary" strokeLinecap="round"/>
              </svg>
              {/* Percentage Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{stat.value}%</span>
              </div>
            </div>

            {/* Label */}
            <text_component_1.TextComponent id={`stats-circular-label-${index}`} content={stat.label} variant="body" align="center" color="primary" weight="medium" className="font-medium"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.StatsCircularProgress = StatsCircularProgress;
// Stats Block 4: Minimal Stats
const StatsMinimal = ({ props }) => {
    const stats = props?.stats || [
        { value: "500+", label: "Companies Trust Us" },
        { value: "1M+", label: "Users Worldwide" },
        { value: "50+", label: "Countries Served" }
    ];
    return (<container_component_1.ContainerComponent id="stats-minimal-container" padding="xl" background="none" className="py-12">
      <div className="max-w-4xl mx-auto">
        <grid_component_1.GridComponent id="stats-minimal-grid" columns={3} gap="lg">
          {stats.map((stat, index) => (<div key={index} className="text-center border-l border-border pl-6 first:border-l-0 first:pl-0">
              {/* Value */}
              <text_component_1.TextComponent id={`stats-minimal-value-${index}`} content={stat.value} variant="heading2" align="center" color="primary" weight="bold" className="mb-2 text-foreground font-bold"/>

              {/* Label */}
              <text_component_1.TextComponent id={`stats-minimal-label-${index}`} content={stat.label} variant="body" align="center" color="muted" className="text-muted-foreground text-sm"/>
            </div>))}
        </grid_component_1.GridComponent>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.StatsMinimal = StatsMinimal;
// Stats Block 5: Stats with Background
const StatsWithBackground = ({ props }) => {
    const title = props?.title || "Trusted by Industry Leaders";
    const description = props?.description || "Join thousands of companies already using our platform";
    const stats = props?.stats || [
        { value: "15K+", label: "Active Projects" },
        { value: "$100M+", label: "Deals Closed" },
        { value: "4.9/5", label: "Average Rating" }
    ];
    return (<container_component_1.ContainerComponent id="stats-background-container" padding="xl" background="muted" className="py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <text_component_1.TextComponent id="stats-background-title" content={title} variant="heading2" align="center" color="primary" weight="bold" className="mb-3"/>
        <text_component_1.TextComponent id="stats-background-description" content={description} variant="body" align="center" color="muted" className="text-muted-foreground mb-12"/>

        {/* Stats */}
        <grid_component_1.GridComponent id="stats-background-grid" columns={3} gap="xl">
          {stats.map((stat, index) => (<card_component_1.CardComponent key={index} id={`stats-background-card-${index}`} padding="lg" className="bg-background hover:shadow-lg transition-shadow">
              {/* Value */}
              <text_component_1.TextComponent id={`stats-background-value-${index}`} content={stat.value} variant="heading1" align="center" color="primary" weight="bold" className="mb-2 text-primary font-bold"/>

              {/* Label */}
              <text_component_1.TextComponent id={`stats-background-label-${index}`} content={stat.label} variant="body" align="center" color="muted" className="text-muted-foreground"/>
            </card_component_1.CardComponent>))}
        </grid_component_1.GridComponent>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.StatsWithBackground = StatsWithBackground;
// Export array for registry
exports.statsBlocks = [
    {
        id: 'stats-four-column',
        component: exports.StatsFourColumn,
        name: 'Stats Four Column',
        category: 'Stats',
        defaultProps: {
            title: "Our Impact in Numbers",
            stats: [
                { value: "10K+", label: "Active Users", icon: "users" },
                { value: "50M+", label: "Revenue Generated", icon: "trendingUp" },
                { value: "99.9%", label: "Uptime Guarantee", icon: "award" },
                { value: "24/7", label: "Customer Support", icon: "target" }
            ]
        }
    },
    {
        id: 'stats-counter-animated',
        component: exports.StatsCounterAnimated,
        name: 'Stats Counter',
        category: 'Stats',
        defaultProps: {
            stats: [
                { value: "250+", label: "Projects Completed", suffix: "" },
                { value: "98%", label: "Client Satisfaction", suffix: "" },
                { value: "$5M", label: "Revenue Managed", suffix: "+" }
            ]
        }
    },
    {
        id: 'stats-circular-progress',
        component: exports.StatsCircularProgress,
        name: 'Stats Circular Progress',
        category: 'Stats',
        defaultProps: {
            title: "Our Performance",
            stats: [
                { value: 95, label: "Customer Satisfaction", color: "primary" },
                { value: 87, label: "Project Success Rate", color: "primary" },
                { value: 92, label: "On-Time Delivery", color: "primary" },
                { value: 99, label: "Client Retention", color: "primary" }
            ]
        }
    },
    {
        id: 'stats-minimal',
        component: exports.StatsMinimal,
        name: 'Stats Minimal',
        category: 'Stats',
        defaultProps: {
            stats: [
                { value: "500+", label: "Companies Trust Us" },
                { value: "1M+", label: "Users Worldwide" },
                { value: "50+", label: "Countries Served" }
            ]
        }
    },
    {
        id: 'stats-with-background',
        component: exports.StatsWithBackground,
        name: 'Stats with Background',
        category: 'Stats',
        defaultProps: {
            title: "Trusted by Industry Leaders",
            description: "Join thousands of companies already using our platform",
            stats: [
                { value: "15K+", label: "Active Projects" },
                { value: "$100M+", label: "Deals Closed" },
                { value: "4.9/5", label: "Average Rating" }
            ]
        }
    }
];
//# sourceMappingURL=stats-blocks.js.map