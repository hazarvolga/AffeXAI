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
exports.CSATSurveyEmail = void 0;
const React = __importStar(require("react"));
const components_1 = require("@react-email/components");
const EmailFooter_1 = require("./components/EmailFooter");
const CSATSurveyEmail = ({ customerName = 'Değerli Müşterimiz', ticketTitle = 'Destek Talebi', ticketId = '#12345', surveyUrl = 'https://example.com/survey/token', agentName = 'Destek Ekibi', siteSettings = {
    siteName: 'Aluplan',
    siteUrl: 'https://aluplan.com',
    supportEmail: 'support@aluplan.com',
}, }) => {
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>
        {siteSettings.siteName} - Memnuniyet Anketi: {ticketTitle}
      </components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          {/* Header */}
          <components_1.Section style={header}>
            <components_1.Text style={heading}>💬 Memnuniyet Anketi</components_1.Text>
          </components_1.Section>

          {/* Content */}
          <components_1.Section style={content}>
            <components_1.Text style={greeting}>Merhaba {customerName},</components_1.Text>

            <components_1.Text style={paragraph}>
              <strong>{ticketId}</strong> numaralı destek talebiniz çözümlendi.
              Hizmetimizden memnuniyetinizi öğrenmek isteriz.
            </components_1.Text>

            {/* Ticket Info Box */}
            <components_1.Section style={infoBox}>
              <components_1.Text style={infoLabel}>Destek Talebi:</components_1.Text>
              <components_1.Text style={infoValue}>{ticketTitle}</components_1.Text>
              {agentName && (<>
                  <components_1.Text style={infoLabel}>Çözüme Yardımcı Olan:</components_1.Text>
                  <components_1.Text style={infoValue}>{agentName}</components_1.Text>
                </>)}
            </components_1.Section>

            {/* Survey Questions Preview */}
            <components_1.Section style={surveyPreview}>
              <components_1.Text style={surveyTitle}>⭐ Ankete Katılın (30 saniye)</components_1.Text>
              <components_1.Text style={surveyQuestion}>
                1. Aldığınız hizmetten ne kadar memnunsunuz? (1-5 yıldız)
              </components_1.Text>
              <components_1.Text style={surveyQuestion}>
                2. Çözüm süresi beklentilerinizi karşıladı mı?
              </components_1.Text>
              <components_1.Text style={surveyQuestion}>
                3. Ek görüşlerinizi paylaşın (opsiyonel)
              </components_1.Text>
            </components_1.Section>

            {/* CTA Button */}
            <components_1.Section style={buttonContainer}>
              <components_1.Button href={surveyUrl} style={button}>
                Ankete Katıl
              </components_1.Button>
            </components_1.Section>

            <components_1.Text style={smallText}>
              Alternatif olarak bu linki kullanabilirsiniz:
              <br />
              <a href={surveyUrl} style={link}>
                {surveyUrl}
              </a>
            </components_1.Text>

            <components_1.Hr style={divider}/>

            {/* Why Surveys Matter */}
            <components_1.Section style={whySurveysSection}>
              <components_1.Text style={whySurveysTitle}>🎯 Neden Önemli?</components_1.Text>
              <components_1.Text style={paragraph}>
                • Geri bildiriminiz hizmet kalitemizi artırır
                <br />
                • Süreçlerimizi geliştirmemize yardımcı olur
                <br />
                • Müşteri deneyimini iyileştirir
                <br />• Sadece 30 saniye sürer
              </components_1.Text>
            </components_1.Section>

            <components_1.Text style={thanksText}>
              Zamanınız için teşekkür ederiz!
              <br />
              {siteSettings.siteName} Destek Ekibi
            </components_1.Text>
          </components_1.Section>

          {/* Footer */}
          <EmailFooter_1.EmailFooter siteName={siteSettings.siteName} siteUrl={siteSettings.siteUrl} supportEmail={siteSettings.supportEmail}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.CSATSurveyEmail = CSATSurveyEmail;
exports.default = exports.CSATSurveyEmail;
// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
};
const header = {
    padding: '32px 20px',
    textAlign: 'center',
    backgroundColor: '#667eea',
};
const heading = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ffffff',
    margin: '0',
};
const content = {
    padding: '0 48px',
};
const greeting = {
    fontSize: '18px',
    lineHeight: '1.4',
    color: '#484848',
    fontWeight: '500',
    marginBottom: '16px',
};
const paragraph = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#484848',
    marginBottom: '16px',
};
const infoBox = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    marginBottom: '24px',
};
const infoLabel = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6c757d',
    textTransform: 'uppercase',
    marginBottom: '4px',
    marginTop: '0',
};
const infoValue = {
    fontSize: '16px',
    color: '#212529',
    marginTop: '0',
    marginBottom: '12px',
    fontWeight: '500',
};
const surveyPreview = {
    backgroundColor: '#f0f4ff',
    padding: '24px',
    borderRadius: '8px',
    border: '2px dashed #667eea',
    marginBottom: '24px',
};
const surveyTitle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#667eea',
    marginTop: '0',
    marginBottom: '16px',
};
const surveyQuestion = {
    fontSize: '14px',
    color: '#484848',
    marginBottom: '8px',
    paddingLeft: '4px',
};
const buttonContainer = {
    textAlign: 'center',
    marginTop: '32px',
    marginBottom: '24px',
};
const button = {
    backgroundColor: '#667eea',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
    padding: '14px 40px',
};
const smallText = {
    fontSize: '13px',
    color: '#6c757d',
    lineHeight: '1.6',
    textAlign: 'center',
    marginTop: '16px',
};
const link = {
    color: '#667eea',
    textDecoration: 'underline',
    wordBreak: 'break-all',
};
const divider = {
    borderColor: '#e9ecef',
    margin: '32px 0',
};
const whySurveysSection = {
    backgroundColor: '#fff3cd',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ffc107',
    marginBottom: '24px',
};
const whySurveysTitle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#856404',
    marginTop: '0',
    marginBottom: '12px',
};
const thanksText = {
    fontSize: '16px',
    color: '#484848',
    lineHeight: '1.6',
    marginTop: '24px',
    textAlign: 'center',
    fontWeight: '500',
};
//# sourceMappingURL=csat-survey.js.map