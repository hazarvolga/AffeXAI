'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search, Filter, Activity, Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { integrationService } from '@/lib/api/integrationService';
import { useToast } from '@/hooks/use-toast';

interface PlatformEvent {
  id: string;
  source: string;
  eventType: string;
  payload: Record<string, any>;
  triggeredRules: string[];
  metadata?: Record<string, any>;
  createdAt: string;
}

const sourceLabels: Record<string, string> = {
  events: 'Etkinlikler',
  'email-marketing': 'E-posta Pazarlama',
  cms: 'CMS',
  certificates: 'Sertifikalar',
  media: 'Medya',
};

const sourceColors: Record<string, string> = {
  events: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'email-marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  cms: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  certificates: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  media: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
};

export default function EventLogViewer() {
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, [selectedSource]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      let data: PlatformEvent[];
      
      if (selectedSource === 'all') {
        data = await integrationService.getEvents(100);
      } else {
        data = await integrationService.getEventsBySource(
          selectedSource as any,
          100
        );
      }
      
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
      toast({
        title: 'Hata',
        description: 'Olaylar yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshEvents = async () => {
    try {
      setRefreshing(true);
      await loadEvents();
      toast({
        title: 'Başarılı',
        description: 'Olaylar güncellendi',
      });
    } catch (error) {
      // Error already handled in loadEvents
    } finally {
      setRefreshing(false);
    }
  };

  const filteredEvents = events?.filter(event => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      event.eventType.toLowerCase().includes(search) ||
      event.source.toLowerCase().includes(search) ||
      JSON.stringify(event.payload).toLowerCase().includes(search)
    );
  }) || [];

  const eventsWithAutomation = events?.filter(e => e.triggeredRules.length > 0) || [];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Olay</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Son 100 olay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otomasyon Tetikleyen</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventsWithAutomation?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {(events?.length || 0) > 0 
                ? `%${Math.round(((eventsWithAutomation?.length || 0) / (events?.length || 1)) * 100)} tetikleme oranı`
                : 'Veri yok'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Son Olay</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(events?.length || 0) > 0 && events?.[0]
                ? new Date(events[0].createdAt).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '-'
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(events?.length || 0) > 0 && events?.[0] ? events[0].eventType : 'Olay yok'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Platform Olayları</CardTitle>
              <CardDescription>
                Platform genelindeki tüm olayları takip edin
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshEvents}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Yenile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Olay ara (tip, kaynak, içerik)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Kaynak filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kaynaklar</SelectItem>
                <SelectItem value="events">Etkinlikler</SelectItem>
                <SelectItem value="email-marketing">E-posta Pazarlama</SelectItem>
                <SelectItem value="cms">CMS</SelectItem>
                <SelectItem value="certificates">Sertifikalar</SelectItem>
                <SelectItem value="media">Medya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Activity className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">Olay bulunamadı</p>
              <p className="text-sm">Henüz kayıtlı olay yok veya filtrelerinize uygun sonuç yok</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zaman</TableHead>
                    <TableHead>Kaynak</TableHead>
                    <TableHead>Olay Tipi</TableHead>
                    <TableHead>İçerik</TableHead>
                    <TableHead>Otomasyon</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-sm">
                        {new Date(event.createdAt).toLocaleString('tr-TR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge className={sourceColors[event.source] || 'bg-gray-100'}>
                          {sourceLabels[event.source] || event.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {event.eventType}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate text-sm text-muted-foreground">
                          {JSON.stringify(event.payload).substring(0, 100)}...
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.triggeredRules.length > 0 ? (
                          <Badge variant="outline" className="gap-1">
                            <Zap className="h-3 w-3" />
                            {event.triggeredRules.length} kural
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
