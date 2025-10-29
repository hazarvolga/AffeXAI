'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import jsonLogic from 'json-logic-js';
import {
  FormField,
  FormFieldValue,
  DynamicFormProps,
  TicketFormDefinition,
} from '@/types/ticket-form.types';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { FieldRenderer } from './field-renderers';

/**
 * DynamicFormRenderer Component
 * Renders a dynamic form based on TicketFormDefinition schema
 * Supports conditional logic, validation, and all 12 field types
 */
export function DynamicFormRenderer({
  formDefinition,
  initialValues = {},
  onSubmit,
  onCancel,
  isSubmitting = false,
  readOnly = false,
  showAgentOnlyFields = false,
}: DynamicFormProps) {
  const [formValues, setFormValues] = useState<FormFieldValue>(initialValues);

  // Generate Zod schema from form definition
  const zodSchema = React.useMemo(() => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    formDefinition.schema.fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny;

      // Base schema by field type
      switch (field.type) {
        case 'text':
        case 'email':
        case 'url':
        case 'textarea':
        case 'richtext':
          fieldSchema = z.string();
          if (field.validation?.minLength) {
            fieldSchema = (fieldSchema as z.ZodString).min(
              field.validation.minLength,
              `Minimum ${field.validation.minLength} karakter gerekli`
            );
          }
          if (field.validation?.maxLength) {
            fieldSchema = (fieldSchema as z.ZodString).max(
              field.validation.maxLength,
              `Maksimum ${field.validation.maxLength} karakter`
            );
          }
          if (field.type === 'email') {
            fieldSchema = (fieldSchema as z.ZodString).email('Geçerli bir e-posta adresi girin');
          }
          if (field.type === 'url') {
            fieldSchema = (fieldSchema as z.ZodString).url('Geçerli bir URL girin');
          }
          if (field.validation?.pattern) {
            fieldSchema = (fieldSchema as z.ZodString).regex(
              new RegExp(field.validation.pattern),
              'Geçersiz format'
            );
          }
          break;

        case 'number':
          fieldSchema = z.number();
          if (field.validation?.min !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).min(
              field.validation.min,
              `Minimum değer: ${field.validation.min}`
            );
          }
          if (field.validation?.max !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).max(
              field.validation.max,
              `Maksimum değer: ${field.validation.max}`
            );
          }
          break;

        case 'date':
          fieldSchema = z.date();
          break;

        case 'checkbox':
          fieldSchema = z.boolean();
          break;

        case 'select':
        case 'radio':
          fieldSchema = z.string();
          break;

        case 'multiselect':
          fieldSchema = z.array(z.string());
          break;

        case 'file':
          fieldSchema = z.any(); // File validation handled separately
          break;

        default:
          fieldSchema = z.any();
      }

      // Make field optional or required
      if (!field.required) {
        fieldSchema = fieldSchema.optional();
      }

      schemaFields[field.name] = fieldSchema;
    });

    return z.object(schemaFields);
  }, [formDefinition]);

  const form = useForm<FormFieldValue>({
    resolver: zodResolver(zodSchema),
    defaultValues: initialValues,
  });

  // Update form values when they change (for conditional logic)
  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormValues(value as FormFieldValue);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Check if field should be visible based on conditional logic
  const isFieldVisible = (field: FormField): boolean => {
    if (!field.conditional?.visibleIf) return true;

    try {
      return jsonLogic.apply(field.conditional.visibleIf, formValues) as boolean;
    } catch (error) {
      console.error('Error evaluating visibleIf condition:', error);
      return true;
    }
  };

  // Check if field should be required based on conditional logic
  const isFieldRequired = (field: FormField): boolean => {
    if (field.conditional?.requiredIf) {
      try {
        return jsonLogic.apply(field.conditional.requiredIf, formValues) as boolean;
      } catch (error) {
        console.error('Error evaluating requiredIf condition:', error);
        return field.required;
      }
    }
    return field.required;
  };

  // Check if field should be enabled based on conditional logic
  const isFieldEnabled = (field: FormField): boolean => {
    if (field.conditional?.enabledIf) {
      try {
        return jsonLogic.apply(field.conditional.enabledIf, formValues) as boolean;
      } catch (error) {
        console.error('Error evaluating enabledIf condition:', error);
        return true;
      }
    }
    return true;
  };

  // Filter and sort fields
  const visibleFields = formDefinition.schema.fields
    .filter((field) => {
      // Hide agent-only fields if user is not agent
      if (field.metadata.agentOnly && !showAgentOnlyFields) {
        return false;
      }
      // Check conditional visibility
      return isFieldVisible(field);
    })
    .sort((a, b) => a.metadata.order - b.metadata.order);

  const handleSubmit = async (data: FormFieldValue) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Render fields in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleFields.map((field) => {
            const isRequired = isFieldRequired(field);
            const isEnabled = isFieldEnabled(field);
            const colSpan =
              field.metadata.width === 'full'
                ? 'md:col-span-3'
                : field.metadata.width === 'half'
                ? 'md:col-span-2'
                : 'md:col-span-1';

            return (
              <div key={field.id} className={colSpan}>
                <FieldRenderer
                  field={field}
                  control={form.control}
                  disabled={readOnly || !isEnabled}
                  required={isRequired}
                />
              </div>
            );
          })}
        </div>

        {/* Form Actions */}
        {!readOnly && (
          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                İptal
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
