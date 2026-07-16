import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Building2, CalendarHeart,
  ChevronDown, Download, ExternalLink, Heart, MapPin, Menu,
  MessageSquareText, PartyPopper, Search, ShieldCheck, Sparkles, Store,
  Users, X,
} from "lucide-react";
import StoreButtons from "./StoreButtons";
import { celebrationImages as img, siteConfig } from "../config/siteConfig";

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 }, transition: { duration: .55 } };

function SectionTitle({ eyebrow, children, copy }: { eyebrow?: string; children: ReactNode; copy?: string }) {
  return <div className="section-heading">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{children}</h2>{copy && <p>{copy}</p>}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = () => setOpen(false); window.addEventListener("resize", close); return () => window.removeEventListener("resize", close); }, []);
  const links = [["Features", "#features"], ["How it works", "#how-it-works"], ["For vendors", "#vendors"], ["About", "#why"]];
  return <header className="site-header"><a className="wordmark" href="#top" aria-label="PartyClub India home"><img src="/logo_1.png" alt="PartyClub India" /></a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    <nav id="primary-navigation" className={open ? "is-open" : ""} aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="button button-outline" href={siteConfig.partnerUrl}>Partner with us</a><a className="button button-pink" href="#download">Download app <Download size={16} /></a></nav>
  </header>;
}

const collage = [img.wedding, img.cake, img.people, img.dj, img.decor, img.party];

function Hero() {
  return <section className="hero" id="top"><Header /><div className="hero-glow" />
    <div className="hero-inner"><motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
      <span className="hero-kicker"><Sparkles size={16} /> Celebration discovery, in your pocket</span>
      <h1>Plan Every <em>Celebration</em> in One App</h1>
      <p>Discover venues, decorators, caterers, photographers, entertainers and more near you—then connect directly inside PartyClub.</p>
      <div className="hero-actions"><a href="#download" className="button button-pink button-large">Download the app <Download size={18} /></a><a href="#how-it-works" className="button button-ghost button-large">See how it works <ArrowRight size={18} /></a></div>
      <StoreButtons compact />
      <div className="trust-row"><span><ShieldCheck /> Business information</span><span><MapPin /> Local discovery</span><span><MessageSquareText /> Direct connections</span></div>
    </motion.div>
    <motion.div className="hero-collage" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .15 }}>{collage.map((src, i) => <div className={`collage-tile tile-${i + 1}`} key={src}><img src={src} alt={["Indian wedding celebration", "Celebration cake", "Friends celebrating", "DJ performing", "Event decoration", "Live celebration"][i]} fetchPriority={i < 2 ? "high" : "auto"} /></div>)}</motion.div>
    </div>
    <div className="trust-strip"><div><CalendarHeart /><strong>Celebrate your way</strong><span>For moments big and small</span></div><div><Users /><strong>Growing community</strong><span>People and businesses</span></div><div><MapPin /><strong>Local discovery</strong><span>Explore near you</span></div><div><PartyPopper /><strong>Multiple categories</strong><span>All inside the app</span></div></div>
  </section>;
}

const categories = [
  ["Venues", img.venue], ["Balloon & Decor", img.decor], ["Cakes", img.cake], ["DJs", img.dj],
  ["Photography", img.photography], ["Catering", img.catering], ["Weddings", img.wedding], ["Party Rentals", img.party],
];

function Categories() { return <motion.section className="section categories" id="features" {...reveal}><SectionTitle>Everything You Can <em>Discover</em> in the App</SectionTitle><div className="category-grid">{categories.map(([name, src]) => <article className="category-card" key={name}><img src={src} alt={`${name} service`} loading="lazy" /><h3>{name}</h3></article>)}</div><div className="inline-cta"><span>Download the app to explore services and businesses near you</span><a className="button button-pink" href="#download">Explore in the app <Download size={17} /></a></div></motion.section>; }

