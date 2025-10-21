import type { LucideIcon } from "lucide-react";
export type NavItem = {
    title: string;
    href: string;
    description?: string;
    icon?: LucideIcon;
};
export type MegaMenuCategory = {
    title: string;
    href: string;
    items: NavItem[];
};
export type Solution = {
    id: string;
    title: string;
    category: string;
    description: string;
    icon: LucideIcon;
    image: string;
};
export type Product = {
    id: string;
    title: string;
    version: 'Basic' | 'Concept' | 'Professional' | 'Ultimate' | 'Civil' | 'Precast';
    description: string;
    relatedSolutions: string[];
    image: string;
};
export type Resource = {
    id: string;
    title: string;
    type: 'webinar' | 'certification' | 'event';
    description: string;
    link: string;
    date?: string;
    image: string;
};
export type CaseStudy = {
    slug: string;
    title: string;
    region: 'Global' | 'Türkiye';
    discipline: 'Structural' | 'Civil' | 'Bridge' | 'Precast';
    excerpt: string;
    imageUrl: string;
    imageHint: string;
    content: string;
};
export type DownloadableResource = {
    id: string;
    title: string;
    description: string;
    link: string;
    type: 'FAQ' | 'Tutorial' | 'License' | 'Link';
};
export type AssessmentQuestion = {
    id: string;
    text: string;
    type: 'multiple-choice' | 'text';
    options?: {
        id: string;
        text: string;
    }[];
    correctOptionId?: string;
};
export type Assessment = {
    id: string;
    eventId: string;
    title: string;
    type: 'quiz' | 'survey';
    questions: AssessmentQuestion[];
};
export type AssessmentSubmission = {
    id: string;
    assessmentId: string;
    userId: string;
    answers: {
        questionId: string;
        answer: string;
    }[];
    score: number;
    submittedAt: string;
};
export type Venue = {
    venue: string;
    address: string;
    city: string;
    country: string;
};
export type Organizer = {
    id: string;
    name: string;
    avatarUrl: string;
};
export type Attendee = {
    id: string;
    name: string;
    email: string;
    ticketId: string;
    certificateId?: string;
};
export type Ticket = {
    id: string;
    userId: string;
    eventId: string;
    type: string;
    qrCode: string;
    status: 'valid' | 'checked-in';
};
export type Event = {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    imageUrl: string;
    isOnline: boolean;
    location: Venue;
    organizer: Organizer;
    isFavorite?: boolean;
    attendees?: Attendee[];
    grantsCertificate?: boolean;
    certificateTitle?: string;
    assessments?: Assessment[];
};
export type SupportAuthor = {
    id: string;
    name: string;
    avatarUrl: string;
};
export type SupportUser = {
    id: string;
    name: string;
    email: string;
    company: string;
};
export type TicketMessage = {
    author: SupportAuthor;
    content: string;
    timestamp: string;
};
export type SupportCategory = {
    id: string;
    name: string;
    description: string;
    ticketCount: number;
    parentId?: string | null;
};
export type SupportTicket = {
    id: string;
    subject: string;
    category: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    createdAt: string;
    lastUpdated: string;
    user: SupportUser;
    assignee: SupportAuthor;
    messages: TicketMessage[];
};
export type KbCategory = {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
};
export type KbArticle = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categoryId: string;
    tags: string[];
    lastUpdated: string;
    views: number;
    author: {
        name: string;
        avatarUrl: string;
    };
};
export type Certificate = {
    certificateNumber: string;
    recipientName: string;
    recipientEmail: string;
    certificateName: string;
    issuedAt: string;
    validUntil?: string;
    templateId: string;
    verificationUrl: string;
    eventId?: string;
    status: 'Generated' | 'Pending' | 'Revoked';
    generationMethod: 'Auto' | 'Manual (Single)' | 'Manual (Bulk Import)';
};
export type Permission = {
    id: string;
    name: string;
    category: string;
};
export type Role = {
    id: string;
    name: string;
    description: string;
    permissionIds: string[];
    userCount: number;
};
export type CmsPageContent = {
    type: 'hero' | 'text' | 'image' | 'cta';
    content: any;
};
export type CmsPage = {
    id: string;
    title: string;
    slug: string;
    status: 'published' | 'draft';
    content: CmsPageContent[];
    seo: {
        title: string;
        description: string;
    };
    authorId: string;
    lastUpdated: string;
};
export type MenuItem = {
    id: string;
    title: string;
    href: string;
    behavior: 'link' | 'dropdown' | 'mega';
    parentId: string | null | undefined;
    children?: MenuItem[];
    megaMenuCategories?: MegaMenuCategory[];
};
export type Menu = {
    id: string;
    name: string;
    items: MenuItem[];
};
export type Subscriber = {
    id: string;
    email: string;
    subscribedAt: string;
    status: 'aktif' | 'onay bekliyor' | 'iptal edilmiş';
    groups: string[];
    segments: string[];
};
export type Campaign = {
    id: string;
    title: string;
    subject: string;
    content: string;
    status: 'taslak' | 'gönderildi' | 'planlandı';
    createdAt: string;
    sentAt?: string;
    scheduledFor?: string;
    recipientCount?: number;
    openRate?: number;
    clickRate?: number;
};
export type Segment = {
    id: string;
    name: string;
    description: string;
    subscriberCount: number;
    criteria: string;
};
export type Group = {
    id: string;
    name: string;
    description: string;
    subscriberCount: number;
};
export type EmailTemplate = {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    createdAt: string;
    content: string;
};
export type SocialPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'YouTube' | 'Instagram' | 'Pinterest' | 'TikTok';
export type SocialAccount = {
    id: string;
    platform: SocialPlatform;
    username: string;
    avatarUrl: string;
    isConnected: boolean;
};
export type SocialPostStatus = 'Yayınlandı' | 'Planlandı' | 'Taslak' | 'Hata';
export type SocialPost = {
    id: string;
    accountId: string;
    status: SocialPostStatus;
    content: string;
    scheduledAt?: string;
    publishedAt?: string;
    sourceContentId: string;
    sourceContentType: 'event' | 'blog' | 'page';
};
//# sourceMappingURL=types.d.ts.map