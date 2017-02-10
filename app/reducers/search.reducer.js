import { SEARCH } from '../constants'

const initialState = {
	advancedVisible: false,
	fieldValueSimple: ''
}

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		
		case SEARCH.TOGGLEADVANCED:
			return {...state, advancedVisible:!state.advancedVisible }

		case SEARCH.CHANGEDSIMPLE:
			return {...state, fieldValueSimple:action.value }

		default:
			return state
	}
}

export default searchReducer