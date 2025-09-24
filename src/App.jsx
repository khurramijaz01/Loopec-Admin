import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { requestForToken, onMessageListener } from "./firebase/firebase";

function App() {
  const [notification, setNotification] = useState(null);
  const [tokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    requestForToken(setTokenFound);

    const unsubscribe = onMessageListener((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
          <Toaster position="top-center" />

          {notification && (
            <div
              style={{
                position: "fixed",
                top: "20px",
                bottom: "auto",
                right: "20px",
                left: "20px",
                zIndex: 9999,
                background: "#333",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              <h4>{notification.title}</h4>
              <p>{notification.body}</p>
            </div>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
