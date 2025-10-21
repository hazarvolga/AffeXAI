"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CollaborationPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function CollaborationPage() {
    return (<div>
            <page_hero_1.PageHero title="İşbirliği" subtitle="Proje ve ekipleriniz için entegre işbirliği ve yönetim araçları."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'İşbirliği', href: '/solutions/collaboration' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Collaboration */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map