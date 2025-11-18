'use client';

import React, { useState } from 'react';
import { ContainerComponent } from '@/components/cms/container-component';
import { TextComponent } from '@/components/cms/text-component';
import { ButtonComponent } from '@/components/cms/button-component';
import { GridComponent } from '@/components/cms/grid-component';
import { CardComponent } from '@/components/cms/card-component';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

// Special Block 1: Accordion FAQ Block
export const SpecialAccordionFaq: React.FC<any> = (props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const title = props?.title || "Frequently Asked Questions";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const items = props?.items || [
    {
      question: "How do I get started?",
      answer: "Simply sign up for an account and follow our onboarding process. It takes less than 5 minutes to get started."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. No cancellation fees apply."
    }
  ];
  
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ContainerComponent 
      id="special-accordion-container"
      padding="xl" 
      background="none"
      className="py-16"
    >
      <TextComponent 
        id="special-accordion-title"
        content={title}
        variant={titleVariant}
        align={titleAlign}
        color={titleColor}
        weight={titleWeight}
        className="text-center mb-12" 
      />
      <div className="max-w-3xl mx-auto">
        {items.map((faq: any, index: number) => (
          <CardComponent 
            id={`special-accordion-card-${index}`}
            key={index}
            padding="md" 
            rounded="md" 
            shadow="sm"
            className="mb-4"
          >
            <button 
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleAccordion(index)}
            >
              <TextComponent 
                id={`special-accordion-question-${index}`}
                content={faq.question} 
                variant="heading3" 
                className="mb-0" 
              />
              <span className="text-2xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <TextComponent 
                id={`special-accordion-answer-${index}`}
                content={faq.answer} 
                variant="body" 
                className="mt-4 text-muted-foreground" 
              />
            )}
          </CardComponent>
        ))}
      </div>
    </ContainerComponent>
  );
};

// Special Block 2: Countdown Timer Block
export const SpecialCountdownTimer: React.FC<any> = (props) => {
  const title = props?.title || "Limited Time Offer";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const subtitle = props?.subtitle || "Special discount ends in:";
  const subtitleVariant = props?.subtitleVariant || "body";
  const subtitleAlign = props?.subtitleAlign || "center";
  const subtitleColor = props?.subtitleColor || "muted";
  const subtitleWeight = props?.subtitleWeight || "normal";
  
  return (
    <ContainerComponent 
      id="special-countdown-container"
      padding="xl" 
      background="primary"
      className="text-center text-white py-16 rounded-lg"
    >
      <TextComponent 
        id="special-countdown-title"
        content={title}
        variant={titleVariant}
        align={titleAlign}
        color={titleColor}
        weight={titleWeight}
        className="mb-4" 
      />
      <TextComponent 
        id="special-countdown-subtitle"
        content={subtitle}
        variant={subtitleVariant}
        align={subtitleAlign}
        color={subtitleColor}
        weight={subtitleWeight}
        className="mb-8 text-white/80" 
      />
      <GridComponent 
        id="special-countdown-grid"
        columns={4} 
        gap="md" 
        className="justify-center space-x-4 mb-8"
      >
        <CardComponent 
          id="special-countdown-days"
          padding="lg" 
          rounded="lg" 
          background="none"
          className="text-center bg-white/20"
        >
          <TextComponent 
            id="special-countdown-days-num"
            content="05" 
            variant="heading2" 
            className="font-bold" 
          />
          <TextComponent 
            id="special-countdown-days-label"
            content="Days" 
            variant="body" 
            className="text-white/80" 
          />
        </CardComponent>
        <CardComponent 
          id="special-countdown-hours"
          padding="lg" 
          rounded="lg" 
          background="none"
          className="text-center bg-white/20"
        >
          <TextComponent 
            id="special-countdown-hours-num"
            content="16" 
            variant="heading2" 
            className="font-bold" 
          />
          <TextComponent 
            id="special-countdown-hours-label"
            content="Hours" 
            variant="body" 
            className="text-white/80" 
          />
        </CardComponent>
        <CardComponent 
          id="special-countdown-minutes"
          padding="lg" 
          rounded="lg" 
          background="none"
          className="text-center bg-white/20"
        >
          <TextComponent 
            id="special-countdown-minutes-num"
            content="42" 
            variant="heading2" 
            className="font-bold" 
          />
          <TextComponent 
            id="special-countdown-minutes-label"
            content="Minutes" 
            variant="body" 
            className="text-white/80" 
          />
        </CardComponent>
        <CardComponent 
          id="special-countdown-seconds"
          padding="lg" 
          rounded="lg" 
          background="none"
          className="text-center bg-white/20"
        >
          <TextComponent 
            id="special-countdown-seconds-num"
            content="18" 
            variant="heading2" 
            className="font-bold" 
          />
          <TextComponent 
            id="special-countdown-seconds-label"
            content="Seconds" 
            variant="body" 
            className="text-white/80" 
          />
        </CardComponent>
      </GridComponent>
      <ButtonComponent 
        id="special-countdown-btn"
        text="Claim Discount" 
        variant="default" 
        size="lg" 
        className="bg-white text-primary hover:bg-white/90" 
      />
    </ContainerComponent>
  );
};

