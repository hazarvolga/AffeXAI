import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function RoadRailwayDesignPage() {
    return (
        <div>
            <PageHero 
                title="Yol & Demiryolu Tasarımı"
                subtitle="Yol ve demiryolu projeleriniz için hassas ve verimli tasarım araçları."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'Altyapı Tasarımı', href: '/solutions/infrastructure-design' },
                { name: 'Yol & Demiryolu Tasarımı', href: '/solutions/infrastructure-design/road-railway-design' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Road & Railway Design */}
            </div>
        </div>
    );
}
