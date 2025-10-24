# Frontend Portal Structure Analysis Report

## Project Overview
- **Framework**: Next.js 15.3.3 (App Router)
- **UI Library**: Radix UI components with Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks (useState, useContext)
- **Real-time**: Socket.IO Client v4.8.1
- **Form Handling**: React Hook Form with Zod validation
- **API Client**: Axios with custom BaseApiService
- **Styling**: Tailwind CSS with custom design tokens

---

## 1. EXISTING SUPPORT PAGES

### Support Portal Routes
```
/portal/support/
├── page.tsx              # Support tickets list (customer view)
├── new/
│   ├── page.tsx          # Create new support ticket (multi-step form)
│   └── actions.ts        # Server-side actions for ticket creation
└── [ticketId]/
    └── page.tsx          # Ticket detail view with messages
```

### Key Files
- **List Page**: `/apps/frontend/src/app/portal/support/page.tsx` (15KB)
  - Shows user's support tickets in table format
  - Filters by status, priority, search query
  - Pagination (10 items/page)
  - Real-time connection indicator (WebSocket status)
  - Features: Sort, filter, pagination

- **Create Page**: `/apps/frontend/src/app/portal/support/new/page.tsx` (10KB)
  - Multi-step form for creating new tickets
  - Step 1: Collect issue details (title, category, description, priority)
  - Step 2: AI analysis preview and confirmation
  - Form uses Server Actions (React 19 `useFormState`)
  - Dynamic category loading from API

- **Detail Page**: `/apps/frontend/src/app/portal/support/[ticketId]/page.tsx` (6KB)
  - Displays ticket messages thread (conversation view)
  - Shows ticket metadata (status, priority, assignee, dates)
  - Reply form (textarea + file attachment button)
  - Ticket detail sidebar with metadata

### Support Components
- **Location**: `/src/components/support/`
- **Files**:
  - `AICategorySuggestions.tsx` (8KB) - AI-powered category suggestions UI
    - Shows confidence-ranked category predictions
    - Progress bars for confidence scores
    - Auto-categorize button
    - Keyword matching display

- **Location**: `/src/components/portal/dashboards/`
- **Files**:
  - `support-dashboard.tsx` - Support team dashboard (read-only metrics)
    - Open tickets count
    - Assigned to me count
    - High priority tickets count
    - Table of attention-needed tickets

---

## 2. CHAT/CHATBOX COMPONENTS

### WebSocket Real-Time Communication
**File**: `/src/hooks/useTicketNotifications.ts` (113 lines)

```typescript
Features:
- Socket.IO client connection to ws://localhost:5001/tickets
- Authentication via token in localStorage
- Event handlers:
  * ticket:created - New ticket created
  * ticket:assigned - Ticket assigned to user
  * ticket:message - New message received
  * ticket:statusChanged - Status updated
  * ticket:priorityChanged - Priority changed
  * ticket:slaAlert - SLA approaching warning
  * ticket:slaBreach - SLA violation alert
  * ticket:escalated - Ticket escalated
- Uses sonner toast notifications
- Fallback to polling if WebSocket unavailable
```

### Messaging Infrastructure
- **Messages**: Stored in Ticket entity as `messages: TicketMessage[]`
- **Message Structure**:
  ```typescript
  interface TicketMessage {
    id: string;
    ticketId: string;
    userId: string;
    content: string;
    isInternal: boolean;
    user?: { id, firstName, lastName, email };
    attachments?: TicketAttachment[];
    createdAt: Date;
    updatedAt: Date;
  }
  ```

### Current Chat Implementation Gaps
- No dedicated chat bubble component
- No real-time message streaming (polling approach)
- No typing indicators
- No read receipts
- No message timestamps (uses static mock data in detail page)
- File attachments defined but UI not implemented
- No inline message editing or deletion

---

## 3. UI COMPONENT LIBRARY

### Available Components (47 total)
**Location**: `/src/components/ui/`

#### Form/Input Components
✅ `input.tsx` - Text input with Radix UI
✅ `textarea.tsx` - Multi-line textarea
✅ `floating-input.tsx` - Input with floating labels
✅ `floating-textarea.tsx` - Textarea with floating labels
✅ `select.tsx` - Dropdown select with Radix UI
✅ `floating-select.tsx` - Select with floating labels
✅ `form.tsx` - React Hook Form wrapper (FormField, FormItem, etc.)
✅ `label.tsx` - Form label component
✅ `checkbox.tsx` - Checkbox input
✅ `radio-group.tsx` - Radio button group
✅ `switch.tsx` - Toggle switch
✅ `button.tsx` - Primary button (multiple variants)
✅ `toggle.tsx` - Toggle button

