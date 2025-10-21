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
exports.FlashSaleEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const FlashSaleEmail = ({ userName = "Kullanıcı", saleTitle = "Sadece 24 Saat: %30 İndirim!", saleDescription = "Tüm Allplan eğitim paketlerinde geçerli, kaçırılmayacak flaş indirim başladı. Bilginizi artırmanın tam zamanı!", discountPercentage = 30, countdown = "23:59:59", ctaLink = `${baseUrl}/education/training`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || (0, siteSettings_1.getContactInfo)();
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `Hızlı Davran! %${discountPercentage} İndirim İçin Son Saatler!`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={header}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>

          <components_1.Section style={content}>
            <components_1.Heading style={heading}>{saleTitle}</components_1.Heading>
            <components_1.Text style={paragraph}>{saleDescription}</components_1.Text>
            
            <components_1.Section style={countdownSection}>
                <components_1.Text style={countdownText}>Kalan Süre: {countdown}</components_1.Text>
            </components_1.Section>

            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={ctaLink}>
                İndirimi Yakala
              </components_1.Button>
            </components_1.Section>
            
            <components_1.Text style={paragraphSmall}>
              Bu fırsat sadece 24 saat için geçerlidir ve stoklarla sınırlıdır.
            </components_1.Text>
          </components_1.Section>

          <components_1.Hr style={hr}/>
          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.FlashSaleEmail = FlashSaleEmail;
exports.default = exports.FlashSaleEmail;
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
    textAlign: 'center',
};
const heading = {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    color: '#d94848', // A more urgent color
    lineHeight: '40px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#445354',
    textAlign: 'center',
};
const paragraphSmall = {
    ...paragraph,
    fontSize: '12px',
    color: '#6a7380',
};
const countdownSection = {
    margin: '32px 0',
    padding: '16px',
    backgroundColor: '#fffbeb',
    border: '1px dashed #facc15',
    borderRadius: '8px',
};
const countdownText = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#b45309',
    margin: 0,
    letterSpacing: '1px'
};
const buttonContainer = {
    textAlign: "center",
    margin: "32px 0",
};
const button = {
    backgroundColor: "#dc2626",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "18px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "16px 32px",
    fontWeight: 'bold',
};
const hr = {
    borderColor: "#e5e5e5",
    margin: "30px 0",
};
//# sourceMappingURL=flash-sale.js.map