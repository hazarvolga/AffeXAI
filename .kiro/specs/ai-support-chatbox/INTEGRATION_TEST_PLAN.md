# AI Support Chatbox - Integration Test Plan

**Version:** 1.0
**Last Updated:** 2025-10-25
**Status:** Ready for Testing

---

## 📋 Test Scope

This document outlines the comprehensive integration testing plan for the AI Support Chatbox system, covering end-to-end workflows, multi-provider AI integration, file processing, and support team workflows.

---

## 🎯 Test Objectives

1. ✅ Validate complete user journeys from initiation to resolution
2. ✅ Verify multi-provider AI integration (OpenAI, Anthropic, Google)
3. ✅ Test file processing pipeline across all supported formats
4. ✅ Validate support team handoff and collaboration workflows
5. ✅ Ensure system stability under concurrent user load
6. ✅ Verify WebSocket connection resilience

---

## 🧪 Test Environment Requirements

### Backend
- NestJS server running on port 3001
- PostgreSQL database with test data
- Redis for BullMQ job processing
- WebSocket server (Socket.IO)

### Frontend
- Next.js application running on port 9003
- Test user accounts (customer, support, admin roles)

### AI Providers
- OpenAI API key (GPT-4)
- Anthropic API key (Claude 3.5 Sonnet)
- Google AI API key (Gemini Pro)

### Test Data
- Knowledge Base articles (minimum 10 articles)
- FAQ Learning entries (minimum 20 entries)
- Sample documents (PDF, DOCX, XLSX, TXT, MD)
- Test URLs for content extraction

---

## 📝 Test Scenarios

### **SCENARIO 1: Complete User Journey - Chat Initiation to Resolution**

**Requirements:** 1.1, 2.1, 3.1, 9.1

**Steps:**
1. Customer logs in to portal
2. Navigates to /portal/support/new
3. Opens AI chatbox (chat tab or side-by-side view)
4. Sends initial message: "How do I reset my password?"
5. AI responds with context from Knowledge Base
6. Customer asks follow-up: "What if I don't receive the reset email?"
7. AI provides additional guidance from FAQ Learning
8. Customer uploads screenshot of error message
9. AI analyzes image and provides specific solution
10. Customer shares URL of error documentation
11. AI incorporates URL content into response
12. Customer confirms issue is resolved
13. Session closes successfully

**Expected Results:**
- ✅ Session created with unique ID
- ✅ WebSocket connection established
- ✅ AI responses within 3 seconds
- ✅ Context sources displayed (KB, FAQ)
- ✅ File processing completes <30 seconds
- ✅ URL scraping completes <10 seconds
- ✅ All messages persisted to database
- ✅ Session status updated to 'closed'

**Validation:**
```sql
-- Verify session and messages in database
SELECT * FROM chat_sessions WHERE id = '<session-id>';
SELECT * FROM chat_messages WHERE session_id = '<session-id>' ORDER BY created_at;
SELECT * FROM chat_context_sources WHERE session_id = '<session-id>';
SELECT * FROM chat_documents WHERE session_id = '<session-id>';
SELECT * FROM chat_url_cache WHERE session_id = '<session-id>';
```

---

### **SCENARIO 2: Multi-Provider AI Integration**

**Requirements:** 7.1, 7.2, 7.3, 7.4, 7.5

**Test Cases:**

#### **2.1: OpenAI (GPT-4) Integration**
```bash
# Global AI Settings
AI Provider: OpenAI
Model: gpt-4-turbo
```

**Steps:**
1. Configure global AI settings to use OpenAI
2. Start new chat session
3. Send complex query: "Explain the difference between JWT and session-based authentication"
4. Verify AI response quality and context usage

**Expected Results:**
- ✅ AI response from OpenAI GPT-4
- ✅ Response includes context from Knowledge Base
- ✅ Metadata shows aiModel: "gpt-4-turbo"
- ✅ Processing time logged

#### **2.2: Anthropic (Claude) Integration**
```bash
# Support-Specific AI Settings
Support AI Provider: Anthropic
Model: claude-3-5-sonnet-20241022
```

**Steps:**
1. Override support AI settings to use Anthropic
2. Start new chat session
3. Send technical question with multiple sub-questions
4. Verify AI handles complex reasoning

**Expected Results:**
- ✅ AI response from Anthropic Claude
- ✅ Metadata shows aiModel: "claude-3-5-sonnet"
- ✅ Support-specific settings take priority over global

#### **2.3: Google (Gemini) Integration**
```bash
# Module-Specific AI Settings
Support AI Provider: Google
Model: gemini-pro
```

**Steps:**
1. Configure support module to use Google AI
2. Start chat session
3. Send query requiring code generation
4. Verify Gemini Pro response

**Expected Results:**
- ✅ AI response from Google Gemini
- ✅ Metadata shows aiModel: "gemini-pro"

#### **2.4: Provider Failover**
**Steps:**
1. Temporarily disable primary provider (e.g., remove API key)
2. Start chat session
3. Send message
4. Verify automatic fallback to secondary provider

