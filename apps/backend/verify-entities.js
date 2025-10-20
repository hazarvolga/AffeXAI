const { ImportJob, ImportJobStatus } = require('./dist/modules/email-marketing/entities/import-job.entity');
const { ExportJob, ExportJobStatus } = require('./dist/modules/email-marketing/entities/export-job.entity');
const { ImportResult, ImportResultStatus } = require('./dist/modules/email-marketing/entities/import-result.entity');

console.log('Testing entity creation...');

try {
  // Test ImportJob
  const importJob = new ImportJob();
  importJob.fileName = 'test.csv';
  importJob.status = ImportJobStatus.PENDING;
  console.log('✓ ImportJob entity created successfully');
  console.log('  - Status:', importJob.status);
  console.log('  - Default totalRecords:', importJob.totalRecords);

  // Test ExportJob
  const exportJob = new ExportJob();
  exportJob.fileName = 'export.csv';
  exportJob.status = ExportJobStatus.PENDING;
  console.log('✓ ExportJob entity created successfully');
  console.log('  - Status:', exportJob.status);

  // Test ImportResult
  const importResult = new ImportResult();
  importResult.email = 'test@example.com';
  importResult.status = ImportResultStatus.VALID;
  console.log('✓ ImportResult entity created successfully');
  console.log('  - Email:', importResult.email);
  console.log('  - Status:', importResult.status);

  console.log('\n✅ All entities are working correctly!');
} catch (error) {
  console.error('❌ Error testing entities:', error.message);
  process.exit(1);
}