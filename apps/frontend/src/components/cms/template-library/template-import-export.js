"use strict";
/**
 * TemplateImportExport Component
 *
 * Import and export templates in JSON format
 * Includes validation and error handling
 */
'use client';
/**
 * TemplateImportExport Component
 *
 * Import and export templates in JSON format
 * Includes validation and error handling
 */
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
exports.TemplateImportExport = TemplateImportExport;
exports.TemplateImportExportModal = TemplateImportExportModal;
const react_1 = __importStar(require("react"));
const DesignTokensProvider_1 = require("@/providers/DesignTokensProvider");
const token_validator_1 = require("@/lib/cms/token-validator");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const alert_1 = require("@/components/ui/alert");
const textarea_1 = require("@/components/ui/textarea");
const badge_1 = require("@/components/ui/badge");
const dialog_1 = require("@/components/ui/dialog");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
/**
 * Export template to JSON file
 */
function exportTemplateToFile(template, filename) {
    const json = JSON.stringify(template, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `template-${template.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
/**
 * Export multiple templates as bundle
 */
function exportTemplateBundle(templates, filename) {
    const bundle = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        templates: templates,
    };
    const json = JSON.stringify(bundle, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `template-bundle-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
/**
 * Parse and validate imported template JSON
 */
function parseTemplateJSON(json) {
    const errors = [];
    try {
        const parsed = JSON.parse(json);
        // Check if it's a template bundle
        if (parsed.templates && Array.isArray(parsed.templates)) {
            // For now, just take the first template
            if (parsed.templates.length === 0) {
                errors.push('Template bundle is empty');
                return { errors };
            }
            return parseTemplateJSON(JSON.stringify(parsed.templates[0]));
        }
        // Validate required fields
        if (!parsed.id)
            errors.push('Missing required field: id');
        if (!parsed.name)
            errors.push('Missing required field: name');
        if (!parsed.category)
            errors.push('Missing required field: category');
        if (!parsed.blocks || !Array.isArray(parsed.blocks)) {
            errors.push('Missing or invalid field: blocks (must be an array)');
        }
        if (!parsed.designSystem) {
            errors.push('Missing required field: designSystem');
        }
        else {
            if (!parsed.designSystem.supportedContexts || !Array.isArray(parsed.designSystem.supportedContexts)) {
                errors.push('designSystem.supportedContexts must be an array');
            }
            if (!parsed.designSystem.colorScheme) {
                errors.push('designSystem.colorScheme is required');
            }
        }
        if (errors.length > 0) {
            return { errors };
        }
        // Ensure dates are Date objects
        const template = {
            ...parsed,
            createdAt: new Date(parsed.createdAt || Date.now()),
            updatedAt: new Date(parsed.updatedAt || Date.now()),
        };
        return { template, errors: [] };
    }
    catch (error) {
        errors.push(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return { errors };
    }
}
/**
 * Template Export Component
 */
function TemplateExport({ templates = [] }) {
    const [selectedTemplates, setSelectedTemplates] = (0, react_1.useState)(new Set());
    const { toast } = (0, use_toast_1.useToast)();
    const handleSelectTemplate = (templateId) => {
        const newSelection = new Set(selectedTemplates);
        if (newSelection.has(templateId)) {
            newSelection.delete(templateId);
        }
        else {
            newSelection.add(templateId);
        }
        setSelectedTemplates(newSelection);
    };
    const handleExportSelected = () => {
        const templatesToExport = templates.filter((t) => selectedTemplates.has(t.id));
        if (templatesToExport.length === 0) {
            toast({
                title: 'No templates selected',
                description: 'Please select at least one template to export',
                variant: 'destructive',
            });
            return;
        }
        if (templatesToExport.length === 1) {
            exportTemplateToFile(templatesToExport[0]);
            toast({
                title: 'Template exported',
                description: `${templatesToExport[0].name} exported successfully`,
            });
        }
        else {
            exportTemplateBundle(templatesToExport);
            toast({
                title: 'Templates exported',
                description: `${templatesToExport.length} templates exported as bundle`,
            });
        }
    };
    const handleExportSingle = (template) => {
        exportTemplateToFile(template);
        toast({
            title: 'Template exported',
            description: `${template.name} exported successfully`,
        });
    };
    return (<div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Export Templates</h3>
          <p className="text-sm text-muted-foreground">
            {selectedTemplates.size} template{selectedTemplates.size !== 1 ? 's' : ''} selected
          </p>
        </div>
        <button_1.Button onClick={handleExportSelected} disabled={selectedTemplates.size === 0}>
          <lucide_react_1.Download className="h-4 w-4 mr-2"/>
          Export Selected
        </button_1.Button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {templates.map((template) => (<card_1.Card key={template.id} className={`cursor-pointer transition-colors ${selectedTemplates.has(template.id) ? 'ring-2 ring-primary' : ''}`} onClick={() => handleSelectTemplate(template.id)}>
            <card_1.CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <card_1.CardTitle className="text-base">{template.name}</card_1.CardTitle>
                  <card_1.CardDescription className="text-xs">
                    {template.blocks.length} blocks · {template.category}
                  </card_1.CardDescription>
                </div>
                <div className="flex gap-2">
                  <badge_1.Badge variant="outline" className="text-xs">
                    v{template.version}
                  </badge_1.Badge>
                  <button_1.Button size="sm" variant="ghost" onClick={(e) => {
                e.stopPropagation();
                handleExportSingle(template);
            }}>
                    <lucide_react_1.Download className="h-3 w-3"/>
                  </button_1.Button>
                </div>
              </div>
            </card_1.CardHeader>
          </card_1.Card>))}
      </div>
    </div>);
}
/**
 * Template Import Component
 */
function TemplateImport({ onImport }) {
    const [importMethod, setImportMethod] = (0, react_1.useState)('file');
    const [jsonInput, setJsonInput] = (0, react_1.useState)('');
    const [validationResult, setValidationResult] = (0, react_1.useState)(null);
    const fileInputRef = (0, react_1.useRef)(null);
    const { tokens } = (0, DesignTokensProvider_1.useDesignTokens)();
    const { toast } = (0, use_toast_1.useToast)();
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            validateAndPreview(content);
        };
        reader.readAsText(file);
    };
    const validateAndPreview = (json) => {
        const { template, errors: parseErrors } = parseTemplateJSON(json);
        if (!template) {
            setValidationResult({ parseErrors });
            return;
        }
        // Validate tokens
        const tokenValidation = (0, token_validator_1.validateTemplateTokens)(template, tokens);
        const safety = (0, token_validator_1.checkTemplateSafety)(template, tokens);
        setValidationResult({
            template,
            parseErrors,
            tokenValidation,
            safety,
        });
    };
    const handleImport = () => {
        if (!validationResult?.template) {
            toast({
                title: 'Import failed',
                description: 'No valid template to import',
                variant: 'destructive',
            });
            return;
        }
        if (!validationResult.safety?.isSafe) {
            toast({
                title: 'Import warning',
                description: 'Template has missing tokens but will be imported',
                variant: 'destructive',
            });
        }
        onImport?.(validationResult.template);
        toast({
            title: 'Template imported',
            description: `${validationResult.template.name} imported successfully`,
        });
        // Reset
        setJsonInput('');
        setValidationResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const handleCopyToClipboard = () => {
        if (validationResult?.template) {
            const json = JSON.stringify(validationResult.template, null, 2);
            navigator.clipboard.writeText(json);
            toast({
                title: 'Copied',
                description: 'Template JSON copied to clipboard',
            });
        }
    };
    return (<div className="space-y-4">
      <tabs_1.Tabs value={importMethod} onValueChange={(v) => setImportMethod(v)}>
        <tabs_1.TabsList className="grid w-full grid-cols-2">
          <tabs_1.TabsTrigger value="file">
            <lucide_react_1.FileJson className="h-4 w-4 mr-2"/>
            Upload File
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="json">
            <lucide_react_1.FileText className="h-4 w-4 mr-2"/>
            Paste JSON
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="file" className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden"/>
            <lucide_react_1.Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground"/>
            <h3 className="font-medium mb-2">Upload Template JSON</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click to browse or drag and drop
            </p>
            <button_1.Button onClick={() => fileInputRef.current?.click()}>
              Choose File
            </button_1.Button>
          </div>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="json" className="space-y-4">
          <div className="space-y-2">
            <textarea_1.Textarea placeholder="Paste template JSON here..." value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} rows={10} className="font-mono text-xs"/>
            <button_1.Button onClick={() => validateAndPreview(jsonInput)} className="w-full">
              Validate & Preview
            </button_1.Button>
          </div>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>

      {/* Validation Results */}
      {validationResult && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="text-lg flex items-center gap-2">
              {validationResult.parseErrors.length === 0 ? (<>
                  <lucide_react_1.CheckCircle className="h-5 w-5 text-green-600"/>
                  Validation Results
                </>) : (<>
                  <lucide_react_1.AlertCircle className="h-5 w-5 text-destructive"/>
                  Validation Errors
                </>)}
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            {/* Parse Errors */}
            {validationResult.parseErrors.length > 0 && (<alert_1.Alert variant="destructive">
                <lucide_react_1.AlertCircle className="h-4 w-4"/>
                <alert_1.AlertTitle>Parse Errors</alert_1.AlertTitle>
                <alert_1.AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {validationResult.parseErrors.map((error, index) => (<li key={index} className="text-sm">{error}</li>))}
                  </ul>
                </alert_1.AlertDescription>
              </alert_1.Alert>)}

            {/* Template Info */}
            {validationResult.template && (<>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Name</div>
                    <div className="font-medium">{validationResult.template.name}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Category</div>
                    <badge_1.Badge>{validationResult.template.category}</badge_1.Badge>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Blocks</div>
                    <div className="font-medium">{validationResult.template.blocks.length}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Contexts</div>
                    <div className="flex gap-1">
                      {validationResult.template.designSystem.supportedContexts.map((ctx) => (<badge_1.Badge key={ctx} variant="outline" className="text-xs">{ctx}</badge_1.Badge>))}
                    </div>
                  </div>
                </div>

                {/* Token Validation */}
                {validationResult.tokenValidation && !validationResult.tokenValidation.isValid && (<alert_1.Alert variant="destructive">
                    <lucide_react_1.AlertCircle className="h-4 w-4"/>
                    <alert_1.AlertTitle>Token Validation Issues</alert_1.AlertTitle>
                    <alert_1.AlertDescription>
                      <ul className="list-disc list-inside space-y-1">
                        {validationResult.tokenValidation.errors.slice(0, 3).map((error, index) => (<li key={index} className="text-sm">{error.message}</li>))}
                      </ul>
                    </alert_1.AlertDescription>
                  </alert_1.Alert>)}

                {/* Safety Check */}
                {validationResult.safety && !validationResult.safety.isSafe && (<alert_1.Alert>
                    <lucide_react_1.AlertCircle className="h-4 w-4"/>
                    <alert_1.AlertTitle>Missing Tokens</alert_1.AlertTitle>
                    <alert_1.AlertDescription>
                      <p className="text-sm mb-2">
                        {validationResult.safety.missingTokens.length} token(s) not found in current theme
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {validationResult.safety.recommendations.map((rec, index) => (<li key={index} className="text-sm">{rec}</li>))}
                      </ul>
                    </alert_1.AlertDescription>
                  </alert_1.Alert>)}

                {/* Actions */}
                <div className="flex gap-2">
                  <button_1.Button onClick={handleImport} className="flex-1">
                    <lucide_react_1.Upload className="h-4 w-4 mr-2"/>
                    Import Template
                  </button_1.Button>
                  <button_1.Button variant="outline" onClick={handleCopyToClipboard}>
                    <lucide_react_1.Copy className="h-4 w-4 mr-2"/>
                    Copy JSON
                  </button_1.Button>
                </div>
              </>)}
          </card_1.CardContent>
        </card_1.Card>)}
    </div>);
}
/**
 * Main TemplateImportExport Component
 */
function TemplateImportExport({ onImport, templates = [] }) {
    const [activeTab, setActiveTab] = (0, react_1.useState)('import');
    return (<div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Import & Export Templates</h2>
        <p className="text-muted-foreground">
          Share templates as JSON files
        </p>
      </div>

      <tabs_1.Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
        <tabs_1.TabsList className="grid w-full grid-cols-2">
          <tabs_1.TabsTrigger value="import">
            <lucide_react_1.Upload className="h-4 w-4 mr-2"/>
            Import
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="export">
            <lucide_react_1.Download className="h-4 w-4 mr-2"/>
            Export
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="import">
          <TemplateImport onImport={onImport}/>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="export">
          <TemplateExport templates={templates}/>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
/**
 * Template Import/Export Dialog Modal
 */
function TemplateImportExportModal({ open, onOpenChange, onImport, templates = [], }) {
    return (<dialog_1.Dialog open={open} onOpenChange={onOpenChange}>
      <dialog_1.DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Import & Export Templates</dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            Share templates across projects or with team members
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>
        <TemplateImportExport onImport={onImport} templates={templates}/>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
//# sourceMappingURL=template-import-export.js.map