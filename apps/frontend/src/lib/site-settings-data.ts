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
    "logoUrl": "7c6e3b56-e96d-442b-97a9-0b572d673a3c",
    "logoDarkUrl": "90f368ff-27e3-441b-a51d-f60cc3672f32",
    "contact": {
        "address": "Örnek Mah. Teknoloji Cad. No:123, Ataşehir/İstanbul",
        "phone": "+90 216 123 45 67",
        "email": "info@aluplan.tr"
    },
    "socialMedia": {
        "facebook": "https://www.facebook.com/aluplan",
        "linkedin": "https://www.linkedin.com/company/aluplan",
        "twitter": "",
        "youtube": "https://www.youtube.com/aluplan",
        "instagram": "https://www.instagram.com/aluplan"
    },
    "seo": {
        "defaultTitle": "Aluplan Digital - AEC Çözümleri",
        "defaultDescription": "AEC profesyonelleri için en gelişmiş dijital çözümler ve uzman desteği."
    }
};