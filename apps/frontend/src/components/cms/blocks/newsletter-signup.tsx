/**
 * Newsletter Signup Block Component
 *
 * Email subscription form with multiple layout variants.
 * Includes validation and GDPR consent checkbox.
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, CheckCircle2 } from 'lucide-react';

export type NewsletterVariant = 'minimal' | 'card' | 'full-width' | 'inline';

export interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  description?: string;
  variant?: NewsletterVariant;
  placeholder?: string;
  buttonText?: string;
  showConsent?: boolean;
  consentText?: string;
  successMessage?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  title = 'Bültenimize Abone Olun',
  subtitle = 'Güncel Kalın',
  description = 'En son haberler, güncellemeler ve özel teklifler için e-posta listemize katılın.',
  variant = 'card',
  placeholder = 'E-posta adresiniz',
  buttonText = 'Abone Ol',
  showConsent = true,
  consentText = 'E-posta almayı ve gizlilik politikasını kabul ediyorum.',
  successMessage = 'Teşekkürler! Aboneliğiniz başarıyla oluşturuldu.',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }

    if (showConsent && !consent) {
      setError('Lütfen onay kutusunu işaretleyin.');
      return;
    }

    // Simulate API call
    setSubmitted(true);
    setEmail('');
    setConsent(false);

    // Reset after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted ? (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-green-800 dark:text-green-200">{successMessage}</p>
        </div>
      ) : (
        <>
          <div className={cn(
            'flex gap-2',
            variant === 'minimal' || variant === 'inline' ? 'flex-row' : 'flex-col sm:flex-row'
          )}>
            <Input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="whitespace-nowrap">
              <Mail className="w-4 h-4 mr-2" />
              {buttonText}
            </Button>
          </div>

          {showConsent && (
            <div className="flex items-start gap-2">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
              />
              <label
                htmlFor="consent"
                className="text-sm text-muted-foreground cursor-pointer leading-tight"
              >
                {consentText}
              </label>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </>
      )}
    </form>
  );

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-secondary/5', cssClasses)}
      style={{
        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
        color: textColor !== 'inherit' ? textColor : undefined,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Minimal Variant */}
        {variant === 'minimal' && (
          <div className="max-w-2xl mx-auto text-center">
            {title && <h3 className="text-2xl font-bold mb-4">{title}</h3>}
            <FormContent />
          </div>
        )}

        {/* Card Variant */}
        {variant === 'card' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-background border border-border rounded-xl p-8 shadow-lg">
              <div className="text-center mb-6">
                {subtitle && (
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    {subtitle}
                  </p>
                )}
                {title && <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>}
                {description && <p className="text-muted-foreground">{description}</p>}
              </div>
              <FormContent />
            </div>
          </div>
        )}

        {/* Full Width Variant */}
        {variant === 'full-width' && (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                {subtitle && (
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    {subtitle}
                  </p>
                )}
                {title && <h3 className="text-3xl md:text-4xl font-bold mb-4">{title}</h3>}
                {description && <p className="text-lg text-muted-foreground">{description}</p>}
              </div>
              <div>
                <FormContent />
              </div>
            </div>
          </div>
        )}

        {/* Inline Variant */}
        {variant === 'inline' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                {title && <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>}
                {description && <p className="text-muted-foreground">{description}</p>}
              </div>
              <div className="flex-1 w-full md:w-auto">
                <FormContent />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
