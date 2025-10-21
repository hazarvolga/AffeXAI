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
exports.WelcomeEmailWithDesign = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const EmailTemplateWithDesignSystem_1 = require("./components/EmailTemplateWithDesignSystem");
const email_template_helper_1 = require("./helpers/email-template-helper");
const WelcomeEmailWithDesign = async ({ userName, userEmail, dashboardUrl = '/dashboard', unsubscribeToken, locale = 'tr', }) => {
    // Get template data with design system
    const templateData = await (0, email_template_helper_1.getEmailTemplateData)({
        preview: locale === 'tr'
            ? "Aramıza hoş geldiniz!"
            : "Welcome aboard!",
        subject: locale === 'tr'
            ? `Hoş Geldiniz ${userName}!`
            : `Welcome ${userName}!`,
        theme: 'light',
        context: 'public',
        showUnsubscribeLink: true, // Marketing email
        unsubscribeToken,
        locale,
    });
    const { designSystem, socialMediaLinks } = templateData;
    const styles = (0, email_template_helper_1.getEmailStyles)(designSystem);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
    // Translations
    const t = {
        greeting: (0, email_template_helper_1.getGreeting)(locale),
        title: locale === 'tr' ? "Aramıza Hoş Geldiniz!" : "Welcome to Our Community!",
        intro: locale === 'tr'
            ? "Ailemize katıldığınız için çok mutluyuz! Sizin için hazırladığımız harika özellikleri keşfetmeye hazır mısınız?"
            : "We're thrilled to have you join our family! Ready to explore the amazing features we've prepared for you?",
        getStarted: locale === 'tr' ? "Başlangıç Rehberi" : "Getting Started",
        step1Title: locale === 'tr' ? "Profilinizi Tamamlayın" : "Complete Your Profile",
        step1Desc: locale === 'tr'
            ? "Kişiselleştirilmiş deneyim için profilinizi güncelleyin"
            : "Update your profile for a personalized experience",
        step2Title: locale === 'tr' ? "İlk Projenizi Oluşturun" : "Create Your First Project",
        step2Desc: locale === 'tr'
            ? "Hemen ilk projenizi oluşturup çalışmaya başlayın"
            : "Start working by creating your first project",
        step3Title: locale === 'tr' ? "Ekibinizi Davet Edin" : "Invite Your Team",
        step3Desc: locale === 'tr'
            ? "Ekip arkadaşlarınızı davet ederek birlikte çalışın"
            : "Collaborate by inviting your team members",
        features: locale === 'tr' ? "Öne Çıkan Özellikler" : "Key Features",
        feature1: locale === 'tr' ? "🚀 Hızlı ve güvenli altyapı" : "🚀 Fast and secure infrastructure",
        feature2: locale === 'tr' ? "📊 Detaylı analiz ve raporlama" : "📊 Detailed analytics and reporting",
        feature3: locale === 'tr' ? "🔧 Kolay entegrasyon" : "🔧 Easy integration",
        feature4: locale === 'tr' ? "💬 7/24 destek" : "💬 24/7 support",
        ctaButton: locale === 'tr' ? "Dashboard'a Git" : "Go to Dashboard",
        needHelp: locale === 'tr' ? "Yardıma mı İhtiyacınız Var?" : "Need Help?",
        helpText: locale === 'tr'
            ? "Sorularınız veya önerileriniz için bizimle iletişime geçebilirsiniz:"
            : "Feel free to contact us with any questions or suggestions:",
        documentation: locale === 'tr' ? "Dokümantasyon" : "Documentation",
        support: locale === 'tr' ? "Destek Merkezi" : "Support Center",
        community: locale === 'tr' ? "Topluluk" : "Community",
        followUs: locale === 'tr' ? "Bizi Takip Edin" : "Follow Us",
        thankYou: locale === 'tr'
            ? "Bizi tercih ettiğiniz için teşekkür ederiz!"
            : "Thank you for choosing us!",
    };
    return (<EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign {...templateData}>
      {/* Welcome Banner - Improved spacing and padding */}
      <components_1.Section style={{
            textAlign: 'center',
            marginBottom: designSystem.spacing.xl,
            padding: `${designSystem.spacing.md} ${designSystem.spacing.sm}`,
        }}>
        <components_1.Text style={{ fontSize: '48px', margin: 0, lineHeight: '1' }}>🎉</components_1.Text>
        <components_1.Heading as="h1" style={{
            ...styles.h1,
            fontSize: '32px',
            marginTop: designSystem.spacing.md,
            marginBottom: 0,
            color: designSystem.colors.foreground, // Dark mode safe
        }}>
          {t.title}
        </components_1.Heading>
      </components_1.Section>

      {/* Greeting - Added padding for edge spacing */}
      <components_1.Section style={{ padding: `0 ${designSystem.spacing.md}` }}>
        <components_1.Text style={{
            ...styles.p,
            color: designSystem.colors.foreground, // Dark mode safe
            marginBottom: designSystem.spacing.sm,
        }}>
          {t.greeting} {userName},
        </components_1.Text>

        {/* Introduction - Improved readability */}
        <components_1.Text style={{
            ...styles.p,
            fontSize: designSystem.typography.fontSize.base,
            lineHeight: designSystem.typography.lineHeight.relaxed,
            color: designSystem.colors.foreground, // Dark mode safe
            marginBottom: designSystem.spacing.lg,
        }}>
          {t.intro}
        </components_1.Text>
      </components_1.Section>

      {/* Getting Started Steps - Improved spacing and contrast */}
      <components_1.Section style={{
            marginTop: designSystem.spacing.lg,
            marginBottom: designSystem.spacing.lg,
            padding: `0 ${designSystem.spacing.md}`,
        }}>
        <components_1.Heading as="h2" style={{
            ...styles.h2,
            color: designSystem.colors.foreground,
            marginBottom: designSystem.spacing.md,
        }}>
          📝 {t.getStarted}
        </components_1.Heading>

        <EmailTemplateWithDesignSystem_1.EmailCard designSystem={designSystem}>
          <div style={{ marginBottom: designSystem.spacing.md }}>
            <components_1.Text style={{
            ...styles.p,
            fontWeight: designSystem.typography.fontWeight.semibold,
            marginBottom: designSystem.spacing.xs,
            color: designSystem.colors.foreground,
        }}>
              1. {t.step1Title}
            </components_1.Text>
            <components_1.Text style={{
            ...styles.small,
            color: designSystem.colors.mutedForeground,
            margin: 0,
            lineHeight: designSystem.typography.lineHeight.normal,
        }}>
              {t.step1Desc}
            </components_1.Text>
          </div>

          <div style={{ marginBottom: designSystem.spacing.md }}>
            <components_1.Text style={{
            ...styles.p,
            fontWeight: designSystem.typography.fontWeight.semibold,
            marginBottom: designSystem.spacing.xs,
            color: designSystem.colors.foreground,
        }}>
              2. {t.step2Title}
            </components_1.Text>
            <components_1.Text style={{
            ...styles.small,
            color: designSystem.colors.mutedForeground,
            margin: 0,
            lineHeight: designSystem.typography.lineHeight.normal,
        }}>
              {t.step2Desc}
            </components_1.Text>
          </div>

          <div>
            <components_1.Text style={{
            ...styles.p,
            fontWeight: designSystem.typography.fontWeight.semibold,
            marginBottom: designSystem.spacing.xs,
            color: designSystem.colors.foreground,
        }}>
              3. {t.step3Title}
            </components_1.Text>
            <components_1.Text style={{
            ...styles.small,
            color: designSystem.colors.mutedForeground,
            margin: 0,
            lineHeight: designSystem.typography.lineHeight.normal,
        }}>
              {t.step3Desc}
            </components_1.Text>
          </div>
        </EmailTemplateWithDesignSystem_1.EmailCard>
      </components_1.Section>

      {/* Key Features - Better padding and list styling */}
      <components_1.Section style={{
            marginBottom: designSystem.spacing.xl,
            padding: `0 ${designSystem.spacing.md}`,
        }}>
        <components_1.Heading as="h2" style={{
            ...styles.h2,
            color: designSystem.colors.foreground,
            marginBottom: designSystem.spacing.md,
        }}>
          ⭐ {t.features}
        </components_1.Heading>

        <EmailTemplateWithDesignSystem_1.EmailAlert variant="info" designSystem={designSystem}>
          <ul style={{
            margin: 0,
            paddingLeft: designSystem.spacing.md,
            color: 'inherit',
            lineHeight: designSystem.typography.lineHeight.relaxed,
        }}>
            <li style={{ marginBottom: designSystem.spacing.xs }}>{t.feature1}</li>
            <li style={{ marginBottom: designSystem.spacing.xs }}>{t.feature2}</li>
            <li style={{ marginBottom: designSystem.spacing.xs }}>{t.feature3}</li>
            <li>{t.feature4}</li>
          </ul>
        </EmailTemplateWithDesignSystem_1.EmailAlert>
      </components_1.Section>

      {/* CTA Button - Responsive padding */}
      <components_1.Section style={{
            textAlign: 'center',
            marginTop: designSystem.spacing['2xl'],
            marginBottom: designSystem.spacing['2xl'],
            padding: `0 ${designSystem.spacing.md}`,
        }}>
        <components_1.Button href={`${baseUrl}${dashboardUrl}`} style={{
            ...styles.button.primary,
            padding: `${designSystem.spacing.md} ${designSystem.spacing['2xl']}`,
            fontSize: designSystem.typography.fontSize.lg,
            fontWeight: designSystem.typography.fontWeight.bold,
            width: '100%',
            maxWidth: '300px',
            boxSizing: 'border-box',
        }}>
          {t.ctaButton} →
        </components_1.Button>
      </components_1.Section>

      <components_1.Hr style={{
            ...styles.hr,
            borderColor: designSystem.colors.border,
            margin: `${designSystem.spacing.xl} ${designSystem.spacing.md}`,
        }}/>

      {/* Help Resources - Improved spacing and readability */}
      <components_1.Section style={{
            marginTop: designSystem.spacing.lg,
            padding: `0 ${designSystem.spacing.md}`,
        }}>
        <components_1.Heading as="h3" style={{
            ...styles.h3,
            textAlign: 'center',
            color: designSystem.colors.foreground,
            marginBottom: designSystem.spacing.sm,
        }}>
          {t.needHelp}
        </components_1.Heading>
        <components_1.Text style={{
            ...styles.p,
            textAlign: 'center',
            color: designSystem.colors.foreground,
            marginBottom: designSystem.spacing.md,
        }}>
          {t.helpText}
        </components_1.Text>

        <components_1.Section style={{
            textAlign: 'center',
            marginTop: designSystem.spacing.md,
        }}>
          <components_1.Link href={`${baseUrl}/docs`} style={{
            ...styles.link,
            marginRight: designSystem.spacing.md,
            fontSize: designSystem.typography.fontSize.sm,
            display: 'inline-block',
            marginBottom: designSystem.spacing.xs,
        }}>
            📚 {t.documentation}
          </components_1.Link>
          <components_1.Link href={`${baseUrl}/support`} style={{
            ...styles.link,
            marginRight: designSystem.spacing.md,
            fontSize: designSystem.typography.fontSize.sm,
            display: 'inline-block',
            marginBottom: designSystem.spacing.xs,
        }}>
            💬 {t.support}
          </components_1.Link>
          <components_1.Link href={`${baseUrl}/community`} style={{
            ...styles.link,
            fontSize: designSystem.typography.fontSize.sm,
            display: 'inline-block',
            marginBottom: designSystem.spacing.xs,
        }}>
            👥 {t.community}
          </components_1.Link>
        </components_1.Section>
      </components_1.Section>

      {/* Social Media Section - NEW */}
      <components_1.Section style={{
            marginTop: designSystem.spacing.xl,
            marginBottom: designSystem.spacing.lg,
            textAlign: 'center',
            padding: `0 ${designSystem.spacing.md}`,
        }}>
        <components_1.Heading as="h3" style={{
            ...styles.h3,
            textAlign: 'center',
            color: designSystem.colors.foreground,
            marginBottom: designSystem.spacing.md,
            fontSize: designSystem.typography.fontSize.base,
        }}>
          {t.followUs}
        </components_1.Heading>
        
        {/* Social Media Icons */}
        <components_1.Row style={{ textAlign: 'center' }}>
          {socialMediaLinks.linkedin && (<components_1.Column style={{
                display: 'inline-block',
                padding: `0 ${designSystem.spacing.sm}`,
            }}>
              <components_1.Link href={socialMediaLinks.linkedin}>
                <components_1.Img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="32" height="32" alt="LinkedIn" style={{
                display: 'block',
                margin: '0 auto',
            }}/>
              </components_1.Link>
            </components_1.Column>)}
          {socialMediaLinks.instagram && (<components_1.Column style={{
                display: 'inline-block',
                padding: `0 ${designSystem.spacing.sm}`,
            }}>
              <components_1.Link href={socialMediaLinks.instagram}>
                <components_1.Img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="32" height="32" alt="Instagram" style={{
                display: 'block',
                margin: '0 auto',
            }}/>
              </components_1.Link>
            </components_1.Column>)}
          {socialMediaLinks.twitter && (<components_1.Column style={{
                display: 'inline-block',
                padding: `0 ${designSystem.spacing.sm}`,
            }}>
              <components_1.Link href={socialMediaLinks.twitter}>
                <components_1.Img src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" width="32" height="32" alt="X (Twitter)" style={{
                display: 'block',
                margin: '0 auto',
            }}/>
              </components_1.Link>
            </components_1.Column>)}
        </components_1.Row>
      </components_1.Section>

      {/* Thank You - Improved contrast for dark mode */}
      <components_1.Section style={{
            marginTop: designSystem.spacing.xl,
            marginBottom: designSystem.spacing.md,
            textAlign: 'center',
            padding: `0 ${designSystem.spacing.md}`,
        }}>
        <components_1.Text style={{
            ...styles.p,
            fontSize: designSystem.typography.fontSize.lg,
            fontWeight: designSystem.typography.fontWeight.bold,
            color: designSystem.colors.primary,
            marginBottom: designSystem.spacing.xs,
        }}>
          {t.thankYou}
        </components_1.Text>
        <components_1.Text style={{
            fontSize: designSystem.typography.fontSize.sm,
            color: designSystem.colors.mutedForeground,
            margin: 0,
        }}>
          {templateData.companyName} Team
        </components_1.Text>
      </components_1.Section>
    </EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign>);
};
exports.WelcomeEmailWithDesign = WelcomeEmailWithDesign;
// Default export for testing
exports.default = exports.WelcomeEmailWithDesign;
//# sourceMappingURL=welcome-with-design.js.map