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
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailTemplate_1 = require("./components/EmailTemplate");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const PasswordResetEmail = ({ userName = 'Değerli Kullanıcı', resetLink = `${baseUrl}/portal/login`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || (0, siteSettings_1.getLogoUrl)();
    const contactInfo = siteSettings?.contact || (0, siteSettings_1.getContactInfo)();
    const socialMediaLinks = siteSettings?.socialMedia || (0, siteSettings_1.getSocialMediaLinks)();
    const previewText = `Şifrenizi sıfırlayın - ${companyName}`;
    return (<EmailTemplate_1.EmailTemplate preview={previewText} companyName={companyName} logoUrl={logoUrl} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} showUnsubscribeLink={false} showTagline={false}>
      <components_1.Section style={EmailTemplate_1.content}>
        <components_1.Text style={EmailTemplate_1.title}>
          Şifre Sıfırlama Talebi
        </components_1.Text>
        <components_1.Text style={EmailTemplate_1.paragraph}>
          Merhaba {userName},
        </components_1.Text>
        <components_1.Text style={EmailTemplate_1.paragraph}>
          Hesabınız için bir şifre sıfırlama talebinde bulunuldu. Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
        </components_1.Text>
        <components_1.Text style={EmailTemplate_1.paragraph}>
          Şifrenizi sıfırlamak için aşağıdaki butona tıklayın. Bu link 1 saat içinde geçerliliğini yitirecektir.
        </components_1.Text>
        <components_1.Section style={EmailTemplate_1.buttonContainer}>
          <components_1.Button style={EmailTemplate_1.button} href={resetLink}>
            Şifremi Sıfırla
          </components_1.Button>
        </components_1.Section>
        <components_1.Text style={EmailTemplate_1.paragraph}>
          Veya aşağıdaki linki tarayıcınıza kopyalayın:
          <br />
          <span style={{ fontSize: "12px", color: "#6a7380" }}>
            {resetLink}
          </span>
        </components_1.Text>
        <components_1.Text style={EmailTemplate_1.paragraph}>
          Güvenliğiniz için şifrenizi düzenli olarak değiştirmenizi ve güçlü bir şifre kullanmanızı öneririz.
        </components_1.Text>
        <components_1.Text style={EmailTemplate_1.paragraph}>
          İyi günler dileriz,
          <br />
          {companyName} Güvenlik Ekibi
        </components_1.Text>
      </components_1.Section>
    </EmailTemplate_1.EmailTemplate>);
};
exports.PasswordResetEmail = PasswordResetEmail;
exports.default = exports.PasswordResetEmail;
//# sourceMappingURL=password-reset.js.map