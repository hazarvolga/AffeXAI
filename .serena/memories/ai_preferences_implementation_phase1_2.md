# AI Preferences System - Backend Implementation Complete

**Date**: 2025-10-21  
**Status**: ✅ Phase 1 & 2 Complete  
**Branch**: master

---

## ✅ Completed Work

### Phase 1: Provider Infrastructure

**Database Schema**:
- ✅ Migration created: `1760900000000-CreateUserAiPreferencesTable.ts`
- ✅ Table: `user_ai_preferences` with columns:
  - id, user_id, module, provider, model, api_key (encrypted), enabled
  - Foreign key to users (CASCADE delete)
  - Unique index: (user_id, module)
  - Index: user_id

**Provider System**:
- ✅ Interface: `IAiProvider` with methods:
  - `generateCompletion()`, `testConnection()`, `estimateCost()`
- ✅ **OpenAIProvider**: Full implementation with 4 models
  - gpt-4, gpt-4-turbo, gpt-4o, gpt-3.5-turbo
  - Client caching, error handling, cost estimation
- ✅ **AnthropicProvider**: Full implementation with 4 models
  - claude-3-opus, claude-3-sonnet, claude-3-haiku, claude-3-5-sonnet
  - Anthropic SDK installed (`@anthropic-ai/sdk@^0.67.0`)
- ✅ **AiProviderFactory**: Smart provider routing
  - Auto-detect provider from model name
  - Registry pattern for extensibility
- ✅ **AiService Refactored**: Now provider-agnostic
  - Backward compatible API
  - Uses factory for provider selection

**Module Integration**:
- ✅ Providers registered in `AiModule`
- ✅ Exports: `AiService`, `AiEmailService`, `AiProviderFactory`

### Phase 2: User Preferences Module

**Service Layer** (`user-ai-preferences.service.ts`):
- ✅ CRUD operations for user preferences
- ✅ **API Key Encryption**: AES-256-GCM
  - Encrypt before store: `iv:authTag:encrypted` format
  - Decrypt for use (internal only)
  - Environment-based encryption key
- ✅ Methods:
  - `upsertPreference()` - Create or update
  - `getUserPreferences()` - Get all for user
  - `getUserPreferenceForModule()` - Get specific module
  - `getDecryptedApiKey()` - Internal decryption
  - `updatePreference()`, `deletePreference()`

**Controller Layer** (`user-ai-preferences.controller.ts`):
- ✅ REST endpoints:
  - `GET /user-ai-preferences` - List all
  - `GET /user-ai-preferences/:module` - Get by module
  - `POST /user-ai-preferences` - Upsert
  - `PUT /user-ai-preferences/:id` - Update
  - `DELETE /user-ai-preferences/:id` - Delete one
  - `DELETE /user-ai-preferences` - Delete all
- ✅ **API Key Masking**: Never expose full keys
  - Encrypted keys: `***••••`
  - Plain keys: `***XXXX` (last 4 chars)
- ✅ JWT Authentication required

**Module Integration**:
- ✅ `UserAiPreferencesModule` created
- ✅ Registered in `AppModule`
- ✅ Exports service for other modules

---

## 📊 Architecture

### Provider Selection Flow

```
User Request → AI Service
    ↓
Provider Factory.detectProvider(model)
    ↓
├─ "gpt-*" → OpenAI Provider
├─ "claude-*" → Anthropic Provider
└─ "gemini-*" → Google Provider (future)
    ↓
Provider.generateCompletion(apiKey, prompt, options)
    ↓
Result (content, tokens, provider)
```

### User Preferences Flow

```
User AI Preference
    ↓
1. User selects module (email/social/support/analytics)
2. User selects provider (openai/anthropic)
3. User selects model (gpt-4, claude-3-sonnet, etc.)
4. User enters API key (optional)
    ↓
Service encrypts API key (AES-256-GCM)
    ↓
Store in database: user_ai_preferences
    ↓
On AI request:
  - Get user preference for module
  - Decrypt API key
  - Use preferred provider & model
```

---

## 🔐 Security Features

**API Key Encryption**:
- Algorithm: AES-256-GCM (authenticated encryption)
- Key derivation: Environment variable (32 bytes)
- Format: `iv:authTag:encrypted`
- Keys never exposed in API responses (masked)

