import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyA-wIIbTKSPX74JyqzQcqyD-N7YkubZ76Y",
	authDomain: "keep-password-b70b4.firebaseapp.com",
	projectId: "keep-password-b70b4",
	storageBucket: "keep-password-b70b4.appspot.com",
	messagingSenderId: "83214673872",
	appId: "1:83214673872:web:4bc0c4b0e6d2d6d4593bd5",
	measurementId: "G-3JL9N8KT2X",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = firebase.firestore();
export default app;
