import { put } from 'redux-saga/effects'
import { SEARCH } from '../constants'
import { createAction, historyPush, buildQueryString } from '../utils'

const filterForUrl = str => encodeURIComponent(str)

const searchEffects = {

	reset: function* () {
		yield put(createAction(SEARCH.RESETFIELDREQUESTED)())
	},

	simple: function* (action) {
		const value = filterForUrl(action.value)
		historyPush(`/search/${value}`)
	},

	advanced: function* (action) {
		const query = buildQueryString(action.data)
		historyPush(`/advanced-search?${query}`)
	}

}

export default searchEffects
