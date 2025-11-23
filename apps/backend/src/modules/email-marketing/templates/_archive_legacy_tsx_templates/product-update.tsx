import { Body, Button, Container, Head, Html, Preview, Section, Text, Heading, Hr, Link } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface ProductUpdateEmailProps {
  userName?: string;
  version?: string;
  releaseDate?: string;
  updateType?: "major" | "minor" | "patch";
  newFeatures?: string[];
  improvements?: string[];
  bugFixes?: string[];
  changelogUrl?: string;
  updateUrl?: string;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: { address: string; phone: string; email: string };
    socialMedia: { [key: string]: string };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const ProductUpdateEmail = ({
  userName = "Ahmet Yılmaz",
  version = "2.5.0",
  releaseDate = "29 Ekim 2025",
  updateType = "minor",
  newFeatures = [
    "Dark mode desteği",
    "Real-time collaboration",
    "Advanced filtering options"
  ],
  improvements = [
    "Dashboard yükleme hızı %40 arttı",
    "Mobile responsive iyileştirmeler",
    "Email preview optimizasyonu"
  ],
  bugFixes = [
    "Subscriber import hatası düzeltildi",
    "Safari uyumluluk sorunu giderildi",
    "Email tracking bug fix"
  ],
  changelogUrl = `${baseUrl}/changelog`,
  updateUrl = `${baseUrl}/update`,
  siteSettings,
}: ProductUpdateEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  const updateTypeLabels = {
    major: { label: "🚀 BÜYÜK GÜNCELLEME", color: "#dc2626" },
    minor: { label: "✨ YENİ ÖZELLİKLER", color: "#f59e0b" },
    patch: { label: "🔧 İYİLEŞTİRMELER", color: "#10b981" }
  };

  const updateInfo = updateTypeLabels[updateType];

  return (
    <Html>
      <Head />
      <Preview>v{version} Güncellemesi - {updateInfo.label}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <div style={{ ...badge, backgroundColor: updateInfo.color }}>
              {updateInfo.label}
            </div>
            <Heading style={heading}>v{version}</Heading>
            <Text style={headerSubtitle}>{releaseDate}</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              Platformumuza yeni güncellemeler yayınladık! İşte v{version} ile gelen yenilikler:
            </Text>

            {/* New Features */}
            {newFeatures.length > 0 && (
              <Section style={sectionBox}>
                <Text style={sectionTitle}>🎉 Yeni Özellikler</Text>
                <Hr style={hr} />
                {newFeatures.map((feature, index) => (
                  <Text key={index} style={listItem}>
                    ✅ {feature}
                  </Text>
                ))}
              </Section>
            )}

            {/* Improvements */}
            {improvements.length > 0 && (
              <Section style={{ ...sectionBox, backgroundColor: "#f0fdf4" }}>
                <Text style={{ ...sectionTitle, color: "#16a34a" }}>⚡ İyileştirmeler</Text>
                <Hr style={hr} />
                {improvements.map((improvement, index) => (
                  <Text key={index} style={listItem}>
                    📈 {improvement}
                  </Text>
                ))}
              </Section>
            )}

            {/* Bug Fixes */}
            {bugFixes.length > 0 && (
              <Section style={{ ...sectionBox, backgroundColor: "#fef2f2" }}>
                <Text style={{ ...sectionTitle, color: "#dc2626" }}>🐛 Hata Düzeltmeleri</Text>
                <Hr style={hr} />
                {bugFixes.map((bugFix, index) => (
                  <Text key={index} style={listItem}>
                    🔧 {bugFix}
                  </Text>
                ))}
              </Section>
            )}

            <Section style={ctaBox}>
              <Text style={ctaText}>
                Güncellemeler otomatik olarak uygulanacaktır. Değişiklik log'unun tamamını görmek için:
              </Text>
              <Button style={button} href={changelogUrl}>
                Detaylı Changelog'u Gör
              </Button>
            </Section>

            <Section style={noteBox}>
              <Text style={noteTitle}>📢 Önemli Not</Text>
              <Text style={noteText}>
                Güncelleme sonrası tarayıcınızı yenilemeniz gerekebilir (Ctrl+F5 veya Cmd+Shift+R).
              </Text>
            </Section>

            <Hr style={hr} />
            <Text style={footer}>
              Sorularınız için {' '}
              <Link href={`mailto:${contactInfo.email}`} style={link}>
                destek ekibimizle iletişime geçebilirsiniz
              </Link>.<br />
              {companyName} Geliştirme Ekibi
            </Text>
          </Section>

          <EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default ProductUpdateEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", padding: "40px 30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const badge = { color: "#ffffff", fontSize: "11px", fontWeight: "bold", padding: "6px 12px", borderRadius: "4px", display: "inline-block", marginBottom: "12px", textTransform: "uppercase" as const, letterSpacing: "1px" };
const heading = { fontSize: "48px", fontWeight: "bold", color: "#ffffff", margin: "12px 0 8px 0", fontFamily: "monospace" };
const headerSubtitle = { fontSize: "14px", color: "#ffffff", opacity: 0.9, margin: "0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const sectionBox = { backgroundColor: "#f0f9ff", padding: "20px 24px", borderRadius: "8px", margin: "20px 0", borderLeft: "4px solid #3b82f6" };
const sectionTitle = { fontSize: "16px", fontWeight: "bold", color: "#3b82f6", marginBottom: "12px" };
const listItem = { fontSize: "15px", lineHeight: "28px", color: "#333", margin: "8px 0" };
const ctaBox = { backgroundColor: "#f9fafb", padding: "24px", borderRadius: "8px", margin: "24px 0", textAlign: "center" as const };
const ctaText = { fontSize: "15px", lineHeight: "24px", color: "#666", marginBottom: "16px" };
const button = { backgroundColor: "#6366f1", borderRadius: "6px", color: "#fff", fontSize: "16px", fontWeight: "bold", textDecoration: "none", padding: "14px 32px", display: "inline-block" };
const noteBox = { backgroundColor: "#fffbeb", padding: "16px 20px", borderRadius: "6px", margin: "24px 0", border: "1px solid #fde68a" };
const noteTitle = { fontSize: "14px", fontWeight: "bold", color: "#92400e", marginBottom: "8px" };
const noteText = { fontSize: "14px", lineHeight: "22px", color: "#78350f", margin: "0" };
const hr = { borderColor: "#e5e5e5", margin: "16px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const };
const link = { color: "#6366f1", textDecoration: "underline" };
