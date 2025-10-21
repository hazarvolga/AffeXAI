"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SegmentsSection;
const react_1 = require("react");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const segmentsService_1 = __importDefault(require("@/lib/api/segmentsService"));
function SegmentsSection() {
    const [segments, setSegments] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await segmentsService_1.default.getAllSegments();
                setSegments(data);
            }
            catch (error) {
                console.error('Error fetching segments:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return (<div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Segmentler yükleniyor...</div>
            </div>);
    }
    return (<table_1.Table>
            <table_1.TableHeader>
                <table_1.TableRow>
                    <table_1.TableHead>Segment Adı</table_1.TableHead>
                    <table_1.TableHead>Açıklama</table_1.TableHead>
                    <table_1.TableHead>Abone Sayısı</table_1.TableHead>
                    <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody>
                {segments.map((segment) => (<table_1.TableRow key={segment.id}>
                        <table_1.TableCell className="font-medium">
                            <link_1.default href={`/admin/newsletter/segments/${segment.id}`} className="hover:underline">{segment.name}</link_1.default>
                        </table_1.TableCell>
                        <table_1.TableCell className="text-muted-foreground">{segment.description}</table_1.TableCell>
                        <table_1.TableCell>
                            <badge_1.Badge variant="secondary" className="flex items-center gap-1.5 w-fit">
                                <lucide_react_1.Users className="h-3 w-3"/>
                                {segment.subscriberCount}
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
        </table_1.Table>);
}
//# sourceMappingURL=segments-section.js.map