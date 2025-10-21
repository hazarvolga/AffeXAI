"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubscribersManagementPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const tabs_1 = require("@/components/ui/tabs");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const checkbox_1 = require("@/components/ui/checkbox");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const subscribersService_1 = __importDefault(require("@/lib/api/subscribersService"));
const segmentsService_1 = __importDefault(require("@/lib/api/segmentsService"));
const groupsService_1 = __importDefault(require("@/lib/api/groupsService"));
function SubscribersManagementPage() {
    const [activeTab, setActiveTab] = (0, react_1.useState)('all');
    const [subscribers, setSubscribers] = (0, react_1.useState)([]);
    const [segments, setSegments] = (0, react_1.useState)([]);
    const [groups, setGroups] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [selectedSubscribers, setSelectedSubscribers] = (0, react_1.useState)([]);
    // Sorting state
    const [sortField, setSortField] = (0, react_1.useState)('subscribedAt');
    const [sortDirection, setSortDirection] = (0, react_1.useState)('desc');
    // Modal states
    const [isAddToGroupModalOpen, setIsAddToGroupModalOpen] = (0, react_1.useState)(false);
    const [isRemoveFromGroupModalOpen, setIsRemoveFromGroupModalOpen] = (0, react_1.useState)(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = (0, react_1.useState)(false);
    // Form states
    const [addGroupName, setAddGroupName] = (0, react_1.useState)('');
    const [removeGroupName, setRemoveGroupName] = (0, react_1.useState)('');
    const [availableGroups, setAvailableGroups] = (0, react_1.useState)([]);
    // Sort subscribers based on current sort settings
    const sortedSubscribers = (0, react_1.useMemo)(() => {
        return [...subscribers].sort((a, b) => {
            let aValue, bValue;
            switch (sortField) {
                case 'email':
                    aValue = a.email.toLowerCase();
                    bValue = b.email.toLowerCase();
                    break;
                case 'sent':
                    aValue = a.sent || 0;
                    bValue = b.sent || 0;
                    break;
                case 'opens':
                    aValue = a.opens || 0;
                    bValue = b.opens || 0;
                    break;
                case 'clicks':
                    aValue = a.clicks || 0;
                    bValue = b.clicks || 0;
                    break;
                case 'subscribedAt':
                    aValue = new Date(a.subscribedAt).getTime();
                    bValue = new Date(b.subscribedAt).getTime();
                    break;
                case 'location':
                    aValue = (a.location || '').toLowerCase();
                    bValue = (b.location || '').toLowerCase();
                    break;
                case 'mailerCheckResult':
                    aValue = (a.mailerCheckResult || '').toLowerCase();
                    bValue = (b.mailerCheckResult || '').toLowerCase();
                    break;
                default:
                    return 0;
            }
            if (aValue < bValue)
                return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue)
                return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [subscribers, sortField, sortDirection]);
    // Toggle sort direction when clicking on the same column
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortField(field);
            setSortDirection('asc');
        }
    };
    // Get sort indicator for table headers
    const getSortIndicator = (field) => {
        if (sortField !== field)
            return null;
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };
    // Get icon for mailerCheckResult status
    const getMailerCheckIcon = (result) => {
        if (!result)
            return <lucide_react_1.HelpCircle className="h-4 w-4 text-muted-foreground"/>;
        switch (result.toLowerCase()) {
            case 'valid':
                return <lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>;
            case 'invalid':
                return <lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>;
            case 'risky':
                return <lucide_react_1.AlertTriangle className="h-4 w-4 text-yellow-500"/>;
            default:
                return <lucide_react_1.HelpCircle className="h-4 w-4 text-muted-foreground"/>;
        }
    };
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log('Fetching data from API...');
                // Fetch data separately to better identify errors
                const subscribersData = await subscribersService_1.default.getAllSubscribers();
                console.log('Subscribers data fetched:', subscribersData);
                const segmentsData = await segmentsService_1.default.getAllSegments();
                console.log('Segments data fetched:', segmentsData);
                const groupsData = await groupsService_1.default.getAllGroups();
                console.log('Groups data fetched:', groupsData);
                setSubscribers(subscribersData);
                setSegments(segmentsData);
                setGroups(groupsData);
                // Update availableGroups with real data
                setAvailableGroups(groupsData.map((group) => group.name));
                setError(null);
            }
            catch (err) {
                console.error('Error fetching data:', err);
                // Log more detailed error information
                if (err instanceof Error) {
                    console.error('Error name:', err.name);
                    console.error('Error message:', err.message);
                    console.error('Error stack:', err.stack);
                }
                setError('Veri yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const toggleSubscriberSelection = (id) => {
        setSelectedSubscribers(prev => prev.includes(id)
            ? prev.filter(subscriberId => subscriberId !== id)
            : [...prev, id]);
    };
    const toggleSelectAll = () => {
        if (selectedSubscribers.length === sortedSubscribers.length) {
            setSelectedSubscribers([]);
        }
        else {
            setSelectedSubscribers(sortedSubscribers.map(s => s.id));
        }
    };
    const handleAction = (action) => {
        if (selectedSubscribers.length === 0)
            return;
        switch (action) {
            case 'add-to-group':
                setIsAddToGroupModalOpen(true);
                break;
            case 'remove-from-group':
                setIsRemoveFromGroupModalOpen(true);
                break;
            case 'delete':
                setIsDeleteConfirmModalOpen(true);
                break;
            case 'unsubscribe':
                handleUnsubscribe();
                break;
            case 'export-csv':
                exportToCSV(selectedSubscribers);
                break;
            case 'export-excel':
                exportToCSV(selectedSubscribers, true);
                break;
            default:
                console.log(`Action ${action} not implemented yet`);
        }
    };
    const handleAddToGroup = async () => {
        if (!addGroupName || selectedSubscribers.length === 0)
            return;
        try {
            // Update each selected subscriber
            await Promise.all(selectedSubscribers.map(id => {
                const subscriber = sortedSubscribers.find(s => s.id === id);
                if (subscriber) {
                    const updatedGroups = [...subscriber.groups, addGroupName];
                    return subscribersService_1.default.updateSubscriber(id, { groups: updatedGroups });
                }
                return Promise.resolve();
            }));
            // Refresh the subscriber list
            const data = await subscribersService_1.default.getAllSubscribers();
            setSubscribers(data);
            // Reset form and close modal
            setAddGroupName('');
            setIsAddToGroupModalOpen(false);
            setSelectedSubscribers([]);
        }
        catch (err) {
            console.error('Error adding subscribers to group:', err);
            setError('Gruba abone eklenirken bir hata oluştu.');
        }
    };
    const handleRemoveFromGroup = async () => {
        if (!removeGroupName || selectedSubscribers.length === 0)
            return;
        try {
            // Update each selected subscriber
            await Promise.all(selectedSubscribers.map(id => {
                const subscriber = sortedSubscribers.find(s => s.id === id);
                if (subscriber) {
                    const updatedGroups = subscriber.groups.filter((group) => group !== removeGroupName);
                    return subscribersService_1.default.updateSubscriber(id, { groups: updatedGroups });
                }
                return Promise.resolve();
            }));
            // Refresh the subscriber list
            const data = await subscribersService_1.default.getAllSubscribers();
            setSubscribers(data);
            // Reset form and close modal
            setRemoveGroupName('');
            setIsRemoveFromGroupModalOpen(false);
            setSelectedSubscribers([]);
        }
        catch (err) {
            console.error('Error removing subscribers from group:', err);
            setError('Gruptan abone çıkarılırken bir hata oluştu.');
        }
    };
    const handleUnsubscribe = async () => {
        try {
            // Update each selected subscriber
            await Promise.all(selectedSubscribers.map(id => subscribersService_1.default.updateSubscriber(id, { status: 'unsubscribed' })));
            // Update local state
            setSubscribers(prev => prev.map(s => selectedSubscribers.includes(s.id)
                ? { ...s, status: 'unsubscribed' }
                : s));
            setSelectedSubscribers([]);
        }
        catch (err) {
            console.error('Error unsubscribing subscribers:', err);
            setError('Abonelerin aboneliği iptal edilirken bir hata oluştu.');
        }
    };
    const handleDelete = async () => {
        try {
            // Delete selected subscribers
            await Promise.all(selectedSubscribers.map(id => subscribersService_1.default.deleteSubscriber(id)));
            // Refresh the list
            setSubscribers(prev => prev.filter(s => !selectedSubscribers.includes(s.id)));
            setSelectedSubscribers([]);
            setIsDeleteConfirmModalOpen(false);
        }
        catch (err) {
            console.error('Error deleting subscribers:', err);
            setError('Aboneler silinirken bir hata oluştu.');
        }
    };
    const exportToCSV = (ids, excelFormat = false) => {
        const selectedData = sortedSubscribers.filter(s => ids.includes(s.id));
        const headers = ['Email', 'Status', 'Subscribed At', 'Last Updated'];
        const rows = selectedData.map(s => [
            s.email,
            s.status,
            s.subscribedAt,
            s.lastUpdated
        ]);
        let csvContent = headers.join(',') + '\n';
        rows.forEach(row => {
            csvContent += row.map(field => `"${field}"`).join(',') + '\n';
        });
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', excelFormat ? 'subscribers.xlsx' : 'subscribers.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // Get selected subscriber emails for display
    const getSelectedSubscriberEmails = () => {
        return sortedSubscribers
            .filter(s => selectedSubscribers.includes(s.id))
            .map(s => s.email)
            .join(', ');
    };
    return (<div className="space-y-8">
      <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" asChild>
          <link_1.default href="/admin/newsletter">
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
          </link_1.default>
        </button_1.Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aboneleri Yönet</h1>
          <p className="text-muted-foreground">Bülten abonelerinizi görüntüleyin, düzenleyin ve yönetin.</p>
        </div>
      </div>

      {/* Subscriber Actions - Added at the top */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button_1.Button variant="outline" asChild>
          <link_1.default href="/admin/newsletter/subscribers/import">
            <lucide_react_1.FileUp className="mr-2 h-4 w-4"/>
            Toplu İçe Aktar
          </link_1.default>
        </button_1.Button>
        <button_1.Button asChild>
          <link_1.default href="/admin/newsletter/subscribers/new">
            <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
            Yeni Abone Ekle
          </link_1.default>
        </button_1.Button>
      </div>

      <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <tabs_1.TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6">
          <tabs_1.TabsTrigger value="all" className="flex items-center gap-2">
            <lucide_react_1.Users className="h-4 w-4"/>
            <span>All subscribers</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="segments" className="flex items-center gap-2">
            <lucide_react_1.Filter className="h-4 w-4"/>
            <span>Segments</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="groups" className="flex items-center gap-2">
            <lucide_react_1.Folder className="h-4 w-4"/>
            <span>Groups</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="fields" className="flex items-center gap-2">
            <lucide_react_1.Database className="h-4 w-4"/>
            <span>Fields</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="stats" className="flex items-center gap-2">
            <lucide_react_1.BarChart3 className="h-4 w-4"/>
            <span>Stats</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="cleanup" className="flex items-center gap-2">
            <lucide_react_1.Trash2 className="h-4 w-4"/>
            <span>Clean up</span>
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>
        
        <tabs_1.TabsContent value="all" className="mt-6">
          <card_1.Card>
            <card_1.CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <card_1.CardTitle>All Subscribers</card_1.CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <card_1.CardDescription>
                      Showing subscribers {sortedSubscribers.length}
                    </card_1.CardDescription>
                    <dropdown_menu_1.DropdownMenu>
                      <dropdown_menu_1.DropdownMenuTrigger asChild>
                        <button_1.Button variant="outline" size="sm" className="flex items-center gap-2" disabled={selectedSubscribers.length === 0}>
                          Actions
                          <lucide_react_1.ChevronDown className="h-4 w-4"/>
                        </button_1.Button>
                      </dropdown_menu_1.DropdownMenuTrigger>
                      <dropdown_menu_1.DropdownMenuContent align="start">
                        <dropdown_menu_1.DropdownMenuItem onSelect={() => handleAction('add-to-group')}>
                          <lucide_react_1.Folder className="mr-2 h-4 w-4"/>
                          Add to group
                        </dropdown_menu_1.DropdownMenuItem>
                        <dropdown_menu_1.DropdownMenuItem onSelect={() => handleAction('remove-from-group')}>
                          <lucide_react_1.Folder className="mr-2 h-4 w-4"/>
                          Remove from group
                        </dropdown_menu_1.DropdownMenuItem>
                        <dropdown_menu_1.DropdownMenuSeparator />
                        <dropdown_menu_1.DropdownMenuItem onSelect={() => handleAction('unsubscribe')}>
                          <lucide_react_1.Users className="mr-2 h-4 w-4"/>
                          Move to unsubscribed
                        </dropdown_menu_1.DropdownMenuItem>
                        <dropdown_menu_1.DropdownMenuItem className="text-destructive" onSelect={() => handleAction('delete')}>
                          <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/>
                          Delete
                        </dropdown_menu_1.DropdownMenuItem>
                        <dropdown_menu_1.DropdownMenuSeparator />
                        <dropdown_menu_1.DropdownMenuItem onSelect={() => handleAction('export-csv')}>
                          <lucide_react_1.FileUp className="mr-2 h-4 w-4"/>
                          Export CSV
                        </dropdown_menu_1.DropdownMenuItem>
                        <dropdown_menu_1.DropdownMenuItem onSelect={() => handleAction('export-excel')}>
                          <lucide_react_1.FileUp className="mr-2 h-4 w-4"/>
                          Export CSV for Excel
                        </dropdown_menu_1.DropdownMenuItem>
                      </dropdown_menu_1.DropdownMenuContent>
                    </dropdown_menu_1.DropdownMenu>
                  </div>
                </div>
                {/* Removed duplicate buttons from here since they're now at the top */}
              </div>
            </card_1.CardHeader>
            <card_1.CardContent>
              {loading ? (<div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-sm text-muted-foreground">Aboneler yükleniyor...</p>
                  </div>
                </div>) : error ? (<div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-sm text-red-500">{error}</p>
                    <button_1.Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
                      Tekrar Dene
                    </button_1.Button>
                  </div>
                </div>) : sortedSubscribers.length === 0 ? (<div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <lucide_react_1.Users className="mx-auto h-12 w-12 text-muted-foreground"/>
                    <h3 className="mt-2 text-sm font-medium">Henüz abone yok</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Abonelerinizi burada görüntüleyebileceksiniz.
                    </p>
                  </div>
                </div>) : (<div className="rounded-md border">
                  <table_1.Table>
                    <table_1.TableHeader>
                      <table_1.TableRow>
                        <table_1.TableHead className="w-[50px]">
                          <checkbox_1.Checkbox checked={selectedSubscribers.length === sortedSubscribers.length && sortedSubscribers.length > 0} onCheckedChange={toggleSelectAll}/>
                        </table_1.TableHead>
                        <table_1.TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
                          Subscriber{getSortIndicator('email')}
                        </table_1.TableHead>
                        <table_1.TableHead className="cursor-pointer" onClick={() => handleSort('sent')}>
                          Sent{getSortIndicator('sent')}
                        </table_1.TableHead>
                        <table_1.TableHead className="cursor-pointer" onClick={() => handleSort('opens')}>
                          Opens{getSortIndicator('opens')}
                        </table_1.TableHead>
                        <table_1.TableHead className="cursor-pointer" onClick={() => handleSort('clicks')}>
                          Clicks{getSortIndicator('clicks')}
                        </table_1.TableHead>
                        <table_1.TableHead className="cursor-pointer" onClick={() => handleSort('subscribedAt')}>
                          Subscribed{getSortIndicator('subscribedAt')}
                        </table_1.TableHead>
                        <table_1.TableHead className="cursor-pointer" onClick={() => handleSort('location')}>
                          Location{getSortIndicator('location')}
                        </table_1.TableHead>
                        <table_1.TableHead className="cursor-pointer" onClick={() => handleSort('mailerCheckResult')}>
                          Validation{getSortIndicator('mailerCheckResult')}
                        </table_1.TableHead>
                      </table_1.TableRow>
                    </table_1.TableHeader>
                    <table_1.TableBody>
                      {sortedSubscribers.map((subscriber) => (<table_1.TableRow key={subscriber.id}>
                          <table_1.TableCell>
                            <checkbox_1.Checkbox checked={selectedSubscribers.includes(subscriber.id)} onCheckedChange={() => toggleSubscriberSelection(subscriber.id)}/>
                          </table_1.TableCell>
                          <table_1.TableCell className="font-medium">
                            <link_1.default href={`/admin/newsletter/subscribers/${subscriber.id}/detail`} className="hover:underline">
                              {subscriber.email}
                            </link_1.default>
                          </table_1.TableCell>
                          <table_1.TableCell>{subscriber.sent || 0}</table_1.TableCell>
                          <table_1.TableCell>{subscriber.opens || 0}</table_1.TableCell>
                          <table_1.TableCell>{subscriber.clicks || 0}</table_1.TableCell>
                          <table_1.TableCell>
                            {new Date(subscriber.subscribedAt).toLocaleString('tr-TR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                          </table_1.TableCell>
                          <table_1.TableCell>
                            <badge_1.Badge variant="outline">{subscriber.location || 'TR'}</badge_1.Badge>
                          </table_1.TableCell>
                          <table_1.TableCell>
                            <div className="flex items-center gap-1">
                              {getMailerCheckIcon(subscriber.mailerCheckResult)}
                              <span className="capitalize">
                                {subscriber.mailerCheckResult || 'Unknown'}
                              </span>
                            </div>
                          </table_1.TableCell>
                        </table_1.TableRow>))}
                    </table_1.TableBody>
                  </table_1.Table>
                </div>)}
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
        
        <tabs_1.TabsContent value="segments" className="mt-6">
          <card_1.Card>
            <card_1.CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <card_1.CardTitle>Segments</card_1.CardTitle>
                  <card_1.CardDescription>
                    Abonelerinizi segmentlere ayırarak hedefli kampanyalar oluşturun.
                  </card_1.CardDescription>
                </div>
                <button_1.Button asChild>
                  <link_1.default href="/admin/newsletter/segments">
                    <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                    Yeni Segment Oluştur
                  </link_1.default>
                </button_1.Button>
              </div>
            </card_1.CardHeader>
            <card_1.CardContent>
              {segments.length === 0 ? (<div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <lucide_react_1.Filter className="mx-auto h-12 w-12 text-muted-foreground"/>
                    <h3 className="mt-2 text-sm font-medium">Henüz segment yok</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Segmentler oluşturarak abonelerinizi gruplandırın.
                    </p>
                  </div>
                </div>) : (<div className="rounded-md border">
                  <table_1.Table>
                    <table_1.TableHeader>
                      <table_1.TableRow>
                        <table_1.TableHead>Segment Adı</table_1.TableHead>
                        <table_1.TableHead>Oluşturulma Tarihi</table_1.TableHead>
                        <table_1.TableHead>Abone Sayısı</table_1.TableHead>
                        <table_1.TableHead>Açılış Oranı</table_1.TableHead>
                        <table_1.TableHead>Tıklama Oranı</table_1.TableHead>
                        <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                      </table_1.TableRow>
                    </table_1.TableHeader>
                    <table_1.TableBody>
                      {segments.map((segment) => (<table_1.TableRow key={segment.id}>
                          <table_1.TableCell className="font-medium">
                            <link_1.default href={`/admin/newsletter/segments/${segment.id}`} className="hover:underline">
                              {segment.name}
                            </link_1.default>
                          </table_1.TableCell>
                          <table_1.TableCell>
                            {new Date(segment.createdAt).toLocaleDateString('tr-TR')}
                          </table_1.TableCell>
                          <table_1.TableCell>{segment.subscriberCount.toLocaleString('tr-TR')}</table_1.TableCell>
                          <table_1.TableCell>{segment.openRate.toFixed(2)}%</table_1.TableCell>
                          <table_1.TableCell>{segment.clickRate.toFixed(2)}%</table_1.TableCell>
                          <table_1.TableCell className="text-right">
                            <dropdown_menu_1.DropdownMenu>
                              <dropdown_menu_1.DropdownMenuTrigger asChild>
                                <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Menüyü aç</span>
                                  <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                                </button_1.Button>
                              </dropdown_menu_1.DropdownMenuTrigger>
                              <dropdown_menu_1.DropdownMenuContent align="end">
                                <dropdown_menu_1.DropdownMenuItem>
                                  <lucide_react_1.Edit className="mr-2 h-4 w-4"/> Düzenle
                                </dropdown_menu_1.DropdownMenuItem>
                                <dropdown_menu_1.DropdownMenuSeparator />
                                <dropdown_menu_1.DropdownMenuItem className="text-destructive focus:text-destructive">
                                  <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/> Sil
                                </dropdown_menu_1.DropdownMenuItem>
                              </dropdown_menu_1.DropdownMenuContent>
                            </dropdown_menu_1.DropdownMenu>
                          </table_1.TableCell>
                        </table_1.TableRow>))}
                    </table_1.TableBody>
                  </table_1.Table>
                </div>)}
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
        
        <tabs_1.TabsContent value="groups" className="mt-6">
          <card_1.Card>
            <card_1.CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <card_1.CardTitle>Groups</card_1.CardTitle>
                  <card_1.CardDescription>
                    Abonelerinizi gruplara ayırarak organize edin.
                  </card_1.CardDescription>
                </div>
                <button_1.Button asChild>
                  <link_1.default href="/admin/newsletter/groups">
                    <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                    Yeni Grup Oluştur
                  </link_1.default>
                </button_1.Button>
              </div>
            </card_1.CardHeader>
            <card_1.CardContent>
              {groups.length === 0 ? (<div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <lucide_react_1.Folder className="mx-auto h-12 w-12 text-muted-foreground"/>
                    <h3 className="mt-2 text-sm font-medium">Henüz grup yok</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Gruplar oluşturarak abonelerinizi organize edin.
                    </p>
                  </div>
                </div>) : (<div className="rounded-md border">
                  <table_1.Table>
                    <table_1.TableHeader>
                      <table_1.TableRow>
                        <table_1.TableHead>Grup Adı</table_1.TableHead>
                        <table_1.TableHead>Açıklama</table_1.TableHead>
                        <table_1.TableHead>Abone Sayısı</table_1.TableHead>
                        <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                      </table_1.TableRow>
                    </table_1.TableHeader>
                    <table_1.TableBody>
                      {groups.map((group) => (<table_1.TableRow key={group.id}>
                          <table_1.TableCell className="font-medium">
                            <link_1.default href={`/admin/newsletter/groups/${group.id}`} className="hover:underline">
                              {group.name}
                            </link_1.default>
                          </table_1.TableCell>
                          <table_1.TableCell className="text-muted-foreground">{group.description}</table_1.TableCell>
                          <table_1.TableCell>
                            <badge_1.Badge variant="secondary" className="flex items-center gap-1.5 w-fit">
                              <lucide_react_1.Users className="h-3 w-3"/>
                              {group.subscriberCount}
                            </badge_1.Badge>
                          </table_1.TableCell>
                          <table_1.TableCell className="text-right">
                            <dropdown_menu_1.DropdownMenu>
                              <dropdown_menu_1.DropdownMenuTrigger asChild>
                                <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Menüyü aç</span>
                                  <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                                </button_1.Button>
                              </dropdown_menu_1.DropdownMenuTrigger>
                              <dropdown_menu_1.DropdownMenuContent align="end">
                                <dropdown_menu_1.DropdownMenuItem>
                                  <lucide_react_1.Edit className="mr-2 h-4 w-4"/> Düzenle
                                </dropdown_menu_1.DropdownMenuItem>
                                <dropdown_menu_1.DropdownMenuSeparator />
                                <dropdown_menu_1.DropdownMenuItem className="text-destructive focus:text-destructive">
                                  <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/> Sil
                                </dropdown_menu_1.DropdownMenuItem>
                              </dropdown_menu_1.DropdownMenuContent>
                            </dropdown_menu_1.DropdownMenu>
                          </table_1.TableCell>
                        </table_1.TableRow>))}
                    </table_1.TableBody>
                  </table_1.Table>
                </div>)}
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
        
        <tabs_1.TabsContent value="fields" className="mt-6">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Custom Fields</card_1.CardTitle>
              <card_1.CardDescription>
                Aboneleriniz için özel alanlar tanımlayın.
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <lucide_react_1.Database className="mx-auto h-12 w-12 text-muted-foreground"/>
                  <h3 className="mt-2 text-sm font-medium">Henüz özel alan yok</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aboneleriniz hakkında daha fazla bilgi toplamak için özel alanlar oluşturun.
                  </p>
                  <div className="mt-6">
                    <button_1.Button>
                      <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                      Yeni Alan Oluştur
                    </button_1.Button>
                  </div>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
        
        <tabs_1.TabsContent value="stats" className="mt-6">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Statistics</card_1.CardTitle>
              <card_1.CardDescription>
                Aboneleriniz ve etkileşimleriniz hakkında istatistikler.
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <lucide_react_1.BarChart3 className="mx-auto h-12 w-12 text-muted-foreground"/>
                  <h3 className="mt-2 text-sm font-medium">İstatistikler yükleniyor</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Abonelerinizin etkileşim istatistikleri burada görünecek.
                  </p>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
        
        <tabs_1.TabsContent value="cleanup" className="mt-6">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Clean Up</card_1.CardTitle>
              <card_1.CardDescription>
                İnaktif veya geçersiz aboneleri temizleyin.
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <lucide_react_1.Trash2 className="mx-auto h-12 w-12 text-muted-foreground"/>
                  <h3 className="mt-2 text-sm font-medium">Temizlik gerekiyor</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    İnaktif aboneleri temizlemek için araçlar burada olacak.
                  </p>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
      
      {/* Add to Group Modal */}
      <dialog_1.Dialog open={isAddToGroupModalOpen} onOpenChange={setIsAddToGroupModalOpen}>
        <dialog_1.DialogContent className="sm:max-w-[425px]">
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>Gruba Ekle</dialog_1.DialogTitle>
            <dialog_1.DialogDescription>
              Seçili aboneleri bir gruba ekleyin. Seçili aboneler: {getSelectedSubscriberEmails()}
            </dialog_1.DialogDescription>
          </dialog_1.DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label_1.Label htmlFor="group-name" className="text-right">
                Grup Adı
              </label_1.Label>
              <div className="col-span-3">
                <input_1.Input id="group-name" value={addGroupName} onChange={(e) => setAddGroupName(e.target.value)} placeholder="Grup adını girin"/>
                {availableGroups.length > 0 && (<div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Mevcut gruplar:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableGroups.map((group) => (<button_1.Button key={group} variant="outline" size="sm" onClick={() => setAddGroupName(group)}>
                          {group}
                        </button_1.Button>))}
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          <dialog_1.DialogFooter>
            <button_1.Button variant="outline" onClick={() => setIsAddToGroupModalOpen(false)}>
              İptal
            </button_1.Button>
            <button_1.Button onClick={handleAddToGroup} disabled={!addGroupName}>
              Gruba Ekle
            </button_1.Button>
          </dialog_1.DialogFooter>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>
      
      {/* Remove from Group Modal */}
      <dialog_1.Dialog open={isRemoveFromGroupModalOpen} onOpenChange={setIsRemoveFromGroupModalOpen}>
        <dialog_1.DialogContent className="sm:max-w-[425px]">
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>Gruptan Çıkar</dialog_1.DialogTitle>
            <dialog_1.DialogDescription>
              Seçili aboneleri bir gruptan çıkarın. Seçili aboneler: {getSelectedSubscriberEmails()}
            </dialog_1.DialogDescription>
          </dialog_1.DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label_1.Label htmlFor="remove-group-name" className="text-right">
                Grup Adı
              </label_1.Label>
              <div className="col-span-3">
                <select_1.Select onValueChange={setRemoveGroupName} value={removeGroupName}>
                  <select_1.SelectTrigger>
                    <select_1.SelectValue placeholder="Bir grup seçin"/>
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    {availableGroups.map((group) => (<select_1.SelectItem key={group} value={group}>
                        {group}
                      </select_1.SelectItem>))}
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
            </div>
          </div>
          <dialog_1.DialogFooter>
            <button_1.Button variant="outline" onClick={() => setIsRemoveFromGroupModalOpen(false)}>
              İptal
            </button_1.Button>
            <button_1.Button onClick={handleRemoveFromGroup} disabled={!removeGroupName} variant="destructive">
              Gruptan Çıkar
            </button_1.Button>
          </dialog_1.DialogFooter>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>
      
      {/* Delete Confirmation Modal */}
      <dialog_1.Dialog open={isDeleteConfirmModalOpen} onOpenChange={setIsDeleteConfirmModalOpen}>
        <dialog_1.DialogContent className="sm:max-w-[425px]">
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>Aboneleri Sil</dialog_1.DialogTitle>
            <dialog_1.DialogDescription>
              Seçili aboneleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              <br />
              <br />
              Seçili aboneler: {getSelectedSubscriberEmails()}
            </dialog_1.DialogDescription>
          </dialog_1.DialogHeader>
          <dialog_1.DialogFooter>
            <button_1.Button variant="outline" onClick={() => setIsDeleteConfirmModalOpen(false)}>
              İptal
            </button_1.Button>
            <button_1.Button onClick={handleDelete} variant="destructive">
              Sil
            </button_1.Button>
          </dialog_1.DialogFooter>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>
    </div>);
}
//# sourceMappingURL=page.js.map