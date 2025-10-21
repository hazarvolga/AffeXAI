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
exports.ResourcesSection = ResourcesSection;
const react_1 = __importStar(require("react"));
const tabs_1 = require("@/components/ui/tabs");
const resources_data_1 = require("@/lib/resources-data");
const card_1 = require("./ui/card");
const button_1 = require("./ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function ResourcesSection() {
    const [activeTab, setActiveTab] = (0, react_1.useState)(resources_data_1.resourcesData.tabs[0].id);
    return (<section className="w-full py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                        Kaynaklar
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Sektördeki bilgiyi keşfedin, becerilerinizi geliştirin ve projelerinizi ileriye taşıyın.
                    </p>
                </div>

                <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex justify-center">
                        <tabs_1.TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto">
                            {resources_data_1.resourcesData.tabs.map(tab => (<tabs_1.TabsTrigger key={tab.id} value={tab.id} className="py-2.5 flex items-center gap-2">
                                    <tab.icon className="h-4 w-4"/>
                                    {tab.title}
                                </tabs_1.TabsTrigger>))}
                        </tabs_1.TabsList>
                    </div>

                    {resources_data_1.resourcesData.tabs.map(tab => (<tabs_1.TabsContent key={tab.id} value={tab.id} className="mt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {resources_data_1.resourcesData.content[tab.id].map((item, index) => (<card_1.Card key={index} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        <card_1.CardHeader>
                                            <card_1.CardTitle>{item.title}</card_1.CardTitle>
                                             {item.description && (<card_1.CardDescription className="pt-2">{item.description}</card_1.CardDescription>)}
                                        </card_1.CardHeader>
                                        <card_1.CardFooter className="mt-auto">
                                            <button_1.Button asChild className="w-full" variant="outline">
                                                <link_1.default href={item.ctaLink}>
                                                    {item.ctaText}
                                                    <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                                                </link_1.default>
                                            </button_1.Button>
                                        </card_1.CardFooter>
                                    </card_1.Card>))}
                            </div>
                        </tabs_1.TabsContent>))}
                </tabs_1.Tabs>
            </div>
        </section>);
}
//# sourceMappingURL=resources-section.js.map