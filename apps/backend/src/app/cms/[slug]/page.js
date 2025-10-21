"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const cms_page_renderer_1 = require("@/components/cms/cms-page-renderer");
const cms_service_1 = require("@/lib/cms/cms-service");
const use_cms_tracking_1 = require("@/hooks/use-cms-tracking");
const CmsPage = ({ params }) => {
    const [page, setPage] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                const pageData = await cms_service_1.cmsService.getPageBySlug(params.slug);
                setPage(pageData);
            }
            catch (err) {
                setError('Failed to load page');
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [params.slug]);
    // Track page view when page is loaded
    (0, use_cms_tracking_1.usePageViewTracking)({
        pageId: page?.id || '',
        pageTitle: page?.title || params.slug,
        category: page?.category?.name || 'Uncategorized',
    });
    if (loading) {
        return (<div className="container mx-auto py-8">
        <div className="text-center">
          <p>Loading page...</p>
        </div>
      </div>);
    }
    if (error) {
        return (<div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </div>);
    }
    if (!page) {
        return (<div className="container mx-auto py-8">
        <div className="text-center">
          <p>Page not found</p>
        </div>
      </div>);
    }
    return (<div className="container mx-auto py-8">
      <cms_page_renderer_1.CmsPageRenderer page={page}/>
    </div>);
};
exports.default = CmsPage;
//# sourceMappingURL=page.js.map