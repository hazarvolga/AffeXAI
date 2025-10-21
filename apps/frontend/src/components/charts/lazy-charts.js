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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = exports.Pie = exports.PieChart = exports.Bar = exports.BarChart = exports.CartesianGrid = exports.Line = exports.Legend = exports.Tooltip = exports.YAxis = exports.XAxis = exports.ResponsiveContainer = exports.LineChart = void 0;
const dynamic_1 = __importDefault(require("next/dynamic"));
const skeleton_1 = require("@/components/loading/skeleton");
// Lazy load Recharts components - they are heavy
exports.LineChart = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.LineChart })), {
    loading: () => <skeleton_1.Skeleton className="h-[300px] w-full"/>,
    ssr: false,
});
exports.ResponsiveContainer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.ResponsiveContainer })), {
    loading: () => <skeleton_1.Skeleton className="h-[300px] w-full"/>,
    ssr: false,
});
exports.XAxis = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.XAxis })), { ssr: false });
exports.YAxis = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.YAxis })), { ssr: false });
exports.Tooltip = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.Tooltip })), { ssr: false });
exports.Legend = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.Legend })), { ssr: false });
exports.Line = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.Line })), { ssr: false });
exports.CartesianGrid = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.CartesianGrid })), { ssr: false });
exports.BarChart = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.BarChart })), {
    loading: () => <skeleton_1.Skeleton className="h-[300px] w-full"/>,
    ssr: false,
});
exports.Bar = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.Bar })), { ssr: false });
exports.PieChart = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.PieChart })), {
    loading: () => <skeleton_1.Skeleton className="h-[300px] w-full"/>,
    ssr: false,
});
exports.Pie = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.Pie })), { ssr: false });
exports.Cell = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('recharts'))).then(mod => ({ default: mod.Cell })), { ssr: false });
//# sourceMappingURL=lazy-charts.js.map