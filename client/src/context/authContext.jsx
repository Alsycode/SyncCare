import { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext();

// AuthProvider.js
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
 return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated,admin,setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}