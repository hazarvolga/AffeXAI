# 📧 Email Deliverability Guide

**Complete guide to ensure maximum email deliverability and zero spam for Affexai platform users**

---

## 🎯 Overview

Affexai implements **enterprise-grade email validation and deliverability** features to ensure:
- ✅ **99%+ deliverability rate**
- ✅ **Zero spam complaints**
- ✅ **High sender reputation**
- ✅ **Minimal bounce rates**
- ✅ **Professional email lists**

---

## 📋 Table of Contents

1. [Email Validation System](#-email-validation-system)
2. [DNS Configuration](#-dns-configuration)
3. [Email Marketing Best Practices](#-email-marketing-best-practices)
4. [Monitoring & Analytics](#-monitoring--analytics)
5. [Troubleshooting](#-troubleshooting)

---

## 🔍 Email Validation System

### Multi-Layer Validation Architecture

```
User Input → Client Validation → Advanced Backend Validation → Database Storage
               (Instant)           (Comprehensive)                (Clean Data)
```

### Layer 1: Client-Side Validation (Frontend)

**Location:** `apps/frontend/src/app/signup/page.tsx`

**Checks:**
1. **RFC 5322 Regex Compliance**
   ```regex
   /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/
   ```

2. **Format Validation**
   - ✅ No consecutive dots (`..`)
   - ✅ Cannot start/end with dot
   - ✅ Valid TLD (minimum 2 characters)
   - ✅ No spaces or special characters

3. **Instant Feedback**
   - Real-time validation (800ms debounce)
   - Visual indicators (✓ valid, ✗ invalid)
   - Helpful error messages

**Invalid Examples:**
```
❌ hazarvolga@hotmai..l.com  → "Email adresinde ardışık nokta kullanılamaz"
❌ .user@example.com         → "Email adresi nokta ile başlayamaz"
❌ user.@example.com         → "Email adresi nokta ile bitemez"
❌ user@example.c            → "Geçersiz domain uzantısı"
```

---

### Layer 2: Advanced Backend Validation

**Location:** `apps/backend/src/modules/email-marketing/services/advanced-email-validation.service.ts`

**Comprehensive Checks:**

#### 1. Syntax Validation
- RFC 5322 compliant regex
- Maximum length: 254 characters (RFC 5321)
- Local part max: 64 characters
- Domain part validation

#### 2. Domain Validation
- **DNS Lookup:** Verifies domain exists
- **Cache:** 24 hours for valid, 1 hour for invalid
- **Result:** Domain existence confirmed

#### 3. MX Record Verification
- **Check:** Mail server records exist
- **Validation:** At least one MX record required
- **Deliverability:** Ensures emails can be received

#### 4. Disposable Email Detection
Blocks temporary/throwaway email services:
```javascript
Blocked Domains:
- mailinator.com
- guerrillamail.com
- tempmail.com
- throwawaymail.com
- 10minutemail.com
- yopmail.com
- temp-mail.org
- maildrop.cc
```

**Why Block Disposable Emails?**
- ✅ Reduces spam signups
- ✅ Improves list quality
- ✅ Maintains sender reputation
- ✅ Ensures real user engagement

#### 5. Role Account Detection
Identifies generic/role-based email addresses:
```javascript
Role Accounts:
- admin@, info@, support@
- sales@, contact@, help@
- service@, webmaster@
- postmaster@, hostmaster@
- abuse@
```

**Impact:**
- Lower engagement rates
- Higher bounce potential
- Flagged for marketing emails

#### 6. Typo Detection & Correction
Suggests corrections for common typos:
```javascript
Common Typos:
- gmial.com → gmail.com
- gamil.com → gmail.com
- hotmial.com → hotmail.com
- hotmal.com → hotmail.com
- yaho.com → yahoo.com
- outloo.com → outlook.com
```

**User Experience:**
```
Input: user@gmial.com
Output: "gmail.com mı demek istediniz?"
        [Use gmail.com instead]
```

#### 7. IP Reputation Check
- **Checks:** Sender IP against blacklists
- **Sources:** Spamhaus, Barracuda, etc.
- **Result:** Good, Neutral, Poor, Unknown

#### 8. Domain Reputation Check
- **Verifies:** Domain's email sending history
- **Metrics:** Spam complaints, bounce rates
- **Score:** 0-100 confidence rating

---

### Layer 3: Custom Backend Validator

**Location:** `apps/backend/src/common/validators/email.validator.ts`

**Decorator:** `@IsStrictEmail()`

**Usage in DTOs:**
```typescript
import { IsStrictEmail } from '../../../common/validators/email.validator';

export class CreateUserDto {
  @IsStrictEmail({ message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;
}
```

**Features:**
- Automatic validation on all API requests
- Custom error messages
- RFC 5321 compliance
- Length limit enforcement

---

### Confidence Scoring Algorithm

The system calculates a **confidence score (0-100%)** based on:

```javascript
Confidence Factors:
- Syntax Valid: +20%
- Domain Exists: +20%
- MX Records Found: +20%
- Not Disposable: +15%
- Not Role Account: +10%
- No Typos: +5%
- Good IP Reputation: +5%
- Good Domain Reputation: +5%

Total: 100% (maximum)
```

**Score Interpretation:**
- **90-100%:** Excellent - Accept immediately
- **70-89%:** Good - Accept with confidence
- **50-69%:** Risky - Accept but monitor
- **30-49%:** Poor - Warn user
- **0-29%:** Invalid - Reject

**User Feedback Examples:**
```
✓ Email kullanılabilir (Güvenilirlik: %95)
⚠️ Email doğrulandı ancak güvenilirlik skoru düşük (%65)
❌ Email adresi doğrulanamadı
```

---

## 🌐 DNS Configuration

### Required DNS Records for Maximum Deliverability

For detailed DNS setup, see [DEPLOYMENT.md](./DEPLOYMENT.md#dns-configuration)

#### 1. SPF (Sender Policy Framework)
**Purpose:** Prevents email spoofing

**Example for Resend:**
```dns
Type: TXT
Name: @ (or your domain)
Value: v=spf1 include:_spf.resend.com ~all
```

**Verification:**
```bash
dig TXT aluplan.tr +short
```

#### 2. DKIM (DomainKeys Identified Mail)
**Purpose:** Email signature verification

**Example for Resend:**
```dns
Type: TXT
Name: resend._domainkey
Value: (obtained from Resend dashboard)
```

#### 3. DMARC (Domain-based Message Authentication)
**Purpose:** Email authentication policy

**Example:**
```dns
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@aluplan.tr
```

**DMARC Policies:**
- `p=none` - Monitor only (recommended for start)
- `p=quarantine` - Send suspicious emails to spam
- `p=reject` - Reject unauthenticated emails

### DNS Verification Tool

**Built-in Feature:** Real-time DNS verification

**Location:** Admin Settings → Email Ayarları → "DNS Kayıtlarını Kontrol Et"

**Checks:**
- ✅ SPF record exists and correct
- ✅ DKIM record exists and valid
- ✅ DMARC record exists
- ✅ MX records for domain

**Visual Feedback:**
- ✓ Green checkmark - Record verified
- ✗ Red X - Record missing/invalid
- ⚠️ Yellow warning - Record exists but needs attention

---

## 📨 Email Marketing Best Practices

### Subscriber List Hygiene

**Automatic Validation:**
- All new subscribers validated before storage
- `mailerCheckResult` field tracks validation status
- Invalid emails rejected automatically

**List Cleaning:**
```sql
-- Check subscriber validation status
SELECT email, mailer_check_result, status
FROM subscribers
WHERE mailer_check_result IN ('invalid', 'risky');

-- Clean invalid subscribers
UPDATE subscribers
SET status = 'inactive'
WHERE mailer_check_result = 'invalid';
```

### Engagement-Based Sending

**Best Practices:**
1. **Segment by Engagement**
   - Active (opened in last 30 days)
   - Inactive (no open in 30-90 days)
   - Dormant (no open in 90+ days)

2. **Re-engagement Campaigns**
   - Target inactive subscribers
   - "We miss you" messaging
   - Special offers

3. **List Pruning**
   - Remove dormant subscribers (180+ days)
   - Prevents spam traps
   - Maintains sender reputation

### Email Content Optimization

**Spam Filter Avoidance:**
- ✅ Proper HTML structure
- ✅ Text-to-image ratio (60:40 recommended)
- ✅ Avoid spam trigger words ("FREE!!!", "CLICK NOW")
- ✅ Include plain text version
- ✅ Add unsubscribe link (required by law)

**Subject Line Best Practices:**
- Maximum 60 characters
- Avoid ALL CAPS
- No excessive punctuation (!!!)
- Personalization increases open rates

### Sending Patterns

**Warm-up Schedule (New Sender):**
```
Day 1-3:   50 emails/day
Day 4-7:   100 emails/day
Day 8-14:  500 emails/day
Day 15-21: 1000 emails/day
Day 22+:   Full volume
```

**Rate Limiting:**
```javascript
// Configured in database settings
transactional: 1000 emails/hour
marketing: 500 emails/hour
```

**Best Sending Times:**
- B2B: Tuesday-Thursday, 10 AM - 2 PM
- B2C: Weekends, 8 AM or 6 PM
- Use send-time optimization feature

---

## 📊 Monitoring & Analytics

### Key Metrics to Track

**1. Deliverability Rate**
```
Deliverability = (Sent - Bounced) / Sent × 100%
Target: > 99%
```

**2. Bounce Rate**
```
Hard Bounces: Invalid email addresses (remove immediately)
Soft Bounces: Temporary issues (retry up to 3 times)

Target Hard Bounce Rate: < 2%
Target Soft Bounce Rate: < 5%
```

**3. Open Rate**
```
Open Rate = Unique Opens / Delivered × 100%
Industry Average: 15-25%
Target: > 20%
```

**4. Click Rate**
```
Click Rate = Unique Clicks / Delivered × 100%
Industry Average: 2-5%
Target: > 3%
```

**5. Unsubscribe Rate**
```
Unsubscribe Rate = Unsubscribes / Delivered × 100%
Target: < 0.5%
```

**6. Spam Complaint Rate**
```
Spam Complaints = Spam Reports / Delivered × 100%
CRITICAL: Must be < 0.1%
```

### Analytics Dashboard

**Location:** `/admin/newsletter/campaigns/[id]/analytics`

**Available Metrics:**
- Total sent, delivered, bounced
- Open rate, click rate
- Unsubscribe rate
- Spam complaint rate
- Geographic distribution
- Device breakdown
- Time-based analytics

### Email Logs

**Location:** `email_logs` table

**Tracked Events:**
- `sent` - Email queued for sending
- `delivered` - Successfully delivered
- `opened` - Email opened (tracked via pixel)
- `clicked` - Link clicked
- `bounced` - Delivery failed
- `complained` - Marked as spam
- `unsubscribed` - User unsubscribed

---

## 🔧 Troubleshooting

### Issue: High Bounce Rate

**Symptoms:**
- Bounce rate > 5%
- Many hard bounces

**Solutions:**
1. ✅ Enable email validation on signup
2. ✅ Use double opt-in
3. ✅ Clean list regularly
4. ✅ Remove hard bounces immediately
5. ✅ Verify import file quality

### Issue: Low Deliverability

**Symptoms:**
- Emails not reaching inbox
- High spam folder placement

**Checklist:**
1. ✅ DNS records configured?
   - SPF, DKIM, DMARC all verified
2. ✅ Domain warmed up?
   - Gradual volume increase
3. ✅ List hygiene maintained?
   - Regular validation
4. ✅ Content quality?
   - No spam triggers
5. ✅ Engagement healthy?
   - Remove inactive subscribers

### Issue: Spam Complaints

**Symptoms:**
- Spam complaint rate > 0.1%
- Sender reputation declining

**Immediate Actions:**
1. 🚨 Pause campaigns immediately
2. ✅ Review last campaign content
3. ✅ Check subscriber source
4. ✅ Verify opt-in process
5. ✅ Add prominent unsubscribe link
6. ✅ Honor unsubscribe requests instantly

### Issue: Low Open Rates

**Symptoms:**
- Open rate < 15%
- Declining engagement

**Solutions:**
1. ✅ Improve subject lines
   - A/B test different variants
   - Personalization
   - Create urgency
2. ✅ Optimize send time
   - Use send-time optimization
   - Test different times
3. ✅ Segment better
   - Send relevant content
   - Target engaged users
4. ✅ Clean inactive subscribers
   - Reduces denominator
   - Improves metrics

---

## 🎯 Deliverability Checklist

### Pre-Launch Checklist

**DNS Configuration:**
- [ ] SPF record added and verified
- [ ] DKIM record added and verified
- [ ] DMARC record added
- [ ] MX records verified
- [ ] Used DNS verification tool

**Email Setup:**
- [ ] From email uses verified domain
- [ ] Reply-to email configured
- [ ] Sender name professional
- [ ] Unsubscribe link functional
- [ ] Test emails sent successfully

**List Quality:**
- [ ] Email validation enabled
- [ ] Double opt-in configured
- [ ] Welcome email series ready
- [ ] Unsubscribe page created
- [ ] Preference center available

**Content:**
- [ ] HTML template validated
- [ ] Plain text version included
- [ ] Images optimized (< 100KB each)
- [ ] Links use HTTPS
- [ ] Spam score checked (< 5.0)

### Ongoing Maintenance

**Daily:**
- [ ] Monitor bounce rate
- [ ] Review spam complaints
- [ ] Check delivery failures

**Weekly:**
- [ ] Review campaign performance
- [ ] Clean bounced emails
- [ ] Analyze engagement trends

**Monthly:**
- [ ] Remove inactive subscribers (90+ days)
- [ ] Review sender reputation
- [ ] Update segmentation rules
- [ ] A/B test improvements

---

## 📚 Additional Resources

### Tools & Services

**Email Testing:**
- [Mail-Tester](https://www.mail-tester.com/) - Spam score checker
- [MXToolbox](https://mxtoolbox.com/) - DNS and blacklist checker
- [Google Postmaster Tools](https://postmaster.google.com/) - Gmail reputation

**Blacklist Monitoring:**
- [Spamhaus](https://www.spamhaus.org/lookup/)
- [SURBL](http://www.surbl.org/surbl-analysis)
- [Barracuda](https://www.barracudacentral.org/lookups)

**Industry Standards:**
- [RFC 5321](https://tools.ietf.org/html/rfc5321) - SMTP
- [RFC 5322](https://tools.ietf.org/html/rfc5322) - Email Format
- [CAN-SPAM Act](https://www.ftc.gov/tips-advice/business-center/guidance/can-spam-act-compliance-guide-business)
- [GDPR Email Marketing](https://gdpr.eu/email-encryption/)

---

## 🏆 Success Metrics

### Industry Benchmarks

**Excellent Performance:**
- Deliverability: 99%+
- Open Rate: 25%+
- Click Rate: 5%+
- Bounce Rate: < 2%
- Unsubscribe: < 0.5%
- Spam Complaints: < 0.05%

**Affexai Target Metrics:**
- ✅ Deliverability: 99.5%
- ✅ Email Validation: 100% coverage
- ✅ DNS Configuration: 100% verified
- ✅ Bounce Rate: < 1%
- ✅ Spam Complaints: < 0.01%

---

**Version:** 1.0.0
**Last Updated:** 2025-10-26
**Maintainer:** Affexai Team

---

*This guide ensures Affexai platform users achieve maximum email deliverability and maintain excellent sender reputation.*
