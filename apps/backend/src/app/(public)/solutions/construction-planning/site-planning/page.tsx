import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function SitePlanningPage() {
    return (
        <div>
            <PageHero 
                title="Şantiye Planlaması"
                subtitle="Şantiye lojistiği, zaman planlaması ve kaynak yönetimi için çözümler."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'İnşaat Planlaması', href: '/solutions/construction-planning' },
                { name: 'Şantiye Planlaması', href: '/solutions/construction-planning/site-planning' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Site Planning */}
            </div>
        </div>
    );
}
