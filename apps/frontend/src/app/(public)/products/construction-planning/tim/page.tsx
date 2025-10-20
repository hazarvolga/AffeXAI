import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function TimPage() {
    return (
        <div>
            <PageHero 
                title="Tim – Prekast İş Planlaması"
                subtitle="Prefabrik üretim süreçleriniz için iş ve kaynak planlaması."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'İnşaat Planlama Yazılımları', href: '/products/construction-planning' },
                { name: 'Tim', href: '/products/construction-planning/tim' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Tim */}
            </div>
        </div>
    );
}
