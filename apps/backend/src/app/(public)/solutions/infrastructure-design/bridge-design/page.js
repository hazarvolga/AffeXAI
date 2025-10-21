"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BridgeDesignPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function BridgeDesignPage() {
    return (<div>
            <page_hero_1.PageHero title="Köprü Tasarımı" subtitle="Estetik ve dayanıklı köprüler için parametrik modelleme ve analiz."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Altyapı Tasarımı', href: '/solutions/infrastructure-design' },
            { name: 'Köprü Tasarımı', href: '/solutions/infrastructure-design/bridge-design' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Bridge Design */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map