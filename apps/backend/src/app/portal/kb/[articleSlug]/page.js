"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArticlePage;
const kb_data_1 = require("@/lib/kb-data");
const navigation_1 = require("next/navigation");
const breadcrumb_1 = require("@/components/ui/breadcrumb");
const card_1 = require("@/components/ui/card");
const avatar_1 = require("@/components/ui/avatar");
const lucide_react_1 = require("lucide-react");
const badge_1 = require("@/components/ui/badge");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
function ArticlePage({ params }) {
    const article = kb_data_1.kbArticles.find(a => a.slug === params.articleSlug);
    if (!article) {
        (0, navigation_1.notFound)();
    }
    const category = kb_data_1.kbCategories.find(c => c.id === article.categoryId);
    const relatedArticles = kb_data_1.kbArticles.filter(a => a.categoryId === article.categoryId && a.id !== article.id).slice(0, 3);
    return (<div className="flex-1 space-y-6">
            <breadcrumb_1.Breadcrumb>
                <breadcrumb_1.BreadcrumbList>
                    <breadcrumb_1.BreadcrumbItem>
                        <breadcrumb_1.BreadcrumbLink asChild><link_1.default href="/portal/kb">Bilgi Bankası</link_1.default></breadcrumb_1.BreadcrumbLink>
                    </breadcrumb_1.BreadcrumbItem>
                    <breadcrumb_1.BreadcrumbSeparator />
                    {category && (<>
                         <breadcrumb_1.BreadcrumbItem>
                            <breadcrumb_1.BreadcrumbLink href="#">{category.name}</breadcrumb_1.BreadcrumbLink>
                        </breadcrumb_1.BreadcrumbItem>
                        <breadcrumb_1.BreadcrumbSeparator />
                        </>)}
                    <breadcrumb_1.BreadcrumbItem>
                        <breadcrumb_1.BreadcrumbPage>{article.title}</breadcrumb_1.BreadcrumbPage>
                    </breadcrumb_1.BreadcrumbItem>
                </breadcrumb_1.BreadcrumbList>
            </breadcrumb_1.Breadcrumb>
            
            <div className="grid lg:grid-cols-4 gap-8 items-start">
                <article className="lg:col-span-3 prose dark:prose-invert max-w-none">
                    <h1>{article.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground not-prose mb-8">
                        <div className="flex items-center gap-2">
                            <avatar_1.Avatar className="h-7 w-7">
                                <avatar_1.AvatarImage src={article.author.avatarUrl}/>
                                <avatar_1.AvatarFallback>{article.author.name.charAt(0)}</avatar_1.AvatarFallback>
                            </avatar_1.Avatar>
                            {article.author.name}
                        </div>
                        <div className="flex items-center gap-2">
                            <lucide_react_1.Calendar className="h-4 w-4"/>
                            Son Güncelleme: {new Date(article.lastUpdated).toLocaleDateString('tr-TR')}
                        </div>
                         <div className="flex items-center gap-2">
                             <lucide_react_1.Tag className="h-4 w-4"/>
                            {article.tags.map(tag => (<badge_1.Badge key={tag} variant="secondary">{tag}</badge_1.Badge>))}
                        </div>
                    </div>

                    <p className="lead">{article.excerpt}</p>
                    
                    <div dangerouslySetInnerHTML={{ __html: article.content }}/>

                    <card_1.Card className="mt-12 not-prose bg-secondary/50">
                        <card_1.CardHeader>
                            <card_1.CardTitle className="text-lg">Bu makale yardımcı oldu mu?</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="flex items-center gap-4">
                           <button_1.Button variant="outline"><lucide_react_1.ThumbsUp className="mr-2"/> Evet</button_1.Button>
                           <button_1.Button variant="outline"><lucide_react_1.ThumbsDown className="mr-2"/> Hayır</button_1.Button>
                        </card_1.CardContent>
                    </card_1.Card>
                </article>

                <aside className="lg:col-span-1 space-y-6 sticky top-24">
                     <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>İlgili Makaleler</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent>
                            <ul className="space-y-3">
                                {relatedArticles.map(rel => (<li key={rel.id}>
                                        <link_1.default href={`/portal/kb/${rel.slug}`} className="text-primary hover:underline">
                                            {rel.title}
                                        </link_1.default>
                                    </li>))}
                            </ul>
                        </card_1.CardContent>
                    </card_1.Card>
                </aside>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map