**Expected Results:**
- ✅ Error logged for primary provider
- ✅ Automatic switch to fallback provider
- ✅ User receives response without interruption

---

### **SCENARIO 3: File Processing Pipeline**

**Requirements:** 2.1, 2.2, 2.4, 2.5

**Test Matrix:**

| File Type | File Name | Size | Expected Behavior |
|-----------|-----------|------|-------------------|
| PDF | `user-manual.pdf` | 2 MB | Text extraction, context integration |
| DOCX | `troubleshooting-guide.docx` | 500 KB | Content parsing, formatting preserved |
| XLSX | `error-codes.xlsx` | 300 KB | Sheet data extraction, table recognition |
| TXT | `config-example.txt` | 50 KB | Plain text import |
| MD | `readme.md` | 100 KB | Markdown parsing, code blocks detected |
| PDF | `large-document.pdf` | 15 MB | Rejected (>10MB limit) |
| EXE | `malware.exe` | 1 MB | Rejected (invalid file type) |

**Steps for Each File Type:**
1. Open chatbox
2. Click file upload button
3. Select test file
4. Monitor processing progress (0% → 100%)
5. Verify "File processed successfully" message
6. Send query related to file content
7. Verify AI response includes file context

**Expected Results:**
- ✅ Valid files processed successfully
- ✅ Progress indicators accurate
- ✅ File content extracted and indexed
- ✅ Context sources show document reference
- ✅ Invalid files rejected with clear error message
- ✅ Processing completes <30 seconds for <5MB files

**Validation:**
```sql
SELECT * FROM chat_documents WHERE session_id = '<session-id>';
SELECT * FROM chat_context_sources WHERE source_type = 'document';
```

---

### **SCENARIO 4: URL Processing and Web Content Analysis**

**Requirements:** 3.1, 3.2, 3.3, 3.4, 3.5

**Test URLs:**

| URL | Expected Content | Test Purpose |
|-----|------------------|--------------|
| `https://docs.example.com/api` | API documentation | Standard HTML parsing |
| `https://blog.example.com/article-123` | Blog post with images | Content extraction with media |
| `https://example.com/404` | 404 Error | Error handling |
| `https://very-slow-site.com` | Timeout | Connection timeout (>10s) |
| `https://robots-blocked.com` | robots.txt disallow | robots.txt compliance |

**Steps:**
1. Click URL input button
2. Enter test URL
3. Click "Process URL"
4. Monitor scraping progress
5. Verify content preview
6. Send query about URL content
7. Verify AI response incorporates URL data

**Expected Results:**
- ✅ Valid URLs processed and cached
- ✅ Title and main content extracted
- ✅ Metadata saved (author, publish date)
- ✅ robots.txt rules respected
- ✅ Timeout errors handled gracefully (>10s)
- ✅ 404 errors display user-friendly message
- ✅ Cache hit on repeated URL submissions

**Validation:**
```sql
SELECT * FROM chat_url_cache WHERE url LIKE '%example.com%';
SELECT * FROM chat_context_sources WHERE source_type = 'url';
```

---

### **SCENARIO 5: Support Team Handoff Workflows**

**Requirements:** 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5

**Participants:**
- Customer (user@example.com)
- Support Agent (support@example.com)
- Support Manager (manager@example.com)

#### **5.1: AI to Human Handoff**

**Steps:**
1. Customer starts chat with AI
2. After 3 messages, customer clicks "Talk to Human"
3. System notifies available support agents
4. Support agent accepts assignment
5. AI chat disabled, live chat activated
6. Support agent and customer exchange messages
7. Support agent resolves issue
8. Support agent closes session

**Expected Results:**
- ✅ Handoff request sent to support dashboard
- ✅ Support agent receives real-time notification
- ✅ AI responses automatically disabled
- ✅ Chat history preserved during transition
- ✅ Both parties see "Support Team Joined" message
- ✅ Support agent has access to context and history

**Validation:**
```sql
SELECT * FROM chat_support_assignments WHERE session_id = '<session-id>';
SELECT * FROM chat_messages WHERE sender_type = 'support';
```

#### **5.2: Chat Transfer Between Support Agents**

**Steps:**
1. Support Agent A handling customer chat
2. Agent A clicks "Transfer to..."
3. Selects Agent B from available agents
4. Agent B receives transfer request
5. Agent B accepts transfer
6. Agent A leaves session, Agent B takes over
7. Customer notified of agent change

**Expected Results:**
- ✅ Transfer request created
- ✅ Agent B receives real-time notification
- ✅ Chat history transferred
- ✅ Agent A marked as "left"
- ✅ Agent B marked as "active"
- ✅ Customer sees seamless transition

#### **5.3: Escalation to Manager**

**Steps:**
1. Support agent identifies complex issue
2. Clicks "Escalate to Manager"
3. Manager receives escalation notification
4. Manager joins session (multi-participant)
5. Agent and manager collaborate on resolution
6. Manager provides guidance
7. Agent implements solution with customer

