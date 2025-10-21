"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCertificateTemplates = seedCertificateTemplates;
const fs_1 = require("fs");
const path_1 = require("path");
const certificate_template_entity_1 = require("../entities/certificate-template.entity");
async function seedCertificateTemplates(dataSource) {
    const templateRepository = dataSource.getRepository(certificate_template_entity_1.CertificateTemplate);
    // Check if templates already exist
    const existingCount = await templateRepository.count();
    if (existingCount > 0) {
        console.log('Certificate templates already seeded. Skipping...');
        return;
    }
    const templatesPath = (0, path_1.join)(__dirname, '..', 'templates');
    // Read template files
    const standardHtml = (0, fs_1.readFileSync)((0, path_1.join)(templatesPath, 'standard.html'), 'utf-8');
    const premiumHtml = (0, fs_1.readFileSync)((0, path_1.join)(templatesPath, 'premium.html'), 'utf-8');
    const executiveHtml = (0, fs_1.readFileSync)((0, path_1.join)(templatesPath, 'executive.html'), 'utf-8');
    const templates = [
        {
            name: 'Default',
            description: 'Standard certificate design with gradient background and gold border',
            htmlContent: standardHtml,
            variables: [
                'recipientName',
                'recipientEmail',
                'trainingTitle',
                'description',
                'issuedAt',
                'validUntil',
                'logoUrl',
                'customLogoUrl',
                'signatureUrl',
                'certificateNumber',
                'companyName',
                'companyAddress',
                'companyLogoUrl',
            ],
            isActive: true,
            orientation: 'landscape',
            pageFormat: 'A4',
            metadata: {
                color: 'purple-gold',
                style: 'classic',
            },
        },
        {
            name: 'Premium',
            description: 'Modern premium design with gradient effects and badge',
            htmlContent: premiumHtml,
            variables: [
                'recipientName',
                'recipientEmail',
                'trainingTitle',
                'description',
                'issuedAt',
                'validUntil',
                'logoUrl',
                'customLogoUrl',
                'signatureUrl',
                'certificateNumber',
                'companyName',
                'companyAddress',
                'companyLogoUrl',
            ],
            isActive: true,
            orientation: 'landscape',
            pageFormat: 'A4',
            metadata: {
                color: 'navy-red',
                style: 'modern',
            },
        },
        {
            name: 'Executive',
            description: 'Minimal elegant design for professional certifications',
            htmlContent: executiveHtml,
            variables: [
                'recipientName',
                'recipientEmail',
                'trainingTitle',
                'description',
                'issuedAt',
                'validUntil',
                'logoUrl',
                'customLogoUrl',
                'signatureUrl',
                'certificateNumber',
                'companyName',
                'companyAddress',
                'companyLogoUrl',
            ],
            isActive: true,
            orientation: 'landscape',
            pageFormat: 'A4',
            metadata: {
                color: 'monochrome',
                style: 'executive',
            },
        },
    ];
    // Create templates
    for (const templateData of templates) {
        const template = templateRepository.create(templateData);
        await templateRepository.save(template);
        console.log(`✅ Created template: ${template.name}`);
    }
    console.log('🎉 Certificate templates seeded successfully!');
}
// Standalone execution
if (require.main === module) {
    Promise.resolve().then(() => __importStar(require('../../../database/data-source.js'))).then(async ({ AppDataSource }) => {
        try {
            await AppDataSource.initialize();
            console.log('Data Source initialized');
            await seedCertificateTemplates(AppDataSource);
            await AppDataSource.destroy();
            console.log('Done!');
            process.exit(0);
        }
        catch (error) {
            console.error('Error seeding templates:', error);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=seed-templates.js.map