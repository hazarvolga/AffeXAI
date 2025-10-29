'use client';

import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormField } from '@/types/ticket-form.types';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { tr } from 'date-fns/locale';

interface FieldRendererProps {
  field: FormField;
  control: Control<any>;
  disabled?: boolean;
  required?: boolean;
}

export function FieldRenderer({ field, control, disabled, required }: FieldRendererProps) {
  const effectiveRequired = required !== undefined ? required : field.required;
  const label = field.label || field.labelEn || field.name;
  const placeholder = field.placeholder || field.placeholderEn;
  const helpText = field.metadata.helpText || field.metadata.helpTextEn;

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: formField, fieldState }) => (
        <FormItem>
          <FormLabel>
            {label}
            {effectiveRequired && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            {renderFieldByType(field, formField, disabled)}
          </FormControl>
          {helpText && <FormDescription>{helpText}</FormDescription>}
          {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}

function renderFieldByType(field: FormField, formField: any, disabled?: boolean) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'url':
      return (
        <Input
          {...formField}
          type={field.type}
          placeholder={field.placeholder || field.placeholderEn}
          disabled={disabled}
          maxLength={field.validation?.maxLength}
        />
      );

    case 'number':
      return (
        <Input
          {...formField}
          type="number"
          placeholder={field.placeholder || field.placeholderEn}
          disabled={disabled}
          min={field.validation?.min}
          max={field.validation?.max}
          onChange={(e) => formField.onChange(parseFloat(e.target.value))}
        />
      );

    case 'textarea':
      return (
        <Textarea
          {...formField}
          placeholder={field.placeholder || field.placeholderEn}
          disabled={disabled}
          rows={field.metadata.rows || 4}
          maxLength={field.validation?.maxLength}
          className="resize-none"
        />
      );

    case 'select':
      return (
        <Select
          value={formField.value}
          onValueChange={formField.onChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder || 'Seçiniz...'} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value.toString()} value={option.value.toString()}>
                {option.label || option.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'multiselect':
      return (
        <div className="space-y-2 border rounded-md p-4">
          {field.options?.map((option) => {
            const value = option.value.toString();
            const isChecked = formField.value?.includes(value);

            return (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.name}-${value}`}
                  checked={isChecked}
                  disabled={disabled}
                  onCheckedChange={(checked) => {
                    const current = formField.value || [];
                    const updated = checked
                      ? [...current, value]
                      : current.filter((v: string) => v !== value);
                    formField.onChange(updated);
                  }}
                />
                <Label
                  htmlFor={`${field.name}-${value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label || option.labelEn}
                </Label>
              </div>
            );
          })}
        </div>
      );

    case 'radio':
      return (
        <RadioGroup
          value={formField.value}
          onValueChange={formField.onChange}
          disabled={disabled}
          className="space-y-2"
        >
          {field.options?.map((option) => (
            <div key={option.value.toString()} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value.toString()}
                id={`${field.name}-${option.value}`}
              />
              <Label
                htmlFor={`${field.name}-${option.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label || option.labelEn}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={field.name}
            checked={formField.value}
            onCheckedChange={formField.onChange}
            disabled={disabled}
          />
          <Label htmlFor={field.name} className="text-sm font-normal cursor-pointer">
            {field.placeholder || field.placeholderEn || 'Kabul ediyorum'}
          </Label>
        </div>
      );

    case 'date':
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !formField.value && 'text-muted-foreground'
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formField.value ? (
                format(new Date(formField.value), 'PPP', { locale: tr })
              ) : (
                <span>{field.placeholder || 'Tarih seçiniz'}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formField.value ? new Date(formField.value) : undefined}
              onSelect={formField.onChange}
              disabled={disabled}
              initialFocus
              locale={tr}
            />
          </PopoverContent>
        </Popover>
      );

    case 'file':
      return <FileUploadField field={field} formField={formField} disabled={disabled} />;

    case 'richtext':
      return (
        <Textarea
          {...formField}
          placeholder={field.placeholder || field.placeholderEn}
          disabled={disabled}
          rows={field.metadata.rows || 6}
          className="resize-none font-mono text-sm"
        />
      );

    default:
      return <Input {...formField} disabled={disabled} />;
  }
}

function FileUploadField({
  field,
  formField,
  disabled,
}: {
  field: FormField;
  formField: any;
  disabled?: boolean;
}) {
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const maxFiles = field.validation?.maxFiles || 5;
    const maxFileSize = field.validation?.maxFileSize || 10 * 1024 * 1024; // 10MB

    // Validate file count
    if (files.length + selectedFiles.length > maxFiles) {
      alert(`Maksimum ${maxFiles} dosya yükleyebilirsiniz`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = selectedFiles.filter((file) => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      alert(
        `Bazı dosyalar çok büyük. Maksimum dosya boyutu: ${maxFileSize / 1024 / 1024}MB`
      );
      return;
    }

    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);
    formField.onChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    formField.onChange(updatedFiles);
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple={field.validation?.maxFiles ? field.validation.maxFiles > 1 : true}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        Dosya Seç
      </Button>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-md bg-muted"
            >
              <span className="text-sm truncate flex-1">{file.name}</span>
              <span className="text-xs text-muted-foreground mx-2">
                {(file.size / 1024).toFixed(1)} KB
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {field.validation?.maxFiles && (
        <p className="text-xs text-muted-foreground">
          Maksimum {field.validation.maxFiles} dosya (Her biri max{' '}
          {((field.validation.maxFileSize || 10 * 1024 * 1024) / 1024 / 1024).toFixed(0)}MB)
        </p>
      )}
    </div>
  );
}
