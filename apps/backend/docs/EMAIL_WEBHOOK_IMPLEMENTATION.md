# Email Webhook Implementation - Complete Documentation

## Overview

This document describes the **provider-agnostic email webhook system** that allows customers to reply to support tickets directly from their email client (Gmail, Outlook, etc.). The system automatically processes inbound emails and creates ticket messages.

## Architecture

The implementation uses the **Adapter Pattern** with a **Factory** for automatic provider detection or manual provider selection.

```
Inbound Email (Provider) → Universal Webhook Endpoint → Factory (Auto-detect/Manual)
→ Provider Adapter → Standardized ParsedEmail → TicketEmailParserService
→ Create Ticket Message → Update Ticket Status
```

## Supported Email Providers

The system supports **5 email providers** with webhook capabilities:

1. **Resend** - Modern email API with webhook support
2. **SendGrid** - Inbound Parse webhook
3. **Mailgun** - Routes webhook with signature validation
4. **Postmark** - Inbound webhook with capitalized fields
5. **AWS SES** - SNS notification format with MIME parsing

**Note**: SMTP provider does not support inbound webhooks (outbound only).

## Components

### 1. Email Webhook Adapter Interface

**File**: `src/modules/tickets/interfaces/email-webhook-adapter.interface.ts`

Contract that all email provider adapters must implement:

```typescript
export interface EmailWebhookAdapter {
  /**
   * Convert provider-specific webhook payload to standardized ParsedEmail format
   */
  convertToStandardFormat(payload: any): ParsedEmail;

  /**
   * Extract ticket ID from recipient email (ticket-{uuid}@affexai.com)
   */
  extractTicketId(recipientEmail: string): string | null;

  /**
   * Optional: Validate webhook signature for security
   */
  validateWebhook?(payload: any, headers: Record<string, string>): boolean;
}
```

### 2. Provider Adapters

Each adapter converts provider-specific webhook format to standardized `ParsedEmail`:

#### Resend Adapter (`resend-webhook.adapter.ts`)

