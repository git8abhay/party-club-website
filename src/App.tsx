import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import LandingPage from "./components/LandingPage";
import BackToTop from "./components/BackToTop";
import PolicyPages from "./components/PolicyPages";

function App() {
  const [route, setRoute] = useState<string>(window.location.hash || "#/");

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || "#/");
      // Instantly scroll back to the top of the page when the route changes
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (newHash: string) => {
    window.location.hash = newHash === "home" ? "#/" : `#/${newHash}`;
  };

  // Determine if it is a policy route
  const isPolicyRoute = 
    route.startsWith("#/privacy") || 
    route.startsWith("#/terms") || 
    route.startsWith("#/cookies") || 
    route.startsWith("#/data-retention") || 
    route.startsWith("#/refund-policy");

  const activePolicy = route.replace("#/", "");

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
