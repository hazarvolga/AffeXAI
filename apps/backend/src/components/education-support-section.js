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
exports.EducationSupportSection = EducationSupportSection;
const react_1 = __importStar(require("react"));
const tabs_1 = require("@/components/ui/tabs");
const data_1 = require("@/lib/data");
const card_1 = require("./ui/card");
const button_1 = require("./ui/button");
const lucide_react_1 = require("lucide-react");
const carousel_1 = require("./ui/carousel");
const image_1 = __importDefault(require("next/image"));
const embla_carousel_autoplay_1 = __importDefault(require("embla-carousel-autoplay"));
function EducationSupportSection() {
    const [activeTab, setActiveTab] = (0, react_1.useState)(data_1.educationData.tabs[0].id);
    return (<section className="w-full py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                        Eğitim & Destek
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Bilgi birikiminizi artırın, kaynaklarımıza erişin ve ihtiyacınız olan desteği alın.
                    </p>
                </div>

                <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <tabs_1.TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto">
                        {data_1.educationData.tabs.map(tab => (<tabs_1.TabsTrigger key={tab.id} value={tab.id} className="py-2.5 flex items-center gap-2">
                                <tab.icon className="h-4 w-4"/>
                                {tab.title}
                            </tabs_1.TabsTrigger>))}
                    </tabs_1.TabsList>

                    <tabs_1.TabsContent value="training" className="mt-8">
                        <carousel_1.Carousel opts={{ align: "start", loop: true }} plugins={[(0, embla_carousel_autoplay_1.default)({ delay: 5000, stopOnInteraction: true })]} className="w-full">
                            <carousel_1.CarouselContent>
                                {data_1.educationData.content.training.map((item, index) => (<carousel_1.CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <card_1.Card className="h-full flex flex-col">
                                            <card_1.CardHeader>
                                                <card_1.CardTitle className="text-xl">{item.title}</card_1.CardTitle>
                                            </card_1.CardHeader>
                                            <card_1.CardContent className="flex-grow">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                    <lucide_react_1.Calendar className="h-4 w-4"/>
                                                    <span>{item.date}</span>
                                                </div>
                                                <p className="text-muted-foreground">{item.description}</p>
                                            </card_1.CardContent>
                                            <card_1.CardFooter>
                                                <button_1.Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                                    <a href={item.ctaLink}>{item.ctaText} <lucide_react_1.ChevronRight className="ml-2 h-4 w-4"/></a>
                                                </button_1.Button>
                                            </card_1.CardFooter>
                                        </card_1.Card>
                                    </carousel_1.CarouselItem>))}
                            </carousel_1.CarouselContent>
                            <carousel_1.CarouselPrevious className="hidden md:flex"/>
                            <carousel_1.CarouselNext className="hidden md:flex"/>
                        </carousel_1.Carousel>
                    </tabs_1.TabsContent>

                    <tabs_1.TabsContent value="downloads" className="mt-8">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data_1.educationData.content.downloads.map((item, index) => (<card_1.Card key={index} className="flex items-center justify-between p-4">
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{item.category}</p>
                                    </div>
                                    <button_1.Button asChild variant="outline" size="icon">
                                        <a href={item.ctaLink}><lucide_react_1.Download className="h-4 w-4"/></a>
                                    </button_1.Button>
                                </card_1.Card>))}
                        </div>
                    </tabs_1.TabsContent>
                    
                    <tabs_1.TabsContent value="support" className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             {data_1.educationData.content.support.map((item) => (<card_1.Card key={item.id} className="text-center p-6 flex flex-col items-center">
                                     <div className="mb-4 rounded-full bg-primary/10 p-3">
                                        <item.icon className="h-8 w-8 text-primary"/>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground mb-4 flex-grow">{item.description}</p>
                                    <button_1.Button asChild className="w-full">
                                        <a href={item.ctaLink}>{item.ctaText}</a>
                                    </button_1.Button>
                                </card_1.Card>))}
                        </div>
                    </tabs_1.TabsContent>

                     <tabs_1.TabsContent value="videos" className="mt-8">
                        <carousel_1.Carousel opts={{ align: "start", loop: true }} className="w-full">
                            <carousel_1.CarouselContent>
                                {data_1.educationData.content.videos.map((item, index) => (<carousel_1.CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <card_1.Card className="overflow-hidden group">
                                             <div className="relative aspect-video">
                                                <image_1.default src={item.thumbnail} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                                                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <lucide_react_1.PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors"/>
                                                </div>
                                            </div>
                                            <card_1.CardContent className="p-4">
                                                <p className="font-semibold truncate">{item.title}</p>
                                                <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                                            </card_1.CardContent>
                                        </card_1.Card>
                                    </carousel_1.CarouselItem>))}
                            </carousel_1.CarouselContent>
                            <carousel_1.CarouselPrevious className="hidden md:flex"/>
                            <carousel_1.CarouselNext className="hidden md:flex"/>
                        </carousel_1.Carousel>
                    </tabs_1.TabsContent>

                    <tabs_1.TabsContent value="students" className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data_1.educationData.content.students.map((item, index) => (<card_1.Card key={index} className="p-6 text-center">
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground mb-4">{item.description}</p>
                                    <button_1.Button asChild className="bg-accent text-accent-foreground">
                                        <a href={item.ctaLink}>{item.ctaText}</a>
                                    </button_1.Button>
                                </card_1.Card>))}
                        </div>
                    </tabs_1.TabsContent>

                    <tabs_1.TabsContent value="documents" className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data_1.educationData.content.documents.map((item, index) => (<card_1.Card key={index} className="flex items-center justify-between p-4">
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{item.category}</p>
                                    </div>
                                    <button_1.Button asChild variant="outline" size="icon">
                                        <a href={item.ctaLink}><lucide_react_1.Download className="h-4 w-4"/></a>
                                    </button_1.Button>
                                </card_1.Card>))}
                        </div>
                    </tabs_1.TabsContent>
                </tabs_1.Tabs>
            </div>
        </section>);
}
//# sourceMappingURL=education-support-section.js.map