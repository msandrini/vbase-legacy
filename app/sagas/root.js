import { takeLatest } from 'redux-saga'
import resultsEffects from './results.saga'
import searchEffects from './search.saga'
import contactEffects from './contact.saga'
import gameEffects from './game.saga'
import infoEffects from './info.saga'
import userInputEffects from './user-input.saga'
import loginEffects from './login.saga'
import { RESULTS, SEARCH, CONTACT, GAME, INFO, USERINPUT, LOGIN, LOGOUT } from '../constants'

const rootSaga = function* () {
	yield [
		takeLatest(RESULTS.REQUESTED, resultsEffects.request),
		takeLatest(RESULTS.PAGEREQUESTED, resultsEffects.requestPage),
		takeLatest(RESULTS.BACKREQUESTED, resultsEffects.triggerBack),

		takeLatest(SEARCH.SUBMITTEDSIMPLE, searchEffects.simple),
		takeLatest(SEARCH.SUBMITTEDADVANCED, searchEffects.advanced),
		takeLatest(SEARCH.TOGGLEADVANCED, searchEffects.reset),

		takeLatest(CONTACT.SUBMITTED, contactEffects.send),
		takeLatest(CONTACT.SENTSUCCESFULLY, contactEffects.afterSent),

		takeLatest(GAME.REQUESTEDINFO, gameEffects.requestInfo),
		takeLatest(GAME.FAILEDONURL, gameEffects.triggerBack),
		takeLatest(GAME.CHANGEIMAGEREQUESTED, gameEffects.changeImage),

		takeLatest(INFO.CONTENTREQUESTED, infoEffects.requestContent),
		takeLatest(INFO.BACKREQUESTED, infoEffects.triggerBack),

		takeLatest(USERINPUT.OVERLAYREQUESTED, userInputEffects.requestList),
		takeLatest(USERINPUT.LISTREQUESTED, userInputEffects.getReviews),
		takeLatest(USERINPUT.SUBMITTED, userInputEffects.submitNewReview),

		takeLatest(LOGIN.REQUESTED, loginEffects.login),
		takeLatest(LOGIN.CHECKREQUESTED, loginEffects.checkLogin),
		takeLatest(LOGOUT.REQUESTED, loginEffects.logout)
	]
}

export default rootSaga
