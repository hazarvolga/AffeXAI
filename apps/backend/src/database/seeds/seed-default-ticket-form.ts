import { DataSource } from 'typeorm';
import { FormDefinition } from '../../modules/form-builder/entities/form-definition.entity';
import { FormVersion } from '../../modules/form-builder/entities/form-version.entity';

/**
 * Seed Default Ticket Form with Fields
 * Creates a comprehensive ticket form for user portal
 */
export async function seedDefaultTicketForm(dataSource: DataSource) {
  const formDefRepo = dataSource.getRepository(FormDefinition);
  const formVersionRepo = dataSource.getRepository(FormVersion);

  console.log('🌱 Seeding default ticket form...');

  // Check if default form already exists
  const existingForm = await formDefRepo.findOne({
    where: { module: 'tickets', formType: 'standard', isDefault: true },
  });

  if (existingForm) {
    console.log('  ↻ Default ticket form already exists, updating fields...');

    // Update schema with comprehensive fields
    const updatedSchema = {
      formId: existingForm.id,
      formName: 'Default Support Ticket Form',
      version: existingForm.version + 1,
      fields: getDefaultTicketFields(),
    };

    // Update form definition
    existingForm.schema = updatedSchema as any;
    existingForm.version = existingForm.version + 1;
    existingForm.updatedAt = new Date();
    await formDefRepo.save(existingForm);

    // Create version history
    await formVersionRepo.save({
      formDefinition: existingForm,
      version: existingForm.version,
      schema: updatedSchema as any,
      changeLog: 'Updated default form fields via seed script',
      createdBy: null,
    });

    console.log(`  ✓ Updated default form to version ${existingForm.version}`);
  } else {
    console.log('  ✓ Creating new default ticket form...');

    const defaultFormSchema = {
      formId: '', // Will be set after creation
      formName: 'Default Support Ticket Form',
      version: 1,
      fields: getDefaultTicketFields(),
    };

    const newForm = formDefRepo.create({
      name: 'Default Support Ticket Form',
      description: 'Varsayılan destek talebi formu - User portal için',
      version: 1,
      schema: defaultFormSchema as any,
      isActive: true,
      isDefault: true,
      module: 'tickets',
      formType: 'standard',
      allowPublicSubmissions: true, // User portal için public
      settings: {
        showSuccessMessage: true,
        successMessage: 'Destek talebiniz başarıyla oluşturuldu. En kısa sürede size dönüş yapacağız.',
        redirectUrl: '/portal/support',
      },
    });

    const savedForm = await formDefRepo.save(newForm);

    // Update formId in schema
    savedForm.schema.formId = savedForm.id;
    await formDefRepo.save(savedForm);

    // Create initial version
    await formVersionRepo.save({
      formDefinition: savedForm,
      version: 1,
      schema: savedForm.schema,
      changeLog: 'Initial version - created via seed script',
      createdBy: null,
    });

    console.log(`  ✓ Created default form with ID: ${savedForm.id}`);
  }

  const totalForms = await formDefRepo.count();
  console.log(`\n✅ Default ticket form seed complete! Total forms: ${totalForms}\n`);
}

/**
 * Get default ticket form fields
 * Comprehensive field set for support tickets
 */
