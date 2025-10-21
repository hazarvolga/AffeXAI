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
exports.NewsletterWithDesign = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const EmailTemplateWithDesignSystem_1 = require("./components/EmailTemplateWithDesignSystem");
const email_template_helper_1 = require("./helpers/email-template-helper");
const NewsletterWithDesign = async ({ subscriberName, subscriberEmail, newsletterTitle, newsletterDate, introText, featuredArticle, articles, tips = [], unsubscribeToken, locale = 'tr', }) => {
    // Get template data with design system
    const templateData = await (0, email_template_helper_1.getEmailTemplateData)({
        preview: newsletterTitle,
        subject: `${newsletterTitle} - ${(0, email_template_helper_1.formatDate)(newsletterDate, locale)}`,
        theme: 'light',
        context: 'public',
        showUnsubscribeLink: true, // Marketing email
        unsubscribeToken,
        locale,
    });
    const { designSystem } = templateData;
    const styles = (0, email_template_helper_1.getEmailStyles)(designSystem);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
    // Translations
    const t = {
        hello: locale === 'tr' ? "Merhaba" : "Hello",
        featuredStory: locale === 'tr' ? "Öne Çıkan Haber" : "Featured Story",
        readMore: locale === 'tr' ? "Devamını Oku" : "Read More",
        moreStories: locale === 'tr' ? "Diğer Haberler" : "More Stories",
        quickTips: locale === 'tr' ? "Hızlı İpuçları" : "Quick Tips",
        category: locale === 'tr' ? "Kategori" : "Category",
        readTime: locale === 'tr' ? "Okuma Süresi" : "Read Time",
        minutes: locale === 'tr' ? "dakika" : "minutes",
        viewAll: locale === 'tr' ? "Tümünü Görüntüle" : "View All",
        followUs: locale === 'tr' ? "Bizi Takip Edin" : "Follow Us",
        forwardEmail: locale === 'tr' ? "Bu e-postayı bir arkadaşınıza iletin" : "Forward this email to a friend",
        shareNewsletter: locale === 'tr'
            ? "Bu bülteni beğendiyseniz, arkadaşlarınızla paylaşın!"
            : "If you enjoyed this newsletter, share it with your friends!",
        thankYou: locale === 'tr'
            ? "Bizi takip ettiğiniz için teşekkürler!"
            : "Thank you for following us!",
        updatePreferences: locale === 'tr' ? "Tercihlerimi Güncelle" : "Update Preferences",
        viewInBrowser: locale === 'tr' ? "Tarayıcıda Görüntüle" : "View in Browser",
    };
    return (<EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign {...templateData}>
      {/* Newsletter Header */}
      <components_1.Section style={{ textAlign: 'center', marginBottom: '32px' }}>
        <components_1.Text style={{ ...styles.small, ...styles.textMuted, margin: 0 }}>
          {(0, email_template_helper_1.formatDate)(newsletterDate, locale)}
        </components_1.Text>
        <components_1.Heading as="h1" style={{ ...styles.h1, fontSize: '32px', marginTop: '8px' }}>
          📰 {newsletterTitle}
        </components_1.Heading>
      </components_1.Section>

      {/* Greeting */}
      <components_1.Text style={styles.p}>
        {t.hello} {subscriberName || subscriberEmail.split('@')[0]},
      </components_1.Text>

      {/* Introduction */}
      <components_1.Text style={{ ...styles.p, fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
        {introText}
      </components_1.Text>

      {/* Featured Article */}
      <components_1.Section style={{ marginBottom: '40px' }}>
        <components_1.Heading as="h2" style={{ ...styles.h2, borderBottom: `3px solid ${designSystem.colors.primary}`, paddingBottom: '8px' }}>
          ⭐ {t.featuredStory}
        </components_1.Heading>

        <EmailTemplateWithDesignSystem_1.EmailCard designSystem={designSystem}>
          {featuredArticle.image && (<components_1.Img src={featuredArticle.image} width="100%" height="300" alt={featuredArticle.title} style={{
                borderRadius: designSystem.radius.default,
                marginBottom: '16px',
                objectFit: 'cover',
            }}/>)}

          <components_1.Heading as="h3" style={{ ...styles.h2, fontSize: '24px', marginTop: 0 }}>
            {featuredArticle.title}
          </components_1.Heading>

          {(featuredArticle.category || featuredArticle.readTime) && (<components_1.Text style={{ ...styles.small, ...styles.textMuted, marginBottom: '12px' }}>
              {featuredArticle.category && (<span style={{ marginRight: '16px' }}>
                  🏷️ {featuredArticle.category}
                </span>)}
              {featuredArticle.readTime && (<span>⏱️ {featuredArticle.readTime}</span>)}
            </components_1.Text>)}

          <components_1.Text style={{ ...styles.p, lineHeight: '1.6', marginBottom: '20px' }}>
            {featuredArticle.description}
          </components_1.Text>

          <components_1.Button href={featuredArticle.link} style={{
            ...styles.button.primary,
            padding: '12px 32px',
        }}>
            {t.readMore} →
          </components_1.Button>
        </EmailTemplateWithDesignSystem_1.EmailCard>
      </components_1.Section>

      {/* More Articles */}
      {articles.length > 0 && (<components_1.Section style={{ marginBottom: '40px' }}>
          <components_1.Heading as="h2" style={styles.h2}>
            📚 {t.moreStories}
          </components_1.Heading>

          {articles.map((article, index) => (<EmailTemplateWithDesignSystem_1.EmailCard key={index} designSystem={designSystem}>
              <components_1.Row>
                {article.image && (<components_1.Column width="120">
                    <components_1.Img src={article.image} width="100" height="100" alt={article.title} style={{
                        borderRadius: designSystem.radius.default,
                        objectFit: 'cover',
                    }}/>
                  </components_1.Column>)}
                <components_1.Column>
                  <components_1.Heading as="h4" style={{ ...styles.h3, marginTop: 0, marginBottom: '8px' }}>
                    <components_1.Link href={article.link} style={{ ...styles.link, textDecoration: 'none' }}>
                      {article.title}
                    </components_1.Link>
                  </components_1.Heading>

                  {(article.category || article.readTime) && (<components_1.Text style={{ ...styles.small, ...styles.textMuted, marginBottom: '8px' }}>
                      {article.category && (<span style={{ marginRight: '12px' }}>{article.category}</span>)}
                      {article.readTime && <span>{article.readTime}</span>}
                    </components_1.Text>)}

                  <components_1.Text style={{ ...styles.p, margin: 0, lineHeight: '1.5' }}>
                    {article.description}
                  </components_1.Text>

                  <components_1.Link href={article.link} style={{
                    ...styles.link,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    marginTop: '8px',
                }}>
                    {t.readMore} →
                  </components_1.Link>
                </components_1.Column>
              </components_1.Row>
            </EmailTemplateWithDesignSystem_1.EmailCard>))}

          <components_1.Section style={{ textAlign: 'center', marginTop: '24px' }}>
            <components_1.Button href={`${baseUrl}/blog`} style={{
                ...styles.button.secondary,
                padding: '12px 32px',
            }}>
              {t.viewAll}
            </components_1.Button>
          </components_1.Section>
        </components_1.Section>)}

      {/* Quick Tips */}
      {tips.length > 0 && (<components_1.Section style={{
                backgroundColor: designSystem.colors.muted,
                padding: '24px',
                borderRadius: designSystem.radius.md,
                marginBottom: '40px',
            }}>
          <components_1.Heading as="h3" style={{ ...styles.h3, marginTop: 0 }}>
            💡 {t.quickTips}
          </components_1.Heading>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {tips.map((tip, index) => (<li key={index} style={{ marginBottom: '8px' }}>
                <components_1.Text style={{ ...styles.p, margin: 0 }}>{tip}</components_1.Text>
              </li>))}
          </ul>
        </components_1.Section>)}

      <components_1.Hr style={styles.hr}/>

      {/* Share Section */}
      <components_1.Section style={{ textAlign: 'center', marginBottom: '32px' }}>
        <components_1.Text style={{ ...styles.p, fontWeight: 'bold' }}>
          {t.shareNewsletter}
        </components_1.Text>
        <components_1.Link href={`mailto:?subject=${newsletterTitle}&body=${encodeURIComponent(`${baseUrl}/newsletter`)}`} style={{
            ...styles.button.outline,
            display: 'inline-block',
            padding: '10px 24px',
            marginTop: '12px',
            border: `2px solid ${designSystem.colors.primary}`,
            borderRadius: designSystem.radius.default,
            textDecoration: 'none',
        }}>
          ✉️ {t.forwardEmail}
        </components_1.Link>
      </components_1.Section>

      {/* Footer Actions */}
      <components_1.Section style={{ textAlign: 'center' }}>
        <components_1.Link href={`${baseUrl}/preferences`} style={{
            ...styles.link,
            marginRight: '24px',
            fontSize: '14px',
        }}>
          {t.updatePreferences}
        </components_1.Link>
        <components_1.Link href={`${baseUrl}/newsletter/view/${newsletterDate}`} style={{
            ...styles.link,
            fontSize: '14px',
        }}>
          {t.viewInBrowser}
        </components_1.Link>
      </components_1.Section>

      {/* Thank You */}
      <components_1.Section style={{ marginTop: '32px', textAlign: 'center' }}>
        <components_1.Text style={{ ...styles.p, fontSize: '16px', fontWeight: 'bold' }}>
          {t.thankYou}
        </components_1.Text>
        <components_1.Text style={{ ...styles.small, ...styles.textMuted }}>
          {templateData.companyName} Editorial Team
        </components_1.Text>
      </components_1.Section>
    </EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign>);
};
exports.NewsletterWithDesign = NewsletterWithDesign;
// Default export for testing
exports.default = exports.NewsletterWithDesign;
//# sourceMappingURL=newsletter-with-design.js.map