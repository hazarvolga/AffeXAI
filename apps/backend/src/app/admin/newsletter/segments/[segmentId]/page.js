"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SegmentDetailPage;
const navigation_1 = require("next/navigation");
const newsletter_data_1 = require("@/lib/newsletter-data");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const react_1 = require("react");
const react_2 = require("react");
function SegmentDetailPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { segmentId } = unwrappedParams;
    const router = (0, navigation_1.useRouter)();
    const [segment, setSegment] = (0, react_1.useState)(undefined);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedSegment = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedSegment.current)
            return;
        hasFetchedSegment.current = true;
        const fetchSegment = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch the segment data from an API
                // For now, we're using mock data
                const segmentData = newsletter_data_1.segments.find(s => s.id === segmentId);
                if (!segmentData) {
                    (0, navigation_1.notFound)();
                    return;
                }
                setSegment(segmentData);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching segment:', err);
                setError('Segment bilgileri yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchSegment();
    }, [segmentId]);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!segment) {
        (0, navigation_1.notFound)();
        return null;
    }
    // Simulate filtering subscribers based on the segment. 
    // In a real app, this logic would be much more complex and database-driven.
    // For this demo, we'll check if the subscriber's `segments` array includes the segment name.
    const segmentSubscribers = newsletter_data_1.subscribers.filter(sub => sub.segments.includes(segment.name));
    return (<div className="space-y-8">
       <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" onClick={() => router.back()}>
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
        </button_1.Button>
        <div>
            <div className="flex items-center gap-2">
                <lucide_react_1.Filter className="h-5 w-5 text-muted-foreground"/>
                <h1 className="text-3xl font-bold tracking-tight">{segment.name}</h1>
            </div>
            <p className="text-muted-foreground">{segment.description}</p>
        </div>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
            <card_1.CardTitle>Bu Segmentteki Aboneler</card_1.CardTitle>
            <card_1.CardDescription>"{segment.name}" segmentinin kurallarına uyan abonelerin listesi.</card_1.CardDescription>
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
                    {segmentSubscribers.length > 0 ? segmentSubscribers.map(sub => (<table_1.TableRow key={sub.id}>
                            <table_1.TableCell className="font-medium">{sub.email}</table_1.TableCell>
                            <table_1.TableCell>{new Date(sub.subscribedAt).toLocaleDateString('tr-TR')}</table_1.TableCell>
                            <table_1.TableCell>
                                <badge_1.Badge variant={sub.status === 'aktif' ? 'default' : 'secondary'}>{sub.status}</badge_1.Badge>
                            </table_1.TableCell>
                        </table_1.TableRow>)) : (<table_1.TableRow>
                            <table_1.TableCell colSpan={3} className="text-center h-24">Bu segmentte abone bulunmuyor.</table_1.TableCell>
                        </table_1.TableRow>)}
                </table_1.TableBody>
            </table_1.Table>
        </card_1.CardContent>
        <card_1.CardFooter>
            <div className="text-xs text-muted-foreground">
                Toplam <strong>{segmentSubscribers.length}</strong> abone bu segmentte.
            </div>
        </card_1.CardFooter>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map