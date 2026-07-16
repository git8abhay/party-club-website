import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "../constants/appLinks";

export default function Hero() {

  return (
    <div className="relative">
      {/* 1. Full-screen Video Splash Page */}
      <section className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-10 bg-slate-900 animate-gradient-bg">
        
        {/* Cinematic Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/45 z-0" />

        {/* Ambient Glow Blobs */}
        <div className="absolute top-[10%] left-[10%] w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full bg-brand-primary/15 blur-[90px] sm:blur-[120px] pointer-events-none z-0 animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full bg-brand-secondary/15 blur-[85px] sm:blur-[110px] pointer-events-none z-0 animate-pulse" />

        {/* Splash Content Container */}
        <div className="max-w-4xl mx-auto px-4 w-full text-center relative z-10 flex flex-col items-center pb-20 pt-8">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="mb-6 select-none"
          >
            <img
              src="/logo_1.png"
              alt="Party Club Logo"
              className="h-24 min-[360px]:h-28 sm:h-32 md:h-36 w-auto object-contain filter drop-shadow-[0_8px_32px_rgba(237,40,145,0.35)]"
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.12] max-w-3xl mb-4 font-display"
          >
            Plan Your <span className="font-serif italic font-normal text-gradient-pc">Perfect Party</span> in Minutes
          </motion.h1>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.2 }}
            className="text-slate-200 text-sm sm:text-base font-semibold mb-8 max-w-xl leading-relaxed"
          >
            Experience fast & easy local vendor booking on the Party Club app
          </motion.p>

          {/* Download App Store Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a 
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="block w-40 min-h-12 p-1 bg-black/85 backdrop-blur hover:border-brand-secondary/50 transition duration-300"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on App Store" className="w-full h-auto" />
            </motion.a>
            <motion.a 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="block w-40 min-h-12 p-1 bg-black/85 backdrop-blur hover:border-brand-secondary/50 transition duration-300"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="w-full h-auto" />
            </motion.a>
          </motion.div>

        </div>

        {/* Scroll Down caret positioned relative to Section bottom edge */}
        <div
          onClick={() => document.getElementById("brand-showcase-section")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex min-h-11 flex-col items-center justify-center gap-1.5 text-slate-300 text-[10px] font-black uppercase tracking-widest animate-bounce cursor-pointer select-none z-20 hover:text-white transition"
          role="button"
          tabIndex={0}
          aria-label="Scroll to party stats"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              document.getElementById("brand-showcase-section")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span>Scroll down</span>
          <ChevronDown className="h-4.5 w-4.5" />
        </div>
      </section>
    </div>
  );
}
