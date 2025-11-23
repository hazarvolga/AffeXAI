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
exports.updateCertificateTemplates = updateCertificateTemplates;
const fs_1 = require("fs");
const path_1 = require("path");
const certificate_template_entity_1 = require("../entities/certificate-template.entity");
async function updateCertificateTemplates(dataSource) {
    const templateRepository = dataSource.getRepository(certificate_template_entity_1.CertificateTemplate);
    const templatesPath = (0, path_1.join)(__dirname, '..', 'templates');
    // Read updated template files
    const standardHtml = (0, fs_1.readFileSync)((0, path_1.join)(templatesPath, 'standard-template.html'), 'utf-8');
    const premiumHtml = (0, fs_1.readFileSync)((0, path_1.join)(templatesPath, 'premium-template.html'), 'utf-8');
    const executiveHtml = (0, fs_1.readFileSync)((0, path_1.join)(templatesPath, 'executive-template.html'), 'utf-8');
    console.log('📝 Updating certificate templates with optimized versions...');
    // Update Default/Standard template
    const defaultTemplate = await templateRepository.findOne({ where: { name: 'Default' } });
    if (defaultTemplate) {
        defaultTemplate.htmlContent = standardHtml;
        defaultTemplate.description = 'Standard certificate - Clean classic design (optimized for single-page PDF)';
        await templateRepository.save(defaultTemplate);
        console.log('✅ Updated Default (Standard) template');
    }
    else {
        console.log('⚠️  Default template not found');
    }
    // Update Premium template
    const premiumTemplate = await templateRepository.findOne({ where: { name: 'Premium' } });
    if (premiumTemplate) {
        premiumTemplate.htmlContent = premiumHtml;
        premiumTemplate.description = 'Premium certificate - Modern gradient design with badge (optimized for single-page PDF)';
        await templateRepository.save(premiumTemplate);
        console.log('✅ Updated Premium template');
    }
    else {
        console.log('⚠️  Premium template not found');
    }
    // Update Executive template
    const executiveTemplate = await templateRepository.findOne({ where: { name: 'Executive' } });
    if (executiveTemplate) {
        executiveTemplate.htmlContent = executiveHtml;
        executiveTemplate.description = 'Executive certificate - Dark formal design with double borders (optimized for single-page PDF)';
        await templateRepository.save(executiveTemplate);
        console.log('✅ Updated Executive template');
    }
    else {
        console.log('⚠️  Executive template not found');
    }
    console.log('🎉 Certificate templates updated successfully!');
    console.log('\n📋 Template Optimizations:');
    console.log('  - Larger certificate containers (287mm × 200mm)');
    console.log('  - Reduced internal padding and margins (20-33%)');
    console.log('  - Smaller fonts (10-15% reduction)');
    console.log('  - Enhanced visual distinction between templates');
    console.log('  - Description field support added');
    console.log('  - Target: Single-page A4 landscape PDF output');
}
// Standalone execution
if (require.main === module) {
    Promise.resolve().then(() => __importStar(require('../../../database/data-source.js'))).then(async ({ AppDataSource }) => {
        try {
            if (!AppDataSource.isInitialized) {
                await AppDataSource.initialize();
            }
            console.log('Data Source initialized');
            await updateCertificateTemplates(AppDataSource);
            await AppDataSource.destroy();
            console.log('\n✨ Done! Templates are now updated in the database.');
            console.log('💡 You can now generate certificates and they should be single-page PDFs.');
            process.exit(0);
        }
        catch (error) {
            console.error('Error updating templates:', error);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=update-templates.js.map