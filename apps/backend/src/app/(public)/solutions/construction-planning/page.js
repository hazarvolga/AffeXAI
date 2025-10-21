"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConstructionPlanningPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function ConstructionPlanningPage() {
    return (<div>
            <page_hero_1.PageHero title="İnşaat Planlaması" subtitle="Prefabrik üretimden şantiye yönetimine kadar inşaat süreçlerinizi optimize edin."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'İnşaat Planlaması', href: '/solutions/construction-planning' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Construction Planning */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map