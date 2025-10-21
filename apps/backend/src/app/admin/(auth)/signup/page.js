"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupPage;
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const actions_1 = require("./actions");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function SubmitButton() {
    const { pending } = (0, react_dom_1.useFormStatus)();
    return (<button_1.Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Hesap Oluşturuluyor...' : <><lucide_react_1.UserPlus className="mr-2"/> Hesap Oluştur</>}
    </button_1.Button>);
}
function SignupPage() {
    const initialState = { message: '' };
    const [state, formAction] = (0, react_1.useActionState)(actions_1.signup, initialState);
    return (<card_1.Card className="w-full max-w-md">
      <card_1.CardHeader className="text-center">
        <card_1.CardTitle className="text-2xl font-bold">Yeni Hesap Oluştur</card_1.CardTitle>
        <card_1.CardDescription>Başlamak için bilgilerinizi girin.</card_1.CardDescription>
      </card_1.CardHeader>
      <form action={formAction}>
        <card_1.CardContent className="space-y-6">
            <div className="space-y-2">
                <label_1.Label htmlFor="name">Adınız Soyadınız</label_1.Label>
                <div className="relative flex items-center">
                   <lucide_react_1.User className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                   <input_1.Input id="name" name="name" placeholder="Ahmet Yılmaz" required className="pl-10"/>
                </div>
            </div>
          <div className="space-y-2">
            <label_1.Label htmlFor="email">E-posta Adresi</label_1.Label>
             <div className="relative flex items-center">
                <lucide_react_1.Mail className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                <input_1.Input id="email" name="email" type="email" placeholder="ornek@example.com" required className="pl-10"/>
            </div>
          </div>
          <div className="space-y-2">
            <label_1.Label htmlFor="password">Şifre</label_1.Label>
             <div className="relative flex items-center">
                <lucide_react_1.KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                <input_1.Input id="password" name="password" type="password" placeholder="En az 8 karakter" required className="pl-10"/>
            </div>
          </div>
        </card_1.CardContent>
        <card_1.CardFooter className="flex flex-col gap-4">
           {state.message && (<alert_1.Alert variant={state.issues ? 'destructive' : 'default'}>
                <lucide_react_1.Terminal className="h-4 w-4"/>
                <alert_1.AlertTitle>{state.issues ? 'Hata' : 'Durum'}</alert_1.AlertTitle>
                <alert_1.AlertDescription>
                {state.message}
                {state.issues && (<ul className="list-disc list-inside mt-2">
                        {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                    </ul>)}
                </alert_1.AlertDescription>
            </alert_1.Alert>)}
          <SubmitButton />
           <div className="text-center text-sm text-muted-foreground">
                Zaten bir hesabınız var mı? <link_1.default href="/admin/login" className="font-medium text-primary hover:underline">Giriş Yapın</link_1.default>
            </div>
        </card_1.CardFooter>
      </form>
    </card_1.Card>);
}
//# sourceMappingURL=page.js.map