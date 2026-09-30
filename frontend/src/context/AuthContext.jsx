import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token"),
  );
  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsAuthenticated(false);
  }
  const value = {
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
