"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GroupDetailPage;
const navigation_1 = require("next/navigation");
const newsletter_data_1 = require("@/lib/newsletter-data");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const react_1 = require("react");
const react_2 = require("react");
function GroupDetailPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { groupId } = unwrappedParams;
    const router = (0, navigation_1.useRouter)();
    const [group, setGroup] = (0, react_1.useState)(undefined);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedGroup = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedGroup.current)
            return;
        hasFetchedGroup.current = true;
        const fetchGroup = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch the group data from an API
                // For now, we're using mock data
                const groupData = newsletter_data_1.groups.find(s => s.id === groupId);
                if (!groupData) {
                    (0, navigation_1.notFound)();
                    return;
                }
                setGroup(groupData);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching group:', err);
                setError('Grup bilgileri yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchGroup();
    }, [groupId]);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!group) {
        (0, navigation_1.notFound)();
        return null;
    }
    const groupSubscribers = newsletter_data_1.subscribers.filter(sub => sub.groups.includes(group.id));
    return (<div className="space-y-8">
       <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" onClick={() => router.back()}>
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
        </button_1.Button>
        <div>
            <div className="flex items-center gap-2">
                <lucide_react_1.Folder className="h-5 w-5 text-muted-foreground"/>
                <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
            </div>
            <p className="text-muted-foreground">{group.description}</p>
        </div>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
            <card_1.CardTitle>Bu Gruptaki Aboneler</card_1.CardTitle>
            <card_1.CardDescription>"{group.name}" grubuna eklenmiş abonelerin listesi.</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
            <table_1.Table>
                <table_1.TableHeader>
                    <table_1.TableRow>
                        <table_1.TableHead>E-posta</table_1.TableHead>
                        <table_1.TableHead>Kayıt Tarihi</table_1.TableHead>
                        <table_1.TableHead>Durum</table_1.TableHead>
                    </table_1.TableRow>
                </table_1.TableHeader>
                <table_1.TableBody>
                    {groupSubscribers.length > 0 ? groupSubscribers.map(sub => (<table_1.TableRow key={sub.id}>
                            <table_1.TableCell className="font-medium">{sub.email}</table_1.TableCell>
                            <table_1.TableCell>{new Date(sub.subscribedAt).toLocaleDateString('tr-TR')}</table_1.TableCell>
                            <table_1.TableCell>
                                <badge_1.Badge variant={sub.status === 'aktif' ? 'default' : 'secondary'}>{sub.status}</badge_1.Badge>
                            </table_1.TableCell>
                        </table_1.TableRow>)) : (<table_1.TableRow>
                            <table_1.TableCell colSpan={3} className="text-center h-24">Bu grupta abone bulunmuyor.</table_1.TableCell>
                        </table_1.TableRow>)}
                </table_1.TableBody>
            </table_1.Table>
        </card_1.CardContent>
        <card_1.CardFooter>
            <div className="text-xs text-muted-foreground">
                Toplam <strong>{groupSubscribers.length}</strong> abone bu grupta.
            </div>
        </card_1.CardFooter>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map