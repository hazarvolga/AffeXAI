"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const ip_reputation_service_1 = require("./ip-reputation.service");
const cache_service_1 = require("../../shared/services/cache.service");
describe('IpReputationService', () => {
    let service;
    let cacheService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                ip_reputation_service_1.IpReputationService,
                {
                    provide: cache_service_1.CacheService,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get(ip_reputation_service_1.IpReputationService);
        cacheService = module.get(cache_service_1.CacheService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('checkIpReputation', () => {
        it('should return unknown reputation for invalid IP', async () => {
            const result = await service.checkIpReputation('invalid-ip');
            expect(result).toEqual({
                ip: 'invalid-ip',
                isListed: false,
                reputation: 'unknown',
                confidence: 0,
                details: 'Invalid IP address format'
            });
        });
        it('should return clean reputation for valid IP not on blacklists', async () => {
            // Mock the DNS lookup to simulate a clean IP
            jest.spyOn(service, 'queryDnsblWithTimeout').mockResolvedValue({ isListed: false });
            const result = await service.checkIpReputation('8.8.8.8');
            expect(result.reputation).toBe('clean');
            expect(result.isListed).toBe(false);
        });
    });
    describe('isValidIpAddress', () => {
        it('should validate correct IPv4 addresses', () => {
            expect(service.isValidIpAddress('192.168.1.1')).toBe(true);
            expect(service.isValidIpAddress('8.8.8.8')).toBe(true);
            expect(service.isValidIpAddress('255.255.255.255')).toBe(true);
        });
        it('should reject invalid IPv4 addresses', () => {
            expect(service.isValidIpAddress('256.1.1.1')).toBe(false);
            expect(service.isValidIpAddress('192.168.1')).toBe(false);
            expect(service.isValidIpAddress('invalid-ip')).toBe(false);
            expect(service.isValidIpAddress('192.168.1.1.1')).toBe(false);
        });
    });
});
//# sourceMappingURL=ip-reputation.service.spec.js.map