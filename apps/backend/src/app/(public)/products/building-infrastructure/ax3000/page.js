"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ax3000Page;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function Ax3000Page() {
    return (<div>
            <page_hero_1.PageHero title="AX3000 – Enerji Simülasyonu" subtitle="Bina enerji performansı analizi ve TGA (HVAC) sistem tasarımı."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Bina ve Altyapı Yazılımları', href: '/products/building-infrastructure' },
            { name: 'AX3000', href: '/products/building-infrastructure/ax3000' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for AX3000 */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map