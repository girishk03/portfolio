import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import MarinePlasticDetection from "./pages/MarinePlasticDetection";
import SmartMarine from "./pages/SmartMarine";
import PowerTheftDetection from "./pages/PowerTheftDetection";
import NotFound from "./pages/NotFound";
import HateSpeechDetection from "./pages/HateSpeechDetection";
import UniversityTimetabling from "./pages/UniversityTimetabling";

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
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/project/hate-speech-detection" element={<HateSpeechDetection />} />
          <Route path="/project/university-timetabling" element={<UniversityTimetabling />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
