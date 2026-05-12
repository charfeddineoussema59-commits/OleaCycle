import { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO SET UP EMAILJS (free, 200 emails/month):
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add a "Gmail" service and connect oleacycle1@gmail.com → note your SERVICE_ID
// 3. Create a new Email Template with these variables:
//      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    Set the "To Email" to: oleacycle1@gmail.com → note your TEMPLATE_ID
// 4. Go to Account → API Keys → copy your PUBLIC KEY
// 5. Replace the three placeholders below with your real values
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_51ihzdn';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x07obx9';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'cOFENGozFQqsmVDOV';

export const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const [errorMsg, setErrorMsg]         = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          subject:    formData.subject,
          message:    formData.message,
          to_email:   'oleacycle1@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('EmailJS error:', err);
      const detail = err?.text || err?.message || JSON.stringify(err);
      setErrorMsg(`EmailJS Error: ${detail}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-serif text-olive-dark mb-6">Get in Touch</h1>
            <p className="text-xl text-charcoal-light mb-12">
              Whether you are a local artisan interested in our test batches, or an enterprise looking for mass adoption, our team is ready to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-soft text-terracotta">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal mb-1">Headquarters & Facility</h4>
                  <p className="text-charcoal-light">ELAMRA<br/>SFAX, TUNISIA</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-soft text-terracotta">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal mb-1">Email Us</h4>
                  <a href="mailto:oleacycle1@gmail.com" className="text-charcoal-light hover:text-terracotta transition-colors">
                    oleacycle1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-soft text-terracotta">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal mb-1">Call Us</h4>
                  <p className="text-charcoal-light">+216 93 943 016</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-serif text-olive-dark mb-6">Send a Message</h2>

            {isSuccess ? (
              <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center border border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We'll be in touch shortly at <strong>oleacycle1@gmail.com</strong>.</p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2 border border-green-600 text-green-700 rounded-full hover:bg-green-100 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm">
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Name *</label>
                  <input
                    required type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                  <input
                    required type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border-transparent"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Subject *</label>
                  <input
                    required type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border-transparent"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Message *</label>
                  <textarea
                    required rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border-transparent"
                    placeholder="Tell us more..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-terracotta text-white font-medium rounded-xl hover:bg-terracotta-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting
                    ? <span className="animate-pulse">Sending…</span>
                    : <><Send className="w-5 h-5" /> Send Message</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
