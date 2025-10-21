"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const bullmq_1 = require("@nestjs/bullmq");
const bulk_export_service_1 = require("../bulk-export.service");
const export_job_entity_1 = require("../../entities/export-job.entity");
const subscriber_entity_1 = require("../../entities/subscriber.entity");
const group_entity_1 = require("../../entities/group.entity");
const segment_entity_1 = require("../../entities/segment.entity");
const shared_types_1 = require("@affexai/shared-types");
describe('BulkExportService', () => {
    let service;
    let exportJobRepository;
    let subscriberRepository;
    let groupRepository;
    let segmentRepository;
    let exportQueue;
    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        findByIds: jest.fn(),
        update: jest.fn(),
        createQueryBuilder: jest.fn(),
    };
    const mockQueue = {
        add: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                bulk_export_service_1.BulkExportService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(export_job_entity_1.ExportJob),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(subscriber_entity_1.Subscriber),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(group_entity_1.Group),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(segment_entity_1.Segment),
                    useValue: mockRepository,
                },
                {
                    provide: (0, bullmq_1.getQueueToken)('export'),
                    useValue: mockQueue,
                },
            ],
        }).compile();
        service = module.get(bulk_export_service_1.BulkExportService);
        exportJobRepository = module.get((0, typeorm_1.getRepositoryToken)(export_job_entity_1.ExportJob));
        subscriberRepository = module.get((0, typeorm_1.getRepositoryToken)(subscriber_entity_1.Subscriber));
        groupRepository = module.get((0, typeorm_1.getRepositoryToken)(group_entity_1.Group));
        segmentRepository = module.get((0, typeorm_1.getRepositoryToken)(segment_entity_1.Segment));
        exportQueue = module.get((0, bullmq_1.getQueueToken)('export'));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getAvailableFields', () => {
        it('should return list of available export fields', () => {
            const fields = service.getAvailableFields();
            expect(fields).toContain('email');
            expect(fields).toContain('firstName');
            expect(fields).toContain('lastName');
            expect(fields).toContain('status');
            expect(fields).toContain('groups');
            expect(fields).toContain('segments');
        });
    });
    describe('formatSubscriberData', () => {
        it('should format subscriber data correctly', async () => {
            const mockSubscriber = {
                id: '1',
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                status: shared_types_1.SubscriberStatus.ACTIVE,
                groups: ['group1', 'group2'],
                segments: ['segment1'],
                sent: 5,
                opens: 3,
                clicks: 1,
                subscribedAt: new Date('2023-01-01'),
                lastUpdated: new Date('2023-01-02'),
            };
            const options = {
                fields: ['email', 'firstName', 'lastName', 'status', 'groups'],
                format: 'csv',
                includeMetadata: false,
                batchSize: 1000,
            };
            const result = await service.formatSubscriberData([mockSubscriber], options);
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                status: shared_types_1.SubscriberStatus.ACTIVE,
                groups: 'group1;group2',
            });
        });
        it('should handle empty groups and segments', async () => {
            const mockSubscriber = {
                id: '1',
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                status: shared_types_1.SubscriberStatus.ACTIVE,
                groups: null,
                segments: null,
            };
            const options = {
                fields: ['email', 'groups', 'segments'],
                format: 'csv',
                includeMetadata: false,
                batchSize: 1000,
            };
            const result = await service.formatSubscriberData([mockSubscriber], options);
            expect(result[0].groups).toBe('');
            expect(result[0].segments).toBe('');
        });
    });
    describe('createExportJob', () => {
        it('should create export job successfully', async () => {
            const filters = {
                status: [shared_types_1.SubscriberStatus.ACTIVE],
            };
            const options = {
                fields: ['email', 'firstName'],
                format: 'csv',
                includeMetadata: false,
                batchSize: 1000,
            };
            const mockExportJob = {
                id: '1',
                fileName: 'test-export.csv',
                status: 'pending',
            };
            mockRepository.create.mockReturnValue(mockExportJob);
            mockRepository.save.mockResolvedValue(mockExportJob);
            mockRepository.findByIds.mockResolvedValue([]);
            const result = await service.createExportJob(filters, options, 'user1');
            expect(mockRepository.create).toHaveBeenCalled();
            expect(mockRepository.save).toHaveBeenCalled();
            expect(mockQueue.add).toHaveBeenCalledWith('process-export', expect.any(Object), expect.any(Object));
            expect(result).toEqual(mockExportJob);
        });
    });
});
//# sourceMappingURL=bulk-export.service.spec.js.map