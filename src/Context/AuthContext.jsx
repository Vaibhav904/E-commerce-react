// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   const saveToken = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ token, saveToken, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [role, setRole] = useState(localStorage.getItem("role") || null);

//   const saveToken = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//   };

//   const saveRole = (newRole) => {
//     setRole(newRole);
//     localStorage.setItem("role", newRole);
//   };

//   const logout = () => {
//     setToken(null);
//     setRole(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//   };

//   return (
//     <AuthContext.Provider value={{ token, role, saveToken, saveRole, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [role, setRole] = useState(localStorage.getItem("role") || null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Update isAuthenticated whenever token or role changes
//   useEffect(() => {
//     setIsAuthenticated(!!token && !!role); // true only if both exist
//   }, [token, role]);

//   const saveToken = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//   };

//   const saveRole = (newRole) => {
//     setRole(newRole);
//     localStorage.setItem("role", newRole);
//   };

//   const logout = () => {
//     setToken(null);
//     setRole(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//   };

//   // Optional: function to attach token/role to headers for API calls
//   const authHeaders = () => {
//     if (!token || !role) return {};
//     return {
//       Authorization: `Bearer ${token}`,
//       "X-User-Role": role,
//     };
//   };

//   return (
//     <AuthContext.Provider
//       value={{ token, role, isAuthenticated, saveToken, saveRole, logout, authHeaders }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Update isAuthenticated whenever token or role changes
  useEffect(() => {
    if (token && role && ["user", "admin", "vendor"].includes(role)) {
      setIsAuthenticated(true);
    } else {
      // Auto logout if token/role invalid
      setIsAuthenticated(false);
      setToken(null);
      setRole(null);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [token, role]);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const saveRole = (newRole) => {
    if (["user", "admin", "vendor"].includes(newRole)) {
      setRole(newRole);
      localStorage.setItem("role", newRole);
    } else {
      console.warn("Invalid role provided:", newRole);
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // Helper functions for role-based access
  const isUser = () => role === "user" && isAuthenticated;
  const isAdmin = () => role === "admin" && isAuthenticated;
  const isVendor = () => role === "vendor" && isAuthenticated;

  // Function to attach token/role to API headers
  const authHeaders = () => {
    if (!token || !role) return {};
    return {
      Authorization: `Bearer ${token}`,
      "X-User-Role": role,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated,
        saveToken,
        saveRole,
        logout,
        authHeaders,
        isUser,
        isAdmin,
        isVendor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};