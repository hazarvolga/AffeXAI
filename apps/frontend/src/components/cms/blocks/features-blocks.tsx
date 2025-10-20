'use client';

import React from 'react';
import { ContainerComponent } from '@/components/cms/container-component';
import { TextComponent } from '@/components/cms/text-component';
import { GridComponent } from '@/components/cms/grid-component';
import { CardComponent } from '@/components/cms/card-component';
import { ButtonComponent } from '@/components/cms/button-component';
import { 
  Zap, Shield, Users, Heart, Star, TrendingUp, 
  CheckCircle, Award, Target, Rocket, Lock, Globe,
  Smartphone, Code, Database, Cloud, Settings, Mail
} from 'lucide-react';

// Icon Map for dynamic icon selection
const iconMap: Record<string, any> = {
  zap: Zap,
  shield: Shield,
  users: Users,
  heart: Heart,
  star: Star,
  trendingUp: TrendingUp,
  checkCircle: CheckCircle,
  award: Award,
  target: Target,
  rocket: Rocket,
  lock: Lock,
  globe: Globe,
  smartphone: Smartphone,
  code: Code,
  database: Database,
  cloud: Cloud,
  settings: Settings,
  mail: Mail
};

// Feature Block 1: Single Feature Centered
export const FeatureSingleCentered: React.FC<{ props?: any }> = ({ props }) => {
  const icon = props?.icon || "rocket";
  const title = props?.title || "Fast & Reliable";
  const titleVariant = props?.titleVariant || "heading3";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const description = props?.description || "Experience lightning-fast performance and rock-solid reliability with our cutting-edge technology.";
  const descriptionVariant = props?.descriptionVariant || "body";
  const descriptionAlign = props?.descriptionAlign || "center";
  const descriptionColor = props?.descriptionColor || "secondary";
  const descriptionWeight = props?.descriptionWeight || "normal";
  
  const iconColor = props?.iconColor || "primary";
  const iconSize = props?.iconSize || 64;
  
  const IconComponent = iconMap[icon] || Rocket;

  return (
    <ContainerComponent 
      id="features-single-container"
      padding="xl" 
      background="none"
      className="py-12"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className={`flex justify-center mb-6`}>
          <div className={`p-6 rounded-full bg-${iconColor}/10 text-${iconColor}`}>
            <IconComponent className={`h-${iconSize/4} w-${iconSize/4}`} />
          </div>
        </div>

        {/* Title */}
        <TextComponent 
          id="features-single-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-4" 
        />

        {/* Description */}
        <TextComponent 
          id="features-single-description"
          content={description}
          variant={descriptionVariant}
          align={descriptionAlign}
          color={descriptionColor}
          weight={descriptionWeight}
          className="text-muted-foreground" 
        />
      </div>
    </ContainerComponent>
  );
};

// Feature Block 2: Feature Box Centered (with CTA)
export const FeatureBoxCentered: React.FC<{ props?: any }> = ({ props }) => {
  const icon = props?.icon || "shield";
  const title = props?.title || "Secure & Protected";
  const titleVariant = props?.titleVariant || "heading3";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const description = props?.description || "Your data is protected with enterprise-grade security and encryption.";
  const descriptionVariant = props?.descriptionVariant || "body";
  const descriptionAlign = props?.descriptionAlign || "center";
  const descriptionColor = props?.descriptionColor || "secondary";
  const descriptionWeight = props?.descriptionWeight || "normal";
  
  const buttonText = props?.buttonText || "Learn More";
  const buttonUrl = props?.buttonUrl || "#";
  const buttonTarget = props?.buttonTarget || "_self";
  
  const IconComponent = iconMap[icon] || Shield;

  return (
    <ContainerComponent 
      id="features-box-centered-container"
      padding="xl" 
      background="muted"
      className="py-12"
    >
      <div className="max-w-xl mx-auto">
        <CardComponent 
          id="features-box-centered-card"
          padding="xl"
          className="text-center"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary">
              <IconComponent className="h-12 w-12" />
            </div>
          </div>

          {/* Title */}
          <TextComponent 
            id="features-box-centered-title"
            content={title}
            variant={titleVariant}
            align={titleAlign}
            color={titleColor}
            weight={titleWeight}
            className="mb-4" 
          />

          {/* Description */}
          <TextComponent 
            id="features-box-centered-description"
            content={description}
            variant={descriptionVariant}
            align={descriptionAlign}
            color={descriptionColor}
            weight={descriptionWeight}
            className="text-muted-foreground mb-6" 
          />

          {/* Button */}
          <ButtonComponent 
            id="features-box-centered-button"
            text={buttonText}
            href={buttonUrl}
            target={buttonTarget}
            variant="default"
          />
        </CardComponent>
      </div>
    </ContainerComponent>
  );
};

