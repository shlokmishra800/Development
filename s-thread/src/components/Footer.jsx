import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker 
} from 'react-icons/hi'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterestP, 
  FaYoutube 
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'Men', path: '/men' },
      { name: 'Women', path: '/women' },
      { name: 'Children', path: '/children' },
      { name: 'New Arrivals', path: '/' },
      { name: 'Sale', path: '/' },
    ],
    help: [
      { name: 'Customer Service', path: '/' },
      { name: 'Track Order', path: '/' },
      { name: 'Returns & Exchanges', path: '/' },
      { name: 'Shipping Info', path: '/' },
      { name: 'Size Guide', path: '/' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/' },
      { name: 'Press', path: '/' },
      { name: 'Sustainability', path: '/' },
      { name: 'Affiliates', path: '/' },
    ],
  }

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaPinterestP, href: '#', label: 'Pinterest' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold">Join the S-Thread Family</h3>
              <p className="text-gray-400 mt-1">Subscribe for exclusive offers and style updates</p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:border-white/40 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-display font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-display font-bold">S-Thread</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Elevating everyday style with premium clothing for the whole family. 
              Quality meets fashion at S-Thread.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <HiOutlineLocationMarker className="w-5 h-5" />
                <span>123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiOutlinePhone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiOutlineMail className="w-5 h-5" />
                <span>hello@sthread.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-gray-400 text-sm">
              <p>© {currentYear} S-Thread. All rights reserved.</p>
              <p className="mt-1">
                Made with ❤️ by <span className="text-white font-medium">Shlok Mishra</span>
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
