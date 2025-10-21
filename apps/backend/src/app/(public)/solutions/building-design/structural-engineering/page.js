"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StructuralEngineeringPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function StructuralEngineeringPage() {
    return (<div>
            <page_hero_1.PageHero title="Yapısal Mühendislik" subtitle="Güvenli ve verimli taşıyıcı sistem tasarımları."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Bina Tasarımı', href: '/solutions/building-design' },
            { name: 'Yapısal Mühendislik', href: '/solutions/building-design/structural-engineering' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Structural Engineering */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map