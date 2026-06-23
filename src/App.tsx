import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import WorkInProgress from "./pages/WorkInProgress";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import AnalysingResume from "./pages/AnalysingResume";
import FinalResult from "./pages/FinalResult";
import { useUserStore } from "./store";

// Configure Axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";
axios.defaults.withCredentials = true;

// Add response interceptor to handle 401 unauthorized errors dynamically
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and trigger user store logout cleanup
      localStorage.removeItem("token");
      useUserStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

// Wrapper for routes that require authentication
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const token = localStorage.getItem("token");

  // Validate both Zustand state and actual token presence before granting access
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Wrapper for routes that should only be accessible when logged out
function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const token = localStorage.getItem("token");

  // Allow access only if the user is truly unauthenticated and has no token
  return (!isAuthenticated || !token) ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

// Syncs state dynamically across manual storage updates, page load, and router transitions
function AuthSynchronizer() {
  const location = useLocation();
  const logout = useUserStore((state) => state.logout);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  // Check token on initial render/application load and on every route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && isAuthenticated) {
      logout();
    }
  }, [location, isAuthenticated, logout]);

  // Storage listener to immediately capture manual localStorage changes (like deleting token from dev tools)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        logout();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [logout]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthSynchronizer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/wip" element={<WorkInProgress />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
        <Route path="/analysing" element={<ProtectedRoute><AnalysingResume /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><FinalResult /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
