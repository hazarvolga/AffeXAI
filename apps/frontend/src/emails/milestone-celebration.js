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
exports.MilestoneCelebrationEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const MilestoneCelebrationEmail = ({ userName = "Ayşe", milestone = "1. Yılınız Kutlu Olsun!", milestoneDescription = `Bizimle geçirdiğiniz bir yıl için teşekkür ederiz! {companyName} topluluğunun değerli bir üyesi oldunuz.`, rewardText = "Bu özel günü kutlamak için, bir sonraki eğitiminize özel %15 indirim kuponu hesabınıza tanımladık.", ctaLink = `${baseUrl}/portal/rewards`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    // Update milestoneDescription with dynamic company name
    const dynamicMilestoneDescription = milestoneDescription.replace('{companyName}', companyName);
    const previewText = `Bizimle 1. yılınız! Size özel bir hediyemiz var.`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={header}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>

          <components_1.Section style={content}>
            <components_1.Heading style={heading}>{milestone}</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {userName},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              {dynamicMilestoneDescription}
            </components_1.Text>
            
            <components_1.Section style={rewardSection}>
                <components_1.Text style={rewardTextStyle}>{rewardText}</components_1.Text>
            </components_1.Section>
            
            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={ctaLink}>
                Ödülünüzü Görün
              </components_1.Button>
            </components_1.Section>
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.MilestoneCelebrationEmail = MilestoneCelebrationEmail;
exports.default = exports.MilestoneCelebrationEmail;
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
const heading = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: '#333333',
    lineHeight: '36px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#445354',
};
const rewardSection = {
    margin: '32px 0',
    padding: '24px',
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    textAlign: 'center',
};
const rewardTextStyle = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#0369a1',
    margin: 0,
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
//# sourceMappingURL=milestone-celebration.js.map