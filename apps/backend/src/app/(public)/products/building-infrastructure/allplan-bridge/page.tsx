import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AllplanBridgePage() {
    return (
        <div>
            <PageHero 
                title="Allplan Bridge"
                subtitle="Parametrik köprü modellemesi, analizi ve detaylandırması için eksiksiz çözüm."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Bina ve Altyapı Yazılımları', href: '/products/building-infrastructure' },
                { name: 'Allplan Bridge', href: '/products/building-infrastructure/allplan-bridge' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Bridge */}
            </div>
        </div>
    );
}
