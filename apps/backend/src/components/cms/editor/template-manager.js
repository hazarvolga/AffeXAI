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
exports.TemplateManager = void 0;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const dialog_1 = require("@/components/ui/dialog");
const use_toast_1 = require("@/hooks/use-toast");
const lucide_react_1 = require("lucide-react");
const TemplateManager = ({ onSaveTemplate, onLoadTemplate, currentComponents, currentLayoutOptions }) => {
    const { toast } = (0, use_toast_1.useToast)();
    const [templates, setTemplates] = (0, react_1.useState)([]);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = (0, react_1.useState)(false);
    const [newTemplate, setNewTemplate] = (0, react_1.useState)({
        name: '',
        description: '',
    });
    const [isImportDialogOpen, setIsImportDialogOpen] = (0, react_1.useState)(false);
    const [importData, setImportData] = (0, react_1.useState)('');
    const handleSaveTemplate = () => {
        if (!newTemplate.name.trim()) {
            toast({
                title: "Error",
                description: "Template name is required",
                variant: "destructive",
            });
            return;
        }
        const template = {
            name: newTemplate.name,
            description: newTemplate.description,
            components: currentComponents,
            layoutOptions: currentLayoutOptions,
        };
        onSaveTemplate(template);
        // Add to local templates list
        const newTemplateWithId = {
            ...template,
            id: `template-${Date.now()}`,
        };
        setTemplates(prev => [...prev, newTemplateWithId]);
        // Reset form
        setNewTemplate({ name: '', description: '' });
        setIsSaveDialogOpen(false);
        toast({
            title: "Template Saved",
            description: "Template has been saved successfully",
        });
    };
    const handleLoadTemplate = (template) => {
        onLoadTemplate(template);
        toast({
            title: "Template Loaded",
            description: `${template.name} has been loaded`,
        });
    };
    const handleDeleteTemplate = (id) => {
        setTemplates(prev => prev.filter(t => t.id !== id));
        toast({
            title: "Template Deleted",
            description: "Template has been deleted",
        });
    };
    const handleExportTemplates = () => {
        const jsonStr = JSON.stringify(templates, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cms-templates.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({
            title: "Templates Exported",
            description: "All templates have been exported",
        });
    };
    const handleImportTemplates = () => {
        try {
            const importedTemplates = JSON.parse(importData);
            if (Array.isArray(importedTemplates)) {
                setTemplates(importedTemplates);
                setImportData('');
                setIsImportDialogOpen(false);
                toast({
                    title: "Templates Imported",
                    description: `${importedTemplates.length} templates have been imported`,
                });
            }
            else {
                throw new Error('Invalid template format');
            }
        }
        catch (error) {
            toast({
                title: "Import Failed",
                description: "Invalid template data format",
                variant: "destructive",
            });
        }
    };
    return (<card_1.Card className="h-full flex flex-col">
      <card_1.CardHeader>
        <card_1.CardTitle>Template Manager</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <dialog_1.Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <dialog_1.DialogTrigger asChild>
                <button_1.Button>
                  <lucide_react_1.Save className="h-4 w-4 mr-2"/>
                  Save Current as Template
                </button_1.Button>
              </dialog_1.DialogTrigger>
              <dialog_1.DialogContent>
                <dialog_1.DialogHeader>
                  <dialog_1.DialogTitle>Save Template</dialog_1.DialogTitle>
                </dialog_1.DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label_1.Label htmlFor="template-name">Template Name</label_1.Label>
                    <input_1.Input id="template-name" value={newTemplate.name} onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter template name"/>
                  </div>
                  <div className="space-y-2">
                    <label_1.Label htmlFor="template-description">Description</label_1.Label>
                    <textarea_1.Textarea id="template-description" value={newTemplate.description} onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))} placeholder="Enter template description"/>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button_1.Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                      Cancel
                    </button_1.Button>
                    <button_1.Button onClick={handleSaveTemplate}>
                      Save Template
                    </button_1.Button>
                  </div>
                </div>
              </dialog_1.DialogContent>
            </dialog_1.Dialog>
            
            <dialog_1.Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <dialog_1.DialogTrigger asChild>
                <button_1.Button variant="outline">
                  <lucide_react_1.Upload className="h-4 w-4 mr-2"/>
                  Import Templates
                </button_1.Button>
              </dialog_1.DialogTrigger>
              <dialog_1.DialogContent>
                <dialog_1.DialogHeader>
                  <dialog_1.DialogTitle>Import Templates</dialog_1.DialogTitle>
                </dialog_1.DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label_1.Label htmlFor="import-data">Paste Template Data</label_1.Label>
                    <textarea_1.Textarea id="import-data" value={importData} onChange={(e) => setImportData(e.target.value)} placeholder="Paste JSON template data here" className="min-h-[200px]"/>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button_1.Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                      Cancel
                    </button_1.Button>
                    <button_1.Button onClick={handleImportTemplates}>
                      Import Templates
                    </button_1.Button>
                  </div>
                </div>
              </dialog_1.DialogContent>
            </dialog_1.Dialog>
            
            <button_1.Button variant="outline" onClick={handleExportTemplates}>
              <lucide_react_1.Download className="h-4 w-4 mr-2"/>
              Export All Templates
            </button_1.Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Saved Templates ({templates.length})</h3>
            
            {templates.length === 0 ? (<div className="text-center text-muted-foreground py-8">
                <lucide_react_1.Plus className="h-12 w-12 mx-auto text-muted-foreground/20 mb-2"/>
                <p>No templates saved yet</p>
                <p className="text-sm mt-1">Save your current layout as a template to reuse it later</p>
              </div>) : (<div className="space-y-2">
                {templates.map((template) => (<div key={template.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {template.components.length} components
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button_1.Button size="sm" onClick={() => handleLoadTemplate(template)}>
                        Load
                      </button_1.Button>
                      <button_1.Button size="sm" variant="destructive" onClick={() => handleDeleteTemplate(template.id)}>
                        <lucide_react_1.Trash2 className="h-4 w-4"/>
                      </button_1.Button>
                    </div>
                  </div>))}
              </div>)}
          </div>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
};
exports.TemplateManager = TemplateManager;
exports.default = exports.TemplateManager;
//# sourceMappingURL=template-manager.js.map