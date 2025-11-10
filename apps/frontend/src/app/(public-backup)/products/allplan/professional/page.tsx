import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AllplanProfessionalPage() {
    return (
        <div>
            <PageHero 
                title="Allplan Professional"
                subtitle="Mimarlar ve mühendisler için profesyonel ve kapsamlı BIM çözümü."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Allplan', href: '/products/allplan' },
                { name: 'Allplan Professional', href: '/products/allplan/professional' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Professional */}
            </div>
        </div>
    );
}
