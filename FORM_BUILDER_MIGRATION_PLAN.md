# 🏗️ Form Builder Migration Plan

**Date**: 2025-11-01
**Status**: Planning
**Restore Point**: `v1.0.1-before-form-builder-migration`

---

## 📊 Executive Summary

Migrating from ticket-specific forms to a **centralized Universal Form Builder** following industry best practices (Salesforce, ServiceNow, HubSpot, Zendesk patterns).

**Goal**: Build once, use everywhere - Forms available to all modules (Tickets, Events, CMS, Certificates, etc.)

**Timeline**: 2-3 weeks
**Risk Level**: Low (we own the migration, good restore point)
**ROI**: 50-60% time savings on future development

---

## 🎯 Architecture Decision

### Current State
```
ticket_form_definitions    → Ticket-specific
ticket_field_library       → Ticket-specific
ticket_form_versions       → Ticket-specific
```

### Target State
```
form_definitions           → Universal (all modules)
form_field_library         → Universal (reusable fields)
form_versions              → Universal
form_submissions           → NEW (centralized storage)
form_actions               → NEW (webhooks, automations)
```

---

## 🗂️ Database Migration

### Phase 1: Rename Tables (Zero Downtime)

```sql
-- Step 1: Rename tables (keeps all data)
ALTER TABLE ticket_form_definitions RENAME TO form_definitions;
ALTER TABLE ticket_form_versions RENAME TO form_versions;
ALTER TABLE ticket_field_library RENAME TO form_field_library;

-- Step 2: Add generalization columns
ALTER TABLE form_definitions
  ADD COLUMN module VARCHAR(50) DEFAULT 'tickets',
  ADD COLUMN form_type VARCHAR(50) DEFAULT 'standard',
  ADD COLUMN allow_public_submissions BOOLEAN DEFAULT false,
  ADD COLUMN settings JSONB DEFAULT '{}';

-- Step 3: Update existing data
UPDATE form_definitions SET module = 'tickets' WHERE module IS NULL;

-- Step 4: Create indexes
CREATE INDEX idx_form_definitions_module ON form_definitions(module);
CREATE INDEX idx_form_definitions_form_type ON form_definitions(form_type);
CREATE INDEX idx_form_definitions_is_active ON form_definitions(isActive) WHERE isActive = true;
```

### Phase 2: Create New Tables

```sql
-- Form Submissions (centralized storage)
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_id UUID NOT NULL REFERENCES form_definitions(id) ON DELETE CASCADE,
  submitted_data JSONB NOT NULL,

  -- Source tracking
  source_module VARCHAR(50) NOT NULL,     -- 'tickets', 'events', 'cms', 'certificates'
  source_record_id UUID,                  -- ticket_id, event_id, cms_page_id, etc.

  -- User tracking
  submitted_by UUID REFERENCES users(id),
  submitted_at TIMESTAMP DEFAULT NOW(),

  -- Status
  status VARCHAR(50) DEFAULT 'pending',   -- 'pending', 'processed', 'approved', 'rejected'
  processed_at TIMESTAMP,
  processed_by UUID REFERENCES users(id),

  -- Metadata
  metadata JSONB DEFAULT '{}',
  ip_address VARCHAR(45),
  user_agent TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_submissions_form_id ON form_submissions(form_id);
CREATE INDEX idx_submissions_source_module ON form_submissions(source_module);
CREATE INDEX idx_submissions_source_record ON form_submissions(source_record_id);
CREATE INDEX idx_submissions_submitted_by ON form_submissions(submitted_by);
CREATE INDEX idx_submissions_status ON form_submissions(status);
CREATE INDEX idx_submissions_submitted_at ON form_submissions(submitted_at DESC);

-- Composite index for common queries
CREATE INDEX idx_submissions_module_status ON form_submissions(source_module, status);

-- Form Actions (webhooks, automations)
CREATE TABLE form_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_id UUID NOT NULL REFERENCES form_definitions(id) ON DELETE CASCADE,

  name VARCHAR(100) NOT NULL,
  description TEXT,

  -- Trigger
  trigger_event VARCHAR(50) NOT NULL,     -- 'on_submit', 'on_update', 'on_approve', 'on_reject'
  trigger_conditions JSONB,               -- JsonLogic conditions

  -- Action
  action_type VARCHAR(50) NOT NULL,       -- 'webhook', 'email', 'create_ticket', 'create_event'
  action_config JSONB NOT NULL,

  -- Status
  is_active BOOLEAN DEFAULT true,
  execution_order INT DEFAULT 0,

  -- Stats
  total_executions INT DEFAULT 0,
  successful_executions INT DEFAULT 0,
  failed_executions INT DEFAULT 0,
  last_executed_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_form_actions_form_id ON form_actions(form_id);
CREATE INDEX idx_form_actions_is_active ON form_actions(is_active) WHERE is_active = true;
```

