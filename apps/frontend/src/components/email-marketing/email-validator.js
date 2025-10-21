"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = EmailValidator;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const progress_1 = require("@/components/ui/progress");
const separator_1 = require("@/components/ui/separator");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
function EmailValidator() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [isValidating, setIsValidating] = (0, react_1.useState)(false);
    const [result, setResult] = (0, react_1.useState)(null);
    const handleValidate = async () => {
        if (!email || !email.includes('@')) {
            return;
        }
        setIsValidating(true);
        setResult(null);
        try {
            const response = await fetch(`http://localhost:9006/api/email-marketing/subscribers/validate-email?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Validation failed');
            }
            const data = await response.json();
            setResult(data);
        }
        catch (error) {
            console.error('Validation error:', error);
            setResult({
                email,
                isValid: false,
                status: 'unknown',
                confidence: 0,
                error: 'Validation service unavailable',
            });
        }
        finally {
            setIsValidating(false);
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'valid':
                return (<badge_1.Badge variant="default" className="bg-green-500">
            <lucide_react_1.CheckCircle2 className="h-3 w-3 mr-1"/>
            Valid
          </badge_1.Badge>);
            case 'risky':
                return (<badge_1.Badge variant="default" className="bg-amber-500">
            <lucide_react_1.AlertTriangle className="h-3 w-3 mr-1"/>
            Risky
          </badge_1.Badge>);
            case 'invalid':
                return (<badge_1.Badge variant="destructive">
            <lucide_react_1.XCircle className="h-3 w-3 mr-1"/>
            Invalid
          </badge_1.Badge>);
            default:
                return (<badge_1.Badge variant="secondary">
            Unknown
          </badge_1.Badge>);
        }
    };
    const getConfidenceColor = (confidence) => {
        if (confidence >= 70)
            return 'bg-green-500';
        if (confidence >= 30)
            return 'bg-amber-500';
        return 'bg-red-500';
    };
    const renderCheckItem = (icon, label, check, suggestion) => {
        if (!check)
            return null;
        return (<div className="flex items-start gap-3 p-3 rounded-lg border">
        <div className={(0, utils_1.cn)('mt-0.5', check.isValid ? 'text-green-600' : 'text-red-600')}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{label}</span>
            {check.isValid ? (<lucide_react_1.CheckCircle2 className="h-4 w-4 text-green-600"/>) : (<lucide_react_1.XCircle className="h-4 w-4 text-red-600"/>)}
          </div>
          <p className="text-xs text-muted-foreground">{check.details}</p>
          {suggestion && (<p className="text-xs text-blue-600 mt-1">
              Suggestion: {suggestion}
            </p>)}
        </div>
      </div>);
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Email Validator</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Validate email addresses for quality and authenticity
        </p>
      </div>

      {/* Input Section */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Validate Email Address</card_1.CardTitle>
          <card_1.CardDescription>
            Ensure email addresses are properly formatted and belong to valid domains
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="flex gap-2">
            <input_1.Input type="email" placeholder="Enter email address to validate..." value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleValidate()} disabled={isValidating}/>
            <button_1.Button onClick={handleValidate} disabled={isValidating || !email} className="min-w-[120px]">
              {isValidating ? (<>
                  <lucide_react_1.Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                  Validating...
                </>) : (<>
                  <lucide_react_1.Shield className="h-4 w-4 mr-2"/>
                  Validate
                </>)}
            </button_1.Button>
          </div>

          {result?.checks?.typo?.suggestion && (<div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 border border-blue-200 dark:border-blue-900">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <lucide_react_1.Zap className="h-4 w-4 inline mr-1"/>
                Did you mean: <strong>{result.checks.typo.suggestion}</strong>?
              </p>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>

      {/* Results Section */}
      {result && (<card_1.Card>
          <card_1.CardHeader>
            <div className="flex items-center justify-between">
              <card_1.CardTitle>Validation Result</card_1.CardTitle>
              {getStatusBadge(result.status)}
            </div>
            <card_1.CardDescription>
              Detailed analysis of {result.email}
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-6">
            {/* Confidence Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Confidence Score</span>
                <span className="text-2xl font-bold">{result.confidence}%</span>
              </div>
              <div className="relative">
                <progress_1.Progress value={result.confidence} className="h-3"/>
                <div className={(0, utils_1.cn)('absolute top-0 left-0 h-3 rounded-full transition-all', getConfidenceColor(result.confidence))} style={{ width: `${result.confidence}%` }}/>
              </div>
              <p className="text-xs text-muted-foreground">
                {result.confidence >= 70 && 'High confidence - Email is likely valid'}
                {result.confidence >= 30 && result.confidence < 70 && 'Medium confidence - Proceed with caution'}
                {result.confidence < 30 && 'Low confidence - Email is likely invalid'}
              </p>
            </div>

            <separator_1.Separator />

            {/* Validation Checks */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <lucide_react_1.TrendingUp className="h-4 w-4"/>
                Validation Checks
              </h4>

              {renderCheckItem(<lucide_react_1.Mail className="h-4 w-4"/>, 'Syntax', result.checks?.syntax)}

              {renderCheckItem(<lucide_react_1.Globe className="h-4 w-4"/>, 'Domain', result.checks?.domain)}

              {renderCheckItem(<lucide_react_1.Server className="h-4 w-4"/>, 'MX Records', result.checks?.mx)}

              {result.checks?.disposable && renderCheckItem(<lucide_react_1.AlertTriangle className="h-4 w-4"/>, 'Disposable Email', result.checks.disposable)}

              {result.checks?.roleAccount && renderCheckItem(<lucide_react_1.UserX className="h-4 w-4"/>, 'Role Account', result.checks.roleAccount)}

              {result.checks?.typo && renderCheckItem(<lucide_react_1.Zap className="h-4 w-4"/>, 'Typo Detection', result.checks.typo, result.checks.typo.suggestion)}

              {result.checks?.domainReputation && (<div className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={(0, utils_1.cn)('mt-0.5', result.checks.domainReputation.reputation === 'good' ? 'text-green-600' : 'text-red-600')}>
                    <lucide_react_1.Shield className="h-4 w-4"/>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Domain Reputation</span>
                      <badge_1.Badge variant={result.checks.domainReputation.reputation === 'good' ? 'default' : 'destructive'} className="text-xs">
                        {result.checks.domainReputation.reputation}
                      </badge_1.Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {result.checks.domainReputation.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence: {result.checks.domainReputation.confidence}%
                    </p>
                  </div>
                </div>)}

              {result.checks?.ipReputation && (<div className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={(0, utils_1.cn)('mt-0.5', result.checks.ipReputation.reputation === 'good' ? 'text-green-600' : 'text-red-600')}>
                    <lucide_react_1.Shield className="h-4 w-4"/>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">IP Reputation</span>
                      <badge_1.Badge variant={result.checks.ipReputation.reputation === 'good' ? 'default' : 'destructive'} className="text-xs">
                        {result.checks.ipReputation.reputation}
                      </badge_1.Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {result.checks.ipReputation.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence: {result.checks.ipReputation.confidence}%
                    </p>
                  </div>
                </div>)}
            </div>

            {result.error && (<div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 border border-red-200 dark:border-red-900">
                <p className="text-sm text-red-900 dark:text-red-100">
                  <lucide_react_1.XCircle className="h-4 w-4 inline mr-1"/>
                  Error: {result.error}
                </p>
              </div>)}
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Info Card */}
      <card_1.Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-sm text-blue-900 dark:text-blue-100">
            How It Works
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="text-xs text-blue-800 dark:text-blue-200 space-y-2">
          <p>• <strong>Syntax Check:</strong> Validates email format and structure</p>
          <p>• <strong>Domain Validation:</strong> Verifies domain exists and is configured</p>
          <p>• <strong>MX Records:</strong> Checks mail server configuration</p>
          <p>• <strong>Disposable Detection:</strong> Identifies temporary email services</p>
          <p>• <strong>Role Account Detection:</strong> Flags generic addresses (admin@, info@)</p>
          <p>• <strong>Typo Detection:</strong> Suggests corrections for common misspellings</p>
          <p>• <strong>Domain Reputation:</strong> Assesses sender domain trustworthiness</p>
          <p>• <strong>IP Reputation:</strong> Checks sender IP against blacklists</p>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=email-validator.js.map