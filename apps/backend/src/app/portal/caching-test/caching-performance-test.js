"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CachingPerformanceTest;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const usersService_1 = __importDefault(require("@/lib/api/usersService"));
const eventsService_1 = __importDefault(require("@/lib/api/eventsService"));
const emailCampaignsService_1 = __importDefault(require("@/lib/api/emailCampaignsService"));
function CachingPerformanceTest() {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [events, setEvents] = (0, react_1.useState)([]);
    const [campaigns, setCampaigns] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)({
        users: false,
        events: false,
        campaigns: false
    });
    const [timestamps, setTimestamps] = (0, react_1.useState)({
        users: 0,
        events: 0,
        campaigns: 0
    });
    const fetchUsers = async () => {
        setLoading(prev => ({ ...prev, users: true }));
        const startTime = Date.now();
        try {
            const data = await usersService_1.default.getAllUsers();
            setUsers(data);
            setTimestamps(prev => ({ ...prev, users: Date.now() - startTime }));
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
        finally {
            setLoading(prev => ({ ...prev, users: false }));
        }
    };
    const fetchEvents = async () => {
        setLoading(prev => ({ ...prev, events: true }));
        const startTime = Date.now();
        try {
            const data = await eventsService_1.default.getAllEvents();
            setEvents(data);
            setTimestamps(prev => ({ ...prev, events: Date.now() - startTime }));
        }
        catch (error) {
            console.error('Error fetching events:', error);
        }
        finally {
            setLoading(prev => ({ ...prev, events: false }));
        }
    };
    const fetchCampaigns = async () => {
        setLoading(prev => ({ ...prev, campaigns: true }));
        const startTime = Date.now();
        try {
            const data = await emailCampaignsService_1.default.getAllCampaigns();
            setCampaigns(data);
            setTimestamps(prev => ({ ...prev, campaigns: Date.now() - startTime }));
        }
        catch (error) {
            console.error('Error fetching campaigns:', error);
        }
        finally {
            setLoading(prev => ({ ...prev, campaigns: false }));
        }
    };
    // Fetch all data on component mount
    (0, react_1.useEffect)(() => {
        fetchUsers();
        fetchEvents();
        fetchCampaigns();
    }, []);
    return (<div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Users Card */}
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Users Service</card_1.CardTitle>
            <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {timestamps.users > 0 ? `Response time: ${timestamps.users}ms` : 'No data yet'}
            </p>
            <div className="mt-4 flex gap-2">
              <button_1.Button onClick={fetchUsers} disabled={loading.users} size="sm">
                {loading.users ? (<>
                    <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Loading...
                  </>) : ('Fetch Users')}
              </button_1.Button>
              <badge_1.Badge variant={timestamps.users > 50 ? "destructive" : "default"}>
                {timestamps.users > 50 ? "Slow" : "Fast"}
              </badge_1.Badge>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        {/* Events Card */}
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Events Service</card_1.CardTitle>
            <lucide_react_1.Calendar className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">
              {timestamps.events > 0 ? `Response time: ${timestamps.events}ms` : 'No data yet'}
            </p>
            <div className="mt-4 flex gap-2">
              <button_1.Button onClick={fetchEvents} disabled={loading.events} size="sm">
                {loading.events ? (<>
                    <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Loading...
                  </>) : ('Fetch Events')}
              </button_1.Button>
              <badge_1.Badge variant={timestamps.events > 50 ? "destructive" : "default"}>
                {timestamps.events > 50 ? "Slow" : "Fast"}
              </badge_1.Badge>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        {/* Email Campaigns Card */}
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Email Campaigns</card_1.CardTitle>
            <lucide_react_1.Mail className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              {timestamps.campaigns > 0 ? `Response time: ${timestamps.campaigns}ms` : 'No data yet'}
            </p>
            <div className="mt-4 flex gap-2">
              <button_1.Button onClick={fetchCampaigns} disabled={loading.campaigns} size="sm">
                {loading.campaigns ? (<>
                    <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Loading...
                  </>) : ('Fetch Campaigns')}
              </button_1.Button>
              <badge_1.Badge variant={timestamps.campaigns > 50 ? "destructive" : "default"}>
                {timestamps.campaigns > 50 ? "Slow" : "Fast"}
              </badge_1.Badge>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Caching Test Instructions</card_1.CardTitle>
          <card_1.CardDescription>
            How to test the caching performance
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">First Load (No Cache)</h3>
            <p className="text-sm text-muted-foreground">
              The first time you fetch data, it will be slower as it's coming directly from the database.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Subsequent Loads (With Cache)</h3>
            <p className="text-sm text-muted-foreground">
              After the first load, subsequent requests should be faster as they're served from the cache.
              The cache has a TTL of 30-60 seconds depending on the data type.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Cache Invalidation</h3>
            <p className="text-sm text-muted-foreground">
              When you create, update, or delete data, the cache is automatically invalidated to ensure data consistency.
            </p>
          </div>
          <div className="pt-4">
            <button_1.Button onClick={() => {
            fetchUsers();
            fetchEvents();
            fetchCampaigns();
        }}>
              Refresh All Data
            </button_1.Button>
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=caching-performance-test.js.map