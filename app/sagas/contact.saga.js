import { call, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { CONTACT, API_URL } from '../constants'
import { sendCall, warnOnNetworkError, createAction } from '../utils'

import t from '../i18n'

const contactEffects = {

	send: function* (action) {
		try {
			const feedback = yield call(sendCall, API_URL + 'contact', 'post', action.fields)
			if (feedback.status === 200) {
				yield put(createAction(CONTACT.SENTSUCCESFULLY)({ feedback: feedback.data }))
			} else {
				yield put(createAction(CONTACT.FAILED)({ feedback }))
				warnOnNetworkError(feedback)
			}

		} catch (e) {
			yield put(createAction(CONTACT.FAILED)({ feedback: e }))
			warnOnNetworkError(e)
		}
	},

	afterSent: function* (action) {
		window.alert(t('message-sent-successfully'))
		browserHistory.push(`/${t('url__all-games')}`)
	}

}

export default contactEffects
