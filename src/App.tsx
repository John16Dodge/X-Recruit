
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import MentorRequest from "./pages/MentorRequest";
import TodoList from "./pages/TodoList";
import Login from "./pages/Login";
import BlobCursor from "./components/animations/BlobCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BlobCursor />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roadmap-generator" element={<RoadmapGenerator />} />
          <Route path="/request-mentor" element={<MentorRequest />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
