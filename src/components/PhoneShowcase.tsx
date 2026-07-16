import { useState } from "react";
import { motion } from "framer-motion";
import { APP_STORE_URL, PLAY_STORE_URL } from "../constants/appLinks";
import {
  Bell,
  Cake,
  Calendar,
  ChevronDown,
  Grid2X2,
  Heart,
  Home,
  MapPinned,
  MapPin,
  Mic,
  Music,
  Percent,
  Search,
  Sparkles,
  UserRound,
  Wallet,
  GlassWater,
  MessageSquare,
} from "lucide-react";

export default function PhoneShowcase() {
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [inputValue, setInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleShareLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setInputValue("");
    }, 3000);
  };

  const floatingBadges = [
    {
      title: "Balloon Decor",
      desc: "100% custom theme decorators",
      icon: Sparkles,
      colorClass: "bg-purple-50 text-purple-600 border-purple-100",
      gradient: "from-[#68268e]/10 to-[#ed2891]/5",
      position: "top-[8%] left-[4%] xl:left-[8%]",
      animateY: [0, -8, 0],
      duration: 4.5,
      delay: 0.2,
    },
    {
      title: "VIP Catering",
      desc: "Curated party menus & drinks",
      icon: GlassWater,
      colorClass: "bg-amber-50 text-amber-600 border-amber-100",
      gradient: "from-amber-500/10 to-orange-500/5",
      position: "top-[28%] left-[1%] xl:left-[4%]",
      animateY: [0, -10, 0],
      duration: 5.2,
      delay: 0.8,
    },
    {
      title: "House DJs",
      desc: "Live sound, lights & top beats",
      icon: Music,
      colorClass: "bg-indigo-50 text-indigo-600 border-indigo-100",
      gradient: "from-indigo-500/10 to-blue-500/5",
      position: "top-[48%] left-[4%] xl:left-[8%]",
      animateY: [0, -7, 0],
      duration: 3.8,
      delay: 0.4,
    },
    {
      title: "Gift Cards",
      desc: "Surprise custom event credits",
      icon: Wallet,
      colorClass: "bg-pink-50 text-pink-600 border-pink-100",
      gradient: "from-pink-500/10 to-rose-500/5",
      position: "top-[68%] left-[10%] xl:left-[14%]",
      animateY: [0, -9, 0],
      duration: 4.8,
      delay: 1.2,
    },
    // Right Column
    {
      title: "Custom Cakes",
      desc: "Handcrafted birthday bakes",
      icon: Cake,
      colorClass: "bg-rose-50 text-rose-600 border-rose-100",
      gradient: "from-rose-500/10 to-pink-500/5",
      position: "top-[8%] right-[4%] xl:right-[8%]",
      animateY: [0, -9, 0],
      duration: 4.2,
      delay: 0.6,
    },
    {
      title: "Special Offers",
      desc: "Exclusive partner cashbacks",
      icon: Percent,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
      gradient: "from-emerald-500/10 to-teal-500/5",
      position: "top-[28%] right-[1%] xl:right-[4%]",
      animateY: [0, -7, 0],
      duration: 5.5,
      delay: 1.0,
    },
    {
      title: "Direct Chat",
      desc: "Negotiate budgets with hosts",
      icon: MessageSquare,
      colorClass: "bg-blue-50 text-blue-600 border-blue-100",
      gradient: "from-blue-500/10 to-cyan-500/5",
      position: "top-[48%] right-[4%] xl:right-[8%]",
      animateY: [0, -8, 0],
      duration: 4.0,
      delay: 0.1,
    },
    {
      title: "Book Slot",
      desc: "1-click calendar reservation",
      icon: Calendar,
      colorClass: "bg-red-50 text-red-600 border-red-100",
      gradient: "from-red-500/10 to-rose-500/5",
      position: "top-[68%] right-[10%] xl:right-[14%]",
      animateY: [0, -11, 0],
      duration: 5.0,
      delay: 1.5,
    },
  ];

  const phoneMockupContent = (isMobile: boolean = false) => {
    const categoryItems = [
      {
        name: "Birthday Decorators",
        image: "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 45%, #f97316 100%)",
      },
      {
        name: "Cake Vendors",
        image: "linear-gradient(135deg, #f8d7a8 0%, #8b4513 48%, #2b1208 100%)",
      },
      {
        name: "DJs",
        image: "linear-gradient(135deg, #111827 0%, #64748b 45%, #ef4444 100%)",
      },
      {
        name: "Photographers",
        image: "linear-gradient(135deg, #111111 0%, #3f3f46 55%, #0f172a 100%)",
      },
    ];

    return (
      <div className={`relative ${isMobile ? 'w-[min(280px,calc(100vw-42px))] h-[520px]' : 'w-[330px] h-[580px]'} bg-black rounded-t-[44px] p-3 shadow-[0_25px_60px_rgba(104,38,142,0.14)] border-4 border-b-0 border-slate-850 flex flex-col overflow-hidden`}>
        {/* iPhone Notch */}
        <div className="absolute top-4.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30" />

        {/* Screen Shell */}
        <div className="w-full h-full rounded-t-[30px] bg-white border border-slate-200 flex flex-col overflow-hidden relative text-left">
          <div className="bg-[#5f1b7b] px-4 pt-8 pb-5 rounded-b-[24px] shadow-[0_12px_24px_rgba(95,27,123,0.22)]">
            <div className="flex items-start justify-between gap-3 text-white">
              <div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 stroke-[3]" />
                  <span className="text-[17px] font-black leading-none">New Delhi</span>
                  <ChevronDown className="h-3.5 w-3.5 mt-0.5" />
                </div>
                <p className="mt-2 text-[11px] font-extrabold text-white/80 leading-none">
                  New Delhi, Uttar Pradesh, India
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white">
                  <Bell className="h-4.5 w-4.5" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#9f7a20] bg-[#fff2b9] text-[#7a5610]">
                  <span className="text-base font-black">T</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex h-12 items-center gap-3 rounded-[22px] bg-white px-4 text-slate-500 shadow-[0_8px_18px_rgba(22,22,22,0.16)]">
              <Search className="h-5 w-5 shrink-0 text-slate-500" />
              <span className="min-w-0 flex-1 truncate text-[12px] font-black text-slate-400">
                Search "decorator, dj, cake vendor"
              </span>
              <Mic className="h-5 w-5 shrink-0 text-slate-500" />
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-white px-4 pb-[58px] pt-5">
            <div className="relative">
              <div className="absolute -left-20 top-0 h-[118px] w-20 rounded-r-[22px] bg-slate-950 shadow-lg" />
              <div className="ml-4 h-[126px] rounded-[24px] bg-[linear-gradient(135deg,rgba(31,41,55,0.05),rgba(0,0,0,0.55)),url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center shadow-[0_8px_18px_rgba(15,23,42,0.12)]">
                <div className="flex h-full flex-col justify-end rounded-[24px] bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4 text-white">
                  <h4 className="text-xl font-black leading-tight">Wedding & Sangeet</h4>
                  <p className="mt-1 text-[12px] font-semibold text-white/90">Make Every Event Memorable</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-7 rounded-full bg-[#7b2aa2]" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h3 className="text-[19px] font-black leading-none text-black">Explore by Category</h3>
              <span className="text-[14px] font-black text-slate-500">See All</span>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {categoryItems.map((item) => (
                <div key={item.name} className="min-w-0 text-center">
                  <div
                    className="mx-auto h-[50px] w-[50px] rounded-[14px] border border-slate-200 bg-cover bg-center shadow-[0_5px_12px_rgba(15,23,42,0.16)]"
                    style={{ backgroundImage: item.image }}
                  />
                  <p className="mt-2 text-[10.5px] font-extrabold leading-tight text-slate-800">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h3 className="text-[18px] font-black leading-tight text-black">Exclusive Deals & Vendors Nearby</h3>
              <span className="shrink-0 pl-3 text-[14px] font-black text-slate-500">See All</span>
            </div>

            <div className="relative mt-4 h-[165px] overflow-hidden rounded-[20px] border border-pink-100 bg-gradient-to-br from-[#d5a15e] via-[#fff0d8] to-[#ffd9dd] shadow-[0_8px_18px_rgba(15,23,42,0.1)]">
              <div className="absolute inset-0 opacity-35">
                <div className="absolute left-1/2 top-8 h-28 w-[2px] -translate-x-1/2 rounded-full bg-[#b98543]" />
                <div className="absolute left-1/2 top-8 h-24 w-10 -translate-x-1/2 rounded-b-full border-2 border-t-0 border-[#b98543]" />
                <div className="absolute left-[52%] top-5 text-2xl text-[#b98543]">✦</div>
                <div className="absolute left-[46%] top-16 text-lg text-[#b98543]">✦</div>
              </div>
              <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-red-500 shadow-md" aria-label="Add vendor to wishlist">
                <Heart className="h-5 w-5 fill-current" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 to-transparent p-4">
                <span className="inline-flex rounded bg-[#d8177c] px-2 py-1 text-[10px] font-black uppercase text-white">
                  Birthday Decorators
                </span>
                <p className="mt-2 text-[13px] font-black text-white">Premium venue styling from local experts</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 grid h-[54px] grid-cols-5 border-t border-slate-200 bg-white text-slate-500 shadow-[0_-6px_14px_rgba(15,23,42,0.08)]">
            {[
              { label: "Home", icon: Home, active: true },
              { label: "Wishlist", icon: Heart },
              { label: "Category", icon: Grid2X2 },
              { label: "Map", icon: MapPinned },
              { label: "Account", icon: UserRound },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex flex-col items-center justify-center gap-0.5 text-[9.5px] font-black ${item.active ? "text-[#d8177c]" : "text-slate-500"}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#fcf8f9] transition-colors duration-800 w-full overflow-hidden">
      
      {/* SECTION 1: Zomato-style Showcase with emerging phone and floating badges */}
      <section className="pt-20 pb-0 relative w-full flex flex-col items-center">
        <div className="max-w-6xl mx-auto px-4 w-full text-center">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 font-display text-slate-800">
              What’s <span className="font-serif italic font-normal text-gradient-pc">waiting for you</span> on the app?
            </h2>
            <p className="text-sm sm:text-lg font-semibold leading-relaxed text-slate-500 max-w-xl mx-auto">
              Our app is packed with premium features that enable you to plan and book local party services like never before
            </p>
          </div>
        </div>

        {/* Display Wrapper */}
        <div className="w-full relative">
          
          {/* Desktop/Large screen interactive visual showcase area */}
          <div className="hidden lg:block relative w-full max-w-6xl mx-auto h-[640px] overflow-hidden">
            
            {/* Emerging Phone Mockup */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
              <motion.div
                initial={{ y: 320, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 85, damping: 20 }}
              >
                {phoneMockupContent(false)}
              </motion.div>
            </div>

            {/* Absolute positioned floating cards */}
            {floatingBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  className={`absolute ${badge.position} z-20 w-[240px] xl:w-[260px]`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: badge.delay }}
                >
                  <motion.div
                    className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-[0_8px_30px_rgba(104,38,142,0.05)] rounded-[20px] p-3.5 flex items-center gap-3.5 cursor-pointer transition-colors duration-300 hover:border-brand-primary/30"
                    whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(104,38,142,0.1)" }}
                    animate={{ y: badge.animateY }}
                    transition={{
                      y: {
                        duration: badge.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "mirror"
                      }
                    }}
                  >
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${badge.gradient} ${badge.colorClass.split(' ')[1]} flex-shrink-0`}>
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-extrabold text-[13.5px] text-slate-800 leading-tight">
                        {badge.title}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-normal">
                        {badge.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile/Tablet responsive layout */}
          <div className="block lg:hidden w-full">
            {/* Grid of feature badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 px-4 max-w-xl mx-auto z-20 relative">
              {floatingBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={idx}
                    className="bg-white border border-slate-100 shadow-[0_8px_24px_rgba(104,38,142,0.04)] rounded-[16px] p-3.5 flex min-h-20 items-center gap-3.5 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${badge.gradient} ${badge.colorClass.split(' ')[1]} flex-shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-extrabold text-sm text-slate-800 leading-tight">
                        {badge.title}
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5 leading-normal">
                        {badge.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Emerging Phone Mockup at the bottom */}
            <div className="relative mt-12 w-full flex justify-center overflow-hidden">
              <motion.div
                initial={{ y: 150, opacity: 0.5 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 90, damping: 20 }}
              >
                {phoneMockupContent(true)}
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Minimal, Professional and Premium Zomato-style Download App Box */}
      <section className="py-20 px-4 flex flex-col items-center">
        <div className="max-w-6xl mx-auto w-full">
          
          <div 
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            className={`rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] p-5 sm:p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 relative overflow-hidden text-left transition-all duration-500 border ${
              isCardHovered
                ? "bg-[#0f051d] border-purple-950/60 shadow-[0_25px_60px_rgba(237,40,145,0.18)]"
                : "bg-white border-[#f3e8f5] shadow-[0_20px_50px_rgba(104,38,142,0.04)]"
            }`}
          >
            
            {/* Design accents */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-[#ed2891]/5 to-transparent rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${isCardHovered ? 'opacity-100' : 'opacity-80'}`} />
            <div className={`absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-t from-[#68268e]/5 to-transparent rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${isCardHovered ? 'opacity-100' : 'opacity-80'}`} />

            {/* Left Column: Form & App Links */}
            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start relative z-10">
              <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black leading-[1.12] font-display mb-4 transition-colors duration-500 ${
                isCardHovered ? "text-white" : "text-slate-800"
              }`}>
                Get the <span className="font-serif italic font-normal text-gradient-pc">Party Club</span> app
              </h3>
              <p className={`text-sm sm:text-base md:text-lg font-semibold max-w-md leading-relaxed transition-colors duration-500 ${
                isCardHovered ? "text-slate-300" : "text-slate-500"
              }`}>
                We will send you a link, open it on your phone to download the app
              </p>

              {/* Share link form */}
              <form onSubmit={handleShareLink} className="w-full max-w-md mt-6 mb-8">
                <div className="flex items-center justify-center md:justify-start gap-6 mb-4">
                  <label className={`flex items-center gap-2 text-sm font-extrabold cursor-pointer select-none transition-colors duration-500 ${
                    isCardHovered ? "text-slate-300" : "text-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="contactMethod"
                      checked={contactMethod === "email"}
                      onChange={() => { setContactMethod("email"); setInputValue(""); }}
                      className="w-4.5 h-4.5 text-[#68268e] focus:ring-[#68268e] border-slate-350 accent-[#68268e]"
                    />
                    <span>Email</span>
                  </label>
                  <label className={`flex items-center gap-2 text-sm font-extrabold cursor-pointer select-none transition-colors duration-500 ${
                    isCardHovered ? "text-slate-300" : "text-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="contactMethod"
                      checked={contactMethod === "phone"}
                      onChange={() => { setContactMethod("phone"); setInputValue(""); }}
                      className="w-4.5 h-4.5 text-[#68268e] focus:ring-[#68268e] border-slate-350 accent-[#68268e]"
                    />
                    <span>Phone</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type={contactMethod === "email" ? "email" : "tel"}
                    placeholder={contactMethod === "email" ? "Enter your email" : "Enter phone number"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    className={`flex-1 min-w-0 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#68268e] focus:border-transparent text-sm font-semibold shadow-inner transition-all duration-500 ${
                      isCardHovered 
                        ? "bg-[#180a29] border-purple-900/40 text-white focus:ring-[#ed2891]" 
                        : "bg-white border-slate-200 text-slate-800"
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#68268e] to-[#ed2891] hover:opacity-95 text-white font-extrabold text-sm transition shadow-md active:scale-95 flex min-h-11 items-center justify-center min-w-[140px]"
                  >
                    {isSubmitted ? "Link Sent! ✓" : "Share App Link"}
                  </button>
                </div>
              </form>

              {/* Subtitle store links */}
              <span className={`text-[11px] font-black uppercase tracking-widest block mb-4 select-none transition-colors duration-500 ${
                isCardHovered ? "text-slate-400" : "text-slate-400"
              }`}>
                Download app from
              </span>

              {/* Stores download badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-40 border rounded-xl p-1 bg-black transition shadow-sm cursor-pointer ${
                    isCardHovered ? "border-purple-900/60 hover:border-[#ed2891]/60" : "border-slate-200 hover:border-[#ed2891]/40"
                  }`}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="w-full h-auto select-none"
                  />
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-40 border rounded-xl p-1 bg-black transition shadow-sm cursor-pointer ${
                    isCardHovered ? "border-purple-900/60 hover:border-[#ed2891]/60" : "border-slate-200 hover:border-[#ed2891]/40"
                  }`}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on App Store"
                    className="w-full h-auto select-none"
                  />
                </a>
              </div>
            </div>

            {/* Right Column: Phone mockup frame containing QR code (Stays light theme as per mockup) */}
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center relative z-10">
              
              <div
                className="relative w-[min(290px,calc(100vw-64px))] h-[370px] bg-black rounded-t-[44px] p-3 shadow-[0_20px_50px_rgba(104,38,142,0.1)] border-4 border-b-0 border-slate-850 flex flex-col overflow-hidden"
              >
                {/* iPhone Notch */}
                <div className="absolute top-4.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30" />

                {/* iPhone Screen Container (Light mode theme) */}
                <div className="w-full h-full rounded-t-[30px] bg-white border border-slate-200 flex flex-col items-center pt-8 px-5 overflow-hidden relative">
                  
                  {/* Glass glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/[0.01] to-transparent pointer-events-none z-20" />

                  {/* Scan QR Code Heading */}
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-5 text-center select-none max-w-[160px] leading-relaxed">
                    Scan the QR code to download the app
                  </span>

                  {/* QR code container */}
                  <div className="p-3.5 bg-white border border-[#f5ebf7] rounded-2xl shadow-[0_8px_24px_rgba(104,38,142,0.06)] flex items-center justify-center relative">
                    
                    {/* QR code SVG */}
                    <svg viewBox="0 0 100 100" className="w-32 h-32 text-slate-800" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Finder patterns */}
                      <rect x="0" y="0" width="28" height="28" rx="4" stroke="#68268e" strokeWidth="6" />
                      <rect x="8" y="8" width="12" height="12" rx="2" fill="#ed2891" />

                      <rect x="72" y="0" width="28" height="28" rx="4" stroke="#68268e" strokeWidth="6" />
                      <rect x="80" y="8" width="12" height="12" rx="2" fill="#ed2891" />

                      <rect x="0" y="72" width="28" height="28" rx="4" stroke="#68268e" strokeWidth="6" />
                      <rect x="8" y="80" width="12" height="12" rx="2" fill="#ed2891" />

                      <rect x="76" y="76" width="12" height="12" rx="2" stroke="#68268e" strokeWidth="3" />
                      <rect x="80" y="80" width="4" height="4" rx="1" fill="#ed2891" />

                      {/* QR Data bits */}
                      <rect x="36" y="0" width="6" height="6" fill="currentColor" />
                      <rect x="44" y="0" width="12" height="6" fill="currentColor" />
                      <rect x="60" y="6" width="6" height="12" fill="currentColor" />
                      <rect x="36" y="12" width="18" height="6" fill="currentColor" />
                      <rect x="36" y="24" width="6" height="12" fill="currentColor" />
                      <rect x="48" y="24" width="12" height="6" fill="currentColor" />
                      
                      <rect x="0" y="36" width="6" height="12" fill="currentColor" />
                      <rect x="12" y="36" width="12" height="6" fill="currentColor" />
                      <rect x="30" y="36" width="6" height="18" fill="currentColor" />
                      <rect x="42" y="36" width="6" height="6" fill="currentColor" />
                      <rect x="54" y="36" width="12" height="12" fill="currentColor" />
                      <rect x="72" y="36" width="12" height="6" fill="currentColor" />
                      <rect x="88" y="36" width="6" height="12" fill="currentColor" />

                      <rect x="0" y="54" width="18" height="6" fill="currentColor" />
                      <rect x="24" y="48" width="6" height="6" fill="currentColor" />
                      <rect x="36" y="48" width="12" height="12" fill="currentColor" />
                      <rect x="54" y="54" width="6" height="18" fill="currentColor" />
                      <rect x="66" y="48" width="18" height="6" fill="currentColor" />
                      <rect x="88" y="54" width="12" height="6" fill="currentColor" />

                      <rect x="36" y="66" width="6" height="6" fill="currentColor" />
                      <rect x="48" y="66" width="6" height="18" fill="currentColor" />
                      <rect x="66" y="60" width="6" height="12" fill="currentColor" />
                      <rect x="78" y="66" width="12" height="6" fill="currentColor" />

                      <rect x="36" y="78" width="12" height="6" fill="currentColor" />
                      <rect x="36" y="88" width="6" height="12" fill="currentColor" />
                      <rect x="60" y="78" width="6" height="18" fill="currentColor" />
                      <rect x="72" y="88" width="18" height="6" fill="currentColor" />
                      
                      <rect x="48" y="88" width="6" height="6" fill="currentColor" />
                      <rect x="94" y="72" width="6" height="12" fill="currentColor" />
                    </svg>

                    {/* Logo inside center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-lg shadow-sm">
                      <img
                        src="/logo_1old.png"
                        alt="Party Club Logo"
                        className="w-5.5 h-5.5 object-contain rounded"
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
