import { ArrowUpRight, Globe } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "../constants/appLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ),
      href: "https://www.instagram.com/partyclubindia"
    },
    {
      name: "Facebook",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
      href: "https://www.facebook.com/partyclubindia"
    },
    {
      name: "YouTube",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
        </svg>
      ),
      href: "#"
    },
  ];

  return (
    <footer className="relative bg-[#090414] pt-16 pb-8 border-t border-purple-950/30 overflow-hidden z-10">
      
      <div className="max-w-6xl mx-auto px-4">

        
        {/* Top Footer Bar (Logo + Dropdowns) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-slate-800 mb-12">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group select-none">
            <img
              src="/logo_1.png"
              alt="Party Club India logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Country/Language select tools */}
          <div className="flex items-center gap-3">
            {/* Country */}
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-800 rounded-lg bg-[#140c24] text-sm font-semibold text-slate-300 shadow-sm cursor-pointer select-none">
              <span className="text-base leading-none">🇮🇳</span>
              <span>India</span>
            </div>

            {/* Language */}
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-800 rounded-lg bg-[#140c24] text-sm font-semibold text-slate-300 shadow-sm cursor-pointer select-none">
              <Globe className="h-4 w-4 text-slate-400" />
              <span>English</span>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16 text-left">
          
          {/* Column 1 */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-4">
              About Party Club
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              <li><a href="#about" className="hover:text-white transition">Who We Are</a></li>
              <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="#work" className="hover:text-white transition">Work With Us</a></li>
              <li><a href="#investor" className="hover:text-white transition">Investor Relations</a></li>
              <li><a href="#fraud" className="hover:text-white transition">Report Fraud</a></li>
              <li><a href="#press" className="hover:text-white transition">Press Kit</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-4">
              Party Club info
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              <li><a href="#app" className="hover:text-white transition">Party Club App</a></li>
              <li><a href="#hyperpure" className="hover:text-white transition">Hyperpure Supplies</a></li>
              <li><a href="#live" className="hover:text-white transition">Party Club Live</a></li>
              <li><a href="#weather" className="hover:text-white transition">Weather Cover</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-4">
              For Vendors
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              <li><a href="#partner" className="hover:text-white transition flex items-center gap-1">Partner With Us <ArrowUpRight className="h-3 w-3 text-slate-400" /></a></li>
              <li><a href="#apps" className="hover:text-white transition">Apps For You</a></li>
              <li><a href="#portal" className="hover:text-white transition">Vendor Portal</a></li>
              <li><a href="#guidelines" className="hover:text-white transition">Community Guidelines</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-4">
              Learn More
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              <li><a href="#/privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#/terms" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#/cookies" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#/data-retention" className="hover:text-white transition">Data Retention Policy</a></li>
              <li><a href="#/refund-policy" className="hover:text-white transition">Refund & Cancellation</a></li>
            </ul>
          </div>

          {/* Column 5 (Socials & Badges) */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-4">
              Social Links
            </h4>
            <div className="flex gap-2.5 mb-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-2 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-brand-primary hover:border-[#ff9cd2] transition flex items-center justify-center"
                    aria-label={`Follow us on ${item.name}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            
            {/* App Store download badges */}
            <div className="flex flex-col gap-2.5 max-w-[130px]">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="block w-full border border-slate-800 rounded-lg p-1 bg-black hover:border-slate-700 transition">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on App Store" className="w-full h-auto" />
              </a>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="block w-full border border-slate-800 rounded-lg p-1 bg-black hover:border-slate-700 transition">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="w-full h-auto" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col items-center justify-center text-center">
          <p className="text-slate-500 text-[11px] font-semibold leading-relaxed max-w-4xl">
            By continuing past this page, you agree to our <a href="#/terms" className="hover:underline text-slate-400">Terms of Service</a>, <a href="#/cookies" className="hover:underline text-slate-400">Cookie Policy</a>, <a href="#/privacy" className="hover:underline text-slate-400">Privacy Policy</a>, and Content Policies. All trademarks are properties of their respective owners. {currentYear} © Party Club™ Ltd. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
