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
exports.AdvancedEmailValidationService = void 0;
const common_1 = require("@nestjs/common");
const dns = __importStar(require("dns"));
const net = __importStar(require("net"));
let AdvancedEmailValidationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AdvancedEmailValidationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AdvancedEmailValidationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        cacheService;
        ipReputationService;
        logger = new common_1.Logger(AdvancedEmailValidationService.name);
        disposableDomains = new Set([
            'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwawaymail.com',
            '10minutemail.com', 'yopmail.com', 'temp-mail.org', 'maildrop.cc'
        ]);
        roleAccounts = new Set([
            'admin', 'info', 'support', 'sales', 'contact', 'help', 'service',
            'webmaster', 'postmaster', 'hostmaster', 'abuse'
        ]);
        commonTypos = new Map([
            ['gmial.com', 'gmail.com'],
            ['gamil.com', 'gmail.com'],
            ['gmal.com', 'gmail.com'],
            ['hotmial.com', 'hotmail.com'],
            ['hotmal.com', 'hotmail.com'],
            ['yaho.com', 'yahoo.com'],
            ['outloo.com', 'outlook.com'],
            ['iclou.com', 'icloud.com']
        ]);
        constructor(cacheService, ipReputationService) {
            this.cacheService = cacheService;
            this.ipReputationService = ipReputationService;
        }
        /**
         * Main validation method that runs all checks
         * @param email The email address to validate
         * @param senderIp Optional IP address of the sender for reputation checking
         * @returns Detailed validation result with confidence score
         */
        async validateEmail(email, senderIp) {
            try {
                // Check cache first
                const cacheKey = senderIp
                    ? `email_validation_${email}_${senderIp}`
                    : `email_validation_${email}`;
                const cachedResult = await this.cacheService.get(cacheKey);
                if (cachedResult) {
                    return cachedResult;
                }
                // 1. Syntactic validation
                const syntaxCheck = this.validateSyntax(email);
                if (!syntaxCheck.isValid) {
                    const result = {
                        email,
                        isValid: false,
                        status: 'invalid',
                        confidence: 0,
                        checks: {
                            syntax: syntaxCheck,
                            domain: { isValid: false, details: 'Syntax validation failed' },
                            mx: { isValid: false, details: 'Syntax validation failed' }
                        }
                    };
                    await this.cacheService.set(cacheKey, result, 3600); // Cache for 1 hour
                    return result;
                }
                // 2. Extract domain and local part
                const [localPart, domain] = email.split('@');
                // 3. Domain validation
                const domainCheck = await this.validateDomain(domain);
                if (!domainCheck.isValid) {
                    const result = {
                        email,
                        isValid: false,
                        status: 'invalid',
                        confidence: 20,
                        checks: {
                            syntax: syntaxCheck,
                            domain: domainCheck,
                            mx: { isValid: false, details: 'Domain validation failed' }
                        }
                    };
                    await this.cacheService.set(cacheKey, result, 3600);
                    return result;
                }
                // 4. MX record check
                const mxCheck = await this.checkMXRecords(domain);
                if (!mxCheck.isValid) {
                    const result = {
                        email,
                        isValid: false,
                        status: 'invalid',
                        confidence: 30,
                        checks: {
                            syntax: syntaxCheck,
                            domain: domainCheck,
                            mx: mxCheck
                        }
                    };
                    await this.cacheService.set(cacheKey, result, 3600);
                    return result;
                }
                // 5. Advanced checks
                const disposableCheck = this.checkDisposable(domain);
                const roleAccountCheck = this.checkRoleAccount(localPart);
                const typoCheck = this.checkTypos(domain);
                // 6. IP reputation check (if provided)
                let ipReputationCheck;
                if (senderIp) {
                    const ipResult = await this.ipReputationService.checkIpReputation(senderIp);
                    // Convert IP reputation result to match our interface
                    let reputation = 'unknown';
                    if (ipResult.reputation === 'clean') {
                        reputation = 'good';
                    }
                    else if (ipResult.reputation === 'listed') {
                        reputation = 'poor';
                    }
                    else {
                        reputation = 'unknown';
                    }
                    ipReputationCheck = {
                        isValid: ipResult.reputation !== 'listed',
                        details: ipResult.details,
                        reputation: reputation,
                        confidence: ipResult.confidence
                    };
                }
                // 7. Domain reputation check
                const domainReputationResult = await this.ipReputationService.checkDomainReputation(domain);
                const domainReputationCheck = {
                    isValid: domainReputationResult.reputation !== 'poor',
                    details: domainReputationResult.details,
                    reputation: domainReputationResult.reputation,
                    confidence: domainReputationResult.confidence
                };
                // 8. Calculate confidence score
                const confidence = this.calculateConfidence({
                    syntax: syntaxCheck,
                    domain: domainCheck,
                    mx: mxCheck,
                    disposable: disposableCheck,
                    roleAccount: roleAccountCheck,
                    typo: typoCheck,
                    ipReputation: ipReputationCheck,
                    domainReputation: domainReputationCheck
                });
                // 9. Determine status
                let status = 'valid';
                if (confidence < 30) {
                    status = 'invalid';
                }
                else if (confidence < 70) {
                    status = 'risky';
                }
                const result = {
                    email,
                    isValid: status !== 'invalid',
                    status,
                    confidence,
                    checks: {
                        syntax: syntaxCheck,
                        domain: domainCheck,
                        mx: mxCheck,
                        disposable: disposableCheck,
                        roleAccount: roleAccountCheck,
                        typo: typoCheck,
                        ipReputation: ipReputationCheck,
                        domainReputation: domainReputationCheck
                    }
                };
                // Cache result
                await this.cacheService.set(cacheKey, result, 3600);
                return result;
            }
            catch (error) {
                this.logger.error(`Email validation failed for ${email}:`, error);
                return {
                    email,
                    isValid: false,
                    status: 'unknown',
                    confidence: 0,
                    error: error.message
                };
            }
        }
        /**
         * Validates email syntax using RFC 5322 compliant regex
         */
        validateSyntax(email) {
            // More comprehensive regex for email validation
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            const isValid = emailRegex.test(email) && email.length <= 254;
            return {
                isValid,
                details: isValid ? 'Valid email format' : 'Invalid email format'
            };
        }
        /**
         * Validates domain existence
         */
        async validateDomain(domain) {
            try {
                // Check cache first
                const cached = await this.cacheService.get(`domain_check_${domain}`);
                if (cached !== undefined) {
                    return {
                        isValid: cached,
                        details: cached ? 'Domain exists' : 'Domain does not exist'
                    };
                }
                // Perform DNS lookup
                await new Promise((resolve, reject) => {
                    dns.lookup(domain, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                });
                // Cache positive result for 24 hours
                await this.cacheService.set(`domain_check_${domain}`, true, 86400);
                return {
                    isValid: true,
                    details: 'Domain exists'
                };
            }
            catch (error) {
                // Cache negative result for 1 hour
                await this.cacheService.set(`domain_check_${domain}`, false, 3600);
                return {
                    isValid: false,
                    details: `Domain lookup failed: ${error.message}`
                };
            }
        }
        /**
         * Checks MX records for the domain
         */
        async checkMXRecords(domain) {
            try {
                // Check cache first
                const cached = await this.cacheService.get(`mx_check_${domain}`);
                if (cached !== undefined) {
                    return {
                        isValid: cached.length > 0,
                        details: cached.length > 0 ? `Found ${cached.length} MX records` : 'No MX records found'
                    };
                }
                // Perform MX lookup
                const mxRecords = await new Promise((resolve, reject) => {
                    dns.resolveMx(domain, (err, addresses) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(addresses || []);
                        }
                    });
                });
                // Sort by priority
                mxRecords.sort((a, b) => a.priority - b.priority);
                // Cache result for 24 hours
                await this.cacheService.set(`mx_check_${domain}`, mxRecords, 86400);
                return {
                    isValid: mxRecords.length > 0,
                    details: mxRecords.length > 0 ? `Found ${mxRecords.length} MX records` : 'No MX records found'
                };
            }
            catch (error) {
                return {
                    isValid: false,
                    details: `MX record lookup failed: ${error.message}`
                };
            }
        }
        /**
         * Checks if domain is disposable/temporary
         */
        checkDisposable(domain) {
            const isDisposable = this.disposableDomains.has(domain.toLowerCase());
            return {
                isValid: !isDisposable,
                details: isDisposable ? 'Disposable email domain detected' : 'Not a disposable domain'
            };
        }
        /**
         * Checks if email is a role account
         */
        checkRoleAccount(localPart) {
            const isRoleAccount = this.roleAccounts.has(localPart.toLowerCase());
            return {
                isValid: !isRoleAccount,
                details: isRoleAccount ? 'Role-based email address detected' : 'Not a role-based address'
            };
        }
        /**
         * Checks for common typos in domain names
         */
        checkTypos(domain) {
            const lowerDomain = domain.toLowerCase();
            if (this.commonTypos.has(lowerDomain)) {
                const suggestion = this.commonTypos.get(lowerDomain);
                return {
                    isValid: false,
                    details: 'Common typo detected',
                    suggestion
                };
            }
            return {
                isValid: true,
                details: 'No common typos detected'
            };
        }
        /**
         * Calculates confidence score based on all checks
         */
        calculateConfidence(checks) {
            let score = 100;
            // Deduct points for failed checks
            if (!checks.syntax.isValid)
                score -= 100;
            if (!checks.domain.isValid)
                score -= 50;
            if (!checks.mx.isValid)
                score -= 40;
            if (!checks.disposable.isValid)
                score -= 30;
            if (!checks.roleAccount.isValid)
                score -= 20;
            if (!checks.typo.isValid)
                score -= 25;
            // IP reputation impact (more severe for poor reputation)
            if (checks.ipReputation) {
                if (checks.ipReputation.reputation === 'poor')
                    score -= 40;
                else if (checks.ipReputation.reputation === 'neutral')
                    score -= 20;
            }
            // Domain reputation impact
            if (checks.domainReputation) {
                if (checks.domainReputation.reputation === 'poor')
                    score -= 35;
                else if (checks.domainReputation.isSuspicious)
                    score -= 20;
            }
            // Ensure score is between 0 and 100
            return Math.max(0, Math.min(100, score));
        }
        /**
         * Optional SMTP verification (use with caution)
         * WARNING: This can be slow and may be blocked by mail servers
         */
        async verifySMTP(domain, email) {
            try {
                // Get MX records
                const mxRecords = await new Promise((resolve, reject) => {
                    dns.resolveMx(domain, (err, addresses) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(addresses || []);
                        }
                    });
                });
                if (mxRecords.length === 0) {
                    return {
                        isValid: false,
                        details: 'No MX records found for SMTP verification'
                    };
                }
                // Sort by priority and try the highest priority server
                mxRecords.sort((a, b) => a.priority - b.priority);
                const mxRecord = mxRecords[0];
                // Connect to SMTP server
                const socket = new net.Socket();
                const timeout = 10000; // 10 seconds
                const result = await new Promise((resolve) => {
                    let stage = 0;
                    let response = '';
                    const cleanup = () => {
                        socket.removeAllListeners();
                        socket.destroy();
                    };
                    socket.setTimeout(timeout, () => {
                        cleanup();
                        resolve({
                            isValid: false,
                            details: 'SMTP connection timeout'
                        });
                    });
                    socket.on('error', (err) => {
                        cleanup();
                        resolve({
                            isValid: false,
                            details: `SMTP connection error: ${err.message}`
                        });
                    });
                    socket.on('data', (data) => {
                        response += data.toString();
                        if (response.includes('\n')) {
                            const lines = response.trim().split('\n');
                            const lastLine = lines[lines.length - 1];
                            if (stage === 0 && lastLine.startsWith('220')) {
                                // Send HELO
                                socket.write('HELO example.com\r\n');
                                stage = 1;
                                response = '';
                            }
                            else if (stage === 1 && lastLine.startsWith('250')) {
                                // Send MAIL FROM
                                socket.write('MAIL FROM: <test@example.com>\r\n');
                                stage = 2;
                                response = '';
                            }
                            else if (stage === 2 && lastLine.startsWith('250')) {
                                // Send RCPT TO
                                socket.write(`RCPT TO: <${email}>\r\n`);
                                stage = 3;
                                response = '';
                            }
                            else if (stage === 3) {
                                // Final response
                                cleanup();
                                const isValid = lastLine.startsWith('250');
                                resolve({
                                    isValid,
                                    details: isValid ? 'Email address accepted by server' : 'Email address rejected by server'
                                });
                            }
                            else if (lastLine.startsWith('4') || lastLine.startsWith('5')) {
                                // Error response
                                cleanup();
                                resolve({
                                    isValid: false,
                                    details: `SMTP server error: ${lastLine}`
                                });
                            }
                        }
                    });
                    socket.connect(25, mxRecord.exchange);
                });
                return result;
            }
            catch (error) {
                return {
                    isValid: false,
                    details: `SMTP verification failed: ${error.message}`
                };
            }
        }
    };
    return AdvancedEmailValidationService = _classThis;
})();
exports.AdvancedEmailValidationService = AdvancedEmailValidationService;
//# sourceMappingURL=advanced-email-validation.service.js.map