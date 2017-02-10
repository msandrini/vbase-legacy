import { takeLatest } from 'redux-saga';
import resultsEffects from './results.saga';
import searchEffects from './search.saga';
import { RESULTS, SEARCH } from '../constants';

const rootSaga = function*() {
    yield [
    	takeLatest(RESULTS.REQUESTED, resultsEffects.request),
    	takeLatest(RESULTS.PAGEREQUESTED, resultsEffects.requestPage),
    	takeLatest(SEARCH.SUBMITTEDSIMPLE, searchEffects.simple),
    	takeLatest(SEARCH.SUBMITTEDADVANCED, searchEffects.advanced)
    ];
    //yield takeLatest(LOGOUT.REQUESTED, logoutEffects);
    //yield takeLatest(INFO.REQUESTED, infoEffects);
    //yield takeLatest(GAME.REQUESTED, gameEffects);
    //yield takeLatest(SEARCH.REQUESTED, searchEffects);
};

export default rootSaga;