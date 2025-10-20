import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function StructuralEngineeringPage() {
    return (
        <div>
            <PageHero 
                title="Yapısal Mühendislik"
                subtitle="Güvenli ve verimli taşıyıcı sistem tasarımları."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'Bina Tasarımı', href: '/solutions/building-design' },
                { name: 'Yapısal Mühendislik', href: '/solutions/building-design/structural-engineering' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Structural Engineering */}
            </div>
        </div>
    );
}
