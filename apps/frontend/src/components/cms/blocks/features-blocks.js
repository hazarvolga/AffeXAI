"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuresBlocks = exports.FeaturesServicesTwoColumn = exports.FeaturesListWithIcons = exports.FeaturesIconGrid = exports.FeatureBoxLeft = exports.FeatureBoxCentered = exports.FeatureSingleCentered = void 0;
const react_1 = __importDefault(require("react"));
const container_component_1 = require("@/components/cms/container-component");
const text_component_1 = require("@/components/cms/text-component");
const grid_component_1 = require("@/components/cms/grid-component");
const card_component_1 = require("@/components/cms/card-component");
const button_component_1 = require("@/components/cms/button-component");
const lucide_react_1 = require("lucide-react");
// Icon Map for dynamic icon selection
const iconMap = {
    zap: lucide_react_1.Zap,
    shield: lucide_react_1.Shield,
    users: lucide_react_1.Users,
    heart: lucide_react_1.Heart,
    star: lucide_react_1.Star,
    trendingUp: lucide_react_1.TrendingUp,
    checkCircle: lucide_react_1.CheckCircle,
    award: lucide_react_1.Award,
    target: lucide_react_1.Target,
    rocket: lucide_react_1.Rocket,
    lock: lucide_react_1.Lock,
    globe: lucide_react_1.Globe,
    smartphone: lucide_react_1.Smartphone,
    code: lucide_react_1.Code,
    database: lucide_react_1.Database,
    cloud: lucide_react_1.Cloud,
    settings: lucide_react_1.Settings,
    mail: lucide_react_1.Mail
};
// Feature Block 1: Single Feature Centered
const FeatureSingleCentered = ({ props }) => {
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
    const IconComponent = iconMap[icon] || lucide_react_1.Rocket;
    return (<container_component_1.ContainerComponent id="features-single-container" padding="xl" background="none" className="py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className={`flex justify-center mb-6`}>
          <div className={`p-6 rounded-full bg-${iconColor}/10 text-${iconColor}`}>
            <IconComponent className={`h-${iconSize / 4} w-${iconSize / 4}`}/>
          </div>
        </div>

        {/* Title */}
        <text_component_1.TextComponent id="features-single-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-4"/>

        {/* Description */}
        <text_component_1.TextComponent id="features-single-description" content={description} variant={descriptionVariant} align={descriptionAlign} color={descriptionColor} weight={descriptionWeight} className="text-muted-foreground"/>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FeatureSingleCentered = FeatureSingleCentered;
// Feature Block 2: Feature Box Centered (with CTA)
const FeatureBoxCentered = ({ props }) => {
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
    const IconComponent = iconMap[icon] || lucide_react_1.Shield;
    return (<container_component_1.ContainerComponent id="features-box-centered-container" padding="xl" background="muted" className="py-12">
      <div className="max-w-xl mx-auto">
        <card_component_1.CardComponent id="features-box-centered-card" padding="xl" className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary">
              <IconComponent className="h-12 w-12"/>
            </div>
          </div>

          {/* Title */}
          <text_component_1.TextComponent id="features-box-centered-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-4"/>

          {/* Description */}
          <text_component_1.TextComponent id="features-box-centered-description" content={description} variant={descriptionVariant} align={descriptionAlign} color={descriptionColor} weight={descriptionWeight} className="text-muted-foreground mb-6"/>

          {/* Button */}
          <button_component_1.ButtonComponent id="features-box-centered-button" text={buttonText} href={buttonUrl} target={buttonTarget} variant="default"/>
        </card_component_1.CardComponent>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FeatureBoxCentered = FeatureBoxCentered;
// Feature Block 3: Feature Box Left Aligned
const FeatureBoxLeft = ({ props }) => {
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
    const IconComponent = iconMap[icon] || lucide_react_1.Users;
    return (<container_component_1.ContainerComponent id="features-box-left-container" padding="xl" background="none" className="py-12">
      <div className="max-w-3xl mx-auto">
        <card_component_1.CardComponent id="features-box-left-card" padding="lg" className="flex gap-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="p-4 rounded-xl bg-primary/10 text-primary">
              <IconComponent className="h-10 w-10"/>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <text_component_1.TextComponent id="features-box-left-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-3"/>
            <text_component_1.TextComponent id="features-box-left-description" content={description} variant={descriptionVariant} align={descriptionAlign} color={descriptionColor} weight={descriptionWeight} className="text-muted-foreground"/>
          </div>
        </card_component_1.CardComponent>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FeatureBoxLeft = FeatureBoxLeft;
// Feature Block 4: Features Grid (3 columns with icons)
const FeaturesIconGrid = ({ props }) => {
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
    return (<container_component_1.ContainerComponent id="features-feature-grid-container" padding="xl" background="muted" className="py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <text_component_1.TextComponent id="features-feature-grid-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-3"/>
        <text_component_1.TextComponent id="features-feature-grid-subtitle" content={subtitle} variant={subtitleVariant} align={subtitleAlign} color={subtitleColor} weight={subtitleWeight} className="text-muted-foreground"/>
      </div>

      {/* Features Grid */}
      <grid_component_1.GridComponent id="features-feature-grid" columns={3} gap="lg">
        {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || lucide_react_1.Star;
            return (<div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary">
                  <IconComponent className="h-8 w-8"/>
                </div>
              </div>

              {/* Title */}
              <text_component_1.TextComponent id={`features-feature-title-${index}`} content={feature.title} variant="heading3" align="center" color="primary" weight="semibold" className="mb-2 text-lg"/>

              {/* Description */}
              <text_component_1.TextComponent id={`features-feature-description-${index}`} content={feature.description} variant="body" align="center" color="muted" className="text-muted-foreground text-sm"/>
            </div>);
        })}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.FeaturesIconGrid = FeaturesIconGrid;
// Feature Block 5: Features List with Icon Bullets
const FeaturesListWithIcons = ({ props }) => {
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
    return (<container_component_1.ContainerComponent id="features-list-bullets-container" padding="xl" background="none" className="py-12">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <text_component_1.TextComponent id="features-list-bullets-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="mb-8"/>

        {/* List */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || lucide_react_1.CheckCircle;
            return (<div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <IconComponent className="h-6 w-6 text-primary"/>
                </div>
                <text_component_1.TextComponent id={`features-list-item-${index}`} content={item.text} variant="body" align="left" color="primary" className="flex-1"/>
              </div>);
        })}
        </div>
      </div>
    </container_component_1.ContainerComponent>);
};
exports.FeaturesListWithIcons = FeaturesListWithIcons;
// Feature Block 6: Services Box Stacked (2 columns)
const FeaturesServicesTwoColumn = ({ props }) => {
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
    return (<container_component_1.ContainerComponent id="features-box-stacked-container" padding="xl" background="none" className="py-16">
      {/* Title */}
      <text_component_1.TextComponent id="features-box-stacked-title" content={title} variant={titleVariant} align={titleAlign} color={titleColor} weight={titleWeight} className="text-center mb-12"/>

      {/* Services Grid */}
      <grid_component_1.GridComponent id="features-box-stacked-grid" columns={2} gap="lg">
        {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || lucide_react_1.Settings;
            return (<card_component_1.CardComponent key={index} id={`features-box-stacked-card-${index}`} padding="lg" className="hover:shadow-lg transition-shadow">
              {/* Icon */}
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                  <IconComponent className="h-8 w-8"/>
                </div>
              </div>

              {/* Title */}
              <text_component_1.TextComponent id={`features-box-stacked-title-${index}`} content={service.title} variant="heading3" align="left" color="primary" weight="semibold" className="mb-3 text-lg"/>

              {/* Description */}
              <text_component_1.TextComponent id={`features-box-stacked-description-${index}`} content={service.description} variant="body" align="left" color="muted" className="text-muted-foreground"/>
            </card_component_1.CardComponent>);
        })}
      </grid_component_1.GridComponent>
    </container_component_1.ContainerComponent>);
};
exports.FeaturesServicesTwoColumn = FeaturesServicesTwoColumn;
// Export array for registry
exports.featuresBlocks = [
    {
        id: 'features-single-centered',
        component: exports.FeatureSingleCentered,
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
        component: exports.FeatureBoxCentered,
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
        component: exports.FeatureBoxLeft,
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
        component: exports.FeaturesIconGrid,
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
        component: exports.FeaturesListWithIcons,
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
        component: exports.FeaturesServicesTwoColumn,
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
//# sourceMappingURL=features-blocks.js.map