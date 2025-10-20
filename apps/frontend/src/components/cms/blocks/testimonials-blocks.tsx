'use client';

import React from 'react';
import { ContainerComponent } from '@/components/cms/container-component';
import { TextComponent } from '@/components/cms/text-component';
import { GridComponent } from '@/components/cms/grid-component';
import { CardComponent } from '@/components/cms/card-component';
import { ImageComponent } from '@/components/cms/image-component';
import { Star, Quote } from 'lucide-react';

// Testimonial Block 1: Single Card
export const TestimonialSingleCard: React.FC<{ props?: any }> = ({ props }) => {
  const name = props?.name || "Sarah Johnson";
  const nameVariant = props?.nameVariant || "body";
  const nameAlign = props?.nameAlign || "left";
  const nameColor = props?.nameColor || "primary";
  const nameWeight = props?.nameWeight || "semibold";
  
  const role = props?.role || "CEO, TechCorp";
  const roleVariant = props?.roleVariant || "caption";
  const roleAlign = props?.roleAlign || "left";
  const roleColor = props?.roleColor || "muted";
  const roleWeight = props?.roleWeight || "normal";
  
  const content = props?.content || "This service has completely transformed our business. The team's dedication and expertise are unmatched. Highly recommended!";
  const contentVariant = props?.contentVariant || "heading3";
  const contentAlign = props?.contentAlign || "center";
  const contentColor = props?.contentColor || "primary";
  const contentWeight = props?.contentWeight || "normal";
  
  const rating = props?.rating || 5;
  const avatar = props?.avatar || "/placeholder-avatar.jpg";
  const background = props?.background || "muted";

  return (
    <ContainerComponent 
      id="testimonial-single-container"
      padding="xl" 
      background={background}
      className="py-16"
    >
      <div className="max-w-3xl mx-auto">
        <CardComponent 
          id="testimonial-single-card"
          padding="xl" 
          className="text-center"
        >
          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <Quote className="h-12 w-12 text-primary opacity-20" />
          </div>

          {/* Rating Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-5 w-5 ${i < rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`} 
              />
            ))}
          </div>

          {/* Testimonial Content */}
          <TextComponent 
            id="testimonial-single-content"
            content={content}
            variant={contentVariant}
            align={contentAlign}
            color={contentColor}
            weight={contentWeight}
            className="mb-8 text-foreground italic font-normal" 
          />

          {/* Author Info */}
          <div className="flex items-center justify-center gap-4">
            <ImageComponent 
              id="testimonial-single-avatar"
              src={avatar}
              alt={name}
              className="h-16 w-16 rounded-full object-cover" 
            />
            <div className="text-left">
              <TextComponent 
                id="testimonial-single-name"
                content={name}
                variant={nameVariant}
                align={nameAlign}
                color={nameColor}
                weight={nameWeight}
                className="font-semibold mb-1" 
              />
              <TextComponent 
                id="testimonial-single-role"
                content={role}
                variant={roleVariant}
                align={roleAlign}
                color={roleColor}
                weight={roleWeight}
                className="text-muted-foreground" 
              />
            </div>
          </div>
        </CardComponent>
      </div>
    </ContainerComponent>
  );
};

