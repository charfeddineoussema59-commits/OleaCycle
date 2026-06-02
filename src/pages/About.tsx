import { motion } from 'framer-motion';
import { TiltCard } from '../components/animations/TiltCard';
import { FadeIn3D } from '../components/animations/FadeIn3D';
import { Float4D } from '../components/animations/Float4D';

export const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 container mx-auto px-4 text-center max-w-4xl relative">
        <FadeIn3D>
          <h1 className="text-5xl md:text-7xl font-serif text-olive-dark mb-8">Our Story</h1>
          <p className="text-xl text-charcoal-light leading-relaxed">
            OleaCycle began in Sfax, Tunisia, surrounded by vast olive groves and the crushing weight of their agro-industrial byproducts. We realized the solution to plastic pollution was growing on trees.
          </p>
        </FadeIn3D>
      </section>

      <section className="py-16 bg-cream border-t border-b border-olive/10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="absolute -inset-4 bg-gradient-to-r from-olive/20 to-terracotta/20 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
            <TiltCard zTranslate="75px" className="w-full h-full z-10">
              <img 
                src="/about_us_new.jpg"
                alt="OleaCycle oil bottle" 
                className="rounded-3xl shadow-2xl w-full h-[600px] object-cover ring-1 ring-black/5"
              />
              <Float4D 
                className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-olive/10"
                yOffset={-10}
                duration={4}
              >
                <div style={{ transform: "translateZ(100px)" }}>
                  <p className="font-serif text-terracotta font-bold text-2xl">100%</p>
                  <p className="text-xs text-charcoal-light uppercase tracking-wider font-semibold">Biodegradable</p>
                </div>
              </Float4D>
            </TiltCard>
          </div>
          <div>
            <h2 className="text-4xl font-serif text-olive-dark mb-6">The Process</h2>
            <p className="text-lg text-charcoal-light mb-6 leading-relaxed">
              Every year, millions of tons of olive pomace (the solid remains of the olive after pressing for oil) are discarded. Left untreated, it affects soil acidity and releases greenhouse gases.
            </p>
            <p className="text-lg text-charcoal-light mb-6 leading-relaxed">
              At OleaCycle, we harvest this "waste". Through our proprietary, environmentally neutral extraction and molding process, we bind the pomace fibers into rigid, durable, and highly functional packaging.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10" style={{ perspective: 1000 }}>
              <motion.div 
                whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, z: 20 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-soft text-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-4xl font-serif text-terracotta mb-2" style={{ transform: "translateZ(20px)" }}>0%</div>
                <div className="text-sm font-medium text-charcoal" style={{ transform: "translateZ(10px)" }}>Plastic Used</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10, z: 20 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-2xl shadow-soft text-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-4xl font-serif text-terracotta mb-2" style={{ transform: "translateZ(20px)" }}>16 Months</div>
                <div className="text-sm font-medium text-charcoal" style={{ transform: "translateZ(10px)" }}>In Natural Conditions</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
