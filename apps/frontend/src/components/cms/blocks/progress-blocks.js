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
exports.progressBlocks = exports.ProgressCircular = exports.ProgressBarsStacked = exports.ProgressBarSingle = void 0;
const react_1 = __importStar(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
// Progress Block 1: Single Progress Bar
const ProgressBarSingle = ({ props }) => {
    const [progress, setProgress] = (0, react_1.useState)(0);
    const title = props?.title || "Project Completion";
    const targetProgress = props?.progress || 75;
    const showPercentage = props?.showPercentage !== false;
    const color = props?.color || "primary";
    const size = props?.size || "md";
    const animated = props?.animated !== false;
    // Animate on mount
    (0, react_1.useEffect)(() => {
        if (animated) {
            const timer = setTimeout(() => {
                setProgress(targetProgress);
            }, 100);
            return () => clearTimeout(timer);
        }
        else {
            setProgress(targetProgress);
        }
    }, [targetProgress, animated]);
    const sizeClasses = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4'
    };
    const colorClasses = {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-destructive',
        info: 'bg-info'
    };
    return (<div className="w-full max-w-md">
      {/* Title and Percentage */}
      <div className="flex items-center justify-between mb-2">
        <text_component_1.TextComponent id="progress-title" content={title} variant="body" className="font-medium text-sm"/>
        {showPercentage && (<span className="text-sm font-semibold text-muted-foreground">
            {progress}%
          </span>)}
      </div>

      {/* Progress Bar */}
      <div className={`w-full ${sizeClasses[size]} bg-muted rounded-full overflow-hidden`}>
        <div className={`h-full ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${progress}%` }}/>
      </div>
    </div>);
};
exports.ProgressBarSingle = ProgressBarSingle;
// Progress Block 2: Stacked Progress Bars (Skills/Stats)
const ProgressBarsStacked = ({ props }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const title = props?.title || "Our Skills";
    const subtitle = props?.subtitle || "What we're great at";
    const skills = props?.skills || [
        { name: "Web Development", progress: 95, color: "primary" },
        { name: "UI/UX Design", progress: 88, color: "success" },
        { name: "Mobile Apps", progress: 82, color: "info" },
        { name: "SEO & Marketing", progress: 90, color: "warning" },
        { name: "Cloud Infrastructure", progress: 85, color: "danger" }
    ];
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);
    const colorClasses = {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-destructive',
        info: 'bg-info'
    };
    return (<container_component_1.ContainerComponent id="progress-stacked-container" padding="xl" background="none" className="py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <text_component_1.TextComponent id="progress-stacked-title" content={title} variant="heading2" className="mb-3"/>
          <text_component_1.TextComponent id="progress-stacked-subtitle" content={subtitle} variant="body" className="text-muted-foreground"/>
        </div>

        {/* Progress Bars */}
        <div className="space-y-6">
          {skills.map((skill, index) => (<div key={index}>
              {/* Skill Name and Percentage */}
              <div className="flex items-center justify-between mb-2">
                <text_component_1.TextComponent id={`skill-name-${index}`} content={skill.name} variant="body" className="font-medium"/>
                <span className="text-sm font-semibold text-muted-foreground">
                  {skill.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${colorClasses[skill.color]} rounded-full transition-all duration-1000 ease-out`} style={{
                width: isVisible ? `${skill.progress}%` : '0%',
                transitionDelay: `${index * 100}ms`
            }}/>
              </div>
            </div>))}
        </div>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.ProgressBarsStacked = ProgressBarsStacked;
// Progress Block 3: Circular Progress (Stats Grid)
const ProgressCircular = ({ props }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const title = props?.title || "Our Achievements";
    const subtitle = props?.subtitle || "Delivering excellence across all metrics";
    const stats = props?.stats || [
        {
            label: "Client Satisfaction",
            progress: 98,
            color: "primary",
            icon: "😊"
        },
        {
            label: "Project Success Rate",
            progress: 95,
            color: "success",
            icon: "🎯"
        },
        {
            label: "On-Time Delivery",
            progress: 92,
            color: "info",
            icon: "⏱️"
        },
        {
            label: "Team Productivity",
            progress: 88,
            color: "warning",
            icon: "⚡"
        }
    ];
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);
    const colorClasses = {
        primary: 'stroke-primary',
        success: 'stroke-green-500',
        warning: 'stroke-yellow-500',
        danger: 'stroke-red-500',
        info: 'stroke-blue-500'
    };
    const CircularProgress = ({ progress, color, delay }) => {
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (isVisible ? (progress / 100) * circumference : 0);
        return (<svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle cx="50" cy="50" r={radius} className="stroke-muted" strokeWidth="8" fill="none"/>
        
        {/* Progress Circle */}
        <circle cx="50" cy="50" r={radius} className={colorClasses[color]} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{
                transition: 'stroke-dashoffset 1s ease-out',
                transitionDelay: `${delay}ms`
            }}/>
      </svg>);
    };
    return (<container_component_1.ContainerComponent id="progress-circular-container" padding="xl" background="muted" className="py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <text_component_1.TextComponent id="progress-circular-title" content={title} variant="heading2" className="mb-3"/>
        <text_component_1.TextComponent id="progress-circular-subtitle" content={subtitle} variant="body" className="text-muted-foreground"/>
      </div>

      {/* Stats Grid */}
      <grid_component_1.GridComponent id="progress-circular-grid" columns={4} gap="lg">
        {stats.map((stat, index) => (<card_component_1.CardComponent key={index} id={`progress-stat-${index}`} padding="lg" className="text-center">
            {/* Circular Progress */}
            <div className="relative inline-block mb-4">
              <CircularProgress progress={stat.progress} color={stat.color} delay={index * 150}/>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl mb-1">{stat.icon}</span>
                <span className="text-2xl font-bold text-primary">
                  {stat.progress}%
                </span>
              </div>
            </div>

            {/* Label */}
            <text_component_1.TextComponent id={`progress-label-${index}`} content={stat.label} variant="body" className="font-medium"/>
          </card_component_1.CardComponent>))}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.ProgressCircular = ProgressCircular;
// Export array for registry
exports.progressBlocks = [
    {
        id: 'progress-bar-single',
        component: exports.ProgressBarSingle,
        name: 'Progress Bar (Single)',
        category: 'Progress',
        defaultProps: {
            title: "Project Completion",
            progress: 75,
            showPercentage: true,
            color: "primary",
            size: "md",
            animated: true
        }
    },
    {
        id: 'progress-bars-stacked',
        component: exports.ProgressBarsStacked,
        name: 'Progress Bars (Stacked Skills)',
        category: 'Progress',
        defaultProps: {
            title: "Our Skills",
            subtitle: "What we're great at",
            skills: [
                { name: "Web Development", progress: 95, color: "primary" },
                { name: "UI/UX Design", progress: 88, color: "success" },
                { name: "Mobile Apps", progress: 82, color: "info" },
                { name: "SEO & Marketing", progress: 90, color: "warning" },
                { name: "Cloud Infrastructure", progress: 85, color: "danger" }
            ]
        }
    },
    {
        id: 'progress-circular',
        component: exports.ProgressCircular,
        name: 'Circular Progress (Stats Grid)',
        category: 'Progress',
        defaultProps: {
            title: "Our Achievements",
            subtitle: "Delivering excellence across all metrics",
            stats: [
                {
                    label: "Client Satisfaction",
                    progress: 98,
                    color: "primary",
                    icon: "😊"
                },
                {
                    label: "Project Success Rate",
                    progress: 95,
                    color: "success",
                    icon: "🎯"
                },
                {
                    label: "On-Time Delivery",
                    progress: 92,
                    color: "info",
                    icon: "⏱️"
                },
                {
                    label: "Team Productivity",
                    progress: 88,
                    color: "warning",
                    icon: "⚡"
                }
            ]
        }
    }
];
//# sourceMappingURL=progress-blocks.js.map