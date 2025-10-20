import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function InfrastructureEngineeringPage() {
    return (
        <div>
            <PageHero 
                title="Altyapı Mühendisliği"
                subtitle="Modern altyapı projeleriniz için kapsamlı mühendislik çözümleri."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'Altyapı Tasarımı', href: '/solutions/infrastructure-design' },
                { name: 'Altyapı Mühendisliği', href: '/solutions/infrastructure-design/infrastructure-engineering' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Infrastructure Engineering */}
            </div>
        </div>
    );
}
