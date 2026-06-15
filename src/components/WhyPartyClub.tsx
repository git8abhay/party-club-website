import { motion } from "framer-motion";
import { ShieldCheck, Star, Zap, Bell, Percent, ShieldAlert, Sparkles } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  color: string;
  glow: string;
}

export default function WhyPartyClub() {
  const features: Feature[] = [
    {
      id: "feat-1",
      title: "Verified Events Only",
      desc: "Every listed venue, nightclub, and independent DJ is manually vetted. No fake parties, no duplicate ticket listings.",
      icon: ShieldCheck,
      color: "text-green-400 bg-green-400/5 border-green-400/15",
      glow: "group-hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]",
    },
    {
      id: "feat-2",
      title: "VIP Backstage Access",
      desc: "Unlock premium tables, skip-the-line entry vouchers, and priority artist lounge lounge passes through the application.",
      icon: Star,
      color: "text-amber-400 bg-amber-400/5 border-amber-400/15",
      glow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]",
    },
    {
      id: "feat-3",
      title: "Instant UPI Booking",
      desc: "Pay a minimal token amount to confirm your tickets or table reservation, with the remainder payable directly at the venue.",
      icon: Zap,
      color: "text-brand-secondary bg-brand-secondary/5 border-brand-secondary/15",
      glow: "group-hover:shadow-[0_0_20px_rgba(237,40,145,0.2)]",
    },
    {
      id: "feat-4",
      title: "Real-time Chat Sync",
      desc: "Discuss playlist tracks and special decors directly with vendors via our integrated message board. Zero middlemen.",
      icon: Bell,
      color: "text-[#a855f7] bg-[#a855f7]/5 border-[#a855f7]/15",
      glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    },
    {
      id: "feat-5",
      title: "Exclusive Club Discounts",
      desc: "Enjoy up to 25% off on cover charges and drinks by pre-booking through our partner club networks.",
      icon: Percent,
      color: "text-brand-neonCyan bg-brand-neonCyan/5 border-brand-neonCyan/15",
      glow: "group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]",
    },
    {
      id: "feat-6",
      title: "Secure Advance Payments",
      desc: "All payments are routed via certified gateways. In case of host cancellations, enjoy 100% immediate refunds.",
      icon: ShieldAlert,
      color: "text-red-400 bg-red-400/5 border-red-400/15",
      glow: "group-hover:shadow-[0_0_20px_rgba(248,113,113,0.2)]",
    },
  ];

  return (
    <section id="why-us" className="relative py-24 bg-[#07020e] overflow-hidden">
      {/* Background radial shades */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] rounded-full mesh-radial-purple opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] rounded-full mesh-radial-pink opacity-15 blur-[95px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-brand-secondary text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="h-4 w-4 text-brand-secondary" />
            <span>Platform Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Why Party Hosts <span className="text-gradient-pc">Trust Party Club</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-semibold max-w-xl mx-auto leading-relaxed">
            We solve the chaos of nightlife planning with upfront clarity, secure payments, and authenticated reviews.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative rounded-3xl glass-card p-8 flex flex-col h-full hover:border-brand-secondary/30 transition duration-300"
              >
                {/* Icon Wrapper */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${feature.color} mb-6 transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-secondary transition mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  {feature.desc}
                </p>

                {/* Glowing Overlay border */}
                <div className={`absolute inset-0 rounded-3xl transition duration-500 z-10 pointer-events-none ${feature.glow}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
