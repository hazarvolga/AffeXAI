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
exports.ProductRecommendationEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const ProductRecommendationEmail = ({ userName = "Zeynep", recommendations = [
    { name: "Allplan Bridge 2024", description: "Karmaşık köprü projeleri için hepsi bir arada çözüm.", imageUrl: "https://picsum.photos/seed/rec-1/200/200", link: `${baseUrl}/products/building-infrastructure/allplan-bridge` },
    { name: "İleri Düzey Workshop", description: "Yapısal mühendislikte uzmanlaşmak için atölye çalışmamız.", imageUrl: "https://picsum.photos/seed/rec-2/200/200", link: `${baseUrl}/education/training` }
], siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = "Sizin için seçtiklerimiz var!";
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={logoContainer}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>
          <components_1.Section style={content}>
            <components_1.Heading style={heading}>İlginizi Çekebilecekler</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {userName},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Son aktivitelerinize dayanarak, ilginizi çekeceğini düşündüğümüz bazı ürün ve hizmetleri sizin için seçtik.
            </components_1.Text>
            
            <components_1.Section style={{ marginTop: '32px' }}>
              {recommendations.map((item, index) => (<components_1.Row key={index} style={{ marginBottom: '24px' }}>
                    <components_1.Column style={{ width: '120px', paddingRight: '20px' }}>
                        <components_1.Img src={item.imageUrl} width="100" height="100" alt={item.name} style={itemImage}/>
                    </components_1.Column>
                    <components_1.Column>
                        <components_1.Heading as="h3" style={itemName}>{item.name}</components_1.Heading>
                        <components_1.Text style={itemDescription}>{item.description}</components_1.Text>
                        <components_1.Link href={item.link} style={itemLink}>Daha Fazla Bilgi &rarr;</components_1.Link>
                    </components_1.Column>
                </components_1.Row>))}
            </components_1.Section>
          </components_1.Section>
          
          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.ProductRecommendationEmail = ProductRecommendationEmail;
exports.default = exports.ProductRecommendationEmail;
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    backgroundColor: '#ffffff',
    margin: "0 auto",
    padding: "20px 48px 48px 48px",
    marginBottom: '64px',
    border: '1px solid #f0f0f0',
    borderRadius: '4px',
    maxWidth: '580px',
};
const logoContainer = {
    padding: '0 0 20px 0',
    textAlign: 'center',
};
const content = {
    padding: '0',
};
const heading = {
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "32px",
    color: '#1a1a1a',
    textAlign: 'center',
    margin: '16px 0 24px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#3c4043',
};
const itemImage = {
    borderRadius: '8px'
};
const itemName = {
    fontSize: '16px',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0 0 4px 0',
};
const itemDescription = {
    fontSize: '14px',
    color: '#6a7380',
    margin: '0 0 12px 0',
    lineHeight: '20px'
};
const itemLink = {
    fontSize: '14px',
    color: '#ED7D31',
    textDecoration: 'none',
    fontWeight: 500,
};
//# sourceMappingURL=product-recommendation.js.map