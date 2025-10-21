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
exports.PasswordResetEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const PasswordResetEmail = ({ userName = 'Değerli Kullanıcı', resetLink = `${baseUrl}/portal/login`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || (0, siteSettings_1.getContactInfo)();
    // For templates that previously didn't have social media, we'll still include it for consistency
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `${companyName} için parolanızı sıfırlayın`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={logoContainer}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>
          <components_1.Section style={content}>
            <components_1.Text style={title}>
              Parolanızı Sıfırlayın
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Merhaba {userName},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Hesabınız için bir parola sıfırlama talebi aldık. Parolanızı yenilemek için aşağıdaki butona tıklayabilirsiniz. Bu işlem 10 dakika için geçerlidir.
            </components_1.Text>
            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={resetLink}>
                Parolayı Sıfırla
              </components_1.Button>
            </components_1.Section>
            <components_1.Text style={paragraph}>
              Eğer bu talebi siz yapmadıysanız, bu e-postayı güvenle görmezden gelebilirsiniz. Hesabınız güvendedir.
            </components_1.Text>
          </components_1.Section>
          
          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.PasswordResetEmail = PasswordResetEmail;
exports.default = exports.PasswordResetEmail;
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    backgroundColor: '#ffffff',
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: '64px',
    border: '1px solid #f0f0f0',
    borderRadius: '4px',
    maxWidth: '580px',
};
const logoContainer = {
    padding: '20px 0',
    textAlign: 'center',
};
const content = {
    padding: '0 32px',
};
const title = {
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
const hr = {
    borderColor: "#f0f0f0",
    margin: "20px 0",
};
//# sourceMappingURL=password-reset.js.map