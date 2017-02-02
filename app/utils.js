/* Generic action creator */

export const createAction = (type) => {
    return (objsToSend = {}) => ({
        type,
        ...objsToSend
    });
}

/* Storage */

export class Storage {

    constructor(key) {
        const STORAGE_PREFIX = 'xl';
        const STORAGE_SEPARATOR = '-';
        this.composedKey = STORAGE_PREFIX + STORAGE_SEPARATOR + key;
        this.storageObj = window.localStorage;
    }

    get() {
        const rawReturn = this.storageObj.getItem(this.composedKey);
        return JSON.parse(rawReturn);
    }
    set(value) {
        this.storageObj.setItem(this.composedKey, JSON.stringify(value));
    }
    remove() {
        this.storageObj.removeItem(this.composedKey);
    }
};

export class SessionStorage extends Storage {
    constructor(key) {
        super(key);
        this.storageObj = window.sessionStorage;
    }
}

/* General function for catch() on api calls */
export const warnOnNetworkError = (error) => {
    console.error('Network error', error);
}