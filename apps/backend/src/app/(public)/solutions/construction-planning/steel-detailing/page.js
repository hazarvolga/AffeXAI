"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SteelDetailingPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function SteelDetailingPage() {
    return (<div>
            <page_hero_1.PageHero title="Çelik Detaylandırma ve İmalat" subtitle="Çelik yapılar için hassas detaylandırma ve imalat çizimleri."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'İnşaat Planlaması', href: '/solutions/construction-planning' },
            { name: 'Çelik Detaylandırma', href: '/solutions/construction-planning/steel-detailing' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Steel Detailing */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map