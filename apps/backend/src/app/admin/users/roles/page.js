"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RolesAndPermissionsPage;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const PermissionDetail = ({ permission, roles }) => (<div className="py-4 border-b last:border-b-0">
    <h4 className="font-semibold text-base">{permission}</h4>
    <div className="mt-2 space-y-1.5 text-sm">
      {roles.map(({ role, description, allowed }) => (<div key={role} className="flex items-start gap-2">
          {allowed ? (<lucide_react_1.Check className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0"/>) : (<lucide_react_1.X className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0"/>)}
          <span>
            <span className="font-semibold">{role}:</span>{' '}
            <span className="text-muted-foreground">{description}</span>
          </span>
        </div>))}
    </div>
  </div>);
const PermissionCategoryCard = ({ title, icon: Icon, children, }) => (<card_1.Card>
    <card_1.CardHeader>
      <card_1.CardTitle className="flex items-center gap-3 text-xl">
        <Icon className="h-6 w-6 text-primary"/>
        {title}
      </card_1.CardTitle>
    </card_1.CardHeader>
    <card_1.CardContent className="divide-y">{children}</card_1.CardContent>
  </card_1.Card>);
const rolePermissions = {
    userManagement: [
        {
            permission: 'Kullanıcıları Görüntüle',
            roles: [
                { role: 'Admin', description: 'Tüm kullanıcıları görüntüleyebilir.', allowed: true },
                { role: 'Viewer', description: 'Kullanıcıları sadece görüntüleyebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Kullanıcıları görüntüleyemez.', allowed: false },
            ],
        },
        {
            permission: 'Kullanıcı Oluştur / Düzenle / Sil',
            roles: [
                { role: 'Admin', description: 'Kullanıcı oluşturabilir, düzenleyebilir ve silebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Kullanıcı yönetimi yetkisi yoktur.', allowed: false },
            ],
        },
        {
            permission: 'Rolleri Yönet',
            roles: [
                { role: 'Admin', description: 'Tüm rolleri ve izinlerini yönetebilir.', allowed: true },
                { role: 'Viewer', description: 'Rolleri sadece görüntüleyebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Rol yönetimi yetkisi yoktur.', allowed: false },
            ],
        },
    ],
    eventManagement: [
        {
            permission: 'Etkinlikleri Görüntüle',
            roles: [
                { role: 'Admin', description: 'Tüm etkinlikleri yönetebilir.', allowed: true },
                { role: 'Editor', description: 'Tüm etkinlikleri yönetebilir.', allowed: true },
                { role: 'Viewer', description: 'Tüm etkinlikleri görüntüleyebilir.', allowed: true },
                { role: 'Customer', description: 'Portaldaki etkinlikleri görüntüleyebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Etkinliklere erişimi yoktur.', allowed: false },
            ]
        },
        {
            permission: 'Etkinlik Oluştur / Düzenle / Sil',
            roles: [
                { role: 'Admin', description: 'Etkinlik yaşam döngüsünü tamamen yönetebilir.', allowed: true },
                { role: 'Editor', description: 'Etkinlik oluşturabilir, düzenleyebilir ve silebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Etkinlik yönetimi yetkisi yoktur.', allowed: false },
            ]
        },
        {
            permission: 'Katılımcıları Yönet',
            roles: [
                { role: 'Admin', description: 'Tüm etkinliklerin katılımcılarını yönetebilir.', allowed: true },
                { role: 'Editor', description: 'Etkinlik katılımcılarını yönetebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Katılımcı yönetimi yetkisi yoktur.', allowed: false },
            ]
        },
    ],
    certificateManagement: [
        {
            permission: 'Sertifikaları Görüntüle',
            roles: [
                { role: 'Admin', description: 'Tüm sertifikaları görüntüleyebilir.', allowed: true },
                { role: 'Editor', description: 'Tüm sertifikaları görüntüleyebilir.', allowed: true },
                { role: 'Viewer', description: 'Tüm sertifikaları görüntüleyebilir.', allowed: true },
                { role: 'Customer', description: 'Sadece kendi sertifikalarını görüntüleyebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Sertifikaları görüntüleyemez.', allowed: false },
            ]
        },
        {
            permission: 'Sertifika Oluştur / Düzenle / İptal Et',
            roles: [
                { role: 'Admin', description: 'Sertifikaları oluşturabilir, düzenleyebilir ve iptal edebilir.', allowed: true },
                { role: 'Editor', description: 'Sertifikaları oluşturabilir, düzenleyebilir ve iptal edebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Sertifika yönetimi yetkisi yoktur.', allowed: false },
            ]
        },
    ],
    supportManagement: [
        {
            permission: 'Destek Taleplerini Görüntüle',
            roles: [
                { role: 'Admin', description: 'Tüm destek taleplerini görüntüleyebilir.', allowed: true },
                { role: 'Support Team', description: 'Tüm destek taleplerini görüntüleyebilir.', allowed: true },
                { role: 'Viewer', description: 'Tüm destek taleplerini görüntüleyebilir.', allowed: true },
                { role: 'Customer', description: 'Sadece kendi destek taleplerini görüntüleyebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Destek taleplerini görüntüleyemez.', allowed: false },
            ]
        },
        {
            permission: 'Talep Yanıtla / Ata',
            roles: [
                { role: 'Admin', description: 'Talepleri yanıtlayabilir ve atama yapabilir.', allowed: true },
                { role: 'Support Team', description: 'Talepleri yanıtlayabilir ve atama yapabilir.', allowed: true },
                { role: 'Diğerleri', description: 'Destek taleplerini yönetemez.', allowed: false },
            ]
        }
    ],
    marketingManagement: [
        {
            permission: 'Pazarlama İçeriklerini Yönet',
            roles: [
                { role: 'Admin', description: 'Tüm pazarlama (e-posta, bülten, sosyal medya) içeriklerini yönetebilir.', allowed: true },
                { role: 'Marketing Team', description: 'Tüm pazarlama içeriklerini yönetebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Pazarlama yönetimi yetkisi yoktur.', allowed: false },
            ]
        }
    ],
    cmsManagement: [
        {
            permission: 'Sayfaları Görüntüle',
            roles: [
                { role: 'Admin', description: 'Tüm sayfaları görüntüleyebilir.', allowed: true },
                { role: 'Editor', description: 'Tüm sayfaları görüntüleyebilir.', allowed: true },
                { role: 'Viewer', description: 'Tüm sayfaları görüntüleyebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Sayfaları görüntüleyemez.', allowed: false },
            ]
        },
        {
            permission: 'Sayfa ve Menüleri Yönet',
            roles: [
                { role: 'Admin', description: 'Sayfa ve menüleri oluşturabilir, düzenleyebilir ve silebilir.', allowed: true },
                { role: 'Editor', description: 'Sayfa ve menüleri oluşturabilir, düzenleyebilir ve silebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Sayfa ve menü yönetimi yetkisi yoktur.', allowed: false },
            ]
        }
    ],
    systemSettings: [
        {
            permission: 'Sistem Ayarlarını Yönet',
            roles: [
                { role: 'Admin', description: 'Tüm site genelindeki ayarları yönetebilir.', allowed: true },
                { role: 'Diğerleri', description: 'Sistem ayarlarına erişimi yoktur.', allowed: false },
            ]
        }
    ]
};
function RolesAndPermissionsPage() {
    return (<div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <card_1.CardTitle className="text-3xl font-bold tracking-tight">Roller ve İzinler Matrisi</card_1.CardTitle>
          <card_1.CardDescription className="mt-1 text-muted-foreground">
            Sistemdeki kullanıcı rollerinin yetkilerini ve modül bazlı erişimlerini inceleyin.
          </card_1.CardDescription>
        </div>
        <div className="flex gap-2">
           <button_1.Button asChild>
                <link_1.default href="/admin/users/roles/create-new-role">
                    <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                    Yeni Rol Ekle
                </link_1.default>
            </button_1.Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <PermissionCategoryCard title="Kullanıcı Yönetimi" icon={lucide_react_1.Users}>
          {rolePermissions.userManagement.map(p => <PermissionDetail key={p.permission} {...p}/>)}
        </PermissionCategoryCard>

        <PermissionCategoryCard title="Etkinlik Yönetimi" icon={lucide_react_1.Calendar}>
          {rolePermissions.eventManagement.map(p => <PermissionDetail key={p.permission} {...p}/>)}
        </PermissionCategoryCard>

        <PermissionCategoryCard title="Sertifika Yönetimi" icon={lucide_react_1.Award}>
          {rolePermissions.certificateManagement.map(p => <PermissionDetail key={p.permission} {...p}/>)}
        </PermissionCategoryCard>

         <PermissionCategoryCard title="Destek Yönetimi" icon={lucide_react_1.LifeBuoy}>
          {rolePermissions.supportManagement.map(p => <PermissionDetail key={p.permission} {...p}/>)}
        </PermissionCategoryCard>

        <PermissionCategoryCard title="Pazarlama Yönetimi" icon={lucide_react_1.Send}>
          {rolePermissions.marketingManagement.map(p => <PermissionDetail key={p.permission} {...p}/>)}
        </PermissionCategoryCard>

        <PermissionCategoryCard title="CMS Yönetimi" icon={lucide_react_1.FileText}>
          {rolePermissions.cmsManagement.map(p => <PermissionDetail key={p.permission} {...p}/>)}
        </PermissionCategoryCard>

        <PermissionCategoryCard title="Sistem Ayarları" icon={lucide_react_1.Settings}>
          {rolePermissions.systemSettings.map(p => <PermissionDetail key={p.permission} {...p}/>)}
        </PermissionCategoryCard>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map