#### Container/Layout Components
✅ `card.tsx` - Card container (CardHeader, CardContent, CardFooter)
✅ `dialog.tsx` - Modal dialog
✅ `alert-dialog.tsx` - Alert modal with actions
✅ `sheet.tsx` - Side drawer/panel
✅ `popover.tsx` - Popover component
✅ `alert.tsx` - Alert message container
✅ `badge.tsx` - Status badge/tag
✅ `avatar.tsx` - User avatar with fallback
✅ `separator.tsx` - Visual divider
✅ `scroll-area.tsx` - Scrollable container

#### Data Display Components
✅ `table.tsx` - Data table (TableHeader, TableBody, TableCell, etc.)
✅ `accordion.tsx` - Collapsible accordion
✅ `tabs.tsx` - Tabbed interface
✅ `pagination.tsx` - Page navigation
✅ `progress.tsx` - Progress bar
✅ `slider.tsx` - Range slider
✅ `breadcrumb.tsx` - Breadcrumb navigation

#### Advanced Components
✅ `menubar.tsx` - Top menu bar (Radix UI)
✅ `dropdown-menu.tsx` - Dropdown menu
✅ `sidebar.tsx` - Collapsible sidebar
✅ `tooltip.tsx` - Hover tooltips
✅ `date-range-picker.tsx` - Date range selection
✅ `calendar.tsx` - Calendar picker
✅ `confirm-dialog.tsx` - Confirmation modal
✅ `delete-confirm-dialog.tsx` - Delete confirmation
✅ `chart.tsx` - Recharts wrapper
✅ `toaster.tsx` - Toast notifications (Sonner)

### File Upload/Media Components
✅ `media-library.tsx` - Media browser with upload
  - File type filtering (images, videos, documents, audio)
  - Search and filter functionality
  - Drag-and-drop upload area
  - Uses mediaService for API integration

✅ `media-replacer.tsx` - Replace media in content

### Key Missing Components for Chat
❌ Message bubble/chat message component
❌ Chat input with send button
❌ User presence/typing indicator
❌ Read receipt indicator
❌ Attachment preview component
❌ Emoji picker (not in package.json)
❌ Code syntax highlighter (not in package.json)

---

## 4. STATE MANAGEMENT

### Architecture
- **Pattern**: React Hooks + Context API
- **No external state management**: No Redux, Zustand, Recoil, or Jotai
- **API State**: Managed through service classes with React Query

### State Management Implementation

#### React Query (TanStack Query)
- **Version**: @tanstack/react-query v5.90.2
- **Purpose**: Server state management, caching, synchronization
- **Files**: `/src/providers/` likely contains QueryClientProvider

#### Context Usage
**File**: `/src/contexts/LoadingContext.tsx` (6KB)
- Global loading state context
- Used for app-wide loading indicators
- Methods: `createContext`, `useContext`, `useState`, `useCallback`, `useRef`

### Service Classes (API Integration)
**Base**: `/src/lib/api/base-service.ts`
- Abstract class for all API services
- Standard CRUD operations: getAll, getList, getById, create, update, delete
- Supports wrapped/unwrapped responses
- Query parameter building

**Specific Services**:
- `ticketsService.ts` - Ticket CRUD and operations
- `authService.ts` - Authentication
- `mediaService.ts` - File upload and media
- `aiService.ts` - AI/GenKit operations

### HTTP Client
**File**: `/src/lib/api/http-client.ts`
- Axios-based wrapper
- Methods: get, post, put, patch, delete
- Wrapped variants: getWrapped, postWrapped, etc.
- Global error handling
- Auth header injection

---

## 5. WEBSOCKET/REAL-TIME IMPLEMENTATION

### Current Implementation
- **Library**: Socket.IO Client v4.8.1
- **Hook**: `useTicketNotifications.ts`
- **Server**: `http://localhost:5001/tickets`
- **Auth**: Token-based via query parameters
- **Transports**: WebSocket + polling fallback