// Feature Block 3: Feature Box Left Aligned
export const FeatureBoxLeft: React.FC<{ props?: any }> = ({ props }) => {
  const icon = props?.icon || "users";
  const title = props?.title || "Team Collaboration";
  const titleVariant = props?.titleVariant || "heading3";
  const titleAlign = props?.titleAlign || "left";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const description = props?.description || "Work together seamlessly with powerful collaboration tools designed for modern teams.";
  const descriptionVariant = props?.descriptionVariant || "body";
  const descriptionAlign = props?.descriptionAlign || "left";
  const descriptionColor = props?.descriptionColor || "secondary";
  const descriptionWeight = props?.descriptionWeight || "normal";
  
  const IconComponent = iconMap[icon] || Users;

  return (
    <ContainerComponent 
      id="features-box-left-container"
      padding="xl" 
      background="none"
      className="py-12"
    >
      <div className="max-w-3xl mx-auto">
        <CardComponent 
          id="features-box-left-card"
          padding="lg"
          className="flex gap-6"
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="p-4 rounded-xl bg-primary/10 text-primary">
              <IconComponent className="h-10 w-10" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <TextComponent 
              id="features-box-left-title"
              content={title}
              variant={titleVariant}
              align={titleAlign}
              color={titleColor}
              weight={titleWeight}
              className="mb-3" 
            />
            <TextComponent 
              id="features-box-left-description"
              content={description}
              variant={descriptionVariant}
              align={descriptionAlign}
              color={descriptionColor}
              weight={descriptionWeight}
              className="text-muted-foreground" 
            />
          </div>
        </CardComponent>
      </div>
    </ContainerComponent>
  );
};

// Feature Block 4: Features Grid (3 columns with icons)
export const FeaturesIconGrid: React.FC<{ props?: any }> = ({ props }) => {
  const title = props?.title || "Why Choose Us";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const subtitle = props?.subtitle || "Everything you need to succeed";
  const subtitleVariant = props?.subtitleVariant || "body";
  const subtitleAlign = props?.subtitleAlign || "center";
  const subtitleColor = props?.subtitleColor || "secondary";
  const subtitleWeight = props?.subtitleWeight || "normal";
  
  const features = props?.features || [
    {
      icon: "zap",
      title: "Lightning Fast",
      description: "Optimized for speed and performance"
    },
    {
      icon: "shield",
      title: "Secure",
      description: "Bank-level security and encryption"
    },
    {
      icon: "heart",
      title: "Easy to Use",
      description: "Intuitive interface, no learning curve"
    },
    {
      icon: "award",
      title: "Award Winning",
      description: "Recognized by industry leaders"
    },
    {
      icon: "globe",
      title: "Global Reach",
      description: "Available worldwide, 24/7 support"
    },
    {
      icon: "trendingUp",
      title: "Growth Focused",
      description: "Tools to scale your business"
    }
  ];

  return (
    <ContainerComponent 
      id="features-feature-grid-container"
      padding="xl" 
      background="muted"
      className="py-16"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <TextComponent 
          id="features-feature-grid-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-3" 
        />
        <TextComponent 
          id="features-feature-grid-subtitle"
          content={subtitle}
          variant={subtitleVariant}
          align={subtitleAlign}
          color={subtitleColor}
          weight={subtitleWeight}
          className="text-muted-foreground" 
        />
      </div>

      {/* Features Grid */}
      <GridComponent 
        id="features-feature-grid"
        columns={3} 
        gap="lg"
      >
        {features.map((feature: any, index: number) => {
          const IconComponent = iconMap[feature.icon] || Star;
          return (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary">
                  <IconComponent className="h-8 w-8" />
                </div>
              </div>

              {/* Title */}
              <TextComponent 
                id={`features-feature-title-${index}`}
                content={feature.title}
                variant="heading3"
                align="center"
                color="primary"
                weight="semibold"
                className="mb-2 text-lg" 
              />

              {/* Description */}
              <TextComponent 
                id={`features-feature-description-${index}`}
                content={feature.description}
                variant="body"
                align="center"
                color="muted"
                className="text-muted-foreground text-sm" 
              />
            </div>
          );
        })}
      </GridComponent>
    </ContainerComponent>
  );
};

// Feature Block 5: Features List with Icon Bullets
export const FeaturesListWithIcons: React.FC<{ props?: any }> = ({ props }) => {
  const title = props?.title || "What You Get";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "left";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const items = props?.items || [
    { icon: "checkCircle", text: "Unlimited projects and team members" },
    { icon: "checkCircle", text: "Advanced analytics and reporting" },
    { icon: "checkCircle", text: "Priority customer support 24/7" },
    { icon: "checkCircle", text: "Custom integrations and API access" },
    { icon: "checkCircle", text: "Regular updates and new features" }
  ];

  return (
    <ContainerComponent 
      id="features-list-bullets-container"
      padding="xl" 
      background="none"
      className="py-12"
    >
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <TextComponent 
          id="features-list-bullets-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-8" 
        />

        {/* List */}
        <div className="space-y-4">
          {items.map((item: any, index: number) => {
            const IconComponent = iconMap[item.icon] || CheckCircle;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <TextComponent 
                  id={`features-list-item-${index}`}
                  content={item.text}
                  variant="body"
                  align="left"
                  color="primary"
                  className="flex-1" 
                />
              </div>
            );
          })}
        </div>
      </div>
    </ContainerComponent>
  );
};

