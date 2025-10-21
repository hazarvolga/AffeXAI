"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignScheduler;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const switch_1 = require("@/components/ui/switch");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
const emailCampaignsService_1 = __importDefault(require("@/lib/api/emailCampaignsService"));
function CampaignScheduler({ campaignId, currentStatus, currentScheduledAt, onScheduleUpdate }) {
    const { toast } = (0, use_toast_1.useToast)();
    const [isScheduled, setIsScheduled] = (0, react_1.useState)(currentStatus === 'scheduled');
    const [scheduledDate, setScheduledDate] = (0, react_1.useState)(currentScheduledAt ? new Date(currentScheduledAt).toISOString().slice(0, 16) : '');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleScheduleToggle = (checked) => {
        setIsScheduled(checked);
        if (!checked) {
            setScheduledDate('');
        }
        else {
            // Set default to 1 hour from now
            const defaultTime = new Date();
            defaultTime.setHours(defaultTime.getHours() + 1);
            setScheduledDate(defaultTime.toISOString().slice(0, 16));
        }
    };
    const handleScheduleCampaign = async () => {
        if (!scheduledDate) {
            toast({
                title: 'Hata',
                description: 'Lütfen bir tarih ve saat seçin.',
                variant: 'destructive',
            });
            return;
        }
        const scheduledDateTime = new Date(scheduledDate);
        const now = new Date();
        if (scheduledDateTime <= now) {
            toast({
                title: 'Hata',
                description: 'Planlanan tarih gelecekte olmalıdır.',
                variant: 'destructive',
            });
            return;
        }
        try {
            setLoading(true);
            await emailCampaignsService_1.default.scheduleCampaign(campaignId, scheduledDateTime.toISOString());
            toast({
                title: 'Başarılı',
                description: 'Kampanya başarıyla planlandı.',
            });
            onScheduleUpdate?.();
        }
        catch (error) {
            console.error('Error scheduling campaign:', error);
            toast({
                title: 'Hata',
                description: 'Kampanya planlanırken bir hata oluştu.',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleCancelSchedule = async () => {
        try {
            setLoading(true);
            await emailCampaignsService_1.default.cancelSchedule(campaignId);
            setIsScheduled(false);
            setScheduledDate('');
            toast({
                title: 'Başarılı',
                description: 'Kampanya planlaması iptal edildi.',
            });
            onScheduleUpdate?.();
        }
        catch (error) {
            console.error('Error cancelling schedule:', error);
            toast({
                title: 'Hata',
                description: 'Planlama iptal edilirken bir hata oluştu.',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleReschedule = async () => {
        if (!scheduledDate) {
            toast({
                title: 'Hata',
                description: 'Lütfen yeni bir tarih ve saat seçin.',
                variant: 'destructive',
            });
            return;
        }
        const newScheduledDateTime = new Date(scheduledDate);
        const now = new Date();
        if (newScheduledDateTime <= now) {
            toast({
                title: 'Hata',
                description: 'Yeni planlanan tarih gelecekte olmalıdır.',
                variant: 'destructive',
            });
            return;
        }
        try {
            setLoading(true);
            await emailCampaignsService_1.default.rescheduleCampaign(campaignId, newScheduledDateTime.toISOString());
            toast({
                title: 'Başarılı',
                description: 'Kampanya yeniden planlandı.',
            });
            onScheduleUpdate?.();
        }
        catch (error) {
            console.error('Error rescheduling campaign:', error);
            toast({
                title: 'Hata',
                description: 'Kampanya yeniden planlanırken bir hata oluştu.',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleSendNow = async () => {
        try {
            setLoading(true);
            await emailCampaignsService_1.default.sendCampaign(campaignId);
            toast({
                title: 'Başarılı',
                description: 'Kampanya gönderilmeye başlandı.',
            });
            onScheduleUpdate?.();
        }
        catch (error) {
            console.error('Error sending campaign:', error);
            toast({
                title: 'Hata',
                description: 'Kampanya gönderilirken bir hata oluştu.',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5); // Minimum 5 minutes from now
        return now.toISOString().slice(0, 16);
    };
    const getMaxDateTime = () => {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1); // Maximum 1 year from now
        return maxDate.toISOString().slice(0, 16);
    };
    const formatScheduledTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.Clock className="h-5 w-5"/>
          Kampanya Planlaması
        </card_1.CardTitle>
        <card_1.CardDescription>
          Kampanyanızı belirli bir tarih ve saatte gönderilmek üzere planlayın
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        {/* Current Status */}
        {currentStatus === 'scheduled' && currentScheduledAt && (<div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <lucide_react_1.CheckCircle className="h-4 w-4 text-blue-600"/>
              <span className="text-sm font-medium text-blue-800">Kampanya Planlandı</span>
            </div>
            <p className="text-sm text-blue-700">
              Gönderim tarihi: {formatScheduledTime(currentScheduledAt)}
            </p>
          </div>)}

        {/* Schedule Toggle */}
        <div className="flex items-center space-x-2">
          <switch_1.Switch id="schedule-toggle" checked={isScheduled} onCheckedChange={handleScheduleToggle} disabled={currentStatus === 'sent' || currentStatus === 'sending'}/>
          <label_1.Label htmlFor="schedule-toggle">Kampanyayı planla</label_1.Label>
        </div>

        {/* Schedule Form */}
        {isScheduled && (<div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="scheduled-date">Gönderim Tarihi ve Saati</label_1.Label>
              <input_1.Input id="scheduled-date" type="datetime-local" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} min={getMinDateTime()} max={getMaxDateTime()} disabled={loading}/>
              <p className="text-xs text-muted-foreground">
                Kampanya en az 5 dakika sonra planlanabilir
              </p>
            </div>

            {/* Validation Warning */}
            {scheduledDate && new Date(scheduledDate) <= new Date() && (<div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <lucide_react_1.AlertCircle className="h-4 w-4 text-yellow-600"/>
                <span className="text-sm text-yellow-800">
                  Planlanan tarih gelecekte olmalıdır
                </span>
              </div>)}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {currentStatus === 'scheduled' ? (<>
                  <button_1.Button onClick={handleReschedule} disabled={loading || !scheduledDate} className="flex-1">
                    <lucide_react_1.Calendar className="mr-2 h-4 w-4"/>
                    Yeniden Planla
                  </button_1.Button>
                  <button_1.Button variant="outline" onClick={handleCancelSchedule} disabled={loading}>
                    <lucide_react_1.X className="mr-2 h-4 w-4"/>
                    İptal Et
                  </button_1.Button>
                </>) : (<button_1.Button onClick={handleScheduleCampaign} disabled={loading || !scheduledDate} className="flex-1">
                  <lucide_react_1.Clock className="mr-2 h-4 w-4"/>
                  Planla
                </button_1.Button>)}
            </div>
          </div>)}

        {/* Send Now Option */}
        {!isScheduled && currentStatus !== 'sent' && currentStatus !== 'sending' && (<div className="pt-4 border-t">
            <button_1.Button onClick={handleSendNow} disabled={loading} className="w-full">
              <lucide_react_1.Send className="mr-2 h-4 w-4"/>
              Şimdi Gönder
            </button_1.Button>
          </div>)}

        {/* Status Info */}
        <div className="text-xs text-muted-foreground">
          {currentStatus === 'draft' && 'Kampanya taslak durumunda'}
          {currentStatus === 'scheduled' && 'Kampanya planlanmış durumda'}
          {currentStatus === 'sending' && 'Kampanya gönderiliyor'}
          {currentStatus === 'sent' && 'Kampanya gönderildi'}
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=CampaignScheduler.js.map