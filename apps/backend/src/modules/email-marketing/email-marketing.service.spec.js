"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const email_marketing_service_1 = require("./email-marketing.service");
describe('EmailMarketingService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [email_marketing_service_1.EmailMarketingService],
        }).compile();
        service = module.get(email_marketing_service_1.EmailMarketingService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=email-marketing.service.spec.js.map