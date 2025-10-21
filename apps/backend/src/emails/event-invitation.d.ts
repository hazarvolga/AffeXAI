interface EventInvitationEmailProps {
    eventName?: string;
    eventDate?: string;
    eventLocation?: string;
    eventDescription?: string;
    eventImageUrl?: string;
    registrationLink?: string;
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
export declare const EventInvitationEmail: ({ eventName, eventDate, eventLocation, eventDescription, eventImageUrl, registrationLink, siteSettings, }: EventInvitationEmailProps) => JSX.Element;
export default EventInvitationEmail;
//# sourceMappingURL=event-invitation.d.ts.map