import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { EmailValidationService } from './services/email-validation.service';
import { AdvancedEmailValidationService } from './services/advanced-email-validation.service';
export declare class SubscriberService {
    private subscribersRepository;
    private readonly emailValidationService;
    private readonly advancedEmailValidationService;
    constructor(subscribersRepository: Repository<Subscriber>, emailValidationService: EmailValidationService, advancedEmailValidationService: AdvancedEmailValidationService);
    create(createSubscriberDto: CreateSubscriberDto, senderIp?: string): Promise<Subscriber>;
    findAll(): Promise<Subscriber[]>;
    findOne(id: string): Promise<Subscriber>;
    findByEmail(email: string): Promise<Subscriber>;
    update(id: string, updateSubscriberDto: UpdateSubscriberDto): Promise<Subscriber>;
    remove(id: string): Promise<void>;
    subscribe(email: string, senderIp?: string): Promise<Subscriber>;
    unsubscribe(email: string): Promise<Subscriber>;
    /**
     * Update subscriber status based on webhook events
     * Called by WebhookService when bounce/complaint events occur
     */
    updateStatusFromWebhook(email: string, status: 'bounced' | 'complained' | 'unsubscribed', metadata?: Record<string, any>): Promise<Subscriber | null>;
    /**
     * Check if email is suppressed (bounced, complained, or unsubscribed)
     * Should be checked before sending any marketing email
     */
    isEmailSuppressed(email: string): Promise<boolean>;
}
//# sourceMappingURL=subscriber.service.d.ts.map