function getDefaultTicketFields() {
  return [
    {
      id: 'subject',
      name: 'subject',
      label: 'Konu',
      type: 'text',
      required: true,
      placeholder: 'Sorununuzun kısa bir özeti',
      helpText: 'Lütfen sorununuzu kısaca açıklayın',
      metadata: {
        order: 1,
        width: 'full',
        category: 'basic',
      },
      validation: {
        minLength: 5,
        maxLength: 200,
      },
    },
    {
      id: 'category',
      name: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      placeholder: 'Kategori seçin',
      helpText: 'Sorununuz hangi kategoriye giriyor?',
      options: [
        { label: 'Teknik Destek', value: 'technical' },
        { label: 'Faturalandırma', value: 'billing' },
        { label: 'Ürün Bilgisi', value: 'product' },
        { label: 'Hesap Yönetimi', value: 'account' },
        { label: 'Diğer', value: 'other' },
      ],
      metadata: {
        order: 2,
        width: 'half',
        category: 'basic',
      },
    },
    {
      id: 'priority',
      name: 'priority',
      label: 'Öncelik',
      type: 'select',
      required: true,
      defaultValue: 'medium',
      options: [
        { label: 'Düşük', value: 'low' },
        { label: 'Orta', value: 'medium' },
        { label: 'Yüksek', value: 'high' },
        { label: 'Acil', value: 'urgent' },
      ],
      helpText: 'Sorununuzun aciliyet derecesi',
      metadata: {
        order: 3,
        width: 'half',
        category: 'basic',
      },
    },
    {
      id: 'description',
      name: 'description',
      label: 'Açıklama',
      type: 'textarea',
      required: true,
      placeholder: 'Sorununuzu detaylı bir şekilde açıklayın...',
      helpText: 'Lütfen sorununuzu mümkün olduğunca detaylı açıklayın. Hata mesajları, ekran görüntüleri gibi bilgileri ekleyin.',
      metadata: {
        order: 4,
        width: 'full',
        category: 'details',
        rows: 6,
      },
      validation: {
        minLength: 20,
        maxLength: 5000,
      },
    },
    {
      id: 'affectsProduction',
      name: 'affectsProduction',
      label: 'Prodüksiyon Etkileniyor mu?',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      helpText: 'Bu sorun canlı ortamı (production) etkiliyor mu?',
      metadata: {
        order: 5,
        width: 'full',
        category: 'details',
      },
    },
    {
      id: 'contactPreference',
      name: 'contactPreference',
      label: 'İletişim Tercihi',
      type: 'radio',
      required: false,
      defaultValue: 'email',
      options: [
        { label: 'E-posta', value: 'email' },
        { label: 'Telefon', value: 'phone' },
        { label: 'Fark etmez', value: 'any' },
      ],
      helpText: 'Size nasıl ulaşmamızı istersiniz?',
      metadata: {
        order: 6,
        width: 'full',
        category: 'contact',
      },
    },
    {
      id: 'phone',
      name: 'phone',
      label: 'Telefon',
      type: 'tel',
      required: false,
      placeholder: '+90 5XX XXX XX XX',
      helpText: 'Telefon ile iletişim tercih ediyorsanız lütfen numaranızı girin',
      metadata: {
        order: 7,
        width: 'half',
        category: 'contact',
      },
      conditional: {
        visibleIf: {
          field: 'contactPreference',
          operator: 'equals',
          value: 'phone',
        },
      },
      validation: {
        pattern: '^\\+?[0-9]{10,15}$',
      },
    },
    {
      id: 'attachments',
      name: 'attachments',
      label: 'Ekler',
      type: 'file',
      required: false,
      multiple: true,
      accept: 'image/*,application/pdf,.doc,.docx,.txt',
      helpText: 'Ekran görüntüsü, hata logu veya ilgili dokümanları ekleyebilirsiniz',
      metadata: {
        order: 8,
        width: 'full',
        category: 'attachments',
      },
      validation: {
        maxFiles: 5,
        maxFileSize: 10485760, // 10MB in bytes
      },
    },
  ];
}

/**
 * Standalone execution
 */
if (require.main === module) {
  (async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5434', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'affexai_dev',
      entities: [FormDefinition, FormVersion],
      synchronize: false,
      logging: false,
    });

    try {
      await dataSource.initialize();
      console.log('✅ Database connection established\n');

      await seedDefaultTicketForm(dataSource);

      await dataSource.destroy();
      console.log('✅ Database connection closed');
      process.exit(0);
    } catch (error) {
      console.error('❌ Seed failed:', error);
      await dataSource.destroy();
      process.exit(1);
    }
  })();
}
