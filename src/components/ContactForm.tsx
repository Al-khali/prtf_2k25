'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/Button';
import Toast from './Toast';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
  honeypot: z.string().max(0, 'Bot detected'), // Honeypot field
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error';
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const validateField = (field: keyof ContactFormData, value: string) => {
    try {
      contactFormSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0].message }));
      }
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Real-time validation for touched fields
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true, honeypot: true });

    // Validate all fields
    try {
      contactFormSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }).toString(),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        setTouched({});
        setToast({
          isVisible: true,
          message: 'Message sent successfully! I\'ll get back to you soon.',
          type: 'success',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setToast({
        isVisible: true,
        message: 'Failed to send message. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" name="contact" data-netlify="true" netlify-honeypot="honeypot">
        <input type="hidden" name="form-name" value="contact" />
      
      {/* Honeypot field - hidden from users */}
      <div className="hidden">
  <label htmlFor="honeypot">Don&apos;t fill this out if you&apos;re human:</label>
        <input
          id="honeypot"
          name="honeypot"
          type="text"
          value={formData.honeypot}
          onChange={(e) => handleChange('honeypot', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-cyan-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`w-full px-4 py-3 bg-white/5 border ${
            errors.name && touched.name ? 'border-red-500' : 'border-white/10'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 text-white placeholder-white/40`}
          placeholder="Your name"
          disabled={isSubmitting}
        />
        {errors.name && touched.name && (
          <p className="text-sm text-red-400 animate-fade-in">{errors.name}</p>
        )}
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-cyan-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`w-full px-4 py-3 bg-white/5 border ${
            errors.email && touched.email ? 'border-red-500' : 'border-white/10'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 text-white placeholder-white/40`}
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
        {errors.email && touched.email && (
          <p className="text-sm text-red-400 animate-fade-in">{errors.email}</p>
        )}
      </div>

      {/* Message field */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-cyan-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          className={`w-full px-4 py-3 bg-white/5 border ${
            errors.message && touched.message ? 'border-red-500' : 'border-white/10'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 text-white placeholder-white/40 resize-none`}
          placeholder="Tell me about your project or just say hi..."
          disabled={isSubmitting}
        />
        {errors.message && touched.message && (
          <p className="text-sm text-red-400 animate-fade-in">{errors.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>

    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={closeToast}
    />
    </>
  );
}
