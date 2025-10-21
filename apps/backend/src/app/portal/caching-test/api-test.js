"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiTestPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const textarea_1 = require("@/components/ui/textarea");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
function ApiTestPage() {
    const [endpoint, setEndpoint] = (0, react_1.useState)('/users');
    const [method, setMethod] = (0, react_1.useState)('GET');
    const [response, setResponse] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [timeTaken, setTimeTaken] = (0, react_1.useState)(0);
    const makeRequest = async () => {
        setLoading(true);
        setResponse('');
        setTimeTaken(0);
        const startTime = performance.now();
        try {
            const res = await fetch(`http://localhost:9004${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            const endTime = performance.now();
            setTimeTaken(Math.round(endTime - startTime));
            setResponse(JSON.stringify(data, null, 2));
        }
        catch (error) {
            const endTime = performance.now();
            setTimeTaken(Math.round(endTime - startTime));
            setResponse(`Error: ${error.message}`);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">API Test</h2>
        <p className="text-muted-foreground">
          Test the backend API endpoints and observe caching performance
        </p>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>API Request</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="method">Method</label_1.Label>
              <select id="method" value={method} onChange={(e) => setMethod(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label_1.Label htmlFor="endpoint">Endpoint</label_1.Label>
              <input_1.Input id="endpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="/users"/>
            </div>
          </div>
          
          <button_1.Button onClick={makeRequest} disabled={loading}>
            {loading ? 'Loading...' : 'Send Request'}
          </button_1.Button>
          
          {timeTaken > 0 && (<div className="text-sm text-muted-foreground">
              Response time: {timeTaken}ms
            </div>)}
        </card_1.CardContent>
      </card_1.Card>

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Response</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <textarea_1.Textarea value={response} readOnly className="min-h-[300px] font-mono text-sm" placeholder="Response will appear here..."/>
        </card_1.CardContent>
      </card_1.Card>

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Test Endpoints</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-2">
          <h3 className="font-medium">Users</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <button_1.Button variant="outline" onClick={() => { setEndpoint('/users'); setMethod('GET'); }}>
              GET /users
            </button_1.Button>
            <button_1.Button variant="outline" onClick={() => { setEndpoint('/users/1'); setMethod('GET'); }}>
              GET /users/1
            </button_1.Button>
          </div>
          
          <h3 className="font-medium mt-4">Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <button_1.Button variant="outline" onClick={() => { setEndpoint('/events'); setMethod('GET'); }}>
              GET /events
            </button_1.Button>
            <button_1.Button variant="outline" onClick={() => { setEndpoint('/events/1'); setMethod('GET'); }}>
              GET /events/1
            </button_1.Button>
          </div>
          
          <h3 className="font-medium mt-4">Email Campaigns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <button_1.Button variant="outline" onClick={() => { setEndpoint('/email-campaigns'); setMethod('GET'); }}>
              GET /email-campaigns
            </button_1.Button>
            <button_1.Button variant="outline" onClick={() => { setEndpoint('/email-campaigns/1'); setMethod('GET'); }}>
              GET /email-campaigns/1
            </button_1.Button>
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=api-test.js.map