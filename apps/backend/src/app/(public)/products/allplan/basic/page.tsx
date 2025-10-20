import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AllplanBasicPage() {
    return (
        <div>
            <PageHero 
                title="Allplan Basic"
                subtitle="Temel 2B çizim ve 3B modelleme ihtiyaçlarınız için güçlü bir başlangıç."
            />
            <Breadcrumb items={[
                { name: 'Ürünler', href: '/products' },
                { name: 'Allplan', href: '/products/allplan' },
                { name: 'Allplan Basic', href: '/products/allplan/basic' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Allplan Basic */}
            </div>
        </div>
    );
}