---

## 🔧 Backend Module Structure

### New Module: `form-builder`

```
apps/backend/src/modules/form-builder/
├── entities/
│   ├── form-definition.entity.ts        # Renamed from ticket-form-definition
│   ├── form-version.entity.ts           # Renamed from ticket-form-version
│   ├── form-field-library.entity.ts     # Renamed from ticket-field-library
│   ├── form-submission.entity.ts        # NEW
│   └── form-action.entity.ts            # NEW
│
├── services/
│   ├── form-builder.service.ts          # Core CRUD
│   ├── form-renderer.service.ts         # Generate form HTML/JSON
│   ├── form-validation.service.ts       # Validate submissions
│   ├── form-submission.service.ts       # Handle submissions
│   ├── form-export.service.ts           # Excel, CSV, PDF export
│   ├── form-webhook.service.ts          # Webhook execution
│   └── form-analytics.service.ts        # Form performance metrics
│
├── controllers/
│   ├── form-builder.controller.ts       # Form CRUD endpoints
│   ├── form-submission.controller.ts    # Submission & export
│   └── form-public.controller.ts        # Public form endpoints (no auth)
│
├── dto/
│   ├── create-form.dto.ts
│   ├── update-form.dto.ts
│   ├── submit-form.dto.ts
│   ├── export-form.dto.ts
│   └── form-filter.dto.ts
│
└── form-builder.module.ts
```

### Module Integration Pattern

```typescript
// Tickets module adapter
@Injectable()
export class TicketFormAdapter {
  constructor(
    private formSubmissionService: FormSubmissionService,
    private ticketsService: TicketsService
  ) {}

  async createTicketFromForm(submissionId: string) {
    const submission = await this.formSubmissionService.findOne(submissionId);

    // Map form data to ticket
    const ticketData = {
      title: submission.submitted_data.title,
      description: submission.submitted_data.description,
      priority: submission.submitted_data.priority,
      categoryId: submission.submitted_data.categoryId,
      customFieldsData: submission.submitted_data, // Store all form data
      formDefinitionId: submission.form_id,
      submittedBy: submission.submitted_by
    };

    return this.ticketsService.create(ticketData);
  }
}

// Events module integration
@Entity('events')
export class Event {
  @Column({ type: 'uuid', nullable: true })
  registrationFormId: string;

  @ManyToOne(() => FormDefinition)
  @JoinColumn({ name: 'registrationFormId' })
  registrationForm: FormDefinition;
}

@Injectable()
export class EventService {
  async registerParticipant(eventId: string, formData: any) {
    // Submit to form_submissions
    const submission = await this.formSubmissionService.create({
      form_id: event.registrationFormId,
      submitted_data: formData,
      source_module: 'events',
      source_record_id: eventId,
      submitted_by: userId
    });

    // Create event registration
    return this.eventRegistrationService.create({
      eventId,
      userId,
      formSubmissionId: submission.id,
      status: 'registered'
    });
  }
}
```

---

## 🎨 Frontend Structure

### New Routes

```
/admin/form-builder
├── /                         # Form list (all modules)
├── /new                      # Create new form
├── /[id]/edit                # Edit form
├── /[id]/preview             # Preview form
├── /[id]/submissions         # View submissions (NEW)
├── /[id]/submissions/export  # Export to Excel/CSV/PDF (NEW)
├── /[id]/analytics           # Form analytics (NEW)
├── /field-library            # Manage reusable fields
└── /settings                 # Form builder settings
```

### Form Submissions UI (NEW)

```tsx
// apps/frontend/src/app/admin/form-builder/[id]/submissions/page.tsx

export default function FormSubmissionsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader>
        <PageTitle>Form Submissions</PageTitle>
        <div className="flex gap-2">
          <ExportButton format="excel" />
          <ExportButton format="csv" />
          <ExportButton format="pdf" />
        </div>
      </PageHeader>

      {/* Filters */}
      <SubmissionFilters>
        <Select>
          <SelectTrigger>Source Module</SelectTrigger>
          <SelectContent>
            <SelectItem value="tickets">Tickets</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="cms">CMS</SelectItem>
          </SelectContent>
        </Select>

        <DateRangePicker />

        <Select>
          <SelectTrigger>Status</SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processed">Processed</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
      </SubmissionFilters>

      {/* Data Table */}
      <DataTable
        columns={[
          { header: 'Submitted At', accessor: 'submitted_at' },
          { header: 'Source', accessor: 'source_module' },
          { header: 'Submitted By', accessor: 'submitted_by' },
          { header: 'Status', accessor: 'status' },
          { header: 'Actions', accessor: 'actions' }
        ]}
        data={submissions}
      />
    </div>
  );
}
```

### Export Service

