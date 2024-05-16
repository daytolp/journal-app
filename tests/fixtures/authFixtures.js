export const initialState = {
    status: 'checking', 
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated', 
    uid: '1234',
    email: 'demo@google.com',
    displayName: 'Demo user',
    photoUrl: 'https://demo.jpg',
    errorMessage: null
}

export const noAuthenticatedState = {
    status: 'not-authenticated', 
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null
}

export const demoUser = {
    uid: '1234',
    email: 'demo@google.com',
    displayName: 'Demo user',
    photoUrl: 'https://demo.jpg',
}