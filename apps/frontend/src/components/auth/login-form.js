"use strict";
/**
 * Login Form Component
 *
 * Client-side login form using the auth context.
 */
'use client';
/**
 * Login Form Component
 *
 * Client-side login form using the auth context.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = LoginForm;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const auth_1 = require("@/lib/auth");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
function LoginForm() {
    const router = (0, navigation_1.useRouter)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const { login, isLoading, error, clearError } = (0, auth_1.useAuth)();
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        try {
            await login({ email, password });
            // Redirect to return URL or dashboard
            const returnUrl = searchParams.get('returnUrl') || '/admin/dashboard';
            router.push(returnUrl);
        }
        catch (err) {
            // Error is already set in auth context
            console.error('Login failed:', err);
        }
    };
    return (<form onSubmit={handleSubmit} className="space-y-6">
      {error && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
        </alert_1.Alert>)}

      <div className="space-y-2">
        <label_1.Label htmlFor="email">E-posta Adresi</label_1.Label>
        <div className="relative flex items-center">
          <lucide_react_1.Mail className="absolute left-3 h-4 w-4 text-muted-foreground"/>
          <input_1.Input id="email" name="email" type="email" placeholder="ornek@example.com" required className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>
        </div>
      </div>

      <div className="space-y-2">
        <label_1.Label htmlFor="password">Şifre</label_1.Label>
        <div className="relative flex items-center">
          <lucide_react_1.KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground"/>
          <input_1.Input id="password" name="password" type="password" placeholder="••••••••" required className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>
        </div>
      </div>

      <button_1.Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? ('Giriş Yapılıyor...') : (<>
            <lucide_react_1.LogIn className="mr-2 h-4 w-4"/> Giriş Yap
          </>)}
      </button_1.Button>
    </form>);
}
//# sourceMappingURL=login-form.js.map