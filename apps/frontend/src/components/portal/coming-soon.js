"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComingSoon = ComingSoon;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function ComingSoon({ icon: Icon = lucide_react_1.Rocket, title, description, expectedDate, backLink = "/portal/dashboard", backLabel = "Panele Dön" }) {
    return (<div className="flex-1 flex items-center justify-center min-h-[600px]">
      <card_1.Card className="max-w-2xl w-full mx-4">
        <card_1.CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="h-10 w-10 text-primary"/>
          </div>
          <div className="space-y-2">
            <card_1.CardTitle className="text-3xl">{title}</card_1.CardTitle>
            <card_1.CardDescription className="text-lg">{description}</card_1.CardDescription>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-6 text-center">
          {expectedDate && (<div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <lucide_react_1.Calendar className="h-4 w-4 text-muted-foreground"/>
              <span className="text-sm font-medium">Beklenen Tarih: {expectedDate}</span>
            </div>)}
          
          <div className="pt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Bu özellik şu anda geliştirme aşamasındadır. 
              Kullanıma sunulduğunda sizleri bilgilendireceğiz.
            </p>
            <button_1.Button asChild className="mt-4">
              <link_1.default href={backLink}>
                <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
                {backLabel}
              </link_1.default>
            </button_1.Button>
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=coming-soon.js.map