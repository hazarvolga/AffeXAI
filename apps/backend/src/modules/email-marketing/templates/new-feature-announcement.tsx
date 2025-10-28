import { Body, Button, Container, Head, Html, Preview, Section, Text, Heading, Hr } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface NewFeatureAnnouncementEmailProps {
  userName?: string;
  featureName?: string;
  featureDescription?: string;
  featureImage?: string;
  benefits?: string[];
  demoUrl?: string;
  docsUrl?: string;
  releaseDate?: string;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: { address: string; phone: string; email: string };
    socialMedia: { [key: string]: string };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const NewFeatureAnnouncementEmail = ({
  userName = "Ahmet Yılmaz",
  featureName = "AI Email Composer",
  featureDescription = "Yapay zeka destekli email yazım asistanı ile dakikalar içinde profesyonel emailler oluşturun. GPT-4 teknolojisi ile kişiselleştirilmiş, etkileyici içerikler yaratın.",
  featureImage = `${baseUrl}/features/ai-composer.jpg`,
  benefits = [
    "⚡ 10x daha hızlı email yazımı",
    "🎨 Profesyonel içerik kalitesi",
    "🌍 Çoklu dil desteği (30+ dil)",
    "📊 A/B test önerileri",
    "🎯 Segment bazlı kişiselleştirme"
  ],
  demoUrl = `${baseUrl}/demo/ai-composer`,
  docsUrl = `${baseUrl}/docs/ai-composer`,
  releaseDate = "29 Ekim 2025",
  siteSettings,
}: NewFeatureAnnouncementEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>Yeni Özellik: {featureName} - Şimdi Kullanılabilir!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <div style={badge}>🆕 YENİ ÖZELLİK</div>
            <Heading style={heading}>{featureName}</Heading>
            <Text style={headerSubtitle}>{releaseDate} tarihinden itibaren aktif!</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              Heyecan verici bir haberimiz var! Yeni özelliğimiz <strong>{featureName}</strong>
              şimdi tüm kullanıcılar için kullanılabilir durumda.
            </Text>

            {featureImage && (
              <Section style={imageSection}>
                <img src={featureImage} alt={featureName} style={featureImageStyle} />
              </Section>
            )}

            <Section style={descriptionBox}>
              <Text style={descriptionText}>{featureDescription}</Text>
            </Section>

            <Section style={benefitsBox}>
              <Text style={benefitsTitle}>✨ Neler Kazanıyorsunuz?</Text>
              <Hr style={hr} />

              {benefits.map((benefit, index) => (
                <Text key={index} style={benefitItem}>
                  {benefit}
                </Text>
              ))}
            </Section>

            <Section style={ctaSection}>
              <div style={ctaGrid}>
                <Button style={primaryButton} href={demoUrl}>
                  🚀 Hemen Deneyin
                </Button>
                <Button style={secondaryButton} href={docsUrl}>
                  📖 Dokümantasyon
                </Button>
              </div>
            </Section>

            <Section style={tipBox}>
              <Text style={tipTitle}>💡 İpucu</Text>
              <Text style={tipText}>
                İlk kullanımda rehberli tur ile özelliği adım adım keşfedin.
                Sorularınız için destek ekibimiz her zaman yanınızda!
              </Text>
            </Section>

            <Hr style={hr} />
            <Text style={footer}>
              Geri bildirimlerinizi bekliyoruz!<br />
              {companyName} Ürün Ekibi
            </Text>
          </Section>

          <EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default NewFeatureAnnouncementEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", padding: "40px 30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const badge = { backgroundColor: "#ffffff", color: "#f59e0b", fontSize: "12px", fontWeight: "bold", padding: "6px 16px", borderRadius: "20px", display: "inline-block", marginBottom: "16px", textTransform: "uppercase" as const };
const heading = { fontSize: "32px", fontWeight: "bold", color: "#ffffff", margin: "16px 0 8px 0" };
const headerSubtitle = { fontSize: "14px", color: "#ffffff", opacity: 0.9, margin: "0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const imageSection = { textAlign: "center" as const, margin: "24px 0" };
const featureImageStyle = { width: "100%", maxWidth: "500px", height: "auto", borderRadius: "12px", border: "1px solid #e5e7eb" };
const descriptionBox = { backgroundColor: "#fffbeb", padding: "20px", borderRadius: "8px", margin: "24px 0", borderLeft: "4px solid #f59e0b" };
const descriptionText = { fontSize: "16px", lineHeight: "26px", color: "#333", margin: "0", fontWeight: "500" };
const benefitsBox = { backgroundColor: "#f0f9ff", padding: "24px", borderRadius: "8px", margin: "24px 0" };
const benefitsTitle = { fontSize: "18px", fontWeight: "bold", color: "#333", marginBottom: "16px" };
const benefitItem = { fontSize: "15px", lineHeight: "28px", color: "#333", margin: "8px 0" };
const ctaSection = { margin: "32px 0" };
const ctaGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" };
const primaryButton = { backgroundColor: "#f59e0b", borderRadius: "6px", color: "#fff", fontSize: "16px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, padding: "14px 24px", display: "block" };
const secondaryButton = { backgroundColor: "#ffffff", border: "2px solid #f59e0b", borderRadius: "6px", color: "#f59e0b", fontSize: "16px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, padding: "12px 24px", display: "block" };
const tipBox = { backgroundColor: "#fef3c7", padding: "16px 20px", borderRadius: "8px", margin: "24px 0", border: "1px solid #fde68a" };
const tipTitle = { fontSize: "14px", fontWeight: "bold", color: "#92400e", marginBottom: "8px" };
const tipText = { fontSize: "14px", lineHeight: "22px", color: "#78350f", margin: "0" };
const hr = { borderColor: "#e5e5e5", margin: "20px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const };
