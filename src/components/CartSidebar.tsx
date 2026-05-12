import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export const CartSidebar = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCartStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-dark">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-terracotta" />
                <h2 className="text-xl font-serif text-olive-dark">Your Cart</h2>
                {count() > 0 && (
                  <span className="bg-terracotta text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {count()}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-cream rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-cream-dark mb-4" />
                  <p className="text-charcoal-light text-lg">Your cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2 bg-terracotta text-white rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-cream rounded-2xl p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-charcoal text-sm leading-snug mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-terracotta font-bold text-sm mb-3">
                        {item.price.toFixed(2)} DT
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-terracotta transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-terracotta transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-charcoal/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right text-sm font-bold text-charcoal flex-shrink-0">
                      {(item.price * item.quantity).toFixed(2)} DT
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-dark px-6 py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal font-medium">Total</span>
                  <span className="text-2xl font-bold font-serif text-olive-dark">
                    {total().toFixed(2)} DT
                  </span>
                </div>
                <button
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full py-4 bg-terracotta text-white font-medium rounded-xl hover:bg-terracotta-dark transition-colors">
                  Proceed to Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-3 border border-charcoal/20 text-charcoal rounded-xl hover:bg-cream transition-colors text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
