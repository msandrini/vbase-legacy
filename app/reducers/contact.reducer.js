import { CONTACT } from '../constants'

const initialState = {
	isLoading: false,
	failed: false
}

const contactReducer = (state = initialState, action) => {
	switch (action.type) {

		case CONTACT.VALUECHANGED:
			return { ...state, failed: false }

		case CONTACT.SUBMITTED:
			return { ...state, isLoading: true }

		case CONTACT.FAILED:
			return { ...state, isLoading: false, failed: action.feedback }

		case CONTACT.SENTSUCCESFULLY:
			return { ...state, isLoading: false } // has a feedback object as well

		default:
			return state
	}
}

export default contactReducer
