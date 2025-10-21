"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsTestPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const settingsService_1 = __importDefault(require("@/lib/api/settingsService"));
function SettingsTestPage() {
    const [settings, setSettings] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [updating, setUpdating] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        fetchSettings();
    }, []);
    const fetchSettings = async () => {
        try {
            setLoading(true);
            const data = await settingsService_1.default.getSiteSettings();
            setSettings(data);
        }
        catch (error) {
            console.error('Error fetching settings:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const updateSettings = async () => {
        if (!settings)
            return;
        try {
            setUpdating(true);
            const updatedSettings = await settingsService_1.default.updateSiteSettings(settings);
            setSettings(updatedSettings);
        }
        catch (error) {
            console.error('Error updating settings:', error);
        }
        finally {
            setUpdating(false);
        }
    };
    const handleInputChange = (field, value) => {
        if (settings) {
            setSettings({
                ...settings,
                [field]: value
            });
        }
    };
    const handleContactChange = (field, value) => {
        if (settings) {
            setSettings({
                ...settings,
                contact: {
                    ...settings.contact,
                    [field]: value
                }
            });
        }
    };
    const handleSeoChange = (field, value) => {
        if (settings) {
            setSettings({
                ...settings,
                seo: {
                    ...settings.seo,
                    [field]: value
                }
            });
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (<div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings API Test</h2>
        <p className="text-muted-foreground">
          Test the new backend settings API integration
        </p>
      </div>

      {settings && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Company Settings</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="companyName">Company Name</label_1.Label>
              <input_1.Input id="companyName" value={settings.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)}/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="logoUrl">Logo URL</label_1.Label>
              <input_1.Input id="logoUrl" value={settings.logoUrl} onChange={(e) => handleInputChange('logoUrl', e.target.value)}/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="logoDarkUrl">Dark Logo URL</label_1.Label>
              <input_1.Input id="logoDarkUrl" value={settings.logoDarkUrl} onChange={(e) => handleInputChange('logoDarkUrl', e.target.value)}/>
            </div>
            
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Contact Information</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <div className="space-y-2">
                  <label_1.Label htmlFor="address">Address</label_1.Label>
                  <input_1.Input id="address" value={settings.contact.address} onChange={(e) => handleContactChange('address', e.target.value)}/>
                </div>
                
                <div className="space-y-2">
                  <label_1.Label htmlFor="phone">Phone</label_1.Label>
                  <input_1.Input id="phone" value={settings.contact.phone} onChange={(e) => handleContactChange('phone', e.target.value)}/>
                </div>
                
                <div className="space-y-2">
                  <label_1.Label htmlFor="email">Email</label_1.Label>
                  <input_1.Input id="email" type="email" value={settings.contact.email} onChange={(e) => handleContactChange('email', e.target.value)}/>
                </div>
              </card_1.CardContent>
            </card_1.Card>
            
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>SEO Settings</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <div className="space-y-2">
                  <label_1.Label htmlFor="defaultTitle">Default Title</label_1.Label>
                  <input_1.Input id="defaultTitle" value={settings.seo.defaultTitle} onChange={(e) => handleSeoChange('defaultTitle', e.target.value)}/>
                </div>
                
                <div className="space-y-2">
                  <label_1.Label htmlFor="defaultDescription">Default Description</label_1.Label>
                  <input_1.Input id="defaultDescription" value={settings.seo.defaultDescription} onChange={(e) => handleSeoChange('defaultDescription', e.target.value)}/>
                </div>
              </card_1.CardContent>
            </card_1.Card>
            
            <div className="flex gap-2">
              <button_1.Button onClick={updateSettings} disabled={updating}>
                {updating ? 'Updating...' : 'Update Settings'}
              </button_1.Button>
              <button_1.Button variant="outline" onClick={fetchSettings}>
                Refresh
              </button_1.Button>
            </div>
          </card_1.CardContent>
        </card_1.Card>)}
    </div>);
}
//# sourceMappingURL=page.js.map