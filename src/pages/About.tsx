import { motion } from 'framer-motion';

export const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif text-olive-dark mb-8">Our Story</h1>
        <p className="text-xl text-charcoal-light leading-relaxed">
          OleaCycle began in Sfax, Tunisia, surrounded by vast olive groves and the crushing weight of their agro-industrial byproducts. We realized the solution to plastic pollution was growing on trees.
        </p>
      </section>

      <section className="py-16 bg-cream border-t border-b border-olive/10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src="/story_bottle.jpg"
              alt="OleaCycle oil bottle" 
              className="rounded-3xl shadow-xl w-full h-[600px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-serif text-olive-dark mb-6">The Process</h2>
            <p className="text-lg text-charcoal-light mb-6 leading-relaxed">
              Every year, millions of tons of olive pomace (the solid remains of the olive after pressing for oil) are discarded. Left untreated, it affects soil acidity and releases greenhouse gases.
            </p>
            <p className="text-lg text-charcoal-light mb-6 leading-relaxed">
              At OleaCycle, we harvest this "waste". Through our proprietary, environmentally neutral extraction and molding process, we bind the pomace fibers into rigid, durable, and highly functional packaging.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
                <div className="text-4xl font-serif text-terracotta mb-2">0%</div>
                <div className="text-sm font-medium text-charcoal">Plastic Used</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
                <div className="text-4xl font-serif text-terracotta mb-2">16 Months</div>
                <div className="text-sm font-medium text-charcoal">In Natural Conditions</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
