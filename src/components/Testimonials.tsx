import { motion } from "framer-motion";
import { Star, MessageSquareQuote, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "t-1",
      name: "Riya Sharma",
      role: "Birthday Host • Delhi NCR",
      rating: 5,
      content: "Shortlisted a premium decorator and a lounge in one sitting. It was 10x faster than messaging ten different random agencies on WhatsApp. The advance refund security gave us total peace of mind.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "t-2",
      name: "Karan Malhotra",
      role: "House Party Host • Mumbai",
      rating: 5,
      content: "Paying only the minor advance through UPI was the absolute unlock. It made securing our booking feel safe without slowing our discussions with DJ Neon Beats down. Exceptional experience!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "t-3",
      name: "Aisha Patel",
      role: "Corporate Lead • Bangalore",
      rating: 5,
      content: "We stopped wasting hours scrolling through random Instagram pages. Found verified lounges, chatted directly with venue managers, and closed our networking party deals within a few minutes.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "t-4",
      name: "Vikram Sen",
      role: "Rooftop Organizer • Pune",
      rating: 5,
      content: "The support sync was incredible. We had a last-minute schedule change and the platform processed our update with the DJ instantly. 100% recommended for hassle-free club management.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
  ];

  // Duplicate cards for infinite loop marquee
  const marqueeCards = [...testimonials, ...testimonials];

  return (
    <section className="relative py-24 bg-[#030008] overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-[30%] right-[-10%] w-[380px] h-[380px] rounded-full mesh-radial-purple opacity-15 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-brand-secondary text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <MessageSquareQuote className="h-4 w-4 text-brand-secondary" />
            <span>Community Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Loved By <span className="text-gradient-pc">Modern Hosts</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-semibold max-w-xl mx-auto leading-relaxed">
            See how party organizers are booking events with zero stress and direct vendor communication.
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="w-full relative flex overflow-x-hidden py-4 z-10">
        {/* Shadow shaders for edges to look fade-in-out */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#030008] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#030008] to-transparent z-20 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex gap-6 flex-nowrap"
        >
          {marqueeCards.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[300px] sm:w-[400px] shrink-0 p-6 rounded-3xl glass-card flex flex-col justify-between border border-white/5 hover:border-brand-secondary/20 transition-all duration-300 relative group"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition">
                <Quote className="h-8 w-8 text-brand-secondary" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 text-amber-400 mb-5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Review Copy */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border border-brand-primary/20 shadow"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-white">{item.name}</h4>
                  <span className="text-[10px] text-brand-muted font-bold block mt-0.5">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
