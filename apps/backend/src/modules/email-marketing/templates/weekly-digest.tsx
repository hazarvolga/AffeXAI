import { Body, Button, Container, Head, Html, Preview, Section, Text, Heading, Hr, Link } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "../../mail/components/EmailFooter";

interface WeeklyDigestEmailProps {
  userName?: string;
  weekNumber?: number;
  weekDate?: string;
  topArticles?: Array<{ title: string; excerpt: string; url: string; category: string }>;
  upcomingEvents?: Array<{ title: string; date: string; url: string }>;
  newsUrl?: string;
  baseUrl?: string;
  siteSettings?: {
    companyName: string;
    logoUrl: string;
    contact: { address: string; phone: string; email: string };
    socialMedia: { [key: string]: string };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9003";

export const WeeklyDigestEmail = ({
  userName = "Ahmet Yılmaz",
  weekNumber = 43,
  weekDate = "23-29 Ekim 2025",
  topArticles = [
    { title: "AI ile E-posta Marketing", excerpt: "Yapay zeka ile email kampanyalarınızı nasıl optimize edebilirsiniz...", url: `${baseUrl}/blog/ai-email-marketing`, category: "Marketing" },
    { title: "Conversion Rate Artırma", excerpt: "E-posta conversion rate'inizi %40 artıran 5 taktik...", url: `${baseUrl}/blog/conversion-tactics`, category: "Strategy" },
    { title: "Segmentation Best Practices", excerpt: "Subscriber segmentation ile kişiselleştirilmiş kampanyalar...", url: `${baseUrl}/blog/segmentation`, category: "Tutorial" }
  ],
  upcomingEvents = [
    { title: "Email Marketing Webinar", date: "30 Ekim 2025", url: `${baseUrl}/events/webinar` },
    { title: "Q4 Strategy Workshop", date: "5 Kasım 2025", url: `${baseUrl}/events/workshop` }
  ],
  newsUrl = `${baseUrl}/news`,
  siteSettings,
}: WeeklyDigestEmailProps) => {
  const companyName = siteSettings?.companyName || 'Aluplan';
  const contactInfo = siteSettings?.contact || { email: 'destek@aluplan.tr', phone: '', address: '' };
  const socialMediaLinks = siteSettings?.socialMedia || {};

  return (
    <Html>
      <Head />
      <Preview>Haftalık Özet #{weekNumber} - {weekDate}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>📰 Haftalık Özet</Heading>
            <Text style={headerSubtitle}>#{weekNumber} • {weekDate}</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Merhaba <strong>{userName}</strong>,
            </Text>

            <Text style={paragraph}>
              Bu haftanın en önemli içeriklerini ve güncellemelerini sizin için derledik!
            </Text>

            {/* Top Articles */}
            <Section style={sectionBox}>
              <Text style={sectionTitle}>📚 Bu Haftanın En Çok Okunanları</Text>
              <Hr style={hr} />

              {topArticles.map((article, index) => (
                <div key={index} style={articleItem}>
                  <div style={categoryBadge}>{article.category}</div>
                  <Text style={articleTitle}>
                    <Link href={article.url} style={articleLink}>{article.title}</Link>
                  </Text>
                  <Text style={articleExcerpt}>{article.excerpt}</Text>
                  <Link href={article.url} style={readMore}>
                    Devamını Oku →
                  </Link>
                  {index < topArticles.length - 1 && <Hr style={articleDivider} />}
                </div>
              ))}
            </Section>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <Section style={eventsBox}>
                <Text style={sectionTitle}>📅 Yaklaşan Etkinlikler</Text>
                <Hr style={hr} />

                {upcomingEvents.map((event, index) => (
                  <div key={index} style={eventItem}>
                    <Text style={eventDate}>📍 {event.date}</Text>
                    <Text style={eventTitle}>
                      <Link href={event.url} style={eventLink}>{event.title}</Link>
                    </Text>
                  </div>
                ))}
              </Section>
            )}

            {/* CTA */}
            <Section style={buttonContainer}>
              <Button style={button} href={newsUrl}>
                Tüm Haberleri Gör
              </Button>
            </Section>

            <Text style={footerNote}>
              Bir sonraki haftalık özetimizde görüşmek üzere! 👋
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              İyi okumalar dileriz!<br />
              {companyName} Ekibi
            </Text>
          </Section>

          <EmailFooter companyName={companyName} contactInfo={contactInfo} socialMediaLinks={socialMediaLinks} baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default WeeklyDigestEmail;

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", maxWidth: "600px" };
const header = { background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", padding: "40px 30px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const heading = { fontSize: "32px", fontWeight: "bold", color: "#ffffff", margin: "0" };
const headerSubtitle = { fontSize: "16px", color: "#ffffff", opacity: 0.9, margin: "8px 0 0 0" };
const content = { padding: "30px" };
const paragraph = { fontSize: "16px", lineHeight: "26px", color: "#333", marginBottom: "16px" };
const sectionBox = { backgroundColor: "#f0f9ff", padding: "24px", borderRadius: "8px", margin: "24px 0", borderLeft: "4px solid #06b6d4" };
const sectionTitle = { fontSize: "18px", fontWeight: "bold", color: "#0891b2", marginBottom: "16px" };
const articleItem = { margin: "16px 0" };
const categoryBadge = { display: "inline-block", backgroundColor: "#e0f2fe", color: "#0891b2", fontSize: "11px", fontWeight: "bold", padding: "4px 8px", borderRadius: "4px", marginBottom: "8px", textTransform: "uppercase" as const };
const articleTitle = { fontSize: "17px", fontWeight: "bold", color: "#333", margin: "8px 0 4px 0" };
const articleLink = { color: "#333", textDecoration: "none" };
const articleExcerpt = { fontSize: "14px", lineHeight: "22px", color: "#666", margin: "4px 0 8px 0" };
const readMore = { fontSize: "14px", color: "#06b6d4", textDecoration: "none", fontWeight: "500" };
const articleDivider = { borderColor: "#e0f2fe", margin: "16px 0" };
const eventsBox = { backgroundColor: "#fef3f2", padding: "24px", borderRadius: "8px", margin: "24px 0", borderLeft: "4px solid #f97316" };
const eventItem = { margin: "12px 0" };
const eventDate = { fontSize: "13px", color: "#ea580c", marginBottom: "4px" };
const eventTitle = { fontSize: "16px", fontWeight: "bold", color: "#333", margin: "4px 0" };
const eventLink = { color: "#333", textDecoration: "none" };
const buttonContainer = { textAlign: "center" as const, margin: "32px 0" };
const button = { backgroundColor: "#06b6d4", borderRadius: "6px", color: "#fff", fontSize: "16px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "14px 32px" };
const footerNote = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const, marginTop: "24px" };
const hr = { borderColor: "#e5e5e5", margin: "16px 0" };
const footer = { fontSize: "14px", lineHeight: "22px", color: "#666", textAlign: "center" as const };
