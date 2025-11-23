import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface WelcomeEmailProps {
  userName?: string;
  userEmail?: string;
  loginUrl?: string;
  gettingStartedUrl?: string;
  supportUrl?: string;
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

export const WelcomeEmail = ({
  userName = "Ahmet Yılmaz",
  userEmail = "ahmet@example.com",
  loginUrl = `${baseUrl}/login`,
  gettingStartedUrl = `${baseUrl}/getting-started`,
  supportUrl = `${baseUrl}/support`,
  siteSettings,
}: WelcomeEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const logoUrl = siteSettings?.logoUrl || `${baseUrl}/logo.png`;
  const contactInfo = siteSettings?.contact || {
    email: 'destek@aluplan.tr',
    phone: '',
    address: ''
  };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  const previewText = `${companyName}'a hoş geldiniz!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={heading}>{companyName}</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading as="h2" style={h2}>
              Hoş Geldiniz! 🎉
            </Heading>

            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              {companyName} ailesine katıldığınız için teşekkür ederiz!
              Hesabınız başarıyla oluşturuldu ve artık tüm hizmetlerimize erişebilirsiniz.
            </Text>

            {/* Welcome Box */}
            <Section style={welcomeBox}>
              <Text style={welcomeLabel}>Hesap Bilgileriniz:</Text>
              <Hr style={hr} />
              <Text style={infoItem}>
                <strong>E-posta:</strong> {userEmail}
              </Text>
              <Text style={infoItem}>
                <strong>Hesap Türü:</strong> Standart Üyelik
              </Text>
            </Section>

            <Text style={paragraph}>
              Hemen başlamak için aşağıdaki adımları takip edebilirsiniz:
            </Text>

            {/* Steps */}
            <Section style={stepsSection}>
              <Text style={stepItem}>
                <strong>1.</strong> Profil bilgilerinizi tamamlayın
              </Text>
              <Text style={stepItem}>
                <strong>2.</strong> İlk projenizi oluşturun
              </Text>
              <Text style={stepItem}>
                <strong>3.</strong> Özelliklerimizi keşfedin
              </Text>
            </Section>

            {/* CTA Buttons */}
            <Section style={buttonContainer}>
              <Button style={primaryButton} href={loginUrl}>
                Hesabıma Giriş Yap
              </Button>
            </Section>

            <Section style={buttonContainer}>
              <Button style={secondaryButton} href={gettingStartedUrl}>
                Başlangıç Rehberi
              </Button>
            </Section>

            <Text style={noteText}>
              <strong>İpucu:</strong> Herhangi bir sorunuz olursa, destek ekibimiz
              size yardımcı olmaktan mutluluk duyacaktır. {' '}
              <Link href={supportUrl} style={link}>
                Destek Merkezi
              </Link>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Keyifli kullanımlar dileriz!<br />
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

export default WelcomeEmail;

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
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "30px",
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

const h2 = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
  marginBottom: "16px",
};

const welcomeBox = {
  backgroundColor: "#f0f4ff",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
  borderLeft: "4px solid #667eea",
};

const welcomeLabel = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#667eea",
  marginBottom: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const infoItem = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#333",
  margin: "8px 0",
};

const stepsSection = {
  backgroundColor: "#f9f9f9",
  padding: "20px 24px",
  borderRadius: "8px",
  margin: "24px 0",
};

const stepItem = {
  fontSize: "15px",
  lineHeight: "28px",
  color: "#333",
  margin: "8px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "16px 0",
};

const primaryButton = {
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
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
  width: "100%",
  maxWidth: "300px",
};

const noteText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#666",
  backgroundColor: "#fffbeb",
  padding: "16px",
  borderRadius: "6px",
  margin: "24px 0",
  borderLeft: "3px solid #f59e0b",
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
};

const link = {
  color: "#667eea",
  textDecoration: "underline",
};
