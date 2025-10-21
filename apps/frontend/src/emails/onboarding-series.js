"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingSeriesEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const OnboardingSeriesEmail = ({ userName = "Kullanıcı", stepNumber = 1, totalSteps = 5, tipTitle = "İlk Adım: Proje Yapınızı Oluşturun", tipDescription = "Her başarılı projenin temeli, iyi organize edilmiş bir yapıdan geçer. Kat Yöneticisi'ni kullanarak projenizin katlarını ve seviyelerini kolayca oluşturun. Bu, modelinizin düzenli ve yönetilebilir olmasını sağlar.", tipImageUrl = "https://picsum.photos/seed/onboarding-1/600/300", ctaLink = `${baseUrl}/portal/kb/kat-yoneticisi-kullanimi`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `Adım ${stepNumber}: ${tipTitle}`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={header}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>

          <components_1.Section style={content}>
            <components_1.Text style={stepIndicator}>Adım {stepNumber} / {totalSteps}</components_1.Text>
            <components_1.Heading style={heading}>{tipTitle}</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {userName}, {companyName} dünyasına hoş geldiniz! Projelerinizden en iyi şekilde yararlanmanıza yardımcı olacak ipuçları serimize başlıyoruz.
            </components_1.Text>
            
            <components_1.Img src={tipImageUrl} width="100%" style={mainImage}/>

            <components_1.Text style={paragraph}>{tipDescription}</components_1.Text>
            
            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={ctaLink}>
                Daha Fazla Bilgi Edinin
              </components_1.Button>
            </components_1.Section>
            <components_1.Text style={paragraph}>
              İyi çalışmalar,
              <br />
              {companyName} Ekibi
            </components_1.Text>
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.OnboardingSeriesEmail = OnboardingSeriesEmail;
exports.default = exports.OnboardingSeriesEmail;
// Styles
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    backgroundColor: '#ffffff',
    margin: "0 auto",
    padding: "20px 0 48px",
    border: '1px solid #e5e5e5',
    borderRadius: '4px',
    maxWidth: '600px',
    overflow: 'hidden'
};
const header = {
    padding: '0 32px',
    textAlign: 'center',
    marginBottom: '20px',
};
const content = {
    padding: '0 32px',
};
const stepIndicator = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#6a7380',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px',
};
const heading = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: '#333333',
    lineHeight: '36px',
    margin: '12px 0 24px 0',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#445354',
};
const mainImage = {
    borderRadius: '4px',
    margin: '24px 0',
};
const buttonContainer = {
    textAlign: "center",
    margin: "32px 0",
};
const button = {
    backgroundColor: "#ED7D31",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "14px 28px",
    fontWeight: 'bold',
};
//# sourceMappingURL=onboarding-series.js.map