import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "My React Vite PWA",
        short_name: "MyPWA",
        description: "A React app with Vite + PWA support",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://hcy087s8e6n.sn.mynetname.net:5002",
        changeOrigin: true,
        secure: false,
      },
      "/sinaco": {
        target: "https://hcy087s8e6n.sn.mynetname.net:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
