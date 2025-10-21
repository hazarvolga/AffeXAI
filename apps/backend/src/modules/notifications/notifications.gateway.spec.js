"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const notifications_gateway_1 = require("./notifications.gateway");
describe('NotificationsGateway', () => {
    let gateway;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [notifications_gateway_1.NotificationsGateway],
        }).compile();
        gateway = module.get(notifications_gateway_1.NotificationsGateway);
    });
    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
//# sourceMappingURL=notifications.gateway.spec.js.map