**Authentication**:
- All endpoints require JWT auth
- Users can only access their own preferences
- Cascade delete when user is deleted

---

## 📁 Files Created/Modified

### Created:
1. `apps/backend/src/database/migrations/1760900000000-CreateUserAiPreferencesTable.ts`
2. `apps/backend/src/modules/user-ai-preferences/entities/user-ai-preference.entity.ts`
3. `apps/backend/src/modules/user-ai-preferences/dto/create-user-ai-preference.dto.ts`
4. `apps/backend/src/modules/user-ai-preferences/dto/update-user-ai-preference.dto.ts`
5. `apps/backend/src/modules/user-ai-preferences/services/user-ai-preferences.service.ts`
6. `apps/backend/src/modules/user-ai-preferences/user-ai-preferences.controller.ts`
7. `apps/backend/src/modules/user-ai-preferences/user-ai-preferences.module.ts`
8. `apps/backend/src/modules/ai/interfaces/ai-provider.interface.ts`
9. `apps/backend/src/modules/ai/providers/openai.provider.ts`
10. `apps/backend/src/modules/ai/providers/anthropic.provider.ts`
11. `apps/backend/src/modules/ai/providers/provider.factory.ts`

### Modified:
1. `apps/backend/src/modules/ai/ai.service.ts` - Refactored to use providers
2. `apps/backend/src/modules/ai/ai.module.ts` - Added provider registration
3. `apps/backend/src/app.module.ts` - Added UserAiPreferencesModule
4. `apps/backend/package.json` - Added @anthropic-ai/sdk

---

## 🚧 Known Issues / Limitations

1. **Google Gemini Provider**: Not implemented
   - NPM issue prevented installing `@google/generative-ai`
   - Error: "Cannot read properties of undefined (reading 'extraneous')"
   - Workaround: Will be added in Phase 3 or separately
   - Provider factory ready to accept Google provider

2. **Environment Variable**:
   - Encryption key needs to be set in production: `AI_API_KEY_ENCRYPTION_KEY`
   - Currently using default dev key (insecure for production)

---

## 🔄 Migration Status

**Executed**: ✅ `CreateUserAiPreferencesTable1760900000000`

**Schema**:
```sql
CREATE TABLE user_ai_preferences (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module VARCHAR(50),      -- email, social, support, analytics
  provider VARCHAR(50),    -- openai, anthropic, google
  model VARCHAR(100),      -- gpt-4, claude-3-sonnet, etc.
  api_key TEXT,            -- Encrypted
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE (user_id, module)
);

CREATE INDEX idx_user_ai_preferences_user_id ON user_ai_preferences(user_id);
CREATE UNIQUE INDEX idx_user_module_unique ON user_ai_preferences(user_id, module);
```

---

## 🧪 Testing Status

**Build**: ✅ Successful  
**TypeScript Compilation**: ✅ No errors  
**Migration**: ✅ Applied successfully  

**Manual Testing Needed**:
- [ ] API endpoints (Postman/curl)
- [ ] Provider selection logic
- [ ] API key encryption/decryption
- [ ] Error handling
- [ ] Integration with existing AI modules

---

## 📝 Next Steps (Phase 3)

1. **Frontend UI**:
   - Create `/profile/ai-settings` page
   - Provider selection dropdown
   - Model selection dropdown
   - API key input (masked)
   - Test connection button
   - Save preferences

2. **Integration**:
   - Update existing AI modules (Email, Support) to use user preferences
   - Fallback logic: User key → Admin key → Default

3. **Google Gemini**:
   - Resolve npm dependency issue
   - Implement GoogleGeminiProvider
   - Add to admin settings dropdown

4. **Testing**:
   - End-to-end test scenarios
   - Provider switching tests
   - API key validation tests

---

## 💡 Implementation Notes

**Provider Pattern Benefits**:
- Easy to add new AI providers
- Consistent interface across providers
- Automatic provider detection
- Client caching for performance

**Security Best Practices**:
- API keys encrypted at rest
- Never logged or exposed in responses
- User-scoped access control
- Cascade delete on user removal

**Backward Compatibility**:
- Existing `AiService` API unchanged
- Old code continues to work
- Gradual migration possible

---

**Session Complete**: 2025-10-21 11:35 UTC+3  
**Status**: Backend implementation 80% complete  
**Remaining**: Frontend UI (Phase 3), Testing (Phase 4)
