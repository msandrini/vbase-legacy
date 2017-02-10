import { call, put, select } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { RESULTS } from '../constants'
import { sendCall, warnOnNetworkError, createAction } from '../utils'

const _getCallName = (action) => {
	const page = (action.page && parseInt(action.page, 10) !== NaN) ? action.page : 0
	let call;
    if (action.names) {
    	return `games/by-names/${action.names}/${page}`
    } else if (action.query) {
    	return `` ///
    } else {
    	return `games/all/${page}`
    }
}

const resultsEffects = {

    request: function*(action) {
        const callName = _getCallName(action)
        
        try {
            const feedback = yield call(sendCall, callName)
            if (feedback.status === 200) {
                yield put(createAction(RESULTS.RETRIEVED)(feedback.data))
            } else {
                yield put(createAction(RESULTS.FAILED)(feedback))
                warnOnNetworkError(feedback)
            }
            
        } catch(e) {
            yield put(createAction(RESULTS.FAILED)(e))
            warnOnNetworkError(e)
        }
    },

    requestPage: function*(action) {
        const page = parseInt(action.page, 10) + 1
        if (action.params.query) {
            hashHistory.push(`/advanced-search/${action.params.query}/${page}`)
        } else if (action.params.names) {
            hashHistory.push(`/search/${action.params.names}/${page}`)
        } else {
            hashHistory.push(`/all-games/${page}`)
        }
    }

}

export default resultsEffects

