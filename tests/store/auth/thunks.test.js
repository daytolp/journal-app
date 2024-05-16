import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailAndPassword, startGoogleSignIn, startLoginWithEmailAndPassword, startLogoutFirebase } from "../../../src/store/auth/thunks";
import { clearNoteLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas authThunks' , () => {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());
    test('debe invocar el checkingCredentials', async() => {
        
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('debe startGoogleSignIn el checkingCredentials y login - Exito', async() => {
        const loginData = {ok: true, ...demoUser};
      
        //Providers
        await signInWithGoogle.mockResolvedValue(loginData);
        //thunks
        await startGoogleSignIn()(dispatch);
        //Se espera que halla mandado a llamar al reducer
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe llamar el checkingCredentials y login - Error', async() => {
        const loginData = { ok: false, uid: 123, photoURL: '', displayName: 'Juan', email: 'juan@gmail.com' };
      
        //Providers
        await signInWithGoogle.mockResolvedValue(loginData);
        //thunks
        await startGoogleSignIn()(dispatch);
        //Se espera que halla mandado a llamar al reducer
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startCreatingUserWithEmailAndPassword debe llamar el checkingCredentials y login - Exito', async() => {
        const { email, displayName, uid, photoUrl } = demoUser;
        const password = '123456';
        const userRegisterData = {ok: true, ...demoUser};

        //Providers
        await registerUserWithEmailPassword.mockResolvedValue(userRegisterData);
        //thunks
        await startCreatingUserWithEmailAndPassword({email, displayName, password})(dispatch);
        //Se espera que halla mandado a llamar al reducer
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({ uid, displayName, email, photoUrl }));
    });

    test('startCreatingUserWithEmailAndPassword debe llamar el checkingCredentials y logout - Error', async() => {
        const { email, displayName} = demoUser;
        const password = '123456';
        const userRegisterData = {ok: false, errorMessage: 'Error al registrar usuario', ...demoUser};

        //Providers
        await registerUserWithEmailPassword.mockResolvedValue(userRegisterData);
        //thunks
        await startCreatingUserWithEmailAndPassword({email, displayName, password})(dispatch);
        //Se espera que halla mandado a llamar al reducer
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: userRegisterData.errorMessage}));
    });
    

    test('startLoginWithEmailAndPassword debe llamar el checkingCredentials y login - Exito', async() => {
        const formData = {email: demoUser.email, password: '123456'};
        const logindata = {ok: true, ...demoUser, photoURL: demoUser.photoUrl};
        delete logindata.photoUrl;

        //Providers
        await loginWithEmailPassword.mockResolvedValue(logindata);
        //thunks
        await startLoginWithEmailAndPassword(formData)(dispatch);
        //Se espera que halla mandado a llamar al reducer
        // expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({ uid: logindata.uid, displayName: logindata.displayName, email: logindata.email, photoURL: logindata.photoURL }));
    });

    test('startLogoutFirebase debe llamar el logoutFirebase, clearNotes y logout', async() => {
        //thunks
        await startLogoutFirebase()(dispatch);
        //Se espera que halla mandado a llamar al reducer
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNoteLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});