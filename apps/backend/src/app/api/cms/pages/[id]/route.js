"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.PATCH = PATCH;
exports.DELETE = DELETE;
const server_1 = require("next/server");
const cms_data_1 = require("../../../../../lib/cms-data");
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
    console.log('CMS API GET /cms/pages/:id request, id:', params.id);
    const page = cms_data_1.pages.find((p) => p.id === params.id);
    if (page) {
        return server_1.NextResponse.json(convertPageData(page));
    }
    return server_1.NextResponse.json({ error: 'Page not found' }, { status: 404 });
}
async function PATCH(request, { params }) {
    console.log('CMS API PATCH /cms/pages/:id request, id:', params.id);
    const page = cms_data_1.pages.find((p) => p.id === params.id);
    if (!page) {
        return server_1.NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    const data = await request.json();
    // In a real implementation, we would update this in a database
    // For now, we'll just return the updated data as if it was saved
    const updatedPage = {
        ...convertPageData(page),
        ...data,
        id: page.id, // Preserve ID
        updatedAt: new Date().toISOString()
    };
    console.log('Updated page:', updatedPage);
    return server_1.NextResponse.json(updatedPage);
}
async function DELETE(request, { params }) {
    console.log('CMS API DELETE /cms/pages/:id request, id:', params.id);
    const page = cms_data_1.pages.find((p) => p.id === params.id);
    if (!page) {
        return server_1.NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    // In a real implementation, we would delete this from a database
    // For now, we'll just return success as if it was deleted
    console.log('Deleted page:', params.id);
    return server_1.NextResponse.json({ success: true });
}
//# sourceMappingURL=route.js.map