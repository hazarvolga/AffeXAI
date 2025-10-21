"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoadRailwayDesignPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function RoadRailwayDesignPage() {
    return (<div>
            <page_hero_1.PageHero title="Yol & Demiryolu Tasarımı" subtitle="Yol ve demiryolu projeleriniz için hassas ve verimli tasarım araçları."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Altyapı Tasarımı', href: '/solutions/infrastructure-design' },
            { name: 'Yol & Demiryolu Tasarımı', href: '/solutions/infrastructure-design/road-railway-design' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Road & Railway Design */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map