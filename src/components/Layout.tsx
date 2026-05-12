import { Link } from 'react-router-dom';
import { Leaf, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartSidebar } from './CartSidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { openCart, count } = useCartStore();
  const itemCount = count();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-cream/90 backdrop-blur-md sticky top-0 z-50 border-b border-olive/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold text-olive-dark flex items-center gap-2">
            <Leaf className="w-6 h-6 text-terracotta" />
            OleaCycle
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-medium text-charcoal">
            {['Products', 'B2B Portal', 'About Us', 'Certifications'].map((item) => {
              const path = `/${item.toLowerCase().replace(' us', '').replace(' portal', '')}`;
              return (
                <Link key={path} to={path} className="hover:text-olive transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all group-hover:w-full"></span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-white border border-olive/10 rounded-full hover:bg-cream transition-colors shadow-soft"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <Link to="/contact" className="px-5 py-2.5 bg-olive text-cream rounded-full font-medium hover:bg-olive-dark transition-transform hover:scale-105 shadow-soft">
              Contact Us
            </Link>
          </div>
        </div>
      </header>

      <CartSidebar />
      
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      <footer className="bg-charcoal text-cream py-16 mt-0">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif mb-6 text-cream flex items-center gap-2">
               <Leaf className="w-8 h-8 text-terracotta" />
               OleaCycle
            </h3>
            <p className="text-cream/70 max-w-sm mb-8 leading-relaxed">
              Premium, sustainable packaging derived from olive pomace. Transforming Tunisian agricultural waste into the future of eco-friendly containers.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-terracotta uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-4 text-cream/80">
              <li><Link to="/products" className="hover:text-white transition-colors">Our Products</Link></li>
              <li><Link to="/b2b" className="hover:text-white transition-colors">Wholesale & B2B</Link></li>
              <li><Link to="/certifications" className="hover:text-white transition-colors">Certifications</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-terracotta uppercase tracking-wider text-sm">Legal & Contact</h4>
            <ul className="space-y-4 text-cream/80">
              <li><a href="mailto:oleacycle1@gmail.com" className="hover:text-white transition-colors">oleacycle1@gmail.com</a></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-sm text-cream/50">
          © {new Date().getFullYear()} OleaCycle. All rights reserved. Made in Tunisia.
        </div>
      </footer>
    </div>
  );
};
