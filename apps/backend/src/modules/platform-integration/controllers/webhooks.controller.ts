import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { Webhook } from '../entities/webhook.entity';

/**
 * Webhooks Controller
 * 
 * CRUD operations for webhooks and webhook testing.
 */
@Controller('automation/webhooks')
export class WebhooksController {
  constructor(private readonly webhookService: WebhookService) {}

  /**
   * Get all webhooks
   */
  @Get()
  async findAll() {
    return this.webhookService.findAll();
  }

  /**
   * Get active webhooks
   */
  @Get('active')
  async findActive() {
    return this.webhookService.findActive();
  }

  /**
   * Get webhook by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.webhookService.findOne(id);
  }

  /**
   * Create new webhook
   */
  @Post()
  async create(@Body() data: any) {
    return this.webhookService.create(data);
  }

  /**
   * Update webhook
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Webhook>,
  ) {
    return this.webhookService.update(id, data);
  }

  /**
   * Delete webhook (soft delete)
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.webhookService.delete(id);
    return { success: true };
  }

  /**
   * Test webhook connection
   */
  @Post(':id/test')
  async test(@Param('id') id: string) {
    return this.webhookService.testWebhook(id);
  }

  /**
   * Get webhook statistics
   */
  @Get(':id/stats')
  async getStats(@Param('id') id: string) {
    return this.webhookService.getWebhookStats(id);
  }

  /**
   * Get overall webhook statistics
   */
  @Get('stats/overall')
  async getOverallStats() {
    return this.webhookService.getOverallStats();
  }
}
