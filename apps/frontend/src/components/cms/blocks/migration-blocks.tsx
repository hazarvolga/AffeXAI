// Migration blocks - CMS-ready components for migrated backup pages
// All components are props-driven and editable through visual editor

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Download,
  PlayCircle,
  Award,
  Check,
  Mail,
  Rocket,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { TimelineCarousel } from '@/components/timeline-carousel';

// ============================================================================
// 1. HERO CAROUSEL (with tabs and autoplay)
// ============================================================================

interface HeroSlide {
  image: string;
  imageHint: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroTab {
  id: string;
  name: string;
  slides: HeroSlide[];
}

interface CMSHeroCarouselProps {
  tabs?: HeroTab[];
  autoplayDelay?: number;
  cssClasses?: string;
}

export const CMSHeroCarousel: React.FC<CMSHeroCarouselProps> = ({
  tabs = [],
  autoplayDelay = 5000,
  cssClasses = '',
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  const [slides, setSlides] = useState<HeroSlide[]>([]);

  const autoplay = useRef(Autoplay({ delay: autoplayDelay, stopOnInteraction: true }));

  useEffect(() => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    if (activeTabData) {
      // Filter out slides with empty or invalid images
      const validSlides = activeTabData.slides.filter(
        (slide) => slide.image && slide.image.trim() !== ''
      );
      setSlides(validSlides);
      setCurrent(0);
      api?.scrollTo(0, true);
    }
  }, [activeTab, tabs, api]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  if (tabs.length === 0) return null;

  // Don't render if no valid slides with images
  if (slides.length === 0) return null;

  return (
    <section className={cn('relative w-full bg-secondary overflow-hidden', cssClasses)}>
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[16/7] w-full">
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={slide.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                  <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white max-w-3xl drop-shadow-lg font-headline">
                      {slide.headline}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">
                      {slide.subheadline}
                    </p>
                    <Button size="lg" asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href={slide.ctaLink}>
                        {slide.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/80 backdrop-blur-sm border-white/50"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/80 backdrop-blur-sm border-white/50"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>
      </Carousel>

      {/* Tabs */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
            <TabsList className="grid bg-white/20 backdrop-blur-sm p-1.5 h-auto rounded-t-lg rounded-b-none border-b-0"
              style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="text-white/80 data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md py-2.5 transition-all"
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Carousel Dots */}
          <div className="absolute bottom-0 right-4 hidden md:flex items-center gap-2 pb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2 w-2 rounded-full bg-white/50 transition-all',
                  current === index ? 'w-4 bg-white' : 'hover:bg-white/80'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 2. SOLUTIONS CAROUSEL (with thumbnails)
// ============================================================================

interface SolutionSlide {
  id: string;
  category: string;
  title: string;
  description: string;
  items: { title: string; href: string }[];
  imageUrl: string;
  imageHint: string;
  iconName?: string; // Icon name from lucide-react
}

interface CMSSolutionsCarouselProps {
  title?: string;
  subtitle?: string;
  slides?: SolutionSlide[];
  cssClasses?: string;
}

export const CMSSolutionsCarousel: React.FC<CMSSolutionsCarouselProps> = ({
  title = 'Çözümlerimiz',
  subtitle = 'Sektörünüz ne olursa olsun, projenizin her aşaması için güçlü ve esnek bir çözümümüz var.',
  slides = [],
  cssClasses = '',
}) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const newSelectedIndex = mainApi.selectedScrollSnap();
    setSelectedIndex(newSelectedIndex);
    thumbApi.scrollTo(newSelectedIndex);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);
  }, [mainApi, onSelect]);

  // Filter out slides with empty or invalid images
  const validSlides = slides.filter(
    (slide) => slide.imageUrl && slide.imageUrl.trim() !== ''
  );

  if (validSlides.length === 0) return null;

  return (
    <section className={cn('w-full py-16 md:py-24 bg-background', cssClasses)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Main Carousel */}
        <Carousel setApi={setMainApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {validSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <Card className="overflow-hidden shadow-lg border-none bg-secondary/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="secondary" className="gap-2 items-center">
                          {slide.category}
                        </Badge>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-headline leading-tight hover:text-primary transition-colors">
                        {slide.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">{slide.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
                        {slide.items.map((item) => (
                          <li key={item.title}>
                            <Link href={item.href} className="hover:text-primary transition-colors">
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative aspect-[4/3] lg:aspect-auto min-h-[300px]">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        data-ai-hint={slide.imageHint}
                      />
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Thumbnail Carousel */}
        <div className="mt-8">
          <Carousel
            setApi={setThumbApi}
            opts={{
              align: 'start',
              containScroll: 'keepSnaps',
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {validSlides.map((slide, index) => (
                <CarouselItem
                  key={slide.id}
                  onClick={() => onThumbClick(index)}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 group"
                >
                  <div
                    className={cn(
                      'block aspect-[4/3] relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ring-2 ring-transparent',
                      selectedIndex === index ? 'ring-primary shadow-2xl' : 'hover:ring-primary/50'
                    )}
                  >
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={slide.imageHint}
                    />
                    <div
                      className={cn(
                        'absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300',
                        selectedIndex === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                      )}
                    />
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      <h4 className="text-sm font-bold leading-tight line-clamp-2">{slide.title}</h4>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 3. PRODUCTS CAROUSEL (similar to solutions, image on left)
// ============================================================================

interface ProductSlide {
  id: string;
  category: string;
  title: string;
  description: string;
  items: { title: string; href: string }[];
  imageUrl: string;
  imageHint: string;
  iconName?: string;
}

interface CMSProductsCarouselProps {
  title?: string;
  subtitle?: string;
  slides?: ProductSlide[];
  cssClasses?: string;
}

export const CMSProductsCarousel: React.FC<CMSProductsCarouselProps> = ({
  title = 'Ürünlerimiz',
  subtitle = 'İhtiyaçlarınıza özel olarak tasarlanmış, sektör lideri Allplan ve iş ortağı ürünlerini keşfedin.',
  slides = [],
  cssClasses = '',
}) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const newSelectedIndex = mainApi.selectedScrollSnap();
    setSelectedIndex(newSelectedIndex);
    thumbApi.scrollTo(newSelectedIndex);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);
  }, [mainApi, onSelect]);

  // Filter out slides with empty or invalid images
  const validSlides = slides.filter(
    (slide) => slide.imageUrl && slide.imageUrl.trim() !== ''
  );

  if (validSlides.length === 0) return null;

  return (
    <section className={cn('w-full py-16 md:py-24 bg-background', cssClasses)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Main Carousel */}
        <Carousel setApi={setMainApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {validSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <Card className="overflow-hidden shadow-lg border-none bg-secondary/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image on LEFT for products */}
                    <div className="relative aspect-[4/3] lg:aspect-auto min-h-[300px]">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        data-ai-hint={slide.imageHint}
                      />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="secondary" className="gap-2 items-center">
                          {slide.category}
                        </Badge>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-headline leading-tight hover:text-primary transition-colors">
                        {slide.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">{slide.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
                        {slide.items.map((item) => (
                          <li key={item.title}>
                            <Link href={item.href} className="hover:text-primary transition-colors">
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Thumbnail Carousel */}
        <div className="mt-8">
          <Carousel
            setApi={setThumbApi}
            opts={{
              align: 'start',
              containScroll: 'keepSnaps',
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {validSlides.map((slide, index) => (
                <CarouselItem
                  key={slide.id}
                  onClick={() => onThumbClick(index)}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 group"
                >
                  <div
                    className={cn(
                      'block aspect-[4/3] relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ring-2 ring-transparent',
                      selectedIndex === index ? 'ring-primary shadow-2xl' : 'hover:ring-primary/50'
                    )}
                  >
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={slide.imageHint}
                    />
                    <div
                      className={cn(
                        'absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300',
                        selectedIndex === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                      )}
                    />
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      <h4 className="text-sm font-bold leading-tight line-clamp-2">{slide.title}</h4>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 4. PARALLAX SPACER
// ============================================================================

interface CMSParallaxSpacerProps {
  backgroundMediaType?: string;
  backgroundMediaUrl?: string;
  backgroundImageHint?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  cssClasses?: string;
}

export const CMSParallaxSpacer: React.FC<CMSParallaxSpacerProps> = ({
  backgroundMediaType = 'image',
  backgroundMediaUrl = 'https://picsum.photos/seed/parallax/1920/800',
  backgroundImageHint = 'parallax background',
  title = 'Section Title',
  subtitle = 'Section subtitle',
  buttonText,
  buttonLink,
  cssClasses = '',
}) => {
  const getBackgroundStyle = () => {
    if (backgroundMediaType === "image" && backgroundMediaUrl) {
      return {
        backgroundImage: `url(${backgroundMediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <section
      className={cn('relative py-24 overflow-hidden', backgroundMediaType === 'image' && 'bg-fixed', cssClasses)}
      style={getBackgroundStyle()}
      data-ai-hint={backgroundImageHint}
    >
      {/* Video background */}
      {backgroundMediaType === "video" && backgroundMediaUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube background */}
      {backgroundMediaType === "youtube" && backgroundMediaUrl && (
        <iframe
          src={`${backgroundMediaUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${backgroundMediaUrl.split('v=')[1]?.split('&')[0]}`}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          style={{ border: 0, transform: 'scale(1.5)' }}
        />
      )}

      <div className="absolute inset-0 bg-black/50 z-[1]" />
      <div className="container mx-auto px-4 relative text-center text-white z-10">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">{title}</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">{subtitle}</p>
        {buttonText && buttonLink && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={buttonLink}>
                {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <ChevronDown className="h-8 w-8 animate-bounce mt-4" />
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// 5. CERTIFICATE VERIFICATION SECTION
// ============================================================================

interface CMSCertificateVerificationProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  cssClasses?: string;
}

export const CMSCertificateVerification: React.FC<CMSCertificateVerificationProps> = ({
  title = 'Instantly Verify Your Allplan Certificate',
  description = 'Quickly check the validity of your Allplan certificates in real-time.',
  ctaText = 'Check Now',
  ctaLink = 'https://sertifikasorgulama.aluplan.com.tr/',
  cssClasses = '',
}) => {
  return (
    <section className={cn('py-8 bg-secondary/30 border-y', cssClasses)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground font-headline">{title}</h3>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex-shrink-0">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105"
              size="lg"
            >
              <Link href={ctaLink}>
                <Award className="mr-2 h-5 w-5" />
                {ctaText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 6. NEWSLETTER SECTION
// ============================================================================

interface CMSNewsletterSectionProps {
  title?: string;
  subtitle?: string;
  benefits?: string[];
  cssClasses?: string;
}

export const CMSNewsletterSection: React.FC<CMSNewsletterSectionProps> = ({
  title = 'Bültenimize Abone Olun',
  subtitle = 'ALLPLAN güncellemelerini ilk öğrenen siz olun.',
  benefits = [
    'En son sürüm duyuruları ve yenilikler',
    'Etkinliklere, eğitimlere ve webinarlara özel davetiyeler',
    'Sektör, şirket ve ürün haberleri',
  ],
  cssClasses = '',
}) => {
  return (
    <section className={cn('w-full py-16 md:py-24 bg-secondary/30', cssClasses)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Newsletter Panel */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-headline">{title}</CardTitle>
                </div>
                <CardDescription>{subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-6">
                <ul className="space-y-3 text-muted-foreground">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Adınız Soyadınız" type="text" />
                    <Input placeholder="E-posta Adresiniz" type="email" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-xs text-muted-foreground">
                      <Link href="/privacy" className="underline hover:text-primary">
                        Gizlilik politikamızı
                      </Link>{' '}
                      okudum ve kabul ediyorum.
                    </Label>
                  </div>
                  <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Şimdi Abone Ol
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Offers Panel */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center gap-3">
                  <Rocket className="h-6 w-6 text-accent" />
                  ALLPLAN'ı Deneyin veya Teklif Alın
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row lg:flex-col gap-4">
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  14 Günlük Ücretsiz Deneme
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  Teklif İste
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  Paketleri Karşılaştırın
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                  Allplan Paket Karşılaştırması
                </Link>
                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                  BIMPLUS Paket Karşılaştırması
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 7. WHY ALUPLAN (Two-column with image and list)
// ============================================================================

interface CMSWhyAluplanProps {
  title?: string;
  content?: string;
  imageMediaType?: string;
  imageMediaUrl?: string;
  imageImageHint?: string;
  imagePosition?: 'left' | 'right';
  items?: { title: string; description: string }[];
  cssClasses?: string;
}

export const CMSWhyAluplan: React.FC<CMSWhyAluplanProps> = ({
  title = 'Neden Aluplan Digital?',
  content = 'Sektördeki 20 yılı aşkın tecrübemizle...',
  imageMediaType = 'image',
  imageMediaUrl = 'https://picsum.photos/seed/why-aluplan/800/600',
  imageImageHint = 'why aluplan image',
  imagePosition = 'left',
  items = [],
  cssClasses = '',
}) => {
  const imageCol = (
    <div className="relative aspect-[4/3] lg:aspect-auto min-h-[400px] rounded-lg overflow-hidden">
      {/* Image */}
      {imageMediaType === 'image' && imageMediaUrl && (
        <Image src={imageMediaUrl} alt={title} fill className="object-cover" />
      )}

      {/* Video */}
      {imageMediaType === 'video' && imageMediaUrl && (
        <video
          controls
          className="w-full h-full object-cover"
        >
          <source src={imageMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube */}
      {imageMediaType === 'youtube' && imageMediaUrl && (
        <iframe
          src={`${imageMediaUrl}?controls=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );

  const contentCol = (
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-6">
        {title}
      </h2>
      <p className="text-lg text-muted-foreground mb-8">{content}</p>
      {items.length > 0 && (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className={cn('w-full py-16 md:py-24 bg-background', cssClasses)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {imagePosition === 'left' ? (
            <>
              {imageCol}
              {contentCol}
            </>
          ) : (
            <>
              {contentCol}
              {imageCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 8. WORKFLOW SECTION WITH NESTED TABS
// ============================================================================

interface WorkflowItem {
  id: string;
  title: string;
  contentTitle: string;
  text: string;
  image: string;
  imageHint: string;
}

interface WorkflowTab {
  id: string;
  title: string;
  items: WorkflowItem[];
}

interface CMSWorkflowSectionProps {
  title?: string;
  subtitle?: string;
  tabs?: WorkflowTab[];
  cssClasses?: string;
}

export const CMSWorkflowSection: React.FC<CMSWorkflowSectionProps> = ({
  title = 'İş Akışı',
  subtitle = 'Allplan ile proje yaşam döngüsünün her aşamasında verimli çalışın.',
  tabs = [],
  cssClasses = '',
}) => {
  const [activeMainTab, setActiveMainTab] = useState(tabs[0]?.id || '');
  const [activeSubTabs, setActiveSubTabs] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialSubTabs: Record<string, string> = {};
    tabs.forEach((tab) => {
      if (tab.items.length > 0) {
        initialSubTabs[tab.id] = tab.items[0].id;
      }
    });
    setActiveSubTabs(initialSubTabs);
  }, [tabs]);

  if (tabs.length === 0) return null;

  return (
    <section className={cn('w-full py-16 md:py-24 bg-background', cssClasses)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {tabs.map((tab, index) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {index + 1}. {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <Card className="mt-6">
                <CardContent className="p-0">
                  <Tabs
                    value={activeSubTabs[tab.id] || tab.items[0]?.id}
                    onValueChange={(value) =>
                      setActiveSubTabs((prev) => ({ ...prev, [tab.id]: value }))
                    }
                    orientation="vertical"
                    className="grid md:grid-cols-4"
                  >
                    <TabsList className="flex flex-col h-auto rounded-none bg-secondary/50 p-2 items-stretch">
                      {tab.items.map((item) => (
                        <TabsTrigger
                          key={item.id}
                          value={item.id}
                          className="justify-start text-left data-[state=active]:bg-background"
                        >
                          {item.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {tab.items.map((item) => (
                      <TabsContent
                        key={item.id}
                        value={item.id}
                        className="md:col-span-3 m-0 data-[state=active]:flex flex-col md:flex-row"
                      >
                        <div className={`p-8 ${item.image && item.image.trim() !== '' ? 'md:w-1/2' : 'w-full'} flex flex-col justify-center`}>
                          <h3 className="text-2xl font-bold mb-4 font-headline">{item.contentTitle}</h3>
                          <p className="text-muted-foreground">{item.text}</p>
                        </div>
                        {item.image && item.image.trim() !== '' && (
                          <div className="relative md:w-1/2 min-h-[300px]">
                            <Image
                              src={item.image}
                              alt={item.contentTitle}
                              fill
                              className="object-cover"
                              data-ai-hint={item.imageHint}
                            />
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

// ============================================================================
// 9. SIMPLE BLOCKS - For migration scripts compatibility
// ============================================================================

// Hero with Image and Text Overlay
interface HeroWithImageAndTextOverlayProps {
  title?: string;
  subtitle?: string;
  backgroundMediaType?: string;
  backgroundMediaUrl?: string;
  backgroundImageHint?: string;
  cssClasses?: string;
}

export const HeroWithImageAndTextOverlay: React.FC<HeroWithImageAndTextOverlayProps> = ({
  title = 'Welcome',
  subtitle = 'Discover our amazing platform',
  backgroundMediaType = 'image',
  backgroundMediaUrl = 'https://picsum.photos/seed/hero/1920/1080',
  backgroundImageHint = 'hero background',
  cssClasses = '',
}) => {
  const getBackgroundStyle = () => {
    if (backgroundMediaType === "image" && backgroundMediaUrl) {
      return {
        backgroundImage: `url(${backgroundMediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <section
      className={cn('relative h-[500px] overflow-hidden', cssClasses)}
      style={getBackgroundStyle()}
      data-ai-hint={backgroundImageHint}
    >
      {/* Video background */}
      {backgroundMediaType === "video" && backgroundMediaUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube background */}
      {backgroundMediaType === "youtube" && backgroundMediaUrl && (
        <iframe
          src={`${backgroundMediaUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${backgroundMediaUrl.split('v=')[1]?.split('&')[0]}`}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          style={{ border: 0, transform: 'scale(1.5)' }}
        />
      )}

      <div className="absolute inset-0 bg-black/50 z-[1]" />
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-white/90 max-w-2xl">{subtitle}</p>
      </div>
    </section>
  );
};

// Hero with Background Image
interface HeroWithBackgroundImageProps {
  title?: string;
  subtitle?: string;
  backgroundMediaType?: string;
  backgroundMediaUrl?: string;
  backgroundImageHint?: string;
  cssClasses?: string;
}

export const HeroWithBackgroundImage: React.FC<HeroWithBackgroundImageProps> = ({
  title = 'Welcome',
  subtitle = 'Discover our amazing platform',
  backgroundMediaType = 'image',
  backgroundMediaUrl = 'https://picsum.photos/seed/hero-bg/1920/1080',
  backgroundImageHint = 'hero background',
  cssClasses = '',
}) => {
  const getBackgroundStyle = () => {
    if (backgroundMediaType === "image" && backgroundMediaUrl) {
      return {
        backgroundImage: `url(${backgroundMediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <section
      className={cn('relative py-24 overflow-hidden', backgroundMediaType === 'image' && 'bg-fixed', cssClasses)}
      style={getBackgroundStyle()}
      data-ai-hint={backgroundImageHint}
    >
      {/* Video background */}
      {backgroundMediaType === "video" && backgroundMediaUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube background */}
      {backgroundMediaType === "youtube" && backgroundMediaUrl && (
        <iframe
          src={`${backgroundMediaUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${backgroundMediaUrl.split('v=')[1]?.split('&')[0]}`}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          style={{ border: 0, transform: 'scale(1.5)' }}
        />
      )}

      <div className="absolute inset-0 bg-black/60 z-[1]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
};

// Content Section with Title
interface ContentSectionWithTitleProps {
  title?: string;
  content?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ContentSectionWithTitle: React.FC<ContentSectionWithTitleProps> = ({
  title = 'Section Title',
  content = 'Section content goes here. This is a simple content section with a title.',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  return (
    <section
      className={cn(
        // Only apply bg-background if no custom backgroundColor is provided
        backgroundColor === 'transparent' && 'bg-background',
        cssClasses
      )}
      style={{
        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
        color: textColor !== 'inherit' ? textColor : undefined,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
};

// Content with Call to Action
interface ContentWithCallToActionProps {
  title?: string;
  content?: string;
  buttonText?: string;
  buttonUrl?: string;
  cssClasses?: string;
}

export const ContentWithCallToAction: React.FC<ContentWithCallToActionProps> = ({
  title = 'Ready to Get Started?',
  content = 'Join thousands of satisfied customers today.',
  buttonText = 'Get Started',
  buttonUrl = '#',
  cssClasses = '',
}) => {
  return (
    <section className={cn('py-16 bg-primary/5', cssClasses)}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{content}</p>
        <Button size="lg" asChild>
          <Link href={buttonUrl}>
            {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

// Content with Image Two Column
interface ContentWithImageTwoColumnProps {
  title?: string;
  content?: string;
  imageMediaType?: string;
  imageMediaUrl?: string;
  imageImageHint?: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  gap?: string;
  cssClasses?: string;
}

export const ContentWithImageTwoColumn: React.FC<ContentWithImageTwoColumnProps> = ({
  title = 'Our Story',
  content = 'Learn about our journey and what makes us unique.',
  imageMediaType = 'image',
  imageMediaUrl = 'https://picsum.photos/seed/two-col/800/600',
  imageImageHint = 'content image',
  imagePosition = 'right',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  gap = '3rem',
  cssClasses = '',
}) => {
  const imageCol = (
    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
      {/* Image */}
      {imageMediaType === 'image' && imageMediaUrl && (
        <Image src={imageMediaUrl} alt={title} fill className="object-cover" />
      )}

      {/* Video */}
      {imageMediaType === 'video' && imageMediaUrl && (
        <video
          controls
          className="w-full h-full object-cover"
        >
          <source src={imageMediaUrl} type="video/mp4" />
        </video>
      )}

      {/* YouTube */}
      {imageMediaType === 'youtube' && imageMediaUrl && (
        <iframe
          src={`${imageMediaUrl}?controls=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );

  const contentCol = (
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );

  return (
    <section
      className={cn(
        // Only apply bg-background if no custom backgroundColor is provided
        backgroundColor === 'transparent' && 'bg-background',
        cssClasses
      )}
      style={{
        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
        color: textColor !== 'inherit' ? textColor : undefined,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{ gap }}
        >
          {imagePosition === 'left' ? (
            <>
              {imageCol}
              {contentCol}
            </>
          ) : (
            <>
              {contentCol}
              {imageCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Newsletter Signup Form
interface NewsletterSignupFormProps {
  title?: string;
  subtitle?: string;
  cssClasses?: string;
}

export const NewsletterSignupForm: React.FC<NewsletterSignupFormProps> = ({
  title = 'Subscribe to Our Newsletter',
  subtitle = 'Get the latest updates delivered to your inbox.',
  cssClasses = '',
}) => {
  return (
    <section className={cn('py-16 bg-secondary/30', cssClasses)}>
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <div className="flex items-start gap-2 mt-4">
              <Checkbox id="privacy" />
              <Label htmlFor="privacy" className="text-sm text-muted-foreground">
                I agree to receive marketing emails and accept the privacy policy.
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// ============================================================================
// MIGRATION BLOCKS ARRAY - For editor-canvas.tsx componentRegistry
// ============================================================================

export const migrationBlocks = [
  {
    id: 'cms-hero-carousel',
    name: 'Hero Carousel',
    description: 'Hero carousel with tabs, autoplay, and navigation (CMS-ready)',
    category: 'Migration',
    component: CMSHeroCarousel,
  },
  {
    id: 'cms-solutions-carousel',
    name: 'Solutions Carousel',
    description: 'Solutions carousel with thumbnails (CMS-ready)',
    category: 'Migration',
    component: CMSSolutionsCarousel,
  },
  {
    id: 'cms-products-carousel',
    name: 'Products Carousel',
    description: 'Products carousel with thumbnails (CMS-ready)',
    category: 'Migration',
    component: CMSProductsCarousel,
  },
  {
    id: 'cms-parallax-spacer',
    name: 'Parallax Spacer',
    description: 'Parallax background section with CTA (CMS-ready)',
    category: 'Migration',
    component: CMSParallaxSpacer,
  },
  {
    id: 'cms-certificate-verification',
    name: 'Certificate Verification',
    description: 'Certificate verification banner (CMS-ready)',
    category: 'Migration',
    component: CMSCertificateVerification,
  },
  {
    id: 'cms-newsletter-section',
    name: 'Newsletter Section',
    description: 'Newsletter signup with offers panel (CMS-ready)',
    category: 'Migration',
    component: CMSNewsletterSection,
  },
  {
    id: 'cms-why-aluplan',
    name: 'Why Aluplan',
    description: 'Two-column section with image and list items (CMS-ready)',
    category: 'Migration',
    component: CMSWhyAluplan,
  },
  {
    id: 'cms-workflow-section',
    name: 'Workflow Section',
    description: 'Workflow section with nested tabs (CMS-ready)',
    category: 'Migration',
    component: CMSWorkflowSection,
  },
  {
    id: 'hero-with-image-and-text-overlay',
    name: 'Hero with Image and Text Overlay',
    description: 'Simple hero section with background image and text overlay',
    category: 'Migration',
    component: HeroWithImageAndTextOverlay,
  },
  {
    id: 'hero-with-background-image',
    name: 'Hero with Background Image',
    description: 'Hero section with fixed background image',
    category: 'Migration',
    component: HeroWithBackgroundImage,
  },
  {
    id: 'content-section-with-title',
    name: 'Content Section with Title',
    description: 'Simple content section with title and HTML content',
    category: 'Migration',
    component: ContentSectionWithTitle,
  },
  {
    id: 'content-with-call-to-action',
    name: 'Content with Call to Action',
    description: 'Content section with centered CTA button',
    category: 'Migration',
    component: ContentWithCallToAction,
  },
  {
    id: 'content-with-image-two-column',
    name: 'Content with Image Two Column',
    description: 'Two-column layout with content and image',
    category: 'Migration',
    component: ContentWithImageTwoColumn,
  },
  {
    id: 'newsletter-signup-form',
    name: 'Newsletter Signup Form',
    description: 'Newsletter subscription form with privacy checkbox',
    category: 'Migration',
    component: NewsletterSignupForm,
  },
  {
    id: 'cms-timeline-carousel',
    name: 'Timeline Carousel',
    description: 'Interactive timeline carousel for case studies',
    category: 'Migration',
    component: TimelineCarousel,
  },
];
