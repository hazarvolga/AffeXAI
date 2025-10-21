"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PrecastProductionPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function PrecastProductionPage() {
    return (<div>
            <page_hero_1.PageHero title="Prefabrik Üretimi" subtitle="Endüstriyel prefabrik yapı elemanları için otomasyon ve verimlilik."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'İnşaat Planlaması', href: '/solutions/construction-planning' },
            { name: 'Prefabrik Üretimi', href: '/solutions/construction-planning/precast-production' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Precast Production */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map