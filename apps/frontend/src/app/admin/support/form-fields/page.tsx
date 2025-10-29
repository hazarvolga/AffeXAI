'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TicketFormFieldsPage() {
  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ticket Form Fields</h1>
        <p className="text-muted-foreground mt-1">
          Form alanlarını yönetin ve özelleştirin
        </p>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Form Alanları</CardTitle>
          <CardDescription>
            Ticket formlarında kullanılacak alanları tanımlayın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Bu sayfa form alanlarını yönetmek için kullanılacak.
            <br />
            Nasıl çalışmasını istediğini anlat, ben kodlayım.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
