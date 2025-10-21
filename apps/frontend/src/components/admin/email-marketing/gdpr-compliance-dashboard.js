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
exports.default = GdprComplianceDashboard;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const alert_1 = require("@/components/ui/alert");
const progress_1 = require("@/components/ui/progress");
const lucide_react_1 = require("lucide-react");
function GdprComplianceDashboard() {
    const [complianceReport, setComplianceReport] = (0, react_1.useState)(null);
    const [dataSubjectRequests, setDataSubjectRequests] = (0, react_1.useState)([]);
    const [consentRecords, setConsentRecords] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [activeTab, setActiveTab] = (0, react_1.useState)('overview');
    (0, react_1.useEffect)(() => {
        loadComplianceData();
    }, []);
    const loadComplianceData = async () => {
        try {
            setLoading(true);
            // Load compliance report
            const reportResponse = await fetch('/api/email-marketing/gdpr/compliance-report');
            if (reportResponse.ok) {
                const report = await reportResponse.json();
                setComplianceReport(report.data);
            }
            // Load data subject requests (mock data for now)
            setDataSubjectRequests([
                {
                    id: '1',
                    email: 'user@example.com',
                    requestType: 'ACCESS',
                    requestDate: new Date('2024-01-15'),
                    status: 'COMPLETED',
                    completionDate: new Date('2024-01-16')
                },
                {
                    id: '2',
                    email: 'another@example.com',
                    requestType: 'ERASURE',
                    requestDate: new Date('2024-01-20'),
                    status: 'PENDING'
                }
            ]);
            // Load consent records (mock data for now)
            setConsentRecords([
                {
                    id: '1',
                    email: 'user@example.com',
                    consentType: 'EMAIL_MARKETING',
                    consentStatus: 'GIVEN',
                    consentDate: new Date('2024-01-10'),
                    consentMethod: 'EXPLICIT_OPT_IN',
                    legalBasis: 'CONSENT'
                }
            ]);
        }
        catch (error) {
            console.error('Failed to load compliance data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDataRetentionCleanup = async () => {
        try {
            const response = await fetch('/api/email-marketing/gdpr/data-retention/cleanup', {
                method: 'POST'
            });
            if (response.ok) {
                const result = await response.json();
                alert(`Cleanup completed: ${result.data.deletedRecords} deleted, ${result.data.anonymizedRecords} anonymized`);
                loadComplianceData();
            }
        }
        catch (error) {
            console.error('Failed to perform cleanup:', error);
            alert('Cleanup failed. Please try again.');
        }
    };
    const handleDataSubjectRequest = async (email, requestType) => {
        try {
            const response = await fetch(`/api/email-marketing/gdpr/data-subject-request/${requestType.toLowerCase()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                const result = await response.json();
                alert(`${requestType} request processed successfully`);
                loadComplianceData();
            }
        }
        catch (error) {
            console.error(`Failed to process ${requestType} request:`, error);
            alert(`${requestType} request failed. Please try again.`);
        }
    };
    const getRiskLevelColor = (level) => {
        switch (level) {
            case 'LOW': return 'text-green-600 bg-green-100';
            case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
            case 'HIGH': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED': return 'text-green-600 bg-green-100';
            case 'PENDING': return 'text-yellow-600 bg-yellow-100';
            case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100';
            case 'REJECTED': return 'text-red-600 bg-red-100';
            case 'EXPIRED': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };
    if (loading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading compliance data...</p>
        </div>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">GDPR Compliance Dashboard</h1>
          <p className="text-gray-600">Monitor and manage data protection compliance</p>
        </div>
        <button_1.Button onClick={loadComplianceData} variant="outline">
          Refresh Data
        </button_1.Button>
      </div>

      <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab}>
        <tabs_1.TabsList className="grid w-full grid-cols-4">
          <tabs_1.TabsTrigger value="overview">Overview</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="requests">Data Subject Requests</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="consent">Consent Management</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="actions">Actions</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="overview" className="space-y-6">
          {complianceReport && (<>
              {/* Compliance Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <card_1.Card>
                  <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <card_1.CardTitle className="text-sm font-medium">Total Subscribers</card_1.CardTitle>
                    <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    <div className="text-2xl font-bold">{complianceReport.totalSubscribers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {complianceReport.consentedSubscribers} with valid consent
                    </p>
                  </card_1.CardContent>
                </card_1.Card>

                <card_1.Card>
                  <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <card_1.CardTitle className="text-sm font-medium">Consent Rate</card_1.CardTitle>
                    <lucide_react_1.CheckCircle className="h-4 w-4 text-muted-foreground"/>
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round((complianceReport.consentedSubscribers / complianceReport.totalSubscribers) * 100)}%
                    </div>
                    <progress_1.Progress value={(complianceReport.consentedSubscribers / complianceReport.totalSubscribers) * 100} className="mt-2"/>
                  </card_1.CardContent>
                </card_1.Card>

                <card_1.Card>
                  <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <card_1.CardTitle className="text-sm font-medium">Pending Requests</card_1.CardTitle>
                    <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    <div className="text-2xl font-bold">{complianceReport.pendingRequests}</div>
                    <p className="text-xs text-muted-foreground">
                      {complianceReport.completedRequests} completed
                    </p>
                  </card_1.CardContent>
                </card_1.Card>

                <card_1.Card>
                  <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <card_1.CardTitle className="text-sm font-medium">Risk Level</card_1.CardTitle>
                    <lucide_react_1.Shield className="h-4 w-4 text-muted-foreground"/>
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    <badge_1.Badge className={getRiskLevelColor(complianceReport.riskAssessment.level)}>
                      {complianceReport.riskAssessment.level}
                    </badge_1.Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      {complianceReport.riskAssessment.issues.length} issues identified
                    </p>
                  </card_1.CardContent>
                </card_1.Card>
              </div>

              {/* Risk Assessment */}
              {complianceReport.riskAssessment.issues.length > 0 && (<alert_1.Alert>
                  <lucide_react_1.AlertTriangle className="h-4 w-4"/>
                  <alert_1.AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">Compliance Issues Detected:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {complianceReport.riskAssessment.issues.map((issue, index) => (<li key={index} className="text-sm">{issue}</li>))}
                      </ul>
                    </div>
                  </alert_1.AlertDescription>
                </alert_1.Alert>)}

              {/* Data Retention Status */}
              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle>Data Retention Compliance</card_1.CardTitle>
                  <card_1.CardDescription>
                    Monitor data retention policies and scheduled cleanups
                  </card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Expired Records</span>
                    <badge_1.Badge variant="outline">
                      {complianceReport.dataRetentionCompliance.expiredRecords}
                    </badge_1.Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Scheduled Deletions</span>
                    <badge_1.Badge variant="outline">
                      {complianceReport.dataRetentionCompliance.scheduledDeletions}
                    </badge_1.Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Anonymized Records</span>
                    <badge_1.Badge variant="outline">
                      {complianceReport.anonymizationStats.anonymizedRecords}
                    </badge_1.Badge>
                  </div>
                </card_1.CardContent>
              </card_1.Card>
            </>)}
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="requests" className="space-y-6">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Data Subject Requests</card_1.CardTitle>
              <card_1.CardDescription>
                Track and manage GDPR data subject requests
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {dataSubjectRequests.map((request) => (<div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{request.email}</span>
                        <badge_1.Badge variant="outline">{request.requestType}</badge_1.Badge>
                        <badge_1.Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </badge_1.Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Requested: {request.requestDate.toLocaleDateString()}
                        {request.completionDate && (<span> • Completed: {request.completionDate.toLocaleDateString()}</span>)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button_1.Button size="sm" variant="outline">
                        <lucide_react_1.Eye className="h-4 w-4 mr-1"/>
                        View
                      </button_1.Button>
                      {request.status === 'PENDING' && (<button_1.Button size="sm" variant="outline">
                          Process
                        </button_1.Button>)}
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="consent" className="space-y-6">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Consent Records</card_1.CardTitle>
              <card_1.CardDescription>
                View and manage subscriber consent records
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {consentRecords.map((record) => (<div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{record.email}</span>
                        <badge_1.Badge variant="outline">{record.consentType}</badge_1.Badge>
                        <badge_1.Badge className={record.consentStatus === 'GIVEN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {record.consentStatus}
                        </badge_1.Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {record.consentMethod} • {record.legalBasis} • {record.consentDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button_1.Button size="sm" variant="outline">
                        <lucide_react_1.Eye className="h-4 w-4 mr-1"/>
                        Details
                      </button_1.Button>
                      {record.consentStatus === 'GIVEN' && (<button_1.Button size="sm" variant="outline">
                          Withdraw
                        </button_1.Button>)}
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Data Retention Actions</card_1.CardTitle>
                <card_1.CardDescription>
                  Perform automated data retention cleanup
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <button_1.Button onClick={handleDataRetentionCleanup} className="w-full">
                  <lucide_react_1.Trash2 className="h-4 w-4 mr-2"/>
                  Run Data Retention Cleanup
                </button_1.Button>
                <p className="text-sm text-gray-600">
                  This will delete or anonymize expired records according to your retention policies.
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Compliance Reports</card_1.CardTitle>
                <card_1.CardDescription>
                  Generate and download compliance reports
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <button_1.Button variant="outline" className="w-full">
                  <lucide_react_1.Download className="h-4 w-4 mr-2"/>
                  Download Compliance Report
                </button_1.Button>
                <button_1.Button variant="outline" className="w-full">
                  <lucide_react_1.FileText className="h-4 w-4 mr-2"/>
                  Export Consent Records
                </button_1.Button>
                <button_1.Button variant="outline" className="w-full">
                  <lucide_react_1.Users className="h-4 w-4 mr-2"/>
                  Export Data Subject Requests
                </button_1.Button>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Manual Data Subject Requests</card_1.CardTitle>
                <card_1.CardDescription>
                  Process individual data subject requests
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <div className="space-y-2">
                  <input type="email" placeholder="Enter email address" className="w-full px-3 py-2 border rounded-md" id="manual-request-email"/>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button_1.Button size="sm" variant="outline" onClick={() => {
            const email = document.getElementById('manual-request-email')?.value;
            if (email)
                handleDataSubjectRequest(email, 'ACCESS');
        }}>
                    <lucide_react_1.Eye className="h-4 w-4 mr-1"/>
                    Access Request
                  </button_1.Button>
                  <button_1.Button size="sm" variant="outline" onClick={() => {
            const email = document.getElementById('manual-request-email')?.value;
            if (email)
                handleDataSubjectRequest(email, 'ERASURE');
        }}>
                    <lucide_react_1.UserX className="h-4 w-4 mr-1"/>
                    Erasure Request
                  </button_1.Button>
                  <button_1.Button size="sm" variant="outline" onClick={() => {
            const email = document.getElementById('manual-request-email')?.value;
            if (email)
                handleDataSubjectRequest(email, 'PORTABILITY');
        }}>
                    <lucide_react_1.Download className="h-4 w-4 mr-1"/>
                    Data Portability
                  </button_1.Button>
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
//# sourceMappingURL=gdpr-compliance-dashboard.js.map