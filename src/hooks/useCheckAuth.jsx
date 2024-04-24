import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {
    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
      //onAuthStateChanged maneja un observable cada que cambia el estatdo del usuario hace una emisión
      onAuthStateChanged(FirebaseAuth, (user) => {

        if (!user) return dispatch(logout());
        
        const { uid, email, photoURL, displayName } = user;
        dispatch(login({ uid, email, photoURL, displayName }));
        dispatch(startLoadingNotes())
      });
    }, []);
    
    return {
         status
    }
}