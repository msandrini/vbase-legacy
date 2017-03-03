import { call, put, select } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { SEARCH } from '../constants'
import { createAction } from '../utils'

const filterForUrl = str => encodeURIComponent(str)

const searchEffects = {

    reset: function*() {
        yield put(createAction(SEARCH.RESETFIELDREQUESTED)())
    },

    simple: function*(action) {
    	const value = filterForUrl(action.value)
        hashHistory.push(`/search/${value}`)
    },

    advanced: function*(action) {
    	const query = filterForUrl(JSON.stringify(action.data))
        hashHistory.push(`/advanced-search/${query}`)
    }

}

export default searchEffects

