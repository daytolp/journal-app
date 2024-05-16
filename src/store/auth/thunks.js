import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNoteLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        console.log({result})
        if (!result.ok){
            return dispatch(logout(result.errorMessage))
        }

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        
        const {errorMessage, ok, uid, photoUrl } = await registerUserWithEmailPassword({ email, password, displayName });
        if (!ok)  return dispatch(logout({errorMessage}));

        dispatch(login({ uid, displayName, email, photoUrl }));
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const {errorMessage, ok, uid, photoURL, displayName } = await loginWithEmailPassword({ email, password });
      
        if (!ok)  return dispatch(logout({errorMessage}));
        
        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLogoutFirebase = () => {
    return async (dispatch) => {
       await logoutFirebase();
    //    dispatch(logout({ errorMessage: null }));
       dispatch(logout());
       dispatch(clearNoteLogout());
    }
}