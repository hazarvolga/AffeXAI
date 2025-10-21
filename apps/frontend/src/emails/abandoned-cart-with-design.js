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
exports.AbandonedCartWithDesign = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const EmailTemplateWithDesignSystem_1 = require("./components/EmailTemplateWithDesignSystem");
const email_template_helper_1 = require("./helpers/email-template-helper");
const AbandonedCartWithDesign = async ({ customerName, customerEmail, cartItems, cartTotal, cartUrl, discountCode, discountAmount, unsubscribeToken, locale = 'tr', }) => {
    // Get template data with design system
    const templateData = await (0, email_template_helper_1.getEmailTemplateData)({
        preview: locale === 'tr'
            ? "Sepetinizde ürünler sizi bekliyor!"
            : "Items in your cart are waiting!",
        subject: locale === 'tr'
            ? `${customerName}, sepetinizi unuttunuz mu?`
            : `${customerName}, forgot something?`,
        theme: 'light',
        context: 'public',
        showUnsubscribeLink: true, // Marketing email
        unsubscribeToken,
        locale,
    });
    const { designSystem } = templateData;
    const styles = (0, email_template_helper_1.getEmailStyles)(designSystem);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
    // Calculate final price with discount
    const finalTotal = discountAmount ? cartTotal - discountAmount : cartTotal;
    // Translations
    const t = {
        greeting: (0, email_template_helper_1.getGreeting)(locale),
        title: locale === 'tr'
            ? "Sepetinizdeki Ürünler Sizi Bekliyor!"
            : "Your Cart Items Are Waiting!",
        intro: locale === 'tr'
            ? "Sepetinizde bıraktığınız harika ürünler hala sizin için ayrılmış durumda. Stoklar tükenmeden alışverişinizi tamamlamak ister misiniz?"
            : "The amazing items you left in your cart are still reserved for you. Would you like to complete your purchase before stocks run out?",
        yourCart: locale === 'tr' ? "Sepetinizdeki Ürünler" : "Items in Your Cart",
        quantity: locale === 'tr' ? "Adet" : "Qty",
        price: locale === 'tr' ? "Fiyat" : "Price",
        total: locale === 'tr' ? "Toplam" : "Total",
        discount: locale === 'tr' ? "İndirim" : "Discount",
        finalTotal: locale === 'tr' ? "Ödenecek Tutar" : "Final Total",
        completeOrder: locale === 'tr' ? "Alışverişi Tamamla" : "Complete Purchase",
        specialOffer: locale === 'tr' ? "Özel Teklif!" : "Special Offer!",
        discountMessage: locale === 'tr'
            ? `Size özel ${(0, email_template_helper_1.formatCurrency)(discountAmount || 0, locale)} indirim kazandınız! Kod: ${discountCode}`
            : `You've earned ${(0, email_template_helper_1.formatCurrency)(discountAmount || 0, locale)} off! Code: ${discountCode}`,
        whyComplete: locale === 'tr' ? "Neden Şimdi Tamamlamalısınız?" : "Why Complete Now?",
        reason1: locale === 'tr' ? "🚚 Ücretsiz kargo fırsatı" : "🚚 Free shipping available",
        reason2: locale === 'tr' ? "⏰ Sınırlı stok - Hızlı tükeniyor" : "⏰ Limited stock - Running out fast",
        reason3: locale === 'tr' ? "🔒 Güvenli ödeme garantisi" : "🔒 Secure payment guaranteed",
        reason4: locale === 'tr' ? "💳 Taksit imkanları mevcut" : "💳 Installment options available",
        needHelp: locale === 'tr' ? "Yardıma mı ihtiyacınız var?" : "Need help?",
        helpText: locale === 'tr'
            ? "Alışverişinizi tamamlarken sorun mu yaşıyorsunuz? Müşteri hizmetlerimiz size yardımcı olmaya hazır."
            : "Having trouble completing your purchase? Our customer service is ready to help.",
        contactUs: locale === 'tr' ? "Bize Ulaşın" : "Contact Us",
        stockWarning: locale === 'tr'
            ? "Sepetinizdeki ürünler 24 saat boyunca rezerve edilir"
            : "Items in your cart are reserved for 24 hours",
    };
    return (<EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign {...templateData}>
      {/* Greeting */}
      <components_1.Text style={styles.p}>
        {t.greeting} {customerName},
      </components_1.Text>

      {/* Title with Icon */}
      <components_1.Section style={{ textAlign: 'center', marginBottom: '32px' }}>
        <components_1.Text style={{ fontSize: '48px', margin: 0 }}>🛒</components_1.Text>
        <components_1.Heading as="h1" style={{ ...styles.h1, fontSize: '26px', marginTop: '16px' }}>
          {t.title}
        </components_1.Heading>
      </components_1.Section>

      {/* Introduction */}
      <components_1.Text style={{ ...styles.p, fontSize: '16px', lineHeight: '1.6' }}>
        {t.intro}
      </components_1.Text>

      {/* Special Discount Alert */}
      {discountCode && discountAmount && (<EmailTemplateWithDesignSystem_1.EmailAlert variant="success" designSystem={designSystem}>
          <components_1.Text style={{
                margin: 0,
                fontWeight: 'bold',
                fontSize: '16px',
                color: 'inherit',
                marginBottom: '8px'
            }}>
            🎁 {t.specialOffer}
          </components_1.Text>
          <components_1.Text style={{ margin: 0, color: 'inherit' }}>
            {t.discountMessage}
          </components_1.Text>
        </EmailTemplateWithDesignSystem_1.EmailAlert>)}

      {/* Cart Items */}
      <components_1.Section style={{ marginTop: '32px', marginBottom: '32px' }}>
        <components_1.Heading as="h2" style={styles.h2}>
          {t.yourCart}
        </components_1.Heading>

        {cartItems.map((item) => (<EmailTemplateWithDesignSystem_1.EmailCard key={item.id} designSystem={designSystem}>
            <components_1.Row>
              {item.image && (<components_1.Column width="100">
                  <components_1.Img src={item.image} width="80" height="80" alt={item.name} style={{ borderRadius: designSystem.radius.default }}/>
                </components_1.Column>)}
              <components_1.Column>
                <components_1.Text style={{ ...styles.p, fontWeight: 'bold', marginBottom: '4px' }}>
                  {item.name}
                </components_1.Text>
                {item.description && (<components_1.Text style={{ ...styles.small, ...styles.textMuted, margin: 0 }}>
                    {item.description}
                  </components_1.Text>)}
                <components_1.Text style={{ ...styles.small, marginTop: '8px', margin: 0 }}>
                  {t.quantity}: {item.quantity} × {(0, email_template_helper_1.formatCurrency)(item.price, locale)}
                </components_1.Text>
              </components_1.Column>
              <components_1.Column align="right" width="120">
                <components_1.Text style={{
                ...styles.p,
                fontWeight: 'bold',
                fontSize: '18px',
                margin: 0,
                color: designSystem.colors.primary
            }}>
                  {(0, email_template_helper_1.formatCurrency)(item.price * item.quantity, locale)}
                </components_1.Text>
              </components_1.Column>
            </components_1.Row>
          </EmailTemplateWithDesignSystem_1.EmailCard>))}

        {/* Price Summary */}
        <components_1.Section style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: designSystem.colors.muted,
            borderRadius: designSystem.radius.default
        }}>
          <components_1.Row style={{ marginBottom: '8px' }}>
            <components_1.Column>
              <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.total}:</components_1.Text>
            </components_1.Column>
            <components_1.Column align="right">
              <components_1.Text style={{ ...styles.p, margin: 0 }}>
                {(0, email_template_helper_1.formatCurrency)(cartTotal, locale)}
              </components_1.Text>
            </components_1.Column>
          </components_1.Row>
          {discountAmount && (<components_1.Row style={{ marginBottom: '8px' }}>
              <components_1.Column>
                <components_1.Text style={{ ...styles.p, margin: 0, color: designSystem.colors.success }}>
                  {t.discount} ({discountCode}):
                </components_1.Text>
              </components_1.Column>
              <components_1.Column align="right">
                <components_1.Text style={{ ...styles.p, margin: 0, color: designSystem.colors.success }}>
                  -{(0, email_template_helper_1.formatCurrency)(discountAmount, locale)}
                </components_1.Text>
              </components_1.Column>
            </components_1.Row>)}
          <components_1.Row style={{
            borderTop: `2px solid ${designSystem.colors.border}`,
            paddingTop: '8px',
            marginTop: '8px'
        }}>
            <components_1.Column>
              <components_1.Text style={{
            ...styles.p,
            fontWeight: 'bold',
            fontSize: '20px',
            margin: 0
        }}>
                {t.finalTotal}:
              </components_1.Text>
            </components_1.Column>
            <components_1.Column align="right">
              <components_1.Text style={{
            ...styles.p,
            fontWeight: 'bold',
            fontSize: '20px',
            color: designSystem.colors.primary,
            margin: 0
        }}>
                {(0, email_template_helper_1.formatCurrency)(finalTotal, locale)}
              </components_1.Text>
            </components_1.Column>
          </components_1.Row>
        </components_1.Section>
      </components_1.Section>

      {/* CTA Button */}
      <components_1.Section style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
        <components_1.Button href={cartUrl} style={{
            ...styles.button.primary,
            padding: '16px 48px',
            fontSize: '18px',
            fontWeight: 'bold',
        }}>
          {t.completeOrder} →
        </components_1.Button>
      </components_1.Section>

      {/* Stock Warning */}
      <EmailTemplateWithDesignSystem_1.EmailAlert variant="warning" designSystem={designSystem}>
        <components_1.Text style={{ margin: 0, color: 'inherit', textAlign: 'center' }}>
          ⏰ {t.stockWarning}
        </components_1.Text>
      </EmailTemplateWithDesignSystem_1.EmailAlert>

      {/* Why Complete Now */}
      <components_1.Section style={{ marginTop: '32px', marginBottom: '32px' }}>
        <components_1.Heading as="h3" style={styles.h3}>
          {t.whyComplete}
        </components_1.Heading>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.reason1}</components_1.Text>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.reason2}</components_1.Text>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.reason3}</components_1.Text>
          </li>
          <li>
            <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.reason4}</components_1.Text>
          </li>
        </ul>
      </components_1.Section>

      <components_1.Hr style={styles.hr}/>

      {/* Help Section */}
      <components_1.Section style={{ textAlign: 'center' }}>
        <components_1.Heading as="h3" style={{ ...styles.h3, ...styles.textCenter }}>
          {t.needHelp}
        </components_1.Heading>
        <components_1.Text style={{ ...styles.p, ...styles.textCenter }}>
          {t.helpText}
        </components_1.Text>
        <components_1.Button href={`${baseUrl}/contact`} style={{
            ...styles.button.secondary,
            padding: '12px 24px',
            marginTop: '16px',
        }}>
          {t.contactUs}
        </components_1.Button>
      </components_1.Section>
    </EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign>);
};
exports.AbandonedCartWithDesign = AbandonedCartWithDesign;
// Default export for testing
exports.default = exports.AbandonedCartWithDesign;
//# sourceMappingURL=abandoned-cart-with-design.js.map