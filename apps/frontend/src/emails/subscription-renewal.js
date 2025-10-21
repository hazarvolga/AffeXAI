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
exports.SubscriptionRenewalEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const SubscriptionRenewalEmail = ({ userName = "Ayşe", subscriptionName = "Allplan Professional Lisansı", renewalDate = "30 Eylül 2024", renewalPrice = "1,999.00 TL", manageLink = `${baseUrl}/portal/licenses`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || (0, siteSettings_1.getContactInfo)();
    // For templates that previously didn't have social media, we'll still include it for consistency
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `Aboneliğiniz yakında yenileniyor: ${subscriptionName}`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={header}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>

          <components_1.Section style={content}>
            <components_1.Heading style={heading}>Aboneliğiniz Yakında Yenileniyor</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {userName},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Bu, {subscriptionName} aboneliğinizin <strong>{renewalDate}</strong> tarihinde <strong>{renewalPrice}</strong> bedelle otomatik olarak yenileneceğini bildiren bir hatırlatmadır.
            </components_1.Text>
            
             <components_1.Section style={renewalInfoSection}>
                <components_1.Text style={renewalInfoText}><strong>Ürün:</strong> {subscriptionName}</components_1.Text>
                <components_1.Text style={renewalInfoText}><strong>Yenileme Tarihi:</strong> {renewalDate}</components_1.Text>
                <components_1.Text style={renewalInfoText}><strong>Tutar:</strong> {renewalPrice}</components_1.Text>
            </components_1.Section>

            <components_1.Text style={paragraph}>
              Herhangi bir işlem yapmanıza gerek yoktur. Ödeme, kayıtlı kartınızdan otomatik olarak alınacaktır. Aboneliğinizi yönetmek veya ödeme bilgilerinizi güncellemek isterseniz, aşağıdaki butonu kullanabilirsiniz.
            </components_1.Text>
            
            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={manageLink}>
                Aboneliği Yönet
              </components_1.Button>
            </components_1.Section>
            
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.SubscriptionRenewalEmail = SubscriptionRenewalEmail;
exports.default = exports.SubscriptionRenewalEmail;
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
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: '#333333',
    lineHeight: '32px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#445354',
};
const renewalInfoSection = {
    margin: '24px 0',
    padding: '16px',
    border: '1px solid #e5e5e5',
    borderRadius: '4px',
    backgroundColor: '#fafafa',
};
const renewalInfoText = {
    margin: '4px 0',
    fontSize: '14px',
    color: '#333333',
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
const hr = {
    borderColor: "#e5e5e5",
    margin: "30px 0",
};
//# sourceMappingURL=subscription-renewal.js.map