```typescript
// apps/backend/src/modules/form-builder/services/form-export.service.ts

@Injectable()
export class FormExportService {
  async exportToExcel(formId: string, filters: ExportFilters): Promise<Buffer> {
    const submissions = await this.formSubmissionService.findAll({ formId, ...filters });
    const formDefinition = await this.formBuilderService.findOne(formId);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Submissions');

    // Headers from form fields
    const headers = formDefinition.schema.fields.map(f => f.label);
    headers.push('Submitted At', 'Submitted By', 'Status');
    worksheet.addRow(headers);

    // Data rows
    submissions.forEach(submission => {
      const row = formDefinition.schema.fields.map(field =>
        submission.submitted_data[field.name]
      );
      row.push(
        submission.submitted_at,
        submission.submitted_by?.name,
        submission.status
      );
      worksheet.addRow(row);
    });

    return await workbook.xlsx.writeBuffer();
  }

  async exportToCSV(formId: string, filters: ExportFilters): Promise<string> {
    // Similar to Excel but CSV format
  }

  async exportToPDF(formId: string, filters: ExportFilters): Promise<Buffer> {
    // Use PDFKit to generate PDF
  }
}
```

---

## 📋 Migration Steps (Detailed)

### Week 1: Database & Backend

**Day 1-2: Database Migration**
- [ ] Create migration script
- [ ] Test migration on development database
- [ ] Run migration (rename tables, add columns)
- [ ] Verify all existing ticket forms still work
- [ ] Create `form_submissions` table
- [ ] Create `form_actions` table

**Day 3-4: Backend Module**
- [ ] Create `form-builder` module
- [ ] Move entities from `tickets` to `form-builder`
- [ ] Update imports across the codebase
- [ ] Create form submission service
- [ ] Create form export service
- [ ] Add export endpoints (Excel, CSV, PDF)

**Day 5: Testing**
- [ ] Test form creation
- [ ] Test form submission
- [ ] Test export functionality
- [ ] Verify ticket forms still work

### Week 2: Frontend

**Day 1-2: Routes & UI**
- [ ] Create `/admin/form-builder` routes
- [ ] Move form list from `/admin/support/forms`
- [ ] Update navigation sidebar
- [ ] Add module filter to form list

**Day 3-4: Submissions UI**
- [ ] Create submissions list page
- [ ] Add filters (module, date, status)
- [ ] Implement export buttons
- [ ] Create submission detail view

**Day 5: Testing**
- [ ] Test all form builder pages
- [ ] Test export to Excel
- [ ] Test export to CSV
- [ ] Test export to PDF

### Week 3: Module Integrations

**Day 1: Events Integration**
- [ ] Add `registrationFormId` to Event entity
- [ ] Create form picker in event creation UI
- [ ] Handle event registration via form submissions

**Day 2: CMS Integration**
- [ ] Create "Embedded Form" block type
- [ ] Add form picker to CMS editor
- [ ] Render forms on CMS pages

**Day 3-4: Advanced Features**
- [ ] Form analytics dashboard
- [ ] Conditional logic builder (optional)
- [ ] Webhook configuration UI

**Day 5: Final Testing & Documentation**
- [ ] End-to-end testing
- [ ] Update documentation
- [ ] Create user guide

---

## 🚀 Rollback Plan

If anything goes wrong:

```bash
# Rollback to restore point
git checkout v1.0.1-before-form-builder-migration

# Revert database changes
psql -U postgres -d affexai_dev < backup-before-migration.sql

# Restart services
npm run cleanup
npm run dev
```

---

## ✅ Success Criteria

- [ ] All existing ticket forms work without changes
- [ ] New forms can be created in Form Builder
- [ ] Forms can be assigned to modules (Tickets, Events, CMS)
- [ ] Submissions are stored in `form_submissions` table
- [ ] Export to Excel works
- [ ] Export to CSV works
- [ ] Export to PDF works
- [ ] Events can use forms for registration
- [ ] CMS can embed forms on pages
- [ ] Zero data loss during migration
- [ ] Performance is equal or better than before

---

## 📊 Benefits Summary

### Immediate Benefits
- ✅ Single form builder for all modules
- ✅ Consistent UX across platform
- ✅ Centralized submission tracking
- ✅ Export functionality for all forms

### Long-term Benefits
- ✅ 50-60% faster development for new modules
- ✅ 70%+ less maintenance overhead
- ✅ Easy to add advanced features (conditional logic, webhooks)
- ✅ Scalable architecture matching industry leaders

### Business Value
- ✅ Faster time-to-market for new features
- ✅ Better data insights (centralized analytics)
- ✅ Improved customer experience (consistent forms)
- ✅ Enterprise-grade architecture

---

## 📝 Notes

- **Data Safety**: All migrations preserve existing data
- **Backward Compatibility**: Existing ticket forms continue working
- **Zero Downtime**: Tables renamed without service interruption
- **Restore Point**: `v1.0.1-before-form-builder-migration` tag created

---

**Next Action**: Execute database migration script
