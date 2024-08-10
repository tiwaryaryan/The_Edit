// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "blog-website-bdf0c.firebaseapp.com",
  projectId: "blog-website-bdf0c",
  storageBucket: "blog-website-bdf0c.appspot.com",
  messagingSenderId: MESS_ID,
  appId: APP_ID,
  measurementId: MESUR_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;