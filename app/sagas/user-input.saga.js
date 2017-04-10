import { call, put } from 'redux-saga/effects'
import { API_URL, USERINPUT } from '../constants'
import { createAction, sendCall, warnOnNetworkError } from '../utils'
import t, { lang } from '../i18n'

export const userInputEffects = {

	requestList: function* (action) {
		yield put(createAction(USERINPUT.LISTREQUESTED)({ gameId: action.gameId }))
	},

	getReviews: function* (action) {
		try {
			const feedback = yield call(sendCall, `${API_URL}user-reviews/${action.gameId}`)
			if (feedback.status === 200) {
				yield put(createAction(USERINPUT.LISTRETRIEVED)({ feedback: feedback.data }))

			} else {
				yield put(createAction(USERINPUT.LISTFAILED)({ feedback }))
				warnOnNetworkError(feedback)
			}

		} catch (e) {
			yield put(createAction(USERINPUT.LISTFAILED)({ feedback: e }))
			warnOnNetworkError(e)
		}
	},

	submitNewReview: function* (action) {
		try {
			action.fields.lang = lang
			const feedback = yield call(sendCall, `${API_URL}review`, 'post', action.fields)
			if (feedback.status === 200) {
				alert(t('thanks-for-review'))
				document.location.reload()

			} else {
				yield put(createAction(USERINPUT.SENDFAILED)({ feedback }))
				warnOnNetworkError(feedback)
			}

		} catch (e) {
			yield put(createAction(USERINPUT.SENDFAILED)({ feedback: e }))
			warnOnNetworkError(e)
		}
	}
}

export default userInputEffects
