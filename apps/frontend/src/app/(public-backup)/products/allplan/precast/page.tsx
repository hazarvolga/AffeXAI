import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AllplanPrecastPage() {
    return (
        <div>
            <PageHero 
                title="Allplan Precast"
                subtitle="Prefabrik eleman tasarımı, detaylandırması ve üretimi için otomasyon."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Allplan', href: '/products/allplan' },
                { name: 'Allplan Precast', href: '/products/allplan/precast' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Precast */}
            </div>
        </div>
    );
}
