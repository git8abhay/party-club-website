import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Smartphone, User, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 transform ${
          scrolled
            ? "bg-white border-b border-slate-100 py-2.5 shadow-sm translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          
          {/* Left Side: Get the App or Logo */}
          <div className="flex items-center gap-4">
            {!scrolled ? (
              <a
                href="#get-app"
                className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/95 hover:text-white transition duration-200"
              >
                <Smartphone className="h-4.5 w-4.5" />
                Get the App
              </a>
            ) : (
              <a href="#" className="flex items-center gap-2 group select-none">
                <img
                  src="/logo_1.png"
                  alt="Party Club India logo"
                  className="h-8.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-xl font-black tracking-tight leading-none bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  party club
                </span>
              </a>
            )}
          </div>

          {/* Middle Side: Integrated Search Bar (Only when Scrolled) */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full bg-white rounded-xl py-2 px-3.5 flex items-center gap-2.5 shadow-soft border border-slate-200"
                >
                  <div className="flex items-center gap-1.5 text-brand-secondary">
                    <MapPin className="h-4 w-4" />
                    <span className="text-slate-800 font-extrabold text-xs">Delhi NCR</span>
                  </div>
                  <div className="w-[1px] h-4 bg-slate-300" />
                  <div className="flex-1 flex items-center gap-1.5">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search for decorators, DJs, cakes, planners..."
                      className="w-full bg-transparent text-slate-800 outline-none text-xs font-semibold placeholder:text-slate-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            <a
              href="#list-business"
              className={`${
                scrolled ? "text-slate-600 hover:text-slate-900" : "text-white/90 hover:text-white"
              } transition duration-200`}
            >
              List your business
            </a>
          </nav>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full border cursor-pointer z-50 transition ${
              scrolled
                ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                : "border-white/10 text-white bg-white/5 hover:bg-white/10"
            }`}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="fixed inset-0 z-30 bg-white flex flex-col justify-between p-6 pt-24"
          >
            <div className="flex flex-col gap-6">
              <a
                href="#get-app"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-3 border-b border-slate-100 text-lg font-bold text-slate-700 hover:text-slate-900 transition"
              >
                <Smartphone className="h-5 w-5 text-brand-secondary" />
                Get the App
              </a>
              <a
                href="#list-business"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-3 border-b border-slate-100 text-lg font-bold text-slate-700 hover:text-slate-900 transition"
              >
                List your business
              </a>
            </div>

            <div className="flex items-center gap-3 text-slate-500 pb-8">
              <User className="h-5 w-5 text-brand-primary" />
              <span className="text-xs font-black uppercase tracking-widest">Party Club India</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
