importScripts(
  "https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDrrMPbZuF0Wf7iZg_8wEsOT3VA0CveHh4",
  authDomain: "sinaco-hr-app.firebaseapp.com",
  projectId: "sinaco-hr-app",
  storageBucket: "sinaco-hr-app.firebasestorage.app",
  messagingSenderId: "827588228357",
  appId: "1:827588228357:web:03a6acad057ae363c9336c",
  measurementId: "G-EBPDK3LR48"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
