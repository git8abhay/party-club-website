import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, GlassWater, Music, Wallet, Cake, Percent, MessageSquare, Calendar, ShieldCheck, MapPin, Wifi, Battery } from "lucide-react";

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
    return (
      <div className={`relative ${isMobile ? 'w-[250px] h-[340px]' : 'w-[290px] h-[460px]'} bg-black rounded-t-[40px] p-3 shadow-[0_25px_60px_rgba(104,38,142,0.14)] border-4 border-b-0 border-slate-850 flex flex-col overflow-hidden`}>
        {/* iPhone Notch */}
        <div className="absolute top-4.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30" />

        {/* Screen Shell */}
        <div className="w-full h-full rounded-t-[28px] bg-white border border-slate-200 flex flex-col pt-7 px-3 overflow-hidden relative">
          {/* Status Bar */}
          <div className="px-3 flex items-center justify-between text-[9px] font-black text-slate-500 mb-4 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <Wifi className="h-2.5 w-2.5" />
              <Battery className="h-2.5 w-2.5" />
            </div>
          </div>

          {/* App Screen Content */}
          <div className="flex-1 flex flex-col text-left">
            <div className="flex items-center justify-center gap-1.5 mb-3 select-none">
              <img
                src="/logo_1old.png"
                alt="Party Club App Icon"
                className="w-5 h-5 object-contain rounded shadow-[0_2px_6px_rgba(104,38,142,0.08)]"
              />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Party Club App</span>
            </div>
            
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-2 mb-3 flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-brand-secondary" />
              <span className="text-[9px] font-extrabold text-slate-800">Indiranagar, Bangalore</span>
            </div>

            <div className="rounded-xl border border-slate-200 p-2.5 bg-white shadow-sm flex flex-col justify-between h-[155px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[7px] font-black text-brand-secondary uppercase tracking-wider block">Home DJ Booking</span>
                  <h4 className="text-[10px] font-black text-slate-800 mt-0.5">DJ Neon Beats Live</h4>
                </div>
                <span className="text-[7.5px] font-black text-amber-500 bg-amber-400/10 px-1 rounded">4.8 ★</span>
              </div>

              {/* Interactive UI Chat Simulation */}
              <div className="my-1.5 border-t border-slate-100 pt-1.5 space-y-1">
                <div className="flex justify-end">
                  <span className="bg-gradient-to-r from-[#68268e] to-[#ed2891] text-white text-[7.5px] font-semibold py-0.5 px-2 rounded-2xl rounded-tr-none shadow-sm">
                    Custom Playlist?
                  </span>
                </div>
                <div className="flex justify-start">
                  <span className="bg-slate-100 text-slate-700 text-[7.5px] font-semibold py-0.5 px-2 rounded-2xl rounded-tl-none">
                    Absolutely, send tracks!
                  </span>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-200 pt-1.5 flex justify-between items-center">
                <div>
                  <span className="text-[7px] text-slate-500 block font-bold">UPI Advance Payment</span>
                  <span className="text-[8.5px] font-black text-emerald-600">₹999 Secured</span>
                </div>
                <span className="text-[7.5px] font-bold text-slate-400">1 Slot booked</span>
              </div>
            </div>

            {/* Mini Features Checklist */}
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[9.5px] font-extrabold text-slate-800">Verified Decorators</span>
                </div>
                <span className="text-[8px] font-bold text-slate-400">142 active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-rose-500" />
                  <span className="text-[9.5px] font-extrabold text-slate-800">Schedule Birthday</span>
                </div>
                <span className="text-[8px] font-bold text-brand-primary">Select Date</span>
              </div>
            </div>
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
            <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-4 font-display text-slate-800">
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
          <div className="hidden lg:block relative w-full max-w-6xl mx-auto h-[560px] overflow-hidden">
            
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
                    className="bg-white border border-slate-100 shadow-[0_8px_24px_rgba(104,38,142,0.04)] rounded-[20px] p-3.5 flex items-center gap-3.5 cursor-pointer"
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
            className={`rounded-[48px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden text-left transition-all duration-500 border ${
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
              <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black leading-[1.12] font-display mb-4 tracking-tight transition-colors duration-500 ${
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
                    className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#68268e] focus:border-transparent text-sm font-semibold shadow-inner transition-all duration-500 ${
                      isCardHovered 
                        ? "bg-[#180a29] border-purple-900/40 text-white focus:ring-[#ed2891]" 
                        : "bg-white border-slate-200 text-slate-800"
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#68268e] to-[#ed2891] hover:opacity-95 text-white font-extrabold text-sm transition shadow-md active:scale-95 flex items-center justify-center min-w-[140px]"
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
                  href="#android"
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
                  href="#ios"
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
                className="relative w-[290px] h-[370px] bg-black rounded-t-[44px] p-3 shadow-[0_20px_50px_rgba(104,38,142,0.1)] border-4 border-b-0 border-slate-850 flex flex-col overflow-hidden"
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
