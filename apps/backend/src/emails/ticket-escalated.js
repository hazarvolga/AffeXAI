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
exports.TicketEscalatedEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const TicketEscalatedEmail = ({ recipientName = 'Yönetici', ticketNumber = '#12345', ticketTitle = 'Destek Talebi', priority = 'High', customerName = 'Müşteri', escalationReason = 'SLA ihlali ve müşteri memnuniyetsizliği', previousAgent = 'Destek Ekibi', createdAt = new Date(Date.now() - 48 * 3600000).toLocaleString('tr-TR'), lastUpdate = new Date(Date.now() - 2 * 3600000).toLocaleString('tr-TR'), ticketUrl = `${baseUrl}/admin/support/12345`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `Talep Yükseltildi: ${ticketNumber} - ${ticketTitle}`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={logoContainer}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>
          <components_1.Section style={content}>
            <components_1.Heading style={heading}>🚨 Talep Yükseltildi</components_1.Heading>
            <components_1.Text style={paragraph}>
              Sayın {recipientName},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Bir destek talebi, üst düzey yönetim müdahalesi gerektirdiği için size yükseltildi. Acil incelemeniz ve müdahaleniz beklenmektedir.
            </components_1.Text>

            <components_1.Section style={escalationSection}>
              <components_1.Text style={sectionTitle}>📋 Talep Bilgileri</components_1.Text>
              <components_1.Text style={detailText}><strong>Talep No:</strong> {ticketNumber}</components_1.Text>
              <components_1.Text style={detailText}><strong>Başlık:</strong> {ticketTitle}</components_1.Text>
              <components_1.Text style={detailText}><strong>Öncelik:</strong> <span style={priorityBadge}>{priority}</span></components_1.Text>
              <components_1.Text style={detailText}><strong>Müşteri:</strong> {customerName}</components_1.Text>
              <components_1.Text style={detailText}><strong>Önceki Sorumlu:</strong> {previousAgent}</components_1.Text>
            </components_1.Section>

            <components_1.Section style={reasonSection}>
              <components_1.Text style={reasonTitle}>⚠️ Yükseltme Nedeni</components_1.Text>
              <components_1.Text style={reasonText}>{escalationReason}</components_1.Text>
            </components_1.Section>

            <components_1.Section style={timelineSection}>
              <components_1.Text style={sectionTitle}>⏱️ Zaman Çizelgesi</components_1.Text>
              <components_1.Text style={detailText}><strong>Talep Oluşturulma:</strong> {createdAt}</components_1.Text>
              <components_1.Text style={detailText}><strong>Son Güncelleme:</strong> {lastUpdate}</components_1.Text>
            </components_1.Section>

            <components_1.Text style={urgentText}>
              Bu talep yüksek önceliklidir ve acil müdahale gerektirir. Lütfen derhal talebi inceleyin ve gerekli aksiyonu belirleyin.
            </components_1.Text>

            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={ticketUrl}>
                Talebi İncele
              </components_1.Button>
            </components_1.Section>

            <components_1.Section style={actionsSection}>
              <components_1.Text style={actionsTitle}>📌 Önerilen Aksiyonlar</components_1.Text>
              <components_1.Text style={actionItem}>✓ Talebin detaylı geçmişini inceleyin</components_1.Text>
              <components_1.Text style={actionItem}>✓ Müşteriyle doğrudan iletişime geçmeyi düşünün</components_1.Text>
              <components_1.Text style={actionItem}>✓ Uygun ekip üyesine yeniden atayın veya kendiniz üstlenin</components_1.Text>
              <components_1.Text style={actionItem}>✓ Gerekirse ek kaynaklar tahsis edin</components_1.Text>
              <components_1.Text style={actionItem}>✓ Müşteriye durumu bildirin ve beklentileri netleştirin</components_1.Text>
            </components_1.Section>

            <components_1.Text style={footerNote}>
              Yükseltilmiş talepler müşteri memnuniyeti ve şirket itibarı için kritik öneme sahiptir.
            </components_1.Text>
          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={false}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.TicketEscalatedEmail = TicketEscalatedEmail;
exports.default = exports.TicketEscalatedEmail;
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
    color: '#7c3aed',
    textAlign: 'center',
    margin: '16px 0 24px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#3c4043',
    margin: '12px 0',
};
const escalationSection = {
    backgroundColor: '#faf5ff',
    border: '2px solid #a78bfa',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
};
const reasonSection = {
    backgroundColor: '#fef3c7',
    border: '2px solid #fbbf24',
    borderRadius: '8px',
    padding: '16px',
    margin: '20px 0',
};
const timelineSection = {
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
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
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
};
const reasonTitle = {
    fontSize: '15px',
    fontWeight: '600',
    color: '#92400e',
    margin: '0 0 8px 0',
};
const reasonText = {
    fontSize: '14px',
    color: '#78350f',
    lineHeight: '22px',
    margin: '0',
};
const urgentText = {
    fontSize: '15px',
    lineHeight: '24px',
    color: '#7c3aed',
    fontWeight: '600',
    margin: '24px 0',
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#f5f3ff',
    borderRadius: '6px',
};
const buttonContainer = {
    textAlign: "center",
    margin: "32px 0",
};
const button = {
    backgroundColor: "#7c3aed",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "14px 32px",
    fontWeight: '600',
};
const actionsSection = {
    backgroundColor: '#ecfdf5',
    border: '1px solid #6ee7b7',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
};
const actionsTitle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#065f46',
    margin: '0 0 16px 0',
};
const actionItem = {
    fontSize: '14px',
    color: '#047857',
    margin: '10px 0',
    lineHeight: '22px',
    paddingLeft: '8px',
};
const footerNote = {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
    margin: '24px 0 0 0',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '4px',
};
//# sourceMappingURL=ticket-escalated.js.map