const steps = [
  { icon: Download, title: "Download PartyClub", text: "Get PartyClub from the App Store or Google Play in seconds." },
  { icon: Search, title: "Discover local services", text: "Browse venues, decorators, caterers, photographers and more near you." },
  { icon: MessageSquareText, title: "Connect in the app", text: "Chat directly with businesses, share requirements and manage replies." },
];
function HowItWorks() { return <section className="section how" id="how-it-works"><motion.div {...reveal}><SectionTitle copy="A simple app-first experience from discovery to conversation.">Download. <em>Discover.</em> Connect.</SectionTitle><div className="steps">{steps.map((step, i) => <article className="step-card" key={step.title}><span className="step-number">{i + 1}</span><span className="step-icon"><step.icon /></span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></motion.div></section>; }

function Phone({ screen }: { screen: "home" | "discover" | "chat" }) {
  return <div className="phone"><div className="phone-notch" /><div className="phone-screen">
    {screen === "home" && <><small>Hi, Rahul 👋</small><h4>What are you planning?</h4><div className="mock-search">Search services, vendors...</div><p className="mock-label">Top categories</p><div className="mock-icons"><i>🏛️</i><i>🎈</i><i>🎂</i><i>🎧</i></div><p className="mock-label">Popular near you</p><img src={img.venue} alt="Venue card in PartyClub app" /></>}
    {screen === "discover" && <><small>Discover</small><h4>Services near you</h4><div className="mock-pills"><i>All</i><i>Venues</i><i>Decor</i></div><img src={img.wedding} alt="Wedding service in PartyClub app" /><strong>Recommended for you</strong><img src={img.catering} alt="Catering service in PartyClub app" /></>}
    {screen === "chat" && <><small>Orange Decor</small><h4>Chat directly</h4><div className="bubble left">Hi Rahul! Thanks for reaching out. Tell us about your event.</div><div className="bubble right">I’m planning a birthday party next month.</div><div className="bubble left">Great! Please share the date and location.</div><div className="mock-input">Type a message...</div></>}
  </div></div>;
}

function AppShowcase() { const points = [[Building2,"Discover local businesses"],[PartyPopper,"Explore multiple categories"],[MessageSquareText,"Direct vendor chat"],[CalendarHeart,"Manage enquiries"]] as const; return <section className="app-showcase"><motion.div className="app-showcase-inner" {...reveal}><div className="phones"><Phone screen="home" /><Phone screen="discover" /><Phone screen="chat" /></div><div className="app-copy"><span className="eyebrow">Made for celebrations</span><h2>The <em>PartyClub</em> App</h2><div className="feature-list">{points.map(([Icon,title]) => <div key={title}><span><Icon /></span><p><strong>{title}</strong><small>{title === "Direct vendor chat" ? "Connect and discuss your requirements inside the app." : "Keep your celebration discovery in one convenient place."}</small></p></div>)}</div><a href="#download" className="button button-pink button-large">Download PartyClub <Download size={18} /></a></div></motion.div></section>; }

function Why() { const benefits = [[PartyPopper,"Everything in one app","Explore categories for many kinds of celebrations."],[ShieldCheck,"Business information","Review profiles and details before you connect."],[MapPin,"Local discovery","Find services and businesses near you."],[MessageSquareText,"Direct communication","Chat inside the app and plan your celebration."]] as const; return <section className="section why" id="why"><motion.div {...reveal}><SectionTitle>Why <em>PartyClub?</em></SectionTitle><div className="why-layout"><img src={img.people} alt="Friends celebrating together" loading="lazy" /><div className="benefit-grid">{benefits.map(([Icon,title,text]) => <article key={title}><span><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></motion.div></section>; }

function Occasions() { const occasions = [["Birthdays",img.birthday],["Weddings",img.wedding],["Kids’ parties",img.cake],["Corporate events",img.party]]; return <section className="section occasions"><motion.div {...reveal}><SectionTitle>From Birthdays to Weddings—<em>PartyClub</em> Has You Covered</SectionTitle><div className="occasion-grid">{occasions.map(([name,src]) => <article key={name}><img src={src} alt={name} loading="lazy" /><h3>{name}</h3></article>)}</div><p className="occasion-note"><Heart /> Find the right services for every celebration inside the PartyClub app.</p></motion.div></section>; }

function VendorCTA() { return <section className="section vendor" id="vendors"><motion.div className="vendor-panel" {...reveal}><div><span className="eyebrow">For vendors</span><h2>Grow Your Party Business with PartyClub</h2><p>Bring your business to a growing celebration community, manage conversations and connect with potential customers.</p><div className="vendor-actions"><a className="button button-light" href={siteConfig.partnerUrl}>Partner with us <ArrowRight size={17} /></a><a className="button button-ghost" href={`mailto:${siteConfig.email}`}>Learn more</a></div></div><div className="dashboard-mock"><div className="dash-top"><span /><span /><span /></div><small>Business overview</small><strong>Your PartyClub dashboard</strong><div className="dash-cards"><i /><i /><i /></div><div className="dash-chart"><b /><b /><b /><b /><b /><b /></div></div></motion.div></section>; }

const faqs = [
  ["Is PartyClub free to download?", "PartyClub can be downloaded from the App Store and Google Play. Any applicable in-app terms are shown inside the app."],
  ["Can I contact businesses directly?", "Yes. PartyClub is designed so you can connect and chat with businesses directly inside the mobile app."],
  ["How do I discover vendors?", "Download PartyClub, choose a category and explore services and businesses available near you."],
  ["Is PartyClub available in my city?", "Availability can vary by location. Open the app to see the services and businesses currently available near you."],
];
function FAQ() { const [active,setActive] = useState<number | null>(null); return <section className="section faq"><motion.div {...reveal}><SectionTitle>Frequently Asked Questions</SectionTitle><div className="faq-grid">{faqs.map(([q,a],i) => <article className={active === i ? "is-open" : ""} key={q}><button onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}><span>{q}</span><ChevronDown /></button><div className="faq-answer"><p>{a}</p></div></article>)}</div></motion.div></section>; }

function FinalDownload() { return <section className="download-panel" id="download"><motion.div className="download-inner" {...reveal}><div className="app-symbol"><PartyPopper /></div><div><span className="eyebrow">Your next celebration</span><h2>Starts <em>Here</em></h2><p>Choose your store to download PartyClub and start discovering nearby celebration services.</p></div><StoreButtons /></motion.div></section>; }

function Footer() { return <footer><div className="footer-inner"><div className="footer-brand"><img src="/logo_1.png" alt="PartyClub India" /><p>Discover celebration services and connect with local businesses inside the PartyClub app.</p></div><div><strong>Explore</strong><a href="#features">App features</a><a href="#how-it-works">How it works</a><a href="#vendors">For vendors</a></div><div><strong>Legal</strong><a href="/privacy">Privacy policy</a><a href="/terms">Terms & conditions</a><a href="/cookies">Cookie policy</a><a href="/data-deletion">User data deletion</a><a href="/data-retention">Data retention</a><a href="/refund-policy">Refund policy</a></div><div><strong>Connect</strong><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <ExternalLink size={13} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PartyClub India. All rights reserved.</span><span>Celebrations discovered in the app.</span></div></footer>; }

export default function LandingPage() { return <main className="landing-page"><Hero /><Categories /><HowItWorks /><AppShowcase /><Why /><Occasions /><VendorCTA /><FinalDownload /><FAQ /><Footer /><a className="mobile-download" href="#download"><Store size={17} /> Download PartyClub</a></main>; }
