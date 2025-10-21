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
exports.LoyaltyProgramEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const LoyaltyProgramEmail = ({ userName = "Ahmet", points = 1250, level = "Altın Üye", rewardsLink = `${baseUrl}/portal/rewards`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `Puan durumunuz ve yeni ödüller sizi bekliyor!`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={logoContainer}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>
          <components_1.Section style={content}>
            <components_1.Heading style={heading}>Sadakatiniz İçin Teşekkürler!</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {userName},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              {companyName} ailesinin değerli bir parçasısınız. Mevcut puan durumunuz ve sizi bekleyen özel ödüllere aşağıdan göz atabilirsiniz.
            </components_1.Text>

            <components_1.Section style={pointsSection}>
                <components_1.Text style={pointsLabel}>Mevcut Puanınız</components_1.Text>
                <components_1.Text style={pointsValue}>{points} Puan</components_1.Text>
                <components_1.Text style={levelText}>Seviye: <strong>{level}</strong></components_1.Text>
            </components_1.Section>

            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={rewardsLink}>
                Ödülleri Keşfet
              </components_1.Button>
            </components_1.Section>
            <components_1.Text style={paragraph}>
              Bizi tercih ettiğiniz için teşekkür ederiz.
            </components_1.Text>
          </components_1.Section>
          
          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.LoyaltyProgramEmail = LoyaltyProgramEmail;
exports.default = exports.LoyaltyProgramEmail;
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
    textAlign: 'center',
};
const heading = {
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "32px",
    color: '#1a1a1a',
    margin: '16px 0 24px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#3c4043',
};
const pointsSection = {
    padding: '24px',
    backgroundColor: '#fef9c3',
    border: '1px solid #fde047',
    borderRadius: '8px',
    margin: '32px 0',
};
const pointsLabel = {
    fontSize: '14px',
    color: '#ca8a04',
    margin: 0,
};
const pointsValue = {
    fontSize: '36px',
    fontWeight: 700,
    color: '#a16207',
    margin: '4px 0 0 0',
};
const levelText = {
    fontSize: '14px',
    color: '#ca8a04',
    margin: '8px 0 0 0',
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
    padding: "14px 24px",
    fontWeight: '600',
};
//# sourceMappingURL=loyalty-program.js.map