"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MepPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function MepPage() {
    return (<div>
            <page_hero_1.PageHero title="MEP" subtitle="Mekanik, Elektrik ve Sıhhi Tesisat (MEP) mühendisliği çözümleri."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Bina Tasarımı', href: '/solutions/building-design' },
            { name: 'MEP', href: '/solutions/building-design/mep' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for MEP */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map