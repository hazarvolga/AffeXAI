"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanPrecastPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AllplanPrecastPage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan Precast" subtitle="Prefabrik eleman tasarımı, detaylandırması ve üretimi için otomasyon."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Allplan', href: '/products/allplan' },
            { name: 'Allplan Precast', href: '/products/allplan/precast' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Precast */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map