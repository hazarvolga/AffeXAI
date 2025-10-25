"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const email_marketing_controller_1 = require("./email-marketing.controller");
describe('EmailMarketingController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [email_marketing_controller_1.EmailMarketingController],
        }).compile();
        controller = module.get(email_marketing_controller_1.EmailMarketingController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=email-marketing.controller.spec.js.map