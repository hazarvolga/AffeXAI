"use strict";
'use client';
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
exports.WebVitalsReporter = WebVitalsReporter;
const react_1 = require("react");
const web_vitals_1 = require("@/lib/performance/web-vitals");
const metrics_1 = require("@/lib/performance/metrics");
/**
 * Web Vitals Reporter Component
 *
 * Automatically tracks and reports Web Vitals metrics.
 * Add this component to your root layout to enable monitoring.
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * import { WebVitalsReporter } from '@/components/performance/web-vitals-reporter';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <WebVitalsReporter />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
function WebVitalsReporter() {
    (0, react_1.useEffect)(() => {
        // Dynamically import web-vitals to avoid including it in the main bundle
        Promise.resolve().then(() => __importStar(require('web-vitals'))).then(({ onFCP, onLCP, onCLS, onTTFB, onINP }) => {
            // Track all Core Web Vitals
            onFCP((metric) => {
                (0, web_vitals_1.reportWebVitals)(metric);
                metrics_1.metricsStore.add('FCP', metric.value);
            });
            onLCP((metric) => {
                (0, web_vitals_1.reportWebVitals)(metric);
                metrics_1.metricsStore.add('LCP', metric.value);
            });
            onCLS((metric) => {
                (0, web_vitals_1.reportWebVitals)(metric);
                metrics_1.metricsStore.add('CLS', metric.value);
            });
            onTTFB((metric) => {
                (0, web_vitals_1.reportWebVitals)(metric);
                metrics_1.metricsStore.add('TTFB', metric.value);
            });
            onINP((metric) => {
                (0, web_vitals_1.reportWebVitals)(metric);
                metrics_1.metricsStore.add('INP', metric.value);
            });
            // Note: FID is deprecated in favor of INP in web-vitals v4
        });
    }, []);
    // This component doesn't render anything
    return null;
}
//# sourceMappingURL=web-vitals-reporter.js.map