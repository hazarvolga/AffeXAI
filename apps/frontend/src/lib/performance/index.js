"use strict";
/**
 * Performance Module
 *
 * Web Vitals tracking, performance monitoring, and metrics collection.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePerformanceReport = exports.getResourceSummary = exports.getResourceTimings = exports.logPerformanceSummary = exports.getDashboardData = exports.metricsStore = exports.PERFORMANCE_BUDGETS = exports.formatMetricValue = exports.getMetricRating = exports.PerformanceMonitor = exports.performanceMonitor = exports.getAllWebVitals = exports.reportWebVitals = void 0;
// Web Vitals
var web_vitals_1 = require("./web-vitals");
Object.defineProperty(exports, "reportWebVitals", { enumerable: true, get: function () { return web_vitals_1.reportWebVitals; } });
Object.defineProperty(exports, "getAllWebVitals", { enumerable: true, get: function () { return web_vitals_1.getAllWebVitals; } });
Object.defineProperty(exports, "performanceMonitor", { enumerable: true, get: function () { return web_vitals_1.performanceMonitor; } });
Object.defineProperty(exports, "PerformanceMonitor", { enumerable: true, get: function () { return web_vitals_1.PerformanceMonitor; } });
Object.defineProperty(exports, "getMetricRating", { enumerable: true, get: function () { return web_vitals_1.getMetricRating; } });
Object.defineProperty(exports, "formatMetricValue", { enumerable: true, get: function () { return web_vitals_1.formatMetricValue; } });
Object.defineProperty(exports, "PERFORMANCE_BUDGETS", { enumerable: true, get: function () { return web_vitals_1.PERFORMANCE_BUDGETS; } });
// Metrics
var metrics_1 = require("./metrics");
Object.defineProperty(exports, "metricsStore", { enumerable: true, get: function () { return metrics_1.metricsStore; } });
Object.defineProperty(exports, "getDashboardData", { enumerable: true, get: function () { return metrics_1.getDashboardData; } });
Object.defineProperty(exports, "logPerformanceSummary", { enumerable: true, get: function () { return metrics_1.logPerformanceSummary; } });
Object.defineProperty(exports, "getResourceTimings", { enumerable: true, get: function () { return metrics_1.getResourceTimings; } });
Object.defineProperty(exports, "getResourceSummary", { enumerable: true, get: function () { return metrics_1.getResourceSummary; } });
Object.defineProperty(exports, "generatePerformanceReport", { enumerable: true, get: function () { return metrics_1.generatePerformanceReport; } });
//# sourceMappingURL=index.js.map