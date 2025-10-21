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
exports.SlaApproachingAlertEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const SlaApproachingAlertEmail = ({ ticketNumber = '#12345', ticketTitle = 'Destek Talebi', priority = 'High', customerName = 'Müşteri', assignedAgent = 'Atanmamış', remainingTime = '30 dakika', slaDeadline = new Date(Date.now() + 30 * 60000).toLocaleString('tr-TR'), responseTime = '4 saat', ticketUrl = `${baseUrl}/admin/support/12345`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `SLA Uyarısı: ${ticketNumber} - ${remainingTime} kaldı`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={logoContainer}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>
          <components_1.Section style={content}>
            <components_1.Heading style={heading}>⏰ SLA Süresi Dolmak Üzere</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {assignedAgent},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Sorumlu olduğunuz bir destek talebi için SLA (Hizmet Seviyesi Anlaşması) süresi dolmak üzere. İhlali önlemek için acil aksiyon gerekiyor.
            </components_1.Text>

            <components_1.Section style={warningSection}>
              <components_1.Text style={sectionTitle}>Talep Bilgileri</components_1.Text>
              <components_1.Text style={detailText}><strong>Talep No:</strong> {ticketNumber}</components_1.Text>
              <components_1.Text style={detailText}><strong>Başlık:</strong> {ticketTitle}</components_1.Text>
              <components_1.Text style={detailText}><strong>Öncelik:</strong> <span style={priorityBadge}>{priority}</span></components_1.Text>
              <components_1.Text style={detailText}><strong>Müşteri:</strong> {customerName}</components_1.Text>
            </components_1.Section>

            <components_1.Section style={timeSection}>
              <components_1.Text style={countdownTitle}>⏰ Kalan Süre</components_1.Text>
              <components_1.Text style={countdownText}>{remainingTime}</components_1.Text>
              <components_1.Text style={deadlineText}>Son Tarih: {slaDeadline}</components_1.Text>
              <components_1.Text style={targetText}>Yanıt Hedefi: {responseTime}</components_1.Text>
            </components_1.Section>

            <components_1.Text style={actionText}>
              Lütfen talebi inceleyin ve müşteriye ilk yanıtınızı en kısa sürede verin.
            </components_1.Text>

            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={ticketUrl}>
                Talebi Yanıtla
              </components_1.Button>
            </components_1.Section>

            <components_1.Section style={tipsSection}>
              <components_1.Text style={tipsTitle}>💡 Hızlı İpuçları</components_1.Text>
              <components_1.Text style={tipText}>• Müşteriye durumu bildirin (işlem devam ediyor)</components_1.Text>
              <components_1.Text style={tipText}>• Gerekirse yöneticinizden destek isteyin</components_1.Text>
              <components_1.Text style={tipText}>• İlk yanıtınız detaylı olmak zorunda değil</components_1.Text>
            </components_1.Section>

            <components_1.Text style={footerNote}>
              Bu proaktif bir uyarı mesajıdır. SLA hedeflerimize ulaşmak için birlikte çalışıyoruz.
            </components_1.Text>
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={false}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.SlaApproachingAlertEmail = SlaApproachingAlertEmail;
exports.default = exports.SlaApproachingAlertEmail;
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
    color: '#f59e0b',
    textAlign: 'center',
    margin: '16px 0 24px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#3c4043',
    margin: '12px 0',
};
const warningSection = {
    backgroundColor: '#fffbeb',
    border: '2px solid #fbbf24',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
};
const timeSection = {
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    padding: '24px',
    margin: '20px 0',
    textAlign: 'center',
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
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
};
const countdownTitle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    margin: '0 0 8px 0',
};
const countdownText = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#dc2626',
    margin: '8px 0',
};
const deadlineText = {
    fontSize: '14px',
    color: '#4b5563',
    margin: '12px 0 4px 0',
};
const targetText = {
    fontSize: '13px',
    color: '#6b7280',
    margin: '4px 0 0 0',
};
const actionText = {
    fontSize: '15px',
    lineHeight: '24px',
    color: '#f59e0b',
    fontWeight: '600',
    margin: '20px 0',
    textAlign: 'center',
};
const buttonContainer = {
    textAlign: "center",
    margin: "32px 0",
};
const button = {
    backgroundColor: "#f59e0b",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "14px 32px",
    fontWeight: '600',
};
const tipsSection = {
    backgroundColor: '#f0fdf4',
    border: '1px solid #86efac',
    borderRadius: '8px',
    padding: '16px',
    margin: '24px 0',
};
const tipsTitle = {
    fontSize: '15px',
    fontWeight: '600',
    color: '#166534',
    margin: '0 0 12px 0',
};
const tipText = {
    fontSize: '13px',
    color: '#166534',
    margin: '6px 0',
    lineHeight: '20px',
};
const footerNote = {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
    margin: '24px 0 0 0',
};
//# sourceMappingURL=sla-approaching-alert.js.map