"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanUltimatePage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AllplanUltimatePage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan Ultimate" subtitle="Tüm Allplan özelliklerini ve modüllerini içeren nihai paket."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Allplan', href: '/products/allplan' },
            { name: 'Allplan Ultimate', href: '/products/allplan/ultimate' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Ultimate */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map