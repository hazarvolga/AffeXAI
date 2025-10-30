'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Save, Loader2, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ticketFieldLibraryService from '@/lib/api/ticketFieldLibraryService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface FormFieldEditorProps {
  field: any | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function FormFieldEditor({ field, onSave, onCancel }: FormFieldEditorProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Fetch available fields from ticket field library
  const { data: availableFields } = useQuery({
    queryKey: ['ticket-field-library-all'],
    queryFn: () => ticketFieldLibraryService.getAllFields({ limit: 1000, isActive: true }),
  });

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      selectedFieldId: field?.fieldId || '',
      isRequired: field?.isRequired ? 'yes' : 'no',
      width: field?.width || 'full',
      loadAfter: field?.loadAfter || 'none',
      visibilityConditions: field?.visibilityConditions || [],
    },
  });

  const { fields: conditions, append: appendCondition, remove: removeCondition } = useFieldArray({
    control,
    name: 'visibilityConditions',
  });

  const selectedFieldId = watch('selectedFieldId');
  const selectedIsRequired = watch('isRequired');
  const selectedWidth = watch('width');
  const selectedLoadAfter = watch('loadAfter');

  const onSubmit = async (data: any) => {
    if (!data.selectedFieldId) {
      toast({
        title: 'Error',
        description: 'Please select a field',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      const selectedField = availableFields?.items.find(f => f.id === data.selectedFieldId);

      const formData = {
        fieldId: selectedField?.fieldConfig.id,
        fieldName: selectedField?.fieldConfig.label,
        isRequired: data.isRequired === 'yes',
        width: data.width,
        loadAfter: data.loadAfter === 'none' ? null : data.loadAfter,
        visibilityConditions: data.visibilityConditions || [],
      };

      await onSave(formData);

      toast({
        title: 'Success',
        description: 'Field configuration saved',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Select Field */}
      <div className="space-y-2">
        <Label>
          Select Field <span className="text-destructive">*</span>
        </Label>
        <Select
          value={selectedFieldId}
          onValueChange={(value) => setValue('selectedFieldId', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a field..." />
          </SelectTrigger>
          <SelectContent>
            {!availableFields || availableFields.items.length === 0 ? (
              <SelectItem value="none" disabled>
                No fields available - Create fields first in Ticket Fields page
              </SelectItem>
            ) : (
              availableFields.items.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.fieldConfig.label} ({f.fieldConfig.type})
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Is Required */}
      <div className="space-y-3">
        <Label>Is required?</Label>
        <RadioGroup
          value={selectedIsRequired}
          onValueChange={(value) => setValue('isRequired', value)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="required-yes" />
            <Label htmlFor="required-yes" className="font-normal cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="required-no" />
            <Label htmlFor="required-no" className="font-normal cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Width */}
      <div className="space-y-2">
        <Label>Width</Label>
        <Select
          value={selectedWidth}
          onValueChange={(value) => setValue('width', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1/3">1/3 of row</SelectItem>
            <SelectItem value="full">Full width of row</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Load After */}
      <div className="space-y-2">
        <Label>Load after</Label>
        <Select
          value={selectedLoadAfter}
          onValueChange={(value) => setValue('loadAfter', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">-- None --</SelectItem>
            {availableFields?.items.map((f) => (
              <SelectItem key={f.id} value={f.fieldConfig.id}>
                {f.fieldConfig.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          This field will appear after the selected field in the form
        </p>
      </div>

      <Separator />

      {/* Visibility Conditions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Visibility Conditions</CardTitle>
              <CardDescription>
                Show this field only when conditions are met
              </CardDescription>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => appendCondition({ field: '', operator: 'Equal', value: '', logic: 'AND' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Condition
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {conditions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No conditions added. Field will always be visible.
            </p>
          ) : (
            conditions.map((condition, index) => (
              <div key={condition.id}>
                {index > 0 && (
                  <div className="flex items-center justify-center my-2">
                    <Select
                      value={watch(`visibilityConditions.${index}.logic`) || 'AND'}
                      onValueChange={(value) => setValue(`visibilityConditions.${index}.logic`, value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex gap-2 items-start border rounded-lg p-4">
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    {/* Field Selection */}
                    <div className="space-y-2">
                      <Label className="text-xs">Field</Label>
                      <Select
                        value={watch(`visibilityConditions.${index}.field`) || ''}
                        onValueChange={(value) => setValue(`visibilityConditions.${index}.field`, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFields?.items.map((f) => (
                            <SelectItem key={f.id} value={f.fieldConfig.id}>
                              {f.fieldConfig.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Operator */}
                    <div className="space-y-2">
                      <Label className="text-xs">Compare as</Label>
                      <Select
                        value={watch(`visibilityConditions.${index}.operator`) || 'Equal'}
                        onValueChange={(value) => setValue(`visibilityConditions.${index}.operator`, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Equal">Equal</SelectItem>
                          <SelectItem value="Matches">Matches</SelectItem>
                          <SelectItem value="NotEqual">Not Equal</SelectItem>
                          <SelectItem value="Contains">Contains</SelectItem>
                          <SelectItem value="StartsWith">Starts With</SelectItem>
                          <SelectItem value="EndsWith">Ends With</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Value */}
                    <div className="space-y-2">
                      <Label className="text-xs">Value</Label>
                      <input
                        type="text"
                        {...register(`visibilityConditions.${index}.value`)}
                        placeholder="Enter value..."
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCondition(index)}
                    className="mt-7"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
