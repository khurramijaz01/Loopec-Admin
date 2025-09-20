import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [empData, setEmpData] = useState(null);

  const login = (user, token) => {
    setIsAuthenticated(true);
    setUserToken(token);
    setUserData(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user_data", JSON.stringify(user));
    localStorage.setItem("access_token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserToken(null);
    setUserData(null);
    setEmpData(null);
    localStorage.clear();
  };

  const loadToken = () => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user_data");
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedEmpData = localStorage.getItem("emp_data");
    
    if (token) {
      setUserToken(token);
    }
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    if (storedEmpData) {
      setEmpData(JSON.parse(storedEmpData));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadToken();
  }, []);

  const setEmployeeData = (data) => {
    setEmpData(data);
    localStorage.setItem("emp_data", JSON.stringify(data));
  };

  const value = {
    isAuthenticated,
    isLoading,
    userToken,
    userData,
    empData,
    login,
    logout,
    setEmployeeData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
