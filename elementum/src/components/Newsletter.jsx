import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section id="newsletter" className="relative py-28 bg-[#D1E6DB] flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Decorative Purple Half-Circle on the Right Edge */}
      <div className="absolute right-0 top-[20%] w-24 h-48 sm:w-32 sm:h-64 bg-[#8C52FF] rounded-l-full pointer-events-none z-0" />

      {/* Animated Downward Hand-Drawn Style Arrows */}
      <div className="flex justify-center mb-6 relative z-10">
        <svg width="100" height="50" viewBox="0 0 100 50" fill="none" className="text-coral">
          {/* Left Arrow */}
          <motion.path
            d="M 35,5 C 45,15 35,30 25,45"
            stroke="#F17A71"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 18,38 L 25,45 L 32,42"
            stroke="#F17A71"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right Arrow */}
          <motion.path
            d="M 75,5 C 85,15 75,30 65,45"
            stroke="#F17A71"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M 58,38 L 65,45 L 72,42"
            stroke="#F17A71"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10 space-y-6">
        {/* Title */}
        <h2 className="text-4xl md:text-7xl font-bold text-charcoal tracking-tight font-sans">
          Subscribe to <br />our newsletter
        </h2>
        
        {/* Subtitle */}
        <p className="text-charcoal/80 text-[15px] md:text-base font-medium max-w-md mx-auto">
          To make your stay special and even more memorable
        </p>

        {/* Subscribe Button (Matches Figma capsule button style exactly) */}
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-[#000000] text-white rounded-full font-bold text-[15px] hover:bg-black/90 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Subscribe Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
