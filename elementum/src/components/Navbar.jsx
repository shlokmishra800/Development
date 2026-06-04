import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Studio", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#newsletter" },
    { name: "FAQs", href: "#footer" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="text-2xl font-bold text-charcoal tracking-tight hover:opacity-85 transition-opacity">
          Elementum
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-10 text-[15px] font-medium text-charcoal/80">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative py-2 transition-colors hover:text-charcoal group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-charcoal transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-charcoal focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-center relative">
            <span
              className={`w-6 h-[2px] bg-charcoal rounded transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-charcoal rounded transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-charcoal rounded transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-6 space-y-4 font-medium text-charcoal/80">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-lg hover:text-charcoal transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
