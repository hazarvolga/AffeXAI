"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VideosPage;
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const education_data_1 = require("@/lib/education-data");
const button_1 = require("@/components/ui/button");
function VideosPage() {
    const videos = education_data_1.educationData.content.videos;
    return (<div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Eğitim Videoları</h2>
                    <p className="text-muted-foreground">
                        Allplan ve diğer ürünler hakkında ipuçları ve eğitimler.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                     <div className="w-full max-w-sm">
                        <input_1.Input placeholder="Videolarda ara..." icon={lucide_react_1.Search}/>
                    </div>
                    <button_1.Button asChild variant="outline">
                        <link_1.default href="/portal/dashboard">
                            <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
                            Geri Dön
                        </link_1.default>
                    </button_1.Button>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((item, index) => (<link_1.default href="#" key={index}>
                        <card_1.Card className="overflow-hidden group h-full flex flex-col">
                            <div className="relative aspect-video">
                                <image_1.default src={item.thumbnail} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <lucide_react_1.PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors"/>
                                </div>
                            </div>
                            <card_1.CardContent className="p-4 flex-grow">
                                <p className="font-semibold truncate group-hover:text-primary">{item.title}</p>
                                <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                            </card_1.CardContent>
                        </card_1.Card>
                    </link_1.default>))}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map