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
exports.SlaBreachAlertEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const SlaBreachAlertEmail = ({ ticketNumber = '#12345', ticketTitle = 'Destek Talebi', priority = 'High', customerName = 'Müşteri', assignedAgent = 'Atanmamış', breachTime = new Date().toLocaleString('tr-TR'), responseTime = '4 saat', resolutionTime = '24 saat', ticketUrl = `${baseUrl}/admin/support/12345`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `SLA İhlali: ${ticketNumber} - ${ticketTitle}`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={logoContainer}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>
          <components_1.Section style={content}>
            <components_1.Heading style={heading}>⚠️ SLA İhlali Uyarısı</components_1.Heading>
            <components_1.Text style={paragraph}>
              Destek Ekibi,
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Aşağıdaki destek talebi için SLA (Hizmet Seviyesi Anlaşması) ihlali tespit edildi ve acil müdahale gerekiyor.
            </components_1.Text>

            <components_1.Section style={criticalSection}>
              <components_1.Text style={sectionTitle}>Talep Bilgileri</components_1.Text>
              <components_1.Text style={detailText}><strong>Talep No:</strong> {ticketNumber}</components_1.Text>
              <components_1.Text style={detailText}><strong>Başlık:</strong> {ticketTitle}</components_1.Text>
              <components_1.Text style={detailText}><strong>Öncelik:</strong> <span style={priorityBadge}>{priority}</span></components_1.Text>
              <components_1.Text style={detailText}><strong>Müşteri:</strong> {customerName}</components_1.Text>
              <components_1.Text style={detailText}><strong>Atanan:</strong> {assignedAgent}</components_1.Text>
            </components_1.Section>

            <components_1.Section style={slaSection}>
              <components_1.Text style={sectionTitle}>SLA Detayları</components_1.Text>
              <components_1.Text style={detailText}><strong>İhlal Zamanı:</strong> {breachTime}</components_1.Text>
              <components_1.Text style={detailText}><strong>Yanıt Süresi Hedefi:</strong> {responseTime}</components_1.Text>
              <components_1.Text style={detailText}><strong>Çözüm Süresi Hedefi:</strong> {resolutionTime}</components_1.Text>
            </components_1.Section>

            <components_1.Text style={urgentText}>
              Bu talep acil müdahale gerektiriyor. Lütfen derhal talebe öncelik verin ve gerekli aksiyonu alın.
            </components_1.Text>

            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={ticketUrl}>
                Talebi Görüntüle
              </components_1.Button>
            </components_1.Section>

            <components_1.Text style={footerNote}>
              Bu otomatik bir uyarı mesajıdır. SLA ihlalleri müşteri memnuniyetini doğrudan etkiler.
            </components_1.Text>
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={false}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.SlaBreachAlertEmail = SlaBreachAlertEmail;
exports.default = exports.SlaBreachAlertEmail;
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    backgroundColor: '#ffffff',
    margin: "0 auto",
    padding: "20px 48px 48px 48px",
    marginBottom: '64px',
    border: '1px solid #f0f0f0',
    borderRadius: '4px',
    maxWidth: '580px',
};
const logoContainer = {
    padding: '0 0 20px 0',
    textAlign: 'center',
};
const content = {
    padding: '0',
};
const heading = {
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "32px",
    color: '#dc2626',
    textAlign: 'center',
    margin: '16px 0 24px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#3c4043',
    margin: '12px 0',
};
const criticalSection = {
    backgroundColor: '#fef2f2',
    border: '2px solid #dc2626',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
};
const slaSection = {
    backgroundColor: '#fffbeb',
    border: '1px solid #fbbf24',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
};
const sectionTitle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 12px 0',
};
const detailText = {
    margin: '8px 0',
    fontSize: '14px',
    color: '#374151',
};
const priorityBadge = {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
};
const urgentText = {
    fontSize: '15px',
    lineHeight: '24px',
    color: '#dc2626',
    fontWeight: '600',
    margin: '20px 0',
    textAlign: 'center',
};
const buttonContainer = {
    textAlign: "center",
    margin: "32px 0",
};
const button = {
    backgroundColor: "#dc2626",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "14px 32px",
    fontWeight: '600',
};
const footerNote = {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
    margin: '24px 0 0 0',
};
//# sourceMappingURL=sla-breach-alert.js.map