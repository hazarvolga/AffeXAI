import * as React from "react";
export interface ArticleItem {
    title: string;
    description: string;
    image?: string;
    link: string;
    category?: string;
    readTime?: string;
}
export interface NewsletterEmailProps {
    subscriberName?: string;
    subscriberEmail: string;
    newsletterTitle: string;
    newsletterDate: Date | string;
    introText: string;
    featuredArticle: ArticleItem;
    articles: ArticleItem[];
    tips?: string[];
    unsubscribeToken?: string;
    locale?: 'tr' | 'en';
}
export declare const NewsletterWithDesign: ({ subscriberName, subscriberEmail, newsletterTitle, newsletterDate, introText, featuredArticle, articles, tips, unsubscribeToken, locale, }: NewsletterEmailProps) => Promise<React.JSX.Element>;
export default NewsletterWithDesign;
//# sourceMappingURL=newsletter-with-design.d.ts.map