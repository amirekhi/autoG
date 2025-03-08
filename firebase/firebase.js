import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBG2uF98t8vE3ZTjE2SaXAVqN46emQo08M",
    authDomain: "pizza-c4e90.firebaseapp.com",
    projectId: "pizza-c4e90",
    storageBucket: "pizza-c4e90.appspot.com",
    messagingSenderId: "128390017276",
    appId: "1:128390017276:web:f95e58fbd44a85eff8e779"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };