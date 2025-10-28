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

interface WinBackEmailProps {
  userName?: string;
  monthsSinceLastPurchase?: number;
  lastPurchaseDate?: string;
  specialDiscountPercent?: number;
  discountCode?: string;
  returnUrl?: string;
  unsubscribeUrl?: string;
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

export const WinBackEmail = ({
  userName = "Ahmet Yılmaz",
  monthsSinceLastPurchase = 6,
  lastPurchaseDate = "15 Nisan 2024",
  specialDiscountPercent = 30,
  discountCode = "WELCOME_BACK30",
  returnUrl = `${baseUrl}/shop`,
  unsubscribeUrl = `${baseUrl}/unsubscribe`,
  siteSettings,
}: WinBackEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const logoUrl = siteSettings?.logoUrl || `${baseUrl}/logo.png`;
  const contactInfo = siteSettings?.contact || {
    email: 'destek@aluplan.tr',
    phone: '',
    address: ''
  };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  const previewText = `${companyName} - Özel dönüş hediyeniz sizi bekliyor!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={heading}>Geri Dönün! 🎁</Heading>
            <Text style={headerSubtitle}>
              Sizin için özel bir teklifimiz var
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>
              Sevgili <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              Son alışverişinizden bu yana {monthsSinceLastPurchase} ay geçti
              ({lastPurchaseDate}) ve sizi çok özledik!
            </Text>

            <Text style={paragraph}>
              Belki hayat yoğundu, belki başka öncelikleriniz vardı.
              Ama biliyoruz ki bir gün tekrar bizimle alışveriş yapmak istersiniz.
            </Text>

            {/* Special Offer Hero */}
            <Section style={heroBox}>
              <Text style={heroTitle}>
                🎉 Özel Dönüş Hediyeniz
              </Text>
              <Hr style={hr} />
              <Text style={heroPercentage}>
                %{specialDiscountPercent}
              </Text>
              <Text style={heroSubtitle}>
                İNDİRİM
              </Text>
              <Text style={heroDescription}>
                Tüm ürünlerimizde geçerli
              </Text>

              <Section style={codeBox}>
                <Text style={codeLabel}>İndirim Kodunuz:</Text>
                <Text style={code}>{discountCode}</Text>
              </Section>
            </Section>

            {/* Why Come Back */}
            <Section style={reasonsBox}>
              <Text style={boxTitle}>Neden Geri Dönmelisiniz?</Text>
              <Hr style={hr} />

              <Text style={reasonItem}>
                ✨ <strong>Yeni Ürünler:</strong> Sizin beğeneceğiniz birçok yeni ürün ekledik
              </Text>
              <Text style={reasonItem}>
                🚚 <strong>Ücretsiz Kargo:</strong> Tüm siparişlerde ücretsiz kargo
              </Text>
              <Text style={reasonItem}>
                💝 <strong>Sadakat Programı:</strong> Her alışverişte puan kazanın
              </Text>
              <Text style={reasonItem}>
                📞 <strong>7/24 Destek:</strong> Her zaman yanınızdayız
              </Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={returnUrl}>
                İndirimimi Kullan
              </Button>
            </Section>

            <Text style={urgencyText}>
              ⏰ Bu özel teklif sadece <strong>10 gün</strong> boyunca geçerlidir!
            </Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              Eğer artık bizden e-posta almak istemiyorsanız, anlayışla karşılıyoruz.
              Buradan {' '}
              <Link href={unsubscribeUrl} style={link}>
                abonelikten çıkabilirsiniz
              </Link>.
            </Text>

            <Text style={footer}>
              Sizi tekrar görmek için sabırsızlanıyoruz!<br />
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

export default WinBackEmail;

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
  background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  padding: "40px 30px",
  textAlign: "center" as const,
  borderRadius: "8px 8px 0 0",
};

const heading = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const headerSubtitle = {
  fontSize: "16px",
  color: "#ffffff",
  opacity: 0.95,
  margin: "8px 0 0 0",
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

const heroBox = {
  backgroundColor: "#fef3f2",
  border: "2px solid #fca5a5",
  padding: "32px",
  borderRadius: "12px",
  margin: "32px 0",
  textAlign: "center" as const,
};

const heroTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#dc2626",
  margin: "0 0 16px 0",
};

const heroPercentage = {
  fontSize: "72px",
  fontWeight: "bold",
  color: "#dc2626",
  margin: "16px 0",
  lineHeight: "1",
};

const heroSubtitle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#dc2626",
  margin: "0 0 8px 0",
  letterSpacing: "2px",
};

const heroDescription = {
  fontSize: "16px",
  color: "#666",
  margin: "8px 0 24px 0",
};

const codeBox = {
  backgroundColor: "#ffffff",
  border: "2px dashed #dc2626",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0 0 0",
};

const codeLabel = {
  fontSize: "14px",
  color: "#666",
  margin: "0 0 8px 0",
};

const code = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#dc2626",
  letterSpacing: "2px",
  margin: "0",
};

const reasonsBox = {
  backgroundColor: "#f0f9ff",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
  borderLeft: "4px solid #3b82f6",
};

const boxTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#3b82f6",
  marginBottom: "16px",
};

const reasonItem = {
  fontSize: "15px",
  lineHeight: "28px",
  color: "#333",
  margin: "12px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#dc2626",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 48px",
  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
};

const urgencyText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#dc2626",
  backgroundColor: "#fef2f2",
  padding: "12px 16px",
  borderRadius: "6px",
  margin: "24px 0",
  textAlign: "center" as const,
  border: "1px solid #fecaca",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
};

const footer = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#666",
  marginTop: "24px",
  textAlign: "center" as const,
};

const link = {
  color: "#667eea",
  textDecoration: "underline",
};