// Testimonial Block 2: Grid Three Columns
export const TestimonialGridThree: React.FC<{ props?: any }> = ({ props }) => {
  const title = props?.title || "What Our Clients Say";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const subtitle = props?.subtitle || "Don't just take our word for it";
  const subtitleVariant = props?.subtitleVariant || "body";
  const subtitleAlign = props?.subtitleAlign || "center";
  const subtitleColor = props?.subtitleColor || "muted";
  const subtitleWeight = props?.subtitleWeight || "normal";
  
  const testimonials = props?.testimonials || [
    {
      name: "Alex Thompson",
      role: "Founder, StartupXYZ",
      content: "Outstanding service! The team went above and beyond to deliver exceptional results.",
      rating: 5,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Maria Garcia",
      role: "Marketing Director",
      content: "Professional, efficient, and highly skilled. We couldn't be happier with the outcome.",
      rating: 5,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "David Chen",
      role: "Product Manager",
      content: "The best decision we made this year. Highly recommend to anyone looking for quality.",
      rating: 5,
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  return (
    <ContainerComponent 
      id="testimonial-grid-container"
      padding="xl" 
      background="none"
      className="py-16"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <TextComponent 
          id="testimonial-grid-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-3" 
        />
        <TextComponent 
          id="testimonial-grid-subtitle"
          content={subtitle}
          variant={subtitleVariant}
          align={subtitleAlign}
          color={subtitleColor}
          weight={subtitleWeight}
          className="text-muted-foreground" 
        />
      </div>

      {/* Testimonials Grid */}
      <GridComponent 
        id="testimonial-grid"
        columns={3} 
        gap="lg"
      >
        {testimonials.map((testimonial: any, index: number) => (
          <CardComponent 
            key={index}
            id={`testimonial-card-${index}`}
            padding="lg"
            className="h-full flex flex-col"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < testimonial.rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`} 
                />
              ))}
            </div>

            {/* Content */}
            <TextComponent 
              id={`testimonial-content-${index}`}
              content={testimonial.content}
              variant="body"
              align="left"
              color="muted"
              className="mb-6 flex-1 text-muted-foreground" 
            />

            {/* Author */}
            <div className="flex items-center gap-3">
              <ImageComponent 
                id={`testimonial-avatar-${index}`}
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full object-cover" 
              />
              <div>
                <TextComponent 
                  id={`testimonial-name-${index}`}
                  content={testimonial.name}
                  variant="body"
                  align="left"
                  color="primary"
                  weight="semibold"
                  className="font-semibold mb-0.5" 
                />
                <TextComponent 
                  id={`testimonial-role-${index}`}
                  content={testimonial.role}
                  variant="caption"
                  align="left"
                  color="muted"
                  className="text-muted-foreground" 
                />
              </div>
            </div>
          </CardComponent>
        ))}
      </GridComponent>
    </ContainerComponent>
  );
};

// Testimonial Block 3: Carousel Style
export const TestimonialCarousel: React.FC<{ props?: any }> = ({ props }) => {
  const title = props?.title || "Customer Success Stories";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const testimonials = props?.testimonials || [
    {
      name: "Jennifer Lee",
      role: "Operations Manager",
      company: "Global Industries",
      content: "Working with this team has been an absolute game-changer for our company. Their professionalism and attention to detail are second to none.",
      rating: 5,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Michael Brown",
      role: "CTO",
      company: "Tech Solutions Inc",
      content: "Exceptional quality and outstanding support. They truly understand their clients' needs and deliver beyond expectations.",
      rating: 5,
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  // For now, display all testimonials (carousel functionality can be added later)
  const activeTestimonial = testimonials[0];

  return (
    <ContainerComponent 
      id="testimonial-carousel-container"
      padding="xl" 
      background="primary"
      className="py-20 text-primary-foreground"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <TextComponent 
          id="testimonial-carousel-title"
          content={title}
          variant={titleVariant}
          align={titleAlign}
          color={titleColor}
          weight={titleWeight}
          className="mb-12 text-primary-foreground" 
        />

        {/* Active Testimonial */}
        <div className="mb-8">
          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <Quote className="h-16 w-16 opacity-30" />
          </div>

          {/* Rating */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-6 w-6 ${i < activeTestimonial.rating ? 'fill-warning text-warning' : 'text-primary-foreground/30'}`} 
              />
            ))}
          </div>

          {/* Content */}
          <TextComponent 
            id="testimonial-carousel-content"
            content={activeTestimonial.content}
            variant="heading3"
            align="center"
            color="primary"
            weight="normal"
            className="mb-8 text-primary-foreground italic font-normal leading-relaxed" 
          />

          {/* Author */}
          <div className="flex flex-col items-center">
            <ImageComponent 
              id="testimonial-carousel-avatar"
              src={activeTestimonial.avatar}
              alt={activeTestimonial.name}
              className="h-20 w-20 rounded-full object-cover mb-4 ring-4 ring-white/20" 
            />
            <TextComponent 
              id="testimonial-carousel-name"
              content={activeTestimonial.name}
              variant="body"
              align="center"
              color="primary"
              weight="bold"
              className="font-bold text-primary-foreground mb-1" 
            />
            <TextComponent 
              id="testimonial-carousel-role"
              content={`${activeTestimonial.role} at ${activeTestimonial.company}`}
              variant="caption"
              align="center"
              color="muted"
              className="text-primary-foreground/80" 
            />
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_: any, index: number) => (
            <button 
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${index === 0 ? 'bg-white w-8' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </ContainerComponent>
  );
};

// Testimonial Block 4: Minimal Style
export const TestimonialMinimal: React.FC<{ props?: any }> = ({ props }) => {
  const content = props?.content || "This is hands down the best service I've ever used. The results speak for themselves.";
  const contentVariant = props?.contentVariant || "heading3";
  const contentAlign = props?.contentAlign || "left";
  const contentColor = props?.contentColor || "primary";
  const contentWeight = props?.contentWeight || "normal";
  
  const name = props?.name || "Robert Martinez";
  const nameVariant = props?.nameVariant || "body";
  const nameAlign = props?.nameAlign || "left";
  const nameColor = props?.nameColor || "primary";
  const nameWeight = props?.nameWeight || "semibold";
  
  const role = props?.role || "Business Owner";
  const roleVariant = props?.roleVariant || "caption";
  const roleAlign = props?.roleAlign || "left";
  const roleColor = props?.roleColor || "muted";
  const roleWeight = props?.roleWeight || "normal";

  return (
    <ContainerComponent 
      id="testimonial-minimal-container"
      padding="xl" 
      background="none"
      className="py-12"
    >
      <div className="max-w-2xl mx-auto">
        <div className="border-l-4 border-primary pl-6">
          <TextComponent 
            id="testimonial-minimal-content"
            content={`"${content}"`}
            variant={contentVariant}
            align={contentAlign}
            color={contentColor}
            weight={contentWeight}
            className="mb-4 text-foreground font-normal italic" 
          />
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-border"></div>
            <div>
              <TextComponent 
                id="testimonial-minimal-name"
                content={name}
                variant={nameVariant}
                align={nameAlign}
                color={nameColor}
                weight={nameWeight}
                className="font-semibold" 
              />
              <TextComponent 
                id="testimonial-minimal-role"
                content={role}
                variant={roleVariant}
                align={roleAlign}
                color={roleColor}
                weight={roleWeight}
                className="text-muted-foreground" 
              />
            </div>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
};

// Testimonial Block 5: Wall/Masonry Style
export const TestimonialWall: React.FC<{ props?: any }> = ({ props }) => {
  const title = props?.title || "Loved by Thousands";
  const titleVariant = props?.titleVariant || "heading2";
  const titleAlign = props?.titleAlign || "center";
  const titleColor = props?.titleColor || "primary";
  const titleWeight = props?.titleWeight || "bold";
  
  const testimonials = props?.testimonials || [
    { name: "Emily Watson", role: "Designer", content: "Absolutely incredible! Best investment we've made.", rating: 5 },
    { name: "James Wilson", role: "Developer", content: "The quality and support are outstanding. Highly recommended!", rating: 5 },
    { name: "Lisa Anderson", role: "Entrepreneur", content: "Game-changing service. Our productivity has doubled!", rating: 5 },
    { name: "Tom Harris", role: "Manager", content: "Professional, reliable, and results-driven. Love it!", rating: 5 },
    { name: "Nina Patel", role: "Consultant", content: "Exceeded all expectations. Couldn't be happier!", rating: 5 },
    { name: "Chris Moore", role: "Director", content: "The best decision for our business this year.", rating: 5 }
  ];

  return (
    <ContainerComponent 
      id="testimonial-wall-container"
      padding="xl" 
      background="muted"
      className="py-16"
    >
      {/* Title */}
      <TextComponent 
        id="testimonial-wall-title"
        content={title}
        variant={titleVariant}
        align={titleAlign}
        color={titleColor}
        weight={titleWeight}
        className="text-center mb-12" 
      />

      {/* Testimonials Grid (Masonry-like) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial: any, index: number) => (
          <CardComponent 
            key={index}
            id={`testimonial-wall-card-${index}`}
            padding="lg"
            className="hover:shadow-lg transition-shadow"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < testimonial.rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`} 
                />
              ))}
            </div>

            {/* Content */}
            <TextComponent 
              id={`testimonial-wall-content-${index}`}
              content={`"${testimonial.content}"`}
              variant="body"
              align="left"
              color="primary"
              className="mb-4 text-foreground" 
            />

            {/* Author */}
            <div className="border-t pt-4">
              <TextComponent 
                id={`testimonial-wall-name-${index}`}
                content={testimonial.name}
                variant="caption"
                align="left"
                color="primary"
                weight="semibold"
                className="font-semibold mb-0.5" 
              />
              <TextComponent 
                id={`testimonial-wall-role-${index}`}
                content={testimonial.role}
                variant="caption"
                align="left"
                color="muted"
                className="text-muted-foreground" 
              />
            </div>
          </CardComponent>
        ))}
      </div>
    </ContainerComponent>
  );
};

