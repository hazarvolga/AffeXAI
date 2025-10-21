"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeSupportTicket = analyzeSupportTicket;
const support_ticket_analysis_1 = require("@/ai/flows/support-ticket-analysis");
const zod_1 = require("zod");
const FormSchema = zod_1.z.object({
    problemDescription: zod_1.z.string().min(50, 'Lütfen sorununuzu en az 50 karakterle açıklayın.'),
    category: zod_1.z.string().min(1, 'Lütfen bir kategori seçin.'),
});
async function analyzeSupportTicket(prevState, formData) {
    const action = formData.get('action');
    if (action === 'back') {
        return {
            step: 1,
            message: '',
            originalInput: prevState.originalInput
        };
    }
    if (action === 'create_ticket') {
        // In a real app, you would save the ticket to the database here.
        // For now, we'll just log it and redirect.
        console.log("Creating ticket with AI analysis:", {
            description: formData.get('problemDescription'),
            category: formData.get('category'),
            summary: formData.get('summary'),
            priority: formData.get('priority'),
        });
        // Normally we would redirect to the new ticket page.
        // redirect(`/portal/support/tkt-new`);
        return { step: 1, message: 'Destek talebiniz başarıyla oluşturuldu!' };
    }
    const validatedFields = FormSchema.safeParse({
        problemDescription: formData.get('problemDescription'),
        category: formData.get('category'),
    });
    if (!validatedFields.success) {
        return {
            step: 1,
            message: validatedFields.error.errors.map(e => e.message).join(', '),
        };
    }
    try {
        const result = await (0, support_ticket_analysis_1.analyzeSupportTicket)({
            problemDescription: validatedFields.data.problemDescription,
            category: validatedFields.data.category,
        });
        return {
            step: 2,
            message: 'Analiz başarılı!',
            originalInput: validatedFields.data,
            data: result,
        };
    }
    catch (error) {
        console.error('AI analysis failed:', error);
        return {
            step: 1,
            message: 'AI analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
        };
    }
}
//# sourceMappingURL=actions.js.map