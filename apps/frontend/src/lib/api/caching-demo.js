"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCachingDemo = runCachingDemo;
const usersService_1 = __importDefault(require("./usersService"));
const eventsService_1 = __importDefault(require("./eventsService"));
const emailCampaignsService_1 = __importDefault(require("./emailCampaignsService"));
/**
 * Demo script to show caching performance difference
 * Run this in a browser console or as a test to see the difference
 * between cached and uncached requests
 */
async function runCachingDemo() {
    console.log('🚀 Starting Caching Performance Demo');
    console.log('=====================================');
    // Test users service
    console.log('\n1. Testing Users Service:');
    const startTime1 = performance.now();
    const users1 = await usersService_1.default.getAll();
    const endTime1 = performance.now();
    console.log(`   First request: ${Math.round(endTime1 - startTime1)}ms (${users1.length} users)`);
    // Second request should be faster (cached)
    const startTime2 = performance.now();
    const users2 = await usersService_1.default.getAll();
    const endTime2 = performance.now();
    console.log(`   Second request: ${Math.round(endTime2 - startTime2)}ms (${users2.length} users)`);
    if (endTime2 - startTime2 < endTime1 - startTime1) {
        console.log('   ✅ Second request was faster (cached!)');
    }
    else {
        console.log('   ⚠️  Second request was not faster (might not be cached yet)');
    }
    // Test events service
    console.log('\n2. Testing Events Service:');
    const startTime3 = performance.now();
    const events1 = await eventsService_1.default.getAll();
    const endTime3 = performance.now();
    console.log(`   First request: ${Math.round(endTime3 - startTime3)}ms (${events1.length} events)`);
    // Second request should be faster (cached)
    const startTime4 = performance.now();
    const events2 = await eventsService_1.default.getAll();
    const endTime4 = performance.now();
    console.log(`   Second request: ${Math.round(endTime4 - startTime4)}ms (${events2.length} events)`);
    if (endTime4 - startTime4 < endTime3 - startTime3) {
        console.log('   ✅ Second request was faster (cached!)');
    }
    else {
        console.log('   ⚠️  Second request was not faster (might not be cached yet)');
    }
    // Test email campaigns service
    console.log('\n3. Testing Email Campaigns Service:');
    const startTime5 = performance.now();
    const campaigns1 = await emailCampaignsService_1.default.getAll();
    const endTime5 = performance.now();
    console.log(`   First request: ${Math.round(endTime5 - startTime5)}ms (${campaigns1.length} campaigns)`);
    // Second request should be faster (cached)
    const startTime6 = performance.now();
    const campaigns2 = await emailCampaignsService_1.default.getAll();
    const endTime6 = performance.now();
    console.log(`   Second request: ${Math.round(endTime6 - startTime6)}ms (${campaigns2.length} campaigns)`);
    if (endTime6 - startTime6 < endTime5 - startTime5) {
        console.log('   ✅ Second request was faster (cached!)');
    }
    else {
        console.log('   ⚠️  Second request was not faster (might not be cached yet)');
    }
    console.log('\n=====================================');
    console.log('💡 Caching Performance Demo Complete');
    console.log('   - First requests hit the database');
    console.log('   - Subsequent requests within TTL use cache');
    console.log('   - Cache TTL: 30-60 seconds depending on data type');
    console.log('   - Cache is invalidated on create/update/delete operations');
}
// Run the demo automatically when the module is imported
// runCachingDemo();
exports.default = {
    runCachingDemo
};
//# sourceMappingURL=caching-demo.js.map