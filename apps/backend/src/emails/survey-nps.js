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
exports.NpsSurveyEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const NpsSurveyEmail = ({ userName = "Değerli Kullanıcımız", surveyLink = `${baseUrl}/survey/nps`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || (0, siteSettings_1.getContactInfo)();
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = "Deneyiminizi bir dakikada değerlendirin.";
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={header}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>

          <components_1.Section style={content}>
            <components_1.Heading style={heading}>Geri Bildiriminizle Büyüyoruz</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {userName},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Size sunduğumuz hizmetin kalitesini artırmak için sürekli çalışıyoruz. Bu süreçte en değerli yol göstericimiz sizsiniz.
            </components_1.Text>
            <components_1.Text style={paragraph}>
             {companyName}'i bir arkadaşınıza veya meslektaşınıza tavsiye etme olasılığınız nedir? Lütfen aşağıdaki ölçek üzerinden bizi değerlendirin.
            </components_1.Text>
            
            <components_1.Section style={npsSection}>
                <components_1.Row>
                    {Array.from({ length: 11 }, (_, i) => i).map((score) => (<components_1.Column key={score} style={npsScoreColumn}>
                             <components_1.Link href={`${surveyLink}?score=${score}`} style={npsScoreLink(score)}>
                                {score}
                            </components_1.Link>
                        </components_1.Column>))}
                </components_1.Row>
                 <components_1.Row style={npsLabelRow}>
                    <components_1.Column align="left">
                        <components_1.Text style={npsLabelText}>Pek Olası Değil</components_1.Text>
                    </components_1.Column>
                    <components_1.Column align="right">
                        <components_1.Text style={npsLabelText}>Çok Olası</components_1.Text>
                    </components_1.Column>
                </components_1.Row>
            </components_1.Section>
            
            <components_1.Text style={paragraphSmall}>
                Bir puana tıklamanız sizi geri bildiriminizin kaydedileceği bir sayfaya yönlendirecektir.
            </components_1.Text>
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.NpsSurveyEmail = NpsSurveyEmail;
exports.default = exports.NpsSurveyEmail;
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
const paragraphSmall = {
    fontSize: '12px',
    textAlign: 'center',
    color: '#6a7380',
    lineHeight: "18px",
};
const npsSection = {
    margin: '40px 0',
};
const npsScoreColumn = {
    width: '9%',
};
const npsScoreLink = (score) => {
    let backgroundColor = '#f1f5f9'; // neutral-200
    if (score <= 6)
        backgroundColor = '#fecaca'; // red-200
    if (score >= 7 && score <= 8)
        backgroundColor = '#fef08a'; // yellow-200
    if (score >= 9)
        backgroundColor = '#bbf7d0'; // green-200
    return {
        display: 'block',
        width: '36px',
        height: '36px',
        lineHeight: '36px',
        textAlign: 'center',
        borderRadius: '18px',
        backgroundColor: backgroundColor,
        color: '#1e293b',
        fontWeight: 'bold',
        textDecoration: 'none',
    };
};
const npsLabelRow = {
    marginTop: '8px',
};
const npsLabelText = {
    fontSize: '12px',
    color: '#6a7380',
};
//# sourceMappingURL=survey-nps.js.map