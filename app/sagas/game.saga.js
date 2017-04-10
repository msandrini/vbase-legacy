import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { browserHistory } from 'react-router'
import { GAME, API_URL } from '../constants'
import { sendCall, warnOnNetworkError, createAction } from '../utils'

import t from '../i18n'

const gameEffects = {

	requestInfo: function* (action) {
		try {
			const feedback = yield call(sendCall, API_URL + 'game-entry/' + action.id)
			if (feedback.status === 200) {
				yield put(createAction(GAME.INFORETRIEVED)({ info: feedback.data }))
				if (feedback.data.series && feedback.data.series.length) {
					// Get number of images
					yield call(delay, 200)
					const feedbackImg = yield call(sendCall, API_URL + 'images-gameplay/' + action.id)
					yield put(createAction(GAME.IMAGELISTRETRIEVED)({ images: feedbackImg.data.images }))
					// Get related games (series)
					yield call(delay, 200)
					const seriesIds = feedback.data.series.map(s => s.id)
					const feedbackSeries = yield call(sendCall, API_URL + 'games/from-series/' + seriesIds.join(','))
					yield put(createAction(GAME.RELATEDGAMESRETRIEVED)({ info: feedbackSeries.data }))
				}
			} else {
				yield put(createAction(GAME.FAILEDLOADING)({ feedback }))
				warnOnNetworkError(feedback)
			}

		} catch (e) {
			if (e.toString().indexOf(404) !== -1) {
				yield put(createAction(GAME.FAILEDLOADING)({ feedback: t('game-not-found') }))
			} else {
				yield put(createAction(GAME.FAILEDLOADING)({ feedback: e }))
				warnOnNetworkError(e)
			}
		}
	},

	triggerBack: function* (action) {
		window.alert(t('game-not-found'))
		browserHistory.goBack()
	},

	changeImage: function* (action) {
		const { images, current } = yield select(state => ({
			images: state.game.images,
			current: state.game.currentImage
		}))
		let newImage = current + action.increment
		if (newImage > images) {
			newImage = 1
		} else if (newImage === 0) {
			newImage = images
		}
		yield put(createAction(GAME.IMAGECHANGED)({ newImage }))
	}

}

export default gameEffects
