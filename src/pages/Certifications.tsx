import { Award, LeafyGreen, Recycle, ShieldCheck, Globe } from 'lucide-react';

export const CertificationsPage = () => {
  return (
    <div className="bg-cream min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-5xl font-serif text-olive-dark mb-6 text-center">Impact & Certifications</h1>
        <p className="text-xl text-charcoal-light text-center mb-20 max-w-2xl mx-auto">
          We believe in radical transparency. Here's exactly where we stand on our sustainability roadmap.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-soft border-l-4 border-olive">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-olive/10 rounded-xl text-olive">
                <LeafyGreen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal">BPI Home Compostable</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-olive/10 text-olive-dark text-xs font-bold rounded-full border border-olive/20">Roadmap Phase</span>
              </div>
            </div>
            <p className="text-charcoal-light leading-relaxed">
              Targeting BPI certification to validate complete breakdown within 16 months when exposed to natural outdoor conditions — including sun, rain, and soil.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-soft border-l-4 border-olive">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-olive/10 rounded-xl text-olive">
                <Recycle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal">EU Food Contact Material</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-olive/20 text-olive-dark text-xs font-bold rounded-full">Planned</span>
              </div>
            </div>
            <p className="text-charcoal-light leading-relaxed">
              Future testing planned to certify our containers for safe, direct contact with dry and lipid-based foods.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-soft border-l-4 border-blue-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal">ISO Standards</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">9001</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">14001</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">22000</span>
                </div>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Future Roadmap</span>
              </div>
            </div>
            <p className="text-charcoal-light leading-relaxed">
              Strategic objective to implement integrated management systems for Quality, Environment, and Food Safety.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-soft border-l-4 border-emerald-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal">OK compost TÜV AUSTRIA</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">Planned Development</span>
              </div>
            </div>
            <p className="text-charcoal-light leading-relaxed">
              Aiming for the "OK compost HOME" and "OK compost INDUSTRIAL" labels through upcoming TÜV AUSTRIA validation steps.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-soft border-l-4 border-terracotta md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-terracotta/10 rounded-xl text-terracotta">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal">B-Corp Certification</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-charcoal/10 text-charcoal text-xs font-bold rounded-full">Visionary Goal</span>
              </div>
            </div>
            <p className="text-charcoal-light leading-relaxed">
              Our long-term commitment to joining the B-Corp community by auditing our future supply chain and ethical practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

