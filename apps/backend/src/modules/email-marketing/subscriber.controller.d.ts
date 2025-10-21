import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';
import { AdvancedEmailValidationService } from './services/advanced-email-validation.service';
export declare class SubscriberController {
    private readonly subscriberService;
    private readonly advancedEmailValidationService;
    constructor(subscriberService: SubscriberService, advancedEmailValidationService: AdvancedEmailValidationService);
    create(createSubscriberDto: CreateSubscriberDto, ip: string): Promise<Subscriber>;
    validateEmail(email: string, ip?: string): Promise<any>;
    findAll(): Promise<Subscriber[]>;
    findOne(id: string): Promise<Subscriber>;
    update(id: string, updateSubscriberDto: UpdateSubscriberDto): Promise<Subscriber>;
    remove(id: string): Promise<void>;
    subscribe(email: string, ip: string): Promise<Subscriber>;
    unsubscribe(email: string): Promise<Subscriber>;
}
//# sourceMappingURL=subscriber.controller.d.ts.map