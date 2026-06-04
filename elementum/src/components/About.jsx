import { motion } from "framer-motion";
import teamMeeting from "../assets/team_meeting.png";
import developersCollaborating from "../assets/developers_collaborating.png";

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      {/* Decorative SVG Wavy Line (connecting the two about parts) */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        <svg width="100%" height="100%" viewBox="0 0 1440 1000" fill="none" className="text-coral opacity-40">
          <path
            d="M 900,280 C 1100,380 900,550 500,520 C 250,500 350,750 500,750 C 700,750 850,700 950,850"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="4 8"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-28 md:space-y-36">
        
        {/* About Part 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight">
              <span className="underline-yellow">Tomorrow</span> should <br />
              be better than <span className="pill-green">today</span>
            </h2>
            
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl">
              We are a team of strategists, designers, communicators, and researchers.
              Together, we believe that progress only happens when you refuse to play things safe.
            </p>

            <div>
              <a
                href="#services"
                className="group inline-flex items-center text-charcoal font-semibold text-[15px] hover:text-coral transition-colors duration-300"
              >
                Read more
                <span className="w-12 h-[1px] bg-charcoal mx-4 transition-all duration-300 group-hover:bg-coral group-hover:w-16" />
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>

          {/* Image block with red triangle badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px]">
              {/* Coral Red Triangle overlapping top right */}
              <div className="absolute -top-4 -right-4 w-28 h-28 md:w-36 md:h-36 bg-coral transform rotate-12 -z-10 rounded-lg clip-triangle" 
                   style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} 
              />
              
              {/* Main Circular Image */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                <img
                  src={teamMeeting}
                  alt="Team collaboration"
                  className="w-full h-full object-cover img-circle hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* About Part 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Image block (rearranged for desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1 relative"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px]">
              {/* Coral Red Triangles */}
              <div className="absolute -left-6 top-1/4 w-16 h-16 bg-coral transform -rotate-45 -z-10" 
                   style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
              <div className="absolute -bottom-4 right-1/4 w-24 h-24 bg-coral transform rotate-45 -z-10" 
                   style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />

              {/* Main Circular Image */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                <img
                  src={developersCollaborating}
                  alt="Developers working together"
                  className="w-full h-full object-cover img-circle hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight">
              <span className="pill-green">See</span> how we can <br />
              help you <span className="underline-yellow">progress</span>
            </h2>
            
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl">
              We add a layer of fearless insights and action that allows change makers
              to accelerate their progress in areas such as brand, design, digital,
              comms, and social research.
            </p>

            <div>
              <a
                href="#services"
                className="group inline-flex items-center text-charcoal font-semibold text-[15px] hover:text-coral transition-colors duration-300"
              >
                Read more
                <span className="w-12 h-[1px] bg-charcoal mx-4 transition-all duration-300 group-hover:bg-coral group-hover:w-16" />
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
