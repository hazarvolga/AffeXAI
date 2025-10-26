'use server';

import { z } from 'zod';

// Type definition for ticket priority (no longer importing from ticketsService)
type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

const FormSchema = z.object({
  title: z.string().min(10, 'Başlık en az 10 karakter olmalıdır.'),
  problemDescription: z.string().min(50, 'Lütfen sorununuzu en az 50 karakterle açıklayın.'),
  category: z.string().min(1, 'Lütfen bir kategori seçin.'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
});

export type FormState = {
  step: 1 | 2;
  message: string;
  creating?: boolean;
  ticketCreated?: boolean;
  ticketId?: string;
  originalInput?: {
    title: string;
    problemDescription: string;
    category: string;
    priority: string;
  };
  data?: {
    summary: string;
    priority: string;
    suggestion: string;
  };
};

export async function analyzeSupportTicket(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const action = formData.get('action');

  // Step 2: Go back to edit
  if (action === 'back') {
    return {
      step: 1,
      message: '',
      originalInput: prevState.originalInput
    };
  }

  // Step 2: Create ticket in backend
  if (action === 'create_ticket') {
    try {
      const title = formData.get('title') as string;
      const description = formData.get('problemDescription') as string;
      const categoryId = formData.get('category') as string;
      const priority = formData.get('priority') as string;
      const aiSummary = formData.get('summary') as string;

      // Create ticket in backend using direct fetch (Server Action compatible)
      // TODO: Get actual userId from session/cookies instead of hardcoded value
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006/api';
      const response = await fetch(`${backendUrl}/tickets/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description: `${description}\n\n---\n**AI Analiz Özeti:** ${aiSummary}`,
          priority,
          categoryId,
          userId: '96962301-ae83-404b-9697-8ed4a0d8fb2f', // TODO: Replace with actual userId from session
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `Backend API error: ${response.status}`);
      }

      const ticket = await response.json();
      console.log('✅ Ticket created successfully:', ticket.id);

      return {
        step: 2,
        message: 'Destek talebiniz başarıyla oluşturuldu!',
        ticketCreated: true,
        ticketId: ticket.id,
        originalInput: prevState.originalInput,
        data: prevState.data,
      };
    } catch (error: any) {
      console.error('❌ Error creating ticket:', error);
      return {
        step: 2,
        message: `Ticket oluşturulurken hata: ${error.message || 'Bilinmeyen hata'}`,
        originalInput: prevState.originalInput,
        data: prevState.data,
      };
    }
  }

  // Step 1: Validate and run AI analysis
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    problemDescription: formData.get('problemDescription'),
    category: formData.get('category'),
    priority: formData.get('priority'),
  });

  if (!validatedFields.success) {
    return {
      step: 1,
      message: validatedFields.error.errors.map(e => e.message).join(', '),
    };
  }

  try {
    // Call backend API for AI analysis using fetch (Server Action compatible)
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006/api';
    const response = await fetch(`${backendUrl}/tickets/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: validatedFields.data.title,
        problemDescription: validatedFields.data.problemDescription,
        category: validatedFields.data.category,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const result = await response.json();

    return {
      step: 2,
      message: 'Analiz başarılı!',
      originalInput: validatedFields.data,
      data: result.data, // Extract data from backend response wrapper
    };
  } catch (error: any) {
    console.error('AI analysis failed:', error);
    return {
      step: 1,
      message: 'AI analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
    };
  }
}
