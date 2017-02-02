import { Storage, SessionStorage } from './utils';

const AUTH_STORAGE_KEY = 'auth';
const AUTH_USER_STORAGE_KEY = 'user';
const AUTH_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // one day

const _getAuthExpirationTime = () => {
    return Date.now() + AUTH_EXPIRATION_TIME;
};

export const setAuthStorage = (userData) => {
    (new Storage(AUTH_STORAGE_KEY)).set({
        token: userData.body.authToken,
        requested: Date.now(),
        expires: _getAuthExpirationTime()
    });
    // set user storage to keep everything but the token
    setSessionStorage(userData.body.User);
};

export const setSessionStorage = (userObj) => {
    (new SessionStorage(AUTH_USER_STORAGE_KEY)).set(userObj);
}

export const clearAuthStorage = () => {
    (new Storage(AUTH_STORAGE_KEY)).remove();
    (new SessionStorage(AUTH_USER_STORAGE_KEY)).remove();
};

export const isAuthorised = () => {
    const authInfo = (new Storage(AUTH_STORAGE_KEY)).get();
    if (authInfo) {
        const token = authInfo.token;
        const expiration = authInfo.expires;
        const isExpired = expiration <= Date.now();
        return (token && expiration && !isExpired);
    } else {
        return false;
    }
};

export const getUserInfo = () => {
    return (new SessionStorage(AUTH_USER_STORAGE_KEY)).get();
};

export const getAuthToken = () => {
    const authInfo = (new Storage(AUTH_STORAGE_KEY)).get();
    return authInfo && authInfo.token ? authInfo.token : false;
}

export const authRedirection = (nextState, replace, callback) => {
    const isThisLocAllowed = false;
    if (!isThisLocAllowed) {
        replace('/');
    }
    callback();
};

