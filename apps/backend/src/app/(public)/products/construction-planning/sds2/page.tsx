import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function Sds2Page() {
    return (
        <div>
            <PageHero 
                title="SDS/2 – Çelik Detaylandırma"
                subtitle="Çelik yapıların 3B detaylandırılması ve imalat otomasyonu için lider yazılım."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'İnşaat Planlama Yazılımları', href: '/products/construction-planning' },
                { name: 'SDS/2', href: '/products/construction-planning/sds2' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for SDS/2 */}
            </div>
        </div>
    );
}
