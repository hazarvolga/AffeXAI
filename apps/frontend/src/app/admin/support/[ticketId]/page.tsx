'use client';

import { useEffect, useState, useRef } from "react";
import { use } from "react";
import { notFound, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import {
  Clock,
  User,
  Hash,
  Tag,
  Shield,
  Send,
  Paperclip,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Toggle } from '@/components/ui/toggle';
import { ticketsService, Ticket, TicketStatus, TicketPriority } from '@/lib/api/ticketsService';
import { useToast } from '@/hooks/use-toast';

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  // Unwrap the params promise using React.use()
  const unwrappedParams = use(params);
  const { ticketId } = unwrappedParams;
  const router = useRouter();
  const { toast } = useToast();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [attachments, setAttachments] = useState<{id: string, name: string, size: number, type: string}[]>([]);
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const hasFetchedTicket = useRef(false);

  useEffect(() => {
    // Prevent multiple fetches
    if (hasFetchedTicket.current) return;
    hasFetchedTicket.current = true;
    
    const fetchTicket = async () => {
      try {
        setLoading(true);
        const ticketData = await ticketsService.getTicketById(ticketId);
        setTicket(ticketData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching ticket:', err);
        setError('Talep bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleAddMessage = async () => {
    if (!messageContent.trim() || !ticket) return;

    try {
      const newMessage = await ticketsService.addMessage(ticket.id, {
        content: messageContent,
        isInternal: isInternalNote,
      });

      // Refresh ticket data to get updated messages
      const updatedTicket = await ticketsService.getTicketById(ticketId);
      setTicket(updatedTicket);
      setMessageContent('');
      setAttachments([]);
      
      toast({
        title: isInternalNote ? "Dahili not kaydedildi" : "Mesaj gönderildi",
        description: isInternalNote ? "Dahili not başarıyla kaydedildi." : "Mesaj müşteriye başarıyla gönderildi.",
      });
    } catch (err: any) {
      console.error('Error adding message:', err);
      toast({
        title: "Hata",
        description: "Mesaj gönderilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (status: TicketStatus) => {
    if (!ticket) return;

    try {
      setUpdatingStatus(true);
      const updatedTicket = await ticketsService.updateTicketStatus(ticket.id, { status });
      setTicket(updatedTicket);
      
      toast({
        title: "Durum güncellendi",
        description: "Talep durumu başarıyla güncellendi.",
      });
    } catch (err: any) {
      console.error('Error updating status:', err);
      toast({
        title: "Hata",
        description: "Durum güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  if (!ticket) {
    notFound();
    return null;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{ticket.title}</CardTitle>
            <CardDescription>
              {ticket.user?.firstName} {ticket.user?.lastName} tarafından{' '}
              {formatDate(ticket.createdAt.toString())}{' '}
              tarihinde oluşturuldu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {ticket.messages?.map((message, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${message.user?.firstName} ${message.user?.lastName}`} />
                    <AvatarFallback>
                      {getInitials(`${message.user?.firstName} ${message.user?.lastName}`)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{message.user?.firstName} {message.user?.lastName}</p>
                      <div className="flex items-center gap-2">
                        {message.isInternal && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <EyeOff className="h-3 w-3" />
                            Dahili Not
                          </Badge>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDate(message.createdAt.toString())}
                        </p>
                      </div>
                    </div>
                    <div className={`mt-2 p-4 rounded-lg text-sm ${message.isInternal ? 'bg-yellow-50 border border-yellow-200' : 'bg-secondary/50'}`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cevap Yaz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <Label>Mesaj Türü</Label>
              <div className="flex items-center gap-2">
                <Toggle
                  pressed={!isInternalNote}
                  onPressedChange={() => setIsInternalNote(false)}
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Müşteriye Görünür
                </Toggle>
                <Toggle
                  pressed={isInternalNote}
                  onPressedChange={() => setIsInternalNote(true)}
                  size="sm"
                >
                  <EyeOff className="h-4 w-4 mr-2" />
                  Dahili Not
                </Toggle>
              </div>
            </div>
            <RichTextEditor
              content={messageContent}
              onChange={setMessageContent}
              placeholder={isInternalNote ? "Dahili notunuzu buraya yazın..." : "Cevabınızı buraya yazın..."}
              className="min-h-[150px]"
              attachments={attachments}
              onAttachmentsChange={setAttachments}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Dosya Ekle</span>
              </Button>
            </div>
            <Button onClick={handleAddMessage} disabled={!messageContent.trim()}>
              <Send className="mr-2 h-4 w-4" /> 
              {isInternalNote ? 'Dahili Notu Kaydet' : 'Cevabı Gönder'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Talep Yönetimi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Durum</Label>
              <Select 
                value={ticket.status} 
                onValueChange={handleStatusChange}
                disabled={updatingStatus}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TicketStatus.OPEN}>Açık</SelectItem>
                  <SelectItem value={TicketStatus.IN_PROGRESS}>İşlemde</SelectItem>
                  <SelectItem value={TicketStatus.WAITING_CUSTOMER}>Müşteri Bekliyor</SelectItem>
                  <SelectItem value={TicketStatus.PENDING_THIRD_PARTY}>Üçüncü Taraf Bekliyor</SelectItem>
                  <SelectItem value={TicketStatus.RESOLVED}>Çözüldü</SelectItem>
                  <SelectItem value={TicketStatus.CLOSED}>Kapalı</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Öncelik</Label>
              <Select 
                value={ticket.priority} 
                onValueChange={(priority) => {
                  // In a real app, you would update the ticket priority here
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TicketPriority.LOW}>Düşük</SelectItem>
                  <SelectItem value={TicketPriority.MEDIUM}>Orta</SelectItem>
                  <SelectItem value={TicketPriority.HIGH}>Yüksek</SelectItem>
                  <SelectItem value={TicketPriority.URGENT}>Acil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Atanan Kişi</Label>
              <Select 
                value={ticket.assignedToId || ''} 
                onValueChange={(assignedToId) => {
                  // In a real app, you would assign the ticket here
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Atanmamış" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usr-001">Ahmet Yılmaz (Admin)</SelectItem>
                  <SelectItem value="usr-002">Zeynep Kaya (Destek)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Değişiklikleri Kaydet</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Talep Detayları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Hash className="h-4 w-4" /> Talep ID
              </span>
              <span className="font-mono text-xs">#{ticket.id.substring(0, 8)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Tag className="h-4 w-4" /> Kategori
              </span>
              <Badge variant="outline">{ticket.category?.name || 'Belirtilmemiş'}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Oluşturulma
              </span>
              <span>
                {new Date(ticket.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Müşteri
              </span>
              <span>{ticket.user?.firstName} {ticket.user?.lastName}</span>
            </div>
            <p className="text-muted-foreground">{ticket.user?.email}</p>
            <p className="text-muted-foreground text-xs">Şirket bilgisi yok</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}