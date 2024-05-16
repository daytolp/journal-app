import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas authSlice' , () => {
    test('debe regresar el estado inicial y llamarse "auth"', () => {
        const state = authSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe("auth");
    });

    test('debe realizar la autenticación', () => {      
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated', 
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoUrl: demoUser.photoUrl,
            errorMessage: null
        })
    });

    
    test('debe realizar logout sin argumentos', () => {      
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoUrl: null,
            errorMessage: undefined
        })
    });

    
    test('debe realizar el logout y mostrar el mensaje de error', async() => { 
        const errorMessage = "Credenciales incorrectas"     
        const state = authSlice.reducer(initialState, logout({errorMessage}));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoUrl: null,
            errorMessage: errorMessage
        })
    });

    test('debe cambiar el estado a checking', async() => { 
        const errorMessage = "Credenciales incorrectas"     
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    });

});