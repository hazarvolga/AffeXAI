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

interface ReferralProgramEmailProps {
  userName?: string;
  referralCode?: string;
  referralUrl?: string;
  referrerReward?: string;
  friendReward?: string;
  currentReferrals?: number;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: { address: string; phone: string; email: string };
    socialMedia: { [key: string]: string };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const ReferralProgramEmail = ({
  userName = "Ahmet Yılmaz",
  referralCode = "AHMET2025",
  referralUrl = `${baseUrl}/ref/AHMET2025`,
  referrerReward = "100 TL",
  friendReward = "50 TL",
  currentReferrals = 3,
  siteSettings,
}: ReferralProgramEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>Arkadaşlarını davet et, {referrerReward} kazan!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>🎁 Arkadaşını Davet Et</Heading>
            <Text style={headerSubtitle}>Hem sen hem arkadaşın kazansın!</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              {companyName}'ı beğendiğiniz için çok mutluyuz! Şimdi bu mutluluğu arkadaşlarınla paylaşmanın zamanı geldi.
            </Text>

            <Section style={rewardBox}>
              <Text style={rewardTitle}>💰 Tavsiye Ödülleri</Text>
              <Hr style={hr} />
              <div style={rewardGrid}>
                <div style={rewardItem}>
                  <Text style={rewardAmount}>{referrerReward}</Text>
                  <Text style={rewardLabel}>Sen Kazanırsın</Text>
                </div>
                <div style={rewardItem}>
                  <Text style={rewardAmount}>{friendReward}</Text>
                  <Text style={rewardLabel}>Arkadaşın Kazanır</Text>
                </div>
              </div>
            </Section>

            <Section style={codeSection}>
              <Text style={codeLabel}>Senin Özel Kod un:</Text>
              <Text style={code}>{referralCode}</Text>
              <Text style={urlLabel}>veya bu linki paylaş:</Text>
              <Link href={referralUrl} style={shareLink}>{referralUrl}</Link>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={referralUrl}>
                Şimdi Davet Et
              </Button>
            </Section>

            <Section style={statsBox}>
              <Text style={statsLabel}>📊 İstatistikleriniz</Text>
              <Hr style={hr} />
              <Text style={statsItem}>
                <strong>{currentReferrals}</strong> arkadaşını davet ettin
              </Text>
              <Text style={statsItem}>
                <strong>{currentReferrals * parseInt(referrerReward)}</strong> TL kazandın
              </Text>
            </Section>

            <Text style={paragraph}>
              Nasıl Çalışır?
            </Text>

            <Section style={stepsBox}>
              <Text style={stepItem}>
                <strong>1.</strong> Yukarıdaki linki arkadaşlarınla paylaş
              </Text>
              <Text style={stepItem}>
                <strong>2.</strong> Arkadaşın kayıt olup ilk alışverişini yapsın
              </Text>
              <Text style={stepItem}>
                <strong>3.</strong> Hem sen hem arkadaşın ödülü kazanın!
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Sorularınız için destek ekibimizle {' '}
              <Link href={`mailto:${contactInfo.email}`} style={link}>
                iletişime geçebilirsiniz
              </Link>.<br />
              {companyName} Ekibi
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

export default ReferralProgramEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "40px 30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const heading = { fontSize: "32px", fontWeight: "bold", color: "#ffffff", margin: "0" };
const headerSubtitle = { fontSize: "16px", color: "#ffffff", opacity: 0.95, margin: "8px 0 0 0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const rewardBox = { backgroundColor: "#f0f4ff", padding: "24px", borderRadius: "12px", margin: "24px 0", border: "2px solid #667eea" };
const rewardTitle = { fontSize: "20px", fontWeight: "bold", color: "#667eea", marginBottom: "16px", textAlign: "center" as const };
const rewardGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" };
const rewardItem = { textAlign: "center" as const, padding: "16px", backgroundColor: "#ffffff", borderRadius: "8px" };
const rewardAmount = { fontSize: "32px", fontWeight: "bold", color: "#667eea", margin: "0" };
const rewardLabel = { fontSize: "14px", color: "#666", marginTop: "8px" };
const codeSection = { backgroundColor: "#fef3f2", padding: "24px", borderRadius: "8px", margin: "24px 0", textAlign: "center" as const };
const codeLabel = { fontSize: "14px", color: "#666", marginBottom: "8px" };
const code = { fontSize: "28px", fontWeight: "bold", color: "#dc2626", letterSpacing: "3px", margin: "8px 0", padding: "12px", backgroundColor: "#ffffff", borderRadius: "6px", border: "2px dashed #dc2626" };
const urlLabel = { fontSize: "12px", color: "#666", marginTop: "16px", marginBottom: "8px" };
const shareLink = { fontSize: "14px", color: "#667eea", wordBreak: "break-all" as const };
const buttonContainer = { textAlign: "center" as const, margin: "32px 0" };
const button = { backgroundColor: "#667eea", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "16px 48px" };
const statsBox = { backgroundColor: "#f9fafb", padding: "20px 24px", borderRadius: "8px", margin: "24px 0" };
const statsLabel = { fontSize: "16px", fontWeight: "bold", color: "#333", marginBottom: "12px" };
const statsItem = { fontSize: "15px", lineHeight: "28px", color: "#333", margin: "8px 0" };
const stepsBox = { backgroundColor: "#f9f9f9", padding: "20px 24px", borderRadius: "8px", margin: "16px 0" };
const stepItem = { fontSize: "15px", lineHeight: "28px", color: "#333", margin: "8px 0" };
const hr = { borderColor: "#e5e5e5", margin: "16px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", marginTop: "24px", textAlign: "center" as const };
const link = { color: "#667eea", textDecoration: "underline" };
