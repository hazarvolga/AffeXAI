"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddOnModulesPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function AddOnModulesPage() {
    return (<div>
            <page_hero_1.PageHero title="Ek Modüller" subtitle="Allplan Exchange, Workgroup, Share ve Lisans Sunucusu gibi modüllerle işlevselliği artırın."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Ek Modüller', href: '/solutions/add-on-modules' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Add-on Modules */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map