import { DataSource } from 'typeorm';
import { PageTemplate } from '../entities/page-template.entity';
import { templatesData } from './templates-data';

/**
 * Seed CMS Page Templates
 *
 * Usage: npm run seed:cms-templates
 */
export async function seedCmsTemplates(dataSource: DataSource): Promise<void> {
  const templateRepository = dataSource.getRepository(PageTemplate);

  console.log('🌱 Seeding CMS templates...');

  // Check if templates already exist
  const existingCount = await templateRepository.count();
  if (existingCount > 0) {
    console.log(`ℹ️  Found ${existingCount} existing templates. Skipping seed.`);
    console.log('   To re-seed, delete existing templates first.');
    return;
  }

  // Create templates
  const templates = templatesData.map((data) =>
    templateRepository.create({
      ...data,
      isActive: true,
      usageCount: 0,
      authorId: null, // System-generated templates
    })
  );

  await templateRepository.save(templates);

  console.log(`✅ Successfully seeded ${templates.length} CMS templates:`);
  templates.forEach((t, i) => {
    const icon = t.isFeatured ? '⭐' : '  ';
    console.log(`   ${icon} ${i + 1}. ${t.name} (${t.category})`);
  });
}

/**
 * Standalone script execution
 */
if (require.main === module) {
  // This allows running the script directly: ts-node seed-templates.ts
  console.log('Please run this via: npm run seed:cms-templates');
  process.exit(1);
}
