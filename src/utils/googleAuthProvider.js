import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Fetch the Base64 Firebase config from environment variables
const firebaseConfigBase64 = import.meta.env.VITE_FIREBASE_CONFIG;

let firebaseConfigJson;
try {
  if (!firebaseConfigBase64) {
    throw new Error("Firebase config is missing in environment variables.");
  }

  const jsonString = atob(firebaseConfigBase64.trim());
  firebaseConfigJson = JSON.parse(jsonString);

  if (!firebaseConfigJson || typeof firebaseConfigJson !== "object") {
    throw new Error("Invalid Firebase config JSON.");
  }
} catch (error) {
  console.error("Error decoding Firebase config:", error);
}

// Initialize Firebase
const app = initializeApp(firebaseConfigJson);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;
    const idToken = await googleUser.getIdToken(); // Await to ensure token retrieval

    return { googleUser, idToken };
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error; // Forward error to caller
  }
};
