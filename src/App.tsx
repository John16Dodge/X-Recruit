
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
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import UserProfile from "./pages/UserProfile";
import ProfileCreation from "./pages/ProfileCreation";
import EditProfile from "./pages/EditProfile";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme class to document element
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Also apply to body for better theme support
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
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
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/create" element={<ProfileCreation />} />
          <Route path="/profile/edit" element={<EditProfile />} />
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
