"use strict";
/**
 * API Module
 *
 * Barrel export for all API-related exports.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeProfile = exports.abTestService = exports.ipReputationService = exports.emailValidationService = exports.certificatesService = exports.subscribersService = exports.eventsService = exports.segmentsService = exports.groupsService = exports.templatesService = exports.emailMarketingService = exports.emailCampaignsService = exports.settingsService = exports.mediaService = exports.ticketsService = exports.rolesService = exports.usersService = exports.hasPagination = exports.isListResponse = exports.getPrevPage = exports.getNextPage = exports.hasMorePages = exports.calculatePagination = exports.paginatedResponse = exports.errorResponse = exports.successResponse = exports.getErrorCode = exports.getErrorMessage = exports.createErrorFromResponse = exports.unwrapListResponse = exports.unwrapResponseOr = exports.unwrapResponse = exports.isErrorResponse = exports.isSuccessResponse = exports.BaseApiService = exports.authService = exports.ApiError = exports.HttpClient = exports.httpClient = void 0;
// HTTP Client
var http_client_1 = require("./http-client");
Object.defineProperty(exports, "httpClient", { enumerable: true, get: function () { return http_client_1.httpClient; } });
Object.defineProperty(exports, "HttpClient", { enumerable: true, get: function () { return http_client_1.HttpClient; } });
Object.defineProperty(exports, "ApiError", { enumerable: true, get: function () { return http_client_1.ApiError; } });
// Auth Service
var authService_1 = require("./authService");
Object.defineProperty(exports, "authService", { enumerable: true, get: function () { return authService_1.authService; } });
// Base Service
var base_service_1 = require("./base-service");
Object.defineProperty(exports, "BaseApiService", { enumerable: true, get: function () { return base_service_1.BaseApiService; } });
// Response Utilities
var response_utils_1 = require("./response-utils");
Object.defineProperty(exports, "isSuccessResponse", { enumerable: true, get: function () { return response_utils_1.isSuccessResponse; } });
Object.defineProperty(exports, "isErrorResponse", { enumerable: true, get: function () { return response_utils_1.isErrorResponse; } });
Object.defineProperty(exports, "unwrapResponse", { enumerable: true, get: function () { return response_utils_1.unwrapResponse; } });
Object.defineProperty(exports, "unwrapResponseOr", { enumerable: true, get: function () { return response_utils_1.unwrapResponseOr; } });
Object.defineProperty(exports, "unwrapListResponse", { enumerable: true, get: function () { return response_utils_1.unwrapListResponse; } });
Object.defineProperty(exports, "createErrorFromResponse", { enumerable: true, get: function () { return response_utils_1.createErrorFromResponse; } });
Object.defineProperty(exports, "getErrorMessage", { enumerable: true, get: function () { return response_utils_1.getErrorMessage; } });
Object.defineProperty(exports, "getErrorCode", { enumerable: true, get: function () { return response_utils_1.getErrorCode; } });
Object.defineProperty(exports, "successResponse", { enumerable: true, get: function () { return response_utils_1.successResponse; } });
Object.defineProperty(exports, "errorResponse", { enumerable: true, get: function () { return response_utils_1.errorResponse; } });
Object.defineProperty(exports, "paginatedResponse", { enumerable: true, get: function () { return response_utils_1.paginatedResponse; } });
Object.defineProperty(exports, "calculatePagination", { enumerable: true, get: function () { return response_utils_1.calculatePagination; } });
Object.defineProperty(exports, "hasMorePages", { enumerable: true, get: function () { return response_utils_1.hasMorePages; } });
Object.defineProperty(exports, "getNextPage", { enumerable: true, get: function () { return response_utils_1.getNextPage; } });
Object.defineProperty(exports, "getPrevPage", { enumerable: true, get: function () { return response_utils_1.getPrevPage; } });
Object.defineProperty(exports, "isListResponse", { enumerable: true, get: function () { return response_utils_1.isListResponse; } });
Object.defineProperty(exports, "hasPagination", { enumerable: true, get: function () { return response_utils_1.hasPagination; } });
// Services
var usersService_1 = require("./usersService");
Object.defineProperty(exports, "usersService", { enumerable: true, get: function () { return usersService_1.usersService; } });
var rolesService_1 = require("./rolesService");
Object.defineProperty(exports, "rolesService", { enumerable: true, get: function () { return rolesService_1.rolesService; } });
var ticketsService_1 = require("./ticketsService");
Object.defineProperty(exports, "ticketsService", { enumerable: true, get: function () { return ticketsService_1.ticketsService; } });
var mediaService_1 = require("./mediaService");
Object.defineProperty(exports, "mediaService", { enumerable: true, get: function () { return mediaService_1.mediaService; } });
var settingsService_1 = require("./settingsService");
Object.defineProperty(exports, "settingsService", { enumerable: true, get: function () { return settingsService_1.settingsService; } });
var emailCampaignsService_1 = require("./emailCampaignsService");
Object.defineProperty(exports, "emailCampaignsService", { enumerable: true, get: function () { return emailCampaignsService_1.emailCampaignsService; } });
var emailMarketingService_1 = require("./emailMarketingService");
Object.defineProperty(exports, "emailMarketingService", { enumerable: true, get: function () { return emailMarketingService_1.emailMarketingService; } });
var templatesService_1 = require("./templatesService");
Object.defineProperty(exports, "templatesService", { enumerable: true, get: function () { return templatesService_1.templatesService; } });
var groupsService_1 = require("./groupsService");
Object.defineProperty(exports, "groupsService", { enumerable: true, get: function () { return groupsService_1.groupsService; } });
var segmentsService_1 = require("./segmentsService");
Object.defineProperty(exports, "segmentsService", { enumerable: true, get: function () { return segmentsService_1.segmentsService; } });
var eventsService_1 = require("./eventsService");
Object.defineProperty(exports, "eventsService", { enumerable: true, get: function () { return eventsService_1.eventsService; } });
var subscribersService_1 = require("./subscribersService");
Object.defineProperty(exports, "subscribersService", { enumerable: true, get: function () { return subscribersService_1.subscribersService; } });
var certificatesService_1 = require("./certificatesService");
Object.defineProperty(exports, "certificatesService", { enumerable: true, get: function () { return certificatesService_1.certificatesService; } });
var emailValidationService_1 = require("./emailValidationService");
Object.defineProperty(exports, "emailValidationService", { enumerable: true, get: function () { return emailValidationService_1.emailValidationService; } });
var ipReputationService_1 = require("./ipReputationService");
Object.defineProperty(exports, "ipReputationService", { enumerable: true, get: function () { return ipReputationService_1.ipReputationService; } });
var abTestService_1 = require("./abTestService");
Object.defineProperty(exports, "abTestService", { enumerable: true, get: function () { return abTestService_1.abTestService; } });
// Profile Service
var profileService_1 = require("./profileService");
Object.defineProperty(exports, "completeProfile", { enumerable: true, get: function () { return profileService_1.completeProfile; } });
//# sourceMappingURL=index.js.map