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
exports.MonthlyNewsletterEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const MonthlyNewsletterEmail = ({ headline = 'Aylık Bültenimize Hoş Geldiniz!', mainStory = {
    title: "Allplan 2025 Yenilikleri Yayınlandı!",
    excerpt: "En son Allplan sürümü, yapay zeka destekli modelleme, gelişmiş işbirliği araçları ve sürdürülebilirlik analizleri ile projelerinizi bir üst seviyeye taşıyor. Tüm yenilikleri keşfedin.",
    imageUrl: "https://picsum.photos/seed/newsletter-main/600/300",
    ctaText: "Detayları İncele",
    ctaLink: `${baseUrl}/products/allplan`
}, secondaryStories = [
    { title: "Webinar: Allplan Bridge ile Parametrik Köprü Tasarımı", excerpt: "Uzmanlarımızdan parametrik tasarımın gücünü öğrenin. Kayıtlar başladı!", ctaText: "Şimdi Kaydol", ctaLink: `${baseUrl}/events` },
    { title: "Yeni Başarı Hikayesi: İstanbul Finans Merkezi", excerpt: "İkonik bir kulenin karmaşık geometrisinin Allplan ile nasıl modellendiğini okuyun.", ctaText: "Hikayeyi Oku", ctaLink: `${baseUrl}/case-studies` },
], siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || (0, siteSettings_1.getContactInfo)();
    const socialMediaLinks = siteSettings?.socialMedia || (0, siteSettings_1.getSocialMediaLinks)();
    const previewText = `Aluplan Digital'den haberler: ${mainStory.title}`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={header}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>

          <components_1.Section style={content}>
            <components_1.Heading style={heading}>{headline}</components_1.Heading>
          </components_1.Section>
          
          <components_1.Section style={content}>
            <components_1.Img src={mainStory.imageUrl} width="100%" style={mainImage}/>
            <components_1.Heading as="h2" style={mainStoryTitle}>{mainStory.title}</components_1.Heading>
            <components_1.Text style={paragraph}>{mainStory.excerpt}</components_1.Text>
            <components_1.Button style={button} href={mainStory.ctaLink}>
              {mainStory.ctaText}
            </components_1.Button>
          </components_1.Section>
          
          <components_1.Hr style={hr}/>

          <components_1.Section style={content}>
             <components_1.Row>
                {secondaryStories.map((story, index) => (<components_1.Column key={index} style={secondaryStoryColumn}>
                        <components_1.Heading as="h3" style={secondaryStoryTitle}>{story.title}</components_1.Heading>
                        <components_1.Text style={secondaryStoryText}>{story.excerpt}</components_1.Text>
                         <components_1.Link href={story.ctaLink} style={secondaryStoryLink}>
                          {story.ctaText} &rarr;
                        </components_1.Link>
                    </components_1.Column>))}
             </components_1.Row>
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.MonthlyNewsletterEmail = MonthlyNewsletterEmail;
exports.default = exports.MonthlyNewsletterEmail;
// Styles
const main = {
    backgroundColor: "#f7f7f7",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    backgroundColor: '#ffffff',
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: '64px',
    border: '1px solid #e5e5e5',
    borderRadius: '4px',
    maxWidth: '600px',
    overflow: 'hidden'
};
const header = {
    padding: '0 32px',
    marginBottom: '20px',
};
const content = {
    padding: '0 32px',
};
const heading = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: '#333333'
};
const mainImage = {
    borderRadius: '4px',
    marginBottom: '20px',
};
const mainStoryTitle = {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#333333'
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#445354',
    margin: '0 0 20px 0',
};
const button = {
    backgroundColor: "#ED7D31",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "12px 24px",
    fontWeight: 'bold',
};
const hr = {
    borderColor: "#e5e5e5",
    margin: "30px 0",
};
const secondaryStoryColumn = {
    width: '50%',
    padding: '0 10px',
};
const secondaryStoryTitle = {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#333333'
};
const secondaryStoryText = {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#666666',
    margin: '0 0 12px 0',
};
const secondaryStoryLink = {
    fontSize: '14px',
    color: '#ED7D31',
    textDecoration: 'none',
};
//# sourceMappingURL=monthly-newsletter.js.map