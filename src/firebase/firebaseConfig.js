import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFt_ZUzDOP0inZbkVrWq5DaqrJC5caZyw",
  authDomain: "contacts-e5a08.firebaseapp.com",
  projectId: "contacts-e5a08",
  storageBucket: "contacts-e5a08.appspot.com",
  messagingSenderId: "573827644877",
  appId: "1:573827644877:web:60459f17e163ce2cc8d884",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
