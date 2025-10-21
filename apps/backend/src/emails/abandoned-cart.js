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
exports.AbandonedCartEmail = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const site_settings_data_1 = require("@/lib/site-settings-data");
const siteSettings_1 = require("@/lib/server/siteSettings");
const EmailFooter_1 = require("./components/EmailFooter");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
const AbandonedCartEmail = ({ userName = "Ahmet", cartItems = [
    { name: "Allplan Professional Lisansı (1 Yıl)", imageUrl: "https://picsum.photos/seed/cart-item-1/100/100", price: "1,999.00 TL" }
], checkoutLink = `${baseUrl}/cart`, siteSettings, }) => {
    // Use dynamic site settings if provided, otherwise fallback to static data
    const companyName = siteSettings?.companyName || (0, siteSettings_1.getCompanyName)();
    const logoUrl = siteSettings?.logoUrl || site_settings_data_1.siteSettingsData.logoUrl || `${baseUrl}/logo.png`;
    const contactInfo = siteSettings?.contact || { address: '', phone: '', email: '' };
    const socialMediaLinks = siteSettings?.socialMedia || {};
    const previewText = "Sepetinizde bir şeyler unuttunuz!";
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>{previewText}</components_1.Preview>
      <components_1.Body style={main}>
        <components_1.Container style={container}>
          <components_1.Section style={logoContainer}>
            <components_1.Img src={`${baseUrl}${logoUrl}`} width="150" height="auto" alt={companyName}/>
          </components_1.Section>
          <components_1.Section style={content}>
            <components_1.Heading style={heading}>Alışverişe Devam Edin</components_1.Heading>
            <components_1.Text style={paragraph}>
              Merhaba {userName},
            </components_1.Text>
            <components_1.Text style={paragraph}>
              Sepetinizde harika ürünler bıraktığınızı fark ettik. Alışverişinizi tamamlamaya hazır mısınız?
            </components_1.Text>
            
            <components_1.Section style={{ marginTop: '24px' }}>
              {cartItems.map((item, index) => (<components_1.Row key={index} style={itemRow}>
                    <components_1.Column style={{ width: '80px' }}>
                         <components_1.Img src={item.imageUrl} width="64" height="64" alt={item.name} style={itemImage}/>
                    </components_1.Column>
                    <components_1.Column>
                        <components_1.Text style={itemName}>{item.name}</components_1.Text>
                        <components_1.Text style={itemPrice}>{item.price}</components_1.Text>
                    </components_1.Column>
                </components_1.Row>))}
            </components_1.Section>

            <components_1.Section style={buttonContainer}>
              <components_1.Button style={button} href={checkoutLink}>
                Sepetime Geri Dön
              </components_1.Button>
            </components_1.Section>
            <components_1.Text style={paragraph}>
              Herhangi bir sorunuz varsa, size yardımcı olmaktan memnuniyet duyarız.
            </components_1.Text>
          </components_1.Section>
          
          <EmailFooter_1.EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} showUnsubscribeLink={true}/>
        </components_1.Container>
      </components_1.Body>
    </components_1.Html>);
};
exports.AbandonedCartEmail = AbandonedCartEmail;
exports.default = exports.AbandonedCartEmail;
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
    color: '#1a1a1a',
    textAlign: 'center',
    margin: '16px 0 24px',
};
const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: '#3c4043',
};
const itemRow = {
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0'
};
const itemImage = {
    borderRadius: '4px'
};
const itemName = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#3c4043',
    margin: 0,
};
const itemPrice = {
    fontSize: '14px',
    color: '#6a7380',
    margin: '4px 0 0 0',
};
const buttonContainer = {
    textAlign: "center",
    margin: "32px 0",
};
const button = {
    backgroundColor: "#ED7D31",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "14px 24px",
    fontWeight: '600',
};
const hr = {
    borderColor: "#f0f0f0",
    margin: "20px 0",
};
//# sourceMappingURL=abandoned-cart.js.map