import { Body, Button, Container, Head, Html, Preview, Section, Text, Heading, Hr } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface UpsellEmailProps {
  userName?: string;
  currentPlan?: string;
  upgradePlan?: string;
  currentPrice?: string;
  upgradePrice?: string;
  savingsPercent?: number;
  features?: string[];
  upgradeUrl?: string;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: { address: string; phone: string; email: string };
    socialMedia: { [key: string]: string };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const UpsellEmail = ({
  userName = "Ahmet Yılmaz",
  currentPlan = "Standart Plan",
  upgradePlan = "Premium Plan",
  currentPrice = "99 TL/ay",
  upgradePrice = "149 TL/ay",
  savingsPercent = 25,
  features = [
    "Sınırsız email gönderimi",
    "Gelişmiş A/B testing",
    "AI-powered segmentation",
    "Öncelikli destek",
    "Custom reporting",
    "API erişimi"
  ],
  upgradeUrl = `${baseUrl}/upgrade`,
  siteSettings,
}: UpsellEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>{upgradePlan} ile tam potansiyelinizi açığa çıkarın!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>⬆️ Yükseltme Zamanı!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              <strong>{currentPlan}</strong> ile harika işler yapıyorsunuz!
              Ancak <strong>{upgradePlan}</strong> ile işinizi bir üst seviyeye taşıyabilirsiniz.
            </Text>

            <Section style={comparisonBox}>
              <div style={planComparison}>
                <div style={currentPlanBox}>
                  <Text style={planLabel}>Mevcut Planınız</Text>
                  <Text style={planName}>{currentPlan}</Text>
                  <Text style={planPrice}>{currentPrice}</Text>
                </div>

                <div style={arrow}>→</div>

                <div style={upgradePlanBox}>
                  <Text style={planLabel}>Yükseltme Fırsatı</Text>
                  <Text style={planName}>{upgradePlan}</Text>
                  <Text style={planPrice}>{upgradePrice}</Text>
                  <div style={savingsBadge}>
                    %{savingsPercent} İndirim!
                  </div>
                </div>
              </div>
            </Section>

            <Section style={featuresBox}>
              <Text style={featuresTitle}>🚀 Premium Özellikler</Text>
              <Hr style={hr} />

              {features.map((feature, index) => (
                <Text key={index} style={featureItem}>
                  ✅ {feature}
                </Text>
              ))}
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={upgradeUrl}>
                Hemen Yükselt
              </Button>
            </Section>

            <Text style={guarantee}>
              💯 30 Gün Para İade Garantisi
            </Text>

            <Hr style={hr} />
            <Text style={footer}>
              Sorularınız için destek ekibimiz her zaman yanınızda!<br />
              {companyName}
            </Text>
          </Section>

          <EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default UpsellEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", padding: "30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const heading = { fontSize: "32px", fontWeight: "bold", color: "#ffffff", margin: "0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const comparisonBox = { backgroundColor: "#faf5ff", padding: "24px", borderRadius: "12px", margin: "24px 0", border: "2px solid #7c3aed" };
const planComparison = { display: "flex", justifyContent: "space-around", alignItems: "center", gap: "16px" };
const currentPlanBox = { textAlign: "center" as const, flex: 1 };
const upgradePlanBox = { textAlign: "center" as const, flex: 1, backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px", border: "2px solid #7c3aed" };
const arrow = { fontSize: "32px", color: "#7c3aed", fontWeight: "bold" };
const planLabel = { fontSize: "12px", color: "#666", textTransform: "uppercase" as const, marginBottom: "8px" };
const planName = { fontSize: "18px", fontWeight: "bold", color: "#333", margin: "8px 0" };
const planPrice = { fontSize: "24px", fontWeight: "bold", color: "#7c3aed", margin: "8px 0" };
const savingsBadge = { backgroundColor: "#10b981", color: "#ffffff", fontSize: "12px", fontWeight: "bold", padding: "4px 12px", borderRadius: "12px", display: "inline-block", marginTop: "8px" };
const featuresBox = { backgroundColor: "#f0f9ff", padding: "24px", borderRadius: "8px", margin: "24px 0" };
const featuresTitle = { fontSize: "18px", fontWeight: "bold", color: "#333", marginBottom: "16px" };
const featureItem = { fontSize: "15px", lineHeight: "28px", color: "#333", margin: "8px 0" };
const buttonContainer = { textAlign: "center" as const, margin: "32px 0" };
const button = { backgroundColor: "#7c3aed", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "bold", textDecoration: "none", padding: "16px 48px", display: "inline-block", boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)" };
const guarantee = { fontSize: "15px", color: "#10b981", fontWeight: "bold", textAlign: "center" as const, backgroundColor: "#d1fae5", padding: "12px", borderRadius: "6px", border: "1px solid #86efac" };
const hr = { borderColor: "#e5e5e5", margin: "16px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const };
