import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function CollaborationPage() {
    return (
        <div>
            <PageHero 
                title="İşbirliği"
                subtitle="Proje ve ekipleriniz için entegre işbirliği ve yönetim araçları."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'İşbirliği', href: '/solutions/collaboration' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Collaboration */}
            </div>
        </div>
    );
}
