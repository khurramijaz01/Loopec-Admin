importScripts(
  "https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBcLmBJzJDbuiIAqLyPiXLXqAxfAhxHLaQ",
  authDomain: "testapp-8c95f.firebaseapp.com",
  projectId: "testapp-8c95f",
  storageBucket: "testapp-8c95f.firebasestorage.app",
  messagingSenderId: "171780616501",
  appId: "1:171780616501:web:21cb898134a69722321c7c",
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
