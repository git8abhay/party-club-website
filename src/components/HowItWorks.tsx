import { motion } from "framer-motion";
import { Compass, MessageSquareCode, Sparkles, Milestone } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Discover Events",
      desc: "Find clubs, house parties, DJs, and exclusive rooftop sessions based on your budget and vibe preferences.",
      icon: Compass,
      color: "text-brand-secondary bg-brand-secondary/10 border-brand-secondary/25",
      glowColor: "shadow-brand-secondary/30",
    },
    {
      step: "02",
      title: "Book Instantly",
      desc: "Chat directly with hosts and artists, customize details, and pay advance amounts securely through UPI.",
      icon: MessageSquareCode,
      color: "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/25",
      glowColor: "shadow-purple-500/30",
    },
    {
      step: "03",
      title: "Enjoy The Experience",
      desc: "Get instant confirmation, WhatsApp reminders, and direct vendor sync. Turn up and have an unforgettable night!",
      icon: Sparkles,
      color: "text-brand-neonCyan bg-brand-neonCyan/10 border-brand-neonCyan/25",
      glowColor: "shadow-brand-neonCyan/30",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-[#07020e] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[40%] left-[-15%] w-[450px] h-[450px] rounded-full mesh-radial-purple opacity-20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-brand-secondary text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Milestone className="h-4 w-4 animate-bounce" />
            <span>Process Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            How <span className="text-gradient-pc">Party Club</span> Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-semibold max-w-xl mx-auto leading-relaxed">
            A seamless, chat-first experience designed to take you from discovery to booking in under 10 minutes.
          </p>
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Vertical connecting line for desktop/tablet */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-secondary via-brand-primary to-brand-neonCyan opacity-20 hidden lg:block transform -translate-x-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group flex flex-col items-center text-center relative"
                >
                  {/* Glowing Node Point */}
                  <div className="absolute top-[32px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/20 border-2 border-white hidden lg:block z-20 group-hover:scale-125 transition duration-300" />

                  {/* Icon Card */}
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border ${item.color} shadow-lg ${item.glowColor} mb-8 transition-transform duration-300 group-hover:scale-110 relative z-10`}>
                    <IconComponent className="h-9 w-9" />
                  </div>

                  {/* Number Badge */}
                  <span className="text-5xl font-black text-white/5 mb-4 leading-none select-none">
                    {item.step}
                  </span>

                  <h3 className="text-xl font-bold text-white group-hover:text-brand-secondary transition mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
