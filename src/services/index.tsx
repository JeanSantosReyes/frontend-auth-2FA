import API from '../api';

export const setupApi = (username: string) => {
    return API.post('/setup-2fa', { username });
}

export const verifyApi = (username: string, token: string) => {
    return API.post('/verify-2fa', { username, token });
}