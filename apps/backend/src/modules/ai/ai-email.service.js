"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiEmailService = void 0;
const common_1 = require("@nestjs/common");
let AiEmailService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AiEmailService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AiEmailService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        aiService;
        settingsService;
        logger = new common_1.Logger(AiEmailService.name);
        constructor(aiService, settingsService) {
            this.aiService = aiService;
            this.settingsService = settingsService;
        }
        /**
         * Generate email subject line using AI
         *
         * @param context - Campaign and product context
         * @param count - Number of subject variations to generate
         * @returns Array of subject line suggestions
         */
        async generateSubjectLines(context, count = 5) {
            this.logger.log('Generating email subject lines with AI');
            // Get API key and model from settings
            const apiKey = await this.settingsService.getAiApiKeyForModule('emailMarketing');
            if (!apiKey) {
                throw new Error('AI Email Marketing is not configured. Please add API key in Settings.');
            }
            const model = await this.settingsService.getAiModelForModule('emailMarketing');
            // Build context-aware prompt
            const prompt = this.buildSubjectPrompt(context, count);
            const systemPrompt = this.getSubjectSystemPrompt(context.tone);
            try {
                const result = await this.aiService.generateCompletion(apiKey, prompt, {
                    model,
                    temperature: 0.8, // Higher creativity for subjects
                    maxTokens: 300,
                    systemPrompt,
                });
                // Parse subject lines from response
                const subjects = this.parseSubjectLines(result.content);
                this.logger.log(`Generated ${subjects.length} subject lines using ${result.tokensUsed} tokens`);
                return subjects;
            }
            catch (error) {
                this.logger.error('Failed to generate subject lines:', error);
                throw error;
            }
        }
        /**
         * Generate email body content using AI
         *
         * @param subject - Email subject line
         * @param context - Campaign and product context
         * @returns HTML and plain text versions of email body
         */
        async generateEmailBody(subject, context) {
            this.logger.log('Generating email body with AI');
            const apiKey = await this.settingsService.getAiApiKeyForModule('emailMarketing');
            if (!apiKey) {
                throw new Error('AI Email Marketing is not configured. Please add API key in Settings.');
            }
            const model = await this.settingsService.getAiModelForModule('emailMarketing');
            const prompt = this.buildBodyPrompt(subject, context);
            const systemPrompt = this.getBodySystemPrompt(context.tone);
            try {
                const result = await this.aiService.generateCompletion(apiKey, prompt, {
                    model,
                    temperature: 0.7,
                    maxTokens: 2000,
                    systemPrompt,
                });
                // Extract HTML and plain text from response
                const emailBody = this.parseEmailBody(result.content);
                this.logger.log(`Generated email body using ${result.tokensUsed} tokens`);
                return {
                    ...emailBody,
                    tokensUsed: result.tokensUsed,
                };
            }
            catch (error) {
                this.logger.error('Failed to generate email body:', error);
                throw error;
            }
        }
        /**
         * Build subject line generation prompt
         */
        buildSubjectPrompt(context, count) {
            let prompt = `Generate ${count} compelling email subject lines for a marketing campaign.\n\n`;
            if (context.campaignName) {
                prompt += `Campaign: ${context.campaignName}\n`;
            }
            if (context.productName) {
                prompt += `Product: ${context.productName}\n`;
            }
            if (context.productDescription) {
                prompt += `About: ${context.productDescription}\n`;
            }
            if (context.targetAudience) {
                prompt += `Target Audience: ${context.targetAudience}\n`;
            }
            if (context.keywords && context.keywords.length > 0) {
                prompt += `Keywords to include: ${context.keywords.join(', ')}\n`;
            }
            if (context.callToAction) {
                prompt += `Goal: ${context.callToAction}\n`;
            }
            prompt += `\nRequirements:
- Keep subject lines between 30-60 characters
- Make them action-oriented and engaging
- Create urgency or curiosity
- Avoid spam trigger words
- Return only the subject lines, numbered 1-${count}
- No explanations or additional text`;
            return prompt;
        }
        /**
         * Build email body generation prompt
         */
        buildBodyPrompt(subject, context) {
            let prompt = `Write a professional email marketing message with the following subject line:\n"${subject}"\n\n`;
            if (context.productName) {
                prompt += `Product: ${context.productName}\n`;
            }
            if (context.productDescription) {
                prompt += `Product Details: ${context.productDescription}\n`;
            }
            if (context.targetAudience) {
                prompt += `Target Audience: ${context.targetAudience}\n`;
            }
            if (context.callToAction) {
                prompt += `Call to Action: ${context.callToAction}\n`;
            }
            prompt += `\nRequirements:
- Write in HTML format with proper structure
- Include a strong opening paragraph
- Highlight key benefits or features
- Add a clear call-to-action button/link
- Keep it concise (200-400 words)
- Use professional formatting
- Do NOT include <html>, <head>, or <body> tags (just the content)
- After the HTML, provide a plain text version separated by "---PLAIN TEXT---"`;
            return prompt;
        }
        /**
         * Get system prompt for subject line generation
         */
        getSubjectSystemPrompt(tone) {
            const toneInstruction = tone
                ? `Use a ${tone} tone throughout.`
                : 'Use a professional and engaging tone.';
            return `You are an expert email marketing copywriter specializing in high-converting subject lines. 
${toneInstruction}
Focus on clarity, emotional appeal, and driving opens.
Avoid clickbait and spam trigger words.`;
        }
        /**
         * Get system prompt for email body generation
         */
        getBodySystemPrompt(tone) {
            const toneInstruction = tone
                ? `Use a ${tone} tone throughout.`
                : 'Use a professional and persuasive tone.';
            return `You are an expert email marketing copywriter creating high-converting email campaigns.
${toneInstruction}
Write clear, benefit-focused copy that drives action.
Use proper HTML formatting with clean, modern design principles.`;
        }
        /**
         * Parse subject lines from AI response
         */
        parseSubjectLines(response) {
            // Extract numbered lines
            const lines = response.split('\n').filter((line) => line.trim());
            const subjects = [];
            for (const line of lines) {
                // Match patterns like "1. Subject" or "1) Subject" or just "Subject"
                const match = line.match(/^\d+[.)]\s*(.+)$/) || [null, line.trim()];
                if (match[1] && match[1].length > 0) {
                    subjects.push(match[1].trim().replace(/^["']|["']$/g, '')); // Remove quotes
                }
            }
            return subjects.filter((s) => s.length > 0);
        }
        /**
         * Parse email body HTML and plain text from AI response
         */
        parseEmailBody(response) {
            const separator = '---PLAIN TEXT---';
            const parts = response.split(separator);
            let htmlBody = parts[0].trim();
            let plainTextBody = parts[1]?.trim() || this.stripHtml(htmlBody);
            // Clean up HTML (remove any accidental html/body tags)
            htmlBody = htmlBody
                .replace(/<\/?html[^>]*>/gi, '')
                .replace(/<\/?head[^>]*>/gi, '')
                .replace(/<\/?body[^>]*>/gi, '')
                .trim();
            return {
                htmlBody,
                plainTextBody,
            };
        }
        /**
         * Strip HTML tags for plain text fallback
         */
        stripHtml(html) {
            return html
                .replace(/<[^>]*>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        }
    };
    return AiEmailService = _classThis;
})();
exports.AiEmailService = AiEmailService;
//# sourceMappingURL=ai-email.service.js.map