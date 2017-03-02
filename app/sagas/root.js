import { takeLatest } from 'redux-saga';
import resultsEffects from './results.saga';
import searchEffects from './search.saga';
import contactEffects from './contact.saga';
import gameEffects from './game.saga';
import infoEffects from './info.saga';
import { RESULTS, SEARCH, CONTACT, GAME, INFO } from '../constants';

const rootSaga = function*() {
	yield [
		takeLatest(RESULTS.REQUESTED, resultsEffects.request),
		takeLatest(RESULTS.PAGEREQUESTED, resultsEffects.requestPage),
		takeLatest(RESULTS.BACKREQUESTED, resultsEffects.triggerBack),

		takeLatest(SEARCH.SUBMITTEDSIMPLE, searchEffects.simple),
		takeLatest(SEARCH.SUBMITTEDADVANCED, searchEffects.advanced),

		takeLatest(CONTACT.SUBMITTED, contactEffects.send),
		takeLatest(CONTACT.SENTSUCCESFULLY, contactEffects.afterSent),
		
		takeLatest(GAME.REQUESTEDINFO, gameEffects.requestInfo),
		takeLatest(GAME.FAILEDONURL, gameEffects.triggerBack),

		takeLatest(INFO.CONTENTREQUESTED, infoEffects.requestContent),
	];
};

export default rootSaga;