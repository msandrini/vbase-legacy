import { call, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { RESULTS, API_URL } from '../constants'
import t, { lang } from '../i18n'
import { sendCall, warnOnNetworkError, createAction, historyPush, buildQueryString } from '../utils'

const _getCallName = (action) => {
	let page = 1
	if (action.params.page && !isNaN(parseInt(action.params.page, 10))) {
		page = action.params.page
	} else if (action.query.page && !isNaN(parseInt(action.query.page, 10))) {
		page = action.query.page
	}
	const isQueryEmpty = Object.keys(action.query).length === 0
	if (action.params.names) {
		const query = encodeURIComponent(action.params.names)
		return `${API_URL}games/by-names/${query}/${page}`
	} else if (action.query && !isQueryEmpty) {
		const query = { ...action.query, page, lang }
		return [`${API_URL}games/advanced`, query]
	} else {
		return `${API_URL}games/all/${page}`
	}
}

const resultsEffects = {

	request: function* (action) {
		const callFeedback = _getCallName(action)

		try {
			let feedback
			if (typeof callFeedback === 'string') {
				feedback = yield call(sendCall, callFeedback)
			} else {
				const [callName, callData] = callFeedback
				feedback = yield call(sendCall, callName, 'post', callData)
			}
			if (feedback.status === 200) {
				yield put(createAction(RESULTS.RETRIEVED)({ feedback: feedback.data }))
			} else {
				yield put(createAction(RESULTS.FAILED)({ feedback }))
				warnOnNetworkError(feedback)
			}

		} catch (e) {
			yield put(createAction(RESULTS.FAILED)({ feedback: e }))
			warnOnNetworkError(e)
		}
	},

	requestPage: function* (action) {
		const page = parseInt(action.page, 10)
		let url
		if (action.query && Object.keys(action.query).length) {
			const queryObj = { ...action.query }
			delete queryObj.page
			delete queryObj.scores
			delete queryObj.sizes
			delete queryObj.years
			const queryString = buildQueryString(queryObj)
			url = `${t('url__advanced-search')}?${queryString}&page=${page}`
		} else if (action.params.names) {
			const query = encodeURIComponent(action.params.names)
			url = `${t('url__search')}/${query}/${page}`
		} else {
			url = `${t('url__all-games')}/${page}`
		}
		historyPush(`/${url}`)
	},

	triggerBack: function* (action) {
		browserHistory.goBack()
	}

}

export default resultsEffects
