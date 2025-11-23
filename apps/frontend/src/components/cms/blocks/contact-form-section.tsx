/**
 * Contact Form Section Block Component
 *
 * Contact form with optional map and contact info.
 * Split layout with form on one side and info/map on the other.
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export interface ContactInfo {
  icon: 'mail' | 'phone' | 'map-pin';
  label: string;
  value: string;
}

export interface ContactFormSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  contactInfo?: ContactInfo[];
  showMap?: boolean;
  mapEmbedUrl?: string;
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  title = 'Get in Touch',
  subtitle = 'Contact Us',
  description = 'Have a question? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
  contactInfo = [
    { icon: 'mail', label: 'Email', value: 'hello@example.com' },
    { icon: 'phone', label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: 'map-pin', label: 'Address', value: '123 Main St, City, Country' },
  ],
  showMap = false,
  mapEmbedUrl,
  backgroundColor = 'transparent',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const getIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5';
    switch (iconName) {
      case 'mail': return <Mail className={iconClass} />;
      case 'phone': return <Phone className={iconClass} />;
      case 'map-pin': return <MapPin className={iconClass} />;
      default: return <Mail className={iconClass} />;
    }
  };

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-secondary/5', cssClasses)}
      style={{ backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined, paddingTop, paddingBottom }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info & Map */}
            <div>
              {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{subtitle}</p>}
              {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
              {description && <p className="text-lg text-muted-foreground mb-8">{description}</p>}

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-primary mt-0.5">{getIcon(info.icon)}</div>
                    <div>
                      <div className="font-semibold mb-1">{info.label}</div>
                      <div className="text-muted-foreground">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              {showMap && mapEmbedUrl && (
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>

            {/* Right: Form */}
            <div className="bg-background p-8 rounded-xl border shadow-lg">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
