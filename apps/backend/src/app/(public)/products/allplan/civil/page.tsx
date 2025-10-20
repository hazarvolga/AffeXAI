import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AllplanCivilPage() {
    return (
        <div>
            <PageHero 
                title="Allplan Civil"
                subtitle="İnşaat mühendisliği ve altyapı projeleri için özel olarak tasarlanmış çözümler."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Allplan', href: '/products/allplan' },
                { name: 'Allplan Civil', href: '/products/allplan/civil' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Civil */}
            </div>
        </div>
    );
}
