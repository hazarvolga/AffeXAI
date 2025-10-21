export interface Subscriber {
    id: string;
    email: string;
    status: 'active' | 'pending' | 'unsubscribed';
    groups: string[];
    segments: string[];
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
    customerStatus?: string;
    subscriptionType?: string;
    mailerCheckResult?: string;
    subscribedAt: string;
    lastUpdated: string;
    location?: string;
    sent?: number;
    opens?: number;
    clicks?: number;
}
export interface CreateSubscriberDto {
    email: string;
    status?: 'active' | 'pending' | 'unsubscribed';
    groups?: string[];
    segments?: string[];
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
    customerStatus?: string;
    subscriptionType?: string;
    mailerCheckResult?: string;
}
export interface UpdateSubscriberDto {
    email?: string;
    status?: 'active' | 'pending' | 'unsubscribed';
    groups?: string[];
    segments?: string[];
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
    customerStatus?: string;
    subscriptionType?: string;
    mailerCheckResult?: string;
}
declare class SubscribersService {
    getAllSubscribers(): Promise<Subscriber[]>;
    getSubscriberById(id: string): Promise<Subscriber>;
    createSubscriber(subscriberData: CreateSubscriberDto): Promise<Subscriber>;
    updateSubscriber(id: string, subscriberData: UpdateSubscriberDto): Promise<Subscriber>;
    deleteSubscriber(id: string): Promise<void>;
    subscribe(email: string): Promise<Subscriber>;
    unsubscribe(email: string): Promise<Subscriber>;
}
declare const _default: SubscribersService;
export default _default;
//# sourceMappingURL=subscribersService.d.ts.map