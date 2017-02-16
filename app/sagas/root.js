import { takeLatest } from 'redux-saga';
import resultsEffects from './results.saga';
import searchEffects from './search.saga';
import contactEffects from './contact.saga';
import { RESULTS, SEARCH, CONTACT } from '../constants';

const rootSaga = function*() {
	yield [
		takeLatest(RESULTS.REQUESTED, resultsEffects.request),
		takeLatest(RESULTS.PAGEREQUESTED, resultsEffects.requestPage),
		takeLatest(SEARCH.SUBMITTEDSIMPLE, searchEffects.simple),
		takeLatest(SEARCH.SUBMITTEDADVANCED, searchEffects.advanced),
		takeLatest(CONTACT.SUBMITTED, contactEffects.send),
		takeLatest(CONTACT.SENTSUCCESFULLY, contactEffects.afterSent)
	];
};

export default rootSaga;