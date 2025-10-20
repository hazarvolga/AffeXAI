import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function BridgeDesignPage() {
    return (
        <div>
            <PageHero 
                title="Köprü Tasarımı"
                subtitle="Estetik ve dayanıklı köprüler için parametrik modelleme ve analiz."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'Altyapı Tasarımı', href: '/solutions/infrastructure-design' },
                { name: 'Köprü Tasarımı', href: '/solutions/infrastructure-design/bridge-design' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Bridge Design */}
            </div>
        </div>
    );
}
