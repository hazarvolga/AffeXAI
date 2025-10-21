"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaCard = SocialMediaCard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const social_media_data_1 = require("@/lib/social-media-data");
function SocialMediaCard() {
    const connectedAccounts = social_media_data_1.socialAccounts.filter(a => a.isConnected).length;
    const totalAccounts = social_media_data_1.socialAccounts.length;
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.Share2 className="h-5 w-5"/>
          Sosyal Medya
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <div>
          <p className="text-2xl font-bold">{connectedAccounts}/{totalAccounts}</p>
          <p className="text-xs text-muted-foreground">Bağlı Hesap</p>
        </div>

        <div className="border-t pt-4">
          <div className="flex -space-x-2 overflow-hidden">
            {social_media_data_1.socialAccounts.map(account => {
            const Icon = (0, social_media_data_1.getPlatformIcon)(account.platform);
            return (<div key={account.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted flex items-center justify-center" title={account.platform}>
                  <Icon className="h-4 w-4 text-muted-foreground"/>
                </div>);
        })}
          </div>
        </div>
      </card_1.CardContent>
      <card_1.CardFooter>
        <button_1.Button asChild size="sm" variant="outline" className="w-full">
          <link_1.default href="/admin/social-media">
            Yönet <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/>
          </link_1.default>
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=social-media-card.js.map