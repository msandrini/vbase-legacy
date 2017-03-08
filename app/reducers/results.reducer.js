import { RESULTS } from '../constants'

const initialState = {
	isLoading: false,
	hasFailed: false,
	total: 0,
	games: []
}

const resultsReducer = (state = initialState, action) => {
	switch (action.type) {

		case RESULTS.REQUESTED:
			return { ...state, isLoading: true, games: [], total: 0, hasFailed: false }

		case RESULTS.RETRIEVED:
			return { ...state, isLoading: false, games: action.feedback.games, total: action.feedback.total, hasFailed: false }

		case RESULTS.FAILED:
			return { ...state, isLoading: false, games: [], total: 0, hasFailed: true }

		// case RESULTS.PAGEREQUESTED - triggers saga
		// case RESULTS.BACKREQUESTED - triggers saga

		default:
			return state
	}
}

export default resultsReducer
