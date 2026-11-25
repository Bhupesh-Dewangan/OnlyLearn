/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("onlylearn_token");
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // 'login' | 'register'

  const openAuthModal = useCallback((mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Verify stored token on mount
  useEffect(() => {
    let isMounted = true;

    async function verifyUser() {
      const storedToken = localStorage.getItem("onlylearn_token");
      if (!storedToken) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const res = await api.getMe();
        if (isMounted && res.success && res.data) {
          setUser(res.data);
          setToken(storedToken);
        } else {
          localStorage.removeItem("onlylearn_token");
          if (isMounted) {
            setUser(null);
            setToken(null);
          }
        }
      } catch (err) {
        console.warn("Token expired or invalid:", err.message);
        localStorage.removeItem("onlylearn_token");
        if (isMounted) {
          setUser(null);
          setToken(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    verifyUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async ({ email, password }) => {
    const res = await api.login({ email, password });
    if (res.success && res.data) {
      localStorage.setItem("onlylearn_token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      closeAuthModal();
      return res.data.user;
    }
  };

  const register = async ({ username, email, password }) => {
    const res = await api.register({ username, email, password });
    if (res.success && res.data) {
      localStorage.setItem("onlylearn_token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      closeAuthModal();
      return res.data.user;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("onlylearn_token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
