import { SEARCH } from '../constants'

const initialState = {
	advancedVisible: false,
	fieldValueSimple: ''
}

const searchReducer = (state = initialState, action) => {
	switch (action.type) {

		case SEARCH.RESETFIELDREQUESTED:
			return { ...state, fieldValueSimple: '' }

		case SEARCH.TOGGLEADVANCED:
			return { ...state, advancedVisible: !state.advancedVisible }

		case SEARCH.CHANGEDSIMPLE:
			return { ...state, fieldValueSimple: action.value }

		// case SEARCH.SUBMITTEDSIMPLE - triggers saga

		case SEARCH.SUBMITTEDADVANCED:
			return { ...state, advancedVisible: false }

		default:
			return state
	}
}

export default searchReducer
