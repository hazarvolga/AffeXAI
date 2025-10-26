export type SiteSettings = {
    companyName: string;
    logoId?: string;
    logoDarkId?: string;
    logoUrl?: string;
    logoDarkUrl?: string;
    contact: {
        address: string;
        phone: string;
        email: string;
    };
    socialMedia: {
        [key: string]: string;
    };
    seo: {
        defaultTitle: string;
        defaultDescription: string;
    };
};

export const siteSettingsData: SiteSettings = {
    "companyName": "Aluplan Program Sistemleri",
    "logoUrl": "f3dcbef0-3f9b-45b0-92b0-34973bf13aef",
    "logoDarkUrl": "https://placehold.co/140x40/171717/f0f0f0?text=Aluplan",
    "contact": {
        "address": "Örnek Mah. Teknoloji Cad. No:123, Ataşehir/İstanbul",
        "phone": "+90 216 123 45 67",
        "email": "info@aluplan.tr"
    },
    "socialMedia": {},
    "seo": {
        "defaultTitle": "Aluplan Digital - AEC Çözümleri",
        "defaultDescription": "AEC profesyonelleri için en gelişmiş dijital çözümler ve uzman desteği."
    }
};