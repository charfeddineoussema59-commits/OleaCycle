import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { CheckCircle, ChevronRight, ShoppingBag, User } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_51ihzdn';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x07obx9';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'cOFENGozFQqsmVDOV';

type Step = 'summary' | 'details' | 'success';

export const CheckoutPage = () => {
  const { items, total, clearCart, count } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('summary');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [details, setDetails] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', country: 'Tunisia',
  });

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setErrorMsg('');

    // Build order summary text for the email
    const orderLines = items
      .map(i => `- ${i.name} × ${i.quantity}  →  ${(i.price * i.quantity).toFixed(2)} DT`)
      .join('\n');

    const message = `
🛒 NEW ORDER FROM OLEACYCLE WEBSITE

Customer: ${details.firstName} ${details.lastName}
Email: ${details.email}
Phone: ${details.phone || 'N/A'}
Address: ${details.address}, ${details.city}, ${details.country}

Order Items:
${orderLines}

─────────────────
TOTAL: ${total().toFixed(2)} DT
─────────────────
    `.trim();

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  `${details.firstName} ${details.lastName}`,
          from_email: details.email,
          subject:    `New Order — ${total().toFixed(2)} DT — OleaCycle`,
          message,
          to_email:   'oleacycle1@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      clearCart();
      setStep('success');
    } catch (err: any) {
      console.error('Order email error:', err);
      setErrorMsg('Could not send the order. Please try again or contact us directly at oleacycle1@gmail.com');
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: 'summary', label: 'Order Summary', icon: ShoppingBag },
    { id: 'details', label: 'Your Details',  icon: User },
  ];

  if (count() === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center text-center px-4">
        <div>
          <ShoppingBag className="w-20 h-20 text-cream-dark mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-olive-dark mb-4">Your cart is empty</h1>
          <p className="text-charcoal-light mb-8">Add products before checking out.</p>
          <button onClick={() => navigate('/products')}
            className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-serif text-olive-dark mb-3">Order Received! 🎉</h1>
          <p className="text-charcoal-light mb-2">
            Thank you, <strong>{details.firstName}</strong>! Your order has been sent to OleaCycle.
          </p>
          <p className="text-charcoal-light mb-8 text-sm">
            Our team will contact you at <strong>{details.email}</strong> to confirm your order and arrange delivery.
          </p>
          <button onClick={() => navigate('/products')}
            className="w-full py-4 bg-terracotta text-white rounded-xl font-medium hover:bg-terracotta-dark transition-colors">
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-serif text-olive-dark mb-10">Checkout</h1>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-10">
          {steps.map((s, i) => {
            const order   = ['summary', 'details'];
            const current = order.indexOf(step);
            const idx     = order.indexOf(s.id);
            const done    = idx < current;
            const active  = idx === current;
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  done ? 'bg-olive border-olive text-white' :
                  active ? 'bg-terracotta border-terracotta text-white' :
                  'bg-white border-charcoal/20 text-charcoal/40'
                }`}>
                  {done ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`font-medium text-sm hidden md:block ${active ? 'text-terracotta' : done ? 'text-olive' : 'text-charcoal/40'}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-charcoal/20" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* STEP 1 — Order Summary */}
              {step === 'summary' && (
                <motion.div key="summary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl shadow-soft p-8 space-y-4">
                  <h2 className="text-2xl font-serif text-olive-dark mb-6">Order Summary</h2>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4 border-b border-cream-dark last:border-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-charcoal">{item.name}</p>
                        <p className="text-sm text-charcoal-light">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-charcoal">{(item.price * item.quantity).toFixed(2)} DT</span>
                    </div>
                  ))}
                  <button onClick={() => setStep('details')}
                    className="w-full mt-6 py-4 bg-terracotta text-white rounded-xl font-medium hover:bg-terracotta-dark transition-colors">
                    Continue to Details →
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — Customer Details + Place Order */}
              {step === 'details' && (
                <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl shadow-soft p-8">
                  <h2 className="text-2xl font-serif text-olive-dark mb-6">Your Details</h2>
                  {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm">{errorMsg}</div>
                  )}
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">First Name *</label>
                        <input required type="text" value={details.firstName}
                          onChange={e => setDetails({...details, firstName: e.target.value})}
                          className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive" placeholder="Ali" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Last Name *</label>
                        <input required type="text" value={details.lastName}
                          onChange={e => setDetails({...details, lastName: e.target.value})}
                          className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive" placeholder="Ben Salem" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                      <input required type="email" value={details.email}
                        onChange={e => setDetails({...details, email: e.target.value})}
                        className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive" placeholder="ali@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                      <input type="tel" value={details.phone}
                        onChange={e => setDetails({...details, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive" placeholder="+216 ..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Delivery Address *</label>
                      <input required type="text" value={details.address}
                        onChange={e => setDetails({...details, address: e.target.value})}
                        className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive" placeholder="Rue, No." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">City *</label>
                        <input required type="text" value={details.city}
                          onChange={e => setDetails({...details, city: e.target.value})}
                          className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive" placeholder="Sfax" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Country</label>
                        <input type="text" value={details.country}
                          onChange={e => setDetails({...details, country: e.target.value})}
                          className="w-full px-4 py-3 bg-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-olive" />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-2">
                      <button onClick={() => setStep('summary')}
                        className="flex-1 py-4 border border-charcoal/20 rounded-xl font-medium hover:bg-cream transition-colors">
                        ← Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing || !details.firstName || !details.email || !details.address || !details.city}
                        className="flex-1 py-4 bg-olive text-white rounded-xl font-medium hover:bg-olive-dark transition-colors disabled:opacity-60"
                      >
                        {isProcessing ? <span className="animate-pulse">Sending Order…</span> : '✓ Place Order'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sticky Order Summary */}
          <div className="bg-white rounded-3xl shadow-soft p-6 h-fit sticky top-24">
            <h3 className="font-serif text-xl text-olive-dark mb-5">Your Order</h3>
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-charcoal-light">{item.name} × {item.quantity}</span>
                  <span className="font-medium">{(item.price * item.quantity).toFixed(2)} DT</span>
                </div>
              ))}
            </div>
            <div className="border-t border-cream-dark pt-4 flex justify-between items-center">
              <span className="font-bold text-charcoal">Total</span>
              <span className="text-2xl font-serif font-bold text-terracotta">{total().toFixed(2)} DT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
