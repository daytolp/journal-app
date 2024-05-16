import { configureStore } from '@reduxjs/toolkit';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { authSlice } from '../../../src/store/auth/authSlice';
import { MemoryRouter } from 'react-router-dom';
import { noAuthenticatedState } from '../../fixtures/authFixtures';


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}));

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailAndPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailAndPassword({email, password});
    },
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: noAuthenticatedState
    }
})

describe('Preubas en LoginPage', () => {
    beforeEach(() => jest.clearAllMocks());
    test('debe mostrar el componente correctamente', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('El botón de Google debe de llamar el startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        const btnGoogle = screen.getByLabelText('google-btn');
        fireEvent.click(btnGoogle);
        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('submit debe de llamar startLoginWithemailPassword', () => {
        const email = 'juan@gmail.com';
        const password = '123456';
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const loginform = screen.getByLabelText('submit-form');
        fireEvent.submit(loginform);

        expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({
            email,
            password
        });
    });
});
