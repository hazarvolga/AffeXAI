"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanConceptPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AllplanConceptPage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan Concept" subtitle="Kavramsal tasarım ve hızlı görselleştirme için ideal araçlar."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Allplan', href: '/products/allplan' },
            { name: 'Allplan Concept', href: '/products/allplan/concept' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Concept */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map