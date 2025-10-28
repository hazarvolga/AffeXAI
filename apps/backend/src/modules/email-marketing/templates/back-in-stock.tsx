import { Body, Button, Container, Head, Html, Preview, Section, Text, Heading, Hr } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface BackInStockEmailProps {
  userName?: string;
  productName?: string;
  productImage?: string;
  price?: string;
  productUrl?: string;
  stockQuantity?: number;
  waitlistPosition?: number;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: { address: string; phone: string; email: string };
    socialMedia: { [key: string]: string };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const BackInStockEmail = ({
  userName = "Ahmet Yılmaz",
  productName = "Ultra HD Kamera",
  productImage = `${baseUrl}/products/camera.jpg`,
  price = "3.499 TL",
  productUrl = `${baseUrl}/products/camera`,
  stockQuantity = 15,
  waitlistPosition = 5,
  siteSettings,
}: BackInStockEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>Tekrar Stokta! {productName} - Hemen Sipariş Verin</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>✨ Tekrar Stokta!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              Harika haber! Beklediğiniz <strong>{productName}</strong> ürünü tekrar stokta!
            </Text>

            <Section style={productBox}>
              <img src={productImage} alt={productName} style={productImage as any} />
              <Text style={productNameStyle}>{productName}</Text>
              <Text style={priceStyle}>{price}</Text>

              <Section style={stockBox}>
                <Text style={stockText}>
                  📦 Stok Durumu: <strong>Sadece {stockQuantity} adet kaldı!</strong>
                </Text>
              </Section>

              <Section style={priorityBox}>
                <Text style={priorityText}>
                  🎯 Bekleme listesinde <strong>{waitlistPosition}. sıradasınız</strong><br />
                  Öncelikli satın alma fırsatı!
                </Text>
              </Section>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={productUrl}>
                Hemen Satın Al
              </Button>
            </Section>

            <Text style={urgency}>
              ⚠️ Stoklar hızla tükeniyor! Kaçırmayın!
            </Text>

            <Hr style={hr} />
            <Text style={footer}>
              Bu fırsatı kaçırmamak için acele edin!<br />
              {companyName}
            </Text>
          </Section>

          <EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default BackInStockEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", padding: "30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const heading = { fontSize: "32px", fontWeight: "bold", color: "#ffffff", margin: "0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const productBox = { backgroundColor: "#f5f3ff", padding: "24px", borderRadius: "12px", margin: "24px 0", textAlign: "center" as const, border: "2px solid #8b5cf6" };
const productImage = { width: "100%", maxWidth: "400px", height: "auto", borderRadius: "8px", marginBottom: "16px" };
const productNameStyle = { fontSize: "24px", fontWeight: "bold", color: "#333", margin: "16px 0" };
const priceStyle = { fontSize: "28px", fontWeight: "bold", color: "#8b5cf6", margin: "8px 0" };
const stockBox = { backgroundColor: "#ddd6fe", padding: "12px", borderRadius: "6px", margin: "16px 0" };
const stockText = { fontSize: "15px", color: "#5b21b6", textAlign: "center" as const, margin: "0" };
const priorityBox = { backgroundColor: "#fef3c7", padding: "16px", borderRadius: "6px", margin: "16px 0", border: "2px solid #f59e0b" };
const priorityText = { fontSize: "14px", color: "#92400e", textAlign: "center" as const, margin: "0", lineHeight: "20px" };
const buttonContainer = { textAlign: "center" as const, margin: "24px 0" };
const button = { backgroundColor: "#8b5cf6", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "16px 48px", boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)" };
const urgency = { fontSize: "15px", fontWeight: "bold", color: "#dc2626", backgroundColor: "#fef2f2", padding: "12px", borderRadius: "6px", textAlign: "center" as const, border: "2px solid #fecaca" };
const hr = { borderColor: "#e5e5e5", margin: "20px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const };
