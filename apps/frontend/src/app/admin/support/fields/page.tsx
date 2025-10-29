'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TicketFieldsPage() {
  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ticket Fields</h1>
        <p className="text-muted-foreground mt-1">
          Ticket alanlarını yönetin ve özelleştirin
        </p>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket Alanları</CardTitle>
          <CardDescription>
            Ticket'larda kullanılacak özel alanları tanımlayın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Bu sayfa ticket alanlarını yönetmek için kullanılacak.
            <br />
            Nasıl çalışmasını istediğini anlat, ben kodlayım.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
