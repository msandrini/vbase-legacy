import { call, put, select } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { GAME } from '../constants'
import { sendCall, warnOnNetworkError, createAction } from '../utils'

import t from '../i18n'

const gameEffects = {

    requestInfo: function*(action) {
        try {
            const feedback = yield call(sendCall, 'game/' + action.id)
            if (feedback.status === 200) {
                yield put(createAction(GAME.INFORETRIEVED)({ info: feedback.data }))
            } else {
                yield put(createAction(GAME.FAILEDLOADING)({ feedback }))
                warnOnNetworkError(feedback)
            }

        } catch (e) {
            yield put(createAction(GAME.FAILEDLOADING)({ feedback: e }))
            warnOnNetworkError(e)
        }
    },

    triggerBack: function*() {
        window.alert(t('game-not-found'))
        hashHistory.back()
    }

}

export default gameEffects
