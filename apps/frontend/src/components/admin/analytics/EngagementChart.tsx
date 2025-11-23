'use client';

import { Card } from '@/components/ui/card';
import { EmailEngagement } from '@/lib/api/analyticsService';
import { Mail, MousePointer, Clock, BarChart3 } from 'lucide-react';

interface EngagementChartProps {
  data: EmailEngagement[];
  showDetails?: boolean;
}

export default function EngagementChart({ data, showDetails = false }: EngagementChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Etkileşim verisi bulunamadı</p>
        </div>
      </div>
    );
  }

  const latestData = data[data.length - 1];
  const averageOpenRate = data.reduce((sum, item) => sum + item.openRate, 0) / data.length;
  const averageClickRate = data.reduce((sum, item) => sum + item.clickRate, 0) / data.length;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('tr-TR').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Açılma Oranı</span>
          </div>
          <p className="text-2xl font-bold">{formatPercentage(latestData?.openRate || 0)}</p>
          <p className="text-xs text-muted-foreground">
            Ortalama: {formatPercentage(averageOpenRate)}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <MousePointer className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Tıklama Oranı</span>
          </div>
          <p className="text-2xl font-bold">{formatPercentage(latestData?.clickRate || 0)}</p>
          <p className="text-xs text-muted-foreground">
            Ortalama: {formatPercentage(averageClickRate)}
          </p>
        </Card>
      </div>

      {/* Engagement Chart */}
      <div className="h-64 border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Email Etkileşimi</h4>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Açılma</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Tıklama</span>
            </div>
          </div>
        </div>

        {/* Simple line chart representation */}
        <div className="space-y-3">
          {data.slice(-7).map((item, index) => {
            const maxOpenRate = Math.max(...data.map(d => d.openRate));
            const maxClickRate = Math.max(...data.map(d => d.clickRate));
            const openWidth = (item.openRate / maxOpenRate) * 100;
            const clickWidth = (item.clickRate / maxClickRate) * 100;
            
            return (
              <div key={item.date} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{formatDate(item.date)}</span>
                  <span className="font-medium">
                    {formatPercentage(item.openRate)} / {formatPercentage(item.clickRate)}
                  </span>
                </div>
                
                {/* Open Rate Bar */}
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-blue-500" />
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${openWidth}%` }}
                    />
                  </div>
                </div>
                
                {/* Click Rate Bar */}
                <div className="flex items-center gap-2">
                  <MousePointer className="h-3 w-3 text-green-500" />
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${clickWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <h4 className="font-medium">Ortalama Açılma Süresi</h4>
            </div>
            <p className="text-2xl font-bold">{latestData?.avgTimeToOpen || 0} dk</p>
            <p className="text-sm text-muted-foreground">Email gönderiminden sonra</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <h4 className="font-medium">Ortalama Tıklama Süresi</h4>
            </div>
            <p className="text-2xl font-bold">{latestData?.avgTimeToClick || 0} dk</p>
            <p className="text-sm text-muted-foreground">Email açıldıktan sonra</p>
          </Card>
        </div>
      )}
    </div>
  );
}