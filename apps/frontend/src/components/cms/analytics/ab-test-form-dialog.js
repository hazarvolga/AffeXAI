"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABTestFormDialog = ABTestFormDialog;
const react_1 = require("react");
const dialog_1 = require("@/components/ui/dialog");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const lucide_react_1 = require("lucide-react");
function ABTestFormDialog({ open, onOpenChange, onSubmit, editingTest, isSubmitting, }) {
    const [formData, setFormData] = (0, react_1.useState)({
        name: editingTest?.name || '',
        description: editingTest?.description || '',
        componentId: editingTest?.componentId || '',
        componentType: editingTest?.componentType || '',
        status: (editingTest?.status || 'draft'),
        periodStart: editingTest?.periodStart
            ? new Date(editingTest.periodStart).toISOString().slice(0, 16)
            : '',
        periodEnd: editingTest?.periodEnd
            ? new Date(editingTest.periodEnd).toISOString().slice(0, 16)
            : '',
        conversionGoal: editingTest?.conversionGoal || '',
    });
    const [variants, setVariants] = (0, react_1.useState)(editingTest?.variants.map((v) => ({
        name: v.name,
        description: v.description || '',
        trafficAllocation: v.trafficAllocation,
        config: JSON.stringify(v.componentConfig, null, 2),
    })) || [
        { name: 'Control', description: '', trafficAllocation: 50, config: '{}' },
        { name: 'Variant A', description: '', trafficAllocation: 50, config: '{}' },
    ]);
    const addVariant = () => {
        const remainingTraffic = 100 - variants.reduce((sum, v) => sum + v.trafficAllocation, 0);
        setVariants([
            ...variants,
            {
                name: `Variant ${String.fromCharCode(65 + variants.length - 1)}`,
                description: '',
                trafficAllocation: Math.max(0, remainingTraffic),
                config: '{}',
            },
        ]);
    };
    const removeVariant = (index) => {
        if (variants.length <= 2)
            return; // Min 2 variants
        setVariants(variants.filter((_, i) => i !== index));
    };
    const updateVariant = (index, field, value) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };
    const handleSubmit = () => {
        const totalAllocation = variants.reduce((sum, v) => sum + v.trafficAllocation, 0);
        if (totalAllocation !== 100) {
            alert('Trafik dağılımı toplamı %100 olmalıdır!');
            return;
        }
        try {
            const dto = {
                name: formData.name,
                description: formData.description || undefined,
                componentId: formData.componentId,
                componentType: formData.componentType,
                status: formData.status,
                periodStart: new Date(formData.periodStart).toISOString(),
                periodEnd: new Date(formData.periodEnd).toISOString(),
                conversionGoal: formData.conversionGoal,
                variants: variants.map((v) => ({
                    name: v.name,
                    description: v.description || undefined,
                    componentConfig: JSON.parse(v.config),
                    trafficAllocation: v.trafficAllocation,
                })),
            };
            onSubmit(dto);
        }
        catch (error) {
            alert('Variant config JSON formatında geçersiz!');
        }
    };
    const totalAllocation = variants.reduce((sum, v) => sum + v.trafficAllocation, 0);
    return (<dialog_1.Dialog open={open} onOpenChange={onOpenChange}>
      <dialog_1.DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>
            {editingTest ? 'A/B Testi Düzenle' : 'Yeni A/B Testi Oluştur'}
          </dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            Component variant'larını test edin ve en iyi performansı belirleyin
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label_1.Label htmlFor="test-name">Test Adı *</label_1.Label>
              <input_1.Input id="test-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="örn: Hero Button Color Test"/>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="conversion-goal">Dönüşüm Hedefi *</label_1.Label>
              <input_1.Input id="conversion-goal" value={formData.conversionGoal} onChange={(e) => setFormData({ ...formData, conversionGoal: e.target.value })} placeholder="örn: button_click, form_submit"/>
            </div>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="description">Açıklama</label_1.Label>
            <textarea_1.Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Test hakkında notlar..." rows={2}/>
          </div>

          {/* Component Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label_1.Label htmlFor="component-id">Component ID *</label_1.Label>
              <input_1.Input id="component-id" value={formData.componentId} onChange={(e) => setFormData({ ...formData, componentId: e.target.value })} placeholder="örn: hero-cta-button"/>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="component-type">Component Type *</label_1.Label>
              <input_1.Input id="component-type" value={formData.componentType} onChange={(e) => setFormData({ ...formData, componentType: e.target.value })} placeholder="örn: button, card, banner"/>
            </div>
          </div>

          {/* Period */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label_1.Label htmlFor="period-start">Başlangıç Tarihi *</label_1.Label>
              <input_1.Input id="period-start" type="datetime-local" value={formData.periodStart} onChange={(e) => setFormData({ ...formData, periodStart: e.target.value })}/>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="period-end">Bitiş Tarihi *</label_1.Label>
              <input_1.Input id="period-end" type="datetime-local" value={formData.periodEnd} onChange={(e) => setFormData({ ...formData, periodEnd: e.target.value })}/>
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label_1.Label>Variant'lar ({variants.length})</label_1.Label>
              <button_1.Button type="button" size="sm" variant="outline" onClick={addVariant} disabled={variants.length >= 5}>
                <lucide_react_1.Plus className="h-4 w-4 mr-1"/>
                Variant Ekle
              </button_1.Button>
            </div>

            <div className="text-sm text-muted-foreground mb-2">
              Toplam Trafik: {totalAllocation}%{' '}
              {totalAllocation !== 100 && (<span className="text-destructive font-medium">(100% olmalı!)</span>)}
            </div>

            {variants.map((variant, index) => (<div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Variant {index + 1}</h4>
                  {variants.length > 2 && (<button_1.Button type="button" size="sm" variant="ghost" onClick={() => removeVariant(index)}>
                      <lucide_react_1.Trash2 className="h-4 w-4 text-destructive"/>
                    </button_1.Button>)}
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-2">
                    <label_1.Label>Variant Adı</label_1.Label>
                    <input_1.Input value={variant.name} onChange={(e) => updateVariant(index, 'name', e.target.value)} placeholder="Control, A, B..."/>
                  </div>

                  <div className="space-y-2">
                    <label_1.Label>Trafik %</label_1.Label>
                    <input_1.Input type="number" min="0" max="100" value={variant.trafficAllocation} onChange={(e) => updateVariant(index, 'trafficAllocation', parseInt(e.target.value) || 0)}/>
                  </div>

                  <div className="space-y-2">
                    <label_1.Label>Açıklama</label_1.Label>
                    <input_1.Input value={variant.description} onChange={(e) => updateVariant(index, 'description', e.target.value)} placeholder="Opsiyonel..."/>
                  </div>
                </div>

                <div className="space-y-2">
                  <label_1.Label>Config (JSON)</label_1.Label>
                  <textarea_1.Textarea value={variant.config} onChange={(e) => updateVariant(index, 'config', e.target.value)} placeholder='{"color": "blue", "size": "large"}' rows={3} className="font-mono text-xs"/>
                </div>
              </div>))}
          </div>
        </div>

        <dialog_1.DialogFooter>
          <button_1.Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            İptal
          </button_1.Button>
          <button_1.Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Kaydediliyor...' : editingTest ? 'Güncelle' : 'Oluştur'}
          </button_1.Button>
        </dialog_1.DialogFooter>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
//# sourceMappingURL=ab-test-form-dialog.js.map