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
exports.InvoiceEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const InvoiceEmail = ({ userName = "Ahmet Yılmaz", invoiceId = "INV-2024-08-001", invoiceDate = new Date().toLocaleDateString('tr-TR'), paymentMethod = "Kredi Kartı (**** **** **** 1234)", totalAmount = "450.00 TL", items = [
    { description: "Allplan Temel Eğitim (Mimari)", amount: "450.00 TL" },
], siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = `Ödemeniz alındı. Fatura #${invoiceId}`;
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={header}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>

          <components_1.Section style={content}>
            <components_1.Heading style={heading}>Ödemeniz Alındı</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {userName}, ödemeniz için teşekkür ederiz. İşte faturanızın bir özeti.
            </components_1.Text>

            <components_1.Section style={invoiceInfoSection}>
              <components_1.Row>
                <components_1.Column>
                  <components_1.Text style={invoiceInfoLabel}>Fatura No</components_1.Text>
                  <components_1.Text style={invoiceInfoValue}>#{invoiceId}</components_1.Text>
                </components_1.Column>
                <components_1.Column>
                  <components_1.Text style={invoiceInfoLabel}>Fatura Tarihi</components_1.Text>
                  <components_1.Text style={invoiceInfoValue}>{invoiceDate}</components_1.Text>
                </components_1.Column>
              </components_1.Row>
            </components_1.Section>

            <Hr style={hr}/>

            <components_1.Section>
              <components_1.Heading as="h2" style={sectionHeading}>
                Fatura Detayları
              </components_1.Heading>
              {items.map((item) => (<components_1.Row key={item.description} style={itemRow}>
                  <components_1.Column>
                    <components_1.Text style={itemText}>{item.description}</components_1.Text>
                  </components_1.Column>
                  <components_1.Column align="right">
                    <components_1.Text style={itemPrice}>{item.amount}</components_1.Text>
                  </components_1.Column>
                </components_1.Row>))}
            </components_1.Section>

            <Hr style={hr}/>

            <components_1.Section>
              <components_1.Row style={totalRow}>
                <components_1.Column>
                  <components_1.Text style={totalLabel}>Genel Toplam</components_1.Text>
                </components_1.Column>
                <components_1.Column align="right">
                  <components_1.Text style={totalValue}>{totalAmount}</components_1.Text>
                </components_1.Column>
              </components_1.Row>
            </components_1.Section>

             <Hr style={hr}/>

            <components_1.Section>
              <components_1.Row>
                <components_1.Column>
                  <components_1.Heading as="h2" style={sectionHeading}>
                    Ödeme Bilgisi
                  </components_1.Heading>
                  <components_1.Text style={addressText}>
                    {paymentMethod}
                  </components_1.Text>
                </components_1.Column>
              </components_1.Row>
            </components_1.Section>

            <components_1.Section style={{ textAlign: "center", marginTop: "32px" }}>
              <components_1.Button style={button} href={`${baseUrl}/portal/invoices/${invoiceId}`}>
                Faturanın Tamamını Görüntüle
              </components_1.Button>
            </components_1.Section>

          </components_1.Section>

          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={false}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.InvoiceEmail = InvoiceEmail;
exports.default = exports.InvoiceEmail;
// Styles
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
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: '#333333'
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#445354',
};
const invoiceInfoSection = {
    padding: '16px',
    backgroundColor: '#f6f9fc',
    borderRadius: '4px',
    margin: '20px 0',
};
const invoiceInfoLabel = {
    margin: 0,
    fontSize: '12px',
    color: '#6a7380',
    textTransform: 'uppercase',
};
const invoiceInfoValue = {
    margin: '4px 0 0 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333333',
};
const sectionHeading = {
    fontSize: "20px",
    fontWeight: "bold",
    color: '#333333',
    margin: '24px 0 12px 0',
};
const itemRow = {
    padding: '8px 0',
};
const itemText = {
    margin: 0,
    fontSize: '14px',
    color: '#333333',
};
const itemPrice = {
    margin: 0,
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333333',
};
const totalRow = {
    padding: '8px 0',
};
const totalLabel = {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333333',
};
const totalValue = {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ED7D31',
};
const addressText = {
    fontSize: "14px",
    lineHeight: "22px",
    color: '#445354',
};
const button = {
    backgroundColor: "#ED7D31",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "14px 28px",
    fontWeight: 'bold',
};
const hr = {
    borderColor: "#e5e5e5",
    margin: "30px 0",
};
//# sourceMappingURL=invoice.js.map