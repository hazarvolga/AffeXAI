import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface BirthdaySpecialEmailProps {
  userName?: string;
  birthdayDate?: string;
  giftCode?: string;
  discountPercent?: number;
  expiryDays?: number;
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

export const BirthdaySpecialEmail = ({
  userName = "Ahmet Yılmaz",
  birthdayDate = "28 Ekim",
  giftCode = "BIRTHDAY2025",
  discountPercent = 25,
  expiryDays = 7,
  shopUrl = `${baseUrl}/shop`,
  siteSettings,
}: BirthdaySpecialEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>Doğum günün kutlu olsun! Sana özel hediyemiz var 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>🎂 Doğum Günün Kutlu Olsun!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Sevgili <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              <strong>{birthdayDate}</strong> tarihindeki doğum gününü kutlamak için
              sana özel bir hediye hazırladık! 🎁
            </Text>

            <Section style={celebrationBox}>
              <Text style={celebrationEmoji}>🎉🎈🎊</Text>
              <Text style={celebrationText}>
                Doğum Günün Kutlu Olsun!
              </Text>
              <Text style={celebrationEmoji}>🎂🎁🥳</Text>
            </Section>

            <Section style={giftBox}>
              <Text style={giftLabel}>🎁 Doğum Günü Hediyeniz</Text>
              <Hr style={hr} />
              <Text style={giftPercentage}>%{discountPercent}</Text>
              <Text style={giftSubtitle}>İNDİRİM</Text>
              <Text style={giftDescription}>Tüm ürünlerde geçerli</Text>

              <Section style={codeBox}>
                <Text style={codeLabel}>Hediye Kodunuz:</Text>
                <Text style={code}>{giftCode}</Text>
              </Section>

              <Text style={expiryText}>
                ⏰ {expiryDays} gün boyunca geçerli
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={shopUrl}>
                Hediyemi Kullan
              </Button>
            </Section>

            <Section style={wishBox}>
              <Text style={wishText}>
                Bu özel günde mutluluk dolu anlar dileriz! 💝<br />
                Yeni yaşın sağlık, mutluluk ve başarılarla dolu olsun.
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Seni her zaman aramızda görmekten mutluluk duyuyoruz!<br />
              {companyName} Ailesi
            </Text>
          </Section>

          <EmailFooter
            companyName={companyName}
            contactInfo={contactInfo}
            socialMediaLinks={socialMediaLinks}
            baseUrl={baseUrl}
          />
        </Container>
      </Body>
    </Html>
  );
};

export default BirthdaySpecialEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", padding: "50px 30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const heading = { fontSize: "36px", fontWeight: "bold", color: "#ffffff", margin: "0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const celebrationBox = { textAlign: "center" as const, margin: "32px 0", padding: "24px", backgroundColor: "#fef3f2", borderRadius: "12px" };
const celebrationEmoji = { fontSize: "48px", margin: "8px 0" };
const celebrationText = { fontSize: "28px", fontWeight: "bold", color: "#f5576c", margin: "16px 0" };
const giftBox = { backgroundColor: "#fff5f7", border: "3px solid #f5576c", padding: "32px", borderRadius: "16px", margin: "32px 0", textAlign: "center" as const };
const giftLabel = { fontSize: "20px", fontWeight: "bold", color: "#f5576c", marginBottom: "16px" };
const giftPercentage = { fontSize: "72px", fontWeight: "bold", color: "#f5576c", margin: "16px 0", lineHeight: "1" };
const giftSubtitle = { fontSize: "24px", fontWeight: "bold", color: "#f5576c", margin: "0 0 8px 0", letterSpacing: "2px" };
const giftDescription = { fontSize: "16px", color: "#666", margin: "8px 0 24px 0" };
const codeBox = { backgroundColor: "#ffffff", border: "2px dashed #f5576c", borderRadius: "8px", padding: "16px", margin: "16px 0" };
const codeLabel = { fontSize: "14px", color: "#666", margin: "0 0 8px 0" };
const code = { fontSize: "24px", fontWeight: "bold", color: "#f5576c", letterSpacing: "2px", margin: "0" };
const expiryText = { fontSize: "14px", color: "#999", marginTop: "16px" };
const buttonContainer = { textAlign: "center" as const, margin: "32px 0" };
const button = { backgroundColor: "#f5576c", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "16px 48px", boxShadow: "0 4px 12px rgba(245, 87, 108, 0.3)" };
const wishBox = { backgroundColor: "#fef3f2", padding: "24px", borderRadius: "12px", margin: "24px 0", border: "2px solid #fecaca" };
const wishText = { fontSize: "16px", lineHeight: "26px", color: "#333", textAlign: "center" as const, margin: "0" };
const hr = { borderColor: "#e5e5e5", margin: "20px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", marginTop: "24px", textAlign: "center" as const };
