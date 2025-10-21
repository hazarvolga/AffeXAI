"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductsPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const products_data_1 = require("@/lib/products-data");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function ProductsPage() {
    return (<div>
            <page_hero_1.PageHero title="Ürünler" subtitle="İhtiyaçlarınıza özel olarak tasarlanmış, sektör lideri Allplan ve iş ortağı ürünlerini keşfedin."/>
            <breadcrumb_1.Breadcrumb items={[{ name: 'Ürünler', href: '/products' }]}/>
            <div className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {products_data_1.productsData.map((product) => (<card_1.Card key={product.id} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="relative aspect-video">
                                <image_1.default src={product.imageUrl} alt={product.title} fill className="object-cover" data-ai-hint={product.imageHint}/>
                            </div>
                            <card_1.CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-primary/10 p-2 rounded-md">
                                        <product.Icon className="h-6 w-6 text-primary"/>
                                    </div>
                                    <div>
                                        <card_1.CardTitle className="text-xl">{product.title}</card_1.CardTitle>
                                        <card_1.CardDescription>{product.category}</card_1.CardDescription>
                                    </div>
                                </div>
                            </card_1.CardHeader>
                            <card_1.CardContent className="flex-grow">
                                <p className="text-muted-foreground mb-4">{product.description}</p>
                            </card_1.CardContent>
                            <card_1.CardFooter>
                                <button_1.Button asChild className="w-full" variant="secondary">
                                    <link_1.default href={`/products/${product.id}`}>
                                        Kategoriyi İncele
                                        <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                                    </link_1.default>
                                </button_1.Button>
                            </card_1.CardFooter>
                        </card_1.Card>))}
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map