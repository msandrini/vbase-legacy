import { call, put, select } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { RESULTS } from '../constants'
import { sendCall, warnOnNetworkError, createAction } from '../utils'

const _getCallName = (action) => {
	const page = (action.page && parseInt(action.page, 10) !== NaN) ? action.page : 0
    if (action.names) {
        const query = encodeURIComponent(action.names)
    	return `games/by-names/${query}/${page}`
    } else if (action.query) {
        const query = encodeURIComponent(action.query)
    	return `games/advanced/${query}/${page}`
    } else {
    	return `games/all/${page}`
    }
}

const resultsEffects = {

    request: function*(action) {
        const callName = _getCallName(action);
        
        try {
            const feedback = yield call(sendCall, callName)
            if (feedback.status === 200) {
                yield put(createAction(RESULTS.RETRIEVED)({ feedback: feedback.data }))
            } else {
                yield put(createAction(RESULTS.FAILED)({ feedback }))
                warnOnNetworkError(feedback)
            }
            
        } catch(e) {
            yield put(createAction(RESULTS.FAILED)({ feedback: e }))
            warnOnNetworkError(e)
        }
    },

    requestPage: function*(action) {
        const page = parseInt(action.page, 10) + 1
        if (action.params.query) {
            const query = encodeURIComponent(action.params.query)
            const firstPart = `advanced-search/${query}`
        } else if (action.params.names) {
            const query = encodeURIComponent(action.params.names)
            const firstPart = `search/${query}`
        } else {
            const firstPart = `all-games`
        }
        hashHistory.push(`/${firstPart}/${page}`)
    }, 

    triggerBack: function*(action) { console.log(hashHistory)
        hashHistory.goBack()
    }

}

export default resultsEffects

