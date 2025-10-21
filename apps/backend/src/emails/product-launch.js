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
exports.ProductLaunchEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const ProductLaunchEmail = ({ productName = "Allplan 2025", productDescription = "Tasarım, mühendislik ve inşaat dünyasını yeniden şekillendirecek olan devrim niteliğindeki yeni sürümümüzle tanışın. Daha akıllı, daha hızlı ve daha entegre.", productImageUrl = "https://picsum.photos/seed/product-launch/600/350", ctaLink = `${baseUrl}/products/allplan`, features = [
    { icon: "✨", title: "AI Destekli Modelleme", description: "Yapay zeka ile tasarım süreçlerinizi hızlandırın." },
    { icon: "🔗", title: "Gelişmiş İşbirliği", description: "Bimplus ile proje paydaşlarınızla sorunsuz çalışın." },
    { icon: "🌿", title: "Sürdürülebilirlik Araçları", description: "Yeşil bina projeleri için entegre analizler yapın." },
], siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `Tanıtıyoruz: ${productName} - Geleceğin Aracı`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={header}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>

          <components_1.Section style={content}>
            <components_1.Text style={introText}>YENİ ÜRÜN</components_1.Text>
            <components_1.Heading style={heading}>Tanıtıyoruz: {productName}</components_1.Heading>
            <components_1.Text style={paragraph}>{productDescription}</components_1.Text>
            
            <components_1.Img src={productImageUrl} width="100%" style={mainImage}/>
            
            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={ctaLink}>
                Şimdi Keşfet
              </components_1.Button>
            </components_1.Section>

            <components_1.Heading as="h2" style={featuresHeading}>Öne Çıkan Özellikler</components_1.Heading>

            <components_1.Section>
              {features.map((feature, index) => (<components_1.Row key={index} style={featureRow}>
                    <components_1.Column style={featureIconColumn}>
                        <components_1.Text style={featureIcon}>{feature.icon}</components_1.Text>
                    </components_1.Column>
                    <components_1.Column>
                        <components_1.Heading as="h3" style={featureTitle}>{feature.title}</components_1.Heading>
                        <components_1.Text style={featureDescription}>{feature.description}</components_1.Text>
                    </components_1.Column>
                 </components_1.Row>))}
            </components_1.Section>
            
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.ProductLaunchEmail = ProductLaunchEmail;
exports.default = exports.ProductLaunchEmail;
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
const introText = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#ED7D31',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px',
};
const heading = {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    color: '#333333',
    lineHeight: '40px',
    margin: '8px 0 16px 0',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#445354',
    textAlign: 'center',
};
const mainImage = {
    borderRadius: '8px',
    margin: '32px 0',
};
const buttonContainer = {
    textAlign: "center",
    margin: "0 0 32px 0",
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
const featuresHeading = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    margin: '32px 0 24px 0',
};
const featureRow = {
    marginBottom: '20px',
};
const featureIconColumn = {
    width: '48px',
};
const featureIcon = {
    fontSize: '24px',
};
const featureTitle = {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 4px 0',
    color: '#333333',
};
const featureDescription = {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#6a7380',
    margin: 0,
};
//# sourceMappingURL=product-launch.js.map