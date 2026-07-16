import { motion } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "../constants/appLinks";

export default function FinalCTA() {
  return (
    <section className="relative py-24 bg-[#07020e] overflow-hidden">
      {/* Dynamic Animated Mesh Backdrop */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 z-0" />
      
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.45, 0.35],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-[#3b0764]/20 to-brand-secondary/25 blur-[120px] z-0"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        {/* Glow Tagline */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/35 bg-brand-secondary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-brand-secondary backdrop-blur-md ring-1 ring-brand-secondary/15 mb-6">
          <Sparkles className="h-4.5 w-4.5 text-brand-secondary animate-pulse" />
          <span>Get Started Now</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.15] mb-6">
          Ready To Discover Your <span className="text-gradient-pc">Next Night Out?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl font-medium leading-relaxed mb-12">
          Download the mobile app today to chat directly with verified hosts, book VIP experience passes, and secure tickets instantly.
        </p>

        {/* App Download and Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-8">
          
          {/* iOS App Store Button */}
          <motion.a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-black border border-white/10 hover:border-brand-secondary/40 transition duration-300 shadow-xl cursor-pointer w-48 text-left group"
          >
            {/* Apple custom SVG path */}
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white fill-current group-hover:text-brand-secondary transition" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.1.08.2.12.31.12.87 0 1.94-.57 2.5-1.45" />
            </svg>
            <div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block">Download on the</span>
              <span className="text-sm font-extrabold text-white">App Store</span>
            </div>
          </motion.a>

          {/* Android Play Store Button */}
          <motion.a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-black border border-white/10 hover:border-brand-secondary/40 transition duration-300 shadow-xl cursor-pointer w-48 text-left group"
          >
            {/* Google Play custom SVG path */}
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white fill-current group-hover:text-brand-secondary transition" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25 3.02L13.6 11.37L5.25 19.72C5.07 19.46 5 19.11 5 18.71V4.03C5 3.63 5.07 3.28 5.25 3.02M19.97 12L14.7 6.73L6.37 14.7H6.38L14.7 13.02L19.97 12M5.25 2L14.7 11.45L19.97 12L14.7 12.55L5.25 22C4.55 22 4 21.45 4 20.75V3.25C4 2.55 4.55 2 5.25 2Z" />
            </svg>
            <div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block">Get it on</span>
              <span className="text-sm font-extrabold text-white">Google Play</span>
            </div>
          </motion.a>
        </div>

        {/* Explore Link CTA */}
        <a
          href="#events"
          className="text-xs uppercase font-extrabold tracking-widest text-slate-400 hover:text-white transition duration-200 mt-2 flex items-center gap-2"
        >
          <Compass className="h-4 w-4" />
          <span>Or Explore Vendors Web Feed</span>
        </a>
      </div>
    </section>
  );
}
