import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function PluginsPage() {
    return (
        <div>
            <PageHero 
                title="Eklentiler"
                subtitle="Allplan'in yeteneklerini genişleten ve iş akışlarınızı özelleştiren güçlü eklentiler."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'Eklentiler', href: '/solutions/plugins' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Plugins */}
            </div>
        </div>
    );
}
