import { Body, Button, Container, Head, Html, Preview, Section, Text, Heading, Hr } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface PriceDropAlertEmailProps {
  userName?: string;
  productName?: string;
  productImage?: string;
  oldPrice?: string;
  newPrice?: string;
  savings?: string;
  savingsPercent?: number;
  productUrl?: string;
  expiryDate?: string;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: { address: string; phone: string; email: string };
    socialMedia: { [key: string]: string };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const PriceDropAlertEmail = ({
  userName = "Ahmet Yılmaz",
  productName = "Premium Laptop Stand",
  productImage = `${baseUrl}/products/laptop-stand.jpg`,
  oldPrice = "599 TL",
  newPrice = "399 TL",
  savings = "200 TL",
  savingsPercent = 33,
  productUrl = `${baseUrl}/products/laptop-stand`,
  expiryDate = "31 Ekim 2025",
  siteSettings,
}: PriceDropAlertEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>Fiyat Düştü! {productName} - {savingsPercent}% İndirim</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>📉 Fiyat Düştü!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              İlgilendiğiniz <strong>{productName}</strong> ürününde fiyat düşüşü oldu!
            </Text>

            <Section style={productBox}>
              <img src={productImage} alt={productName} style={productImage as any} />
              <Text style={productName as any}>{productName}</Text>

              <div style={priceSection}>
                <div>
                  <Text style={oldPriceLabel}>Eski Fiyat:</Text>
                  <Text style={oldPrice as any}>{oldPrice}</Text>
                </div>
                <div style={arrow}>→</div>
                <div>
                  <Text style={newPriceLabel}>Yeni Fiyat:</Text>
                  <Text style={newPrice as any}>{newPrice}</Text>
                </div>
              </div>

              <Section style={savingsBox}>
                <Text style={savingsText}>
                  💰 <strong>{savings}</strong> TASARRUF EDİN (%{savingsPercent})
                </Text>
              </Section>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={productUrl}>
                Hemen Satın Al
              </Button>
            </Section>

            <Text style={urgency}>
              ⏰ Bu fiyat <strong>{expiryDate}</strong> tarihine kadar geçerlidir!
            </Text>

            <Hr style={hr} />
            <Text style={footer}>
              Stoklar tükenmeden acele edin!<br />
              {companyName}
            </Text>
          </Section>

          <EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default PriceDropAlertEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", padding: "30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const heading = { fontSize: "32px", fontWeight: "bold", color: "#ffffff", margin: "0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const productBox = { backgroundColor: "#f9fafb", padding: "24px", borderRadius: "12px", margin: "24px 0", textAlign: "center" as const };
const productImage = { width: "100%", maxWidth: "400px", height: "auto", borderRadius: "8px", marginBottom: "16px" };
const productName = { fontSize: "20px", fontWeight: "bold", color: "#333", margin: "16px 0" };
const priceSection = { display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", margin: "24px 0" };
const oldPriceLabel = { fontSize: "12px", color: "#999", marginBottom: "4px" };
const oldPrice = { fontSize: "18px", color: "#999", textDecoration: "line-through" };
const arrow = { fontSize: "24px", color: "#10b981" };
const newPriceLabel = { fontSize: "12px", color: "#10b981", marginBottom: "4px" };
const newPrice = { fontSize: "28px", fontWeight: "bold", color: "#10b981" };
const savingsBox = { backgroundColor: "#d1fae5", padding: "16px", borderRadius: "8px", margin: "16px 0", border: "2px solid #10b981" };
const savingsText = { fontSize: "18px", fontWeight: "bold", color: "#065f46", textAlign: "center" as const, margin: "0" };
const buttonContainer = { textAlign: "center" as const, margin: "24px 0" };
const button = { backgroundColor: "#10b981", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "16px 48px" };
const urgency = { fontSize: "15px", color: "#dc2626", backgroundColor: "#fef2f2", padding: "12px", borderRadius: "6px", textAlign: "center" as const, border: "1px solid #fecaca" };
const hr = { borderColor: "#e5e5e5", margin: "20px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const };
