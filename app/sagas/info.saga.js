import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { hashHistory } from 'react-router'
import { INFO } from '../constants'
import { sendCall, warnOnNetworkError, createAction } from '../utils'

import t from '../i18n'

const infoEffects = {

	requestContent: function*(action) {
		try {
			const feedback = yield call(sendCall, `info/${action.subject}/${action.key}`)
			if (feedback.status === 200) {
				yield put(createAction(INFO.CONTENTRETRIEVED)({ 
					title: (feedback.data.title || feedback.data.name), 
					content: feedback.data.text
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

	triggerBack: function*(action) {
		window.alert(t('info-not-found'))
		hashHistory.goBack()
	}

}

export default infoEffects
