"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const _01_critical_settings_seed_1 = require("./01-critical-settings.seed");
async function runSeeds() {
    try {
        console.log('🌱 Starting database seeding...\n');
        // Initialize data source
        console.log('📦 Connecting to database...');
        await data_source_1.AppDataSource.initialize();
        console.log('✅ Database connected!\n');
        // Run seeds in order
        await (0, _01_critical_settings_seed_1.seedCriticalSettings)(data_source_1.AppDataSource);
        // Add more seeds here as we create them:
        // await seedCertificateTemplates(AppDataSource);
        // await seedEmailTemplates(AppDataSource);
        // await seedTicketSetup(AppDataSource);
        await data_source_1.AppDataSource.destroy();
        console.log('\n🎉 All seeds completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    }
}
runSeeds();
//# sourceMappingURL=run-seeds.js.map