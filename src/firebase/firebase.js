import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBcLmBJzJDbuiIAqLyPiXLXqAxfAhxHLaQ",
  authDomain: "testapp-8c95f.firebaseapp.com",
  projectId: "testapp-8c95f",
  storageBucket: "testapp-8c95f.firebasestorage.app",
  messagingSenderId: "171780616501",
  appId: "1:171780616501:web:21cb898134a69722321c7c",
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
      vapidKey: "BK0_z8RC5qn6T8YBD4A1FXHEZoDHBSVgENKvkjBoJDP5aVsGsGSV2BB8_NQfKSYCJg64IcyPmeyHcW-_B5o7ano",
    });

    if (currentToken) {
      console.log("Current token:", currentToken);
      setTokenFound(true);
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