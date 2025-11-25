# 🚀 Affexai Project - Complete Documentation

> **Enterprise Customer Portal & AI-Powered Support Platform**
> **Architecture**: NestJS Backend + Next.js 15 Frontend (Monorepo)
> **Last Updated**: 2025-11-25
> **Version**: 1.0.2
> **GitHub**: https://github.com/hazarvolga/AffeXAI

---

## 📋 Table of Contents

1. [**🔍 AUTOMATED DEBUGGING SYSTEM (CRITICAL)**](#-automated-debugging-system-critical)
2. [Project Overview](#-project-overview)
3. [Architecture](#️-architecture)
4. [Tech Stack](#️-tech-stack)
5. [Core Features Matrix](#-core-features-matrix)
6. [Backend Modules Deep Dive](#-backend-modules-deep-dive)
7. [Frontend Architecture](#-frontend-architecture)
8. [Database Schema](#-database-schema)
9. [API Documentation](#-api-documentation)
10. [Design System](#-design-system)
11. [Development Guide](#️-development-guide)
12. [Deployment](#-deployment)
13. [Roadmap & Planned Features](#-roadmap--planned-features)

---

## 🔍 AUTOMATED DEBUGGING SYSTEM (CRITICAL)

> **⚠️ CRITICAL**: Claude MUST use the automated debugging system instead of asking users to manually check terminals, logs, or run commands.

### System Architecture

The Affexai platform includes a comprehensive error tracking and debugging system that automatically logs all errors, AI calls, and system events to a centralized database.

```
┌─────────────────────────────────────────────────────────┐
│                 Error Tracking Flow                      │
└─────────────────────────────────────────────────────────┘

Frontend Error                Backend Error               AI Call
     │                            │                          │
     ├─> ErrorBoundary           ├─> AppLoggerService      ├─> AppLoggerService
     │   (React)                 │   (NestJS)              │   (AI Analysis)
     │                            │                          │
     └───────┬────────────────────┴──────────────┬──────────┘
             │                                    │
             ▼                                    ▼
    POST /api/frontend-errors          Direct Database Insert
             │                                    │
             └───────────────┬────────────────────┘
                             ▼
                    system_logs table
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
    Error Logs          AI Calls            System Events
```

### Backend Error Tracking

**Location**: `apps/backend/src/common/logging/`

**Core Service**: `AppLoggerService`

**Available Methods**:
```typescript
// Log errors with full stack traces
await appLoggerService.logError(
  LogContext.AI,           // Context: AI, Database, Auth, Ticket, etc.
  'Error message',
  error,                   // Error object with stack trace
  { metadata },            // Additional context
  userId                   // Optional user ID
);

// Log AI API calls (automatic timing)
await appLoggerService.logAiCall(
  provider,  // 'openai' | 'anthropic' | 'google'
  model,     // 'gpt-4' | 'claude-3-5-sonnet' | 'gemini-pro'
  duration,  // ms
  success,   // boolean
  errorMessage?
);

// Log slow database queries
await appLoggerService.logSlowQuery(
  query,
  duration,
  userId?
);

// Get recent logs (for debugging)
const { logs, total } = await appLoggerService.getLogs({
  level: LogLevel.ERROR,
  context: LogContext.AI,
  limit: 50,
  startDate: new Date('2025-01-01')
});

// Get error statistics
const stats = await appLoggerService.getErrorStats();
// Returns: { totalErrors, errorsByContext, recentErrors }
```

**Log Contexts**:
- `LogContext.AI` - AI provider errors, API calls
- `LogContext.DATABASE` - Database queries, slow queries
- `LogContext.AUTH` - Authentication failures
- `LogContext.TICKET` - Ticket system errors
- `LogContext.EMAIL` - Email sending errors
- `LogContext.CHAT` - Chat system errors
- `LogContext.SYSTEM` - General system errors

**Log Levels**:
- `LogLevel.ERROR` - Critical errors requiring attention
- `LogLevel.WARN` - Warnings (e.g., slow queries >1s)
- `LogLevel.INFO` - General information
- `LogLevel.DEBUG` - Debug information (development only)

### Frontend Error Tracking

**Location**: `apps/frontend/src/services/error-logger.service.ts`

**Global Error Handlers**: Automatically catches:
- Unhandled promise rejections
- Global JavaScript errors
- React component errors (via ErrorBoundary)
- API call failures (via axios interceptors)

**Usage**:
```typescript
import { errorLogger, ErrorSeverity, ErrorCategory } from '@/services/error-logger.service';

// Log API error (automatic via axios interceptor)
// No manual call needed

// Log component error (automatic via ErrorBoundary)
// No manual call needed

// Manual error logging (if needed)
errorLogger.logError({
  message: 'Custom error message',
  severity: ErrorSeverity.HIGH,
  category: ErrorCategory.API,
  metadata: { customData: 'value' }
});
```

**Error Boundary Component**:
```tsx
import { ErrorBoundary } from '@/components/common/error-boundary';

<ErrorBoundary componentName="TicketForm">
  <YourComponent />
</ErrorBoundary>
```

### Database Schema

**Table**: `system_logs`

```sql
CREATE TABLE system_logs (
  id SERIAL PRIMARY KEY,
  level VARCHAR(10),              -- ERROR, WARN, INFO, DEBUG
  context VARCHAR(100),            -- AI, Database, Auth, etc.
  message TEXT,                    -- Error message
  metadata JSONB,                  -- Additional context
  stack_trace TEXT,                -- Full stack trace
  user_id INTEGER,                 -- Associated user
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_system_logs_context ON system_logs(context);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX idx_system_logs_user_id ON system_logs(user_id);
```

### API Endpoints

**Admin Endpoints** (Authentication Required):
```bash
# Get logs with filters
GET /api/system-logs?level=ERROR&context=AI&limit=50

# Get error statistics
GET /api/system-logs/stats

# Clean old logs (30+ days)
DELETE /api/system-logs/cleanup?daysToKeep=30
```

**Public Endpoints** (No Authentication):
```bash
# Log frontend errors
POST /api/frontend-errors
{
  "message": "Error message",
  "severity": "high",
  "category": "api",
  "url": "http://localhost:9003/page",
  "userAgent": "Mozilla/5.0...",
  "metadata": {}
}
```

### Usage Pattern for Claude

**❌ WRONG - DO NOT DO THIS**:
```
Claude: "Please check the backend terminal and tell me what error you see"
Claude: "Can you run this command and send me the output?"
Claude: "Look at the console logs and tell me what happened"
```

**✅ CORRECT - AUTOMATED DEBUGGING**:
```typescript
// 1. Check system logs automatically
const { logs } = await appLoggerService.getLogs({
  level: LogLevel.ERROR,
  context: LogContext.AI,
  limit: 10
});

// 2. Analyze error patterns
const stats = await appLoggerService.getErrorStats();

// 3. Identify root cause from metadata
const latestError = logs[0];
console.log('Error:', latestError.message);
console.log('Metadata:', latestError.metadata);
// { provider: 'google', model: 'gemini-pro', duration: 500, success: false }

// 4. Apply fix based on evidence
// Example: API key invalid → Update settings
// Example: Slow query → Add database index
```

### Real-World Example

**Scenario**: Ticket AI analysis returns 500 error

**❌ OLD APPROACH**:
1. Claude asks user to check terminal
2. User pastes error logs
3. Claude analyzes
4. Back and forth continues...

**✅ NEW APPROACH WITH AUTOMATED DEBUGGING**:
```typescript
// 1. Query system logs automatically
const errorLogs = await appLoggerService.getLogs({
  level: LogLevel.ERROR,
  context: LogContext.AI,
  limit: 5
});

// 2. Analyze error
/*
{
  message: "AI call failed: API key not valid",
  metadata: {
    provider: "google",
    model: "gemini-1.5-flash",
    duration: 624,
    success: false
  }
}
*/

// 3. Identify root cause: Invalid API key for Google provider

// 4. Check settings
const settings = await settingsService.getAiSettings();
// useSingleApiKey: true, global.provider: google

// 5. Solution: API key is encrypted but invalid
// Update with valid key via settings API
```

### Error Detection Rules

**Automatic Detection**:
- ✅ API key missing/invalid → Log ERROR + metadata with provider/model
- ✅ AI model deprecated → Log WARN + suggestion for new model
- ✅ Database query >1s → Log WARN + query details
- ✅ 500 errors → Log ERROR + stack trace
- ✅ Frontend crashes → Log ERROR via ErrorBoundary

**Automated Alerts** (Future):
- Slack/Email notifications for CRITICAL errors
- Dashboard widget for recent errors
- Real-time error streaming (WebSocket)

### Maintenance

**Auto-Cleanup**:
- Logs older than 30 days are automatically cleaned
- Manual cleanup: `DELETE /api/system-logs/cleanup?daysToKeep=7`

**Performance**:
- Indexed columns for fast queries
- JSONB for flexible metadata storage
- Async logging (doesn't block main thread)

### Integration Examples

**TicketsService** (Already Integrated):
```typescript
async analyzeTicketWithAI(problemDescription: string, category: string) {
  const startTime = Date.now();

  try {
    const result = await this.aiService.generateCompletion(...);
    const duration = Date.now() - startTime;

    // ✅ Log successful AI call
    await this.appLoggerService.logAiCall(
      provider,
      model,
      duration,
      true
    );

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    // ✅ Log error with full context
    await this.appLoggerService.logError(
      LogContext.AI,
      `AI ticket analysis failed: ${error.message}`,
      error,
      { provider, model, category, duration }
    );

    // ✅ Log failed AI call
    await this.appLoggerService.logAiCall(
      provider,
      model,
      duration,
      false,
      error.message
    );

    throw error;
  }
}
```

### Key Takeaways for Claude

1. **ALWAYS** query `system_logs` table first when debugging
2. **NEVER** ask users to manually check terminals/logs
3. **USE** `appLoggerService.getLogs()` to retrieve error history
4. **ANALYZE** metadata to identify root causes
5. **APPLY** fixes based on logged evidence
6. **VERIFY** fixes by checking new logs

---

## 🎯 Project Overview

Affexai is a **comprehensive enterprise platform** designed for product-based companies (specifically targeting the Allplan AEC software ecosystem). It combines customer portal, AI-powered support, marketing automation, and content management into a unified solution.

### 🎯 **Ultimate Vision: BCC (Brand Communication Center)**

The platform's core strategic goal is to evolve into a **Brand Communication Center** - an intelligent orchestration system that:

- **🧠 Brand Intelligence**: Collects and analyzes interaction data from all modules (support tickets, emails, social media, CMS engagement, certificates, events)
- **💡 Strategic Insights**: Provides AI-powered strategic recommendations based on sentiment analysis, customer behavior patterns, and brand perception
- **📊 Emotional Brand Analytics**: Evaluates the emotional state of the brand through customer interactions, support quality, marketing engagement, and content performance
- **🎨 Content Optimization**: Suggests improvements for email campaigns, social media posts, support responses, and CMS content based on brand voice and customer sentiment
- **🎯 Predictive Intelligence**: Predicts customer needs, identifies potential issues before they escalate, and recommends proactive communication strategies
- **💎 Brand Value Enhancement**: Delivers substantial added value to companies by helping them understand and improve their brand perception in real-time

**Current Status**: The foundation is built with **Platform Integration Module** (Event Bus, Automation Rules, Data Orchestration) - ready to be evolved into the full BCC vision.

### 🏆 Key Highlights

- **13+ Major Modules**: From support tickets to email marketing
- **AI-Powered Everything**: Multi-provider AI integration (OpenAI, Anthropic, Google)
- **Self-Learning FAQ System**: Auto-generates knowledge base from interactions
- **Block-Based CMS**: 17 block categories, 100+ pre-built components
- **Email Marketing Suite**: Campaigns, A/B testing, automation, GDPR compliance
- **Certificate Management**: Auto-generation, bulk operations, email delivery
- **Real-Time Features**: WebSocket chat, notifications, live updates
- **Analytics & Tracking**: Event tracking, heatmaps, A/B testing, user sessions
- **Design Token System**: Centralized design system with Tailwind integration
- **Role-Based Access**: 6 user roles with granular permissions
- **📁 Media Management**: Module-based organization with 9 modules & 17 categories
- **🎯 Event Bus Architecture**: Central data orchestration system (BCC foundation)

### 🎯 Target Users

1. **Customers**: Self-service portal, support tickets, AI chatbot
2. **Support Team**: Ticket management, live chat, knowledge base
3. **Admin**: Full system control, analytics, user management
4. **Marketing Team**: Email campaigns, subscriber management
5. **Editor**: Content creation, CMS pages
6. **Viewer**: Read-only access to reports

---

## 🏗️ Architecture

### Monorepo Structure

```
affexai-monorepo/
├── apps/
│   ├── backend/           # NestJS API (Port 3001)
│   │   ├── src/
│   │   │   ├── modules/   # 15+ feature modules
│   │   │   ├── database/  # TypeORM migrations
│   │   │   ├── config/    # Configuration
│   │   │   ├── auth/      # Authentication
│   │   │   └── common/    # Shared utilities
│   │   └── package.json
│   │
│   └── frontend/          # Next.js 15 App (Port 9003)
│       ├── src/
│       │   ├── app/       # App Router pages
│       │   ├── components/ # React components
│       │   ├── services/  # API services
│       │   ├── hooks/     # Custom hooks
│       │   └── lib/       # Utilities
│       └── package.json
│
├── packages/
│   └── shared-types/      # Shared TypeScript types
│
├── docker/                # Docker Compose
│   └── docker-compose.yml
│
├── CLAUDE.md              # This file
└── package.json           # Root package
```

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────┐
│                  Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Admin Panel  │  │ User Portal  │  │ Public Site  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────┬───────────────────────────────────────┘
                 │ HTTPS / WebSocket
┌────────────────▼───────────────────────────────────────┐
│            Next.js Frontend (SSR/CSR)                   │
│  • TanStack Query  • Socket.IO Client  • Framer Motion │
└────────────────┬───────────────────────────────────────┘
                 │ REST API / WebSocket
┌────────────────▼───────────────────────────────────────┐
│              NestJS Backend API                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  15+ Feature Modules (Tickets, FAQ, Email, etc) │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  BullMQ Job Queues (Email, Processing, AI)      │  │
│  └──────────────────────────────────────────────────┘  │
└────────────┬─────────────┬─────────────┬───────────────┘
             │             │             │
    ┌────────▼──┐    ┌────▼────┐   ┌───▼────────┐
    │ PostgreSQL│    │  Redis  │   │   AWS S3   │
    │  Database │    │  Cache  │   │  Storage   │
    └───────────┘    └─────────┘   └────────────┘
             │
    ┌────────▼──────────────────────────────┐
    │  External AI Providers                │
    │  • OpenAI  • Anthropic  • Google AI   │
    └───────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend (NestJS 11.0.9)

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | NestJS | 11.0.9 | Enterprise Node.js framework |
| **Runtime** | Node.js | ≥18.0.0 | JavaScript runtime |
| **Language** | TypeScript | 5.7.3 | Type-safe JavaScript |
| **Database** | PostgreSQL | Latest | Primary database (50+ tables) |
| **ORM** | TypeORM | 0.3.27 | Database ORM with migrations |
| **Cache** | Redis (ioredis) | 5.8.0 | Session & query cache |
| **Queue** | BullMQ | 5.60.0 | Background jobs (5 queues) |
| **Auth** | Passport + JWT | Latest | Authentication & authorization |
| **WebSocket** | Socket.IO | Latest | Real-time communication |
| **AI - OpenAI** | openai | 6.3.0 | GPT-4, GPT-3.5 integration |
| **AI - Anthropic** | @anthropic-ai/sdk | 0.67.0 | Claude 3.5 Sonnet integration |
| **AI - Google** | @google/generative-ai | 0.24.1 | Gemini Pro integration |
| **PDF** | PDFKit + Puppeteer | Latest | Certificate & document generation |
| **Email** | Resend | 6.1.2 | Transactional email service |
| **File Storage** | AWS S3 | 3.901.0 | Cloud file storage |
| **Document** | pdf-parse, mammoth, xlsx | Latest | PDF, Word, Excel processing |
| **Web Scraping** | Cheerio | 1.1.2 | URL content extraction |
| **Validation** | class-validator | 0.14.1 | DTO validation |
| **Security** | Helmet, bcrypt | Latest | Security headers, hashing |

### Frontend (Next.js 15.3.3)

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 15.3.3 | React framework with App Router |
| **UI Library** | React | 18.3.1 | Component library |
| **Language** | TypeScript | 5+ | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS |
| **Components** | Radix UI | Various | Accessible UI primitives (50+) |
| **State** | TanStack Query | 5.90.2 | Server state management |
| **Forms** | React Hook Form | 7.54.2 | Form handling & validation |
| **Validation** | Zod | 3.24.2 | Schema validation |
| **Icons** | Lucide React | 0.475.0 | Icon library (1000+) |
| **Charts** | Recharts | 2.15.4 | Data visualization |
| **Rich Text** | Tiptap | 3.7.2 | WYSIWYG editor |
| **Drag & Drop** | React Flow | 12.8.6 | Node-based UI |
| **HTTP** | Axios | 1.12.2 | API client |
| **WebSocket** | Socket.IO Client | 4.8.1 | Real-time client |
| **Animation** | Framer Motion | 12.23.22 | UI animations |
| **Theme** | next-themes | 0.3.0 | Dark/light mode |
| **Notifications** | Sonner | 2.0.7 | Toast notifications |

---

## ✨ Core Features Matrix

### 1. 🎫 Support Center System

**Modules**: `tickets`, `chat`, `faq-learning`

| Feature | Status | Description |
|---------|--------|-------------|
| **Ticketing System** | ✅ Production | Full-featured support ticket management |
| **AI Chatbot** | ✅ Production | Multi-provider AI (GPT-4, Claude, Gemini) |
| **Live Chat** | ✅ Production | WebSocket real-time chat with support handoff |
| **FAQ Learning** | ✅ Production | Self-learning FAQ from tickets & chats |
| **Knowledge Base** | ✅ Production | Article management with categories |
| **Document Upload** | ✅ Production | PDF, Word, Excel parsing for context |
| **URL Processing** | ✅ Production | Web scraping for knowledge extraction |
| **SLA Tracking** | ✅ Production | Breach alerts, escalation rules |
| **CSAT Surveys** | ✅ Production | Customer satisfaction tracking |
| **Email Integration** | ✅ Production | Ticket creation from emails |

**Key Statistics**:
- 15+ Services per module
- 50+ API endpoints
- Real-time WebSocket events
- Multi-language support (TR/EN)

### 2. 📧 Email Marketing Suite

**Module**: `email-marketing`

| Feature | Status | Description |
|---------|--------|-------------|
| **Campaign Management** | ✅ Production | Create, schedule, send campaigns |
| **A/B Testing** | ✅ Production | Split testing with statistical analysis |
| **Email Automation** | ✅ Production | Trigger-based workflows |
| **Subscriber Management** | ✅ Production | Import, export, segmentation |
| **Segmentation** | ✅ Production | Dynamic segment conditions |
| **Email Templates** | ✅ Production | React Email templates (30+) |
| **Email Validation** | ✅ Production | Syntax, domain, MX record checks |
| **Tracking** | ✅ Production | Opens, clicks, bounces, unsubscribes |
| **GDPR Compliance** | ✅ Production | Consent records, data subject requests |
| **IP Reputation** | ✅ Production | Sender score monitoring |
| **Custom Fields** | ✅ Production | Subscriber metadata |
| **Bulk Operations** | ✅ Production | Import/export with queue processing |
| **Send Time Optimization** | ✅ Production | AI-powered timing |
| **Predictive Analytics** | ✅ Production | Churn prediction, engagement scoring |

**Components**:
- 20+ Services
- 15+ Controllers
- 5 BullMQ Queues (email, automation, import, export, validation)
- 18 Database entities

#### 📧 Dynamic Email Headers & Footers

**Status**: ✅ Production (Updated: 2025-10-28)

**Overview**: Email templates automatically inject dynamic headers and footers from site settings at runtime, ensuring all emails have consistent branding without manual updates.

**Key Features**:
- **Dynamic Logo**: Automatically pulls company logo from site settings
- **Contact Information**: Company name, address, phone, email from settings
- **Social Media Icons**: Clickable icons (Facebook, Twitter, LinkedIn, Instagram, YouTube) with brand colors
- **Unsubscribe Link**: Bilingual (TR/EN) unsubscribe with token placeholder
- **Environment-Based URLs**: Automatic URL construction for development/staging/production

**Implementation Details**:

**Location**: [apps/backend/src/modules/email-marketing/services/mjml-renderer.service.ts](apps/backend/src/modules/email-marketing/services/mjml-renderer.service.ts)

**Architecture**:
```
Email Template → MjmlRendererService.renderEmail()
                 ↓
   1. Fetch Site Settings (SettingsService)
   2. Build Environment URLs (getBaseUrl, getFrontendUrl)
   3. Create Header Row (logo, company name)
   4. Inject Email Content
   5. Create Footer Row (contact, social, unsubscribe)
                 ↓
   MJML → HTML with dynamic header/footer
```

**URL Construction** ([mjml-renderer.service.ts:43-70](apps/backend/src/modules/email-marketing/services/mjml-renderer.service.ts#L43-L70)):
```typescript
// Backend API URL (for logo, media)
getBaseUrl(): string {
  // Development: http://localhost:9006
  // Production: https://api.affexai.com (no port)
}

// Frontend URL (for unsubscribe, user links)
getFrontendUrl(): string {
  // Development: http://localhost:9003
  // Production: https://affexai.com (no port)
}
```

**Header Components** ([mjml-renderer.service.ts:344-349](apps/backend/src/modules/email-marketing/services/mjml-renderer.service.ts#L344-L349)):
- Logo: `${baseUrl}/uploads/${siteSettings.logoUrl}` (200px width)
- White background, centered alignment
- Fallback placeholder if logo missing

**Footer Components** ([mjml-renderer.service.ts:348-493](apps/backend/src/modules/email-marketing/services/mjml-renderer.service.ts#L348-L493)):
- Divider line (1px, gray)
- Company name (bold, centered)
- Contact info (pipe-separated: Address | Tel | Email)
- Social media icons (32x32, Flaticon CDN, clickable)
- Unsubscribe link (bilingual, token placeholder)

**Social Media Icons**:
| Platform | Icon URL | Size |
|----------|----------|------|
| Facebook | https://cdn-icons-png.flaticon.com/512/145/145802.png | 32x32 |
| Twitter | https://cdn-icons-png.flaticon.com/512/733/733579.png | 32x32 |
| LinkedIn | https://cdn-icons-png.flaticon.com/512/145/145807.png | 32x32 |
| Instagram | https://cdn-icons-png.flaticon.com/512/2111/2111463.png | 32x32 |
| YouTube | https://cdn-icons-png.flaticon.com/512/1384/1384060.png | 32x32 |

**Environment Variables** (Optional - defaults provided):

```env
# Backend URL Configuration
APP_PROTOCOL=http          # Production: https
APP_HOST=localhost          # Production: api.affexai.com
PORT=9006                   # Current backend port

# Frontend URL Configuration
FRONTEND_PROTOCOL=http      # Production: https
FRONTEND_HOST=localhost     # Production: affexai.com
FRONTEND_PORT=9003          # Current frontend port
```

**Deployment Benefits**:
- ✅ **No Code Changes**: Update `.env` only for different environments
- ✅ **Automatic Port Handling**: Localhost includes port, production excludes it
- ✅ **Consistent Branding**: One place to update logo/contact (site settings)
- ✅ **Multi-Environment**: Same code works in dev/staging/production

**Example URLs**:

Development:
```
Logo: http://localhost:9006/uploads/f3dcbef0-3f9b-45b0-92b0-34973bf13aef
Unsubscribe: http://localhost:9003/unsubscribe?token={{unsubscribeToken}}
```

Production (with environment variables):
```
Logo: https://api.affexai.com/uploads/f3dcbef0-3f9b-45b0-92b0-34973bf13aef
Unsubscribe: https://affexai.com/unsubscribe?token={{unsubscribeToken}}
```

**Related Files**:
- MjmlRendererService: [apps/backend/src/modules/email-marketing/services/mjml-renderer.service.ts](apps/backend/src/modules/email-marketing/services/mjml-renderer.service.ts)
- TemplatePreviewService: [apps/backend/src/modules/email-marketing/services/template-preview.service.ts](apps/backend/src/modules/email-marketing/services/template-preview.service.ts)
- UnifiedTemplateService: [apps/backend/src/modules/email-marketing/services/unified-template.service.ts](apps/backend/src/modules/email-marketing/services/unified-template.service.ts)
- SettingsService: [apps/backend/src/modules/settings/settings.service.ts](apps/backend/src/modules/settings/settings.service.ts)

**Testing**:
- Preview: `GET /api/email-marketing/templates/:id/preview`
- Send test: `POST /api/email-marketing/campaigns/:id/test`

### 3. 🎓 Certificate Management

**Module**: `certificates`

| Feature | Status | Description |
|---------|--------|-------------|
| **Certificate Generation** | ✅ Production | PDF generation with PDFKit/Puppeteer |
| **Templates** | ✅ Production | 3 templates (Standard, Premium, Executive) |
| **Bulk Operations** | ✅ Production | Mass certificate generation for events |
| **Email Delivery** | ✅ Production | Auto-send with Resend |
| **Verification** | ✅ Production | Public verification page |
| **Multi-language** | ✅ Production | Turkish & English |
| **Custom Branding** | ✅ Production | Logo, signature, images |
| **Status Tracking** | ✅ Production | Draft, Issued, Sent, Revoked |

**Use Cases**:
- Training completion certificates
- Event attendance certificates
- Exam certifications
- Professional certifications

### 4. 📄 CMS (Content Management System)

**Module**: `cms`

| Feature | Status | Description |
|---------|--------|-------------|
| **Page Management** | ✅ Production | CRUD operations for pages |
| **Block-Based Editor** | ✅ Production | Drag & drop visual editor |
| **Block Library** | ✅ Production | 17 block categories, 100+ components |
| **Menu Management** | ✅ Production | Dynamic navigation menus |
| **Categories** | ✅ Production | Hierarchical categorization |
| **Templates** | ✅ Production | Page templates |
| **Media Library** | ✅ Production | Image/video management |
| **Version Control** | 🚧 Planned | Page versioning |
| **SEO Optimization** | ✅ Production | Meta tags, OG tags |
| **Multilingual** | 🚧 Planned | i18n support |

**Block Categories** (17 types):
1. **Hero Blocks**: Full-screen headers with CTAs
2. **Content Blocks**: Text, images, rich content
3. **Feature Blocks**: Feature showcases
4. **Testimonial Blocks**: Customer reviews
5. **Gallery Blocks**: Image galleries
6. **Pricing Blocks**: Pricing tables
7. **Stats Blocks**: Counters, statistics
8. **Footer Blocks**: Multi-column footers
9. **Navigation Blocks**: Menus, breadcrumbs
10. **Element Blocks**: Buttons, dividers
11. **Social Blocks**: Social media integration
12. **Blog/RSS Blocks**: Blog posts, feeds
13. **E-commerce Blocks**: Product displays
14. **Progress Blocks**: Progress bars, timelines
15. **Rating Blocks**: Star ratings, reviews
16. **Special Blocks**: Contact forms, maps
17. **Content Variants**: A/B testing blocks

### 5. 📊 Analytics & Tracking

**Module**: `analytics`

| Feature | Status | Description |
|---------|--------|-------------|
| **Event Tracking** | ✅ Production | Custom event tracking |
| **Session Tracking** | ✅ Production | User session analytics |
| **Heatmaps** | ✅ Production | Click heatmaps |
| **A/B Testing** | ✅ Production | Experiment tracking |
| **Component Performance** | ✅ Production | Component load times |
| **User Journey** | ✅ Production | Path analysis |
| **Conversion Tracking** | ✅ Production | Goal completions |
| **Real-Time Dashboard** | ✅ Production | Live metrics |

**Tracked Metrics**:
- Page views, unique visitors
- Session duration, bounce rate
- Event conversions
- Component interactions
- User engagement scores

### 6. 🎨 Design System

**Module**: `lib/design-tokens`

| Feature | Status | Description |
|---------|--------|-------------|
| **Design Tokens** | ✅ Production | Centralized design system |
| **Color Palette** | ✅ Production | Primary, neutral, semantic colors |
| **Typography Scale** | ✅ Production | Font sizes, weights, line heights |
| **Spacing System** | ✅ Production | 8px grid system |
| **Border Radius** | ✅ Production | Consistent rounding |
| **Shadows** | ✅ Production | Elevation system |
| **Breakpoints** | ✅ Production | Responsive design |
| **Z-Index Scale** | ✅ Production | Layering system |
| **Transitions** | ✅ Production | Animation timings |

**Integration**:
- Tailwind CSS configuration
- CSS variables
- TypeScript constants
- Shared across frontend

### 7. ⚙️ Global Settings & Configuration

**Module**: `settings`

| Feature | Status | Description |
|---------|--------|-------------|
| **Site Settings** | ✅ Production | Logo, name, description, social links |
| **Email Settings** | ✅ Production | SMTP, sender configuration |
| **AI Settings** | ✅ Production | Multi-provider AI configuration |
| **Module Settings** | ✅ Production | Per-module AI provider selection |
| **Feature Flags** | ✅ Production | Enable/disable features |
| **Localization** | 🚧 Planned | Language preferences |

**AI Configuration**:
```typescript
{
  useSingleApiKey: boolean,
  global: {
    provider: 'openai' | 'anthropic' | 'google',
    model: 'gpt-4' | 'claude-3-5-sonnet' | 'gemini-pro',
    apiKey: string,
    enabled: boolean
  },
  emailMarketing: { ...moduleSettings },
  support: { ...moduleSettings },
  social: { ...moduleSettings },
  analytics: { ...moduleSettings }
}
```

### 8. 🔔 Notifications System

**Module**: `notifications`

| Feature | Status | Description |
|---------|--------|-------------|
| **Real-Time Notifications** | ✅ Production | WebSocket push notifications |
| **Email Notifications** | ✅ Production | Transactional emails |
| **In-App Notifications** | ✅ Production | Toast notifications |
| **Notification Center** | ✅ Production | Notification history |
| **User Preferences** | ✅ Production | Notification settings |

### 9. 👥 User Management & RBAC

**Modules**: `users`, `roles`, `auth`

| Feature | Status | Description |
|---------|--------|-------------|
| **User CRUD** | ✅ Production | Full user management |
| **Role-Based Access** | ✅ Production | 6 predefined roles |
| **Permission System** | ✅ Production | Granular permissions |
| **JWT Authentication** | ✅ Production | Secure token-based auth |
| **Refresh Tokens** | ✅ Production | Token rotation |
| **Password Reset** | ✅ Production | Email-based reset |
| **Email Verification** | ✅ Production | Account activation |
| **2FA** | 🚧 Planned | Two-factor authentication |

**User Roles**:
1. **Admin**: Full system access
2. **Customer**: Portal access, tickets, events
3. **Support Team**: Ticket management, live chat
4. **Editor**: Content management, CMS
5. **Marketing Team**: Email campaigns, subscribers
6. **Viewer**: Read-only access

### 10. 📅 Event Management

**Module**: `events`

| Feature | Status | Description |
|---------|--------|-------------|
| **Event Creation** | ✅ Production | Training events, webinars |
| **Registration** | ✅ Production | Participant enrollment |
| **Certificate Integration** | ✅ Production | Auto-generate certificates |
| **Event Discovery** | ✅ Production | Public event listing |
| **Capacity Management** | ✅ Production | Max participants |
| **Email Reminders** | ✅ Production | Automated reminders |

### 11. 🔌 Platform Integration

**Module**: `platform-integration`

| Feature | Status | Description |
|---------|--------|-------------|
| **Webhooks** | ✅ Production | Incoming/outgoing webhooks |
| **Automation Rules** | ✅ Production | Event-driven automation |
| **Event Bus** | ✅ Production | Internal event system |
| **API Keys** | ✅ Production | Third-party integration |

### 12. 📱 Social Media Management

**Module**: Social media management (in backend structure)

| Feature | Status | Description |
|---------|--------|-------------|
| **Post Scheduling** | 🎨 Mock Data | Social media post scheduler |
| **Content Calendar** | 🎨 Mock Data | Editorial calendar |
| **Multi-Platform** | 🎨 Mock Data | Facebook, Twitter, LinkedIn |
| **Analytics** | 🎨 Mock Data | Engagement metrics |

> **Note**: Social Media Management currently uses mock data and is not fully implemented.

### 13. 📁 Media Management System

**Module**: `media`

| Feature | Status | Description |
|---------|--------|-------------|
| **File Upload** | ✅ Production | Multi-file upload with S3 storage |
| **Module-Based Organization** | ✅ Production | 9 modules (CMS, Tickets, Email, etc.) |
| **Category System** | ✅ Production | 17 categories (Logo, Hero, Gallery, etc.) |
| **Tag Support** | ✅ Production | Custom tags for flexible organization |
| **Advanced Filtering** | ✅ Production | Filter by module, category, type, tags |
| **Search** | ✅ Production | Search by filename, title, description |
| **Statistics** | ✅ Production | Module/category counts |
| **Docker Persistence** | ✅ Production | Persistent storage with Docker volumes |

**Modules** (9 types):
- `site-settings` - Logo, favicon, branding assets
- `cms` - CMS page images, banners, backgrounds
- `certificates` - Certificate templates, signatures
- `email-marketing` - Campaign images, email headers
- `tickets` - Ticket attachments
- `chat` - Chat uploads
- `events` - Event covers, promotional images
- `users` - Avatars, profile images
- `general` - Uncategorized uploads

**Categories** (17 types):
- `logo`, `favicon`, `hero`, `gallery`, `banner`
- `thumbnail`, `background`, `icon`, `signature`
- `certificate-template`, `campaign`, `email-header`
- `attachment`, `avatar`, `profile`, `event-cover`, `other`

**API Endpoints**:
```typescript
GET    /media                     - List all media with filters
POST   /media/upload              - Upload file with module/category/tags
GET    /media/modules             - Get modules with counts
GET    /media/categories          - Get categories with counts
GET    /media/by-module/:module   - Get media by module
GET    /media/by-category/:cat    - Get media by category
GET    /media/:id                 - Get single media
PATCH  /media/:id                 - Update media metadata
DELETE /media/:id                 - Soft delete media
```

**Docker Storage**:
```yaml
# docker-compose.production.yml
volumes:
  uploads_data:
    driver: local
# Mounted at: /app/apps/backend/uploads
```

---

## 🔧 Backend Modules Deep Dive

### Module: Authentication & Authorization

**Location**: `apps/backend/src/auth/`

**Key Files**:
- `auth.service.ts` - Authentication logic (login, register, token management)
- `auth.controller.ts` - Auth endpoints
- `guards/jwt-auth.guard.ts` - JWT verification
- `guards/roles.guard.ts` - Role-based access control
- `guards/permissions.guard.ts` - Permission-based authorization
- `decorators/current-user.decorator.ts` - Extract user from request

**Endpoints**:
```typescript
POST   /auth/register          - User registration
POST   /auth/login             - User login
POST   /auth/logout            - User logout
POST   /auth/refresh           - Refresh access token
POST   /auth/forgot-password   - Request password reset
POST   /auth/reset-password    - Reset password
GET    /auth/me                - Get current user
POST   /auth/verify-email      - Verify email address
```

**Security Features**:
- Bcrypt password hashing (12 rounds)
- JWT access tokens (7 days)
- Refresh token rotation
- Token versioning (invalidate all tokens)
- Email verification
- Password reset with expiring tokens

---

### Module: Support Tickets

**Location**: `apps/backend/src/modules/tickets/`

**Services** (15+):
- `tickets.service.ts` - Core ticket operations
- `sla.service.ts` - SLA tracking & breach detection
- `ticket-automation.service.ts` - Auto-assignment, escalation
- `ticket-assignment-rules.service.ts` - Assignment logic
- `ticket-escalation-rules.service.ts` - Escalation workflows
- `ticket-email.service.ts` - Email integration
- `ticket-email-parser.service.ts` - Parse incoming emails
- `ticket-attachment.service.ts` - File attachments
- `ticket-csat.service.ts` - Customer satisfaction surveys
- `ticket-analytics.service.ts` - Reporting & analytics
- `ticket-templates.service.ts` - Template management
- `ticket-macro.service.ts` - Quick actions
- `ai-categorization.service.ts` - AI-powered categorization
- `knowledge-base.service.ts` - KB article management
- `business-hours.service.ts` - Calculate SLA with business hours

**Entities**:
- `ticket.entity.ts` - Main ticket
- `ticket-message.entity.ts` - Ticket messages/replies
- `ticket-category.entity.ts` - Categories & subcategories
- `ticket-assignment-rule.entity.ts` - Auto-assignment rules
- `ticket-escalation-rule.entity.ts` - Escalation rules
- `ticket-template.entity.ts` - Canned responses
- `ticket-macro.entity.ts` - Quick action macros
- `ticket-csat.entity.ts` - CSAT survey responses
- `ticket-audit-log.entity.ts` - Full audit trail
- `knowledge-base-article.entity.ts` - KB articles
- `knowledge-base-category.entity.ts` - KB categories

**Features**:
- Multi-channel ticket creation (email, web, chat)
- Priority levels (low, medium, high, urgent)
- Status workflow (open → in_progress → resolved → closed)
- SLA tracking with breach alerts
- Auto-assignment based on rules (workload, skills, round-robin)
- Escalation rules (time-based, priority-based)
- Email parsing for automatic ticket creation
- File attachments with S3 storage
- Internal notes (hidden from customers)
- CSAT surveys (1-5 stars + comments)
- AI-powered categorization
- Ticket merging & splitting
- Audit logging (all changes tracked)

---

### Module: Real-Time Chat

**Location**: `apps/backend/src/modules/chat/`

**Services** (15+):
- `chat-session.service.ts` - Session management
- `chat-message.service.ts` - Message handling
- `chat-ai.service.ts` - AI response generation
- `chat-context-engine.service.ts` - Semantic search for context
- `document-processor.service.ts` - PDF, Word, Excel processing
- `url-processor.service.ts` - Web scraping
- `url-cache.service.ts` - URL content caching
- `file-validator.service.ts` - File upload validation
- `chat-support-assignment.service.ts` - Assign to support team
- `chat-handoff.service.ts` - AI to human handoff
- `chat-escalation.service.ts` - Escalation logic
- `support-dashboard.service.ts` - Support team dashboard
- `general-communication-context.service.ts` - Context for general chat
- `general-communication-ai.service.ts` - AI for general communication
- `chat-ai-settings.service.ts` - AI configuration

**Entities**:
- `chat-session.entity.ts` - Chat sessions
- `chat-message.entity.ts` - Messages
- `chat-document.entity.ts` - Uploaded documents
- `chat-context-source.entity.ts` - Knowledge sources
- `chat-support-assignment.entity.ts` - Support assignments
- `chat-url-cache.entity.ts` - Cached URL content

**WebSocket Gateway**:
- `chat.gateway.ts` - Socket.IO event handlers
  - `join-session` - Join a chat session
  - `send-message` - Send message
  - `upload-file` - Upload document
  - `process-url` - Process URL for context
  - `typing-start` / `typing-stop` - Typing indicators
  - `ping` / `pong` - Connection health checks

**Features**:
- WebSocket-based real-time messaging
- AI chatbot with multi-provider support (GPT-4, Claude, Gemini)
- Document upload & processing (PDF, Word, Excel, PowerPoint, Markdown)
- URL processing & web scraping
- Context-aware AI responses (FAQ, KB, documents, URLs)
- Live chat with support team
- AI to human handoff
- Typing indicators
- Message delivery status
- Connection quality monitoring
- Offline message queue
- Chat history

---

### Module: FAQ Learning System

**Location**: `apps/backend/src/modules/faq-learning/`

**Core Services**:

**Data Extraction**:
- `chat-data-extractor.service.ts` - Extract Q&A from chat sessions
- `ticket-data-extractor.service.ts` - Extract Q&A from tickets
- `data-normalizer.service.ts` - Normalize extracted data
- `batch-processor.service.ts` - Batch processing

**Pattern Recognition & AI**:
- `pattern-recognition.service.ts` - Identify common question patterns
- `faq-ai.service.ts` - Generate FAQ content with AI
- `confidence-calculator.service.ts` - Score FAQ quality (0-100)

**FAQ Management**:
- `faq-learning.service.ts` - Main orchestration
- `faq-generator.service.ts` - Generate FAQs
- `review-queue.service.ts` - Manage approval workflow
- `feedback-processor.service.ts` - Process user feedback

**Integration**:
- `knowledge-base-integrator.service.ts` - Publish to KB
- `faq-enhanced-search.service.ts` - Semantic search
- `chat-faq-integration.service.ts` - Integrate with chatbot

**Background Processing**:
- `scheduled-learning-jobs.service.ts` - Cron jobs
- `real-time-processor.service.ts` - Real-time processing

**Analytics & Monitoring**:
- `learning-analytics.service.ts` - Performance metrics
- `monitoring-alerting.service.ts` - System health monitoring

**Security**:
- `data-privacy.service.ts` - PII handling
- `audit-logging.service.ts` - Audit trail

**AI Providers** (Multi-provider adapters):
- `ai-providers/openai-adapter.ts`
- `ai-providers/anthropic-adapter.ts`
- `ai-providers/gemini-adapter.ts`

**Entities**:
- `learned-faq-entry.entity.ts` - Generated FAQs
- `learning-pattern.entity.ts` - Identified patterns
- `faq-learning-config.entity.ts` - Configuration

**Workflow**:
```
Chat/Ticket Data → Extraction → Pattern Recognition → AI Generation
  → Confidence Scoring → Review Queue → Approval → Publish to KB
  → Chatbot Integration → User Feedback → Refinement
```

**Configuration Options** (20+ settings):
- Processing mode (real-time, batch, scheduled)
- AI provider & model selection
- Confidence thresholds
- Auto-publish threshold
- Data retention period
- Privacy settings
- Batch size
- Max review queue size

---

### Module: Email Marketing

**Location**: `apps/backend/src/modules/email-marketing/`

**Core Services** (40+):

**Campaign Management**:
- `email-campaign.service.ts` - Campaign CRUD
- `campaign-scheduler.service.ts` - Schedule sends

**Subscriber Management**:
- `subscriber.service.ts` - Subscriber CRUD
- `segment.service.ts` - Dynamic segmentation
- `group.service.ts` - Subscriber groups
- `custom-field.service.ts` - Custom subscriber fields

**Email Operations**:
- `email-marketing.service.ts` - Main orchestration
- `template.service.ts` - Template management
- `template-file.service.ts` - Template file handling
- `template-preview.service.ts` - Email preview

**Validation & Quality**:
- `email-validation.service.ts` - Basic validation
- `advanced-email-validation.service.ts` - MX, domain checks
- `ip-reputation.service.ts` - Sender score monitoring

**A/B Testing**:
- `ab-test.service.ts` - Experiment management
- `ab-test-statistics.service.ts` - Statistical analysis

**Automation**:
- `automation.service.ts` - Workflow automation
- `trigger-evaluator.service.ts` - Evaluate triggers
- `automation-queue.service.ts` - Queue management
- `workflow-executor.service.ts` - Execute workflows
- `automation-scheduler.service.ts` - Schedule automations

**Analytics & Tracking**:
- `analytics.service.ts` - Campaign analytics
- `tracking.service.ts` - Opens, clicks tracking
- `stats.service.ts` - Statistics
- `send-time-optimization.service.ts` - Optimal send times
- `predictive-analytics.service.ts` - Churn prediction, engagement scoring

**Bulk Operations**:
- `file-processing.service.ts` - CSV/Excel processing
- `file-upload.service.ts` - File upload handling
- `bulk-import.service.ts` - Import subscribers
- `bulk-export.service.ts` - Export subscribers
- `export-cleanup.service.ts` - Cleanup temp files
- `batch-processing.service.ts` - Batch operations

**GDPR Compliance**:
- `gdpr-compliance.service.ts` - Data subject requests
- `bulk-operations-compliance.service.ts` - Compliance checks
- `opt-in-out.service.ts` - Subscription management

**Security**:
- `enhanced-file-security.service.ts` - File scanning

**BullMQ Processors** (5 queues):
- `email.processor.ts` - Email sending queue
- `automation.processor.ts` - Automation execution
- `import-job.processor.ts` - Import processing
- `export-job.processor.ts` - Export processing
- `validation-job.processor.ts` - Validation queue

**Entities** (18+):
- `subscriber.entity.ts`
- `email-campaign.entity.ts`
- `email-campaign-variant.entity.ts` (A/B testing)
- `email-template.entity.ts`
- `email-log.entity.ts`
- `email-open-history.entity.ts`
- `segment.entity.ts`
- `group.entity.ts`
- `custom-field.entity.ts`
- `email-automation.entity.ts`
- `automation-trigger.entity.ts`
- `automation-execution.entity.ts`
- `automation-schedule.entity.ts`
- `import-job.entity.ts`
- `export-job.entity.ts`
- `import-result.entity.ts`
- `consent-record.entity.ts` (GDPR)
- `data-subject-request.entity.ts` (GDPR)

**Features**:
- Campaign creation, scheduling, sending
- A/B testing (subject line, content, send time)
- Dynamic segmentation (rules-based)
- Subscriber import/export (CSV, Excel)
- Email templates (30+ React Email templates)
- Tracking (opens, clicks, bounces, unsubscribes)
- Automation workflows (trigger → action)
- Email validation (syntax, domain, MX records)
- IP reputation monitoring
- GDPR compliance (consent, data requests)
- Custom fields
- Send time optimization
- Predictive analytics
- Bulk operations with queue processing

---

### Module: CMS (Content Management System)

**Location**: `apps/backend/src/modules/cms/`

**Services**:
- `page.service.ts` - Page management
- `component.service.ts` - Component management
- `category.service.ts` - Category management
- `menu.service.ts` - Menu management
- `cms-metrics.service.ts` - Analytics
- `template.service.ts` - Page templates
- `cms-settings.service.ts` - CMS configuration

**Entities**:
- `page.entity.ts` - CMS pages
- `component.entity.ts` - Reusable components
- `category.entity.ts` - Content categories
- `menu.entity.ts` - Navigation menus
- `menu-item.entity.ts` - Menu items
- `page-template.entity.ts` - Page templates
- `cms-metric.entity.ts` - Page performance metrics

**Frontend CMS Components**:
- Visual page builder with drag & drop
- Block library (17 categories, 100+ blocks)
- Media library integration
- SEO settings per page
- Responsive preview
- Version history (planned)

**Block Categories** (apps/frontend/src/components/cms/blocks/):
1. **hero-blocks.tsx** - Hero sections with CTAs
2. **content-blocks.tsx** - Text, image, video content
3. **features-blocks.tsx** - Feature showcases
4. **testimonials-blocks.tsx** - Customer testimonials
5. **gallery-blocks.tsx** - Image galleries
6. **pricing-blocks.tsx** - Pricing tables
7. **stats-blocks.tsx** - Statistics, counters
8. **footer-blocks.tsx** - Multi-column footers
9. **navigation-blocks.tsx** - Headers, menus
10. **element-blocks.tsx** - Buttons, dividers, spacers
11. **social-sharing-blocks.tsx** - Social media integration
12. **blog-rss-blocks.tsx** - Blog posts, RSS feeds
13. **ecommerce-blocks.tsx** - Product cards, carts
14. **progress-blocks.tsx** - Progress bars, timelines
15. **rating-blocks.tsx** - Star ratings, reviews
16. **special-blocks.tsx** - Contact forms, maps, videos
17. **content-variants-blocks.tsx** - A/B testing blocks

---

### Module: Certificates

**Location**: `apps/backend/src/modules/certificates/`

**Services**:
- `certificates.service.ts` - Legacy service
- `certificates-v2.service.ts` - Enhanced service
- `bulk-certificate.service.ts` - Bulk generation for events
- `pdf-generator.service.ts` - PDF generation (PDFKit/Puppeteer)
- `certificate-email.service.ts` - Email delivery

**Entities**:
- `certificate.entity.ts` - Certificate records
- `certificate-template.entity.ts` - HTML templates

**Templates** (HTML-based):
- `standard-template.html` - Basic certificate
- `premium-template.html` - Premium design
- `executive-template.html` - Executive design
- Turkish variants available

**Features**:
- PDF generation with dynamic data
- Bulk generation for events
- Email delivery with Resend
- Public verification page
- Status tracking (Draft, Issued, Sent, Revoked)
- Certificate numbering (ALP-TR-YYYY-MM-SHORTID)
- Custom branding (logo, signature, images)
- Multi-language support

---

### Module: Analytics & Tracking

**Location**: `apps/backend/src/modules/analytics/`

**Services**:
- `analytics-tracking.service.ts` - Event tracking
- `analytics-dashboard.service.ts` - Dashboard data
- `ab-testing.service.ts` - A/B test management
- `heatmap.service.ts` - Click heatmaps

**Entities**:
- `analytics-event.entity.ts` - Custom events
- `analytics-session.entity.ts` - User sessions
- `analytics-heatmap.entity.ts` - Heatmap data
- `ab-test.entity.ts` - A/B tests
- `ab-test-variant.entity.ts` - Test variants
- `component-performance.entity.ts` - Component metrics

**Tracked Metrics**:
- Page views, unique visitors
- Session duration, bounce rate
- Custom event conversions
- Component load times
- User engagement scores
- A/B test results
- Heatmap clicks

---

### Module: Events Management

**Location**: `apps/backend/src/modules/events/`

**Services**:
- `events.service.ts` - Event CRUD operations

**Entities**:
- `event.entity.ts` - Training events, webinars
- `event-registration.entity.ts` - Participant registrations

**Features**:
- Event creation & management
- Participant registration
- Capacity limits
- Certificate integration (auto-generate after event)
- Email reminders
- Event discovery page

---

### Module: Settings

**Location**: `apps/backend/src/modules/settings/`

**DTOs**:
- `site-settings.dto.ts` - Logo, name, social links
- `email-settings.dto.ts` - SMTP, sender config
- `ai-settings.dto.ts` - Multi-provider AI config

**Entity**:
- `setting.entity.ts` - Key-value configuration

**AI Settings Structure**:
```typescript
{
  useSingleApiKey: boolean,
  global: {
    provider: 'openai' | 'anthropic' | 'google',
    model: AiModel,
    apiKey: string,
    enabled: boolean
  },
  emailMarketing: { provider, model, apiKey, enabled },
  support: { provider, model, apiKey, enabled },
  social: { provider, model, apiKey, enabled },
  analytics: { provider, model, apiKey, enabled }
}
```

**Supported AI Models**:
- OpenAI: GPT-4, GPT-4 Turbo, GPT-4o, GPT-3.5 Turbo
- Anthropic: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- Google: Gemini Pro, Gemini 1.5 Pro, Gemini 1.5 Flash

---

### Module: Media Management

**Location**: `apps/backend/src/modules/media/`

**Services**:
- `media.service.ts` - Media CRUD with advanced filtering
- `s3.service.ts` - AWS S3 file storage operations

**Entity** (`media.entity.ts`):
```typescript
{
  id: string,                    // UUID
  filename: string,              // Stored filename
  originalName: string,          // Original upload name
  mimetype: string,              // File MIME type
  size: number,                  // File size in bytes
  path: string,                  // Storage path
  url: string,                   // Access URL
  type: MediaType,               // image, video, document, audio, other
  module: MediaModule,           // site-settings, cms, certificates, etc.
  category: MediaCategory,       // logo, hero, gallery, banner, etc.
  tags: string[],                // Custom tags array
  title?: string,                // Optional title
  description?: string,          // Optional description
  isActive: boolean,             // Soft delete flag
  createdAt: Date,
  updatedAt: Date
}
```

**Enums** (shared-types):
```typescript
// MediaModule - 9 types
enum MediaModule {
  SITE_SETTINGS = 'site-settings',
  CMS = 'cms',
  CERTIFICATES = 'certificates',
  EMAIL_MARKETING = 'email-marketing',
  TICKETS = 'tickets',
  CHAT = 'chat',
  EVENTS = 'events',
  USERS = 'users',
  GENERAL = 'general'
}

// MediaCategory - 17 types
enum MediaCategory {
  LOGO = 'logo',
  FAVICON = 'favicon',
  HERO = 'hero',
  GALLERY = 'gallery',
  BANNER = 'banner',
  THUMBNAIL = 'thumbnail',
  BACKGROUND = 'background',
  ICON = 'icon',
  SIGNATURE = 'signature',
  CERTIFICATE_TEMPLATE = 'certificate-template',
  CAMPAIGN = 'campaign',
  EMAIL_HEADER = 'email-header',
  ATTACHMENT = 'attachment',
  AVATAR = 'avatar',
  PROFILE = 'profile',
  EVENT_COVER = 'event-cover',
  OTHER = 'other'
}
```

**Features**:
- Multi-file upload with S3 storage
- Module-based organization (9 modules)
- Category classification (17 categories)
- Custom tagging system
- Advanced filtering (module, category, type, tags, search)
- Pagination support
- Statistics endpoints (counts per module/category)
- Soft delete (isActive flag)
- Database indexes for performance
- Docker volume persistence for production

**Database Migration**: `1762400000000-AddMediaModuleAndCategory.ts`
- Creates PostgreSQL enum types for module and category
- Adds indexed columns for fast filtering
- Composite index on (module, category)

---

## 🎨 Frontend Architecture

### Application Structure

```
apps/frontend/src/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin Panel
│   │   ├── (auth)/         # Login, signup
│   │   ├── dashboard/      # Admin dashboard
│   │   ├── support/        # Support management
│   │   │   ├── faq-learning/
│   │   │   │   ├── page.tsx              # Dashboard
│   │   │   │   ├── review/page.tsx       # Review queue
│   │   │   │   ├── settings/page.tsx     # Settings
│   │   │   │   └── providers/page.tsx    # AI providers
│   │   │   ├── knowledge-base/
│   │   │   │   ├── page.tsx              # KB list
│   │   │   │   └── new/page.tsx          # Create article
│   │   │   ├── [ticketId]/page.tsx       # Ticket details
│   │   │   ├── ai-insights/page.tsx      # AI analytics
│   │   │   └── knowledge-sources/page.tsx # Chat context (planned)
│   │   ├── newsletter/     # Email marketing
│   │   │   ├── page.tsx                  # Dashboard
│   │   │   ├── campaigns/                # Campaigns
│   │   │   ├── subscribers/              # Subscriber management
│   │   │   ├── templates/                # Email templates
│   │   │   ├── segments/                 # Segmentation
│   │   │   └── validation/               # Email validation
│   │   ├── cms/            # Content management
│   │   │   ├── pages/                    # Page management
│   │   │   ├── menus/                    # Menu management
│   │   │   └── media/                    # Media library
│   │   ├── users/          # User management
│   │   │   ├── page.tsx                  # User list
│   │   │   ├── roles/                    # Role management
│   │   │   └── [userId]/page.tsx         # User details
│   │   ├── events/         # Event management
│   │   ├── certificates/   # Certificate management
│   │   └── settings/       # System settings
│   │
│   ├── portal/             # Customer Portal
│   │   ├── dashboard/      # Role-based dashboards
│   │   │   ├── customer/page.tsx
│   │   │   ├── support-team/page.tsx
│   │   │   ├── admin/page.tsx
│   │   │   ├── editor/page.tsx
│   │   │   ├── marketing-team/page.tsx
│   │   │   └── viewer/page.tsx
│   │   ├── support/        # Support center
│   │   │   ├── page.tsx                  # My tickets
│   │   │   ├── new/page.tsx              # Create ticket
│   │   │   ├── [ticketId]/page.tsx       # Ticket details
│   │   │   └── chatbox-demo/page.tsx     # AI chatbot demo
│   │   ├── kb/             # Knowledge base
│   │   │   ├── page.tsx                  # Article list
│   │   │   └── [articleSlug]/page.tsx    # Article view
│   │   ├── events/         # Event discovery
│   │   ├── certificates/   # My certificates
│   │   ├── profile/        # User profile
│   │   └── downloads/      # Downloads
│   │
│   ├── cms/                # CMS Public Pages
│   │   └── [slug]/page.tsx
│   │
│   ├── (public)/           # Public Website
│   │   ├── page.tsx        # Homepage
│   │   ├── products/       # Product pages
│   │   ├── solutions/      # Solution pages
│   │   ├── education/      # Training & certification
│   │   ├── contact/        # Contact page
│   │   └── downloads/      # Public downloads
│   │
│   └── layout.tsx          # Root layout
│
├── components/             # React Components
│   ├── ui/                 # Base UI components (50+)
│   │   ├── button.tsx, input.tsx, select.tsx
│   │   ├── dialog.tsx, sheet.tsx, popover.tsx
│   │   ├── table.tsx, card.tsx, tabs.tsx
│   │   └── ...
│   ├── admin/              # Admin components
│   │   ├── dashboard-sidebar.tsx
│   │   ├── dashboard-header.tsx
│   │   ├── user-form.tsx
│   │   ├── role-form.tsx
│   │   └── ...
│   ├── portal/             # Portal components
│   │   ├── portal-sidebar.tsx
│   │   ├── portal-header.tsx
│   │   └── dashboards/
│   ├── cms/                # CMS components
│   │   ├── blocks/         # 17 block category files
│   │   ├── editor/         # Visual editor
│   │   │   ├── visual-editor.tsx
│   │   │   ├── editor-canvas.tsx
│   │   │   ├── component-library.tsx
│   │   │   ├── properties-panel.tsx
│   │   │   └── media-library.tsx
│   │   ├── page-renderer.tsx
│   │   └── block-registry.ts
│   ├── layout/             # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── common/             # Shared components
│       ├── theme-provider.tsx
│       └── theme-toggle.tsx
│
├── services/               # API Service Layer
│   ├── faq-learning.service.ts
│   ├── tickets.service.ts
│   └── http-client.ts
│
├── hooks/                  # Custom React Hooks
│   ├── use-chat-socket.ts
│   ├── use-toast.ts
│   └── use-mobile.tsx
│
├── lib/                    # Utilities
│   ├── api/                # API clients
│   ├── utils/              # Helper functions
│   ├── design-tokens/      # Design system
│   └── types.ts
│
└── styles/
    └── globals.css
```

### UI Component Library (50+)

**Radix UI + shadcn/ui Components**:

**Form Inputs**:
- Button, Input, Textarea
- Select, Checkbox, Radio Group
- Switch, Slider
- Label, Form

**Overlays**:
- Dialog, Sheet, Popover
- Dropdown Menu, Menubar
- Tooltip, Alert Dialog
- Collapsible, Accordion

**Data Display**:
- Table, Card, Badge
- Avatar, Skeleton
- Separator, Scroll Area
- Tabs, Progress

**Feedback**:
- Toast, Alert
- Toaster (Sonner)

**Navigation**:
- Breadcrumb, Sidebar

**Date & Time**:
- Calendar, Date Picker

**Layout**:
- Carousel (Embla)

### State Management

**TanStack Query** (React Query):
```typescript
// Example: Fetch FAQ dashboard
const { data, isLoading, error } = useQuery({
  queryKey: ['faq-dashboard'],
  queryFn: () => FaqLearningService.getDashboardStats(),
  refetchInterval: 30000, // Refetch every 30s
  staleTime: 10000
});

// Example: Mutation
const mutation = useMutation({
  mutationFn: (faqId: string) =>
    FaqLearningService.reviewFaq(faqId, 'approve', {}),
  onSuccess: () => {
    queryClient.invalidateQueries(['review-queue']);
    toast.success('FAQ approved!');
  }
});
```

**Local State**:
- React useState
- React useReducer
- React useContext (minimal)

### Styling Approach

**Tailwind CSS**:
```tsx
<Card className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-2xl font-bold text-foreground">
      Dashboard
    </CardTitle>
    <CardDescription className="text-muted-foreground">
      Overview of your statistics
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Content */}
    </div>
  </CardContent>
</Card>
```

**Theme System**:
- CSS variables for colors
- Light/dark mode (next-themes)
- Design tokens integration

### WebSocket Integration

**Real-Time Features**:
```typescript
// In component
const {
  isConnected,
  sendMessage,
  uploadFile,
  connectionQuality
} = useChatSocket({
  onMessageReceived: (message) => {
    setMessages(prev => [...prev, message]);
  },
  onAiResponseChunk: ({ chunk }) => {
    appendToLatestMessage(chunk);
  },
  onConnectionStatusChange: (connected) => {
    setConnectionStatus(connected);
  }
});
```

---

## 💾 Database Schema

### Core Tables Summary

**Total Tables**: 50+

**Categories**:
1. **Authentication & Users** (5 tables)
   - users, roles, user_roles, refresh_tokens

2. **Support System** (12 tables)
   - tickets, ticket_messages, ticket_categories
   - knowledge_base_articles, knowledge_base_categories
   - ticket_assignment_rule, ticket_escalation_rule
   - ticket_template, ticket_macro, ticket_csat, ticket_audit_log

3. **Chat System** (7 tables)
   - chat_sessions, chat_messages, chat_documents
   - chat_context_sources, chat_support_assignment
   - chat_url_cache

4. **FAQ Learning** (3 tables)
   - learned_faq_entries, learning_patterns, faq_learning_config

5. **Email Marketing** (18 tables)
   - subscribers, email_campaigns, email_campaign_variants
   - email_templates, email_logs, email_open_history
   - segments, groups, custom_fields
   - email_automation, automation_trigger, automation_execution, automation_schedule
   - import_job, export_job, import_result
   - consent_record, data_subject_request

6. **CMS** (7 tables)
   - pages, components, categories
   - menus, menu_items, page_templates, cms_metrics

7. **Certificates** (2 tables)
   - certificates, certificate_templates

8. **Events** (2 tables)
   - events, event_registrations

9. **Analytics** (6 tables)
   - analytics_events, analytics_sessions, analytics_heatmap
   - ab_test, ab_test_variant, component_performance

10. **Media & Settings** (4 tables)
    - media, settings, email_suppression

11. **Platform Integration** (4 tables)
    - webhooks, automation_rules, platform_events, automation_approvals

### Key Entity Relationships

```
User (1) ──── (N) Ticket
User (1) ──── (N) ChatSession
User (1) ──── (N) Certificate
User (N) ──── (N) Role (many-to-many via user_roles)

Ticket (1) ──── (N) TicketMessage
Ticket (N) ──── (1) TicketCategory
Ticket (N) ──── (1) User (assignedTo)

ChatSession (1) ──── (N) ChatMessage
ChatSession (1) ──── (N) ChatDocument

EmailCampaign (1) ──── (N) EmailLog
EmailCampaign (1) ──── (N) EmailCampaignVariant (A/B testing)
Subscriber (N) ──── (N) Segment
Subscriber (N) ──── (N) Group

Page (N) ──── (1) PageTemplate
Page (N) ──── (1) Category

Event (1) ──── (N) EventRegistration
Event (1) ──── (N) Certificate
```

---

## 📡 API Documentation

### Base URL

```
Production: https://api.affexai.com
Staging: https://staging-api.affexai.com
Development: http://localhost:3001
```

### Authentication

All protected endpoints require JWT authentication:

```http
Authorization: Bearer <jwt_access_token>
```

### API Modules

**1. Authentication** (`/auth`)
```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/me
```

**2. Users** (`/users`)
```
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id
POST   /users/:id/roles
```

**3. Tickets** (`/tickets`)
```
GET    /tickets
POST   /tickets
GET    /tickets/:id
PATCH  /tickets/:id
POST   /tickets/:id/messages
POST   /tickets/:id/assign
POST   /tickets/:id/close
GET    /tickets/analytics
```

**4. Knowledge Base** (`/knowledge-base`)
```
GET    /knowledge-base/articles
POST   /knowledge-base/articles
GET    /knowledge-base/articles/:slug
PUT    /knowledge-base/articles/:id
DELETE /knowledge-base/articles/:id
GET    /knowledge-base/categories
```

**5. Chat** (`/chat`)
```
POST   /chat/sessions
GET    /chat/sessions/:id
POST   /chat/documents/upload
POST   /chat/urls/process
POST   /chat/handoff
```

**6. FAQ Learning** (`/faq-learning`)
```
GET    /faq-learning/dashboard
GET    /faq-learning/status
POST   /faq-learning/pipeline/start
POST   /faq-learning/pipeline/stop
GET    /faq-learning/config
PUT    /faq-learning/config
GET    /review/queue
POST   /review/:id/review
POST   /review/bulk-review
```

**7. Email Marketing** (`/email-marketing`)
```
# Subscribers
GET    /subscribers
POST   /subscribers
POST   /subscribers/import

# Campaigns
GET    /campaigns
POST   /campaigns
POST   /campaigns/:id/send
GET    /campaigns/:id/analytics

# Segments
GET    /segments
POST   /segments

# Templates
GET    /templates
POST   /templates
```

**8. CMS** (`/cms`)
```
GET    /cms/pages
POST   /cms/pages
GET    /cms/pages/:id
PUT    /cms/pages/:id
POST   /cms/pages/:id/publish
GET    /cms/menus
```

**9. Certificates** (`/certificates`)
```
GET    /certificates
POST   /certificates
POST   /certificates/bulk
POST   /certificates/:id/send
```

**10. Events** (`/events`)
```
GET    /events
POST   /events
POST   /events/:id/register
```

**11. Analytics** (`/analytics`)
```
POST   /analytics/track
GET    /analytics/dashboard
GET    /analytics/heatmap
```

**12. Settings** (`/settings`)
```
GET    /settings
PUT    /settings/:key
GET    /settings/ai
PUT    /settings/ai
```

---

## 🎨 Design System

### Design Tokens

**Location**: `apps/backend/src/lib/design-tokens/index.ts`

**Color Palette**:
```typescript
colors: {
  primary: {
    50: '#fff8f0',
    500: '#ff7f1e', // Main
    900: '#994b12'
  },
  neutral: {
    50: '#fafafa',
    500: '#737373',
    900: '#171717'
  },
  semantic: {
    success: { 500: '#22c55e' },
    warning: { 500: '#f59e0b' },
    error: { 500: '#ef4444' }
  }
}
```

**Typography**:
```typescript
typography: {
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    mono: ['SFMono-Regular', 'monospace']
  },
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    '2xl': '1.5rem', // 24px
    '5xl': '3rem'    // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
}
```

**Spacing** (8px grid):
```typescript
spacing: {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '3xl': '4rem'   // 64px
}
```

**Border Radius**:
```typescript
borderRadius: {
  sm: '0.125rem',    // 2px
  DEFAULT: '0.25rem', // 4px
  lg: '0.5rem',      // 8px
  full: '9999px'
}
```

**Shadows**:
```typescript
shadows: {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
}
```

**Breakpoints**:
```typescript
breakpoints: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
```

### Tailwind Integration

Design tokens are integrated with Tailwind CSS configuration.

---

## 🛠️ Development Guide

### Prerequisites

- Node.js ≥18.0.0
- npm ≥9.0.0
- PostgreSQL 14+
- Redis 6+
- Docker & Docker Compose (optional)

### Initial Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd affexai-monorepo

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local

# Edit .env files with your credentials

# 4. Start Docker services (PostgreSQL, Redis)
npm run docker:up

# 5. Run database migrations
cd apps/backend
npm run typeorm:migration:run

# 6. Seed initial data (optional)
npm run seed:users
npm run seed:tickets

# 7. Start development servers
cd ../..
npm run dev
```

### Environment Variables

**Backend** (`.env`):
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=affexai

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=affexai-uploads
AWS_REGION=us-east-1

# Email (Resend)
RESEND_API_KEY=re_...

# App
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:9003
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:9003

# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=...
```

### Development Scripts

**Root Level**:
```bash
npm run dev          # Start backend + frontend
npm run cleanup      # Clean zombie processes (IMPORTANT!)
npm run build        # Build all packages
npm run docker:up    # Start Docker services
npm run docker:down  # Stop Docker services
```

**Backend** (`cd apps/backend`):
```bash
# Development (Recommended - Auto-cleanup)
npm run dev          # Start with auto process cleanup (port 9006)
npm run cleanup      # Clean zombie NestJS processes manually

# Alternative (Manual)
npm run start:dev    # Start with hot reload (port 9006) - may leave zombies
npm run build        # Build for production
npm run start:prod   # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests

# Database
npm run typeorm:migration:generate -- src/database/migrations/MigrationName
npm run typeorm:migration:run
npm run typeorm:migration:revert

# Seeding
npm run seed:users
npm run seed:tickets
npm run seed:certificates
```

**Frontend** (`cd apps/frontend`):
```bash
npm run dev          # Start Next.js dev server (port 9003)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

### Git Workflow

```bash
# Feature branch
git checkout -b feature/chat-context-sources
git add .
git commit -m "feat: implement chat context source management"
git push origin feature/chat-context-sources

# Commit message format:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# refactor: Code refactoring
# test: Test updates
# chore: Maintenance
```

### Debugging

**Backend**:
- Use NestJS built-in logger
- Chrome DevTools for debugging
- `console.log()` statements
- Postman/Insomnia for API testing

**Frontend**:
- React DevTools
- TanStack Query DevTools (enabled in development)
- Browser console
- Next.js Fast Refresh

### Code Quality

**ESLint** configuration:
- Backend: NestJS recommended rules
- Frontend: Next.js recommended rules

**Prettier** formatting (automatic on save)

**TypeScript** strict mode enabled

---

## 🚀 Deployment

### Production Architecture

```
[Cloudflare CDN] → [Load Balancer]
                      ↓
            ┌─────────┴──────────┐
            │                    │
      [Next.js Servers]   [NestJS API Servers]
      (3 instances)       (3 instances)
            │                    │
            └────────┬───────────┘
                     ↓
        ┌────────────┴──────────────┐
        │                           │
    [PostgreSQL Primary]    [Redis Cluster]
        │                           │
    [Read Replicas (2)]     [Cache Nodes (3)]
        │                           │
        └───────────┬───────────────┘
                    ↓
          [AWS S3 Bucket (Media Storage)]
```

### Backend Deployment

**Docker**:
```bash
# Build image
docker build -t affexai-backend:latest apps/backend

# Run container
docker run -p 3001:3001 \
  -e DATABASE_HOST=... \
  -e REDIS_HOST=... \
  affexai-backend:latest
```

**Kubernetes** (Helm chart recommended):
- 3 replicas for high availability
- Horizontal Pod Autoscaler (HPA)
- Health checks (`/health`)
- Liveness/readiness probes

### Frontend Deployment

**Vercel** (Recommended):
```bash
vercel --prod
```

**Docker**:
```bash
# Build
docker build -t affexai-frontend:latest apps/frontend

# Run
docker run -p 9003:3000 affexai-frontend:latest
```

### Database Migrations

```bash
# Production migration
npm run typeorm:migration:run

# Rollback if needed
npm run typeorm:migration:revert
```

### Monitoring

- **Backend**: `/health` endpoint
- **Logs**: Winston logger with rotation
- **Metrics**: Prometheus (optional)
- **APM**: New Relic / Datadog (optional)

---

## 🗺️ Roadmap & Planned Features

### ✅ Completed (v1.0.0)

- ✅ Complete authentication & authorization system
- ✅ Support ticketing with SLA tracking
- ✅ AI-powered chatbot (multi-provider)
- ✅ FAQ Learning system with review queue
- ✅ Knowledge Base with categories
- ✅ Real-time chat with WebSocket
- ✅ Email marketing suite (campaigns, A/B testing, automation)
- ✅ Subscriber management with segmentation
- ✅ Certificate generation & bulk operations
- ✅ Block-based CMS (17 block categories)
- ✅ Event management with registrations
- ✅ Analytics & tracking system
- ✅ Design token system
- ✅ Global AI settings (multi-provider)
- ✅ Dark/light theme
- ✅ Responsive design

### 🚧 In Progress (v1.1.0)

- 🚧 **Chat Context Feature** (Knowledge Sources)
  - Document upload (PDF, Word, Excel, PowerPoint)
  - URL scraping for knowledge extraction
  - Vector embeddings for semantic search
  - Integration with AI chatbot
  - Admin management UI
  - Customer read-only view

- 🚧 Advanced analytics dashboard
- 🚧 Mobile responsive improvements
- 🚧 API rate limiting & quotas

### 📋 Planned (v1.2.0+)

**High Priority**:
- 📋 Multilingual support (i18n) - Turkish, English, German
- 📋 Advanced reporting & exports (PDF, Excel)
- 📋 Video call integration (Zoom, Google Meet)
- 📋 Advanced AI routing (sentiment analysis, intent detection)
- 📋 Custom workflow automation builder
- 📋 Mobile app (React Native)

**Medium Priority**:
- 📋 Third-party integrations:
  - Slack integration for notifications
  - Microsoft Teams integration
  - Zapier webhooks
  - Salesforce CRM sync
- 📋 Voice assistant integration
- 📋 SSO/SAML integration
- 📋 Marketplace for plugins & extensions
- 📋 Advanced email template builder (drag & drop)
- 📋 Social media management (full implementation, not mock)
- 📋 Custom dashboards per user

**Low Priority**:
- 📋 Mobile PWA
- 📋 Offline mode
- 📋 Multi-tenant support
- 📋 White-label customization

### 🔮 Future Ideas

- AI-powered content generation for CMS
- Advanced chatbot training interface
- Customer community forum
- Live webinar platform
- Video knowledge base
- Gamification for support team
- Predictive support (proactive ticket creation)

---

## 📞 Support & Resources

### Documentation

- **This File**: Complete project overview
- **API Docs**: Available at `/api/docs` (Swagger)
- **Component Storybook**: (Planned)

### Development Team

- **Tech Lead**: [Insert name]
- **Backend Lead**: [Insert name]
- **Frontend Lead**: [Insert name]
- **DevOps**: [Insert name]

### Key Resources

- **Repository**: [GitHub URL]
- **Staging**: [Staging URL]
- **Production**: [Production URL]
- **Jira**: [Project management]
- **Slack**: [Team channel]

### Getting Help

1. **Documentation**: Check this file first
2. **Code Comments**: Inline documentation
3. **Team Chat**: Slack channel
4. **Issues**: GitHub Issues for bug reports

---

## 📝 Notes & Best Practices

### Code Quality Standards

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with Prettier
- **Testing**: Jest for backend, React Testing Library for frontend
- **Commit Messages**: Conventional commits
- **Code Reviews**: Required for all PRs

### Security Best Practices

- Never commit API keys or secrets
- Use environment variables
- Validate all inputs (class-validator)
- Use parameterized queries (TypeORM)
- Implement rate limiting
- Enable CORS properly
- Use HTTPS in production
- Implement CSP headers

### Performance Optimization

- Database: Index frequently queried columns
- Caching: Use Redis for sessions and frequent queries
- CDN: Serve static assets via CDN
- Code Splitting: Next.js dynamic imports
- Image Optimization: Next.js Image component
- Pagination: Limit large datasets
- Query Optimization: Use select, joins wisely

### Troubleshooting

**🚨 Zombie Processes (MOST COMMON)**:
```bash
# Quick fix - Run cleanup script
npm run cleanup                  # From root
cd apps/backend && npm run cleanup  # Or from backend

# Manual fix
ps aux | grep "nest start" | grep -v grep | awk '{print $2}' | xargs kill -9
lsof -ti:9006 | xargs kill -9

# Prevention - Use auto-cleanup script
cd apps/backend && npm run dev  # Instead of npm run start:dev
```

**Backend won't start**:
- **First step**: Run `npm run cleanup` to kill zombie processes
- Check PostgreSQL is running
- Check Redis is running
- Verify `.env` variables
- Run migrations
- Check port 9006 is not in use: `lsof -i :9006`

**Port already in use**:
```bash
# Find and kill process on port 9006
lsof -ti:9006 | xargs kill -9
```

**Frontend won't start**:
- Check Node.js version (≥18)
- Clear `.next` folder
- Reinstall dependencies

**WebSocket not connecting**:
- Check backend is running (port 9006)
- Verify CORS settings
- Check `NEXT_PUBLIC_SOCKET_URL`

---

**🎉 Thank you for using Affexai!**

**Version**: 1.0.0
**Last Updated**: 2025-10-25
**Maintainer**: Affexai Development Team

---

*This documentation is a living document and will be updated as the project evolves.*
