export interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    capacity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateEventDto {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    capacity: number;
    price: number;
}
export interface UpdateEventDto {
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    capacity?: number;
    price?: number;
}
export interface DashboardStats {
    upcomingEvents: number;
    totalTicketSales: number;
    totalParticipants: number;
    monthlyRevenue: number;
    revenueChange: number;
}
declare class EventsService {
    getAllEvents(): Promise<Event[]>;
    getEventById(id: string): Promise<Event>;
    getDashboardStats(): Promise<DashboardStats>;
    createEvent(eventData: CreateEventDto): Promise<Event>;
    updateEvent(id: string, eventData: UpdateEventDto): Promise<Event>;
    deleteEvent(id: string): Promise<void>;
}
declare const _default: EventsService;
export default _default;
//# sourceMappingURL=eventsService.d.ts.map