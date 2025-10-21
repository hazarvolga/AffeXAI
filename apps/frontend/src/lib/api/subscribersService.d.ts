import { BaseApiService } from './base-service';
import type { Subscriber, CreateSubscriberDto, UpdateSubscriberDto } from '@affexai/shared-types';
export type { Subscriber, CreateSubscriberDto, UpdateSubscriberDto, };
/**
 * Subscribers Service
 * Handles email marketing subscriber operations extending BaseApiService
 */
declare class SubscribersService extends BaseApiService<Subscriber, CreateSubscriberDto, UpdateSubscriberDto> {
    constructor();
    subscribe(email: string): Promise<Subscriber>;
    unsubscribe(email: string): Promise<Subscriber>;
}
export declare const subscribersService: SubscribersService;
export default subscribersService;
//# sourceMappingURL=subscribersService.d.ts.map