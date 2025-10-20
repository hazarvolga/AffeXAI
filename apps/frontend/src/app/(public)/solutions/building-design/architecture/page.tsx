import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function ArchitecturePage() {
    return (
        <div>
            <PageHero 
                title="Mimari Tasarım"
                subtitle="Yenilikçi ve sürdürülebilir mimari çözümler."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'Bina Tasarımı', href: '/solutions/building-design' },
                { name: 'Mimari Tasarım', href: '/solutions/building-design/architecture' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Architecture */}
            </div>
        </div>
    );
}
