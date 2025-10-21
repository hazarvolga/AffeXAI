"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BimplusPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function BimplusPage() {
    return (<div>
            <page_hero_1.PageHero title="Bimplus – Disiplinlerarası İşbirliği" subtitle="Tüm proje verilerini merkezileştiren, disiplinler arası işbirliği için açık BIM platformu."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'İşbirliği Yazılımları', href: '/products/collaboration' },
            { name: 'Bimplus', href: '/products/collaboration/bimplus' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Bimplus */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map