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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineCarousel = TimelineCarousel;
const react_1 = __importStar(require("react"));
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const carousel_1 = require("@/components/ui/carousel");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const timeline_data_1 = require("@/lib/timeline-data");
const utils_1 = require("@/lib/utils");
const avatar_1 = require("./ui/avatar");
const lucide_react_1 = require("lucide-react");
const badge_1 = require("./ui/badge");
function TimelineCarousel() {
    const [mainApi, setMainApi] = (0, react_1.useState)();
    const [thumbApi, setThumbApi] = (0, react_1.useState)();
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const onThumbClick = (0, react_1.useCallback)((index) => {
        if (!mainApi || !thumbApi)
            return;
        mainApi.scrollTo(index);
    }, [mainApi, thumbApi]);
    const onSelect = (0, react_1.useCallback)(() => {
        if (!mainApi || !thumbApi)
            return;
        const newSelectedIndex = mainApi.selectedScrollSnap();
        setSelectedIndex(newSelectedIndex);
        thumbApi.scrollTo(newSelectedIndex);
    }, [mainApi, thumbApi, setSelectedIndex]);
    (0, react_1.useEffect)(() => {
        if (!mainApi)
            return;
        onSelect();
        mainApi.on('select', onSelect);
        mainApi.on('reInit', onSelect);
    }, [mainApi, onSelect]);
    return (<section className="w-full py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Öne Çıkan Başarı Hikayeleri
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Allplan çözümlerinin, Türkiye ve dünyadan prestijli projelerde nasıl fark yarattığını keşfedin.
          </p>
        </div>

        {/* Main Carousel */}
        <carousel_1.Carousel setApi={setMainApi} opts={{ loop: true }} className="w-full">
          <carousel_1.CarouselContent>
            {timeline_data_1.timelineData.map((slide) => (<carousel_1.CarouselItem key={slide.id}>
                <card_1.Card className="overflow-hidden shadow-lg border-none">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[4/3] lg:aspect-auto">
                      <image_1.default src={slide.imageUrl} alt={slide.title} fill className="object-cover" data-ai-hint={slide.imageHint}/>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <badge_1.Badge variant="secondary" className="gap-2 items-center">
                          <slide.Icon className="h-4 w-4"/>
                          {slide.category}
                        </badge_1.Badge>
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <lucide_react_1.Calendar className="h-4 w-4"/>
                            <span>{slide.date}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-headline leading-tight hover:text-primary transition-colors">
                        <link_1.default href={slide.ctaLink}>{slide.title}</link_1.default>
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {slide.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <avatar_1.Avatar>
                                <avatar_1.AvatarImage src={slide.author.avatarUrl} alt={slide.author.name}/>
                                <avatar_1.AvatarFallback>
                                    <lucide_react_1.User />
                                </avatar_1.AvatarFallback>
                            </avatar_1.Avatar>
                            <div>
                                <p className="font-semibold text-sm">{slide.author.name}</p>
                                <p className="text-xs text-muted-foreground">Proje Yöneticisi</p>
                            </div>
                        </div>
                        <button_1.Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <link_1.default href={slide.ctaLink}>
                            Devamını Oku <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                          </link_1.default>
                        </button_1.Button>
                      </div>
                    </div>
                  </div>
                </card_1.Card>
              </carousel_1.CarouselItem>))}
          </carousel_1.CarouselContent>
        </carousel_1.Carousel>

        {/* Thumbnail Carousel */}
        <div className="mt-8">
          <carousel_1.Carousel setApi={setThumbApi} opts={{
            align: 'start',
            containScroll: 'keepSnaps',
            dragFree: true,
        }} className="w-full">
            <carousel_1.CarouselContent className="-ml-4">
              {timeline_data_1.timelineData.map((slide, index) => (<carousel_1.CarouselItem key={slide.id} onClick={() => onThumbClick(index)} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 group">
                  <div className={(0, utils_1.cn)('block aspect-[4/3] relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ring-2 ring-transparent', selectedIndex === index ? 'ring-primary shadow-2xl' : 'hover:ring-primary/50')}>
                    <image_1.default src={slide.imageUrl} alt={slide.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={slide.imageHint}/>
                    <div className={(0, utils_1.cn)("absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300", selectedIndex === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-100')}/>
                     <div className="absolute bottom-0 left-0 p-3 text-white">
                        <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{slide.category}</p>
                        <h4 className="text-sm font-bold leading-tight line-clamp-2">{slide.title}</h4>
                     </div>
                  </div>
                </carousel_1.CarouselItem>))}
            </carousel_1.CarouselContent>
          </carousel_1.Carousel>
        </div>
      </div>
    </section>);
}
//# sourceMappingURL=timeline-carousel.js.map