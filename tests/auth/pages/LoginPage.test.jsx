import { configureStore } from '@reduxjs/toolkit';
import {LoginPage} from '../../../src/auth/pages/LoginPage';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { authSlice } from '../../../src/store/auth/authSlice';
import { MemoryRouter } from 'react-router-dom';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    // preloadedState: {

    // }
})

describe('Preubas en LoginPage', () => {
    test('debe mostrar el componente correctamente', () => {
        render(
            <Provider store={ store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });
});