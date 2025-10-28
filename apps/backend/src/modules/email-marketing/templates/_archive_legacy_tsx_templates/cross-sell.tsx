import { Body, Button, Container, Head, Html, Preview, Section, Text, Heading, Hr } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface CrossSellEmailProps {
  userName?: string;
  purchasedProduct?: string;
  recommendations?: Array<{ name: string; price: string; image: string; url: string; reason: string }>;
  shopUrl?: string;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: { address: string; phone: string; email: string };
    socialMedia: { [key: string]: string };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const CrossSellEmail = ({
  userName = "Ahmet Yılmaz",
  purchasedProduct = "MacBook Pro 16\"",
  recommendations = [
    { name: "Magic Mouse 2", price: "899 TL", image: `${baseUrl}/products/mouse.jpg`, url: `${baseUrl}/products/mouse`, reason: "MacBook kullanıcılarının %87'si satın alıyor" },
    { name: "USB-C Hub", price: "459 TL", image: `${baseUrl}/products/hub.jpg`, url: `${baseUrl}/products/hub`, reason: "MacBook ile mükemmel uyum" },
    { name: "Laptop Stand", price: "349 TL", image: `${baseUrl}/products/stand.jpg`, url: `${baseUrl}/products/stand`, reason: "Ergonomik çalışma için ideal" }
  ],
  shopUrl = `${baseUrl}/shop`,
  siteSettings,
}: CrossSellEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>Bu ürünler {purchasedProduct} için mükemmel tamamlayıcı!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>🎯 Size Özel Öneriler</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              <strong>{purchasedProduct}</strong> satın aldığınız için teşekkürler!
              Bu ürünü daha verimli kullanmanız için bazı önerilerimiz var.
            </Text>

            <Section style={recommendationsBox}>
              <Text style={sectionTitle}>✨ Bu Ürünler İlginizi Çekebilir</Text>
              <Hr style={hr} />

              {recommendations.map((product, index) => (
                <div key={index} style={productCard}>
                  <img src={product.image} alt={product.name} style={productImage} />
                  <div style={productInfo}>
                    <Text style={productName}>{product.name}</Text>
                    <Text style={productPrice}>{product.price}</Text>
                    <Text style={productReason}>💡 {product.reason}</Text>
                    <Button style={productButton} href={product.url}>
                      İncele
                    </Button>
                  </div>
                </div>
              ))}
            </Section>

            <Section style={buttonContainer}>
              <Button style={mainButton} href={shopUrl}>
                Tüm Ürünleri Gör
              </Button>
            </Section>

            <Hr style={hr} />
            <Text style={footer}>
              Keyifli alışverişler!<br />
              {companyName}
            </Text>
          </Section>

          <EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default CrossSellEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", padding: "30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const heading = { fontSize: "32px", fontWeight: "bold", color: "#ffffff", margin: "0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const recommendationsBox = { margin: "24px 0" };
const sectionTitle = { fontSize: "20px", fontWeight: "bold", color: "#333", marginBottom: "16px" };
const productCard = { display: "flex", backgroundColor: "#f9fafb", padding: "16px", borderRadius: "8px", margin: "16px 0", border: "1px solid #e5e7eb" };
const productImage = { width: "120px", height: "120px", objectFit: "cover" as const, borderRadius: "6px", marginRight: "16px" };
const productInfo = { flex: 1 };
const productName = { fontSize: "17px", fontWeight: "bold", color: "#333", margin: "0 0 4px 0" };
const productPrice = { fontSize: "20px", fontWeight: "bold", color: "#3b82f6", margin: "4px 0" };
const productReason = { fontSize: "13px", color: "#666", fontStyle: "italic" as const, margin: "8px 0" };
const productButton = { backgroundColor: "#3b82f6", borderRadius: "6px", color: "#fff", fontSize: "14px", fontWeight: "bold", textDecoration: "none", padding: "8px 16px", display: "inline-block", marginTop: "8px" };
const buttonContainer = { textAlign: "center" as const, margin: "32px 0" };
const mainButton = { backgroundColor: "#3b82f6", borderRadius: "6px", color: "#fff", fontSize: "16px", fontWeight: "bold", textDecoration: "none", padding: "14px 32px", display: "inline-block" };
const hr = { borderColor: "#e5e5e5", margin: "20px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const };
