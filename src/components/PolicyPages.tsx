import { motion } from "framer-motion";
import { Shield, FileText, Cookie, Database, RefreshCw, ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface PolicyPagesProps {
  activePolicy: string;
  onNavigate: (policy: string) => void;
}

export default function PolicyPages({ activePolicy, onNavigate }: PolicyPagesProps) {
  const policies = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: Shield,
      description: "How we collect, protect, and use your personal information",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">1. Introduction</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              At Party Club India ("we", "our", "us"), your privacy is a priority. This Privacy Policy details the types of personal data we collect from users, hosts, and vendors when utilizing our website, mobile application, and related services, and how we handle and protect that information.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">2. Information We Collect</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              We gather information to provide a seamless vendor-matching and party-planning experience:
            </p>
            <ul className="space-y-2.5 text-slate-600 text-sm pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Profile & Account Information:</strong> Name, mobile number, email address, password, and profile picture provided when registering.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Location Data:</strong> Precise or approximate location information fetched via your device permissions (e.g., GPS coordinates) to search for nearby decorators, DJs, cakes, and venue planners in Delhi NCR and other covered cities.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Vendor Listing Information:</strong> For service providers, we collect business names, address details, service descriptions, pricing grids, high-resolution media uploads, and verification documents (such as GSTIN, PAN, and business licenses).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Usage & Device Metrics:</strong> IP addresses, browser specifications, mobile device identifiers, operating system version, and system event logs.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">3. How We Use Your Data</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Your data is utilized to deliver high-quality event booking services, including:
            </p>
            <ul className="space-y-2.5 text-slate-600 text-sm pl-4">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed2891] shrink-0 mt-2" />
                <span>Connecting event hosts directly with verified local vendor partners.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed2891] shrink-0 mt-2" />
                <span>Processing booking deposits and holding vendor slots securely.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed2891] shrink-0 mt-2" />
                <span>Sending transaction notifications, OTP verifications, and booking updates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed2891] shrink-0 mt-2" />
                <span>Improving application loading performance, UX flows, and UI responsiveness.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">4. Information Sharing & Disclosure</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We do not sell your personal data. We share your info only with selected vendors (decorators, DJs, photographers, planners, or bakers) whom you explicitly request to book or contact. We may also share data with third-party service providers who assist with payment gateway operations, map routing, and SMS/push notification delivery under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">5. Security Measures</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We enforce strong data security protocols, including industry-standard SSL/TLS encryption for all data in transit, secure database server isolation, role-based internal access permissions, and periodic vulnerability scanning to guard your billing and profile details.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">6. Your Rights & Choice Controls</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              You possess complete rights to access, edit, or restrict the processing of your personal data. You can disable location tracking permissions within your browser or phone settings at any time (though this will limit our capability to find local service vendors). You also reserve the right to delete your account via the app settings.
            </p>
          </section>
        </div>
      )
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      icon: FileText,
      description: "Agreement governing the use of our marketplace platform",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">1. Acceptance of Terms</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              By accessing, browsing, or using the Party Club website or mobile app, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms & Conditions. If you do not accept these terms, you must immediately discontinue using our services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">2. Platform Role & Limitations</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Party Club is a marketplace aggregator that connects event hosts with local independent vendors (DJs, bakers, decorators, and planners). We are not service providers, event managers, or employers of the listed vendors. All agreements, service scopes, delivery schedules, and quality guarantees are strictly between the host (client) and the vendor.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">3. Bookings and Transactions</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              When booking a vendor on Party Club, you may be required to pay a booking deposit. This deposit is collected securely via our partnered payment gateways and is held as a confirmation token. The remaining service fee balance must be paid directly to the vendor in accordance with the payment milestones agreed upon during booking.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">4. User Account Integrity</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              You must provide accurate, current, and complete details during registration. You are solely responsible for securing your login credentials and for all activities that occur under your account. Any suspected breach of security should be reported to us immediately.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">5. Vendor Compliance & Listings</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Vendors listing on the platform assert that they hold all necessary municipal licenses, safety compliance certifications, and business registrations required to perform their designated services. While we conduct verification checks (GSTIN and basic KYC), we make no direct representations or guarantees regarding vendor capability, punctuality, or compliance.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">6. Limitation of Liability</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To the maximum extent permitted by applicable law, Party Club India, its founders, and employees shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from vendor cancellations, delivery delays, equipment failures, property damage at the event venue, or personal injury occurring during a booked service.
            </p>
          </section>
        </div>
      )
    },
    {
      id: "cookies",
      title: "Cookie Policy",
      icon: Cookie,
      description: "How we use cookies and tracking technologies to improve UX",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">1. What are Cookies?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Cookies are minor text files stored on your browser or hard drive when you visit a website. They serve to recognize your device, log preferences, and gather usage telemetry to ensure stable website navigation and features.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">2. Types of Cookies We Use</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Party Club uses different categories of cookies to optimize performance:
            </p>
            <ul className="space-y-3 text-slate-600 text-sm pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Strictly Necessary Cookies:</strong> Essential for log-in security sessions, account navigation, and loading secure deposit checkouts. These cannot be disabled.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Preference Cookies:</strong> Remember settings like your preferred search location (e.g. Delhi NCR) or language preferences, so you do not have to reset them on subsequent visits.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Analytics & Performance Cookies:</strong> Track anonymous telemetry details, like loading speeds and page engagement levels, allowing us to debug layout errors and optimize user flows.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">3. Third-Party Web Beacons</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We may utilize third-party cookies from trusted service partners (such as Google Analytics and Firebase) to monitor traffic channels and resolve software bugs. These trackers generate anonymized data streams and do not collect direct personal identifiers.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">4. Managing Your Cookie Settings</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Most browsers allow you to block or delete cookies through their standard preference menu settings. Please note that if you disable essential cookies, core features of our website and booking checkouts may become completely inaccessible.
            </p>
          </section>
        </div>
      )
    },
    {
      id: "data-deletion",
      title: "User Data Deletion",
      icon: Database,
      description: "Instructions for deleting your PartyClub account and associated personal data",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Delete your PartyClub data</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              You can request deletion of your PartyClub account and the personal data associated with it at any time. This applies whether you created your account using a phone number, email address, Facebook Login, or another supported sign-in method.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3 font-display">Option 1: Delete from the PartyClub app</h3>
            <ol className="space-y-3 text-slate-600 text-sm pl-4 list-decimal list-inside">
              <li>Open PartyClub and sign in to the account you want to delete.</li>
              <li>Open your profile and go to account settings.</li>
              <li>Select the account deletion option and follow the confirmation steps.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3 font-display">Option 2: Request deletion by email</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              If you cannot access the app, email us from the address associated with your PartyClub account.
            </p>
            <a href="mailto:support@partyclubindia.com?subject=PartyClub%20User%20Data%20Deletion%20Request" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#ed2891] px-5 py-3 text-sm font-bold text-white hover:bg-[#d91e80] transition">
              Email a deletion request
            </a>
            <p className="text-slate-500 text-xs leading-relaxed mt-3">
              Use the subject “PartyClub User Data Deletion Request” and include the name, email address or mobile number associated with the account. Do not send your password, OTP, payment details, or identity documents by email.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Verification and completion</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To protect your account, we may ask you to verify ownership using the registered email address or mobile number. After verification, we will delete or anonymize the account and associated personal data within 30 days. Information that must be retained for fraud prevention, security, legal, tax, accounting, or dispute-resolution obligations may be retained only for the required period and then deleted or anonymized.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Facebook Login users</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Removing PartyClub from your Facebook Apps and Websites settings stops future Facebook access but may not delete information already held by PartyClub. Complete one of the deletion methods above to request deletion of your PartyClub data.
            </p>
          </section>
        </div>
      )
    },
    {
      id: "data-retention",
      title: "Data Retention Policy",
      icon: Database,
      description: "Our policies regarding data storage timelines and deletion controls",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">1. Purpose & Scope</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              This Data Retention Policy dictates how long Party Club retains the various user and vendor data types we collect. It guarantees compliance with local rules (including the Indian IT Act and Information Technology Rules) and enforces privacy best practices around data minimization.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">2. Retention Timelines</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              We maintain data archives only as long as necessary to fulfill business purposes or legal requirements:
            </p>
            <ul className="space-y-3 text-slate-600 text-sm pl-4">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[#68268e] shrink-0">Host & Client Accounts:</span>
                <span>Active profile data is stored as long as the account exists. Accounts that remain entirely inactive for 3 consecutive years will be automatically archived and the underlying user data anonymized.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[#68268e] shrink-0">Vendor Listings & KYC:</span>
                <span>Vendor listing details and KYC validation records are retained for the duration of the business contract. Upon vendor offboarding, data is retained for 2 years to resolve any late-reported disputes before archiving.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[#68268e] shrink-0">Transaction & Billing Logs:</span>
                <span>All invoices, payment logs, and ledger histories are retained for 7 years to satisfy mandatory financial audits and tax regulatory obligations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[#68268e] shrink-0">Location & Device Logs:</span>
                <span>Exact GPS coordinates and device tracking identifiers are deleted or aggregated into anonymous statistics within 90 days.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">3. Data Deletion (Right to Erasure)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Hosts and vendors can submit an account deletion request directly through the profile settings in the app or by emailing our support desk. Upon validation, we will purge or anonymize all associated profile information, service ratings, and coordinates within 30 days, excluding transaction data required for legal audits.
            </p>
          </section>
        </div>
      )
    },
    {
      id: "refund-policy",
      title: "Refund & Cancellation Policy",
      icon: RefreshCw,
      description: "Rules regarding booking deposit cancellations and disputes",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">1. Booking Deposits</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To book a vendor (decorator, DJ, custom cake maker, or photographer) on Party Club, event hosts pay a partial confirmation deposit. This deposit is non-refundable unless specified otherwise in the specific vendor cancellation tier chosen during the booking process.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">2. Cancellation Policy for Hosts</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Host cancellations are subject to the following windows:
            </p>
            <ul className="space-y-3 text-slate-600 text-sm pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>24-Hour Cooling-Off:</strong> Hosts receive a 100% refund of the booking deposit if canceled within 24 hours of checkout, provided the event is at least 7 days away.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Standard Window (7+ Days Out):</strong> Cancellations made more than 7 days prior to the event date receive a 50% deposit credit note redeemable for future bookings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#ed2891] shrink-0 mt-0.5" />
                <span><strong>Late Cancellations (Under 7 Days):</strong> Deposits are forfeited in full to compensate the vendor for holding the slot.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">3. Cancellation Policy for Vendors</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              If a vendor cancels a booking due to emergency or scheduling issues, the host is immediately notified. Party Club will issue a 100% refund of the deposit back to the host's original payment source within 5-7 business days, and our support team will prioritize recommending alternative vendors.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">4. Dispute Resolution Process</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              If a vendor fails to perform a booked service, delivers sub-standard quality, or fails to arrive at the venue, the host must report the dispute within 24 hours of the scheduled event window. Party Club will investigate the claim by verifying communications, photo logs, and vendor check-ins. If the vendor is found at fault, the deposit will be refunded in full.
            </p>
          </section>
        </div>
      )
    }
  ];

  const currentPolicy = policies.find(p => p.id === activePolicy) || policies[0];
  const IconComponent = currentPolicy.icon;

  return (
    <div className="relative min-h-screen bg-[#faf6fd] text-slate-800 flex flex-col font-sans overflow-hidden">
      
      {/* Decorative Blush Ambient Blobs in Light Theme */}
      <div className="absolute top-[5%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[#f3ebfb] blur-[140px] pointer-events-none opacity-60" />
      <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] rounded-full bg-[#fff0f4] blur-[130px] pointer-events-none opacity-65" />

      {/* Light Theme Persistent Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between gap-3">
          <button 
            onClick={() => onNavigate("home")} 
            className="flex min-h-11 items-center gap-2 group text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 cursor-pointer select-none transition"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden min-[360px]:inline">Back to Home</span>
          </button>

          {/* Logo Center */}
          <button onClick={() => onNavigate("home")} className="flex min-h-11 items-center gap-2 group select-none cursor-pointer">
            <img
              src="/logo_1.png"
              alt="Party Club India logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
              party club
            </span>
          </button>

          {/* Location / Status placeholder */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg text-[10px] font-extrabold text-slate-500">
            <span>Delhi NCR</span>
          </div>
        </div>
      </header>

      {/* Main Container Layout (Centered without side panel) */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 md:py-12 w-full relative z-10">
        
        {/* Page Breadcrumb */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-6 md:mb-8 font-semibold">
          <span className="hover:text-slate-600 cursor-pointer" onClick={() => onNavigate("home")}>Home</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-[#ed2891]">{currentPolicy.title}</span>
        </div>

        {/* Centered Content Card */}
        <motion.div
          key={activePolicy}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-white border border-slate-200/70 rounded-2xl p-5 sm:p-6 md:p-12 shadow-soft relative"
        >
          {/* Card Top Border Highlight */}
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#ed2891]/40 to-transparent" />

          {/* Title & Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#68268e]/5 to-[#ed2891]/10 rounded-xl border border-purple-100 text-[#ed2891] shrink-0">
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight leading-tight">
                  {currentPolicy.title}
                </h1>
                <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-relaxed">
                  {currentPolicy.description}
                </p>
              </div>
            </div>
            
            {/* Last updated badge */}
            <div className="self-start sm:self-center px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-black tracking-wider text-slate-500 uppercase">
              Last Updated: June 2026
            </div>
          </div>

          {/* Render policy details */}
          <div className="prose prose-slate max-w-none">
            {currentPolicy.content}
          </div>

          {/* Action signature footer */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 font-semibold">
            <p>For questions or data deletion requests, contact us at <a href="mailto:support@partyclubindia.com" className="text-[#ed2891] hover:underline font-bold">support@partyclubindia.com</a></p>
            <p>© Party Club India. All rights reserved.</p>
          </div>
        </motion.div>
      </main>

      {/* Premium Light Policy Footer */}
      <footer className="bg-slate-50 border-t border-slate-200/60 py-8 relative z-10 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-[10px] leading-relaxed">
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies. All trademarks are properties of their respective owners. {new Date().getFullYear()} © Party Club™ Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
