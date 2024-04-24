import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({credentials})
        const user = result.user;
        console.log({ user });
        const { displayName, photoURL, email, uid } = user;
        return {
            ok: true, displayName, photoURL, email, uid
        }
    } catch (error) {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false, errorMessage, errorCode
        } 
    }
} 

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
       const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
       const {uid, photoURL } = response.user;
       console.log({response})
       //Actualizar displayName en firebase
       await updateProfile(FirebaseAuth.currentUser)
       return { ok: true, uid, photoURL, displayName, email  };
    } catch (error) {
        console.log("ERROR -> ", {error})
        return { ok: false, errorMessage: error.message }; 
    }
} 

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
       const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
       const {uid, photoURL, displayName } = response.user;
       console.log({response})

      return { ok: true, uid, photoURL, displayName, email  };
    } catch (error) {
        console.log("ERROR -> ", {error})
        return { ok: false, errorMessage: error.message }; 
    }
} 

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
} 

