import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineX, HiOutlinePlus, HiOutlineMinus, HiOutlineTrash, HiOutlineShoppingBag } from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartSidebar = () => {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
            onClick={() => setCartOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[56] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <HiOutlineShoppingBag className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
                {cartCount > 0 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <HiOutlineX className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <HiOutlineShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCartOpen(false)}
                    className="btn-primary"
                  >
                    Start Shopping
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <Link
                          to={`/product/${item.id}`}
                          onClick={() => setCartOpen(false)}
                          className="shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-24 object-cover rounded-lg"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.id}`}
                            onClick={() => setCartOpen(false)}
                            className="font-medium text-gray-900 hover:text-gray-700 line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-0.5">
                            Size: {item.size} {item.color && `• ${item.color}`}
                          </p>
                          <p className="font-semibold text-gray-900 mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:border-gray-400 transition-colors"
                              >
                                <HiOutlineMinus className="w-4 h-4" />
                              </motion.button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:border-gray-400 transition-colors"
                              >
                                <HiOutlinePlus className="w-4 h-4" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <HiOutlineTrash className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Shipping and taxes calculated at checkout
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 text-lg"
                >
                  Proceed to Checkout
                </motion.button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-gray-600 hover:text-gray-900 font-medium py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar
