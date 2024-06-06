import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCb5-dsbQO6idmbt9vtfPw-rC3O7sLs96g",
  authDomain: "push-notification-4b7c4.firebaseapp.com",
  projectId: "push-notification-4b7c4",
  storageBucket: "push-notification-4b7c4.appspot.com",
  messagingSenderId: "1030308222245",
  appId: "1:1030308222245:web:882bc17edd141e9c2df6cc",
  measurementId: "G-T48LCTN8RJ",
};

export default function getDeviceCode() {
  try {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const app = initializeApp(firebaseConfig);

        const messaging = getMessaging(app);
        console.log("Messaging", messaging);
        getToken(messaging, {
          vapidKey:
            "BO20HhETe-fpWQf_BdI8O5uE3zdQ8DGd0Lh8WczPfhoSI27ery5ioDl5hd8qMVzuvzl3n5xD1OT6I64YCD5VBgY",
        }).then((currentToken) => {
          if (currentToken) {
            console.log("currentToken: ", currentToken);
            return currentToken;
          } else {
            console.log("Can not get token");
          }
        });
      } else {
        console.log("Do not have permission!");
      }
    });
  } catch (error) {
    return null;
  }
}
