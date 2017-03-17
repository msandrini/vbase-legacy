import { LOGIN, LOGOUT } from '../constants'

const initialState = {
	loggedIn: false,
	isLoading: false,
	checkDone: false,
	userInfo: null
}

const loginReducer = (state = initialState, action) => {
	switch (action.type) {

		case LOGIN.PERFORMED:
			return { ...state, loggedIn: true, isLoading: false, userInfo: action.userInfo }

		case LOGIN.CHECKREQUESTED:
			return { ...state, checkDone: true }

		case LOGIN.REQUESTED:
			return { ...state, isLoading: true }

		// case LOGOUT.REQUESTED: triggers saga

		case LOGOUT.PERFORMED:
			return initialState

		default:
			return state
	}
}

export default loginReducer
