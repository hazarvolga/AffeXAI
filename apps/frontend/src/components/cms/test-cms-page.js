"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCmsPage = TestCmsPage;
const react_1 = __importDefault(require("react"));
const cms_page_renderer_1 = require("@/components/cms/cms-page-renderer");
const preview_context_1 = require("@/components/cms/preview-context");
// Test data for CMS page
const testPage = {
    id: 'test-page-1',
    title: 'Test CMS Page',
    slug: 'test-page',
    description: 'This is a test page to verify CMS functionality',
    components: [
        {
            id: 'component-1',
            type: 'text',
            props: {
                content: 'Welcome to our test CMS page!',
                className: 'text-2xl font-bold text-center mb-4'
            }
        },
        {
            id: 'component-2',
            type: 'container',
            props: {
                className: 'bg-secondary p-6 rounded-lg'
            },
            children: [
                {
                    id: 'component-2-1',
                    type: 'text',
                    props: {
                        content: 'This is content inside a container',
                        className: 'text-lg'
                    }
                },
                {
                    id: 'component-2-2',
                    type: 'button',
                    props: {
                        text: 'Click Me',
                        variant: 'default',
                        className: 'mt-4'
                    }
                }
            ]
        }
    ]
};
function TestCmsPage() {
    return (<preview_context_1.PreviewProvider initialMode="public">
      <div className="container mx-auto py-8">
        {/* @ts-ignore */}
        <cms_page_renderer_1.CmsPageRenderer page={testPage}/>
      </div>
    </preview_context_1.PreviewProvider>);
}
//# sourceMappingURL=test-cms-page.js.map