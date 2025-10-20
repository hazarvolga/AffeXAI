import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { BulkCertificateService } from '../certificates/bulk-certificate.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly bulkCertificateService: BulkCertificateService,
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.eventsService.getDashboardStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  /**
   * Generate certificates for event participants
   */
  @Post(':id/certificates/generate')
  async generateCertificates(
    @Param('id') eventId: string,
    @Body() body: { participantIds?: string[]; userIds?: string[] },
  ) {
    const event = await this.eventsService.findOne(eventId);
    // No null check needed - findOne throws NotFoundException if not found

    if (!event.certificateConfig?.enabled) {
      throw new BadRequestException('Certificates are not enabled for this event');
    }

    // Get participants from registration if no specific IDs provided
    let participants: Array<{recipientName: string; recipientEmail: string; userId?: string}> = [];
    if (body.participantIds && body.participantIds.length > 0) {
      // Get specific participants - implement this based on your registration system
      // For now, we'll use a placeholder
      participants = body.participantIds.map(id => ({
        recipientName: 'Participant Name', // Get from registration
        recipientEmail: 'participant@email.com', // Get from registration
        userId: id,
      }));
    } else {
      // Get all approved registrations - implement based on your system
      throw new BadRequestException('Please provide participant IDs');
    }

    const certificates = await this.bulkCertificateService.generateForEvent(
      eventId,
      event.title,
      {
        templateId: event.certificateConfig.templateId,
        logoMediaId: event.certificateConfig.logoMediaId,
        description: event.certificateConfig.description,
        validityDays: event.certificateConfig.validityDays,
      },
      participants,
    );

    return {
      message: `${certificates.length} certificates generated successfully`,
      count: certificates.length,
      certificates,
    };
  }

  /**
   * Get certificate statistics for event
   */
  @Get(':id/certificates/stats')
  async getCertificateStats(@Param('id') eventId: string) {
    return this.bulkCertificateService.getEventCertificateStats(eventId);
  }

  /**
   * Get all certificates for event
   */
  @Get(':id/certificates')
  async getEventCertificates(@Param('id') eventId: string) {
    return this.bulkCertificateService.getCertificatesForEvent(eventId);
  }

  /**
   * Send event invitation email to participant
   */
  @Post(':id/emails/invitation')
  async sendInvitation(
    @Param('id') eventId: string,
    @Body() body: { email: string; name: string; additionalInfo?: Record<string, any> },
  ) {
    const event = await this.eventsService.findOne(eventId);
    await this.eventsService.sendEventInvitation(event, body.email, body.name, body.additionalInfo);
    return { message: 'Invitation email sent successfully' };
  }

  /**
   * Send event reminder email to participant
   */
  @Post(':id/emails/reminder')
  async sendReminder(
    @Param('id') eventId: string,
    @Body() body: { email: string; name: string },
  ) {
    const event = await this.eventsService.findOne(eventId);
    await this.eventsService.sendEventReminder(event, body.email, body.name);
    return { message: 'Reminder email sent successfully' };
  }

  /**
   * Send event cancellation email to participant
   */
  @Post(':id/emails/cancellation')
  async sendCancellation(
    @Param('id') eventId: string,
    @Body() body: { email: string; name: string; reason?: string },
  ) {
    const event = await this.eventsService.findOne(eventId);
    await this.eventsService.sendEventCancellation(event, body.email, body.name, body.reason);
    return { message: 'Cancellation email sent successfully' };
  }

  /**
   * Send event update notification to participant
   */
  @Post(':id/emails/update')
  async sendUpdate(
    @Param('id') eventId: string,
    @Body() body: { email: string; name: string; changes: string[] },
  ) {
    const event = await this.eventsService.findOne(eventId);
    await this.eventsService.sendEventUpdate(event, body.email, body.name, body.changes);
    return { message: 'Update email sent successfully' };
  }
}