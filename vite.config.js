import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://hcy087s8e6n.sn.mynetname.net:5002',
        changeOrigin: true,
        secure: false,
      },
      '/sinaco': {
        target: 'https://hcy087s8e6n.sn.mynetname.net:5001',
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
