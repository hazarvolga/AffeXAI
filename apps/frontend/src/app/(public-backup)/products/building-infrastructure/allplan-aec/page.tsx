import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AllplanAecPage() {
    return (
        <div>
            <PageHero 
                title="Allplan for AEC Industry"
                subtitle="AEC endüstrisi için entegre BIM çözümleri."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Bina ve Altyapı Yazılımları', href: '/products/building-infrastructure' },
                { name: 'Allplan for AEC', href: '/products/building-infrastructure/allplan-aec' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan for AEC */}
            </div>
        </div>
    );
}
