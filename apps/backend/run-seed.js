const { AppDataSource } = require('./apps/backend/dist/database/data-source');
const { seedCriticalSettings } = require('./apps/backend/dist/database/seeds/01-critical-settings.seed');

async function runSeeds() {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    console.log('📦 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Database connected!\n');

    await seedCriticalSettings(AppDataSource);

    await AppDataSource.destroy();
    console.log('\n🎉 All seeds completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

runSeeds();
