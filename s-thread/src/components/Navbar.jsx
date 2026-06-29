import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineShoppingBag, 
  HiOutlineUser, 
  HiOutlineCamera,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX
} from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import SearchModal from './SearchModal'
import CameraModal from './CameraModal'
import AuthModal from './AuthModal'
import CartSidebar from './CartSidebar'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  
  const { cartCount, toggleCart } = useCart()
  const location = useLocation()

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  const handleLogout = () => {
    localStorage.removeItem('s-thread-user')
    localStorage.removeItem('s-thread-token')
    setUser(null)
    triggerToast('Logged out successfully!', 'success')
  }

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('s-thread-user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
      }
    }
    checkUser()
  }, [isAuthOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Children', path: '/children' },
    { name: 'About', path: '/about' },
  ]

  const openAuth = (mode) => {
    setAuthMode(mode)
    setIsAuthOpen(true)
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' 
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
                 <img className='rounded-2xl' src="https://png.pngtree.com/png-clipart/20210314/original/pngtree-letter-s-logo-png-png-image_6100843.jpg" alt="" />
                </div>
                <span className="ml-2 text-xl font-display font-bold gradient-text hidden sm:block">
                  S-Thread
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-800 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-1.5 sm:space-x-4">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <HiOutlineSearch className="w-5 h-5" />
              </motion.button>

              {/* Camera */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCameraOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <HiOutlineCamera className="w-5 h-5" />
              </motion.button>

              {/* User / Auth */}
              <div className="hidden sm:flex items-center space-x-3">
                {user ? (
                  <>
                    <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-gray-200">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Hi, {user.name.split(' ')[0]}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="px-4 py-1.5 text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-full transition-colors cursor-pointer"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openAuth('login')}
                      className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                      Login
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openAuth('signup')}
                      className="px-4 py-1.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
                    >
                      Sign Up
                    </motion.button>
                  </>
                )}
              </div>

              {/* Mobile Auth Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={user ? handleLogout : () => openAuth('login')}
                className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <HiOutlineUser className={`w-5 h-5 ${user ? 'text-emerald-500' : ''}`} />
              </motion.button>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX className="w-5 h-5" />
                ) : (
                  <HiOutlineMenu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="border-t border-gray-150 pt-4 mt-3 flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      Hi, {user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-full transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CameraModal isOpen={isCameraOpen} onClose={() => setIsCameraOpen(false)} />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        mode={authMode}
        setMode={setAuthMode}
        onSuccess={(msg, type) => triggerToast(msg, type)}
      />
      <CartSidebar />

      {/* Toast Notification Popup */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-24 right-6 z-[100] max-w-sm w-[90%] sm:w-full bg-white/95 backdrop-blur-md border rounded-2xl shadow-2xl p-4 flex items-center gap-3 ${
              toast.type === 'success' ? 'border-emerald-500/20' : 'border-rose-500/20'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}>
              {toast.type === 'success' ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm">
                {toast.type === 'success' ? 'Success' : 'Error'}
              </h4>
              <p className="text-xs text-gray-600 mt-0.5 break-words">{toast.message}</p>
            </div>
            
            <button 
              onClick={() => setToast(prev => ({ ...prev, show: false }))} 
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg shrink-0"
            >
              <HiOutlineX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