// Special Block 3: Survey / Quiz Block
export const SpecialSurveyQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const questions = [
    {
      id: 1,
      text: "How satisfied are you with our service?",
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    },
    {
      id: 2,
      text: "How likely are you to recommend us to a friend?",
      options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"]
    }
  ];
  
  const handleAnswer = (option: string) => {
    setAnswers({...answers, [currentQuestion]: option});
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <ContainerComponent 
      id="special-survey-container"
      padding="xl" 
      background="muted"
      className="py-16 rounded-lg"
    >
      <TextComponent 
        id="special-survey-title"
        content="Customer Feedback" 
        variant="heading2" 
        className="text-center mb-2" 
      />
      <TextComponent 
        id="special-survey-desc"
        content="Help us improve our service by answering a few questions" 
        variant="body" 
        className="text-center mb-8 text-muted-foreground" 
      />
      
      <CardComponent 
        id="special-survey-card"
        padding="lg" 
        rounded="lg" 
        shadow="md"
        className="max-w-2xl mx-auto"
      >
        <TextComponent 
          id="special-survey-question"
          content={questions[currentQuestion].text} 
          variant="heading3" 
          className="mb-6 text-center" 
        />
        
        <GridComponent 
          id="special-survey-options-grid"
          columns={1} 
          gap="md" 
          className="mb-8"
        >
          {questions[currentQuestion].options.map((option, index) => (
            <ButtonComponent 
              id={`special-survey-option-${index}`}
              key={index}
              text={option} 
              variant={answers[currentQuestion] === option ? "default" : "outline"} 
              className="w-full justify-center"
              onClick={() => handleAnswer(option)}
            />
          ))}
        </GridComponent>
        
        <GridComponent 
          id="special-survey-nav-grid"
          columns={2} 
          gap="md" 
        >
          <ButtonComponent 
            id="special-survey-prev-btn"
            text="Previous" 
            variant="outline" 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          />
          <ButtonComponent 
            id="special-survey-next-btn"
            text={currentQuestion === questions.length - 1 ? "Submit" : "Next"} 
            variant="default" 
            onClick={nextQuestion}
          />
        </GridComponent>
      </CardComponent>
    </ContainerComponent>
  );
};

// Special Block 4: Digital Signature Block
export const SpecialDigitalSignature: React.FC = () => {
  return (
    <ContainerComponent 
      id="special-signature-container"
      padding="xl" 
      background="none"
      className="py-16"
    >
      <TextComponent 
        id="special-signature-title"
        content="Document Approval" 
        variant="heading2" 
        className="text-center mb-2" 
      />
      <TextComponent 
        id="special-signature-desc"
        content="Please sign below to approve this document" 
        variant="body" 
        className="text-center mb-8 text-muted-foreground" 
      />
      
      <CardComponent 
        id="special-signature-card"
        padding="lg" 
        rounded="lg" 
        shadow="md"
        className="max-w-2xl mx-auto"
      >
        <div className="border-2 border-dashed border-border rounded-lg h-32 flex items-center justify-center mb-6">
          <TextComponent 
            id="special-signature-placeholder"
            content="Signature Area" 
            variant="body" 
            className="text-muted-foreground" 
          />
        </div>
        
        <GridComponent 
          id="special-signature-btn-grid"
          columns={2} 
          gap="md" 
        >
          <ButtonComponent 
            id="special-signature-clear-btn"
            text="Clear" 
            variant="outline" 
          />
          <ButtonComponent 
            id="special-signature-sign-btn"
            text="Sign Document" 
            variant="default" 
          />
        </GridComponent>
      </CardComponent>
    </ContainerComponent>
  );
};

