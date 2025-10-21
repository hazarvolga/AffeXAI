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
exports.PasswordResetEmailWithDesign = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const EmailTemplateWithDesignSystem_1 = require("./components/EmailTemplateWithDesignSystem");
const email_template_helper_1 = require("./helpers/email-template-helper");
const PasswordResetEmailWithDesign = async ({ resetUrl, userEmail, userName, locale = 'tr', }) => {
    // Get template data with design system
    const templateData = await (0, email_template_helper_1.getEmailTemplateData)({
        preview: locale === 'tr'
            ? "Şifrenizi sıfırlayın"
            : "Reset your password",
        subject: locale === 'tr'
            ? "Şifre Sıfırlama Talebi"
            : "Password Reset Request",
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
        title: locale === 'tr' ? "Şifre Sıfırlama Talebi" : "Password Reset Request",
        hello: locale === 'tr' ? "Merhaba" : "Hello",
        intro: locale === 'tr'
            ? "Hesabınız için şifre sıfırlama talebinde bulunuldu. Aşağıdaki butona tıklayarak yeni şifrenizi oluşturabilirsiniz."
            : "A password reset was requested for your account. Click the button below to create your new password.",
        button: locale === 'tr' ? "Şifremi Sıfırla" : "Reset Password",
        linkText: locale === 'tr'
            ? "Butona tıklayamıyorsanız, aşağıdaki bağlantıyı tarayıcınıza kopyalayın:"
            : "If you can't click the button, copy this link to your browser:",
        warning: locale === 'tr'
            ? "Bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz. Şifreniz değiştirilmeyecektir."
            : "If you didn't request this, you can safely ignore this email. Your password won't be changed.",
        expiry: locale === 'tr'
            ? "Bu bağlantı 24 saat içinde geçerliliğini yitirecektir."
            : "This link will expire in 24 hours.",
        security: locale === 'tr' ? "Güvenlik İpucu" : "Security Tip",
        securityText: locale === 'tr'
            ? "Güvenliğiniz için, şifrenizi düzenli olarak değiştirin ve başkalarıyla paylaşmayın."
            : "For your security, change your password regularly and never share it with others.",
        questions: locale === 'tr'
            ? "Sorularınız mı var?"
            : "Have questions?",
        contact: locale === 'tr'
            ? "Yardıma ihtiyacınız varsa, destek ekibimizle iletişime geçebilirsiniz."
            : "If you need help, contact our support team.",
    };
    return (<EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign {...templateData}>
      {/* Greeting */}
      <components_1.Heading as="h1" style={styles.h1}>
        {t.greeting} {userName || userEmail || ''}
      </components_1.Heading>

      {/* Title */}
      <components_1.Heading as="h2" style={{ ...styles.h2, ...styles.textCenter }}>
        {t.title}
      </components_1.Heading>

      {/* Introduction */}
      <components_1.Text style={styles.p}>
        {t.intro}
      </components_1.Text>

      {/* Expiry Notice */}
      <EmailTemplateWithDesignSystem_1.EmailAlert variant="warning" designSystem={designSystem}>
        <components_1.Text style={{ margin: 0, color: 'inherit' }}>
          <strong>{locale === 'tr' ? "Önemli:" : "Important:"}</strong> {t.expiry}
        </components_1.Text>
      </EmailTemplateWithDesignSystem_1.EmailAlert>

      {/* Reset Button */}
      <components_1.Section style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
        <components_1.Button href={resetUrl} style={{
            ...styles.button.primary,
            padding: '14px 32px',
            fontSize: '16px',
        }}>
          {t.button}
        </components_1.Button>
      </components_1.Section>

      {/* Alternative Link */}
      <EmailTemplateWithDesignSystem_1.EmailCard designSystem={designSystem}>
        <components_1.Text style={{ ...styles.small, marginBottom: '8px' }}>
          {t.linkText}
        </components_1.Text>
        <components_1.Text style={{
            ...styles.code,
            wordBreak: 'break-all',
            display: 'block',
            padding: '8px',
        }}>
          {resetUrl}
        </components_1.Text>
      </EmailTemplateWithDesignSystem_1.EmailCard>

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
      <EmailTemplateWithDesignSystem_1.EmailAlert variant="info" designSystem={designSystem}>
        <components_1.Text style={{ margin: 0, color: 'inherit' }}>
          {t.warning}
        </components_1.Text>
      </EmailTemplateWithDesignSystem_1.EmailAlert>

      {/* Support */}
      <components_1.Section style={{ marginTop: '32px' }}>
        <components_1.Text style={{ ...styles.small, ...styles.textCenter, ...styles.textMuted }}>
          {t.questions} {t.contact}
        </components_1.Text>
      </components_1.Section>
    </EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign>);
};
exports.PasswordResetEmailWithDesign = PasswordResetEmailWithDesign;
// Default export for testing
exports.default = exports.PasswordResetEmailWithDesign;
//# sourceMappingURL=password-reset-with-design.js.map