# Social Media Module - TODOs for Future Implementation

## Overview
The Social Media module currently has gaps in its AI integration and requires updates to leverage the new User AI Preferences system.

## Critical TODOs

### 1. Integrate User AI Preferences with Social Media Service
**Status**: ❌ Not Implemented
**Priority**: HIGH
**File**: `apps/backend/src/modules/social-media/social-media.service.ts` (or equivalent)

**What's needed**:
- Update social media content generation to use `aiService.generateCompletionForUser()`
- Pass `userId` and `AiModuleType.SOCIAL` to the AI service
- Remove any hardcoded AI provider/model selection
- Let users control their preferred AI provider via their preferences

**Example Implementation**:
```typescript
// BEFORE (current - manual AI configuration):
const content = await this.aiService.generateCompletion(
  apiKey,
  prompt,
  { model: 'gpt-4' }
);

// AFTER (using user preferences):
const content = await this.aiService.generateCompletionForUser(
  userId,
  AiModuleType.SOCIAL,
  prompt,
  { temperature: 0.7 }
);
```

### 2. Social Media Post Generation
**Status**: ❌ Not Implemented
**Priority**: HIGH

**What's needed**:
- Create AI-powered social media post generator
- Support multiple platforms (Twitter, LinkedIn, Facebook, Instagram)
- Platform-specific content optimization (character limits, hashtags, etc.)
- Tone and style customization based on user preferences
- Image/media suggestion integration

### 3. Content Calendar Integration
**Status**: ❌ Not Implemented
**Priority**: MEDIUM

**What's needed**:
- AI-suggested posting schedule based on analytics
- Best time to post recommendations
- Content variety suggestions
- Auto-scheduling capabilities

### 4. Hashtag and Keyword Optimization
**Status**: ❌ Not Implemented
**Priority**: MEDIUM

**What's needed**:
- AI-powered hashtag suggestions
- Trending topic integration
- SEO keyword recommendations for social media
- Platform-specific optimization

### 5. Analytics and Performance Tracking
**Status**: ❌ Not Implemented
**Priority**: MEDIUM

**What's needed**:
- Track post performance metrics
- AI-generated insights from analytics data
- A/B testing for content variations
- ROI calculation for social campaigns

### 6. Multi-Platform Publishing
**Status**: ❌ Not Implemented
**Priority**: HIGH

**What's needed**:
- Single interface to publish across platforms
- Platform API integrations (Twitter, LinkedIn, Facebook, Instagram)
- Content adaptation per platform
- Scheduled publishing queue

### 7. Content Template Library
**Status**: ❌ Not Implemented
**Priority**: LOW

**What's needed**:
- Pre-built social media post templates
- Industry-specific templates
- Customizable template system
- Template performance analytics

## Integration Requirements

### User AI Preferences
**Current Status**: ✅ User AI Preferences system is ready
**File**: `apps/backend/src/modules/user-ai-preferences/`

The new User AI Preferences system is fully implemented and ready for use:
- Users can configure their preferred AI provider (OpenAI, Anthropic, Google)
- Users can select models (GPT-4, Claude, Gemini)
- Users can provide their own API keys (encrypted)
- Per-module configuration (Email, Social, Support, Analytics)

### AI Service
**Current Status**: ✅ AI Service updated with user preferences support
**File**: `apps/backend/src/modules/ai/ai.service.ts`

The AI Service now has:
- `generateCompletionForUser(userId, module, prompt, options)` - NEW method
- Automatic provider/model selection from user preferences
- Encrypted API key management
- Fallback API key support

**Usage Example**:
```typescript
import { AiService, AiModuleType } from '@/modules/ai/ai.service';

class SocialMediaService {
  constructor(private readonly aiService: AiService) {}

  async generatePost(userId: string, topic: string, platform: 'twitter' | 'linkedin') {
    const prompt = `Create a ${platform} post about: ${topic}`;

    const result = await this.aiService.generateCompletionForUser(
      userId,
      AiModuleType.SOCIAL,
      prompt,
      {
        temperature: 0.7,
        maxTokens: platform === 'twitter' ? 280 : 1000,
      }
    );

    return result.content;
  }
}
```

## Implementation Order (Suggested)

1. **Phase 1**: User AI Preferences Integration (CRITICAL)
   - Update existing social media services to use `generateCompletionForUser()`
   - Test with different AI providers and models

2. **Phase 2**: Core Content Generation Features
   - Post generation for different platforms
   - Content optimization and adaptation

3. **Phase 3**: Advanced Features
   - Analytics and insights
   - Content calendar
   - A/B testing

4. **Phase 4**: Platform Integrations
   - Twitter API integration
   - LinkedIn API integration
   - Facebook/Instagram API integration

## Related Files

### Backend
- `/apps/backend/src/modules/social-media/` - Main social media module
- `/apps/backend/src/modules/ai/ai.service.ts` - AI service with user preferences
- `/apps/backend/src/modules/user-ai-preferences/` - User preferences system

### Frontend
- `/apps/frontend/src/app/admin/social-media/` - Social media management UI
- `/apps/frontend/src/app/admin/profile/ai-preferences/` - User AI preferences UI

## Notes

- **IMPORTANT**: The global AI settings tab has been removed from `/admin/settings/site` to avoid conflict with per-user preferences
- Users now manage their own AI provider preferences at `/admin/profile/ai-preferences`
- Each user can have different AI providers for different modules (Email vs Social vs Support vs Analytics)
- API keys are encrypted before storage using AES-256-GCM

## Questions for Product Owner

1. Which social media platforms should we prioritize first?
2. Do we need real-time publishing or is scheduled publishing sufficient?
3. Should we support user-uploaded media or just text content?
4. Do we need approval workflows for posts before publishing?
5. What analytics metrics are most important for users?

---

**Last Updated**: 2025-10-21
**Status**: Planning Phase
**Next Step**: Implement User AI Preferences integration in existing social media services
