import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import Index from "./pages/Index";
import MarinePlasticDetection from "./pages/MarinePlasticDetection";
import SmartMarine from "./pages/SmartMarine";
import PowerTheftDetection from "./pages/PowerTheftDetection";
import Singing from "./pages/Singing";
import NotFound from "./pages/NotFound";

const GlobalCart360 = lazy(() => import("./pages/GlobalCart360"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    html.style.scrollBehavior = prevScrollBehavior;
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RouteAnimator>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/singing" element={<Singing />} />
            <Route path="/projects/smart-marine" element={<SmartMarine />} />
            <Route path="/project/marine-plastic-detection" element={<MarinePlasticDetection />} />
            <Route
              path="/project/globalcart-360"
              element={
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <GlobalCart360 />
                </Suspense>
              }
            />
            <Route path="/project/power-theft-detection" element={<PowerTheftDetection />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteAnimator>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

const RouteAnimator = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
