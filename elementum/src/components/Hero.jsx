import { motion } from "framer-motion";
import portrait1 from "../assets/portrait_1.png";
import portrait2 from "../assets/portrait_2.png";
import portrait3 from "../assets/portrait_3.png";
import portrait4 from "../assets/portrait_4.png";
import portrait5 from "../assets/portrait_5.png";
import portrait6 from "../assets/portrait_6.png";
import portrait7 from "../assets/portrait_7.png";

export default function Hero() {
  // Staggered team members data
  const team = [
    { id: 1, img: portrait1, name: "Marcus", role: "Strategist", size: "w-20 h-20 md:w-28 md:h-28", yOffset: "translate-y-8" },
    { id: 2, img: portrait2, name: "Sarah", role: "Designer", size: "w-24 h-24 md:w-32 md:h-32", yOffset: "-translate-y-4" },
    { id: 3, img: portrait3, name: "David", role: "Director", size: "w-28 h-28 md:w-40 md:h-40", yOffset: "-translate-y-12" },
    { id: 4, img: portrait4, name: "Alex", role: "Researcher", size: "w-24 h-24 md:w-36 md:h-36", yOffset: "translate-y-4" },
    { id: 5, img: portrait5, name: "Elena", role: "Communicator", size: "w-26 h-26 md:w-36 md:h-36", yOffset: "-translate-y-8" },
    { id: 6, img: portrait6, name: "Jason", role: "Developer", size: "w-24 h-24 md:w-32 md:h-32", yOffset: "-translate-y-2" },
    { id: 7, img: portrait7, name: "Tariq", role: "Social Analyst", size: "w-20 h-20 md:w-28 md:h-28", yOffset: "translate-y-8" }
  ];

  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pb-32 bg-white" id="hero">
      {/* Decorative background shapes */}
      <div className="absolute top-20 left-10 opacity-30 select-none">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-coral">
          <path d="M10,60 Q30,10 60,60 T110,60" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="60" cy="60" r="4" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute right-10 top-40 w-16 h-16 rounded-full bg-[#A88BFA]/10 blur-xl md:block hidden" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-bold tracking-tight text-charcoal leading-[1.15] max-w-5xl mx-auto"
        >
          The <span className="underline-yellow">thinkers</span> and doers{" "}
          <br className="hidden md:inline" />
          were <span className="pill-pink">changing</span> the{" "}
          <span className="pill-green">status</span> Quo with
        </motion.h1>

        {/* Animated Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          We are a team of strategists, designers, communicators, and researchers.
          Together, we believe that progress only happens when you refuse to play things safe.
        </motion.p>

        {/* Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10"
        >
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-charcoal text-white rounded-full font-medium hover:bg-charcoal/90 hover:scale-102 active:scale-98 shadow-sm transition-all duration-300"
          >
            Explore our work
          </a>
        </motion.div>
      </div>

      {/* Floating Team Gallery */}
      <div className="mt-20 md:mt-28 w-full overflow-x-auto no-scrollbar px-6">
        <div className="flex md:grid md:grid-cols-7 justify-center items-center gap-4 md:gap-2 max-w-7xl mx-auto min-w-[850px] py-10">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.08, zIndex: 30 }}
              className={`flex flex-col items-center relative group cursor-pointer shrink-0 md:shrink ${member.yOffset}`}
            >
              {/* Profile image wrapper with decorative border on hover */}
              <div className={`${member.size} rounded-full overflow-hidden border-2 border-transparent group-hover:border-coral transition-colors duration-300 shadow-lg`}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover img-circle"
                />
              </div>

              {/* Hover Tooltip (Role) */}
              <div className="absolute -bottom-10 bg-charcoal text-white text-xs py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none whitespace-nowrap z-50">
                <span className="font-semibold">{member.name}</span> — {member.role}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
