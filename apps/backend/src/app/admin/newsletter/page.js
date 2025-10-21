"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailMarketingDashboardPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("@/lib/utils");
const collapsible_1 = require("@/components/ui/collapsible");
// Import table components
const subscribers_section_1 = __importDefault(require("./_components/subscribers-section"));
const campaigns_section_1 = __importDefault(require("./_components/campaigns-section"));
const groups_section_1 = __importDefault(require("./_components/groups-section"));
const segments_section_1 = __importDefault(require("./_components/segments-section"));
const templates_section_1 = __importDefault(require("./_components/templates-section"));
const subscribersService_1 = __importDefault(require("@/lib/api/subscribersService"));
const emailCampaignsService_1 = __importDefault(require("@/lib/api/emailCampaignsService"));
const groupsService_1 = __importDefault(require("@/lib/api/groupsService"));
const segmentsService_1 = __importDefault(require("@/lib/api/segmentsService"));
function EmailMarketingDashboardPage() {
    const [activeSection, setActiveSection] = (0, react_1.useState)('subscribers');
    const [subscriberCount, setSubscriberCount] = (0, react_1.useState)(0);
    const [campaignCount, setCampaignCount] = (0, react_1.useState)(0);
    const [groupCount, setGroupCount] = (0, react_1.useState)(0);
    const [segmentCount, setSegmentCount] = (0, react_1.useState)(0);
    const [templateCount, setTemplateCount] = (0, react_1.useState)(0); // Will be set dynamically
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch real data from backend
                const subscribers = await subscribersService_1.default.getAllSubscribers();
                const campaigns = await emailCampaignsService_1.default.getAllCampaigns();
                const groups = await groupsService_1.default.getAllGroups();
                const segments = await segmentsService_1.default.getAllSegments();
                setSubscriberCount(subscribers.length);
                setCampaignCount(campaigns.length);
                setGroupCount(groups.length);
                setSegmentCount(segments.length);
                // Set template count to the actual number of templates (27 based on your directory)
                setTemplateCount(27);
            }
            catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const stats = {
        subscribers: subscriberCount,
        campaigns: campaignCount,
        groups: groupCount,
        segments: segmentCount,
        templates: templateCount,
    };
    const sections = {
        subscribers: {
            title: 'Aboneler',
            description: 'Bülten abonelerinizi görüntüleyin ve yönetin.',
            icon: lucide_react_1.Users,
            stat: `${stats.subscribers} Abone`,
            content: <subscribers_section_1.default />,
            actions: [
                { href: '/admin/newsletter/subscribers/import', label: 'Toplu İçe Aktar', icon: lucide_react_1.FileUp },
                { href: '/admin/newsletter/subscribers', label: 'Aboneleri Yönet', icon: lucide_react_1.Users, variant: 'default' },
            ],
        },
        campaigns: {
            title: 'Kampanyalar',
            description: 'Bülten kampanyalarınızı oluşturun, gönderin ve takip edin.',
            icon: lucide_react_1.Send,
            stat: `${stats.campaigns} Kampanya`,
            content: <campaigns_section_1.default />,
            actions: [
                { href: '/admin/newsletter/campaigns/new', label: 'Yeni Kampanya Oluştur', icon: lucide_react_1.PlusCircle, variant: 'default' },
                { href: '/admin/newsletter/campaigns', label: 'Kampanyaları Yönet', icon: lucide_react_1.Send, variant: 'default' },
            ],
        },
        groups: {
            title: 'Gruplar',
            description: 'Abonelerinizi manuel olarak atadığınız statik listeler halinde yönetin.',
            icon: lucide_react_1.Folder,
            stat: `${stats.groups} Grup`,
            content: <groups_section_1.default />,
            actions: [
                { href: '/admin/newsletter/groups/new', label: 'Yeni Grup Oluştur', icon: lucide_react_1.PlusCircle, variant: 'default' },
                { href: '/admin/newsletter/groups', label: 'Grupları Yönet', icon: lucide_react_1.Folder, variant: 'default' },
            ],
        },
        segments: {
            title: 'Segmentler',
            description: 'Abonelerinizi davranışlarına ve özelliklerine göre dinamik olarak gruplayın.',
            icon: lucide_react_1.Filter,
            stat: `${stats.segments} Segment`,
            content: <segments_section_1.default />,
            actions: [
                { href: '/admin/newsletter/segments/new', label: 'Yeni Segment Oluştur', icon: lucide_react_1.PlusCircle, variant: 'default' },
                { href: '/admin/newsletter/segments', label: 'Segmentleri Yönet', icon: lucide_react_1.Filter, variant: 'default' },
            ],
        },
        templates: {
            title: 'Şablonlar',
            description: 'Yeniden kullanılabilir e-posta şablonları oluşturun ve yönetin.',
            icon: lucide_react_1.LayoutTemplate,
            stat: `${stats.templates} Şablon`,
            content: <templates_section_1.default />,
            actions: [
                { href: '/admin/newsletter/templates/new', label: 'Yeni Şablon Oluştur', icon: lucide_react_1.PlusCircle, variant: 'default' },
                { href: '/admin/newsletter/templates', label: 'Şablonları Yönet', icon: lucide_react_1.LayoutTemplate, variant: 'default' },
            ],
        }
    };
    const handleSectionToggle = (section) => {
        setActiveSection(prev => (prev === section ? null : section));
    };
    const currentSection = activeSection ? sections[activeSection] : null;
    return (<div className="space-y-8">
      <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-muted-foreground">Pazarlama aktivitelerinize genel bir bakış.</p>
      </div>

      {/* Email Validation Section - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <card_1.Card className="hover:shadow-md transition-shadow">
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.ShieldCheck className="h-5 w-5"/>
              IP Reputation Checker
            </card_1.CardTitle>
            <card_1.CardDescription>
              Check if sender IPs are listed on spam blacklists
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Verify that your sending IPs are not blacklisted to maintain good email deliverability.
            </p>
            <button_1.Button asChild>
              <link_1.default href="/admin/newsletter/validation">
                Check IP Reputation
              </link_1.default>
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>
        
        <card_1.Card className="hover:shadow-md transition-shadow">
          <card_1.CardHeader>
            <card_1.CardTitle>Email Validator</card_1.CardTitle>
            <card_1.CardDescription>
              Validate email addresses for quality and authenticity
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Ensure email addresses are properly formatted and belong to valid domains.
            </p>
            <button_1.Button variant="outline" disabled>
              Coming Soon
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Stat Cards / Section Triggers */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Object.keys(sections).map(key => {
            const section = sections[key];
            // Find the "manage" action for this section
            const manageAction = section.actions.find(action => action.label.includes('Yönet') || action.label.includes('Manage'));
            return (<div key={key} className="space-y-2">
                    <card_1.Card key={key} onClick={() => handleSectionToggle(key)} className={(0, utils_1.cn)("cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1", activeSection === key && "ring-2 ring-primary bg-primary/5")}>
                        <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <card_1.CardTitle className="text-sm font-medium">{section.title}</card_1.CardTitle>
                            <section.icon className="h-4 w-4 text-muted-foreground"/>
                        </card_1.CardHeader>
                        <card_1.CardContent>
                            <div className="text-2xl font-bold">{section.stat.split(' ')[0]}</div>
                            <p className="text-xs text-muted-foreground">{section.stat.split(' ')[1]}</p>
                        </card_1.CardContent>
                    </card_1.Card>
                    {/* Management button below each card */}
                    {manageAction && (<button_1.Button asChild variant="default" size="sm" className="w-full">
                            <link_1.default href={manageAction.href}>
                                <manageAction.icon className="mr-2 h-4 w-4"/>
                                {manageAction.label}
                            </link_1.default>
                        </button_1.Button>)}
                </div>);
        })}
      </div>

        {/* Content Area */}
        <collapsible_1.Collapsible open={!!activeSection} className="w-full">
            <collapsible_1.CollapsibleContent className="space-y-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                 {currentSection && (<card_1.Card>
                        <card_1.CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div>
                                <card_1.CardTitle>{currentSection.title}</card_1.CardTitle>
                                <card_1.CardDescription>{currentSection.description}</card_1.CardDescription>
                            </div>
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {currentSection.actions.map(action => (<button_1.Button key={action.label} asChild variant={action.variant || 'outline'} size="sm">
                                        <link_1.default href={action.href}>
                                            <action.icon className="mr-2 h-4 w-4"/>
                                            {action.label}
                                        </link_1.default>
                                    </button_1.Button>))}
                                 <button_1.Button variant="ghost" size="sm" onClick={() => handleSectionToggle(activeSection)}>
                                    <lucide_react_1.EyeOff className="mr-2 h-4 w-4"/> Kapat
                                </button_1.Button>
                            </div>
                        </card_1.CardHeader>
                        <card_1.CardContent className="p-0">
                            {currentSection.content}
                        </card_1.CardContent>
                    </card_1.Card>)}
            </collapsible_1.CollapsibleContent>
        </collapsible_1.Collapsible>
    </div>);
}
//# sourceMappingURL=page.js.map