// Feature Block 6: Services Box Stacked (2 columns)
export const FeaturesServicesTwoColumn: React.FC<{ props?: any }> = ({ props }) => {
  const title = props?.title || "Our Services";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const services = props?.services || [
    {
      icon: "code",
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies."
    },
    {
      icon: "smartphone",
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android."
    },
    {
      icon: "cloud",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment services."
    },
    {
      icon: "database",
      title: "Data Management",
      description: "Robust database design and data analytics solutions."
    }
  ];

  return (
    <ContainerComponent 
      id="features-box-stacked-container"
      padding="xl" 
      background="none"
      className="py-16"
    >
      {/* Title */}
      <TextComponent 
        id="features-box-stacked-title"
        content={title}
        variant={titleVariant}
        align={titleAlign}
        color={titleColor}
        weight={titleWeight}
        className="text-center mb-12" 
      />

      {/* Services Grid */}
      <GridComponent 
        id="features-box-stacked-grid"
        columns={2} 
        gap="lg"
      >
        {services.map((service: any, index: number) => {
          const IconComponent = iconMap[service.icon] || Settings;
          return (
            <CardComponent 
              key={index}
              id={`features-box-stacked-card-${index}`}
              padding="lg"
              className="hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                  <IconComponent className="h-8 w-8" />
                </div>
              </div>

              {/* Title */}
              <TextComponent 
                id={`features-box-stacked-title-${index}`}
                content={service.title}
                variant="heading3"
                align="left"
                color="primary"
                weight="semibold"
                className="mb-3 text-lg" 
              />

              {/* Description */}
              <TextComponent 
                id={`features-box-stacked-description-${index}`}
                content={service.description}
                variant="body"
                align="left"
                color="muted"
                className="text-muted-foreground" 
              />
            </CardComponent>
          );
        })}
      </GridComponent>
    </ContainerComponent>
  );
};

// Export array for registry
export const featuresBlocks = [
  {
    id: 'features-single-centered',
    component: FeatureSingleCentered,
    name: 'Feature Single Centered',
    category: 'Features',
    defaultProps: {
      icon: "rocket",
      title: "Fast & Reliable",
      description: "Experience lightning-fast performance and rock-solid reliability with our cutting-edge technology.",
      iconColor: "primary",
      iconSize: 64
    }
  },
  {
    id: 'features-box-centered',
    component: FeatureBoxCentered,
    name: 'Feature Box with CTA',
    category: 'Features',
    defaultProps: {
      icon: "shield",
      title: "Secure & Protected",
      description: "Your data is protected with enterprise-grade security and encryption.",
      buttonText: "Learn More",
      buttonUrl: "#"
    }
  },
  {
    id: 'features-box-left',
    component: FeatureBoxLeft,
    name: 'Feature Box Left Aligned',
    category: 'Features',
    defaultProps: {
      icon: "users",
      title: "Team Collaboration",
      description: "Work together seamlessly with powerful collaboration tools designed for modern teams."
    }
  },
  {
    id: 'features-icon-grid-three',
    component: FeaturesIconGrid,
    name: 'Features Grid (3 Columns)',
    category: 'Features',
    defaultProps: {
      title: "Why Choose Us",
      subtitle: "Everything you need to succeed",
      features: [
        { icon: "zap", title: "Lightning Fast", description: "Optimized for speed and performance" },
        { icon: "shield", title: "Secure", description: "Bank-level security and encryption" },
        { icon: "heart", title: "Easy to Use", description: "Intuitive interface, no learning curve" },
        { icon: "award", title: "Award Winning", description: "Recognized by industry leaders" },
        { icon: "globe", title: "Global Reach", description: "Available worldwide, 24/7 support" },
        { icon: "trendingUp", title: "Growth Focused", description: "Tools to scale your business" }
      ]
    }
  },
  {
    id: 'features-list-with-icons',
    component: FeaturesListWithIcons,
    name: 'Features List with Icons',
    category: 'Features',
    defaultProps: {
      title: "What You Get",
      items: [
        { icon: "checkCircle", text: "Unlimited projects and team members" },
        { icon: "checkCircle", text: "Advanced analytics and reporting" },
        { icon: "checkCircle", text: "Priority customer support 24/7" },
        { icon: "checkCircle", text: "Custom integrations and API access" },
        { icon: "checkCircle", text: "Regular updates and new features" }
      ]
    }
  },
  {
    id: 'features-services-two-column',
    component: FeaturesServicesTwoColumn,
    name: 'Services Grid (2 Columns)',
    category: 'Features',
    defaultProps: {
      title: "Our Services",
      services: [
        { icon: "code", title: "Web Development", description: "Custom websites and web applications built with modern technologies." },
        { icon: "smartphone", title: "Mobile Apps", description: "Native and cross-platform mobile applications for iOS and Android." },
        { icon: "cloud", title: "Cloud Solutions", description: "Scalable cloud infrastructure and deployment services." },
        { icon: "database", title: "Data Management", description: "Robust database design and data analytics solutions." }
      ]
    }
  }
];
