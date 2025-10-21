"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SolutionsPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const solutions_data_1 = require("@/lib/solutions-data");
const link_1 = __importDefault(require("next/link"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function SolutionsPage() {
    return (<div>
            <page_hero_1.PageHero title="Çözümler" subtitle="Sektörünüz ne olursa olsun, projenizin her aşaması için güçlü ve esnek bir çözümümüz var."/>
            <breadcrumb_1.Breadcrumb items={[{ name: 'Çözümler', href: '/solutions' }]}/>
            
            <div className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions_data_1.solutionsData.map((solution) => (<card_1.Card key={solution.id} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <card_1.CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-primary/10 p-2 rounded-md">
                                        <solution.Icon className="h-6 w-6 text-primary"/>
                                    </div>
                                    <card_1.CardTitle className="text-xl">{solution.title}</card_1.CardTitle>
                                </div>
                            </card_1.CardHeader>
                            <card_1.CardContent className="flex-grow">
                                <p className="text-muted-foreground mb-4">{solution.description}</p>
                                <ul className="space-y-2 text-sm">
                                    {solution.items.map(item => (<li key={item.title}>
                                            <link_1.default href={item.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                                <lucide_react_1.ArrowRight className="h-3 w-3 text-primary/50"/> {item.title}
                                            </link_1.default>
                                        </li>))}
                                </ul>
                            </card_1.CardContent>
                            <div className="p-6 pt-0 mt-auto">
                                <button_1.Button asChild variant="outline" className="w-full">
                                    <link_1.default href={`/solutions/${solution.id}`}>
                                        Daha Fazla Bilgi
                                        <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                                    </link_1.default>
                                </button_1.Button>
                            </div>
                        </card_1.Card>))}
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map