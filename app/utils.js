import { BASE_URL } from './constants'
import axios from 'axios'

/* Generic action creator */

export const createAction = (type) => {
    return (objsToSend = {}) => ({
        type,
        ...objsToSend
    })
}

/* Call function */

export const sendCall = (url, method = 'get', data = {}) => {
    const params = { baseUrl: BASE_URL, method, url, data }
    return axios(params).catch(warnOnNetworkError)
}

export const warnOnNetworkError = (error) => {
    console.error('Network error', error)
}

/* String helper */

export const joinText = (array, comma, and) => {
    const allButLast = array.slice(0, array.length - 1)
    const last = array[array.length - 1]
    return array.length > 1 ? (allButLast.join(`${comma} `) + ` ${and} ` + last) : array[0]
}