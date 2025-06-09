// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSlx039ltVfvT-n9r1IoJQgrY8WFy-I6s",
    authDomain: "e-commerce-web-9ad64.firebaseapp.com",
    projectId: "e-commerce-web-9ad64",
    storageBucket: "e-commerce-web-9ad64.firebasestorage.app",
    messagingSenderId: "919176897746",
    appId: "1:919176897746:web:11736d9817ae8d1a9cf90b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app