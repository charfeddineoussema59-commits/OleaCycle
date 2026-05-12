import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Palette, PenTool, Shapes } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const MOCK_PRODUCTS = [
  {
    id: 4,
    name: "Honey Jar (1kg)",
    category: "Food Packaging",
    price: 7.80,
    minOrder: "150 units (B2B)",
    description: "Perfectly sealed high-capacity jar designed specifically for honey and preserves. Keeps contents fresh while looking stunning on the shelf.",
    image: "/honey_jar_1kg.jpg"
  },
  {
    id: 7,
    name: "Honey Jar (500g)",
    category: "Food Packaging",
    price: 6.10,
    minOrder: "150 units (B2B)",
    description: "Our larger capacity sealed jar, perfect for bulk honey and gourmet preserves.",
    image: "/honey_jar_500g.jpg"
  },
  {
    id: 5,
    name: "Oil Bottle (500ml)",
    category: "Food Packaging",
    price: 6.20,
    minOrder: "100 units (B2B)",
    description: "Premium compostable bottle that perfectly shields high-quality oils from UV light degradation.",
    image: "/oil_bottle_500ml.jpg"
  },
  {
    id: 6,
    name: "Oil Bottle (1L)",
    category: "Food Packaging",
    price: 7.90,
    minOrder: "100 units (B2B)",
    description: "Large capacity oil bottle, sustainably crafted to match the purity of the liquids it holds.",
    image: "/oil_bottle_1l.jpg"
  }
];

export const ProductsPage = () => {
  const { addItem } = useCartStore();

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-olive-dark text-white py-24 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">The Collection</h1>
        <p className="text-xl max-w-2xl mx-auto text-cream/80">
          Discover our range of premium, compostable containers. Designed for both individual consumers and wholesale B2B partners.
        </p>
      </section>

      {/* Filters & Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-10 border-b border-charcoal/10 pb-6">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-charcoal text-white rounded-full text-sm font-medium">All</button>
            <button className="px-4 py-2 border border-charcoal/20 text-charcoal hover:bg-black/5 rounded-full text-sm font-medium transition-colors">Food Packaging</button>
          </div>
          <p className="text-charcoal-light text-sm font-medium">{MOCK_PRODUCTS.length} Results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-6 bg-white shadow-soft">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-serif font-bold text-olive-dark group-hover:text-terracotta transition-colors">
                  {product.name}
                </h3>
                <div className="text-right">
                  <span className="text-lg font-medium">{product.price.toFixed(2)} DT</span>
                  <p className="text-xs text-charcoal/50 italic">without personalisation</p>
                </div>
              </div>
              <p className="text-charcoal-light text-sm mb-4 line-clamp-2">{product.description}</p>

              <button
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                className="w-full py-3 bg-white border border-olive/20 rounded-full text-sm font-medium text-olive hover:bg-olive hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personalization Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-terracotta/10 rounded-full text-terracotta font-bold text-xs mb-4 uppercase tracking-wider">
                Volume Exclusive
              </div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal/40 mb-2">Bespoke Customization</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-olive-dark mb-6 leading-tight">Your Vision, <br/>Sculpted in Olive.</h3>
              <p className="text-charcoal-light mb-8 italic flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                Exclusively available for high-volume wholesale orders and custom brand partnerships.
              </p>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-olive/10 rounded-xl flex items-center justify-center">
                    <Palette className="w-6 h-6 text-olive" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif text-olive-dark mb-2">Chromatic Depths</h4>
                    <p className="text-charcoal-light">From deep ochres to Mediterranean azures. We use botanical-based pigments to infuse your packaging with colors that match your brand's soul.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-olive/10 rounded-xl flex items-center justify-center">
                    <PenTool className="w-6 h-6 text-olive" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif text-olive-dark mb-2">Precision Etching</h4>
                    <p className="text-charcoal-light">High-fidelity laser engraving allows for permanent logos, serial numbers, or narratives directly on the material, eliminating the need for adhesives.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-olive/10 rounded-xl flex items-center justify-center">
                    <Shapes className="w-6 h-6 text-olive" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif text-olive-dark mb-2">Architectural Forms</h4>
                    <p className="text-charcoal-light">Go beyond the standard. Our engineering team works with you to develop unique geometries and custom molds tailored to your specific product needs.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Link to="/b2b#quote-form" className="inline-flex items-center gap-2 px-8 py-4 bg-olive text-white rounded-full font-medium hover:bg-olive-dark transition-all shadow-soft">
                  Inquire for Volume Orders <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute -inset-4 bg-terracotta/5 rounded-[2rem] transform rotate-2"></div>
              <img 
                src="/bespoke_personalization.jpg" 
                alt="Bespoke OleaCycle Laser Engraved Bottle" 
                className="relative z-10 w-full rounded-2xl shadow-2xl border border-cream-dark"
              />
              
              <div className="absolute -bottom-6 -left-6 z-20 glass-panel p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <p className="text-olive-dark italic font-serif text-lg">"The engraving detail is unparalleled. It feels unified with the Earth."</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-olive/20"></div>
                  <div className="text-xs">
                    <div className="font-bold">Organic Essence Lab</div>
                    <div className="text-charcoal/60">B2B Partner</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* B2B Banner */}
      <section className="bg-terracotta text-white py-16 mt-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 max-w-xl">
            <h2 className="text-3xl font-serif mb-3">Looking for Bulk Orders?</h2>
            <p className="text-white/80">OleaCycle offers custom shapes, brand engraving, and massive volume discounts for B2B partners.</p>
          </div>
          <Link to="/b2b" className="px-8 py-4 bg-white text-terracotta font-medium rounded-full hover:bg-cream transition-colors flex items-center gap-2">
            Visit B2B Portal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

