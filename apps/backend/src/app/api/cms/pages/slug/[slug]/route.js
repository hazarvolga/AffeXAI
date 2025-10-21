"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const cms_data_1 = require("../../../../../../lib/cms-data");
// Convert the real data structure to what the frontend expects
const convertPageData = (page) => {
    return {
        id: page.id,
        title: page.title,
        slug: page.slug,
        description: page.seo?.description || '',
        status: page.status || 'draft',
        createdAt: page.lastUpdated || new Date().toISOString(),
        updatedAt: page.lastUpdated || new Date().toISOString(),
        publishedAt: page.status === 'published' ? page.lastUpdated : null,
        components: page.content || [],
        layoutOptions: {
            showHeader: true,
            showFooter: true,
            fullWidth: false,
            backgroundColor: 'bg-background',
            showTitle: true
        }
    };
};
async function GET(request, { params }) {
    console.log('CMS API GET /cms/pages/slug/:slug request, slug:', params.slug);
    const slug = params.slug === 'home' ? '/' : `/${params.slug}`;
    const page = cms_data_1.pages.find((p) => p.slug === slug);
    if (page) {
        return server_1.NextResponse.json(convertPageData(page));
    }
    return server_1.NextResponse.json({ error: 'Page not found' }, { status: 404 });
}
//# sourceMappingURL=route.js.map