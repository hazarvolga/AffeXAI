import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AnalyticsEvent,
  AnalyticsSession,
  AnalyticsHeatmap,
  ABTest,
  ABTestVariant,
  ComponentPerformance,
} from './entities';
import {
  AnalyticsTrackingService,
  AnalyticsDashboardService,
  ABTestingService,
  HeatmapService,
} from './services';
import {
  AnalyticsController,
  ABTestController,
} from './controllers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnalyticsEvent,
      AnalyticsSession,
      AnalyticsHeatmap,
      ABTest,
      ABTestVariant,
      ComponentPerformance,
    ]),
    UsersModule,
  ],
  controllers: [
    AnalyticsController,
    ABTestController,
  ],
  providers: [
    AnalyticsTrackingService,
    AnalyticsDashboardService,
    ABTestingService,
    HeatmapService,
  ],
  exports: [
    AnalyticsTrackingService,
    AnalyticsDashboardService,
    ABTestingService,
    HeatmapService,
  ],
})
export class AnalyticsModule {}
