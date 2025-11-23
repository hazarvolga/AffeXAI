'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft, 
  Send, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Users,
  Mail,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Play
} from 'lucide-react';
import Link from 'next/link';
import { CampaignPerformanceChart } from '@/app/admin/email-marketing/_components/campaign-performance-chart';
import emailCampaignsService, { EmailCampaign } from '@/lib/api/emailCampaignsService';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function CampaignsManagementPage() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await emailCampaignsService.getAll();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Kampanyalar yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCampaign = async (campaignId: string) => {
    try {
      await emailCampaignsService.sendCampaign(campaignId);
      // Refresh campaigns to update status
      await fetchCampaigns();
      alert('Kampanya başarıyla gönderildi!');
    } catch (err) {
      console.error('Error sending campaign:', err);
      alert('Kampanya gönderilirken bir hata oluştu.');
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    try {
      await emailCampaignsService.delete(campaignId);
      // Refresh campaigns list
      await fetchCampaigns();
      alert('Kampanya başarıyla silindi!');
    } catch (err) {
      console.error('Error deleting campaign:', err);
      alert('Kampanya silinirken bir hata oluştu.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary"><Edit className="w-3 h-3 mr-1" />Taslak</Badge>;
      case 'scheduled':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Planlandı</Badge>;
      case 'sending':
        return <Badge variant="default"><Send className="w-3 h-3 mr-1" />Gönderiliyor</Badge>;
      case 'sent':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Gönderildi</Badge>;
      case 'paused':
        return <Badge variant="outline"><Pause className="w-3 h-3 mr-1" />Duraklatıldı</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />İptal Edildi</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateOpenRate = (campaign: EmailCampaign) => {
    if (!campaign.sentCount || campaign.sentCount === 0) return '0.00';
    return ((campaign.openedCount || 0) / campaign.sentCount * 100).toFixed(2);
  };

  const calculateClickRate = (campaign: EmailCampaign) => {
    if (!campaign.openedCount || campaign.openedCount === 0) return '0.00';
    return ((campaign.clickedCount || 0) / campaign.openedCount * 100).toFixed(2);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/email-marketing">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Kampanyaları Yönet</h1>
          <p className="text-muted-foreground">Bülten kampanyalarınızı oluşturun, gönderin ve takip edin.</p>
        </div>
        <Button asChild>
          <Link href="/admin/email-marketing/campaigns/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Yeni Kampanya Oluştur
          </Link>
        </Button>
      </div>

      {/* Campaign Performance Chart */}
      <CampaignPerformanceChart />

      <Card>
        <CardHeader>
          <CardTitle>Kampanyalar</CardTitle>
          <CardDescription>
            Tüm email kampanyalarınızı görüntüleyin ve yönetin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">Kampanyalar yükleniyor...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-sm text-red-500">{error}</p>
                <Button variant="outline" className="mt-2" onClick={fetchCampaigns}>
                  Tekrar Dene
                </Button>
              </div>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Send className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Henüz kampanya oluşturulmadı</h3>
                <p className="text-muted-foreground">
                  İlk email kampanyanızı oluşturarak başlayın.
                </p>
              </div>
              <Button asChild>
                <Link href="/admin/email-marketing/campaigns/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Kampanya Oluştur
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kampanya Adı</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Alıcı Sayısı</TableHead>
                    <TableHead>Açılma Oranı</TableHead>
                    <TableHead>Tıklama Oranı</TableHead>
                    <TableHead>Oluşturulma</TableHead>
                    <TableHead>Gönderim</TableHead>
                    <TableHead><span className="sr-only">Eylemler</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {campaign.subject}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(campaign.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {campaign.sentCount || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {calculateOpenRate(campaign)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4 text-muted-foreground" />
                          {calculateClickRate(campaign)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {formatDate(campaign.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {campaign.sentAt ? (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Send className="w-4 h-4" />
                            {formatDate(campaign.sentAt)}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Menüyü aç</span>
                              <span className="text-lg">⋮</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/email-marketing/campaigns/${campaign.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Görüntüle
                              </Link>
                            </DropdownMenuItem>
                            {campaign.status === 'draft' && (
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/email-marketing/campaigns/${campaign.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Düzenle
                                </Link>
                              </DropdownMenuItem>
                            )}
                            {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
                              <DropdownMenuItem onClick={() => handleSendCampaign(campaign.id)}>
                                <Send className="mr-2 h-4 w-4" />
                                Gönder
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem 
                                  onSelect={(e) => e.preventDefault()} 
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Sil
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Bu işlem geri alınamaz. "{campaign.name}" kampanyası kalıcı olarak silinecek.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>İptal</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteCampaign(campaign.id)}>
                                    Sil
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
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