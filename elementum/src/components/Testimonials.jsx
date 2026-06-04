import { motion } from "framer-motion";
import portrait1 from "../assets/portrait_1.png";
import portrait2 from "../assets/portrait_2.png";
import portrait3 from "../assets/portrait_3.png";
import portrait4 from "../assets/portrait_4.png";
import portrait5 from "../assets/portrait_5.png";
import portrait6 from "../assets/portrait_6.png";
import portrait7 from "../assets/portrait_7.png";
import portrait8 from "../assets/portrait_8.png";

export default function Testimonials() {
  // 8 floating avatars scattered around the central card
  const avatars = [
    // Left side avatars
    { id: 1, img: portrait1, size: "w-14 h-14 md:w-16 md:h-16", pos: "left-6 top-1/4", floatDelay: 0 },
    { id: 2, img: portrait2, size: "w-8 h-8 md:w-10 md:h-10", pos: "left-12 top-[10%]", floatDelay: 1.5 },
    { id: 3, img: portrait3, size: "w-20 h-20 md:w-24 md:h-24", pos: "left-24 top-1/2", floatDelay: 0.5 },
    { id: 4, img: portrait4, size: "w-12 h-12 md:w-14 md:h-14", pos: "left-10 bottom-[10%]", floatDelay: 2.2 },

    // Right side avatars
    { id: 5, img: portrait5, size: "w-8 h-8 md:w-10 md:h-10", pos: "right-24 top-[15%]", floatDelay: 1 },
    { id: 6, img: portrait6, size: "w-12 h-12 md:w-14 md:h-14", pos: "right-12 top-1/3", floatDelay: 2 },
    { id: 7, img: portrait7, size: "w-24 h-24 md:w-28 md:h-28", pos: "right-16 bottom-[15%]", floatDelay: 0.8 },
    { id: 8, img: portrait8, size: "w-10 h-10 md:w-12 md:h-12", pos: "right-6 top-[8%]", floatDelay: 2.5 }
  ];

  return (
    <section id="testimonials" className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight">
            <span className="pill-green">What</span> our customers <br />
            says <span className="underline-yellow">About Us</span>
          </h2>
        </div>

        {/* Desktop: Floating collage / Mobile: Grid layout */}
        <div className="relative min-h-[500px] flex items-center justify-center">
          
          {/* Scattered Avatars (Desktop only) */}
          <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
            {avatars.map((avatar) => (
              <motion.div
                key={avatar.id}
                className={`absolute ${avatar.pos} pointer-events-auto`}
                animate={{
                  y: [0, -12, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: avatar.floatDelay
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  className={`${avatar.size} rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
                >
                  <img
                    src={avatar.img}
                    alt="Client"
                    className="w-full h-full object-cover img-circle"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl bg-[#EEF3F0] rounded-[32px] p-8 md:p-12 shadow-sm border border-[#E1ECE6]/60 relative z-10 text-center"
          >
            {/* Quote Icon Top Left */}
            <span className="absolute top-6 left-8 text-6xl text-gray-300 font-serif leading-none select-none">
              “
            </span>

            {/* Testimonial Content */}
            <p className="text-charcoal/80 text-base md:text-lg leading-relaxed px-4 md:px-6 relative z-10">
              Elementum delivered the site within the timeline as they requested. In the end, the client found a 50% increase in traffic within days since its launch. They also had an impressive ability to use technologies that the company hasn't used, which have also proved to be easy to use and reliable.
            </p>

            {/* Quote Icon Bottom Right */}
            <span className="absolute bottom-4 right-8 text-6xl text-gray-300 font-serif leading-none select-none">
              ”
            </span>
          </motion.div>

        </div>

        {/* Mobile/Tablet Avatars list (rendered inline since they are hidden on desktop) */}
        <div className="lg:hidden flex flex-wrap justify-center gap-3 mt-10 max-w-md mx-auto">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`${avatar.size} rounded-full overflow-hidden border border-white shadow-sm`}
            >
              <img
                src={avatar.img}
                alt="Client"
                className="w-full h-full object-cover img-circle"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
