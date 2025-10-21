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
exports.SolutionsCarousel = SolutionsCarousel;
const react_1 = __importStar(require("react"));
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const carousel_1 = require("@/components/ui/carousel");
const card_1 = require("@/components/ui/card");
const solutions_data_1 = require("@/lib/solutions-data");
const utils_1 = require("@/lib/utils");
const badge_1 = require("./ui/badge");
function SolutionsCarousel() {
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
    return (<section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Çözümlerimiz
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sektörünüz ne olursa olsun, projenizin her aşaması için güçlü ve esnek bir çözümümüz var.
          </p>
        </div>

        {/* Main Carousel */}
        <carousel_1.Carousel setApi={setMainApi} opts={{ loop: true }} className="w-full">
          <carousel_1.CarouselContent>
            {solutions_data_1.solutionsData.map((slide) => (<carousel_1.CarouselItem key={slide.id}>
                <card_1.Card className="overflow-hidden shadow-lg border-none bg-secondary/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                        <badge_1.Badge variant="secondary" className="gap-2 items-center">
                            <slide.Icon className="h-4 w-4"/>
                            {slide.category}
                        </badge_1.Badge>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-headline leading-tight hover:text-primary transition-colors">
                            {slide.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {slide.description}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
                           {slide.items.map(item => (<li key={item.title}>
                                    <link_1.default href={item.href} className="hover:text-primary transition-colors">{item.title}</link_1.default>
                                </li>))}
                        </ul>
                    </div>
                    <div className="relative aspect-[4/3] lg:aspect-auto min-h-[300px]">
                      <image_1.default src={slide.imageUrl} alt={slide.title} fill className="object-cover" data-ai-hint={slide.imageHint}/>
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
              {solutions_data_1.solutionsData.map((slide, index) => (<carousel_1.CarouselItem key={slide.id} onClick={() => onThumbClick(index)} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 group">
                  <div className={(0, utils_1.cn)('block aspect-[4/3] relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ring-2 ring-transparent', selectedIndex === index ? 'ring-primary shadow-2xl' : 'hover:ring-primary/50')}>
                    <image_1.default src={slide.imageUrl} alt={slide.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={slide.imageHint}/>
                    <div className={(0, utils_1.cn)("absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300", selectedIndex === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-100')}/>
                     <div className="absolute bottom-0 left-0 p-3 text-white">
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
//# sourceMappingURL=solutions-carousel.js.map