// Special Block 5: Event Highlight Block
export const SpecialEventHighlight: React.FC = () => {
  return (
    <ContainerComponent 
      id="special-event-container"
      padding="xl" 
      background="muted"
      className="py-16 rounded-lg"
    >
      <GridComponent 
        id="special-event-grid"
        columns={2} 
        gap="xl" 
        className="items-center"
      >
        <div>
          <TextComponent 
            id="special-event-date"
            content="October 15, 2023" 
            variant="body" 
            className="text-primary font-medium mb-2" 
          />
          <TextComponent 
            id="special-event-title"
            content="Annual Conference 2023" 
            variant="heading2" 
            className="mb-4" 
          />
          <TextComponent 
            id="special-event-desc"
            content="Join us for our annual conference featuring industry experts, networking opportunities, and hands-on workshops." 
            variant="body" 
            className="mb-6 text-muted-foreground" 
          />
          <GridComponent 
            id="special-event-details-grid"
            columns={1} 
            gap="sm" 
            className="mb-6"
          >
            <TextComponent 
              id="special-event-time"
              content="⏰ 9:00 AM - 5:00 PM" 
              variant="body" 
            />
            <TextComponent 
              id="special-event-location"
              content="📍 Convention Center, Downtown" 
              variant="body" 
            />
          </GridComponent>
          <ButtonComponent 
            id="special-event-btn"
            text="Register Now" 
            variant="default" 
          />
        </div>
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg w-full h-64 flex items-center justify-center">
            <TextComponent 
              id="special-event-image-text"
              content="Event Image" 
              variant="heading3" 
              className="text-white" 
            />
          </div>
        </div>
      </GridComponent>
    </ContainerComponent>
  );
};

