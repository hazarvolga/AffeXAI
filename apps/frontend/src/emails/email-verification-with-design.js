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
exports.EmailVerificationWithDesign = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const EmailTemplateWithDesignSystem_1 = require("./components/EmailTemplateWithDesignSystem");
const email_template_helper_1 = require("./helpers/email-template-helper");
const EmailVerificationWithDesign = async ({ verificationUrl, userEmail, userName, verificationCode, locale = 'tr', }) => {
    // Get template data with design system
    const templateData = await (0, email_template_helper_1.getEmailTemplateData)({
        preview: locale === 'tr'
            ? "E-posta adresinizi doğrulayın"
            : "Verify your email address",
        subject: locale === 'tr'
            ? "E-posta Doğrulama"
            : "Email Verification",
        theme: 'light',
        context: 'public',
        showUnsubscribeLink: false, // Transactional email
        locale,
    });
    const { designSystem } = templateData;
    const styles = (0, email_template_helper_1.getEmailStyles)(designSystem);
    // Translations
    const t = {
        greeting: (0, email_template_helper_1.getGreeting)(locale),
        title: locale === 'tr' ? "E-posta Adresinizi Doğrulayın" : "Verify Your Email Address",
        hello: locale === 'tr' ? "Merhaba" : "Hello",
        intro: locale === 'tr'
            ? "Hesabınızı aktifleştirmek için e-posta adresinizi doğrulamanız gerekmektedir."
            : "Please verify your email address to activate your account.",
        button: locale === 'tr' ? "E-postamı Doğrula" : "Verify Email",
        codeTitle: locale === 'tr' ? "Doğrulama Kodu" : "Verification Code",
        codeIntro: locale === 'tr'
            ? "Alternatif olarak, aşağıdaki doğrulama kodunu kullanabilirsiniz:"
            : "Alternatively, you can use the verification code below:",
        linkText: locale === 'tr'
            ? "Butona tıklayamıyorsanız, aşağıdaki bağlantıyı tarayıcınıza kopyalayın:"
            : "If you can't click the button, copy this link to your browser:",
        expiry: locale === 'tr'
            ? "Bu doğrulama bağlantısı 48 saat içinde geçerliliğini yitirecektir."
            : "This verification link will expire in 48 hours.",
        benefits: locale === 'tr' ? "Hesabınızı doğruladıktan sonra:" : "After verifying your account:",
        benefit1: locale === 'tr'
            ? "Tüm özelliklere erişebileceksiniz"
            : "Access all features",
        benefit2: locale === 'tr'
            ? "Güvenlik bildirimleri alabileceksiniz"
            : "Receive security notifications",
        benefit3: locale === 'tr'
            ? "Kişiselleştirilmiş deneyim yaşayacaksınız"
            : "Enjoy a personalized experience",
        notYou: locale === 'tr'
            ? "Bu hesabı siz oluşturmadıysanız, bu e-postayı görmezden gelebilirsiniz."
            : "If you didn't create this account, you can safely ignore this email.",
        security: locale === 'tr' ? "Güvenlik Notu" : "Security Note",
        securityText: locale === 'tr'
            ? "Bu doğrulama işlemi hesabınızın güvenliği için zorunludur. Doğrulama linki veya kodu kimseyle paylaşmayın."
            : "This verification is required for your account security. Never share your verification link or code.",
    };
    return (<EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign {...templateData}>
      {/* Greeting */}
      <components_1.Heading as="h1" style={styles.h1}>
        {t.greeting} {userName || userEmail}!
      </components_1.Heading>

      {/* Title */}
      <components_1.Heading as="h2" style={{ ...styles.h2, ...styles.textCenter }}>
        ✉️ {t.title}
      </components_1.Heading>

      {/* Introduction */}
      <components_1.Text style={styles.p}>
        {t.intro}
      </components_1.Text>

      {/* Benefits */}
      <EmailTemplateWithDesignSystem_1.EmailCard designSystem={designSystem}>
        <components_1.Text style={{ ...styles.p, fontWeight: styles.strong.fontWeight, marginBottom: '12px' }}>
          {t.benefits}
        </components_1.Text>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>✅ {t.benefit1}</li>
          <li style={{ marginBottom: '8px' }}>🔔 {t.benefit2}</li>
          <li style={{ marginBottom: '8px' }}>⭐ {t.benefit3}</li>
        </ul>
      </EmailTemplateWithDesignSystem_1.EmailCard>

      {/* Verify Button */}
      <components_1.Section style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
        <components_1.Button href={verificationUrl} style={{
            ...styles.button.primary,
            padding: '14px 32px',
            fontSize: '16px',
        }}>
          {t.button}
        </components_1.Button>
      </components_1.Section>

      {/* Verification Code (if provided) */}
      {verificationCode && (<EmailTemplateWithDesignSystem_1.EmailAlert variant="info" designSystem={designSystem}>
          <components_1.Text style={{ margin: 0, fontWeight: 'bold', marginBottom: '8px' }}>
            {t.codeTitle}
          </components_1.Text>
          <components_1.Text style={{ margin: 0, fontSize: '12px', marginBottom: '8px' }}>
            {t.codeIntro}
          </components_1.Text>
          <components_1.Text style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textAlign: 'center',
            }}>
            {verificationCode}
          </components_1.Text>
        </EmailTemplateWithDesignSystem_1.EmailAlert>)}

      {/* Alternative Link */}
      <components_1.Section style={{ marginTop: '24px' }}>
        <components_1.Text style={{ ...styles.small, marginBottom: '8px', color: styles.textMuted.color }}>
          {t.linkText}
        </components_1.Text>
        <components_1.Text style={{
            ...styles.code,
            wordBreak: 'break-all',
            display: 'block',
            padding: '8px',
        }}>
          {verificationUrl}
        </components_1.Text>
      </components_1.Section>

      {/* Expiry Notice */}
      <EmailTemplateWithDesignSystem_1.EmailAlert variant="warning" designSystem={designSystem}>
        <components_1.Text style={{ margin: 0, color: 'inherit' }}>
          ⏰ {t.expiry}
        </components_1.Text>
      </EmailTemplateWithDesignSystem_1.EmailAlert>

      <components_1.Hr style={styles.hr}/>

      {/* Security Notice */}
      <components_1.Section>
        <components_1.Heading as="h3" style={styles.h3}>
          🔒 {t.security}
        </components_1.Heading>
        <components_1.Text style={{ ...styles.p, ...styles.textMuted }}>
          {t.securityText}
        </components_1.Text>
      </components_1.Section>

      {/* Ignore Notice */}
      <components_1.Section style={{ marginTop: '24px' }}>
        <components_1.Text style={{ ...styles.small, ...styles.textCenter, ...styles.textMuted }}>
          {t.notYou}
        </components_1.Text>
      </components_1.Section>
    </EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign>);
};
exports.EmailVerificationWithDesign = EmailVerificationWithDesign;
// Default export for testing
exports.default = exports.EmailVerificationWithDesign;
//# sourceMappingURL=email-verification-with-design.js.map