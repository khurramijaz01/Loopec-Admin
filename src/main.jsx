import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";
import toast from "react-hot-toast";

const updateSW = registerSW({
  onNeedRefresh() {
    toast.success("New version available! Click to update.", {
      duration: 6000,
      action: {
        label: "Update",
        onClick: () => updateSW(true),
      },
    });
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
