import { SEARCH } from '../constants'

const initialState = {
	advancedVisible: false,
	fieldValueSimple: ''
}

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		
		case SEARCH.TOGGLEADVANCED:
			let newState = {...state, advancedVisible:!state.advancedVisible }
			if (!state.advancedVisible) {
				newState.fieldValueSimple = ''
			}
			return newState

		case SEARCH.CHANGEDSIMPLE:
			return {...state, fieldValueSimple:action.value }

		case SEARCH.SUBMITTEDADVANCED:
			return {...state, advancedVisible:false }

		default:
			return state
	}
}

export default searchReducer