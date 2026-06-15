import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users2, MapPin, GlassWater } from "lucide-react";

interface CountUpProps {
  target: number;
  suffix: string;
  prefix?: string;
}

function CountUp({ target, suffix, prefix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;

    const end = target;
    const duration = 2.0; // Total count up time in seconds
    const totalSteps = 60; // 60fps equivalent tick steps
    const stepTime = (duration * 1000) / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      // Ease Out Quad interpolation: slows down near target value
      const easeOutProgress = progress * (2 - progress);
      const nextCount = Math.floor(easeOutProgress * end);

      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(nextCount);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function BrandShowcase() {
  return (
    <section 
      id="brand-showcase-section"
      className="relative py-24 bg-[#fffcfd] overflow-hidden w-full flex flex-col items-center justify-center min-h-[580px]"
    >
      
      {/* 1. Animated Curved Lines in the Background (Position translated gently for smooth waves) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#68268e" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#ed2891" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#68268e" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        
        {/* Wave Path 1 */}
        <motion.path
          d="M -100,220 C 300,80 500,420 900,160 C 1200,60 1400,380 1700,260"
          fill="none"
          stroke="url(#wave-gradient)"
          strokeWidth="2.5"
          animate={{ y: [0, 16, 0], x: [0, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wave Path 2 */}
        <motion.path
          d="M -50,380 C 250,480 600,120 1000,280 C 1300,380 1520,120 1800,180"
          fill="none"
          stroke="url(#wave-gradient)"
          strokeWidth="1.5"
          animate={{ y: [0, -14, 0], x: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Wave Path 3 (Dotted) */}
        <motion.path
          d="M -150,120 C 150,320 420,140 820,240 C 1120,320 1280,80 1620,140"
          fill="none"
          stroke="url(#wave-gradient)"
          strokeWidth="1.2"
          strokeDasharray="6,6"
          animate={{ y: [0, 10, 0], x: [0, 6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      {/* 2. Floating Party Accents */}
      
      {/* A. Disco Ball (Top Left) */}
      <motion.div
        className="absolute top-[12%] left-[4%] md:left-[12%] w-20 h-20 md:w-28 md:h-28 z-10 pointer-events-none select-none"
        animate={{ y: [0, -12, 0], rotate: 360 }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 28, repeat: Infinity, ease: "linear" }
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(104,38,142,0.12)]">
          <defs>
            <radialGradient id="disco-grad" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#e2d5f8" />
              <stop offset="75%" stopColor="#68268e" />
              <stop offset="100%" stopColor="#25043d" />
            </radialGradient>
          </defs>
          <line x1="50" y1="0" x2="50" y2="20" stroke="#bda2f7" strokeWidth="2.5" strokeOpacity="0.4" />
          <circle cx="50" cy="55" r="32" fill="url(#disco-grad)" />
          <path
            d="M 50,23 A 32,32 0 0,0 50,87 M 50,23 A 18,32 0 0,0 50,87 M 50,23 A 8,32 0 0,0 50,87 M 50,23 A 8,32 0 0,1 50,87 M 50,23 A 18,32 0 0,1 50,87 M 18,55 Q 50,42 82,55 M 19,64 Q 50,51 81,64 M 19,46 Q 50,33 81,46 M 26,37 Q 50,24 74,37 M 26,73 Q 50,60 74,73"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeOpacity="0.45"
            fill="none"
          />
          <circle cx="42" cy="42" r="3" fill="#ffffff" opacity="0.6" />
          <circle cx="48" cy="36" r="1.5" fill="#ffffff" opacity="0.8" />
        </svg>
      </motion.div>

      {/* B. Helium Balloons (Top Right) */}
      <motion.div
        className="absolute top-[10%] right-[4%] md:right-[12%] w-24 h-24 md:w-32 md:h-32 z-10 pointer-events-none select-none"
        animate={{ y: [0, -16, 0], x: [0, 8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_12px_24px_rgba(237,40,145,0.15)]">
          <defs>
            <radialGradient id="balloon-pink" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffd1e8" />
              <stop offset="45%" stopColor="#ed2891" />
              <stop offset="100%" stopColor="#9e1058" />
            </radialGradient>
            <radialGradient id="balloon-purple" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#eccfff" />
              <stop offset="45%" stopColor="#68268e" />
              <stop offset="100%" stopColor="#3d0e5c" />
            </radialGradient>
          </defs>
          <g transform="translate(15, 10)">
            <path d="M 40,25 C 20,25 10,50 10,65 C 10,85 25,95 40,95 C 55,95 70,85 70,65 C 70,50 60,25 40,25 Z" fill="url(#balloon-purple)" />
            <polygon points="40,95 36,101 44,101" fill="#68268e" />
            <path d="M 40,101 Q 37,112 44,120" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
            <ellipse cx="28" cy="45" rx="4" ry="8" fill="#ffffff" opacity="0.3" transform="rotate(-15, 28, 45)" />
          </g>
          <g transform="translate(48, 22)">
            <path d="M 35,20 C 15,20 5,42 5,55 C 5,72 18,80 35,80 C 52,80 65,72 65,55 C 65,42 55,20 35,20 Z" fill="url(#balloon-pink)" />
            <polygon points="35,80 31,85 39,85" fill="#ed2891" />
            <path d="M 35,85 Q 38,98 32,108" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
            <ellipse cx="23" cy="38" rx="3" ry="6" fill="#ffffff" opacity="0.4" transform="rotate(-15, 23, 38)" />
          </g>
        </svg>
      </motion.div>

      {/* C. Cocktail Glass (Bottom Left) */}
      <motion.div
        className="absolute bottom-[16%] left-[3%] md:left-[10%] w-20 h-20 md:w-28 md:h-28 z-10 pointer-events-none select-none"
        animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_18px_rgba(28,28,28,0.05)]">
          <defs>
            <linearGradient id="cocktail-liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffa6d2" />
              <stop offset="100%" stopColor="#ed2891" />
            </linearGradient>
          </defs>
          <g transform="translate(26, 16) rotate(-15)">
            <circle cx="10" cy="10" r="9" fill="#eab308" />
            <circle cx="10" cy="10" r="7.5" fill="#fef08a" />
            <line x1="10" y1="2.5" x2="10" y2="17.5" stroke="#eab308" strokeWidth="1" />
            <line x1="2.5" y1="10" x2="17.5" y2="10" stroke="#eab308" strokeWidth="1" />
          </g>
          <line x1="53" y1="14" x2="70" y2="52" stroke="#68268e" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="52" x2="78" y2="72" stroke="#68268e" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
          <polygon points="35,46 65,46 50,70" fill="url(#cocktail-liquid)" />
          <path d="M 20,30 L 80,30 L 53,72 L 53,90 L 68,90 L 68,93 L 32,93 L 32,90 L 47,90 L 47,72 Z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
          <path d="M 23,32 L 40,32" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        </svg>
      </motion.div>

      {/* D. Party Popper (Bottom Right) */}
      <motion.div
        className="absolute bottom-[14%] right-[3%] md:right-[10%] w-24 h-24 md:w-32 md:h-32 z-10 pointer-events-none select-none"
        animate={{ y: [0, -10, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_12px_24px_rgba(104,38,142,0.1)]">
          <path d="M 25,30 Q 15,20 18,8" stroke="#ed2891" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 40,32 Q 45,18 35,5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 32,42 Q 20,55 8,48" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 42,48 Q 55,62 48,75" stroke="#eab308" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="18" r="3" fill="#ed2891" />
          <circle cx="38" cy="12" r="2.5" fill="#68268e" />
          <rect x="12" y="32" width="4" height="4" fill="#06b6d4" transform="rotate(15, 12, 32)" />
          <polygon points="28,2 25,6 31,6" fill="#f97316" />
          <circle cx="15" cy="46" r="2" fill="#84cc16" />
          
          <g transform="translate(40,40) rotate(-45)">
            <path d="M 0,0 L 40,-15 L 40,15 Z" fill="url(#popper-gradient)" />
            <ellipse cx="40" cy="0" rx="4" ry="15" fill="#ed2891" />
            <path d="M 12,-4.5 L 12,4.5" stroke="#ffffff" strokeWidth="3" opacity="0.7" />
            <path d="M 26,-9.5 L 26,9.5" stroke="#ffffff" strokeWidth="3" opacity="0.7" />
          </g>
          <defs>
            <linearGradient id="popper-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#68268e" />
              <stop offset="100%" stopColor="#ed2891" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Small floating scatter accents */}
      <motion.div
        className="absolute top-[38%] left-[22%] w-3 h-3 bg-[#ed2891]/25 rounded-full pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[35%] right-[22%] w-4.5 h-4.5 bg-[#68268e]/20 rounded-full pointer-events-none"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute top-[18%] left-[34%] w-4 h-4 bg-emerald-400/20 rounded-full pointer-events-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[32%] w-3 h-3 bg-amber-400/25 rounded-full pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {/* 3. Central Brand Content */}
      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col items-center justify-between z-10 relative">
        
        {/* Core texts */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <img
              src="/logo_1old.png"
              alt="Party Club App Icon"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-2xl shadow-[0_10px_25px_rgba(104,38,142,0.12)] border border-purple-100"
            />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-slate-800 font-display">
            Better parties for <span className="font-serif italic font-normal text-gradient-pc">more people</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg font-semibold mt-5 leading-relaxed max-w-xl mx-auto">
            For years, we’ve enabled hosts and party lovers to discover verified vendors, hire top-tier DJs, and secure premier catering—delivered right to your celebration.
          </p>
        </div>

        {/* 4. Statistics Pill Bar (Zomato-style stats pill layout) */}
        <div className="bg-white border border-[#f3e8f5] shadow-[0_20px_50px_rgba(104,38,142,0.05)] rounded-[32px] md:rounded-full px-8 py-7 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_25px_60px_rgba(104,38,142,0.08)] animate-fade-in">
          
          {/* Stat 1 */}
          <div className="flex-1 flex items-center justify-center gap-5 w-full md:w-auto">
            <div className="text-center md:text-left">
              <span className="block text-3xl font-black text-slate-800 tracking-tight">
                <CountUp target={50000} suffix="+" />
              </span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5 block">happy hosts</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#68268e]/5 to-[#ed2891]/5 border border-[#f5ebf7] flex items-center justify-center text-[#68268e] flex-shrink-0">
              <Users2 className="h-6 w-6" />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block h-10 w-[1px] bg-slate-200" />

          {/* Stat 2 */}
          <div className="flex-1 flex items-center justify-center gap-5 w-full md:w-auto">
            <div className="text-center md:text-left">
              <span className="block text-3xl font-black text-slate-800 tracking-tight">
                <CountUp target={100} suffix="+" />
              </span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5 block">cities covered</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#68268e]/5 to-[#ed2891]/5 border border-[#f5ebf7] flex items-center justify-center text-[#ed2891] flex-shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block h-10 w-[1px] bg-slate-200" />

          {/* Stat 3 */}
          <div className="flex-1 flex items-center justify-center gap-5 w-full md:w-auto">
            <div className="text-center md:text-left">
              <span className="block text-3xl font-black text-slate-800 tracking-tight">
                <CountUp target={10000} suffix="+" />
              </span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5 block">parties planned</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#68268e]/5 to-[#ed2891]/5 border border-[#f5ebf7] flex items-center justify-center text-[#68268e] flex-shrink-0">
              <GlassWater className="h-6 w-6" />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
