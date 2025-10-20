import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function Ax3000Page() {
    return (
        <div>
            <PageHero 
                title="AX3000 – Enerji Simülasyonu"
                subtitle="Bina enerji performansı analizi ve TGA (HVAC) sistem tasarımı."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Bina ve Altyapı Yazılımları', href: '/products/building-infrastructure' },
                { name: 'AX3000', href: '/products/building-infrastructure/ax3000' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for AX3000 */}
            </div>
        </div>
    );
}
