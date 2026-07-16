import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import LandingPage from "./components/LandingPage";
import BackToTop from "./components/BackToTop";
import PolicyPages from "./components/PolicyPages";

function App() {
  const legacyHashRoute = window.location.hash.startsWith("#/")
    ? window.location.hash.slice(1)
    : null;
  const [route, setRoute] = useState<string>(legacyHashRoute || window.location.pathname);

  useEffect(() => {
    if (legacyHashRoute) {
      window.history.replaceState({}, "", legacyHashRoute);
    }

    const handlePopState = () => {
      setRoute(window.location.pathname);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [legacyHashRoute]);

  const navigateTo = (destination: string) => {
    const path = destination === "home" ? "/" : `/${destination}`;
    window.history.pushState({}, "", path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const normalizedRoute = route.replace(/\/$/, "") || "/";
  const policyRoutes = ["/privacy", "/terms", "/cookies", "/data-deletion", "/data-retention", "/refund-policy"];
  const isPolicyRoute = policyRoutes.includes(normalizedRoute);
  const activePolicy = normalizedRoute.slice(1);

  return (
    <div className="relative min-h-screen bg-white text-slate-800">
      <AnimatePresence mode="wait">
        {!isPolicyRoute ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Page Scroll Progress Indicator */}
            <ScrollProgress />

            <LandingPage />

            {/* Floating scroll to top button */}
            <BackToTop />
          </motion.div>
        ) : (
          <motion.div
            key="policy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PolicyPages activePolicy={activePolicy} onNavigate={navigateTo} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
