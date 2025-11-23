# AI Analysis Debugging

## Observed Problem
AI returns generic fallback responses instead of meaningful analysis:
- Summary: "Destek talebiniz alındı. Ekibimiz inceleyecektir."
- Priority: "medium"
- Suggestion: "Destek ekibimiz en kısa sürede size yardımcı olacaktır."

## Possible Root Causes

### 1. AI API Key Missing/Invalid
- Check: `settings` table for `ai_support_api_key`
- Symptom: AI call fails immediately
- Log: "❌ [AI ANALYSIS] No API key found for support module"

### 2. AI Provider/Model Misconfiguration
- Check: Which provider is selected (openai, anthropic, google)?
- Check: Which model is selected?
- Symptom: API call succeeds but returns empty/invalid response

### 3. JSON Parsing Error
- Symptom: AI returns text but not in expected JSON format
- Log: "❌ [AI ANALYSIS] Failed to parse AI response"
- Solution: Improve prompt or response cleaning logic

### 4. FAQ Search Error (NEW CODE)
- Symptom: FAQ search fails, continues without context
- Log: "⚠️ [AI ANALYSIS] Failed to fetch FAQ context"
- Impact: AI works but without knowledge base context

## Debug Steps

1. **Check Backend Logs**:
   - Look for "🔍 [AI ANALYSIS]" log entries
   - Check for API errors, parsing errors
   - Verify AI provider/model used

2. **Check Database Settings**:
   ```sql
   SELECT key, value FROM settings WHERE key LIKE '%ai%';
   ```

3. **Test AI Service Directly**:
   ```bash
   curl -X POST http://localhost:3001/tickets/analyze \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test ticket",
       "problemDescription": "This is a test problem description to see if AI analysis works correctly.",
       "category": "technical"
     }'
   ```

4. **Check System Logs**:
   ```sql
   SELECT * FROM system_logs 
   WHERE context = 'AI' 
   AND created_at > NOW() - INTERVAL '1 hour'
   ORDER BY created_at DESC;
   ```

## Next Actions
- [ ] Start backend with `npm run start:dev`
- [ ] Monitor logs while creating a test ticket
- [ ] Identify exact error from logs
- [ ] Fix based on error type

