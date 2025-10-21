"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanProfessionalPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AllplanProfessionalPage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan Professional" subtitle="Mimarlar ve mühendisler için profesyonel ve kapsamlı BIM çözümü."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Allplan', href: '/products/allplan' },
            { name: 'Allplan Professional', href: '/products/allplan/professional' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Professional */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map