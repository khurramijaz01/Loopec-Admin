import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register';
import toast from 'react-hot-toast';

const updateSW = registerSW({
  onNeedRefresh() {
    toast.success('New version available! Click to update.', {
      duration: 6000,
      action: {
        label: 'Update',
        onClick: () => updateSW(true),
      },
    });
  },
  onOfflineReady() {
    toast.success('App is ready to work offline!', {
      duration: 3000,
    });
  },
  onRegistered() {
    console.log('SW Registered');
  },
  onRegisterError(error) {
    console.log('SW registration error', error);
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
