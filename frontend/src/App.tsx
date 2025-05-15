
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { queryClient, useChats } from "./hooks/useApi";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Providers from "./providers/Providers";
import { Navbar } from "./components/nav/Navbar";
import { useChatStore } from "./store/chatStore";
import React from "react";

type ProtectedRouteProps = {
  element: React.ReactElement;
  requireAdmin?: boolean;
};

const ProtectedRoute = ({ element, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return element;
};

const App = () => {
  const {data} = useChats()
  const {setChats} = useChatStore()
  const { isAuthenticated } = useAuthStore();

  React.useEffect(() => {
    if (data) {
      const chatData = data.map(({ _id, createdAt, ...rest }) => {
        return {
          id: _id,
          createdAt,
          ...rest,
        };
      });
  
      setChats(chatData); 
     
    }
  }, [data, setChats,isAuthenticated]);
  
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Providers>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/chats" 
            element={<ProtectedRoute element={<HomePage />} />}
          />
          <Route 
            path="/settings" 
            element={<ProtectedRoute element={<SettingsPage />} />} 
          />
          <Route 
            path="/admin" 
            element={<ProtectedRoute element={<AdminPage />} requireAdmin />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </Providers>
    </TooltipProvider>
  )
}

export default App;
