// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName, email, createdAt
			});
		}
		catch(error) {
			console.log("Error creating the user", error.message);
		}
	}

	return userDocRef;
}
