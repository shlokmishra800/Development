import { motion } from "framer-motion";
import badgeSticker from "../assets/badge_sticker.png";

export default function Services() {
  const servicesList = [
    {
      category: "Office of multiple interest content",
      title: "Collaborative & partnership",
      hasBadge: false
    },
    {
      category: "The hanger US Air force digital experimental",
      title: "We talk about our weight",
      hasBadge: false
    },
    {
      category: "Delta faucet content, social, digital",
      title: "Piloting digital confidence",
      hasBadge: true
    }
  ];

  return (
    <section id="services" className="relative py-28 bg-white border-t border-gray-100 overflow-hidden">
      {/* Background squiggle line */}
      <div className="absolute right-0 top-10 pointer-events-none opacity-20">
        <svg width="280" height="300" viewBox="0 0 280 300" fill="none" className="text-coral">
          <path d="M10,10 C150,50 50,150 250,280" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight">
            What we <span className="pill-green">can</span> <br />
            <span className="underline-yellow">offer</span> you!
          </h2>
        </div>

        {/* Services Rows */}
        <div className="border-t border-gray-200">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group border-b border-gray-200 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative hover:bg-sage/20 px-4 -mx-4 transition-all duration-300 rounded-lg"
            >
              {/* Category (Left - 30%) */}
              <div className="md:w-1/3 text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider leading-relaxed">
                {service.category}
              </div>

              {/* Service Title and Arrow (Right - 70%) */}
              <div className="md:w-2/3 flex items-center justify-between relative">
                
                {/* Title */}
                <div className="relative flex items-center">
                  <h3 className="text-2xl md:text-4xl font-semibold text-charcoal tracking-tight group-hover:text-coral transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Absolute Badge Sticker (Only on Row 3) */}
                  {service.hasBadge && (
                    <motion.div 
                      initial={{ scale: 0.8, rotate: -15 }}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="absolute left-[70%] sm:left-[80%] md:left-[90%] -top-4 w-12 h-12 md:w-16 md:h-16 z-20 pointer-events-auto"
                    >
                      <img
                        src={badgeSticker}
                        alt="Badge"
                        className="w-full h-full object-contain filter drop-shadow-md"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Animated Arrow */}
                <motion.div
                  variants={{
                    initial: { x: 0 },
                    hover: { x: 8 }
                  }}
                  animate="initial"
                  whileHover="hover"
                  className="text-2xl md:text-3xl text-charcoal group-hover:text-coral transition-colors duration-300 shrink-0 ml-4"
                >
                  <svg
                    width="42"
                    height="16"
                    viewBox="0 0 42 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-8 md:w-12 h-auto"
                  >
                    <path d="M0,8 L40,8 M33,1 L40,8 L33,15" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
