"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function TimPage() {
    return (<div>
            <page_hero_1.PageHero title="Tim – Prekast İş Planlaması" subtitle="Prefabrik üretim süreçleriniz için iş ve kaynak planlaması."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'İnşaat Planlama Yazılımları', href: '/products/construction-planning' },
            { name: 'Tim', href: '/products/construction-planning/tim' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Tim */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map