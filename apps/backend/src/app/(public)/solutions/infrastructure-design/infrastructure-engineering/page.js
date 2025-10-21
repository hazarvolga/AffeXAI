"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InfrastructureEngineeringPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function InfrastructureEngineeringPage() {
    return (<div>
            <page_hero_1.PageHero title="Altyapı Mühendisliği" subtitle="Modern altyapı projeleriniz için kapsamlı mühendislik çözümleri."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Altyapı Tasarımı', href: '/solutions/infrastructure-design' },
            { name: 'Altyapı Mühendisliği', href: '/solutions/infrastructure-design/infrastructure-engineering' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Infrastructure Engineering */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map