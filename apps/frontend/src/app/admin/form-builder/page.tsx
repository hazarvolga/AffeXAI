'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, Send } from 'lucide-react';

export default function FormBuilderPage() {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string>('all');

  const modules = [
    { value: 'all', label: 'All Forms', icon: FileText },
    { value: 'tickets', label: 'Tickets', icon: FileText },
    { value: 'events', label: 'Events', icon: FileText },
    { value: 'certificates', label: 'Certificates', icon: FileText },
    { value: 'cms', label: 'CMS', icon: FileText },
  ];

  const stats = {
    totalForms: 12,
    activeForms: 8,
    totalSubmissions: 1234,
    pendingSubmissions: 45,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Builder</h1>
          <p className="text-muted-foreground">
            Create and manage forms across all modules
          </p>
        </div>
        <Button onClick={() => router.push('/admin/form-builder/forms/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalForms}</div>
            <p className="text-xs text-muted-foreground">
              Across all modules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeForms}</div>
            <p className="text-xs text-muted-foreground">
              Currently in use
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Submissions
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              All time submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Review
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Module Tabs */}
      <Tabs value={activeModule} onValueChange={setActiveModule}>
        <TabsList>
          {modules.map((module) => (
            <TabsTrigger key={module.value} value={module.value}>
              <module.icon className="mr-2 h-4 w-4" />
              {module.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {modules.map((module) => (
          <TabsContent key={module.value} value={module.value} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{module.label} Forms</CardTitle>
                <CardDescription>
                  Manage forms for {module.label.toLowerCase()} module
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {module.value === 'all' ? 'All Forms' : `${module.label} Forms`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Forms will be displayed here
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        router.push(`/admin/form-builder/forms?module=${module.value}`)
                      }
                    >
                      View Forms
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/admin/form-builder/submissions?module=${module.value}`)
                      }
                    >
                      View Submissions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="cursor-pointer hover:border-primary" onClick={() => router.push('/admin/form-builder/forms')}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Manage Forms
            </CardTitle>
            <CardDescription>
              Create, edit, and organize forms across all modules
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:border-primary" onClick={() => router.push('/admin/form-builder/submissions')}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="mr-2 h-5 w-5" />
              View Submissions
            </CardTitle>
            <CardDescription>
              Review, process, and export form submissions
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
