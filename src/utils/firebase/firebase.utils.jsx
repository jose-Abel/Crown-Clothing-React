// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIb0exlNKmqTO1kAfqb2AHiHEed2jamuM",
  authDomain: "crown-clothing-db-12b49.firebaseapp.com",
  projectId: "crown-clothing-db-12b49",
  storageBucket: "crown-clothing-db-12b49.appspot.com",
  messagingSenderId: "423398658032",
  appId: "1:423398658032:web:35a36f60e5099e7b40d735"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if(!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName, email, createdAt, ...additionalInformation
			});
		}
		catch(error) {
			console.log("Error creating the user", error.message);
		}
	}

	return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
}