// Special Block 6: Feature Highlight Trio (Enhanced)
export const SpecialFeatureTrio: React.FC<any> = (props) => {
  // Extract all props with defaults
  const title = props?.title || "Why Choose Us";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";

  const enableHoverEffect = props?.enableHoverEffect ?? true;
  const hoverShadow = props?.hoverShadow || "xl";
  const hoverTransform = props?.hoverTransform ?? true;
  const enableButton = props?.enableButton ?? true;
  const buttonText = props?.buttonText || "Daha Fazla Bilgi";
  const buttonVariant = props?.buttonVariant || "outline";

  // Check if props is an array (multiple cards) or single card object
  const items = Array.isArray(props?.items)
    ? props.items
    : props?.items
    ? [props.items]
    : (props?.icon || props?.title) // Single card passed as direct props
    ? [props] // Wrap single card in array
    : [ // Default fallback
        {
          icon: "⚡",
          iconType: "emoji",
          iconBackground: true,
          title: "Lightning Fast",
          content: "Our platform is optimized for speed and performance.",
          subItems: [],
          buttonHref: "#",
        },
      ];

  // Helper to render icon (emoji or Lucide)
  const renderIcon = (item: any) => {
    if (item.iconType === 'lucide' && item.lucideIcon) {
      const IconComponent = (LucideIcons as any)[item.lucideIcon];
      if (IconComponent) {
        return <IconComponent className="h-6 w-6 text-primary" />;
      }
    }
    return <span className="text-2xl">{item.icon}</span>;
  };

  // Build hover classes
  const hoverClasses = enableHoverEffect
    ? `hover:shadow-${hoverShadow} ${hoverTransform ? 'hover:-translate-y-1' : ''} transition-all duration-300`
    : '';

  return (
    <ContainerComponent
      id="special-feature-container"
      padding="xl"
      background="none"
      className="py-16"
    >
      <TextComponent
        id="special-feature-title"
        content={title}
        variant={titleVariant}
        align={titleAlign}
        color={titleColor}
        weight={titleWeight}
        className="mb-12"
      />
      <GridComponent
        id="special-feature-grid"
        columns={3}
        gap="xl"
      >
        {items.map((item: any, index: number) => (
          <CardComponent
            id={`special-feature-card-${index + 1}`}
            key={index}
            padding="lg"
            rounded="lg"
            shadow="md"
            className={`flex flex-col overflow-hidden group ${hoverClasses}`}
          >
            {/* Icon Section */}
            <div className="flex items-center gap-3 mb-2">
              {item.iconBackground ? (
                <div className="bg-primary/10 p-2 rounded-md">
                  {renderIcon(item)}
                </div>
              ) : (
                renderIcon(item)
              )}
            </div>

            {/* Title */}
            <TextComponent
              id={`special-feature-card-${index + 1}-title`}
              content={item.title}
              variant="heading3"
              className="mb-3"
            />

            {/* Description */}
            <div className="flex-grow">
              <TextComponent
                id={`special-feature-card-${index + 1}-text`}
                content={item.content}
                variant="body"
                className="text-muted-foreground mb-4"
              />

              {/* Sub Items (Links) */}
              {item.subItems && item.subItems.length > 0 && (
                <ul className="space-y-2 text-sm mb-4">
                  {item.subItems.map((subItem: any, subIndex: number) => (
                    <li key={subIndex}>
                      <Link
                        href={subItem.href || '#'}
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <ArrowRight className="h-3 w-3 text-primary/50" />
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Button (at bottom of card) */}
            {enableButton && item.buttonHref && (
              <div className="mt-auto pt-4">
                <ButtonComponent
                  id={`special-feature-button-${index + 1}`}
                  text={buttonText}
                  href={item.buttonHref}
                  variant={buttonVariant}
                  icon={<ArrowRight className="ml-2 h-4 w-4" />}
                  className="w-full"
                />
              </div>
            )}
          </CardComponent>
        ))}
      </GridComponent>
    </ContainerComponent>
  );
};

// Special Block 6.5: Single Feature Card (for grid layouts without container)
export const SpecialFeatureCardSingle: React.FC<any> = (props) => {
  const enableHoverEffect = props?.enableHoverEffect ?? true;
  const hoverShadow = props?.hoverShadow || "xl";
  const hoverTransform = props?.hoverTransform ?? true;
  const enableButton = props?.enableButton ?? true;
  const buttonText = props?.buttonText || "Daha Fazla Bilgi";
  const buttonVariant = props?.buttonVariant || "outline";

  const icon = props?.icon || "⚡";
  const iconType = props?.iconType || "emoji";
  const iconBackground = props?.iconBackground ?? true;
  const title = props?.title || "Feature Title";
  const content = props?.content || "Feature description";
  const subItems = props?.subItems || [];
  const buttonHref = props?.buttonHref || "#";

  // Helper to render icon (emoji or Lucide)
  const renderIcon = () => {
    if (iconType === 'lucide' && props?.lucideIcon) {
      const IconComponent = (LucideIcons as any)[props.lucideIcon];
      if (IconComponent) {
        return <IconComponent className="h-6 w-6 text-primary" />;
      }
    }
    return <span className="text-2xl">{icon}</span>;
  };

  // Build hover classes
  const hoverClasses = enableHoverEffect
    ? `hover:shadow-${hoverShadow} ${hoverTransform ? 'hover:-translate-y-1' : ''} transition-all duration-300`
    : '';

  return (
    <CardComponent
      id={`special-feature-card-single`}
      padding="lg"
      rounded="lg"
      shadow="md"
      className={`flex flex-col overflow-hidden group ${hoverClasses}`}
    >
      {/* Icon Section */}
      <div className="flex items-center gap-3 mb-2">
        {iconBackground ? (
          <div className="bg-primary/10 p-2 rounded-md">
            {renderIcon()}
          </div>
        ) : (
          renderIcon()
        )}
      </div>

      {/* Title */}
      <TextComponent
        id={`special-feature-card-single-title`}
        content={title}
        variant="heading3"
        className="mb-3"
      />

      {/* Description */}
      <div className="flex-grow">
        <TextComponent
          id={`special-feature-card-single-text`}
          content={content}
          variant="body"
          className="text-muted-foreground mb-4"
        />

        {/* Sub Items (Links) */}
        {subItems && subItems.length > 0 && (
          <ul className="space-y-2 text-sm mb-4">
            {subItems.map((subItem: any, subIndex: number) => (
              <li key={subIndex}>
                <Link
                  href={subItem.href || '#'}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3 text-primary/50" />
                  {subItem.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Button (at bottom of card) */}
      {enableButton && buttonHref && (
        <div className="mt-auto pt-4">
          <ButtonComponent
            id={`special-feature-button-single`}
            text={buttonText}
            href={buttonHref}
            variant={buttonVariant}
            icon={<ArrowRight className="ml-2 h-4 w-4" />}
            className="w-full"
          />
        </div>
      )}
    </CardComponent>
  );
};

// Special Block 7: Code Snippet Block
export const SpecialCodeSnippet: React.FC = () => {
  return (
    <ContainerComponent 
      id="special-code-container"
      padding="xl" 
      background="muted"
      className="py-16"
    >
      <TextComponent 
        id="special-code-title"
        content="Code Example" 
        variant="heading2" 
        className="text-center mb-4" 
      />
      <TextComponent 
        id="special-code-desc"
        content="Here's how to implement our API in your project" 
        variant="body" 
        className="text-center mb-8 text-muted-foreground" 
      />
      
      <CardComponent 
        id="special-code-card"
        padding="none" 
        rounded="lg" 
        shadow="md"
        className="max-w-4xl mx-auto"
      >
        <div className="bg-muted px-6 py-4 border-b">
          <TextComponent 
            id="special-code-filename"
            content="example.js" 
            variant="body" 
            className="font-mono" 
          />
        </div>
        <pre className="p-6 overflow-x-auto bg-gray-900 text-gray-100">
          <code>
{`// Initialize the client
const client = new APIClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.example.com'
});

// Fetch data
async function fetchData() {
  try {
    const response = await client.get('/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}`}
          </code>
        </pre>
        <div className="px-6 py-4 bg-muted border-t">
          <ButtonComponent 
            id="special-code-copy-btn"
            text="Copy to Clipboard" 
            variant="outline" 
            size="sm" 
          />
        </div>
      </CardComponent>
    </ContainerComponent>
  );
};

// Special Block 8: Product Card Grid Block
export const SpecialProductGrid: React.FC<any> = (props) => {
  // Extract section props
  const title = props?.title || "Ürünler";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";

  const subtitle = props?.subtitle || "";
  const subtitleVariant = props?.subtitleVariant || "body";
  const subtitleAlign = props?.subtitleAlign || "center";
  const subtitleColor = props?.subtitleColor || "muted";
  const subtitleWeight = props?.subtitleWeight || "normal";

  const gridColumns = props?.gridColumns || "2";
  const enableHoverEffect = props?.enableHoverEffect ?? true;
  const hoverShadow = props?.hoverShadow || "xl";
  const hoverTransform = props?.hoverTransform ?? true;

  const products = props?.products || [];

  // Helper to render icon (emoji or Lucide)
  const renderIcon = (product: any) => {
    if (product.iconType === 'lucide' && product.lucideIcon) {
      const IconComponent = (LucideIcons as any)[product.lucideIcon];
      if (IconComponent) {
        return <IconComponent className="h-6 w-6 text-primary" />;
      }
    }
    return <span className="text-2xl">{product.icon || '📦'}</span>;
  };

  // Build hover classes
  const hoverClasses = enableHoverEffect
    ? `hover:shadow-${hoverShadow} ${hoverTransform ? 'hover:-translate-y-1' : ''} transition-all duration-300`
    : '';

  // Grid columns class
  const gridClass = gridColumns === '1' 
    ? 'grid-cols-1' 
    : gridColumns === '3' 
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2';

  return (
    <ContainerComponent
      id="special-product-grid-container"
      padding="xl"
      className="py-16"
    >
      {/* Section Title */}
      <TextComponent
        id="special-product-grid-title"
        content={title}
        variant={titleVariant}
        align={titleAlign}
        color={titleColor}
        weight={titleWeight}
        className="mb-4"
      />

      {/* Section Subtitle */}
      {subtitle && (
        <TextComponent
          id="special-product-grid-subtitle"
          content={subtitle}
          variant={subtitleVariant}
          align={subtitleAlign}
          color={subtitleColor}
          weight={subtitleWeight}
          className="mb-12"
        />
      )}

      {/* Product Grid */}
      <div className={`grid ${gridClass} gap-8`}>
        {products.map((product: any, index: number) => {
          const imageAspect = product.imageAspect || 'video';
          const aspectClass = imageAspect === 'square' 
            ? 'aspect-square' 
            : imageAspect === 'portrait' 
            ? 'aspect-[3/4]'
            : 'aspect-video';

          const categoryVariant = product.categoryVariant || 'small';
          const categoryAlign = product.categoryAlign || 'left';
          const categoryColor = product.categoryColor || 'muted';
          const categoryWeight = product.categoryWeight || 'normal';

          const productTitleVariant = product.titleVariant || 'heading3';
          const productTitleAlign = product.titleAlign || 'left';
          const productTitleColor = product.titleColor || 'primary';
          const productTitleWeight = product.titleWeight || 'semibold';

          const descVariant = product.descriptionVariant || 'body';
          const descAlign = product.descriptionAlign || 'left';
          const descColor = product.descriptionColor || 'muted';
          const descWeight = product.descriptionWeight || 'normal';

          return (
            <CardComponent
              key={index}
              id={`special-product-card-${index + 1}`}
              padding="none"
              rounded="lg"
              shadow="md"
              className={`flex flex-col overflow-hidden group ${hoverClasses}`}
            >
              {/* Product Image */}
              <div className={`relative ${aspectClass} overflow-hidden`}>
                <img
                  src={product.imageUrl || '/placeholder-product.jpg'}
                  alt={product.title || 'Product'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Header - Icon + Category + Title */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  {/* Icon with optional background */}
                  {product.iconBackground ? (
                    <div className="bg-primary/10 p-2 rounded-md">
                      {renderIcon(product)}
                    </div>
                  ) : (
                    <div>{renderIcon(product)}</div>
                  )}

                  {/* Category + Title */}
                  <div>
                    <TextComponent
                      id={`product-title-${index + 1}`}
                      content={product.title || 'ÜRÜN ADI'}
                      variant={productTitleVariant}
                      align={productTitleAlign}
                      color={productTitleColor}
                      weight={productTitleWeight}
                      className="text-xl"
                    />
                    <TextComponent
                      id={`product-category-${index + 1}`}
                      content={product.category || 'Kategori'}
                      variant={categoryVariant}
                      align={categoryAlign}
                      color={categoryColor}
                      weight={categoryWeight}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <TextComponent
                  id={`product-description-${index + 1}`}
                  content={product.description || 'Ürün açıklaması'}
                  variant={descVariant}
                  align={descAlign}
                  color={descColor}
                  weight={descWeight}
                  className="mb-4"
                />
              </div>

              {/* Card Footer - CTA Button */}
              <div className="p-6 pt-0 mt-auto">
                <ButtonComponent
                  id={`product-button-${index + 1}`}
                  text={product.buttonText || 'Kategoriyi İncele'}
                  href={product.buttonHref || '#'}
                  variant={product.buttonVariant || 'secondary'}
                  icon={product.buttonIcon ? <ArrowRight className="ml-2 h-4 w-4" /> : undefined}
                  className="w-full"
                />
              </div>
            </CardComponent>
          );
        })}
      </div>
    </ContainerComponent>
  );
};

// Special Block 9: Resource Tabs Block
export const SpecialResourceTabs: React.FC<any> = (props) => {
  // Extract section props
  const title = props?.title || "Kaynaklar";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";

  const subtitle = props?.subtitle || "";
  const subtitleVariant = props?.subtitleVariant || "body";
  const subtitleAlign = props?.subtitleAlign || "center";
  const subtitleColor = props?.subtitleColor || "muted";
  const subtitleWeight = props?.subtitleWeight || "normal";

  const gridColumns = props?.gridColumns || "4";
  const enableHoverEffect = props?.enableHoverEffect ?? true;
  const hoverShadow = props?.hoverShadow || "xl";
  const hoverTransform = props?.hoverTransform ?? true;

  const tabs = props?.tabs || [];

  // State for active tab
  const [activeTab, setActiveTab] = useState(tabs[0]?.tabId || 'tab1');

  // Helper to render icon (emoji or Lucide)
  const renderIcon = (tab: any) => {
    if (tab.iconType === 'lucide' && tab.lucideIcon) {
      const IconComponent = (LucideIcons as any)[tab.lucideIcon];
      if (IconComponent) {
        return <IconComponent className="h-4 w-4" />;
      }
    }
    return <span className="text-lg">{tab.icon || '📄'}</span>;
  };

  // Build hover classes
  const hoverClasses = enableHoverEffect
    ? `hover:shadow-${hoverShadow} ${hoverTransform ? 'hover:-translate-y-1' : ''} transition-all duration-300`
    : '';

  // Grid columns class
  const gridClass = gridColumns === '2' 
    ? 'grid-cols-1 sm:grid-cols-2' 
    : gridColumns === '3' 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  if (!tabs || tabs.length === 0) {
    return (
      <ContainerComponent
        id="special-resource-tabs-empty"
        padding="xl"
        className="py-16 text-center"
      >
        <TextComponent
          id="empty-message"
          content="No tabs configured. Add tabs in the block properties."
          variant="body"
          color="muted"
        />
      </ContainerComponent>
    );
  }

  return (
    <ContainerComponent
      id="special-resource-tabs-container"
      padding="xl"
      className="py-16"
    >
      {/* Section Title */}
      <div className="mx-auto max-w-2xl text-center mb-12">
        <TextComponent
          id="special-resource-tabs-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-4"
        />

        {/* Section Subtitle */}
        {subtitle && (
          <TextComponent
            id="special-resource-tabs-subtitle"
            content={subtitle}
            variant={subtitleVariant}
            align={subtitleAlign}
            color={subtitleColor}
            weight={subtitleWeight}
          />
        )}
      </div>

      {/* Tabs Component */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs List */}
        <div className="flex justify-center mb-8">
          <TabsList className={`grid h-auto ${tabs.length <= 3 ? `grid-cols-${tabs.length}` : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'}`}>
            {tabs.map((tab: any, index: number) => (
              <TabsTrigger 
                key={tab.tabId || `tab-${index}`} 
                value={tab.tabId || `tab-${index}`}
                className="py-2.5 flex items-center gap-2"
              >
                {renderIcon(tab)}
                <span>{tab.tabTitle || `Tab ${index + 1}`}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tabs Content */}
        {tabs.map((tab: any, tabIndex: number) => {
          const resources = tab.resources || [];

          return (
            <TabsContent 
              key={tab.tabId || `tab-${tabIndex}`} 
              value={tab.tabId || `tab-${tabIndex}`}
              className="mt-0"
            >
              {resources.length === 0 ? (
                <div className="text-center py-12">
                  <TextComponent
                    id={`empty-tab-${tabIndex}`}
                    content="No resources in this tab yet."
                    variant="body"
                    color="muted"
                  />
                </div>
              ) : (
                <div className={`grid ${gridClass} gap-6`}>
                  {resources.map((resource: any, resIndex: number) => (
                    <CardComponent
                      key={resIndex}
                      id={`resource-card-${tabIndex}-${resIndex}`}
                      padding="md"
                      rounded="lg"
                      shadow="md"
                      className={`flex flex-col ${hoverClasses}`}
                    >
                      {/* Card Header */}
                      <div className="mb-4">
                        <TextComponent
                          id={`resource-title-${tabIndex}-${resIndex}`}
                          content={resource.title || 'Resource Title'}
                          variant="heading4"
                          color="primary"
                          weight="semibold"
                          className="mb-2"
                        />
                        
                        {resource.description && (
                          <TextComponent
                            id={`resource-desc-${tabIndex}-${resIndex}`}
                            content={resource.description}
                            variant="small"
                            color="muted"
                          />
                        )}
                      </div>

                      {/* Card Footer - CTA Button */}
                      <div className="mt-auto">
                        <ButtonComponent
                          id={`resource-button-${tabIndex}-${resIndex}`}
                          text={resource.ctaText || 'Learn More'}
                          href={resource.ctaLink || '#'}
                          variant={resource.buttonVariant || 'outline'}
                          icon={<ArrowRight className="ml-2 h-4 w-4" />}
                          className="w-full"
                        />
                      </div>
                    </CardComponent>
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </ContainerComponent>
  );
};

// Special Block 6.6: Grid Container (wrapper for creating grid layouts)
export const SpecialGridContainer: React.FC<any> = (props) => {
  const columnsMobile = props?.columnsMobile || '1';
  const columnsTablet = props?.columnsTablet || '2';
  const columnsDesktop = props?.columnsDesktop || '3';
  const gap = props?.gap || '8';
  const containerPadding = props?.containerPadding || '16';

  return (
    <div className={`container mx-auto py-${containerPadding} px-4`}>
      <div className={`grid grid-cols-${columnsMobile} md:grid-cols-${columnsTablet} lg:grid-cols-${columnsDesktop} gap-${gap}`}>
        {/* Children will be rendered here by PageRenderer - this is just a wrapper */}
      </div>
    </div>
  );
};

// Export all special blocks
export const specialBlocks = [
  {
    id: 'special-accordion-faq',
    name: 'Accordion FAQ Block',
    description: 'Expandable Q&A style layout for FAQs or collapsible info.',
    category: 'Special',
    component: SpecialAccordionFaq,
  },
  {
    id: 'special-countdown-timer',
    name: 'Countdown Timer Block',
    description: 'Dynamic countdown with CTA; for limited-time offers.',
    category: 'Special',
    component: SpecialCountdownTimer,
  },
  {
    id: 'special-survey-quiz',
    name: 'Survey / Quiz Block',
    description: 'Interactive feedback collection; ideal for engagement.',
    category: 'Special',
    component: SpecialSurveyQuiz,
  },
  {
    id: 'special-digital-signature',
    name: 'Digital Signature Block',
    description: 'Signature input for verification or approvals.',
    category: 'Special',
    component: SpecialDigitalSignature,
  },
  {
    id: 'special-event-highlight',
    name: 'Event Highlight Block',
    description: 'Focused event layout with date/time, image, and link.',
    category: 'Special',
    component: SpecialEventHighlight,
  },
  {
    id: 'special-feature-trio',
    name: 'Feature Highlight Trio',
    description: 'Three horizontally aligned feature cards; perfect for showing benefits.',
    category: 'Special',
    component: SpecialFeatureTrio,
  },
  {
    id: 'special-feature-card-single',
    name: 'Single Feature Card',
    description: 'Single feature card for grid layouts - use multiple for custom grids.',
    category: 'Special',
    component: SpecialFeatureCardSingle,
  },
  {
    id: 'special-grid-container',
    name: 'Grid Container',
    description: 'Container that creates a responsive grid layout for child components (3-column on desktop, 2 on tablet, 1 on mobile).',
    category: 'Special',
    component: SpecialGridContainer,
  },
  {
    id: 'special-code-snippet',
    name: 'Code Snippet Block',
    description: 'Syntax-highlighted code area for developer-focused sites.',
    category: 'Special',
    component: SpecialCodeSnippet,
  },
  {
    id: 'special-product-grid',
    name: 'Product Card Grid',
    description: '2-column product card grid with images, icons, categories, and CTAs.',
    category: 'Special',
    component: SpecialProductGrid,
  },
  {
    id: 'special-resource-tabs',
    name: 'Resource Tabs with Cards',
    description: 'Tabbed interface with resource cards - perfect for organizing content by categories.',
    category: 'Special',
    component: SpecialResourceTabs,
  },
];