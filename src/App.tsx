
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import StudentLogin from "./pages/Auth/StudentLogin";
import StudentRegister from "./pages/Auth/StudentRegister";
import CollegeLogin from "./pages/Auth/CollegeLogin";
import CollegeRegister from "./pages/Auth/CollegeRegister";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import TodoListPage from "./pages/students/TodoListPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roadmap-generator" element={<RoadmapGenerator />} />
            <Route path="/auth/student-login" element={<StudentLogin />} />
            <Route path="/auth/student-register" element={<StudentRegister />} />
            <Route path="/auth/college-login" element={<CollegeLogin />} />
            <Route path="/auth/college-register" element={<CollegeRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/students/todo-list" element={<TodoListPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