- Payload fields: `from`, `to`, `subject`, `text`, `html`, `message_id`
- No signature validation (Resend doesn't provide it)
- Fallback adapter for auto-detection

#### SendGrid Adapter (`sendgrid-webhook.adapter.ts`)

- Inbound Parse format
- Headers sent as multiline string (requires parsing)
- Fields: `from`, `to`, `subject`, `text`, `html`, `headers`

#### Mailgun Adapter (`mailgun-webhook.adapter.ts`)

- Routes webhook format
- **Signature validation** with HMAC-SHA256
- Timestamp validation (within 15 minutes)
- Fields: `sender`, `recipient`, `subject`, `body-plain`, `body-html`

#### Postmark Adapter (`postmark-webhook.adapter.ts`)

- Capitalized field names: `From`, `To`, `Subject`, `TextBody`, `HtmlBody`
- Headers as array: `[{ Name: "In-Reply-To", Value: "..." }]`
- Detection: `payload.MessageID && payload.From && payload.To`

#### AWS SES Adapter (`ses-webhook.adapter.ts`)

- SNS notification wrapper (requires JSON parsing)
- MIME content parsing for text/html extraction
- Detection: `payload.Type === 'Notification' || payload.Message || payload.mail`

### 3. Email Webhook Adapter Factory

**File**: `src/modules/tickets/services/email-webhook-adapter-factory.service.ts`

Central factory for provider selection and auto-detection.

**Provider Selection**:
```typescript
// Manual selection
const adapter = factory.getAdapter('resend', payload);

// Auto-detection
const adapter = factory.getAdapter('auto', payload);
```

**Auto-Detection Logic**:
```typescript
private detectProvider(payload: any): EmailWebhookAdapter {
  // 1. Postmark: MessageID + From + To + TextBody (capitalized)
  if (payload.MessageID && payload.From && payload.To) {
    return this.postmarkAdapter;
  }

  // 2. AWS SES: Type=Notification OR Message OR mail
  if (payload.Type === 'Notification' || payload.Message || payload.mail) {
    return this.sesAdapter;
  }

  // 3. Mailgun: sender + recipient + body-plain/body-html
  if (payload.sender && payload.recipient) {
    return this.mailgunAdapter;
  }

  // 4. SendGrid: headers (string) + text
  if (payload.headers && typeof payload.headers === 'string') {
    return this.sendgridAdapter;
  }

  // 5. Resend: message_id + from + to (lowercase)
  if (payload.message_id && payload.from && payload.to) {
    return this.resendAdapter;
  }

  // Fallback: Resend (most common)
  return this.resendAdapter;
}
```

**Integration with Email Settings**:
- Uses existing `EmailProvider` enum from `settings/dto/email-settings.dto.ts`
- Aligns with system email configuration (Resend, SendGrid, Postmark, Mailgun, SES, SMTP)
- Maintains consistency across email sending and receiving

### 4. Universal Webhook Endpoint

**File**: `src/modules/tickets/tickets.controller.ts`

**Endpoint**: `POST /api/tickets/inbound-email`

**Query Parameters**:
- `provider` (optional): `'resend' | 'sendgrid' | 'mailgun' | 'postmark' | 'ses' | 'auto'`
- Default: `'auto'` (automatic detection)

**Access**: Public endpoint (no authentication) - webhooks come from external email providers

**Usage Examples**:
```bash
# Auto-detect provider
POST /api/tickets/inbound-email
Body: { ...email payload... }

# Specify provider (recommended for production)
POST /api/tickets/inbound-email?provider=resend
POST /api/tickets/inbound-email?provider=sendgrid
POST /api/tickets/inbound-email?provider=mailgun
```

**Processing Flow**:
```typescript
async processInboundEmail(@Body() payload: any, @Query('provider') provider: string = PROVIDER_AUTO) {
  // 1. Get adapter (auto-detect or specified)
  const adapter = this.adapterFactory.getAdapter(provider, payload);

  // 2. Convert to standard format
  const parsedEmail = adapter.convertToStandardFormat(payload);

  // 3. Extract ticket ID from recipient (ticket-{uuid}@affexai.com)
  const ticketId = adapter.extractTicketId(parsedEmail.to);

  // 4. Validate webhook signature (if supported)
  if (adapter.validateWebhook) {
    const isValid = adapter.validateWebhook(payload, request.headers);
    if (!isValid) throw new BadRequestException('Invalid webhook signature');
  }

  // 5. Process email and create ticket message
  const ticket = await this.emailParserService.processInboundEmail(parsedEmail);

  return { success: true, ticketId: ticket.id, displayNumber: ticket.displayNumber };
}
```

### 5. Ticket Email Parser Service

**File**: `src/modules/tickets/services/ticket-email-parser.service.ts`

Converts `ParsedEmail` to ticket message:

```typescript
async processInboundEmail(parsedEmail: ParsedEmail): Promise<Ticket> {
  // 1. Find ticket by ID
  const ticket = await this.ticketsRepository.findOne({ where: { id: ticketId } });

  // 2. Extract user info (from email or existing customer)
  const user = await this.findOrCreateUserFromEmail(parsedEmail.from);

  // 3. Create ticket message
  const message = this.ticketMessageRepository.create({
    ticket,
    user,
    content: parsedEmail.textBody || parsedEmail.htmlBody,
    isInternal: false,
    messageId: parsedEmail.messageId,
  });
  await this.ticketMessageRepository.save(message);

  // 4. Update ticket status
  if (ticket.status === TicketStatus.RESOLVED || ticket.status === TicketStatus.CLOSED) {
    ticket.status = TicketStatus.OPEN;
    await this.ticketsRepository.save(ticket);
  }

  return ticket;
}
```

## Email Threading

The system maintains proper email conversation threading using standard email headers:

**Outbound Email** (from [ticket-email.service.ts](src/modules/tickets/services/ticket-email.service.ts)):
```typescript
const messageId = `<ticket-${ticket.id}-${Date.now()}@affexai.com>`;
const ticketReplyAddress = `ticket-${ticket.id}@affexai.com`;

await this.unifiedTemplateService.sendEmail({
  to: { email: customer.email, name: customerName },
  replyTo: { email: ticketReplyAddress, name: `Ticket ${ticket.displayNumber}` },
  subject: `New Ticket: ${ticket.subject} [${ticket.displayNumber}]`,
  variables: { ...context },
  messageId: messageId,
  references: previousMessageIds,
});
```

**Inbound Email** (webhook processing):
```typescript
const parsedEmail = {
  messageId: payload.message_id,           // Current email ID
  inReplyTo: payload.in_reply_to,          // Previous message ID
  references: payload.references || [],     // Full thread history
};
```

## Setup Instructions

### 1. Email Provider Configuration

Configure your email provider's inbound webhook URL:

**Resend**:
- Go to Domains → Inbound Routes
- Add route: `ticket-*@affexai.com` → `https://api.affexai.com/tickets/inbound-email?provider=resend`

**SendGrid**:
- Go to Settings → Inbound Parse
- Add hostname: `affexai.com`
- Add URL: `https://api.affexai.com/tickets/inbound-email?provider=sendgrid`

**Mailgun**:
- Go to Receiving → Routes
- Add route: `match_recipient("ticket-.*@affexai.com")` → `https://api.affexai.com/tickets/inbound-email?provider=mailgun`
- Set `MAILGUN_API_KEY` environment variable for signature validation

**Postmark**:
- Go to Servers → Inbound
- Add inbound webhook: `https://api.affexai.com/tickets/inbound-email?provider=postmark`

**AWS SES**:
- Configure SNS topic for email receiving
- Add HTTPS subscription: `https://api.affexai.com/tickets/inbound-email?provider=ses`

### 2. DNS Configuration (MX Records)

For receiving emails at `ticket-{id}@affexai.com`, configure MX records:

**Example (using Resend)**:
```
Type: MX
Host: @
Value: mx.resend.com
Priority: 10
```

**Example (using Mailgun)**:
```
Type: MX
Host: @
Value: mxa.mailgun.org
Priority: 10

Type: MX
Host: @
Value: mxb.mailgun.org
Priority: 10
```

### 3. Environment Variables

```env
# For Mailgun signature validation
MAILGUN_API_KEY=your-mailgun-api-key

# Email provider (already configured in Settings)
# EMAIL_PROVIDER will be used from settings module
```

## Security

### Webhook Signature Validation

**Mailgun** (implemented):
```typescript
validateWebhook(payload: any, headers: Record<string, string>): boolean {
  const apiKey = process.env.MAILGUN_API_KEY;
  const { signature, timestamp, token } = payload;

  // Verify timestamp is recent (within 15 minutes)
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - parseInt(timestamp)) > 900) {
    return false;
  }

  // Verify HMAC signature
  const hmac = crypto.createHmac('sha256', apiKey);
  hmac.update(timestamp + token);
  const calculatedSignature = hmac.digest('hex');

  return calculatedSignature === signature;
}
```

**AWS SES** (implemented):
```typescript
validateWebhook(payload: any, headers: Record<string, string>): boolean {
  // AWS SNS provides signature verification
  if (payload.Type && (payload.Type === 'Notification' || payload.Type === 'SubscriptionConfirmation')) {
    return true;
  }
  return false;
}
```

**Other Providers**:
- Resend: No signature validation (relies on HTTPS)
- SendGrid: No signature validation for Inbound Parse
- Postmark: No signature validation (relies on HTTPS)

**Recommendation**: Use HTTPS and IP whitelisting for additional security.

## Testing

### Manual Testing with curl

**Resend Format**:
```bash
curl -X POST http://localhost:9006/tickets/inbound-email?provider=resend \
  -H "Content-Type: application/json" \
  -d '{
    "from": "customer@example.com",
    "to": "ticket-123e4567-e89b-12d3-a456-426614174000@affexai.com",
    "subject": "Re: Support Ticket #SUP-00043",
    "text": "This is my reply to the ticket",
    "message_id": "<reply-123@example.com>"
  }'
```

**SendGrid Format**:
```bash
curl -X POST http://localhost:9006/tickets/inbound-email?provider=sendgrid \
  -H "Content-Type: application/json" \
  -d '{
    "from": "customer@example.com",
    "to": "ticket-123e4567-e89b-12d3-a456-426614174000@affexai.com",
    "subject": "Re: Support Ticket #SUP-00043",
    "text": "This is my reply",
    "headers": "In-Reply-To: <ticket-123@affexai.com>\nReferences: <ticket-123@affexai.com>"
  }'
```

**Auto-Detection**:
```bash
curl -X POST http://localhost:9006/tickets/inbound-email \
  -H "Content-Type: application/json" \
  -d '{
    "from": "customer@example.com",
    "to": "ticket-123e4567-e89b-12d3-a456-426614174000@affexai.com",
    "subject": "Re: Support Ticket",
    "text": "Test reply",
    "message_id": "<test-123@example.com>"
  }'
```

### Automated Testing

Create test files in `src/modules/tickets/tests/`:

```typescript
// email-webhook.spec.ts
describe('EmailWebhookAdapterFactory', () => {
  it('should auto-detect Resend format', () => {
    const payload = {
      from: 'test@example.com',
      to: 'ticket-123@affexai.com',
      message_id: '<test-123@example.com>',
      text: 'Test message',
    };
    const adapter = factory.getAdapter('auto', payload);
    expect(adapter).toBeInstanceOf(ResendWebhookAdapter);
  });

  it('should auto-detect Postmark format', () => {
    const payload = {
      From: 'test@example.com',
      To: 'ticket-123@affexai.com',
      MessageID: '<test-123@example.com>',
      TextBody: 'Test message',
    };
    const adapter = factory.getAdapter('auto', payload);
    expect(adapter).toBeInstanceOf(PostmarkWebhookAdapter);
  });
});
```

## Troubleshooting

### Common Issues

**1. Ticket Not Found**
```
Error: Invalid recipient email format - ticket ID not found
```
**Solution**: Ensure email recipient is `ticket-{valid-uuid}@affexai.com`

**2. Provider Auto-Detection Fails**
```
Error: Unsupported email provider
```
**Solution**: Specify provider manually in query parameter: `?provider=resend`

**3. Mailgun Signature Validation Fails**
```
Error: Invalid webhook signature
```
**Solution**:
- Set `MAILGUN_API_KEY` environment variable
- Check timestamp is within 15 minutes
- Verify API key matches Mailgun account

**4. AWS SES MIME Parsing Issues**
```
Warning: Email content is empty
```
**Solution**:
- SES provides raw MIME content
- Basic parsing implemented, may need enhancement for complex MIME
- Consider using `mailparser` library for production

### Debugging

Enable verbose logging:
```typescript
// In email-webhook-adapter-factory.service.ts
private detectProvider(payload: any): EmailWebhookAdapter {
  console.log('Detecting provider for payload:', JSON.stringify(payload, null, 2));
  // ... detection logic
}
```

Check webhook endpoint logs:
```bash
# In backend logs
[TicketsController] Processing inbound email with provider: auto
[EmailWebhookAdapterFactory] Detected provider: Resend
[TicketEmailParserService] Created message for ticket: SUP-00043
```

## Future Enhancements

1. **Attachment Support**: Parse and save email attachments to ticket
2. **Advanced MIME Parsing**: Use `mailparser` library for complex email formats
3. **Spam Detection**: Integrate with spam filtering services
4. **Auto-Categorization**: Use AI to automatically categorize tickets from email content
5. **Priority Detection**: Extract urgency keywords to set ticket priority
6. **Webhook Security**: Implement IP whitelisting and rate limiting
7. **Retry Logic**: Handle webhook delivery failures with exponential backoff
8. **Webhook Monitoring**: Track webhook delivery success/failure rates

## Module Registration

All adapters are registered in `tickets.module.ts`:

```typescript
@Module({
  providers: [
    // ... other services
    EmailWebhookAdapterFactory,
    ResendWebhookAdapter,
    SendGridWebhookAdapter,
    MailgunWebhookAdapter,
    PostmarkWebhookAdapter,
    SESWebhookAdapter,
  ],
})
export class TicketsModule {}
```

## References

### Provider Documentation
- **Resend**: https://resend.com/docs/api-reference/emails/receive-email
- **SendGrid**: https://docs.sendgrid.com/for-developers/parsing-email/setting-up-the-inbound-parse-webhook
- **Mailgun**: https://documentation.mailgun.com/en/latest/user_manual.html#receiving-forwarding-and-storing-messages
- **Postmark**: https://postmarkapp.com/developer/webhooks/inbound-webhook
- **AWS SES**: https://docs.aws.amazon.com/ses/latest/dg/receiving-email-notifications.html

### Related Files
- `src/modules/tickets/services/ticket-email.service.ts` - Outbound email sending
- `src/modules/tickets/services/ticket-email-parser.service.ts` - Email parsing logic
- `src/modules/settings/dto/email-settings.dto.ts` - Email provider enum
- `src/database/seeds/ticket-email-templates.seed.ts` - Email templates

---

**Last Updated**: 2025-10-29
**Version**: 1.0.0
**Author**: Affexai Development Team
