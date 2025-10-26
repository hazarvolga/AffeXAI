'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Lightbulb, Copy, CheckCircle2, XCircle } from 'lucide-react';
import { getDNSConfiguration, replaceDomainPlaceholder, type DNSRecord } from '@/lib/email-dns-config';
import { toast } from 'sonner';

interface DNSConfigurationGuideProps {
  provider: string;
  domain?: string;
  onVerify?: () => void;
  verificationStatus?: {
    spf?: boolean;
    dkim?: boolean;
    dmarc?: boolean;
  };
}

export function DNSConfigurationGuide({
  provider,
  domain = 'aluplan.tr',
  onVerify,
  verificationStatus
}: DNSConfigurationGuideProps) {
  const config = getDNSConfiguration(provider);

  if (!config) {
    return null;
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} kopyalandı!`);
  };

  const renderDNSRecord = (record: DNSRecord, label: string, verified?: boolean) => {
    const name = replaceDomainPlaceholder(record.name, domain);
    const value = replaceDomainPlaceholder(record.value, domain);

    return (
      <div className="rounded-md bg-muted p-3" key={`${label}-${name}`}>
        <div className="font-semibold mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
              {label}
            </span>
            <span className="text-xs text-muted-foreground">
              {record.type === 'TXT' && 'TXT Record'}
              {record.type === 'CNAME' && 'CNAME Record'}
              {record.type === 'MX' && 'MX Record'}
            </span>
          </div>
          {verified !== undefined && (
            <div className="flex items-center gap-1">
              {verified ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-xs">
                {verified ? 'Doğrulandı' : 'Doğrulanmadı'}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1 font-mono text-[10px] bg-background p-2 rounded">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span>{record.type}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Name:</span>
            <div className="flex items-center gap-1">
              <span className={record.isDynamic ? 'text-orange-500' : ''}>{name}</span>
              {!record.isDynamic && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0"
                  onClick={() => copyToClipboard(name, 'Name')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-muted-foreground whitespace-nowrap">Value:</span>
            <div className="flex items-start gap-1 flex-1">
              <span className={`break-all text-right ${record.isDynamic ? 'text-orange-500' : ''}`}>
                {value}
              </span>
              {!record.isDynamic && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 flex-shrink-0"
                  onClick={() => copyToClipboard(value, 'Value')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {record.priority && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Priority:</span>
              <span>{record.priority}</span>
            </div>
          )}
        </div>

        {record.note && (
          <p className="text-xs text-muted-foreground mt-2">
            💡 {record.note}
          </p>
        )}

        {record.isDynamic && config.dashboardUrl && (
          <p className="text-xs text-muted-foreground mt-2">
            📍 Değeri almak için:{' '}
            <a
              href={config.dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {config.displayName} Dashboard
            </a>
          </p>
        )}
      </div>
    );
  };

  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>DNS Yapılandırması Gerekli</AlertTitle>
      <AlertDescription className="mt-2 space-y-4">
        <p className="text-sm">
          Email'lerinizin spam'e düşmemesi ve güvenli gönderilmesi için <strong>{domain}</strong> domain'inde
          aşağıdaki DNS kayıtlarını eklemeniz gerekir:
        </p>

        <div className="space-y-3 text-xs">
          {/* SPF Record */}
          {config.records.spf && renderDNSRecord(
            config.records.spf,
            'SPF',
            verificationStatus?.spf
          )}

          {/* DKIM Record */}
          {config.records.dkim && renderDNSRecord(
            config.records.dkim,
            'DKIM',
            verificationStatus?.dkim
          )}

          {/* DMARC Record */}
          {config.records.dmarc && renderDNSRecord(
            config.records.dmarc,
            'DMARC',
            verificationStatus?.dmarc
          )}

          {/* Custom Records (MX, additional CNAMEs, etc.) */}
          {config.records.custom?.map((record, index) =>
            renderDNSRecord(record, record.type, undefined)
          )}

          {/* Setup Steps */}
          <div className="rounded-md bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 border p-3">
            <div className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
              📋 Kurulum Adımları:
            </div>
            <ol className="space-y-1 text-blue-800 dark:text-blue-200 list-decimal list-inside text-xs">
              {config.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t flex items-center gap-2">
          {config.docsUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={config.docsUrl} target="_blank" rel="noopener noreferrer">
                <Lightbulb className="mr-2 h-3 w-3" />
                {config.displayName} Dokümantasyonu
              </a>
            </Button>
          )}

          {onVerify && (
            <Button variant="default" size="sm" onClick={onVerify}>
              <CheckCircle2 className="mr-2 h-3 w-3" />
              DNS Kayıtlarını Kontrol Et
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
