import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateTicketFormDefinitions1730210000000 implements MigrationInterface {
  name = 'CreateTicketFormDefinitions1730210000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create ticket_form_definitions table
    await queryRunner.createTable(
      new Table({
        name: 'ticket_form_definitions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'version',
            type: 'int',
            default: 1,
            isNullable: false,
          },
          {
            name: 'schema',
            type: 'jsonb',
            isNullable: false,
            comment: 'JSON schema defining form structure and fields',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'isDefault',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Create index on name for faster lookups
    await queryRunner.createIndex(
      'ticket_form_definitions',
      new TableIndex({
        name: 'IDX_ticket_form_definitions_name',
        columnNames: ['name'],
      }),
    );

    // Create index on isActive for filtering
    await queryRunner.createIndex(
      'ticket_form_definitions',
      new TableIndex({
        name: 'IDX_ticket_form_definitions_is_active',
        columnNames: ['isActive'],
      }),
    );

    // Create index on isDefault for quick default form lookup
    await queryRunner.createIndex(
      'ticket_form_definitions',
      new TableIndex({
        name: 'IDX_ticket_form_definitions_is_default',
        columnNames: ['isDefault'],
      }),
    );

    // Create GIN index for JSONB schema searches
    await queryRunner.query(`
      CREATE INDEX "IDX_ticket_form_definitions_schema"
      ON "ticket_form_definitions" USING GIN (schema)
    `);

    // Create foreign key to users table (createdBy)
    await queryRunner.createForeignKey(
      'ticket_form_definitions',
      new TableForeignKey({
        columnNames: ['createdBy'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // Insert default form definition
    await queryRunner.query(`
      INSERT INTO ticket_form_definitions (id, name, description, version, schema, "isActive", "isDefault", "createdAt", "updatedAt")
      VALUES (
        uuid_generate_v4(),
        'Default Ticket Form',
        'Standard support ticket form with basic fields',
        1,
        '{
          "formId": "default",
          "formName": "Default Ticket Form",
          "version": 1,
          "fields": [
            {
              "id": "field_subject",
              "name": "subject",
              "label": "Konu",
              "labelEn": "Subject",
              "type": "text",
              "required": true,
              "placeholder": "Örn: Lisans anahtarı çalışmıyor",
              "placeholderEn": "E.g., License key not working",
              "validation": {
                "minLength": 5,
                "maxLength": 255
              },
              "metadata": {
                "order": 1,
                "width": "full"
              }
            },
            {
              "id": "field_category",
              "name": "categoryId",
              "label": "Kategori",
              "labelEn": "Category",
              "type": "select",
              "required": true,
              "dataSource": "categories",
              "metadata": {
                "order": 2,
                "width": "half"
              }
            },
            {
              "id": "field_priority",
              "name": "priority",
              "label": "Öncelik",
              "labelEn": "Priority",
              "type": "select",
              "required": false,
              "defaultValue": "medium",
              "options": [
                {"label": "Düşük", "labelEn": "Low", "value": "low"},
                {"label": "Orta", "labelEn": "Medium", "value": "medium"},
                {"label": "Yüksek", "labelEn": "High", "value": "high"},
                {"label": "Acil", "labelEn": "Urgent", "value": "urgent"}
              ],
              "metadata": {
                "order": 3,
                "width": "half"
              }
            },
            {
              "id": "field_description",
              "name": "description",
              "label": "Açıklama",
              "labelEn": "Description",
              "type": "textarea",
              "required": true,
              "placeholder": "Sorununuzu detaylı olarak açıklayın",
              "placeholderEn": "Describe your issue in detail",
              "validation": {
                "minLength": 20,
                "maxLength": 5000
              },
              "metadata": {
                "order": 4,
                "width": "full",
                "rows": 5
              }
            },
            {
              "id": "field_attachments",
              "name": "attachments",
              "label": "Ekler",
              "labelEn": "Attachments",
              "type": "file",
              "required": false,
              "multiple": true,
              "accept": "image/*,.pdf,.doc,.docx,.txt",
              "validation": {
                "maxFiles": 5,
                "maxFileSize": 10485760
              },
              "metadata": {
                "order": 5,
                "width": "full"
              }
            }
          ]
        }'::jsonb,
        true,
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key
    const table = await queryRunner.getTable('ticket_form_definitions');
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('createdBy') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('ticket_form_definitions', foreignKey);
    }

    // Drop indexes
    await queryRunner.dropIndex('ticket_form_definitions', 'IDX_ticket_form_definitions_schema');
    await queryRunner.dropIndex('ticket_form_definitions', 'IDX_ticket_form_definitions_is_default');
    await queryRunner.dropIndex('ticket_form_definitions', 'IDX_ticket_form_definitions_is_active');
    await queryRunner.dropIndex('ticket_form_definitions', 'IDX_ticket_form_definitions_name');

    // Drop table
    await queryRunner.dropTable('ticket_form_definitions');
  }
}
