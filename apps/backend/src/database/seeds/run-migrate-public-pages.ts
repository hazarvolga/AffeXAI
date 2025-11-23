import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { seedMigratedPublicPages } from './migrate-public-pages.seed';

async function runMigration() {
  try {
    console.log('🌱 Starting public pages migration...\n');

    // Initialize data source
    console.log('📦 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Database connected!\n');

    // Run migration
    await seedMigratedPublicPages(AppDataSource);

    await AppDataSource.destroy();
    console.log('\n🎉 Public pages migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

runMigration();
