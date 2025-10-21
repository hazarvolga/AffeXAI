"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroCarousel = HeroCarousel;
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const carousel_1 = require("@/components/ui/carousel");
const button_1 = require("@/components/ui/button");
const tabs_1 = require("@/components/ui/tabs");
const hero_data_1 = require("@/lib/hero-data");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const embla_carousel_autoplay_1 = __importDefault(require("embla-carousel-autoplay"));
const TABS = [
    { id: 'solutions', name: 'Çözümler' },
    { id: 'products', name: 'Ürünler' },
    { id: 'successStories', name: 'Başarı Hikayeleri' },
];
function HeroCarousel() {
    const [api, setApi] = (0, react_1.useState)();
    const [current, setCurrent] = (0, react_1.useState)(0);
    const [activeTab, setActiveTab] = (0, react_1.useState)(TABS[0].id);
    const [slides, setSlides] = (0, react_1.useState)([]);
    const autoplay = (0, react_1.useRef)((0, embla_carousel_autoplay_1.default)({ delay: 5000, stopOnInteraction: true }));
    (0, react_1.useEffect)(() => {
        // Set initial slides
        setSlides(hero_data_1.heroData[activeTab]);
        setCurrent(0);
        api?.scrollTo(0, true);
    }, [activeTab, api]);
    (0, react_1.useEffect)(() => {
        if (!api)
            return;
        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };
        api.on('select', onSelect);
        onSelect(); // Set initial state
        return () => {
            api.off('select', onSelect);
        };
    }, [api]);
    const handleTabChange = (value) => {
        setActiveTab(value);
    };
    const scrollPrev = () => api?.scrollPrev();
    const scrollNext = () => api?.scrollNext();
    return (<section className="relative w-full bg-secondary overflow-hidden">
        <carousel_1.Carousel setApi={setApi} className="w-full" plugins={[autoplay.current]} onMouseEnter={autoplay.current.stop} onMouseLeave={autoplay.current.reset}>
            <carousel_1.CarouselContent>
            {slides.map((slide, index) => (<carousel_1.CarouselItem key={index}>
                <div className="relative aspect-[16/7] w-full">
                    <image_1.default src={slide.image} alt={slide.headline} fill className="object-cover" priority={index === 0} data-ai-hint={slide.imageHint}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                        <div className="container mx-auto px-4">
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white max-w-3xl drop-shadow-lg font-headline">
                                {slide.headline}
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">
                                {slide.subheadline}
                            </p>
                            <button_1.Button size="lg" asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                                <link_1.default href={slide.ctaLink}>
                                    {slide.ctaText} <lucide_react_1.ArrowRight className="ml-2 h-5 w-5"/>
                                </link_1.default>
                            </button_1.Button>
                        </div>
                    </div>
                </div>
                </carousel_1.CarouselItem>))}
            </carousel_1.CarouselContent>
            {/* Custom Navigation Buttons */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                <button_1.Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/80 backdrop-blur-sm border-white/50" onClick={scrollPrev}>
                    <lucide_react_1.ChevronLeft className="h-6 w-6 text-white"/>
                </button_1.Button>
            </div>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                <button_1.Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/80 backdrop-blur-sm border-white/50" onClick={scrollNext}>
                    <lucide_react_1.ChevronRight className="h-6 w-6 text-white"/>
                </button_1.Button>
            </div>
        </carousel_1.Carousel>
        
        <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="container mx-auto px-4">
                 <tabs_1.Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
                    <tabs_1.TabsList className="grid w-full grid-cols-3 bg-white/20 backdrop-blur-sm p-1.5 h-auto rounded-t-lg rounded-b-none border-b-0">
                        {TABS.map(tab => (<tabs_1.TabsTrigger key={tab.id} value={tab.id} className="text-white/80 data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md py-2.5 transition-all">
                                {tab.name}
                            </tabs_1.TabsTrigger>))}
                    </tabs_1.TabsList>
                </tabs_1.Tabs>
                 {/* Carousel Dots */}
                <div className="absolute bottom-0 right-4 hidden md:flex items-center gap-2 pb-4">
                    {slides.map((_, index) => (<button key={index} onClick={() => api?.scrollTo(index)} className={(0, utils_1.cn)("h-2 w-2 rounded-full bg-white/50 transition-all", current === index ? "w-4 bg-white" : "hover:bg-white/80")} aria-label={`Go to slide ${index + 1}`}/>))}
                </div>
            </div>
        </div>
    </section>);
}
//# sourceMappingURL=hero-carousel.js.map