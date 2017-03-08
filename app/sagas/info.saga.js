import { call, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { INFO, BASE_URL } from '../constants'
import { sendCall, warnOnNetworkError, createAction } from '../utils'

const infoEffects = {

	requestContent: function* (action) {
		try {
			const feedback = yield call(sendCall, `${BASE_URL}info-entry/${action.subject}/${action.key}`)
			if (feedback.status === 200) {
				yield put(createAction(INFO.CONTENTRETRIEVED)({
					title: (feedback.data.title || feedback.data.name),
					content: feedback.data.text,
					imageExists: feedback.data.imageExists
				}))

			} else {
				yield put(createAction(INFO.FAILEDLOADING)({ feedback }))
				warnOnNetworkError(feedback)
			}

		} catch (e) {
			yield put(createAction(INFO.FAILEDLOADING)({ feedback: e }))
			warnOnNetworkError(e)
		}
	},

	triggerBack: function* (action) {
		browserHistory.goBack()
	}

}

export default infoEffects