**Expected Results:**
- ✅ Escalation logged with reason
- ✅ Manager receives priority notification
- ✅ Multi-participant chat supported
- ✅ All messages visible to manager
- ✅ Escalation metadata recorded

---

### **SCENARIO 6: Real-Time WebSocket Features**

**Requirements:** 8.1, 8.2, 8.3, 8.4, 8.5

#### **6.1: Connection Stability**

**Steps:**
1. Establish WebSocket connection
2. Monitor connection for 30 minutes
3. Simulate network interruption (disable Wi-Fi 10 seconds)
4. Re-enable network
5. Verify automatic reconnection
6. Send message after reconnection
7. Verify message delivered successfully

**Expected Results:**
- ✅ Connection maintained for extended period
- ✅ Automatic reconnection within 5 seconds
- ✅ Queued messages sent after reconnection
- ✅ No data loss during disconnect
- ✅ Connection status indicator accurate

#### **6.2: Typing Indicators**

**Steps:**
1. Customer starts typing
2. Support agent sees "Customer is typing..." indicator
3. Customer stops typing (>3 seconds)
4. Indicator disappears
5. Support agent starts typing
6. Customer sees "Support team is typing..." indicator

**Expected Results:**
- ✅ Typing events broadcast in real-time
- ✅ Indicators appear/disappear correctly
- ✅ Debounce logic prevents excessive events
- ✅ Multiple participants handled

#### **6.3: Message Broadcasting**

**Steps:**
1. Open same chat session in 2 browser tabs
2. Send message from Tab 1
3. Verify message appears in Tab 2 instantly
4. Send message from Tab 2
5. Verify message appears in Tab 1 instantly

**Expected Results:**
- ✅ Messages broadcast to all session participants
- ✅ Real-time updates (<500ms latency)
- ✅ Message order preserved
- ✅ No duplicate messages

---

### **SCENARIO 7: Concurrent User Load**

**Requirements:** 10.4

**Load Test Configuration:**
- Concurrent users: 50
- Messages per user: 20
- Session duration: 5 minutes
- File uploads: 10% of users
- URL processing: 5% of users

**Steps:**
1. Spin up 50 concurrent chat sessions
2. Each user sends 20 messages over 5 minutes
3. 5 users upload files
4. 2-3 users process URLs
5. Monitor server resources (CPU, RAM, DB connections)
6. Measure response times
7. Check for errors or failures

**Expected Results:**
- ✅ All 50 sessions handled successfully
- ✅ 95th percentile response time <3 seconds
- ✅ No dropped WebSocket connections
- ✅ CPU usage <80%
- ✅ Memory usage stable (no leaks)
- ✅ Database connection pool healthy
- ✅ All file uploads processed
- ✅ All URLs scraped successfully

**Performance Metrics:**
```bash
# Monitor backend
pm2 logs affexai-backend --lines 100

# Check database connections
SELECT count(*) FROM pg_stat_activity WHERE datname = 'affexai';

# Redis queue status
redis-cli INFO stats
```

---

## ✅ Validation Checklist

### **Pre-Test Validation**
- [ ] All environment variables configured
- [ ] Database migrations up to date
- [ ] Test data seeded (users, KB articles, FAQs)
- [ ] AI provider API keys valid
- [ ] Redis and BullMQ running
- [ ] WebSocket server accessible

### **Functional Validation**
- [ ] All test scenarios pass
- [ ] No console errors (frontend)
- [ ] No server errors (backend logs)
- [ ] All files processed successfully
- [ ] All URLs scraped correctly
- [ ] Multi-provider AI working
- [ ] Support handoff seamless
- [ ] WebSocket reconnection reliable

### **Performance Validation**
- [ ] AI response time <3 seconds (95th percentile)
- [ ] File processing <30 seconds
- [ ] URL scraping <10 seconds
- [ ] Context building <500ms
- [ ] WebSocket latency <500ms
- [ ] Concurrent user load handled

### **Data Integrity Validation**
- [ ] All messages persisted
- [ ] Context sources linked correctly
- [ ] File metadata accurate
- [ ] URL cache functioning
- [ ] Support assignments recorded
- [ ] Session status transitions correct

---

## 🐛 Known Issues & Limitations

None currently identified. This section will be updated during testing.

---

## 📊 Test Results

### **Last Test Run:** [To be filled during testing]

**Pass Rate:** 0/0 scenarios (0%)

**Failed Scenarios:**
- None

**Performance Metrics:**
- AI Response Time (avg): N/A
- File Processing Time (avg): N/A
- URL Scraping Time (avg): N/A
- WebSocket Latency (avg): N/A

---

## 🚀 Next Steps

1. Execute integration tests in staging environment
2. Document any failures or issues
3. Fix identified bugs
4. Re-run failed scenarios
5. Obtain sign-off for production deployment

---

**Test Plan Prepared By:** Claude (AI Agent)
**Review Required:** Development Team Lead