// Export array for registry
export const testimonialsBlocks = [
  {
    id: 'testimonial-single-card',
    component: TestimonialSingleCard,
    name: 'Testimonial Single Card',
    category: 'Testimonials',
    defaultProps: {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "This service has completely transformed our business. The team's dedication and expertise are unmatched. Highly recommended!",
      rating: 5,
      avatar: "/placeholder-avatar.jpg",
      background: "muted"
    }
  },
  {
    id: 'testimonial-grid-three',
    component: TestimonialGridThree,
    name: 'Testimonial Grid (3 Columns)',
    category: 'Testimonials',
    defaultProps: {
      title: "What Our Clients Say",
      subtitle: "Don't just take our word for it",
      testimonials: [
        {
          name: "Alex Thompson",
          role: "Founder, StartupXYZ",
          content: "Outstanding service! The team went above and beyond to deliver exceptional results.",
          rating: 5,
          avatar: "/placeholder-avatar.jpg"
        },
        {
          name: "Maria Garcia",
          role: "Marketing Director",
          content: "Professional, efficient, and highly skilled. We couldn't be happier with the outcome.",
          rating: 5,
          avatar: "/placeholder-avatar.jpg"
        },
        {
          name: "David Chen",
          role: "Product Manager",
          content: "The best decision we made this year. Highly recommend to anyone looking for quality.",
          rating: 5,
          avatar: "/placeholder-avatar.jpg"
        }
      ]
    }
  },
  {
    id: 'testimonial-carousel',
    component: TestimonialCarousel,
    name: 'Testimonial Carousel',
    category: 'Testimonials',
    defaultProps: {
      title: "Customer Success Stories",
      testimonials: [
        {
          name: "Jennifer Lee",
          role: "Operations Manager",
          company: "Global Industries",
          content: "Working with this team has been an absolute game-changer for our company. Their professionalism and attention to detail are second to none.",
          rating: 5,
          avatar: "/placeholder-avatar.jpg"
        },
        {
          name: "Michael Brown",
          role: "CTO",
          company: "Tech Solutions Inc",
          content: "Exceptional quality and outstanding support. They truly understand their clients' needs and deliver beyond expectations.",
          rating: 5,
          avatar: "/placeholder-avatar.jpg"
        }
      ]
    }
  },
  {
    id: 'testimonial-minimal',
    component: TestimonialMinimal,
    name: 'Testimonial Minimal',
    category: 'Testimonials',
    defaultProps: {
      content: "This is hands down the best service I've ever used. The results speak for themselves.",
      name: "Robert Martinez",
      role: "Business Owner"
    }
  },
  {
    id: 'testimonial-wall',
    component: TestimonialWall,
    name: 'Testimonial Wall (Masonry)',
    category: 'Testimonials',
    defaultProps: {
      title: "Loved by Thousands",
      testimonials: [
        { name: "Emily Watson", role: "Designer", content: "Absolutely incredible! Best investment we've made.", rating: 5 },
        { name: "James Wilson", role: "Developer", content: "The quality and support are outstanding. Highly recommended!", rating: 5 },
        { name: "Lisa Anderson", role: "Entrepreneur", content: "Game-changing service. Our productivity has doubled!", rating: 5 },
        { name: "Tom Harris", role: "Manager", content: "Professional, reliable, and results-driven. Love it!", rating: 5 },
        { name: "Nina Patel", role: "Consultant", content: "Exceeded all expectations. Couldn't be happier!", rating: 5 },
        { name: "Chris Moore", role: "Director", content: "The best decision for our business this year.", rating: 5 }
      ]
    }
  }
];
