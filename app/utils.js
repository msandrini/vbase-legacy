import { BASE_URL } from './constants'
import axios from 'axios'
import { browserHistory } from 'react-router'

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
	return axios(params)
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

/* Array helper */

export const getFilledArray = quantity => new Array(quantity + 1).join('-').split('')

/* History helper */

export const historyPush = url => {
	browserHistory.push(`${url}`)
}

export const buildQueryString = (parameters, prefix) => {
	let str = []
	for (let p in parameters) {
		if (parameters.hasOwnProperty(p)) {
			const k = prefix ? prefix + '-' + p : p
			const v = parameters[p]
			str.push((v !== null && typeof v === 'object') ?
				buildQueryString(v, k) :
				encodeURIComponent(k) + '=' + encodeURIComponent(v))
		}
	}
	return str.join('&')
}

/* Optimizations for init */

let timer
export const optimizeScroll = () => {
	clearTimeout(timer)
	if (!document.body.classList.contains('disable-hover')) {
		document.body.classList.add('disable-hover')
	}
	timer = setTimeout(() => {
		document.body.classList.remove('disable-hover')
	}, 500)
}
