import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function PrecastProductionPage() {
    return (
        <div>
            <PageHero 
                title="Prefabrik Üretimi"
                subtitle="Endüstriyel prefabrik yapı elemanları için otomasyon ve verimlilik."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'İnşaat Planlaması', href: '/solutions/construction-planning' },
                { name: 'Prefabrik Üretimi', href: '/solutions/construction-planning/precast-production' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Precast Production */}
            </div>
        </div>
    );
}
