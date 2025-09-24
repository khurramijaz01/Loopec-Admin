import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDrrMPbZuF0Wf7iZg_8wEsOT3VA0CveHh4",
    authDomain: "sinaco-hr-app.firebaseapp.com",
    projectId: "sinaco-hr-app",
    storageBucket: "sinaco-hr-app.firebasestorage.app",
    messagingSenderId: "827588228357",
    appId: "1:827588228357:web:03a6acad057ae363c9336c",
    measurementId: "G-EBPDK3LR48"
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async (setTokenFound) => {
  try {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }

      if (Notification.permission !== "granted") {
        console.warn("Notifications permission not granted by the user.");
        setTokenFound(false);
        return null;
      }
    }

    const currentToken = await getToken(messaging, {
      vapidKey: "BGIxS-lSJCmfZwkTmWFCQZQ2mgQitxF_XpFFr3jECxpmpj0abiWmTBrRgVFXwK_3p62ixAI66p_zMMH3uSx0nsM",
    });

    if (currentToken) {
      console.log("Current token:", currentToken);
      setTokenFound(true);
      localStorage.setItem("fcm_token", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available.");
      setTokenFound(false);
      return null;
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
    setTokenFound(false);
    return null;
  }
};

export const onMessageListener = (callback) => {
  if (typeof callback !== "function") {
    throw new Error("onMessageListener requires a callback function");
  }
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
};