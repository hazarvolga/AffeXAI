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
exports.TicketResolvedEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const TicketResolvedEmail = ({ ticketId = "07a6cc03-5ed9-483e-b26c-da0f3c4a4b83", ticketNumber = "#12345", subject = "Test Destek Talebi", customerName = "Değerli Müşterimiz", resolvedByName = "Ahmet Yılmaz", resolutionNotes = "Sorununuz çözümlendi. Yapılan işlemler hakkında detaylı bilgi talep mesajlarından ulaşabilirsiniz.", ticketUrl = `${baseUrl}/portal/support/tickets/07a6cc03-5ed9-483e-b26c-da0f3c4a4b83`, feedbackUrl = `${baseUrl}/portal/support/tickets/07a6cc03-5ed9-483e-b26c-da0f3c4a4b83/feedback`, siteSettings, }) => {
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || (0, siteSettings_1.getContactInfo)();
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `Destek talebiniz çözümlendi: ${subject}`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          {/* Header */}
          <components_1.Section style={header}>
            <components_1.Heading style={heading}>{companyName}</components_1.Heading>
          </components_1.Section>

          {/* Main Content */}
          <components_1.Section style={content}>
            {/* Success Icon */}
            <components_1.Section style={iconContainer}>
              <div style={successIcon}>✓</div>
            </components_1.Section>

            <components_1.Heading style={h1}>Destek Talebiniz Çözümlendi</components_1.Heading>
            
            <components_1.Text style={text}>
              Merhaba {customerName},
            </components_1.Text>
            
            <components_1.Text style={text}>
              <strong>{ticketNumber}</strong> numaralı destek talebiniz başarıyla çözümlendi.
            </components_1.Text>

            {/* Ticket Details Box */}
            <components_1.Section style={ticketBox}>
              <components_1.Text style={ticketLabel}>Konu:</components_1.Text>
              <components_1.Text style={ticketValue}>{subject}</components_1.Text>
              
              <components_1.Hr style={ticketDivider}/>
              
              <components_1.Text style={ticketLabel}>Çözümleyen:</components_1.Text>
              <components_1.Text style={ticketValue}>{resolvedByName}</components_1.Text>
              
              {resolutionNotes && (<>
                  <components_1.Hr style={ticketDivider}/>
                  <components_1.Text style={ticketLabel}>Çözüm Notları:</components_1.Text>
                  <components_1.Text style={resolutionText}>{resolutionNotes}</components_1.Text>
                </>)}
            </components_1.Section>

            <components_1.Text style={text}>
              Eğer sorununuz tam olarak çözülmediyse, talebi yeniden açabilir veya yeni bir destek talebi oluşturabilirsiniz.
            </components_1.Text>

            <components_1.Section style={buttonContainer}>
              <components_1.Button style={buttonPrimary} href={ticketUrl}>
                Talebi Görüntüle
              </components_1.Button>
            </components_1.Section>

            <components_1.Hr style={hr}/>

            {/* Feedback Section */}
            <components_1.Section style={feedbackSection}>
              <components_1.Heading style={h2}>Hizmetimizi Değerlendirin</components_1.Heading>
              
              <components_1.Text style={feedbackText}>
                Aldığınız hizmet hakkında görüşleriniz bizim için çok değerli. Lütfen birkaç dakikanızı ayırarak bizi değerlendirin.
              </components_1.Text>

              <components_1.Section style={buttonContainer}>
                <components_1.Button style={buttonSecondary} href={feedbackUrl}>
                  Geri Bildirim Verin
                </components_1.Button>
              </components_1.Section>
            </components_1.Section>

            <components_1.Hr style={hr}/>

            <components_1.Text style={footer}>
              Bu e-posta {companyName} destek sistemi tarafından otomatik olarak gönderilmiştir.
              <br />
              Talep numaranızı her zaman belirtiniz: {ticketNumber}
            </components_1.Text>
          </components_1.Section>

          {/* Footer */}
          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.TicketResolvedEmail = TicketResolvedEmail;
exports.default = exports.TicketResolvedEmail;
// Styles
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};
const header = {
    padding: "32px 24px",
    backgroundColor: "#1e40af",
    textAlign: "center",
};
const heading = {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "700",
    margin: "0",
};
const content = {
    padding: "0 48px",
};
const iconContainer = {
    textAlign: "center",
    marginTop: "24px",
    marginBottom: "24px",
};
const successIcon = {
    display: "inline-block",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "#10b981",
    color: "#ffffff",
    fontSize: "36px",
    lineHeight: "64px",
    fontWeight: "700",
};
const h1 = {
    color: "#1e293b",
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "1.4",
    marginBottom: "24px",
    textAlign: "center",
};
const h2 = {
    color: "#1e293b",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.4",
    marginBottom: "16px",
    textAlign: "center",
};
const text = {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "16px",
};
const ticketBox = {
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    padding: "24px",
    marginTop: "24px",
    marginBottom: "24px",
};
const ticketLabel = {
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0 0 4px 0",
};
const ticketValue = {
    color: "#1e293b",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 16px 0",
};
const resolutionText = {
    color: "#334155",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0",
    whiteSpace: "pre-wrap",
};
const ticketDivider = {
    borderColor: "#cbd5e1",
    margin: "16px 0",
};
const buttonContainer = {
    textAlign: "center",
    marginTop: "24px",
    marginBottom: "24px",
};
const buttonPrimary = {
    backgroundColor: "#1e40af",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "14px 32px",
};
const buttonSecondary = {
    backgroundColor: "#10b981",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "14px 32px",
};
const feedbackSection = {
    backgroundColor: "#fefce8",
    borderRadius: "8px",
    padding: "32px 24px",
    marginTop: "32px",
};
const feedbackText = {
    color: "#334155",
    fontSize: "15px",
    lineHeight: "1.6",
    textAlign: "center",
    marginBottom: "20px",
};
const hr = {
    borderColor: "#e2e8f0",
    margin: "32px 0",
};
const footer = {
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.6",
    textAlign: "center",
};
//# sourceMappingURL=ticket-resolved.js.map