"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanAecPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AllplanAecPage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan for AEC Industry" subtitle="AEC endüstrisi için entegre BIM çözümleri."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Bina ve Altyapı Yazılımları', href: '/products/building-infrastructure' },
            { name: 'Allplan for AEC', href: '/products/building-infrastructure/allplan-aec' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan for AEC */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map