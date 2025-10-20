import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function BimplusPage() {
    return (
        <div>
            <PageHero 
                title="Bimplus – Disiplinlerarası İşbirliği"
                subtitle="Tüm proje verilerini merkezileştiren, disiplinler arası işbirliği için açık BIM platformu."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'İşbirliği Yazılımları', href: '/products/collaboration' },
                { name: 'Bimplus', href: '/products/collaboration/bimplus' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Bimplus */}
            </div>
        </div>
    );
}
