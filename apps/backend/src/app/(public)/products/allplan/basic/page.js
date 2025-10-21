"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanBasicPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AllplanBasicPage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan Basic" subtitle="Temel 2B çizim ve 3B modelleme ihtiyaçlarınız için güçlü bir başlangıç."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Allplan', href: '/products/allplan' },
            { name: 'Allplan Basic', href: '/products/allplan/basic' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Basic */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map