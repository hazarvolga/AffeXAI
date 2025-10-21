"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CachingTestPage;
const react_1 = require("react");
const caching_performance_test_1 = __importDefault(require("./caching-performance-test"));
const api_test_1 = __importDefault(require("./api-test"));
function CachingTestPage() {
    const [activeTab, setActiveTab] = (0, react_1.useState)('performance');
    return (<div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Caching Test</h2>
        <p className="text-muted-foreground">
          Test the caching performance of backend services
        </p>
      </div>

      <div className="flex space-x-4 border-b">
        <button className={`pb-2 px-1 ${activeTab === 'performance' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`} onClick={() => setActiveTab('performance')}>
          Performance Test
        </button>
        <button className={`pb-2 px-1 ${activeTab === 'api' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`} onClick={() => setActiveTab('api')}>
          API Test
        </button>
      </div>

      {activeTab === 'performance' ? <caching_performance_test_1.default /> : <api_test_1.default />}
    </div>);
}
//# sourceMappingURL=page.js.map