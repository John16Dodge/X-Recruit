
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useTheme from "./hooks/useTheme";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import MentorRequest from "./pages/MentorRequest";
import AptitudeTraining from "./pages/AptitudeTraining";
import Login from "./pages/Login";
import AccountCreation from "./pages/AccountCreation";
import InternshipApplication from "./pages/InternshipApplication";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme class to document element
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <div className="bg-background text-foreground min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/roadmap-generator" element={<RoadmapGenerator />} />
          <Route path="/request-mentor" element={<MentorRequest />} />
          <Route path="/aptitude-training" element={<AptitudeTraining />} />
          <Route path="/colleges/aptitude-training" element={<AptitudeTraining />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account-creation" element={<AccountCreation />} />
          <Route path="/internship-application" element={<InternshipApplication />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
