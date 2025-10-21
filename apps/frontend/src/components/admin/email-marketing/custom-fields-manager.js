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
exports.default = CustomFieldsManager;
const react_1 = __importStar(require("react"));
const auth_1 = require("@/lib/auth");
const http_client_1 = require("@/lib/api/http-client");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const checkbox_1 = require("@/components/ui/checkbox");
const textarea_1 = require("@/components/ui/textarea");
const badge_1 = require("@/components/ui/badge");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const useCustomFields_1 = require("@/hooks/useCustomFields");
const fieldTypeIcons = {
    TEXT: lucide_react_1.Type,
    NUMBER: lucide_react_1.Hash,
    DATE: lucide_react_1.Calendar,
    BOOLEAN: lucide_react_1.ToggleLeft,
    SELECT: lucide_react_1.List,
    MULTI_SELECT: lucide_react_1.CheckSquare
};
const fieldTypeLabels = {
    TEXT: 'Metin',
    NUMBER: 'Sayı',
    DATE: 'Tarih',
    BOOLEAN: 'Evet/Hayır',
    SELECT: 'Seçim Listesi',
    MULTI_SELECT: 'Çoklu Seçim'
};
function CustomFieldsManager() {
    const { isAuthenticated, isLoading: authLoading } = (0, auth_1.useAuth)();
    const { customFields, loading, error, createCustomField, updateCustomField, deleteCustomField, reorderCustomFields } = (0, useCustomFields_1.useCustomFields)();
    const [isCreating, setIsCreating] = (0, react_1.useState)(false);
    const [editingField, setEditingField] = (0, react_1.useState)(null);
    const [formData, setFormData] = (0, react_1.useState)({
        name: '',
        label: '',
        type: 'TEXT',
        description: '',
        required: false,
        options: [],
        defaultValue: '',
        placeholder: '',
        validation: {}
    });
    const [formError, setFormError] = (0, react_1.useState)(null);
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const resetForm = () => {
        setFormData({
            name: '',
            label: '',
            type: 'TEXT',
            description: '',
            required: false,
            options: [],
            defaultValue: '',
            placeholder: '',
            validation: {}
        });
        setFormError(null);
    };
    const handleCreate = () => {
        resetForm();
        setIsCreating(true);
        setEditingField(null);
    };
    const handleEdit = (field) => {
        setFormData({
            name: field.name,
            label: field.label,
            type: field.type,
            description: field.description || '',
            required: field.required,
            options: field.options || [],
            defaultValue: field.defaultValue || '',
            placeholder: field.placeholder || '',
            validation: field.validation || {}
        });
        setEditingField(field);
        setIsCreating(true);
    };
    const handleCancel = () => {
        setIsCreating(false);
        setEditingField(null);
        resetForm();
    };
    const validateForm = () => {
        if (!formData.name.trim()) {
            setFormError('Alan adı gereklidir');
            return false;
        }
        if (!formData.label.trim()) {
            setFormError('Alan etiketi gereklidir');
            return false;
        }
        // Validate field name format (alphanumeric and underscore only)
        if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(formData.name)) {
            setFormError('Alan adı sadece harf, rakam ve alt çizgi içerebilir ve harf ile başlamalıdır');
            return false;
        }
        // Check for duplicate names (excluding current field when editing)
        const existingField = customFields.find(field => field.name === formData.name && field.id !== editingField?.id);
        if (existingField) {
            setFormError('Bu alan adı zaten kullanılıyor');
            return false;
        }
        // Validate options for SELECT types
        if (['SELECT', 'MULTI_SELECT'].includes(formData.type)) {
            if (formData.options.length === 0) {
                setFormError('Seçim listesi türleri için en az bir seçenek gereklidir');
                return false;
            }
        }
        return true;
    };
    const handleSubmit = async () => {
        if (!validateForm())
            return;
        setIsSubmitting(true);
        setFormError(null);
        try {
            if (editingField) {
                await updateCustomField(editingField.id, formData);
            }
            else {
                await createCustomField(formData);
            }
            handleCancel();
        }
        catch (err) {
            setFormError(err instanceof Error ? err.message : 'Bilinmeyen hata oluştu');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleDelete = async (field) => {
        if (!confirm(`"${field.label}" alanını silmek istediğinizden emin misiniz?`)) {
            return;
        }
        try {
            await deleteCustomField(field.id);
        }
        catch (err) {
            alert(err instanceof Error ? err.message : 'Silme işlemi başarısız');
        }
    };
    const handleOptionsChange = (value) => {
        const options = value.split('\n').filter(opt => opt.trim()).map(opt => opt.trim());
        setFormData(prev => ({ ...prev, options }));
    };
    const renderFieldForm = () => (<card_1.Card className="mb-6">
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.Settings className="h-5 w-5"/>
          {editingField ? 'Özel Alan Düzenle' : 'Yeni Özel Alan'}
        </card_1.CardTitle>
        <card_1.CardDescription>
          Aboneleriniz için özel veri alanları tanımlayın
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label_1.Label htmlFor="field-name">Alan Adı *</label_1.Label>
            <input_1.Input id="field-name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="ornek_alan" disabled={isSubmitting}/>
            <p className="text-xs text-muted-foreground mt-1">
              Sadece harf, rakam ve alt çizgi kullanın
            </p>
          </div>

          <div>
            <label_1.Label htmlFor="field-label">Alan Etiketi *</label_1.Label>
            <input_1.Input id="field-label" value={formData.label} onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))} placeholder="Örnek Alan" disabled={isSubmitting}/>
          </div>
        </div>

        <div>
          <label_1.Label htmlFor="field-type">Alan Türü</label_1.Label>
          <select_1.Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))} disabled={isSubmitting}>
            <select_1.SelectTrigger>
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              {Object.entries(fieldTypeLabels).map(([value, label]) => {
            const Icon = fieldTypeIcons[value];
            return (<select_1.SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4"/>
                      {label}
                    </div>
                  </select_1.SelectItem>);
        })}
            </select_1.SelectContent>
          </select_1.Select>
        </div>

        <div>
          <label_1.Label htmlFor="field-description">Açıklama</label_1.Label>
          <textarea_1.Textarea id="field-description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Bu alan hakkında açıklama..." disabled={isSubmitting}/>
        </div>

        {['SELECT', 'MULTI_SELECT'].includes(formData.type) && (<div>
            <label_1.Label htmlFor="field-options">Seçenekler *</label_1.Label>
            <textarea_1.Textarea id="field-options" value={formData.options.join('\n')} onChange={(e) => handleOptionsChange(e.target.value)} placeholder="Her satıra bir seçenek yazın" disabled={isSubmitting}/>
            <p className="text-xs text-muted-foreground mt-1">
              Her satıra bir seçenek yazın
            </p>
          </div>)}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label_1.Label htmlFor="field-placeholder">Placeholder</label_1.Label>
            <input_1.Input id="field-placeholder" value={formData.placeholder} onChange={(e) => setFormData(prev => ({ ...prev, placeholder: e.target.value }))} placeholder="Kullanıcıya gösterilecek ipucu" disabled={isSubmitting}/>
          </div>

          <div>
            <label_1.Label htmlFor="field-default">Varsayılan Değer</label_1.Label>
            <input_1.Input id="field-default" value={formData.defaultValue} onChange={(e) => setFormData(prev => ({ ...prev, defaultValue: e.target.value }))} placeholder="Varsayılan değer" disabled={isSubmitting}/>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <checkbox_1.Checkbox id="field-required" checked={formData.required} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, required: checked }))} disabled={isSubmitting}/>
          <label_1.Label htmlFor="field-required">Zorunlu alan</label_1.Label>
        </div>

        {formError && (<alert_1.Alert variant="destructive">
            <lucide_react_1.AlertCircle className="h-4 w-4"/>
            <alert_1.AlertDescription>{formError}</alert_1.AlertDescription>
          </alert_1.Alert>)}

        <div className="flex gap-2 pt-4">
          <button_1.Button onClick={handleSubmit} disabled={isSubmitting}>
            <lucide_react_1.Save className="h-4 w-4 mr-2"/>
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button_1.Button>
          <button_1.Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            <lucide_react_1.X className="h-4 w-4 mr-2"/>
            İptal
          </button_1.Button>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
    // Auth check
    if (authLoading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Yetkilendirme kontrol ediliyor...</p>
        </div>
      </div>);
    }
    if (!isAuthenticated) {
        // Debug info
        const debugInfo = {
            localStorage_auth_token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
            localStorage_aluplan_access_token: typeof window !== 'undefined' ? localStorage.getItem('aluplan_access_token') : null,
            localStorage_keys: typeof window !== 'undefined' ? Object.keys(localStorage) : [],
            httpClient_token: http_client_1.httpClient.getAuthToken(),
        };
        console.log('🔐 Debug - Auth state:', debugInfo);
        return (<div className="flex items-center justify-center h-64">
        <div className="text-center">
          <lucide_react_1.AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4"/>
          <h3 className="text-lg font-semibold mb-2">Giriş Gerekli</h3>
          <p className="text-muted-foreground mb-4">Bu sayfayı görüntülemek için giriş yapmanız gerekiyor.</p>
          
          {/* Debug info */}
          <div className="text-xs text-left bg-gray-100 p-2 rounded mb-4 max-w-md">
            <strong>Debug Info:</strong><br />
            localStorage auth_token: {debugInfo.localStorage_auth_token ? 'EXISTS' : 'MISSING'}<br />
            localStorage aluplan_access_token: {debugInfo.localStorage_aluplan_access_token ? 'EXISTS' : 'MISSING'}<br />
            httpClient token: {debugInfo.httpClient_token ? 'EXISTS' : 'MISSING'}<br />
            localStorage keys: {debugInfo.localStorage_keys.join(', ')}
          </div>
          
          <div className="space-y-2">
            <button_1.Button onClick={() => window.location.href = '/login'}>
              Giriş Yap
            </button_1.Button>
            <button_1.Button variant="outline" onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
            }}>
              Oturumu Temizle
            </button_1.Button>
            <button_1.Button variant="outline" onClick={() => {
                // Try to manually set token from localStorage
                const token = localStorage.getItem('auth_token') || localStorage.getItem('aluplan_access_token');
                if (token) {
                    http_client_1.httpClient.setAuthToken(token);
                    window.location.reload();
                }
                else {
                    alert('Token bulunamadı');
                }
            }}>
              Token'ı Yenile
            </button_1.Button>
          </div>
        </div>
      </div>);
    }
    if (loading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Özel alanlar yükleniyor...</p>
        </div>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Özel Alanlar</h2>
          <p className="text-muted-foreground">
            Aboneleriniz için özel alanlar tanımlayın
          </p>
        </div>
        {!isCreating && (<button_1.Button onClick={handleCreate}>
            <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
            Yeni Alan
          </button_1.Button>)}
      </div>

      {error && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
        </alert_1.Alert>)}

      {isCreating && renderFieldForm()}

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Mevcut Özel Alanlar</card_1.CardTitle>
          <card_1.CardDescription>
            {customFields.length} özel alan tanımlanmış
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          {customFields.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
              <lucide_react_1.Settings className="h-12 w-12 mx-auto mb-4 opacity-50"/>
              <p>Henüz özel alan tanımlanmamış</p>
              <p className="text-sm">Yeni alan eklemek için yukarıdaki butonu kullanın</p>
            </div>) : (<div className="space-y-3">
              {customFields.map((field) => {
                const Icon = fieldTypeIcons[field.type];
                return (<div key={field.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <lucide_react_1.GripVertical className="h-4 w-4 text-muted-foreground cursor-move"/>
                      <Icon className="h-5 w-5 text-muted-foreground"/>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{field.label}</span>
                          <badge_1.Badge variant="outline" className="text-xs">
                            {fieldTypeLabels[field.type]}
                          </badge_1.Badge>
                          {field.required && (<badge_1.Badge variant="secondary" className="text-xs">
                              Zorunlu
                            </badge_1.Badge>)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <code className="bg-muted px-1 rounded text-xs">{field.name}</code>
                          {field.description && (<span className="ml-2">{field.description}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button_1.Button size="sm" variant="outline" onClick={() => handleEdit(field)}>
                        <lucide_react_1.Edit className="h-4 w-4"/>
                      </button_1.Button>
                      <button_1.Button size="sm" variant="outline" onClick={() => handleDelete(field)}>
                        <lucide_react_1.Trash2 className="h-4 w-4"/>
                      </button_1.Button>
                    </div>
                  </div>);
            })}
            </div>)}
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=custom-fields-manager.js.map