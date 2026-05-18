import { useState } from 'react';
import { ArrowRight, Box, Handshake, Sprout, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';
import { FadeIn3D } from '../components/animations/FadeIn3D';
import { TiltCard } from '../components/animations/TiltCard';
import { Float4D } from '../components/animations/Float4D';

// EmailJS Configuration
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_51ihzdn';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x07obx9';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'cOFENGozFQqsmVDOV';

export const B2BPortalPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    volume: '',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Send Email Notification via EmailJS
      const emailParams = {
        from_name: formData.companyName,
        from_email: formData.email,
        subject: `B2B Quote Request: ${formData.companyName}`,
        message: `
          New B2B Quote Request from ${formData.companyName}
          
          Contact Email: ${formData.email}
          Phone Number: ${formData.phone}
          Volume: ${formData.volume}
          
          Details:
          ${formData.details}
        `.trim(),
        to_email: 'oleacycle1@gmail.com',
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        EMAILJS_PUBLIC_KEY
      );

      // 2. Also save to Supabase for record keeping
      const { error } = await supabase
        .from('quote_requests')
        .insert([
          {
            company_name: formData.companyName,
            contact_email: formData.email,
            phone_number: formData.phone,
            estimated_volume: formData.volume,
            requirements_details: formData.details
          }
        ]);

      if (error) {
        // Log the error but don't fail the user experience if email was sent
        console.warn("Supabase record failed, but email was sent:", error);
      }

      setIsSuccess(true);
      setFormData({ companyName: '', email: '', phone: '', volume: '', details: '' });
    } catch (err: any) {
      console.error("Quote submission error:", err);
      setErrorMsg('There was an error submitting your request. Please try again or contact us directly at oleacycle1@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-olive py-20 text-center text-white">
        <FadeIn3D yOffset={30}>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">B2B Wholesale Portal</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/80">
            Scalable, sustainable packaging solutions for businesses looking to eliminate plastic from their supply chain.
          </p>
        </FadeIn3D>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <FadeIn3D delay={0.1}>
            <TiltCard zTranslate="30px" className="bg-white p-8 rounded-2xl shadow-soft h-full">
              <Float4D yOffset={-8} className="w-14 h-14 bg-olive/10 rounded-full flex items-center justify-center mb-6">
                <Box className="w-7 h-7 text-olive" />
              </Float4D>
              <h3 className="text-2xl font-serif text-olive-dark mb-4" style={{ transform: "translateZ(10px)" }}>Volume Parsing & Tiers</h3>
              <p className="text-charcoal-light">We support orders from small batches up to 100,000+ units. Benefit from significant economies of scale as your order size increases.</p>
            </TiltCard>
          </FadeIn3D>
          <FadeIn3D delay={0.3}>
            <TiltCard zTranslate="30px" className="bg-white p-8 rounded-2xl shadow-soft h-full">
              <Float4D yOffset={-8} delay={0.2} className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mb-6">
                <Handshake className="w-7 h-7 text-terracotta" />
              </Float4D>
              <h3 className="text-2xl font-serif text-olive-dark mb-4" style={{ transform: "translateZ(10px)" }}>Custom Branding</h3>
              <p className="text-charcoal-light">Incorporate your brand identity directly into the material molds. No secondary adhesive labels required.</p>
            </TiltCard>
          </FadeIn3D>
          <FadeIn3D delay={0.5}>
            <TiltCard zTranslate="30px" className="bg-white p-8 rounded-2xl shadow-soft h-full">
              <Float4D yOffset={-8} delay={0.4} className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Sprout className="w-7 h-7 text-green-700" />
              </Float4D>
              <h3 className="text-2xl font-serif text-olive-dark mb-4" style={{ transform: "translateZ(10px)" }}>Carbon Offset Regs</h3>
              <p className="text-charcoal-light">OleaCycle containers strictly comply with EU packing carbon regulations, ensuring a seamless adoption for multinational brands.</p>
            </TiltCard>
          </FadeIn3D>
        </div>

        <FadeIn3D delay={0.2}>
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-olive/10" id="quote-form">
            <h2 className="text-3xl font-serif text-olive-dark mb-2 text-center">Request A Quote</h2>
            <p className="text-center text-charcoal-light mb-8">Tell us about your volume and packaging needs.</p>
          
          {isSuccess ? (
            <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
              <p>Thank you for reaching out. Our business team will review your requirements and get back to you within 48 hours.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-6 px-6 py-2 border border-green-600 text-green-700 rounded-full hover:bg-green-100 transition"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm">
                  {errorMsg}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Company Name *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border border-transparent" 
                    placeholder="Acme Inc." 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Work Email *</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border border-transparent" 
                    placeholder="jane@acme.com" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border border-transparent" 
                    placeholder="+216 20 000 000" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Volume *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.volume}
                    onChange={(e) => setFormData({...formData, volume: e.target.value})}
                    className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border border-transparent" 
                    placeholder="e.g. 5,000 units or weekly batches" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Project Details & Requirements</label>
                <textarea 
                  rows={4} 
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive border border-transparent" 
                  placeholder="We need custom molded cosmetic jars..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-terracotta text-white font-medium rounded-xl hover:bg-terracotta-dark transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Submitting...</span>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Request</>
                )}
              </button>
            </form>
          )}
        </div>
        </FadeIn3D>
      </div>
    </div>
  );
};
