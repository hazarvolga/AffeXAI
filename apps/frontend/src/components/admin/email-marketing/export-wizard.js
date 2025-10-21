"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportWizard = ExportWizard;
const react_1 = require("react");
const export_configuration_1 = require("./export-configuration");
const export_progress_tracker_1 = require("./export-progress-tracker");
const export_history_1 = require("./export-history");
function ExportWizard({ onComplete, onCancel }) {
    const [currentStep, setCurrentStep] = (0, react_1.useState)('configure');
    const [currentJob, setCurrentJob] = (0, react_1.useState)(null);
    const handleExportStart = (job) => {
        setCurrentJob(job);
        setCurrentStep('progress');
    };
    const handleExportComplete = (job) => {
        setCurrentJob(job);
        onComplete?.(job);
    };
    const handleViewHistory = () => {
        setCurrentStep('history');
    };
    const handleViewJob = (job) => {
        setCurrentJob(job);
        setCurrentStep('progress');
    };
    const handleNewExport = () => {
        setCurrentJob(null);
        setCurrentStep('configure');
    };
    const handleCancel = () => {
        setCurrentJob(null);
        setCurrentStep('configure');
        onCancel?.();
    };
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'configure':
                return (<export_configuration_1.ExportConfiguration onComplete={handleExportStart} onCancel={handleCancel}/>);
            case 'progress':
                return currentJob ? (<export_progress_tracker_1.ExportProgressTracker job={currentJob} onComplete={handleExportComplete} onCancel={handleCancel} onNewExport={handleNewExport}/>) : (<div className="text-center py-8">
            <p className="text-muted-foreground">Dışa aktarma işi bulunamadı.</p>
          </div>);
            case 'history':
                return (<export_history_1.ExportHistory onViewJob={handleViewJob} onNewExport={handleNewExport}/>);
            default:
                return null;
        }
    };
    return (<div className="space-y-6">
      {/* Navigation */}
      {currentStep !== 'configure' && (<div className="flex items-center gap-4 pb-4 border-b">
          <button onClick={handleNewExport} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Yeni Dışa Aktarma
          </button>
          <span className="text-muted-foreground">•</span>
          <button onClick={handleViewHistory} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Geçmiş
          </button>
        </div>)}

      {renderCurrentStep()}
    </div>);
}
//# sourceMappingURL=export-wizard.js.map