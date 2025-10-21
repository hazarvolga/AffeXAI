/**
 * Event & Certificate Types
 *
 * Shared types for event management and certificate system
 */
export declare enum EventStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}
export declare enum EventCategory {
    WEBINAR = "Webinar",
    WORKSHOP = "Workshop",
    CONFERENCE = "Conference",
    TRAINING = "Training",
    MEETUP = "Meetup",
    OTHER = "Other"
}
export interface CertificateConfig {
    enabled: boolean;
    templateId: string | null;
    logoMediaId: string | null;
    description: string | null;
    validityDays: number | null;
    autoGenerate: boolean;
}
export interface TicketType {
    name: string;
    price: string;
    quantity: string;
}
export interface EventMetadata {
    category?: string;
    isOnline?: boolean;
    ticketTypes?: TicketType[];
    [key: string]: any;
}
export interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    capacity: number;
    price: number;
    status: EventStatus;
    startDate: string;
    endDate: string;
    grantsCertificate: boolean;
    certificateTitle: string | null;
    certificateConfig: CertificateConfig | null;
    metadata: EventMetadata;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    organizer?: {
        id: string;
        name: string;
        email: string;
    };
    attendees?: EventAttendee[];
}
export interface EventAttendee {
    id: string;
    eventId: string;
    userId: string;
    certificateId: string | null;
    registeredAt: string;
    attendedAt: string | null;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}
export interface CreateEventDto {
    title: string;
    description: string;
    location: string;
    capacity: number;
    price: number;
    status: EventStatus;
    startDate: string;
    endDate: string;
    grantsCertificate?: boolean;
    certificateTitle?: string | null;
    certificateConfig?: CertificateConfig | null;
    metadata?: EventMetadata;
}
export interface UpdateEventDto {
    title?: string;
    description?: string;
    location?: string;
    capacity?: number;
    price?: number;
    status?: EventStatus;
    startDate?: string;
    endDate?: string;
    grantsCertificate?: boolean;
    certificateTitle?: string | null;
    certificateConfig?: CertificateConfig | null;
    metadata?: EventMetadata;
}
export interface EventWithUIData extends Event {
    imageUrl?: string;
    isFavorite?: boolean;
    category?: string;
    isOnline?: boolean;
    ticketTypes?: TicketType[];
    city?: string;
    country?: string;
}
export interface EventQueryParams {
    page?: number;
    limit?: number;
    status?: EventStatus;
    search?: string;
    startDate?: string;
    endDate?: string;
    grantsCertificate?: boolean;
    sortBy?: 'startDate' | 'createdAt' | 'title';
    sortOrder?: 'ASC' | 'DESC';
}
export interface EventDashboardStats {
    upcomingEvents: number;
    totalTicketSales: number;
    totalParticipants: number;
    monthlyRevenue: number;
    revenueChange: number;
}
export interface BulkCertificateRequest {
    eventId: string;
    userIds?: string[];
}
export interface BulkCertificateResponse {
    success: boolean;
    certificatesCreated: number;
    errors: Array<{
        userId: string;
        error: string;
    }>;
}
//# sourceMappingURL=event.types.d.ts.map