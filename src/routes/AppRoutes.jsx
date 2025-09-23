import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout/Layout";
import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";
import Leaves from "../screens/Leaves/Leaves";
import Purchase from "../screens/Purchase/Purchase";
import Profile from "../screens/Profile/Profile";


const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Leaves />} />
        </Route>
        <Route
          path="/purchase"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Purchase />} />
        </Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default AppRoutes;


