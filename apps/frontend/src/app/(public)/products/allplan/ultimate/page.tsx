import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AllplanUltimatePage() {
    return (
        <div>
            <PageHero 
                title="Allplan Ultimate"
                subtitle="Tüm Allplan özelliklerini ve modüllerini içeren nihai paket."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Allplan', href: '/products/allplan' },
                { name: 'Allplan Ultimate', href: '/products/allplan/ultimate' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Ultimate */}
            </div>
        </div>
    );
}
