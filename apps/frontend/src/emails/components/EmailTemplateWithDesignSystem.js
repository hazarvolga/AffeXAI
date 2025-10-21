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
exports.EmailCard = exports.EmailAlert = exports.EmailButton = exports.EmailTemplateWithDesign = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const EmailTemplateWithDesign = ({ preview, children, companyName, logoUrl, contactInfo, socialMediaLinks = {}, showUnsubscribeLink = true, unsubscribeToken, showTagline = false, tagline, locale = 'tr', designSystem, theme = 'light', }) => {
    const { colors, typography, spacing, radius } = designSystem;
    // Translations
    const t = {
        unsubscribe: locale === 'tr' ? 'Abonelikten çık' : 'Unsubscribe',
        preferences: locale === 'tr' ? 'E-posta Tercihlerim' : 'Email Preferences',
        viewInBrowser: locale === 'tr' ? 'Bu e-postayı tarayıcıda görüntüle' : 'View this email in browser',
        emailLabel: locale === 'tr' ? 'Email: ' : 'Email: ',
        phoneLabel: locale === 'tr' ? 'Telefon: ' : 'Phone: ',
    };
    // Dynamic styles based on design tokens
    const styles = {
        body: {
            backgroundColor: colors.background,
            fontFamily: typography.fontFamily,
        },
        container: {
            backgroundColor: colors.cardBackground,
            margin: '0 auto',
            padding: '20px 0 48px',
        },
        header: {
            textAlign: 'center',
            padding: `${spacing.lg} ${spacing.md}`,
        },
        logo: {
            margin: '0 auto',
            marginBottom: spacing.md,
        },
        tagline: {
            fontSize: typography.fontSize.sm,
            color: colors.mutedForeground,
            fontWeight: typography.fontWeight.normal,
            lineHeight: typography.lineHeight.normal,
            margin: `${spacing.sm} 0`,
        },
        main: {
            backgroundColor: colors.cardBackground,
            borderRadius: radius.md,
            padding: spacing.lg,
        },
        h1: {
            color: colors.foreground,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            margin: `0 0 ${spacing.md}`,
            textAlign: 'center',
        },
        h2: {
            color: colors.foreground,
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            margin: `${spacing.md} 0 ${spacing.sm}`,
        },
        h3: {
            color: colors.foreground,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.medium,
            margin: `${spacing.sm} 0`,
        },
        paragraph: {
            color: colors.foreground,
            fontSize: typography.fontSize.base,
            lineHeight: typography.lineHeight.normal,
            margin: `0 0 ${spacing.sm}`,
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: radius.default,
            color: colors.primaryForeground,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
            textDecoration: 'none',
            textAlign: 'center',
            display: 'block',
            padding: `12px 24px`,
            margin: `${spacing.md} 0`,
        },
        buttonSecondary: {
            backgroundColor: colors.secondary,
            borderRadius: radius.default,
            color: colors.secondaryForeground,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
            textDecoration: 'none',
            textAlign: 'center',
            display: 'block',
            padding: `12px 24px`,
            margin: `${spacing.md} 0`,
        },
        link: {
            color: colors.primary,
            textDecoration: 'underline',
        },
        hr: {
            borderColor: colors.border,
            margin: `${spacing.lg} 0`,
        },
        footer: {
            color: colors.mutedForeground,
            fontSize: typography.fontSize.xs,
            lineHeight: typography.lineHeight.normal,
            textAlign: 'center',
            marginTop: spacing.lg,
        },
        footerLink: {
            color: colors.mutedForeground,
            textDecoration: 'underline',
        },
        socialContainer: {
            textAlign: 'center',
            marginTop: spacing.md,
            marginBottom: spacing.md,
        },
        socialIcon: {
            display: 'inline-block',
            margin: `0 ${spacing.xs}`,
        },
        viewInBrowser: {
            textAlign: 'center',
            fontSize: typography.fontSize.xs,
            color: colors.mutedForeground,
            marginBottom: spacing.md,
        },
        card: {
            backgroundColor: colors.cardBackground,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: spacing.md,
            marginBottom: spacing.md,
        },
        alert: {
            padding: spacing.sm,
            borderRadius: radius.default,
            marginBottom: spacing.md,
        },
        alertSuccess: {
            backgroundColor: colors.success,
            color: colors.successForeground,
        },
        alertWarning: {
            backgroundColor: colors.warning,
            color: colors.warningForeground,
        },
        alertError: {
            backgroundColor: colors.error,
            color: colors.errorForeground,
        },
        alertInfo: {
            backgroundColor: colors.info,
            color: colors.infoForeground,
        },
    };
    return (<components_1.Html>
      <components_1.Head>
        <style>{`
          /* Email Design System Styles */
          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }

          table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }

          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }

          /* Mobile styles */
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
              padding: 10px !important;
            }
            .main {
              padding: 20px !important;
            }
            h1 {
              font-size: 24px !important;
            }
            h2 {
              font-size: 20px !important;
            }
            .button {
              width: 100% !important;
            }
          }

          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            ${theme === 'dark' ? `
              body {
                background-color: ${colors.background} !important;
                color: ${colors.foreground} !important;
              }
              .container {
                background-color: ${colors.cardBackground} !important;
              }
              .card {
                background-color: ${colors.cardBackground} !important;
                border-color: ${colors.border} !important;
              }
            ` : ''}
          }
        `}</style>
      </components_1.Head>
      <components_1.Preview>{preview}</components_1.Preview>
      <components_1.Body style={styles.body}>
        <components_1.Container className="container" style={styles.container}>
          {/* View in browser link */}
          <components_1.Section style={styles.viewInBrowser}>
            <components_1.Link href={`${baseUrl}/email/view`} style={styles.footerLink}>
              {t.viewInBrowser}
            </components_1.Link>
          </components_1.Section>

          {/* Header with logo */}
          <components_1.Section style={styles.header}>
            <components_1.Img src={logoUrl} width="150" height="50" alt={companyName} style={styles.logo}/>
            {showTagline && tagline && (<components_1.Text style={styles.tagline}>{tagline}</components_1.Text>)}
          </components_1.Section>

          {/* Main content area */}
          <components_1.Section className="main" style={styles.main}>
            {children}
          </components_1.Section>

          {/* Footer */}
          <components_1.Section style={styles.footer}>
            {/* Social Media Icons */}
            {Object.keys(socialMediaLinks).length > 0 && (<components_1.Section style={styles.socialContainer}>
                <components_1.Row>
                  {Object.entries(socialMediaLinks)
                .filter(([_, url]) => url)
                .map(([platform, url]) => (<components_1.Column key={platform} align="center" style={styles.socialIcon}>
                        <components_1.Link href={url}>
                          <components_1.Img src={`https://static.cdn.person.io/images/social/${platform.toLowerCase()}-logo-2x.png`} width="24" height="24" alt={platform}/>
                        </components_1.Link>
                      </components_1.Column>))}
                </components_1.Row>
              </components_1.Section>)}

            <components_1.Hr style={styles.hr}/>

            {/* Contact Information */}
            <components_1.Text style={styles.footer}>
              {companyName} • {contactInfo.address}
            </components_1.Text>
            <components_1.Text style={styles.footer}>
              {t.emailLabel}
              <components_1.Link href={`mailto:${contactInfo.email}`} style={styles.footerLink}>
                {contactInfo.email}
              </components_1.Link>
              {' • '}
              {t.phoneLabel}
              {contactInfo.phone}
            </components_1.Text>

            {/* Unsubscribe and Preferences Links */}
            {showUnsubscribeLink && (<components_1.Text style={styles.footer}>
                <components_1.Link href={unsubscribeToken
                ? `${baseUrl}/unsubscribe?token=${unsubscribeToken}`
                : `${baseUrl}/preferences`} style={styles.footerLink}>
                  {t.unsubscribe}
                </components_1.Link>
                {' • '}
                <components_1.Link href={`${baseUrl}/preferences`} style={styles.footerLink}>
                  {t.preferences}
                </components_1.Link>
              </components_1.Text>)}
          </components_1.Section>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.EmailTemplateWithDesign = EmailTemplateWithDesign;
/**
 * Utility components for common email patterns
 */
// Primary Button Component
const EmailButton = ({ href, children, variant = 'primary', designSystem, }) => {
    const { colors, typography, radius } = designSystem;
    const style = variant === 'primary'
        ? {
            backgroundColor: colors.primary,
            color: colors.primaryForeground,
        }
        : {
            backgroundColor: colors.secondary,
            color: colors.secondaryForeground,
        };
    return (<components_1.Button href={href} style={{
            ...style,
            borderRadius: radius.default,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
            textDecoration: 'none',
            textAlign: 'center',
            display: 'inline-block',
            padding: '12px 24px',
        }}>
      {children}
    </components_1.Button>);
};
exports.EmailButton = EmailButton;
// Alert Component
const EmailAlert = ({ children, variant = 'info', designSystem, }) => {
    const { colors, spacing, radius } = designSystem;
    const variantStyles = {
        success: {
            backgroundColor: colors.success,
            color: colors.successForeground,
        },
        warning: {
            backgroundColor: colors.warning,
            color: colors.warningForeground,
        },
        error: {
            backgroundColor: colors.error,
            color: colors.errorForeground,
        },
        info: {
            backgroundColor: colors.info,
            color: colors.infoForeground,
        },
    };
    return (<components_1.Section style={{
            ...variantStyles[variant],
            padding: spacing.sm,
            borderRadius: radius.default,
            marginBottom: spacing.md,
        }}>
      {children}
    </components_1.Section>);
};
exports.EmailAlert = EmailAlert;
// Card Component
const EmailCard = ({ children, designSystem, }) => {
    const { colors, spacing, radius } = designSystem;
    return (<components_1.Section style={{
            backgroundColor: colors.cardBackground,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: spacing.md,
            marginBottom: spacing.md,
        }}>
      {children}
    </components_1.Section>);
};
exports.EmailCard = EmailCard;
//# sourceMappingURL=EmailTemplateWithDesignSystem.js.map