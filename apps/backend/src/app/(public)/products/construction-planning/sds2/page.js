"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sds2Page;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function Sds2Page() {
    return (<div>
            <page_hero_1.PageHero title="SDS/2 – Çelik Detaylandırma" subtitle="Çelik yapıların 3B detaylandırılması ve imalat otomasyonu için lider yazılım."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'İnşaat Planlama Yazılımları', href: '/products/construction-planning' },
            { name: 'SDS/2', href: '/products/construction-planning/sds2' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for SDS/2 */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map