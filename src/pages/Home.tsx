import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Factory, CheckCircle2 } from 'lucide-react';
import { FadeIn3D } from '../components/animations/FadeIn3D';
import { TiltCard } from '../components/animations/TiltCard';
import { Float4D } from '../components/animations/Float4D';

export const HomePage = () => (
  <div>
    {/* Hero Section */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-cream pt-10 pb-20">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeIn3D className="z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-olive/10 rounded-full text-olive font-medium text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
            100% Home Compostable
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight text-charcoal">
            Nature's Waste, <br />
            <span className="text-terracotta font-serif italic text-6xl md:text-8xl">Reborn.</span>
          </h1>
          <p className="text-lg md:text-xl text-charcoal-light mb-10 max-w-xl leading-relaxed">
            Elevate your brand with premium packaging crafted entirely from upcycled olive pomace. No plastic. No compromise. Just pure, sustainable elegance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/b2b" className="group px-8 py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-all shadow-soft flex items-center gap-2 text-lg">
              Partner With Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/products" className="px-8 py-4 bg-white text-olive border border-olive/20 rounded-full font-medium hover:bg-olive/5 transition-all shadow-soft text-lg">
              View Catalog
            </Link>
          </div>
          
          <div className="mt-16 flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-olive" />
              </div>
              <div className="text-sm font-medium">BPI Certified</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                <Factory className="w-6 h-6 text-olive" />
              </div>
              <div className="text-sm font-medium">Local Production</div>
            </div>
          </div>
        </FadeIn3D>
        
        <div className="relative h-[600px] flex items-center justify-center">
           <TiltCard zTranslate="50px">
           {/* Decorative elements behind the image */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-olive/5 rounded-full blur-3xl"></div>
           <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-terracotta/5 rounded-full blur-3xl"></div>
           
           <img 
              src="/honey_jar_500g.jpg" 
              alt="Premium Olive Pomace Honey Jar" 
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(44,44,44,0.15)] rounded-2xl"
           />
           
           {/* Floating Badge */}
           <Float4D 
              yOffset={-12}
              duration={3.5}
              className="absolute top-10 right-10 z-20 glass-panel px-6 py-4 rounded-xl flex items-center gap-4"
           >
             <div style={{ transform: "translateZ(60px)" }} className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
               <CheckCircle2 className="w-6 h-6 text-green-600" />
             </div>
             <div>
               <div className="text-xs text-charcoal/60 uppercase font-bold tracking-wider">Zero Waste</div>
               <div className="font-serif text-lg text-olive-dark">Material</div>
             </div>
             </div>
           </Float4D>
           </TiltCard>
        </div>
      </div>
    </section>

    {/* Material Spotlight Section */}
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative h-[500px]">
            <TiltCard zTranslate="30px">
              <div className="absolute -inset-4 bg-terracotta/5 rounded-3xl transform -rotate-3"></div>
              <img 
                src="/raw_material.jpg" 
                alt="OleaCycle Raw Olive Pomace Material" 
                className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-xl border border-cream-dark"
              />
            </TiltCard>
          </div>
          <FadeIn3D delay={0.2} className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold tracking-widest uppercase text-terracotta mb-4">The Material</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-olive-dark mb-6">Born from the Earth. <br/>Returning to it.</h3>
            <p className="text-lg text-charcoal-light leading-relaxed mb-8">
              Notice the speckled texture? That's our signature olive pomace composite. We take agricultural residue that would otherwise decompose anaerobically, emitting methane, and transform it into resilient, beautiful forms.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "100% Bio-based and free from microplastics",
                "Naturally insulating and protective",
                "Biodegrades in 16 months when exposed to natural outdoor conditions — sun, rain & soil"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-olive/10 p-1 rounded-full"><Leaf className="w-4 h-4 text-olive" /></div>
                  <span className="text-charcoal font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/products" className="inline-flex items-center gap-2 font-medium text-terracotta hover:text-terracotta-dark group">
              Discover the Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn3D>
        </div>
      </div>
    </section>

    {/* Vision Section */}
    <section className="py-24 bg-olive-dark text-cream selection:bg-terracotta selection:text-white">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <FadeIn3D yOffset={60}>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-cream">Beyond Plastic Alternatives</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-cream/80 font-light">
            We don't just replace plastic; we reinvent what packaging can be. By utilizing the millions of tons of olive pomace discarded annually across the Mediterranean, OleaCycle creates containers that return seamlessly to the earth.
          </p>
        </FadeIn3D>
      </div>
    </section>
  </div>
);
