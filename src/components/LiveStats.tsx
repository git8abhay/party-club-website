import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Users2, GlassWater, Landmark, Navigation2 } from "lucide-react";

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<any>;
  duration?: number;
}

function CounterStat({ target, suffix, label, icon: IconComponent, duration = 1.5 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const totalSteps = 50;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = Math.ceil(end / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="glass-card p-8 rounded-3xl text-center border border-white/5 relative group hover:border-brand-secondary/35 transition duration-300">
      {/* Glow shadow inside */}
      <div className="absolute inset-0 group-hover:shadow-[0_0_25px_rgba(237,40,145,0.15)] rounded-3xl transition duration-500 pointer-events-none" />

      <div className="mx-auto w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-secondary mb-4 group-hover:scale-105 transition">
        <IconComponent className="h-6 w-6" />
      </div>

      <div className="text-4xl sm:text-5xl font-black text-white leading-none">
        {count.toLocaleString()}{suffix}
      </div>

      <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-3">
        {label}
      </div>
    </div>
  );
}

export default function LiveStats() {
  const stats = [
    { target: 50, suffix: "K+", label: "Active Users", icon: Users2 },
    { target: 10, suffix: "K+", label: "Events Planned", icon: GlassWater },
    { target: 500, suffix: "+", label: "Verified Venues", icon: Landmark },
    { target: 100, suffix: "+", label: "Cities Covered", icon: Navigation2 },
  ];

  return (
    <section className="relative py-20 bg-[#07020e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <CounterStat
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
