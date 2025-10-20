'use client';

import React, { useState, useEffect } from 'react';
import { ContainerComponent } from '@/components/cms/container-component';
import { TextComponent } from '@/components/cms/text-component';
import { GridComponent } from '@/components/cms/grid-component';
import { CardComponent } from '@/components/cms/card-component';

// Progress Block 1: Single Progress Bar
export const ProgressBarSingle: React.FC<{ props?: any }> = ({ props }) => {
  const [progress, setProgress] = useState(0);
  
  const title = props?.title || "Project Completion";
  const targetProgress = props?.progress || 75;
  const showPercentage = props?.showPercentage !== false;
  const color = props?.color || "primary";
  const size = props?.size || "md";
  const animated = props?.animated !== false;

  // Animate on mount
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setProgress(targetProgress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(targetProgress);
    }
  }, [targetProgress, animated]);

  const sizeClasses: Record<string, string> = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses: Record<string, string> = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive',
    info: 'bg-info'
  };

  return (
    <div className="w-full max-w-md">
      {/* Title and Percentage */}
      <div className="flex items-center justify-between mb-2">
        <TextComponent 
          id="progress-title"
          content={title}
          variant="body" 
          className="font-medium text-sm" 
        />
        {showPercentage && (
          <span className="text-sm font-semibold text-muted-foreground">
            {progress}%
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className={`w-full ${sizeClasses[size]} bg-muted rounded-full overflow-hidden`}>
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Progress Block 2: Stacked Progress Bars (Skills/Stats)
export const ProgressBarsStacked: React.FC<{ props?: any }> = ({ props }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const title = props?.title || "Our Skills";
  const subtitle = props?.subtitle || "What we're great at";
  const skills = props?.skills || [
    { name: "Web Development", progress: 95, color: "primary" },
    { name: "UI/UX Design", progress: 88, color: "success" },
    { name: "Mobile Apps", progress: 82, color: "info" },
    { name: "SEO & Marketing", progress: 90, color: "warning" },
    { name: "Cloud Infrastructure", progress: 85, color: "danger" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const colorClasses: Record<string, string> = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive',
    info: 'bg-info'
  };

  return (
    <ContainerComponent 
      id="progress-stacked-container"
      padding="xl" 
      background="none"
      className="py-16"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <TextComponent 
            id="progress-stacked-title"
            content={title}
            variant="heading2" 
            className="mb-3" 
          />
          <TextComponent 
            id="progress-stacked-subtitle"
            content={subtitle}
            variant="body" 
            className="text-muted-foreground" 
          />
        </div>

        {/* Progress Bars */}
        <div className="space-y-6">
          {skills.map((skill: any, index: number) => (
            <div key={index}>
              {/* Skill Name and Percentage */}
              <div className="flex items-center justify-between mb-2">
                <TextComponent 
                  id={`skill-name-${index}`}
                  content={skill.name}
                  variant="body" 
                  className="font-medium" 
                />
                <span className="text-sm font-semibold text-muted-foreground">
                  {skill.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${colorClasses[skill.color]} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: isVisible ? `${skill.progress}%` : '0%',
                    transitionDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerComponent>
  );
};

// Progress Block 3: Circular Progress (Stats Grid)
export const ProgressCircular: React.FC<{ props?: any }> = ({ props }) => {
  const [isVisible, setIsVisible] = useState(false);
  
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const colorClasses: Record<string, string> = {
    primary: 'stroke-primary',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    danger: 'stroke-red-500',
    info: 'stroke-blue-500'
  };

  const CircularProgress = ({ progress, color, delay }: any) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (isVisible ? (progress / 100) * circumference : 0);

    return (
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-muted"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={colorClasses[color]}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
            transitionDelay: `${delay}ms`
          }}
        />
      </svg>
    );
  };

  return (
    <ContainerComponent 
      id="progress-circular-container"
      padding="xl" 
      background="muted"
      className="py-16"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <TextComponent 
          id="progress-circular-title"
          content={title}
          variant="heading2" 
          className="mb-3" 
        />
        <TextComponent 
          id="progress-circular-subtitle"
          content={subtitle}
          variant="body" 
          className="text-muted-foreground" 
        />
      </div>

      {/* Stats Grid */}
      <GridComponent 
        id="progress-circular-grid"
        columns={4} 
        gap="lg"
      >
        {stats.map((stat: any, index: number) => (
          <CardComponent 
            key={index}
            id={`progress-stat-${index}`}
            padding="lg"
            className="text-center"
          >
            {/* Circular Progress */}
            <div className="relative inline-block mb-4">
              <CircularProgress 
                progress={stat.progress} 
                color={stat.color}
                delay={index * 150}
              />
              
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl mb-1">{stat.icon}</span>
                <span className="text-2xl font-bold text-primary">
                  {stat.progress}%
                </span>
              </div>
            </div>

            {/* Label */}
            <TextComponent 
              id={`progress-label-${index}`}
              content={stat.label}
              variant="body" 
              className="font-medium" 
            />
          </CardComponent>
        ))}
      </GridComponent>
    </ContainerComponent>
  );
};

// Export array for registry
export const progressBlocks = [
  {
    id: 'progress-bar-single',
    component: ProgressBarSingle,
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
    component: ProgressBarsStacked,
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
    component: ProgressCircular,
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
