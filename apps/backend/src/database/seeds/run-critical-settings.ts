import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { seedCriticalSettings } from './01-critical-settings.seed';

async function runSeed() {
  try {
    console.log('🔌 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    // Run critical settings seed
    await seedCriticalSettings(AppDataSource);

    await AppDataSource.destroy();
    console.log('🎉 Seed completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running seed:', error);
    await AppDataSource.destroy();
    process.exit(1);
  }
}

runSeed();
