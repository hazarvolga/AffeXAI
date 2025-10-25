"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternRecognitionService = void 0;
const common_1 = require("@nestjs/common");
const learning_pattern_entity_1 = require("../entities/learning-pattern.entity");
const crypto = __importStar(require("crypto"));
let PatternRecognitionService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PatternRecognitionService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PatternRecognitionService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        patternRepository;
        logger = new common_1.Logger(PatternRecognitionService.name);
        constructor(patternRepository) {
            this.patternRepository = patternRepository;
        }
        /**
         * Identify patterns from extracted data
         */
        async identifyPatterns(data) {
            const result = await this.analyzePatterns(data);
            return result.patterns;
        }
        /**
         * Analyze extracted data to identify patterns
         */
        async analyzePatterns(data) {
            const startTime = Date.now();
            this.logger.log(`Analyzing patterns from ${data.length} extracted items`);
            const learningPatterns = [];
            const questionGroups = [];
            // Extract and analyze questions
            const allQuestions = data.map(item => item.question);
            const questionPatterns = await this.analyzeQuestionPatterns(allQuestions);
            learningPatterns.push(...questionPatterns);
            // Extract and analyze answers
            const allAnswers = data.map(item => item.answer);
            const answerPatterns = await this.analyzeAnswerPatterns(allAnswers);
            learningPatterns.push(...answerPatterns);
            // Group similar questions
            const groups = await this.groupSimilarQuestions(allQuestions);
            questionGroups.push(...groups);
            // Convert LearningPattern[] to PatternMatch[]
            const patterns = learningPatterns.map(lp => ({
                pattern: lp.pattern,
                type: lp.type,
                confidence: lp.confidence,
                frequency: lp.frequency,
                sources: [],
                keywords: lp.keywords || [],
                category: lp.category,
            }));
            return {
                patterns,
                groups: questionGroups,
                totalAnalyzed: data.length,
                processingTime: Date.now() - startTime,
            };
        }
        /**
         * Extract questions from text
         */
        async extractQuestions(text) {
            if (!text)
                return [];
            const sentences = this.splitIntoSentences(text);
            const questions = [];
            for (const sentence of sentences) {
                if (this.isQuestion(sentence)) {
                    questions.push(sentence.trim());
                }
            }
            return questions;
        }
        /**
         * Extract answers from text with context
         */
        async extractAnswers(text, context) {
            if (!text)
                return [];
            const sentences = this.splitIntoSentences(text);
            const answers = [];
            for (const sentence of sentences) {
                if (this.isAnswer(sentence, context)) {
                    answers.push(sentence.trim());
                }
            }
            return answers;
        }
        /**
         * Extract keywords from text using advanced NLP techniques
         */
        async extractKeywords(text) {
            if (!text)
                return [];
            // Normalize text
            const normalizedText = text.toLowerCase()
                .replace(/[^\w\s]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            // Split into words
            const words = normalizedText.split(' ');
            // Filter stop words and short words
            const stopWords = this.getStopWords();
            const filteredWords = words.filter(word => word.length > 2 &&
                !stopWords.has(word) &&
                !/^\d+$/.test(word));
            // Calculate TF-IDF-like scores
            const wordFreq = new Map();
            filteredWords.forEach(word => {
                wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
            });
            // Extract n-grams (2-grams and 3-grams)
            const ngrams = this.extractNGrams(filteredWords, 2, 3);
            // Combine single words and n-grams
            const allTerms = [...Array.from(wordFreq.keys()), ...ngrams];
            // Score and rank terms
            const scoredTerms = allTerms.map(term => ({
                term,
                score: this.calculateTermScore(term, text, wordFreq)
            }));
            // Return top keywords
            return scoredTerms
                .sort((a, b) => b.score - a.score)
                .slice(0, 15)
                .map(item => item.term);
        }
        /**
         * Find similar patterns in database
         */
        async findSimilarPatterns(pattern, threshold = 0.7) {
            const allPatterns = await this.patternRepository.find();
            const similarPatterns = [];
            for (const existingPattern of allPatterns) {
                const similarity = await this.calculateSimilarityScore(pattern, existingPattern.pattern);
                if (similarity >= threshold) {
                    similarPatterns.push({ pattern: existingPattern, similarity });
                }
            }
            return similarPatterns
                .sort((a, b) => b.similarity - a.similarity)
                .map(item => ({
                pattern: item.pattern.pattern,
                type: item.pattern.type,
                confidence: item.similarity,
                frequency: item.pattern.frequency,
                sources: [],
                keywords: item.pattern.keywords || [],
                category: item.pattern.category,
            }));
        }
        /**
         * Group similar questions together
         */
        async groupSimilarQuestions(questions) {
            if (questions.length === 0)
                return [];
            const groups = [];
            const processed = new Set();
            for (let i = 0; i < questions.length; i++) {
                if (processed.has(i))
                    continue;
                const currentQuestion = questions[i];
                const similarQuestions = [currentQuestion];
                const keywords = await this.extractKeywords(currentQuestion);
                // Find similar questions
                for (let j = i + 1; j < questions.length; j++) {
                    if (processed.has(j))
                        continue;
                    const similarity = await this.calculateSimilarityScore(currentQuestion, questions[j]);
                    if (similarity >= 0.7) {
                        similarQuestions.push(questions[j]);
                        processed.add(j);
                    }
                }
                if (similarQuestions.length > 1) {
                    const commonKeywords = await this.findCommonKeywords(similarQuestions);
                    const group = {
                        id: crypto.randomUUID(),
                        representativeQuestion: this.selectRepresentativeQuestion(similarQuestions),
                        questions: similarQuestions,
                        commonPattern: commonKeywords.join(' '),
                        confidence: 75, // Default confidence
                        frequency: similarQuestions.length,
                        category: this.inferCategory(similarQuestions),
                    };
                    groups.push(group);
                }
                processed.add(i);
            }
            return groups.sort((a, b) => b.frequency - a.frequency);
        }
        /**
         * Calculate pattern confidence based on various factors
         */
        async calculatePatternConfidence(pattern) {
            let confidence = 50; // Base confidence
            // Factor 1: Frequency
            if (pattern.frequency >= 5)
                confidence += 20;
            else if (pattern.frequency >= 3)
                confidence += 10;
            else if (pattern.frequency === 1)
                confidence -= 10;
            // Factor 2: Source diversity
            const uniqueSources = new Set(pattern.sources.map(s => s.id)).size;
            if (uniqueSources >= 3)
                confidence += 15;
            else if (uniqueSources >= 2)
                confidence += 10;
            // Factor 3: Average source relevance
            const avgRelevance = pattern.averageSourceRelevance;
            confidence += Math.round((avgRelevance - 0.5) * 20);
            // Factor 4: Pattern quality
            const patternLength = pattern.pattern.length;
            if (patternLength >= 20 && patternLength <= 200)
                confidence += 10;
            else if (patternLength < 10)
                confidence -= 15;
            // Factor 5: Keywords richness
            if (pattern.keywords.length >= 3)
                confidence += 5;
            // Factor 6: Category assignment
            if (pattern.category && pattern.category !== 'general')
                confidence += 5;
            return Math.max(1, Math.min(100, confidence));
        }
        /**
         * Calculate similarity score between two texts
         */
        async calculateSimilarityScore(text1, text2) {
            if (!text1 || !text2)
                return 0;
            // Normalize texts
            const norm1 = this.normalizeText(text1);
            const norm2 = this.normalizeText(text2);
            // Calculate different similarity metrics
            const jaccardSim = this.calculateJaccardSimilarity(norm1, norm2);
            const cosineSim = this.calculateCosineSimilarity(norm1, norm2);
            const levenshteinSim = this.calculateLevenshteinSimilarity(norm1, norm2);
            // Weighted combination
            return (jaccardSim * 0.4 + cosineSim * 0.4 + levenshteinSim * 0.2);
        }
        /**
         * Identify question-answer pairs from conversation
         */
        async identifyQuestionAnswerPairs(messages) {
            const pairs = [];
            for (let i = 0; i < messages.length - 1; i++) {
                const currentMsg = messages[i];
                const nextMsg = messages[i + 1];
                // Look for user question followed by bot/agent answer
                if (currentMsg.type === 'user' &&
                    (nextMsg.type === 'bot' || nextMsg.type === 'agent') &&
                    this.isQuestion(currentMsg.content) &&
                    this.isAnswer(nextMsg.content)) {
                    const confidence = await this.calculatePairConfidence(currentMsg.content, nextMsg.content);
                    pairs.push({
                        question: currentMsg.content,
                        answer: nextMsg.content,
                        confidence,
                    });
                }
            }
            return pairs;
        }
        // Private helper methods
        async analyzeQuestionPatterns(questions) {
            const patterns = [];
            const questionFreq = new Map();
            // Count question patterns
            for (const question of questions) {
                const normalized = this.normalizeText(question);
                const hash = this.generateHash(normalized);
                let existingPattern = patterns.find(p => p.patternHash === hash);
                if (existingPattern) {
                    existingPattern.incrementFrequency();
                }
                else {
                    const pattern = new learning_pattern_entity_1.LearningPattern();
                    pattern.patternType = learning_pattern_entity_1.PatternType.QUESTION;
                    pattern.pattern = normalized;
                    pattern.patternHash = hash;
                    pattern.frequency = 1;
                    pattern.keywords = await this.extractKeywords(question);
                    pattern.category = this.inferCategory([question]);
                    patterns.push(pattern);
                }
            }
            return patterns;
        }
        async analyzeAnswerPatterns(answers) {
            const patterns = [];
            for (const answer of answers) {
                const normalized = this.normalizeText(answer);
                const hash = this.generateHash(normalized);
                let existingPattern = patterns.find(p => p.patternHash === hash);
                if (existingPattern) {
                    existingPattern.incrementFrequency();
                }
                else {
                    const pattern = new learning_pattern_entity_1.LearningPattern();
                    pattern.patternType = learning_pattern_entity_1.PatternType.ANSWER;
                    pattern.pattern = normalized;
                    pattern.patternHash = hash;
                    pattern.frequency = 1;
                    pattern.keywords = await this.extractKeywords(answer);
                    patterns.push(pattern);
                }
            }
            return patterns;
        }
        async findDuplicates(questions) {
            const duplicates = [];
            const processed = new Set();
            for (let i = 0; i < questions.length; i++) {
                if (processed.has(i))
                    continue;
                const original = questions[i];
                const duplicateList = [];
                for (let j = i + 1; j < questions.length; j++) {
                    if (processed.has(j))
                        continue;
                    const similarity = await this.calculateSimilarityScore(original, questions[j]);
                    if (similarity >= 0.9) {
                        duplicateList.push(questions[j]);
                        processed.add(j);
                    }
                }
                if (duplicateList.length > 0) {
                    duplicates.push({
                        original,
                        duplicates: duplicateList,
                        similarity: 0.9, // Minimum similarity threshold
                    });
                }
                processed.add(i);
            }
            return duplicates;
        }
        calculateStatistics(patterns) {
            const totalPatterns = patterns.length;
            const highConfidencePatterns = patterns.filter(p => p.confidence >= 80).length;
            const averageFrequency = patterns.length > 0
                ? patterns.reduce((sum, p) => sum + p.frequency, 0) / patterns.length
                : 0;
            // Count categories
            const categoryCount = new Map();
            patterns.forEach(p => {
                if (p.category) {
                    categoryCount.set(p.category, (categoryCount.get(p.category) || 0) + 1);
                }
            });
            const topCategories = Array.from(categoryCount.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([category, count]) => ({ category, count }));
            return {
                totalPatterns,
                highConfidencePatterns,
                averageFrequency: Math.round(averageFrequency * 100) / 100,
                topCategories,
            };
        }
        splitIntoSentences(text) {
            return text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        }
        isQuestion(text) {
            if (!text || text.length < 5)
                return false;
            const lowerText = text.toLowerCase().trim();
            // Question patterns
            const questionPatterns = [
                /\?$/,
                /^(how|what|when|where|why|who|which|can|could|would|should|is|are|do|does|did)\s/,
                /(help|problem|issue|trouble|error)/,
            ];
            return questionPatterns.some(pattern => pattern.test(lowerText));
        }
        isAnswer(text, context) {
            if (!text || text.length < 10)
                return false;
            const lowerText = text.toLowerCase();
            // Answer patterns
            const answerPatterns = [
                /(you can|try|here's how|to do this|follow these|solution|resolve)/,
                /(step|first|then|next|finally)/,
                /(should|will|need to|have to)/,
            ];
            return answerPatterns.some(pattern => pattern.test(lowerText));
        }
        normalizeText(text) {
            return text.toLowerCase()
                .replace(/[^\w\s]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        }
        generateHash(text) {
            return crypto.createHash('sha256').update(text).digest('hex').substring(0, 16);
        }
        getStopWords() {
            return new Set([
                'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
                'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after',
                'above', 'below', 'between', 'among', 'is', 'are', 'was', 'were', 'be', 'been',
                'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
                'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
                'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
            ]);
        }
        extractNGrams(words, ...ngramSizes) {
            const ngrams = [];
            for (const n of ngramSizes) {
                for (let i = 0; i <= words.length - n; i++) {
                    const ngram = words.slice(i, i + n).join(' ');
                    if (ngram.length > 5) { // Only meaningful n-grams
                        ngrams.push(ngram);
                    }
                }
            }
            return ngrams;
        }
        calculateTermScore(term, text, wordFreq) {
            const termFreq = wordFreq.get(term) || 0;
            const textLength = text.split(' ').length;
            // Simple TF score with length bonus
            let score = termFreq / textLength;
            // Bonus for longer terms (likely more specific)
            if (term.includes(' ')) {
                score *= 1.5;
            }
            return score;
        }
        selectRepresentativeQuestion(questions) {
            // Select the shortest clear question as representative
            return questions.reduce((shortest, current) => current.length < shortest.length ? current : shortest);
        }
        async findCommonKeywords(questions) {
            const allKeywords = new Map();
            for (const question of questions) {
                const keywords = await this.extractKeywords(question);
                keywords.forEach(keyword => {
                    allKeywords.set(keyword, (allKeywords.get(keyword) || 0) + 1);
                });
            }
            // Return keywords that appear in multiple questions
            return Array.from(allKeywords.entries())
                .filter(([_, count]) => count > 1)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([keyword]) => keyword);
        }
        inferCategory(questions) {
            const combinedText = questions.join(' ').toLowerCase();
            const categories = {
                'authentication': ['password', 'login', 'sign in', 'account', 'username'],
                'billing': ['payment', 'invoice', 'billing', 'subscription', 'price'],
                'technical': ['error', 'bug', 'not working', 'broken', 'issue'],
                'account': ['profile', 'settings', 'preferences', 'update'],
            };
            for (const [category, keywords] of Object.entries(categories)) {
                if (keywords.some(keyword => combinedText.includes(keyword))) {
                    return category;
                }
            }
            return 'general';
        }
        calculateJaccardSimilarity(text1, text2) {
            const set1 = new Set(text1.split(' '));
            const set2 = new Set(text2.split(' '));
            const intersection = new Set([...set1].filter(x => set2.has(x)));
            const union = new Set([...set1, ...set2]);
            return intersection.size / union.size;
        }
        calculateCosineSimilarity(text1, text2) {
            const words1 = text1.split(' ');
            const words2 = text2.split(' ');
            const allWords = [...new Set([...words1, ...words2])];
            const vector1 = allWords.map(word => words1.filter(w => w === word).length);
            const vector2 = allWords.map(word => words2.filter(w => w === word).length);
            const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
            const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
            const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
            return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
        }
        calculateLevenshteinSimilarity(text1, text2) {
            const distance = this.levenshteinDistance(text1, text2);
            const maxLength = Math.max(text1.length, text2.length);
            return maxLength > 0 ? 1 - (distance / maxLength) : 1;
        }
        levenshteinDistance(str1, str2) {
            const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
            for (let i = 0; i <= str1.length; i++)
                matrix[0][i] = i;
            for (let j = 0; j <= str2.length; j++)
                matrix[j][0] = j;
            for (let j = 1; j <= str2.length; j++) {
                for (let i = 1; i <= str1.length; i++) {
                    const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                    matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + indicator);
                }
            }
            return matrix[str2.length][str1.length];
        }
        async calculatePairConfidence(question, answer) {
            let confidence = 50;
            // Question quality
            if (this.isQuestion(question))
                confidence += 20;
            // Answer quality
            if (this.isAnswer(answer))
                confidence += 20;
            // Length appropriateness
            if (question.length >= 10 && question.length <= 200)
                confidence += 5;
            if (answer.length >= 20 && answer.length <= 1000)
                confidence += 5;
            return Math.max(1, Math.min(100, confidence));
        }
        /**
         * Calculate similarity between two texts (required by interface)
         */
        calculateSimilarity(text1, text2) {
            const normalized1 = this.normalizeText(text1);
            const normalized2 = this.normalizeText(text2);
            // Use Levenshtein similarity
            return this.calculateLevenshteinSimilarity(normalized1, normalized2);
        }
    };
    return PatternRecognitionService = _classThis;
})();
exports.PatternRecognitionService = PatternRecognitionService;
//# sourceMappingURL=pattern-recognition.service.js.map