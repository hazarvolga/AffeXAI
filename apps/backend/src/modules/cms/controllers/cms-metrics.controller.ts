import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CmsMetricsService } from '../services/cms-metrics.service';
import {
  TrackPageViewDto,
  TrackLinkClickDto,
  TrackActivityDto,
  GetMetricsQueryDto,
  CmsMetricsResponseDto,
} from '../dto/cms-metrics.dto';

@ApiTags('CMS Metrics')
@Controller('cms-metrics')
export class CmsMetricsController {
  constructor(private readonly metricsService: CmsMetricsService) {}

  @Get()
  @ApiOperation({ summary: 'Get CMS analytics metrics' })
  @ApiResponse({
    status: 200,
    description: 'Returns aggregated CMS metrics',
    type: CmsMetricsResponseDto,
  })
  async getMetrics(@Query() query: GetMetricsQueryDto): Promise<CmsMetricsResponseDto> {
    const period = query.period || 'week';
    return this.metricsService.getMetrics(period);
  }

  @Post('view')
  @ApiOperation({ summary: 'Track page view' })
  @ApiResponse({ status: 201, description: 'Page view tracked successfully' })
  async trackPageView(@Body() dto: TrackPageViewDto) {
    await this.metricsService.trackPageView(dto);
    return { success: true, message: 'Sayfa görüntüleme kaydedildi' };
  }

  @Post('click')
  @ApiOperation({ summary: 'Track link click' })
  @ApiResponse({ status: 201, description: 'Link click tracked successfully' })
  async trackLinkClick(@Body() dto: TrackLinkClickDto) {
    await this.metricsService.trackLinkClick(dto);
    return { success: true, message: 'Link tıklama kaydedildi' };
  }

  @Post('activity')
  @ApiOperation({ summary: 'Track CMS activity (edit/publish)' })
  @ApiResponse({ status: 201, description: 'Activity tracked successfully' })
  async trackActivity(@Body() dto: TrackActivityDto) {
    await this.metricsService.trackActivity(dto);
    return { success: true, message: 'Aktivite kaydedildi' };
  }
}
