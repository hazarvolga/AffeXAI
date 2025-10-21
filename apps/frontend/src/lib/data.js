"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationData = exports.productsMegaMenu = exports.solutionsMegaMenu = void 0;
const lucide_react_1 = require("lucide-react");
const education_data_1 = require("./education-data");
exports.solutionsMegaMenu = [
    {
        title: "Bina Tasarımı",
        href: "/solutions/building-design",
        items: [
            { title: "Mimari", href: "/solutions/building-design/architecture", description: "Yenilikçi ve sürdürülebilir mimari çözümler.", icon: lucide_react_1.Building },
            { title: "Yapısal Mühendislik", href: "/solutions/building-design/structural-engineering", description: "Güvenli ve verimli taşıyıcı sistem tasarımları.", icon: lucide_react_1.Construction },
            { title: "MEP", href: "/solutions/building-design/mep", description: "Mekanik, elektrik ve sıhhi tesisat.", icon: lucide_react_1.HardHat },
        ],
    },
    {
        title: "Altyapı Tasarımı",
        href: "/solutions/infrastructure-design",
        items: [
            { title: "Altyapı Mühendisliği", href: "/solutions/infrastructure-design/infrastructure-engineering", description: "Modern ulaşım ağları için altyapı projeleri.", icon: lucide_react_1.Network },
            { title: "Yol & Demiryolu Tasarımı", href: "/solutions/infrastructure-design/road-railway-design", description: "Yol ve demiryolu projeleri.", icon: lucide_react_1.Network },
            { title: "Köprü Tasarımı", href: "/solutions/infrastructure-design/bridge-design", description: "Estetik ve dayanıklı köprü mühendisliği.", icon: lucide_react_1.Landmark },
        ],
    },
    {
        title: "İnşaat Planlaması",
        href: "/solutions/construction-planning",
        items: [
            { title: "Prefabrik Üretimi", href: "/solutions/construction-planning/precast-production", description: "Endüstriyel prefabrik yapı çözümleri.", icon: lucide_react_1.Factory },
            { title: "Çelik Detaylandırma", href: "/solutions/construction-planning/steel-detailing", description: "Çelik yapılar için detaylandırma.", icon: lucide_react_1.Construction },
            { title: "Şantiye Planlaması", href: "/solutions/construction-planning/site-planning", description: "Şantiye yönetimi ve planlaması.", icon: lucide_react_1.MapPin },
        ],
    },
    {
        title: "Diğer Çözümler",
        href: "/solutions",
        items: [
            { title: "İşbirliği", href: "/solutions/collaboration", description: "AEC projeleri için entegre yönetim araçları.", icon: lucide_react_1.Briefcase },
            { title: "Eklentiler", href: "/solutions/plugins", description: "Allplan işlevselliğini genişleten eklentiler.", icon: lucide_react_1.Puzzle },
            { title: "Ek Modüller", href: "/solutions/add-on-modules", description: "Ekstra Allplan modülleri.", icon: lucide_react_1.Layers3 },
        ],
    },
];
exports.productsMegaMenu = [
    {
        title: "Allplan Sürümleri",
        href: "/products/allplan",
        items: [
            { title: "Allplan Basic", href: "/products/allplan/basic", description: "Temel 2B/3B modelleme araçları.", icon: lucide_react_1.PenSquare },
            { title: "Allplan Concept", href: "/products/allplan/concept", description: "Kavramsal tasarım ve görselleştirme.", icon: lucide_react_1.Blocks },
            { title: "Allplan Professional", href: "/products/allplan/professional", description: "Profesyoneller için kapsamlı BIM çözümü.", icon: lucide_react_1.Briefcase },
            { title: "Allplan Ultimate", href: "/products/allplan/ultimate", description: "Tüm özelliklere sahip nihai paket.", icon: lucide_react_1.Layers3 },
        ],
    },
    {
        title: "Uzmanlık Alanları",
        href: "/products/allplan",
        items: [
            { title: "Allplan Civil", href: "/products/allplan/civil", description: "İnşaat mühendisliği ve altyapı projeleri.", icon: lucide_react_1.Network },
            { title: "Allplan Precast", href: "/products/allplan/precast", description: "Prefabrik eleman tasarımı ve üretimi.", icon: lucide_react_1.Factory },
            { title: "Allplan Bridge", href: "/products/building-infrastructure/allplan-bridge", description: "Köprü tasarımı ve analizi.", icon: lucide_react_1.Landmark },
        ],
    },
    {
        title: "Platform & İşbirliği",
        href: "/products/collaboration",
        items: [
            { title: "Allplan Connect", href: "https://connect.allplan.com/", description: "Kullanıcı portalı, forumlar ve kaynaklar.", icon: lucide_react_1.Users },
            { title: "Bimplus", href: "/products/collaboration/bimplus", description: "Bulut tabanlı işbirliği platformu.", icon: lucide_react_1.GitFork },
            { title: "SDS/2", href: "/products/construction-planning/sds2", description: "Çelik detaylandırma ve imalat yazılımı.", icon: lucide_react_1.Construction },
        ],
    },
    {
        title: "Partner Çözümleri",
        href: "/products",
        items: [
            { title: "AX3000", href: "/products/building-infrastructure/ax3000", description: "TGA ve enerji simülasyonu.", icon: lucide_react_1.GraduationCap },
            { title: "Tim", href: "/products/construction-planning/tim", description: "Prekast için iş planlaması.", icon: lucide_react_1.Book },
        ],
    },
];
exports.educationData = {
    tabs: education_data_1.educationData.tabs,
    content: education_data_1.educationData.content
};
//# sourceMappingURL=data.js.map