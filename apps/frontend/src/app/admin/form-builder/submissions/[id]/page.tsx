'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Archive,
  Download,
  User,
  Calendar,
  Globe,
  Monitor,
} from 'lucide-react';

export default function SubmissionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [processingNotes, setProcessingNotes] = useState('');

  // Mock data - replace with actual API call
  const submission = {
    id: params.id,
    formName: 'Support Ticket Form',
    formDescription: 'Customer support ticket submission form',
    module: 'tickets',
    formType: 'standard',
    status: 'pending',
    submittedAt: '2024-11-01T10:30:00Z',
    submitterName: 'John Doe',
    submitterEmail: 'john@example.com',
    submitterId: 'user-123',
    submitterIp: '192.168.1.100',
    submitterUserAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    sourceModule: 'tickets',
    sourceRecordId: 'ticket-456',
    submittedData: {
      subject: 'Cannot login to my account',
      description: 'I am unable to login with my credentials. Getting error message "Invalid username or password".',
      priority: 'high',
      category: 'Account Issues',
      affectsMultipleUsers: false,
      contactMethod: 'email',
    },
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; icon: any }> = {
      pending: { variant: 'secondary', label: 'Pending', icon: Calendar },
      processed: { variant: 'default', label: 'Processed', icon: CheckCircle },
      failed: { variant: 'destructive', label: 'Failed', icon: XCircle },
      archived: { variant: 'outline', label: 'Archived', icon: Archive },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant}>
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const handleMarkAsProcessed = () => {
    // TODO: Implement API call
    console.log('Mark as processed with notes:', processingNotes);
  };

  const handleMarkAsFailed = () => {
    // TODO: Implement API call
    console.log('Mark as failed with notes:', processingNotes);
  };

  const handleArchive = () => {
    // TODO: Implement API call
    console.log('Archive submission');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Submission Details</h1>
            <p className="text-muted-foreground">
              Submission ID: {submission.id}
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Form Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{submission.formName}</CardTitle>
                  <CardDescription>{submission.formDescription}</CardDescription>
                </div>
                {getStatusBadge(submission.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Module</span>
                  <Badge>{submission.module}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Form Type</span>
                  <span className="text-sm font-medium">{submission.formType}</span>
                </div>
                {submission.sourceRecordId && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Source Record</span>
                    <span className="text-sm font-medium">{submission.sourceRecordId}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submitted Data */}
          <Card>
            <CardHeader>
              <CardTitle>Submitted Data</CardTitle>
              <CardDescription>Form field values submitted by the user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(submission.submittedData).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="mt-1 p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        {typeof value === 'boolean'
                          ? value
                            ? 'Yes'
                            : 'No'
                          : value?.toString() || 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Processing Notes */}
          {submission.status === 'pending' && (
            <Card>
              <CardHeader>
                <CardTitle>Processing Actions</CardTitle>
                <CardDescription>
                  Add notes and change submission status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Processing Notes</label>
                  <Textarea
                    placeholder="Enter processing notes..."
                    value={processingNotes}
                    onChange={(e) => setProcessingNotes(e.target.value)}
                    rows={4}
                  />
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button onClick={handleMarkAsProcessed}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Processed
                  </Button>
                  <Button variant="destructive" onClick={handleMarkAsFailed}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Mark as Failed
                  </Button>
                  <Button variant="outline" onClick={handleArchive}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Submitter Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Submitter Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Name</label>
                <p className="text-sm font-medium">{submission.submitterName}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <p className="text-sm font-medium">{submission.submitterEmail}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">User ID</label>
                <p className="text-sm font-medium text-muted-foreground">
                  {submission.submitterId}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Submission Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  Submitted At
                </label>
                <p className="text-sm font-medium">
                  {new Date(submission.submittedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Separator />
              <div>
                <label className="text-xs text-muted-foreground flex items-center">
                  <Globe className="mr-1 h-3 w-3" />
                  IP Address
                </label>
                <p className="text-sm font-medium text-muted-foreground">
                  {submission.submitterIp}
                </p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground flex items-center">
                  <Monitor className="mr-1 h-3 w-3" />
                  User Agent
                </label>
                <p className="text-xs text-muted-foreground break-words">
                  {submission.submitterUserAgent}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
