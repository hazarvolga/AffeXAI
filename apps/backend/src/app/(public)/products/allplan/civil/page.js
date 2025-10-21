"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanCivilPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AllplanCivilPage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan Civil" subtitle="İnşaat mühendisliği ve altyapı projeleri için özel olarak tasarlanmış çözümler."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Allplan', href: '/products/allplan' },
            { name: 'Allplan Civil', href: '/products/allplan/civil' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Civil */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map