import { PageHero } from "@/components/common/page-hero";
import { Breadcrumb } from "@/components/common/breadcrumb";

export default function AddOnModulesPage() {
    return (
        <div>
            <PageHero 
                title="Ek Modüller"
                subtitle="Allplan Exchange, Workgroup, Share ve Lisans Sunucusu gibi modüllerle işlevselliği artırın."
            />
            <Breadcrumb items={[
                { name: 'Çözümler', href: '/solutions' },
                { name: 'Ek Modüller', href: '/solutions/add-on-modules' }
            ]} />
            <div className="container mx-auto py-12 px-4">
                {/* Content for Add-on Modules */}
            </div>
        </div>
    );
}
