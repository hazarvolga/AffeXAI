import { Controller, Get, Post, Param, Body, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { PredictiveAnalyticsService } from '../services/predictive-analytics.service';

@Controller('email-marketing/analytics')
@UseGuards(JwtAuthGuard)
export class PredictiveAnalyticsController {
  constructor(
    private readonly analyticsService: PredictiveAnalyticsService,
  ) {}

  /**
   * Get campaign performance prediction
   */
  @Post('predict/campaign')
  async predictCampaignPerformance(
    @Body() body: { campaignId: string; subscriberIds: string[] },
  ) {
    const prediction = await this.analyticsService.predictCampaignPerformance(
      body.campaignId,
      body.subscriberIds,
    );

    return {
      prediction,
      summary: {
        expectedReach: body.subscriberIds.length,
        expectedOpens: Math.round(body.subscriberIds.length * prediction.expectedOpenRate),
        expectedClicks: Math.round(body.subscriberIds.length * prediction.expectedClickRate),
        performanceLevel: this.getPerformanceLevel(prediction.performanceScore),
      },
      visualization: {
        openRateChart: {
          current: Math.round(prediction.expectedOpenRate * 100),
          industry: 25, // Industry average
        },
        clickRateChart: {
          current: Math.round(prediction.expectedClickRate * 100),
          industry: 3, // Industry average
        },
      },
    };
  }

  /**
   * Get subscriber engagement score
   */
  @Get('engagement/subscriber/:subscriberId')
  async getSubscriberEngagement(@Param('subscriberId') subscriberId: string) {
    const engagement = await this.analyticsService.calculateEngagementScore(subscriberId);

    return {
      ...engagement,
      visual: {
        scoreColor: this.getScoreColor(engagement.score),
        categoryIcon: this.getCategoryIcon(engagement.category),
        trend: this.getEngagementTrend(engagement.score),
      },
      recommendations: this.getEngagementRecommendations(engagement.category),
    };
  }

  /**
   * Get churn risk analysis
   */
  @Get('churn-risk/subscriber/:subscriberId')
  async getChurnRisk(@Param('subscriberId') subscriberId: string) {
    const risk = await this.analyticsService.calculateChurnRisk(subscriberId);

    return {
      ...risk,
      visual: {
        riskColor: this.getRiskColor(risk.riskLevel),
        daysUntilChurn: Math.round(
          (risk.predictedChurnDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        ),
      },
      urgency: this.getUrgencyLevel(risk.riskLevel),
    };
  }

  /**
   * Get AI-powered insights
   */
  @Get('insights')
  async getAIInsights(@Query('campaignId') campaignId?: string) {
    const insights = await this.analyticsService.generateAIInsights(campaignId);

    return {
      insights,
      summary: {
        totalInsights: insights.length,
        actionableInsights: insights.filter(i => i.actionable).length,
        highImpactInsights: insights.filter(i => i.impact === 'high').length,
      },
      categories: {
        trends: insights.filter(i => i.type === 'trend'),
        warnings: insights.filter(i => i.type === 'warning'),
        opportunities: insights.filter(i => i.type === 'opportunity'),
        anomalies: insights.filter(i => i.type === 'anomaly'),
      },
    };
  }

  /**
   * Get dashboard metrics
   */
  @Get('dashboard')
  async getDashboardMetrics() {
    const metrics = await this.analyticsService.getDashboardMetrics();

    return {
      ...metrics,
      visual: {
        engagementGauge: {
          value: metrics.averageEngagementScore,
          color: this.getScoreColor(metrics.averageEngagementScore),
          label: this.getEngagementLabel(metrics.averageEngagementScore),
        },
        riskAlert: {
          show: metrics.atRiskSubscribers > 20,
          message: `%${metrics.atRiskSubscribers} abone risk altında`,
          severity: metrics.atRiskSubscribers > 30 ? 'high' : 'medium',
        },
        growthIndicator: {
          value: metrics.predictedMonthlyGrowth,
          isPositive: metrics.predictedMonthlyGrowth > 0,
          percentage: Math.round((metrics.predictedMonthlyGrowth / 1000) * 100),
        },
      },
      recommendations: this.getDashboardRecommendations(metrics),
    };
  }

  /**
   * Helper methods
   */
  private getPerformanceLevel(score: number): string {
    if (score >= 80) return 'Mükemmel';
    if (score >= 60) return 'İyi';
    if (score >= 40) return 'Orta';
    if (score >= 20) return 'Düşük';
    return 'Kritik';
  }

  private getScoreColor(score: number): string {
    if (score >= 70) return '#10b981'; // Green
    if (score >= 40) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  }

  private getCategoryIcon(category: string): string {
    switch (category) {
      case 'highly-engaged':
        return '🌟';
      case 'moderately-engaged':
        return '✨';
      case 'at-risk':
        return '⚠️';
      case 'inactive':
        return '😴';
      default:
        return '📊';
    }
  }

  private getEngagementTrend(score: number): string {
    if (score >= 70) return 'trending_up';
    if (score >= 40) return 'trending_flat';
    return 'trending_down';
  }

  private getEngagementRecommendations(category: string): string[] {
    switch (category) {
      case 'highly-engaged':
        return [
          'VIP programına dahil edin',
          'Özel içerik ve teklifler gönderin',
          'Referans programına davet edin',
        ];
      case 'moderately-engaged':
        return [
          'Engagement artırıcı içerik gönderin',
          'Anket ile geri bildirim toplayın',
          'Kişiselleştirilmiş öneriler sunun',
        ];
      case 'at-risk':
        return [
          'Re-engagement kampanyası başlatın',
          'Email sıklığını azaltın',
          'Tercih merkezi sunun',
        ];
      case 'inactive':
        return [
          'Win-back kampanyası gönderin',
          'Son bir şans emaili gönderin',
          'Listeden çıkarmayı düşünün',
        ];
      default:
        return [];
    }
  }

  private getRiskColor(riskLevel: string): string {
    switch (riskLevel) {
      case 'critical':
        return '#dc2626'; // Dark red
      case 'high':
        return '#ef4444'; // Red
      case 'medium':
        return '#f59e0b'; // Yellow
      case 'low':
        return '#10b981'; // Green
      default:
        return '#6b7280'; // Gray
    }
  }

  private getUrgencyLevel(riskLevel: string): string {
    switch (riskLevel) {
      case 'critical':
        return 'Acil Aksiyon Gerekli';
      case 'high':
        return 'Yüksek Öncelik';
      case 'medium':
        return 'Orta Öncelik';
      case 'low':
        return 'Düşük Öncelik';
      default:
        return 'Belirsiz';
    }
  }

  private getEngagementLabel(score: number): string {
    if (score >= 70) return 'Mükemmel Etkileşim';
    if (score >= 50) return 'İyi Etkileşim';
    if (score >= 30) return 'Orta Etkileşim';
    return 'Düşük Etkileşim';
  }

  private getDashboardRecommendations(metrics: any): string[] {
    const recommendations: string[] = [];

    if (metrics.averageEngagementScore < 50) {
      recommendations.push('Genel engagement stratejinizi gözden geçirin');
    }

    if (metrics.atRiskSubscribers > 20) {
      recommendations.push('Risk altındaki aboneler için özel kampanya başlatın');
    }

    if (metrics.predictedMonthlyGrowth < 100) {
      recommendations.push('Yeni abone kazanım stratejileri geliştirin');
    }

    metrics.insights.forEach((insight: any) => {
      if (insight.actionable && insight.suggestedAction) {
        recommendations.push(insight.suggestedAction);
      }
    });

    return recommendations.slice(0, 5); // Top 5 recommendations
  }
}