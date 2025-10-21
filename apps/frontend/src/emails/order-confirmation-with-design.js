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
exports.OrderConfirmationWithDesign = void 0;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const EmailTemplateWithDesignSystem_1 = require("./components/EmailTemplateWithDesignSystem");
const email_template_helper_1 = require("./helpers/email-template-helper");
const OrderConfirmationWithDesign = async ({ orderId, orderDate, customerName, customerEmail, items, subtotal, tax, shipping, total, shippingAddress, estimatedDelivery, trackingUrl, locale = 'tr', }) => {
    // Get template data with design system
    const templateData = await (0, email_template_helper_1.getEmailTemplateData)({
        preview: locale === 'tr'
            ? `Sipariş #${orderId} onaylandı`
            : `Order #${orderId} confirmed`,
        subject: locale === 'tr'
            ? "Siparişiniz Onaylandı!"
            : "Your Order is Confirmed!",
        theme: 'light',
        context: 'public',
        showUnsubscribeLink: false, // Transactional email
        locale,
    });
    const { designSystem } = templateData;
    const styles = (0, email_template_helper_1.getEmailStyles)(designSystem);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
    // Translations
    const t = {
        title: locale === 'tr' ? "Siparişiniz Onaylandı!" : "Order Confirmed!",
        thankYou: locale === 'tr' ? "Teşekkür ederiz!" : "Thank you!",
        intro: locale === 'tr'
            ? "Siparişinizi aldık ve hazırlanmaya başladı. Aşağıda sipariş detaylarınızı bulabilirsiniz."
            : "We've received your order and it's being processed. Find your order details below.",
        orderNumber: locale === 'tr' ? "Sipariş Numarası" : "Order Number",
        orderDate: locale === 'tr' ? "Sipariş Tarihi" : "Order Date",
        orderSummary: locale === 'tr' ? "Sipariş Özeti" : "Order Summary",
        product: locale === 'tr' ? "Ürün" : "Product",
        quantity: locale === 'tr' ? "Adet" : "Qty",
        price: locale === 'tr' ? "Fiyat" : "Price",
        subtotal: locale === 'tr' ? "Ara Toplam" : "Subtotal",
        tax: locale === 'tr' ? "KDV" : "Tax",
        shipping: locale === 'tr' ? "Kargo" : "Shipping",
        total: locale === 'tr' ? "Toplam" : "Total",
        shippingAddress: locale === 'tr' ? "Teslimat Adresi" : "Shipping Address",
        estimatedDelivery: locale === 'tr' ? "Tahmini Teslimat" : "Estimated Delivery",
        trackOrder: locale === 'tr' ? "Siparişimi Takip Et" : "Track Order",
        viewOrder: locale === 'tr' ? "Siparişi Görüntüle" : "View Order",
        nextSteps: locale === 'tr' ? "Sonraki Adımlar" : "Next Steps",
        step1: locale === 'tr'
            ? "Siparişiniz hazırlandığında e-posta ile bilgilendirileceksiniz"
            : "You'll receive an email when your order is ready for shipping",
        step2: locale === 'tr'
            ? "Kargo takip numaranız size SMS ve e-posta ile gönderilecek"
            : "Tracking number will be sent via SMS and email",
        step3: locale === 'tr'
            ? "Teslimat sırasında kurye sizi arayacaktır"
            : "Our courier will contact you during delivery",
        needHelp: locale === 'tr' ? "Yardıma mı ihtiyacınız var?" : "Need help?",
        contact: locale === 'tr'
            ? "Müşteri hizmetlerimizle iletişime geçin"
            : "Contact our customer service",
        free: locale === 'tr' ? "Ücretsiz" : "Free",
    };
    return (<EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign {...templateData}>
      {/* Success Banner */}
      <components_1.Section style={{ textAlign: 'center', marginBottom: '32px' }}>
        <components_1.Text style={{ fontSize: '48px', margin: 0 }}>✅</components_1.Text>
        <components_1.Heading as="h1" style={{ ...styles.h1, fontSize: '28px', marginTop: '16px' }}>
          {t.title}
        </components_1.Heading>
        <components_1.Text style={{ ...styles.p, fontSize: '18px', fontWeight: 'bold' }}>
          {t.thankYou}
        </components_1.Text>
      </components_1.Section>

      {/* Introduction */}
      <components_1.Text style={styles.p}>
        {locale === 'tr' ? 'Sayın' : 'Dear'} {customerName},
      </components_1.Text>
      <components_1.Text style={styles.p}>
        {t.intro}
      </components_1.Text>

      {/* Order Info */}
      <EmailTemplateWithDesignSystem_1.EmailCard designSystem={designSystem}>
        <components_1.Row>
          <components_1.Column>
            <components_1.Text style={{ ...styles.small, ...styles.textMuted, margin: 0 }}>
              {t.orderNumber}
            </components_1.Text>
            <components_1.Text style={{ ...styles.p, fontWeight: 'bold', margin: 0 }}>
              #{orderId}
            </components_1.Text>
          </components_1.Column>
          <components_1.Column align="right">
            <components_1.Text style={{ ...styles.small, ...styles.textMuted, margin: 0 }}>
              {t.orderDate}
            </components_1.Text>
            <components_1.Text style={{ ...styles.p, fontWeight: 'bold', margin: 0 }}>
              {(0, email_template_helper_1.formatDate)(orderDate, locale)}
            </components_1.Text>
          </components_1.Column>
        </components_1.Row>
      </EmailTemplateWithDesignSystem_1.EmailCard>

      {/* Order Items */}
      <components_1.Section style={{ marginTop: '32px', marginBottom: '32px' }}>
        <components_1.Heading as="h2" style={styles.h2}>
          {t.orderSummary}
        </components_1.Heading>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${designSystem.colors.border}` }}>
              <th style={{ ...styles.th, textAlign: 'left', paddingBottom: '12px' }}>
                {t.product}
              </th>
              <th style={{ ...styles.th, textAlign: 'center', paddingBottom: '12px' }}>
                {t.quantity}
              </th>
              <th style={{ ...styles.th, textAlign: 'right', paddingBottom: '12px' }}>
                {t.price}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (<tr key={item.id} style={{ borderBottom: `1px solid ${designSystem.colors.border}` }}>
                <td style={{ ...styles.td, padding: '12px 0' }}>
                  <components_1.Text style={{ margin: 0, fontWeight: 500 }}>{item.name}</components_1.Text>
                </td>
                <td style={{ ...styles.td, textAlign: 'center', padding: '12px 0' }}>
                  {item.quantity}
                </td>
                <td style={{ ...styles.td, textAlign: 'right', padding: '12px 0' }}>
                  {(0, email_template_helper_1.formatCurrency)(item.price, locale)}
                </td>
              </tr>))}
          </tbody>
        </table>

        {/* Price Summary */}
        <components_1.Section style={{ marginTop: '24px', borderTop: `2px solid ${designSystem.colors.border}`, paddingTop: '16px' }}>
          <components_1.Row style={{ marginBottom: '8px' }}>
            <components_1.Column>
              <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.subtotal}:</components_1.Text>
            </components_1.Column>
            <components_1.Column align="right">
              <components_1.Text style={{ ...styles.p, margin: 0 }}>{(0, email_template_helper_1.formatCurrency)(subtotal, locale)}</components_1.Text>
            </components_1.Column>
          </components_1.Row>
          <components_1.Row style={{ marginBottom: '8px' }}>
            <components_1.Column>
              <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.tax}:</components_1.Text>
            </components_1.Column>
            <components_1.Column align="right">
              <components_1.Text style={{ ...styles.p, margin: 0 }}>{(0, email_template_helper_1.formatCurrency)(tax, locale)}</components_1.Text>
            </components_1.Column>
          </components_1.Row>
          <components_1.Row style={{ marginBottom: '8px' }}>
            <components_1.Column>
              <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.shipping}:</components_1.Text>
            </components_1.Column>
            <components_1.Column align="right">
              <components_1.Text style={{ ...styles.p, margin: 0 }}>
                {shipping === 0 ? t.free : (0, email_template_helper_1.formatCurrency)(shipping, locale)}
              </components_1.Text>
            </components_1.Column>
          </components_1.Row>
          <components_1.Row style={{ borderTop: `2px solid ${designSystem.colors.border}`, paddingTop: '8px', marginTop: '8px' }}>
            <components_1.Column>
              <components_1.Text style={{ ...styles.p, fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
                {t.total}:
              </components_1.Text>
            </components_1.Column>
            <components_1.Column align="right">
              <components_1.Text style={{
            ...styles.p,
            fontWeight: 'bold',
            fontSize: '18px',
            color: designSystem.colors.primary,
            margin: 0
        }}>
                {(0, email_template_helper_1.formatCurrency)(total, locale)}
              </components_1.Text>
            </components_1.Column>
          </components_1.Row>
        </components_1.Section>
      </components_1.Section>

      {/* Shipping Info */}
      <components_1.Section style={{ marginBottom: '32px' }}>
        <components_1.Row>
          <components_1.Column>
            <EmailTemplateWithDesignSystem_1.EmailCard designSystem={designSystem}>
              <components_1.Heading as="h3" style={{ ...styles.h3, marginTop: 0 }}>
                📍 {t.shippingAddress}
              </components_1.Heading>
              <components_1.Text style={{ ...styles.p, margin: 0 }}>
                {customerName}<br />
                {shippingAddress.street}<br />
                {shippingAddress.city}{shippingAddress.state ? `, ${shippingAddress.state}` : ''} {shippingAddress.zipCode}<br />
                {shippingAddress.country}
              </components_1.Text>
            </EmailTemplateWithDesignSystem_1.EmailCard>
          </components_1.Column>
          {estimatedDelivery && (<components_1.Column>
              <EmailTemplateWithDesignSystem_1.EmailCard designSystem={designSystem}>
                <components_1.Heading as="h3" style={{ ...styles.h3, marginTop: 0 }}>
                  📦 {t.estimatedDelivery}
                </components_1.Heading>
                <components_1.Text style={{ ...styles.p, fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
                  {estimatedDelivery}
                </components_1.Text>
              </EmailTemplateWithDesignSystem_1.EmailCard>
            </components_1.Column>)}
        </components_1.Row>
      </components_1.Section>

      {/* Action Buttons */}
      <components_1.Section style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
        <components_1.Row>
          <components_1.Column align="center">
            {trackingUrl && (<components_1.Button href={trackingUrl} style={{
                ...styles.button.primary,
                padding: '14px 32px',
                marginRight: '12px',
            }}>
                {t.trackOrder}
              </components_1.Button>)}
            <components_1.Button href={`${baseUrl}/orders/${orderId}`} style={{
            ...styles.button.secondary,
            padding: '14px 32px',
        }}>
              {t.viewOrder}
            </components_1.Button>
          </components_1.Column>
        </components_1.Row>
      </components_1.Section>

      <components_1.Hr style={styles.hr}/>

      {/* Next Steps */}
      <components_1.Section>
        <components_1.Heading as="h3" style={styles.h3}>
          {t.nextSteps}
        </components_1.Heading>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.step1}</components_1.Text>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.step2}</components_1.Text>
          </li>
          <li>
            <components_1.Text style={{ ...styles.p, margin: 0 }}>{t.step3}</components_1.Text>
          </li>
        </ul>
      </components_1.Section>

      {/* Help */}
      <components_1.Section style={{ marginTop: '32px', textAlign: 'center' }}>
        <components_1.Text style={{ ...styles.small, ...styles.textMuted }}>
          {t.needHelp} {t.contact}
        </components_1.Text>
      </components_1.Section>
    </EmailTemplateWithDesignSystem_1.EmailTemplateWithDesign>);
};
exports.OrderConfirmationWithDesign = OrderConfirmationWithDesign;
// Default export for testing
exports.default = exports.OrderConfirmationWithDesign;
//# sourceMappingURL=order-confirmation-with-design.js.map