import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function SteelDetailingPage() {
    return (
        <div>
            <PageHero 
                title="Çelik Detaylandırma ve İmalat"
                subtitle="Çelik yapılar için hassas detaylandırma ve imalat çizimleri."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'İnşaat Planlaması', href: '/solutions/construction-planning' },
                { name: 'Çelik Detaylandırma', href: '/solutions/construction-planning/steel-detailing' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Steel Detailing */}
            </div>
        </div>
    );
}