### Events Handled
```
Client-side event listeners:
✅ connect - Socket connected
✅ disconnect - Socket disconnected
✅ connect_error - Connection failed
✅ ticket:created - New ticket created
✅ ticket:assigned - Ticket assigned
✅ ticket:message - New message received
✅ ticket:statusChanged - Status changed
✅ ticket:priorityChanged - Priority changed
✅ ticket:slaAlert - SLA warning
✅ ticket:slaBreach - SLA violation
✅ ticket:escalated - Ticket escalated
```

### Missing Real-Time Features
❌ Message event emitters (client → server)
❌ Typing indicators
❌ Online/offline status
❌ Presence tracking
❌ Message read acknowledgments
❌ Real-time typing detection
❌ Active user list

---

## 6. DEPENDENCIES & LIBRARIES

### Core Framework
- next@15.3.3 - React framework
- react@18.3.1 - UI library
- typescript@5 - Type safety

### UI & Styling
- @radix-ui/* - Accessible component primitives
- tailwindcss@3.4.1 - Utility CSS framework
- tailwind-merge@3.0.1 - CSS class merging
- tailwindcss-animate@1.0.7 - Animations
- framer-motion@12.23.22 - Motion library
- lucide-react@0.475.0 - Icon library (470+ icons)
- embla-carousel-react@8.6.0 - Carousel component

### Forms & Validation
- react-hook-form@7.54.2 - Form state management
- @hookform/resolvers@4.1.3 - Form validation resolvers
- zod@3.24.2 - Schema validation library

### Real-time Communication
- socket.io-client@4.8.1 - WebSocket communication
- sonner@2.0.7 - Toast notifications

### Data Management & APIs
- axios@1.12.2 - HTTP client
- @tanstack/react-query@5.90.2 - Server state management
- @tanstack/react-query-devtools@5.90.2 - Query debugging

### Content & Editing
- @tiptap/react@3.7.2 - Rich text editor
- @tiptap/starter-kit@3.7.2 - Editor extensions
- @tiptap/extension-mention@3.7.2 - Mentions support
- @react-email/components@0.0.21 - Email components
- react-email@2.1.5 - Email builder

### Utilities & Data
- date-fns@3.6.0 - Date utilities
- recharts@2.15.4 - Chart library
- react-day-picker@8.10.1 - Date picker
- dotenv@16.5.0 - Environment variables
- class-variance-authority@0.7.1 - Component variants
- clsx@2.1.1 - Class name utilities

### AI & Machine Learning
- genkit@1.14.1 - Google Genkit AI SDK
- @genkit-ai/next@1.14.1 - Next.js integration
- @genkit-ai/googleai@1.14.1 - Google AI integration

### File Upload
- **No dedicated**: react-dropzone not installed
- **Manual implementation**: Using native HTML5 File API + FormData

### Missing Popular Libraries
❌ react-dropzone - Drag-drop file upload
❌ react-beautiful-dnd - Drag-drop UI
❌ @emotion/* - CSS-in-JS
❌ storybook - Component documentation
❌ cypress/playwright - E2E testing (Playwright in monorepo)

---

## 7. DIRECTORY STRUCTURE FOR SUPPORT/CHAT

```
apps/frontend/src/
├── app/
│   └── portal/
│       ├── support/
│       │   ├── page.tsx                 ✅ Ticket list
│       │   ├── new/
│       │   │   ├── page.tsx             ✅ Create ticket
│       │   │   └── actions.ts           ✅ Server actions
│       │   └── [ticketId]/
│       │       └── page.tsx             ✅ Ticket detail
│       └── dashboard/
│           └── page.tsx                 ✅ Portal home
├── components/
│   ├── support/
│   │   └── AICategorySuggestions.tsx   ✅ AI suggestions
│   ├── portal/
│   │   └── dashboards/
│   │       └── support-dashboard.tsx   ✅ Support metrics
│   ├── ui/
│   │   ├── card.tsx                    ✅ Card container
│   │   ├── button.tsx                  ✅ Button
│   │   ├── input.tsx                   ✅ Text input
│   │   ├── textarea.tsx                ✅ Textarea
│   │   ├── select.tsx                  ✅ Dropdown
│   │   ├── dialog.tsx                  ✅ Modal
│   │   ├── badge.tsx                   ✅ Status badge
│   │   ├── avatar.tsx                  ✅ User avatar
│   │   ├── table.tsx                   ✅ Data table
│   │   ├── pagination.tsx              ✅ Pagination
│   │   └── form.tsx                    ✅ Form wrapper
│   └── cms/editor/
│       └── media-library.tsx           ✅ File upload
├── hooks/
│   └── useTicketNotifications.ts       ✅ WebSocket hook
├── lib/
│   ├── api/
│   │   ├── base-service.ts             ✅ API base class
│   │   ├── ticketsService.ts           ✅ Ticket API
│   │   ├── mediaService.ts             ✅ File upload API
│   │   └── http-client.ts              ✅ Axios wrapper
│   ├── media/
│   │   └── types.ts                    ✅ Media types
│   └── support-data.ts                 ✅ Mock data
└── contexts/
    └── LoadingContext.tsx              ✅ Global loading state
```

---

## 8. EXISTING COMPONENTS THAT CAN BE REUSED

### For AI Support Chatbox (Tasks 7-10)

#### Reusable Components
1. **Input & Form Components**
   - `input.tsx` - Chat message input
   - `textarea.tsx` - For longer messages
   - `button.tsx` - Send button
   - `form.tsx` - Message form wrapper

2. **Container Components**
   - `card.tsx` - Chat message bubble container
   - `avatar.tsx` - User avatars in messages
   - `separator.tsx` - Message dividers
   - `scroll-area.tsx` - Chat message scrolling area

3. **Feedback Components**
   - `badge.tsx` - Message timestamps/status
   - `toaster.tsx` - Notifications (already using sonner)
   - `alert.tsx` - System messages
   - `progress.tsx` - Upload progress indicators

4. **Dialog/Modal**
   - `dialog.tsx` - File upload modal
   - `sheet.tsx` - Side panel for chat history
   - `popover.tsx` - Context menu (right-click)

5. **Service Classes**
   - `BaseApiService` - Base for ChatService
   - `mediaService` - File handling patterns
   - `ticketsService` - Message patterns

6. **Hooks & Utilities**
   - `useTicketNotifications` - Pattern for WebSocket management
   - `use-toast` - Notification patterns
   - `httpClient` - API communication patterns

#### Reusable Patterns
- Server Actions pattern (from ticket creation)
- Form validation with Zod + React Hook Form
- Multi-step form (from ticket creation)
- Real-time status indicators
- Loading states with spinners
- Error handling with toasts
- Responsive grid layouts

---

## 9. MISSING COMPONENTS NEEDING IMPLEMENTATION

### For Chat/Chatbox Feature

#### Core Chat Components
- [ ] `ChatBubble` - Message bubble container
- [ ] `ChatInput` - Message input with submit
- [ ] `ChatWindow` - Message thread container
- [ ] `ChatHeader` - Chat title bar
- [ ] `MessageList` - Scrollable message list
- [ ] `TypingIndicator` - "User is typing..." animation
- [ ] `FilePreview` - Attachment preview in message
- [ ] `AttachmentUpload` - Drag-drop file upload for chat

#### Supporting Components
- [ ] `UserPresence` - Online/offline indicator
- [ ] `ReadReceipt` - Message read status
- [ ] `MessageActions` - Edit/delete menu
- [ ] `EmojiPicker` - Requires emoji-picker-react (not installed)
- [ ] `CodeHighlight` - Syntax highlighting (requires highlight.js)
- [ ] `MarkdownPreview` - Markdown rendering (requires react-markdown)

#### Services to Build
- [ ] `ChatService` - Chat API operations
- [ ] `messageService` - Message CRUD
- [ ] `useChatWebSocket` - Enhanced socket hook with emitters
- [ ] `useChat` - Chat state management hook
- [ ] `useMessageInput` - Message input state

---

## 10. DEPENDENCIES THAT NEED TO BE ADDED

### For Full Chat Implementation
```json
{
  "react-dropzone": "^14.3.5",           // File uploads
  "emoji-picker-react": "^4.10.1",       // Emoji support
  "react-markdown": "^9.0.1",            // Markdown rendering
  "highlight.js": "^11.9.0",             // Code syntax highlighting
  "react-syntax-highlighter": "^15.5.0", // Syntax highlighting for chat
  "date-fns": "^3.6.0"                   // Already installed
}
```

### Already Available (Good!)
- ✅ Socket.IO client - Real-time comm
- ✅ React Hook Form - Form handling
- ✅ Zod - Validation
- ✅ Axios - HTTP client
- ✅ React Query - Data caching
- ✅ Sonner - Toast notifications
- ✅ Lucide React - Icons (470+ available)
- ✅ Tailwind CSS - Styling
- ✅ Framer Motion - Animations

---

## 11. API STRUCTURE FOR CHAT

### Existing Ticket Service Methods
```typescript
// From ticketsService.ts
getTickets(filters?: FilterTicketsDto): Promise<Ticket[]>
getTicketById(id: string): Promise<Ticket>
createTicket(data: CreateTicketDto): Promise<Ticket>
updateTicket(id: string, data: UpdateTicketDto): Promise<Ticket>
updateTicketStatus(id: string, data: UpdateTicketStatusDto): Promise<Ticket>
assignTicket(id: string, data: AssignTicketDto): Promise<Ticket>
addMessage(ticketId: string, data: AddTicketMessageDto): Promise<Ticket>
getMessages(ticketId: string): Promise<TicketMessage[]>
getMyTickets(): Promise<Ticket[]>
getStats(): Promise<TicketStats>
```

### Chat Message API Endpoints Needed
```
POST   /api/tickets/{ticketId}/messages        - Add message
GET    /api/tickets/{ticketId}/messages        - Get messages
PUT    /api/tickets/{ticketId}/messages/{msgId} - Edit message
DELETE /api/tickets/{ticketId}/messages/{msgId} - Delete message
POST   /api/tickets/{ticketId}/messages/{msgId}/attachments - Upload attachment
DELETE /api/tickets/{ticketId}/messages/{msgId}/attachments/{attId} - Remove attachment
POST   /api/tickets/{ticketId}/read-receipt     - Mark as read
```

---

## 12. CURRENT LIMITATIONS & GAPS

### UI/UX Gaps
- ❌ No dedicated message bubble styling
- ❌ No sender/receiver differentiation in messages
- ❌ No message timestamps in thread view
- ❌ No typing indicators
- ❌ No read receipts
- ❌ No presence indicators (online/offline)
- ❌ No message reactions/emoji
- ❌ No message search within conversation
- ❌ No pinned messages
- ❌ No message threading/replies

### Real-time Gaps
- ❌ No message emitters (client → server)
- ❌ No real-time message delivery confirmation
- ❌ No optimistic updates UI
- ❌ No offline message queuing
- ❌ No connection recovery indicators

### Feature Gaps
- ❌ No file preview in messages
- ❌ No drag-drop in chat input
- ❌ No mentioned user detection
- ❌ No rich text formatting (bold, italic, etc.)
- ❌ No code block support in messages
- ❌ No link previews
- ❌ No translation/language detection
- ❌ No message encryption
- ❌ No user typing status display

### Performance Considerations
- ⚠️ No message pagination/virtualization
- ⚠️ No message archiving strategy
- ⚠️ Large message history could impact performance
- ⚠️ No lazy loading for attachments

---

## Summary for Tasks 7-10

### Frontend Readiness Assessment
| Category | Status | Notes |
|----------|--------|-------|
| **Foundation** | ✅ Ready | Next.js, TypeScript, Tailwind configured |
| **UI Components** | ✅ Ready | 47 components available, missing only chat-specific |
| **Form Handling** | ✅ Ready | React Hook Form + Zod validation setup |
| **API Integration** | ✅ Ready | BaseApiService pattern, ticket API exists |
| **Real-time** | ⚠️ Partial | Socket.IO connected, missing message emitters |
| **State Management** | ✅ Ready | React Query + Context sufficient |
| **File Upload** | ✅ Ready | Media service exists, patterns available |
| **Authentication** | ✅ Ready | authService integrated throughout |
| **Error Handling** | ✅ Ready | Toast notifications, error boundaries |
| **Chat Components** | ❌ Missing | Need message bubbles, chat input, typing indicators |
| **Chat Styling** | ❌ Missing | Need chat-specific Tailwind classes/components |

### Recommended Implementation Order
1. **Create ChatService** extending BaseApiService
2. **Create ChatMessage component** (core chat bubble)
3. **Create ChatInput component** with file attachment
4. **Create ChatWindow component** (message list + input)
5. **Create useChatWebSocket hook** with message emitters
6. **Create useChat custom hook** for chat state
7. **Integrate into support ticket detail page**
8. **Add typing indicators** with socket events
9. **Add file upload preview** in messages
10. **Add read receipts** (optional enhancement)

### Dependencies to Install
```bash
npm install --save \
  react-dropzone \
  emoji-picker-react \
  react-markdown \
  highlight.js
```

### Backend Synchronization Needs
- WebSocket message events (socket.emit support)
- Message read receipts endpoint
- Typing status websocket events
- File attachment handling in messages
- Message edit/delete endpoints
