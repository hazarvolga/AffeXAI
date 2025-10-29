/**
 * Ticket Form Types
 * Frontend types mirroring backend TicketFormDefinition entity
 */

/**
 * Form field types supported by the dynamic form system
 */
export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'url'
  | 'date'
  | 'datetime'
  | 'time'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'file-multiple'
  | 'file-single'
  | 'richtext'
  | 'html'
  | 'edd-order'
  | 'edd-product';

/**
 * Field option for select, multiselect, and radio field types
 */
export interface FieldOption {
  label: string;
  labelEn?: string;
  value: string | number | boolean;
}

/**
 * Field validation rules
 */
export interface FieldValidation {
  min?: number; // For number fields
  max?: number; // For number fields
  minLength?: number; // For text fields
  maxLength?: number; // For text fields
  pattern?: string; // Regex pattern
  maxFiles?: number; // For file upload
  maxFileSize?: number; // In bytes
}

/**
 * Conditional logic for field visibility, requirement, and enabled state
 * Uses JsonLogic expressions for dynamic evaluation
 */
export interface FieldConditional {
  visibleIf?: any; // JsonLogic expression
  requiredIf?: any; // JsonLogic expression
  enabledIf?: any; // JsonLogic expression
}

/**
 * Field metadata for rendering and behavior
 */
export interface FieldMetadata {
  order: number; // Display order in form
  width?: 'full' | 'half' | 'third'; // Field width
  category?: string; // Group category
  agentOnly?: boolean; // Only visible to support agents
  rows?: number; // For textarea fields
  helpText?: string; // Help text displayed below field
  helpTextEn?: string; // English help text
}

/**
 * Form field definition
 */
export interface FormField {
  id: string; // Unique field identifier
  name: string; // Field name (for form data)
  label: string; // Turkish label
  labelEn?: string; // English label
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  placeholderEn?: string;
  helpText?: string; // Help text (Turkish)
  helpTextEn?: string; // Help text (English)
  defaultValue?: any;
  options?: FieldOption[]; // For select, multiselect, radio
  dataSource?: string; // Dynamic data source (e.g., 'categories', 'users')

  // Ticket Fields specific properties
  loadAfter?: string; // Field ID to load after
  autoFill?: boolean; // Auto-fill in ticket form if default value provided
  ticketListWidth?: number; // Column width in ticket list (px)
  dateDisplayAs?: 'date' | 'relative'; // "2025-01-15" vs "2 days ago"
  dateFormat?: string; // "Y-m-d H:i:s" - custom date format
  hasPersonalInfo?: boolean; // GDPR compliance - contains personal data

  validation?: FieldValidation;
  conditional?: FieldConditional;
  metadata: FieldMetadata;
}

/**
 * Complete form schema definition
 */
export interface FormSchema {
  formId: string;
  formName: string;
  formNameEn?: string;
  version: number;
  description?: string;
  descriptionEn?: string;
  fields: FormField[];
}

/**
 * Ticket form definition entity
 */
export interface TicketFormDefinition {
  id: string;
  name: string;
  description?: string;
  version: number;
  schema: FormSchema;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

/**
 * Form version history entry
 */
export interface TicketFormVersion {
  id: number;
  formDefinitionId: string;
  version: number;
  schema: FormSchema;
  changeLog?: string;
  createdAt: string;
  createdBy?: string;
}

/**
 * DTOs for API requests
 */

export interface CreateFormDefinitionDto {
  name: string;
  description?: string;
  schema: FormSchema;
  isActive?: boolean;
  isDefault?: boolean;
}

export interface UpdateFormDefinitionDto {
  name?: string;
  description?: string;
  schema?: FormSchema;
  isActive?: boolean;
  isDefault?: boolean;
  changeLog?: string; // For version tracking
}

export interface FormDefinitionListItem {
  id: string;
  name: string;
  description?: string;
  version: number;
  isActive: boolean;
  isDefault: boolean;
  fieldCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * API response types
 */

export interface GetFormDefinitionsResponse {
  items: FormDefinitionListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface GetFormDefinitionResponse {
  formDefinition: TicketFormDefinition;
}

export interface GetFormVersionsResponse {
  versions: TicketFormVersion[];
  total: number;
}

/**
 * Form rendering types
 */

export interface FormFieldValue {
  [fieldName: string]: any;
}

export interface FormErrors {
  [fieldName: string]: string;
}

export interface DynamicFormProps {
  formDefinition: TicketFormDefinition;
  initialValues?: FormFieldValue;
  onSubmit: (values: FormFieldValue) => void | Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
  readOnly?: boolean;
  showAgentOnlyFields?: boolean; // For admin/support team view
}

export interface FieldRendererProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
}
