"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanBridgePage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AllplanBridgePage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan Bridge" subtitle="Parametrik köprü modellemesi, analizi ve detaylandırması için eksiksiz çözüm."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Bina ve Altyapı Yazılımları', href: '/products/building-infrastructure' },
            { name: 'Allplan Bridge', href: '/products/building-infrastructure/allplan-bridge' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Bridge */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map