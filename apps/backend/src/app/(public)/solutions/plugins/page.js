"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PluginsPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
function PluginsPage() {
    return (<div>
            <page_hero_1.PageHero title="Eklentiler" subtitle="Allplan'in yeteneklerini genişleten ve iş akışlarınızı özelleştiren güçlü eklentiler."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Eklentiler', href: '/solutions/plugins' }
        ]}/>
            <div className="container mx-auto py-12 px-4">
                {/* Content for Plugins */}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map