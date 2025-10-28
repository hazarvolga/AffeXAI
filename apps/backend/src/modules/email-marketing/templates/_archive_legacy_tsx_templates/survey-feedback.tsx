import { Body, Button, Container, Head, Html, Preview, Section, Text, Heading, Hr } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface SurveyFeedbackEmailProps {
  userName?: string;
  surveyTitle?: string;
  surveyDescription?: string;
  estimatedTime?: number;
  incentive?: string;
  surveyUrl?: string;
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

export const SurveyFeedbackEmail = ({
  userName = "Ahmet Yılmaz",
  surveyTitle = "2025 Müşteri Memnuniyet Anketi",
  surveyDescription = "Hizmet kalitemizi geliştirmek için görüşleriniz bizim için çok değerli. Kısa bir anket ile deneyiminizi paylaşır mısınız?",
  estimatedTime = 3,
  incentive = "50 TL indirim kuponu kazanın!",
  surveyUrl = `${baseUrl}/survey/customer-satisfaction`,
  expiryDate = "15 Kasım 2025",
  siteSettings,
}: SurveyFeedbackEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>Görüşünüz bizim için değerli! {estimatedTime} dakika süren anketimizi doldurun</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={emoji}>📝</Text>
            <Heading style={heading}>Fikirleriniz Önemli!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              {companyName} olarak size daha iyi hizmet verebilmek için
              sürekli kendimizi geliştiriyoruz. Bu yolculukta en önemli rehberimiz
              sizin geri bildirimleriniz.
            </Text>

            <Section style={surveyBox}>
              <Text style={surveyTitle}>{surveyTitle}</Text>
              <Hr style={hr} />
              <Text style={surveyDescription}>{surveyDescription}</Text>

              <Section style={timeBox}>
                <Text style={timeIcon}>⏱️</Text>
                <Text style={timeText}>Sadece {estimatedTime} dakika sürer</Text>
              </Section>
            </Section>

            {incentive && (
              <Section style={incentiveBox}>
                <Text style={incentiveText}>
                  🎁 <strong>Teşekkür Hediyesi:</strong> {incentive}
                </Text>
              </Section>
            )}

            <Section style={buttonContainer}>
              <Button style={button} href={surveyUrl}>
                Anketi Doldur
              </Button>
            </Section>

            <Section style={questionsBox}>
              <Text style={questionsTitle}>Neleri Soruyoruz?</Text>
              <Hr style={hr} />
              <Text style={questionItem}>
                ⭐ Hizmet kalitemizden memnuniyet dereceniz
              </Text>
              <Text style={questionItem}>
                💬 Ürün/hizmetlerimiz hakkında görüşleriniz
              </Text>
              <Text style={questionItem}>
                🚀 Geliştirmemizi istediğiniz özellikler
              </Text>
              <Text style={questionItem}>
                📊 Genel kullanıcı deneyiminiz
              </Text>
            </Section>

            {expiryDate && (
              <Text style={expiryText}>
                ⏰ Anket <strong>{expiryDate}</strong> tarihine kadar geçerlidir.
              </Text>
            )}

            <Section style={guaranteeBox}>
              <Text style={guaranteeText}>
                🔒 <strong>Gizlilik Garantisi:</strong> Tüm yanıtlarınız anonim olarak
                kaydedilir ve sadece hizmet kalitemizi geliştirmek için kullanılır.
              </Text>
            </Section>

            <Hr style={hr} />
            <Text style={footer}>
              Katılımınız için şimdiden teşekkür ederiz! 🙏<br />
              {companyName} Ekibi
            </Text>
          </Section>

          <EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default SurveyFeedbackEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", padding: "50px 30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const emoji = { fontSize: "64px", margin: "0 0 16px 0" };
const heading = { fontSize: "32px", fontWeight: "bold", color: "#ffffff", margin: "0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const surveyBox = { backgroundColor: "#f0fdf4", padding: "24px", borderRadius: "8px", margin: "24px 0", borderLeft: "4px solid #10b981" };
const surveyTitle = { fontSize: "20px", fontWeight: "bold", color: "#065f46", marginBottom: "16px" };
const surveyDescription = { fontSize: "15px", lineHeight: "24px", color: "#333", margin: "12px 0" };
const timeBox = { display: "flex", alignItems: "center", gap: "8px", margin: "16px 0 0 0", justifyContent: "center" };
const timeIcon = { fontSize: "24px" };
const timeText = { fontSize: "14px", color: "#10b981", fontWeight: "bold" };
const incentiveBox = { backgroundColor: "#fef3c7", padding: "16px 24px", borderRadius: "8px", margin: "24px 0", textAlign: "center" as const, border: "2px solid #f59e0b" };
const incentiveText = { fontSize: "16px", color: "#92400e", margin: "0" };
const buttonContainer = { textAlign: "center" as const, margin: "32px 0" };
const button = { backgroundColor: "#10b981", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "bold", textDecoration: "none", padding: "16px 48px", display: "inline-block", boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)" };
const questionsBox = { backgroundColor: "#f9fafb", padding: "20px 24px", borderRadius: "8px", margin: "24px 0" };
const questionsTitle = { fontSize: "16px", fontWeight: "bold", color: "#333", marginBottom: "12px" };
const questionItem = { fontSize: "15px", lineHeight: "28px", color: "#333", margin: "8px 0" };
const expiryText = { fontSize: "14px", color: "#dc2626", backgroundColor: "#fef2f2", padding: "12px", borderRadius: "6px", textAlign: "center" as const, border: "1px solid #fecaca", margin: "20px 0" };
const guaranteeBox = { backgroundColor: "#eff6ff", padding: "16px 20px", borderRadius: "6px", margin: "24px 0", border: "1px solid #bfdbfe" };
const guaranteeText = { fontSize: "13px", lineHeight: "20px", color: "#1e40af", margin: "0" };
const hr = { borderColor: "#e5e5e5", margin: "16px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const };
