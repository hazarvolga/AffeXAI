"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailValidationPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const alert_1 = require("@/components/ui/alert");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const ipReputationService_1 = __importDefault(require("@/lib/api/ipReputationService"));
function EmailValidationPage() {
    const [ipAddress, setIpAddress] = (0, react_1.useState)('');
    const [result, setResult] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const handleCheckReputation = async () => {
        if (!ipAddress) {
            setError('Please enter an IP address');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await ipReputationService_1.default.checkIpReputation(ipAddress);
            setResult(data);
        }
        catch (err) {
            setError(err.message || 'An error occurred while checking IP reputation');
            setResult(null);
        }
        finally {
            setLoading(false);
        }
    };
    const getReputationIcon = () => {
        if (!result)
            return null;
        switch (result.reputation) {
            case 'clean':
                return <lucide_react_1.CheckCircle className="h-5 w-5 text-green-500"/>;
            case 'listed':
                return <lucide_react_1.XCircle className="h-5 w-5 text-red-500"/>;
            case 'unknown':
            default:
                return <lucide_react_1.HelpCircle className="h-5 w-5 text-yellow-500"/>;
        }
    };
    const getReputationColor = () => {
        if (!result)
            return '';
        switch (result.reputation) {
            case 'clean':
                return 'text-green-500';
            case 'listed':
                return 'text-red-500';
            case 'unknown':
            default:
                return 'text-yellow-500';
        }
    };
    const getReputationText = () => {
        if (!result)
            return '';
        switch (result.reputation) {
            case 'clean':
                return 'Clean';
            case 'listed':
                return 'Listed';
            case 'unknown':
            default:
                return 'Unknown';
        }
    };
    return (<div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Validation Tools</h1>
        <p className="text-muted-foreground">Check IP reputation and validate email addresses</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* IP Reputation Checker */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.Shield className="h-5 w-5"/>
              IP Reputation Checker
            </card_1.CardTitle>
            <card_1.CardDescription>
              Check if an IP address is listed on spam blacklists
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="ip-address">IP Address</label_1.Label>
              <div className="flex gap-2">
                <input_1.Input id="ip-address" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} placeholder="Enter IP address (e.g., 192.168.1.1)" className="flex-1"/>
                <button_1.Button onClick={handleCheckReputation} disabled={loading}>
                  {loading ? (<>
                      <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                      Checking...
                    </>) : ('Check')}
                </button_1.Button>
              </div>
            </div>

            {error && (<alert_1.Alert variant="destructive">
                <alert_1.AlertTitle>Error</alert_1.AlertTitle>
                <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
              </alert_1.Alert>)}

            {result && (<div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">IP: {result.ip}</h3>
                    <p className="text-sm text-muted-foreground">
                      Confidence: {result.confidence}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getReputationIcon()}
                    <span className={`font-medium ${getReputationColor()}`}>
                      {getReputationText()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Details</h4>
                  <p className="text-sm text-muted-foreground">
                    {result.details}
                  </p>
                </div>

                {result.listedOn && result.listedOn.length > 0 && (<div className="space-y-2">
                    <h4 className="font-medium">Listed On</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.listedOn.map((server, index) => (<badge_1.Badge key={index} variant="destructive">
                          {server}
                        </badge_1.Badge>))}
                    </div>
                  </div>)}

                {result.errors && result.errors.length > 0 && (<div className="space-y-2">
                    <h4 className="font-medium">Errors</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {result.errors.map((error, index) => (<p key={index} className="flex items-start gap-2">
                          <lucide_react_1.AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0"/>
                          {error}
                        </p>))}
                    </div>
                  </div>)}
              </div>)}
          </card_1.CardContent>
          <card_1.CardFooter className="text-sm text-muted-foreground">
            <p>
              This tool checks the IP address against multiple DNS-based blackhole lists (DNSBLs) 
              to determine if it's associated with spam or malicious activity.
            </p>
          </card_1.CardFooter>
        </card_1.Card>

        {/* Email Validator (Placeholder for future implementation) */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Email Validator</card_1.CardTitle>
            <card_1.CardDescription>
              Validate email addresses for format, domain existence, and reputation
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-muted-foreground">
              This feature will be implemented in a future update. It will provide comprehensive 
              email validation including syntax checking, domain verification, and spam detection.
            </p>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map