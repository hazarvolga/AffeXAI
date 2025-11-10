import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function MepPage() {
    return (
        <div>
            <PageHero                 title="MEP"
                subtitle="Mekanik, Elektrik ve Sıhhi Tesisat (MEP) mühendisliği çözümleri."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'Bina Tasarımı', href: '/solutions/building-design' },
                { name: 'MEP', href: '/solutions/building-design/mep' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for MEP */}
            </div>
        </div>
    );
}
