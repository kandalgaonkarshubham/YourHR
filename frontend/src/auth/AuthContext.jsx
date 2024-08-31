import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const storeUser = async (credentials) => {
    setUser(credentials);
    localStorage.setItem("user", JSON.stringify(credentials));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = { user, storeUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
