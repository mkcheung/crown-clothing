// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMhyNMiP4avvfZndfOsS9-ZHHvDA0o8Bg",
  authDomain: "crwn-clothing-db-6fb6a.firebaseapp.com",
  projectId: "crwn-clothing-db-6fb6a",
  storageBucket: "crwn-clothing-db-6fb6a.appspot.com",
  messagingSenderId: "626699709253",
  appId: "1:626699709253:web:c6742c4881e7f0caed6c2c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// create a handle to the database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid); // look at what the authentication brings back from firebase

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log ('error creating the user', error.message);
        }
    }

    // if user data exists
    // return userDocRef
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   
    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
}