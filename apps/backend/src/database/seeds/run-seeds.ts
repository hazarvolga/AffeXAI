import { AppDataSource } from '../data-source';
import { seedCriticalSettings } from './01-critical-settings.seed';

async function runSeeds() {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Initialize data source
    console.log('📦 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Database connected!\n');

    // Run seeds in order
    await seedCriticalSettings(AppDataSource);

    // Add more seeds here as we create them:
    // await seedCertificateTemplates(AppDataSource);
    // await seedEmailTemplates(AppDataSource);
    // await seedTicketSetup(AppDataSource);

    await AppDataSource.destroy();
    console.log('\n🎉 All seeds completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

runSeeds();
