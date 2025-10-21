"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArchitecturePage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function ArchitecturePage() {
    return (<div>
            <page_hero_1.PageHero title="Mimari Tasarım" subtitle="Yenilikçi ve sürdürülebilir mimari çözümler."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Bina Tasarımı', href: '/solutions/building-design' },
            { name: 'Mimari Tasarım', href: '/solutions/building-design/architecture' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Architecture */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map