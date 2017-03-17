import { USERINPUT } from '../constants'

const initialState = {
	overlayVisible: false,
	isLoading: false,
	reviews: [],
	isSending: false,
	listFailed: false,
	sendFailed: false,
	ownScore: null,
	ownText: ''
}

const userInputReducer = (state = initialState, action) => {
	switch (action.type) {

		case USERINPUT.OVERLAYREQUESTED:
			return { ...state, overlayVisible: true }

		case USERINPUT.OVERLAYDISMISSED:
			return { ...state, overlayVisible: false }

		case USERINPUT.LISTREQUESTED:
			return { ...state, isLoading: true }

		case USERINPUT.LISTRETRIEVED:
			return { ...state, isLoading: false, reviews: action.feedback }

		case USERINPUT.LISTFAILED:
			return { ...state, isLoading: false, listFailed: true }

		case USERINPUT.SCORECHANGED:
			return { ...state, ownScore: action.value }

		case USERINPUT.TEXTCHANGED:
			return { ...state, ownText: action.value }

		case USERINPUT.SUBMITTED:
			return { ...state, isSending: true, fields: action.fields }

		case USERINPUT.ACCEPTED:
			return { ...state, isSending: false }

		case USERINPUT.SENDFAILED:
			return { ...state, isSending: false, sendFailed: true }

		default:
			return state
	}
}

export default userInputReducer
