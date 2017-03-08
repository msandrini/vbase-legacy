import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { browserHistory } from 'react-router'
import { GAME, BASE_URL } from '../constants'
import { sendCall, warnOnNetworkError, createAction } from '../utils'

import t from '../i18n'

const gameEffects = {

	requestInfo: function* (action) {
		try {
			const feedback = yield call(sendCall, BASE_URL + 'game-entry/' + action.id)
			if (feedback.status === 200) {
				yield put(createAction(GAME.INFORETRIEVED)({ info: feedback.data }))
				if (feedback.data.series && feedback.data.series.length) {
					const seriesIds = feedback.data.series.map(s => s.id)
					yield call(delay, 500)
					const feedbackSeries = yield call(sendCall, BASE_URL + 'games/from-series/' + seriesIds.join(','))
					yield put(createAction(GAME.RELATEDGAMESRETRIEVED)({ info: feedbackSeries.data }))
				}
			} else {
				yield put(createAction(GAME.FAILEDLOADING)({ feedback }))
				warnOnNetworkError(feedback)
			}

		} catch (e) {
			yield put(createAction(GAME.FAILEDLOADING)({ feedback: e }))
			warnOnNetworkError(e)
		}
	},

	triggerBack: function* (action) {
		window.alert(t('game-not-found'))
		browserHistory.goBack()
	}

}

export default gameEffects
