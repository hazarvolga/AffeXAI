import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function ConstructionPlanningPage() {
    return (
        <div>
            <PageHero 
                title="İnşaat Planlaması"
                subtitle="Prefabrik üretimden şantiye yönetimine kadar inşaat süreçlerinizi optimize edin."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'İnşaat Planlaması', href: '/solutions/construction-planning' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Construction Planning */}
            </div>
        </div>
    );
}
