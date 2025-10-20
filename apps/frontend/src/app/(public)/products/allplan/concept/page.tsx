import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AllplanConceptPage() {
    return (
        <div>
            <PageHero 
                title="Allplan Concept"
                subtitle="Kavramsal tasarım ve hızlı görselleştirme için ideal araçlar."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Allplan', href: '/products/allplan' },
                { name: 'Allplan Concept', href: '/products/allplan/concept' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Concept */}
            </div>
        </div>
    );
}
