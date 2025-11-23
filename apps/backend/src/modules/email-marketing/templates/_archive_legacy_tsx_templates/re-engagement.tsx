import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface ReEngagementEmailProps {
  userName?: string;
  daysSinceLastLogin?: number;
  lastActivityDate?: string;
  specialOfferCode?: string;
  returnUrl?: string;
  feedbackUrl?: string;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: {
      address: string;
      phone: string;
      email: string;
    };
    socialMedia: {
      [key: string]: string;
    };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const ReEngagementEmail = ({
  userName = "Ahmet Yılmaz",
  daysSinceLastLogin = 30,
  lastActivityDate = "15 Eylül 2024",
  specialOfferCode = "COMEBACK20",
  returnUrl = `${baseUrl}/dashboard`,
  feedbackUrl = `${baseUrl}/feedback`,
  siteSettings,
}: ReEngagementEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const logoUrl = siteSettings?.logoUrl || `${baseUrl}/logo.png`;
  const contactInfo = siteSettings?.contact || {
    email: 'destek@aluplan.tr',
    phone: '',
    address: ''
  };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  const previewText = `Sizi özledik! ${companyName}'a geri dönün`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={heading}>Sizi Özledik! 💙</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              En son <strong>{daysSinceLastLogin} gün önce</strong> ({lastActivityDate})
              görüştük ve sizi gerçekten özledik!
            </Text>

            <Text style={paragraph}>
              {companyName}'da birçok yenilik gerçekleştirdik ve sizinle
              paylaşmak için sabırsızlanıyoruz.
            </Text>

            {/* What's New Section */}
            <Section style={whatsNewBox}>
              <Text style={boxLabel}>🎯 Yeniliklerimiz:</Text>
              <Hr style={hr} />

              <Text style={featureItem}>
                <strong>✨ Yeni Özellikler:</strong> Gelişmiş analitik araçlar
              </Text>
              <Text style={featureItem}>
                <strong>🚀 Performans:</strong> %40 daha hızlı yükleme
              </Text>
              <Text style={featureItem}>
                <strong>🎨 Tasarım:</strong> Modern kullanıcı arayüzü
              </Text>
              <Text style={featureItem}>
                <strong>📱 Mobil:</strong> Geliştirilmiş mobil deneyim
              </Text>
            </Section>

            {/* Special Offer */}
            <Section style={offerBox}>
              <Text style={offerLabel}>🎁 Özel Teklifimiz</Text>
              <Hr style={hr} />
              <Text style={offerText}>
                Geri dönüşünüzü kutlamak için sizin için özel bir indirim hazırladık:
              </Text>
              <Text style={promoCode}>
                {specialOfferCode}
              </Text>
              <Text style={offerDetails}>
                <strong>%20 İndirim</strong> - Tüm premium özelliklerde geçerli
              </Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={returnUrl}>
                Geri Dön ve Keşfet
              </Button>
            </Section>

            <Text style={paragraph}>
              Ayrılmanızın bir sebebi varsa, bunu öğrenmek isteriz.
              Geri bildiriminiz bizim için çok değerli:
            </Text>

            <Section style={buttonContainer}>
              <Button style={secondaryButton} href={feedbackUrl}>
                Geri Bildirim Gönder
              </Button>
            </Section>

            <Text style={noteText}>
              <strong>Not:</strong> Bu özel indirim kodu 7 gün boyunca geçerlidir.
              Kaçırmayın!
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Sizi tekrar aramızda görmek için sabırsızlanıyoruz! ❤️<br />
              {companyName} Ekibi
            </Text>
          </Section>

          {/* Footer */}
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

export default ReEngagementEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  padding: "40px 30px",
  textAlign: "center" as const,
  borderRadius: "8px 8px 0 0",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0",
};

const content = {
  padding: "30px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
  marginBottom: "16px",
};

const whatsNewBox = {
  backgroundColor: "#f0f4ff",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
  borderLeft: "4px solid #667eea",
};

const boxLabel = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#667eea",
  marginBottom: "12px",
};

const featureItem = {
  fontSize: "15px",
  lineHeight: "28px",
  color: "#333",
  margin: "8px 0",
};

const offerBox = {
  backgroundColor: "#fff8e1",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
  borderLeft: "4px solid #f59e0b",
  textAlign: "center" as const,
};

const offerLabel = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#f59e0b",
  marginBottom: "12px",
};

const offerText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#333",
  margin: "12px 0",
};

const promoCode = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#f59e0b",
  letterSpacing: "2px",
  margin: "16px 0",
  padding: "12px 24px",
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  border: "2px dashed #f59e0b",
  display: "inline-block",
};

const offerDetails = {
  fontSize: "14px",
  color: "#666",
  margin: "12px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button = {
  backgroundColor: "#667eea",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
  width: "100%",
  maxWidth: "300px",
};

const secondaryButton = {
  backgroundColor: "#ffffff",
  border: "2px solid #667eea",
  borderRadius: "6px",
  color: "#667eea",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "10px 24px",
  width: "100%",
  maxWidth: "250px",
};

const noteText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#666",
  backgroundColor: "#fef3c7",
  padding: "16px",
  borderRadius: "6px",
  margin: "24px 0",
  borderLeft: "3px solid #f59e0b",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "16px 0",
};

const footer = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#666",
  marginTop: "24px",
  textAlign: "center" as const,
};
