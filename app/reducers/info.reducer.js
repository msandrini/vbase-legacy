import { INFO } from '../constants'

const initialState = {
	isLoading: false,
	hasFailed: false,
	subject: '',
	key: '',
	title: '',
	content: '',
	imageExists: false
}

const infoReducer = (state = initialState, action) => {
	switch (action.type) {

		case INFO.CONTENTREQUESTED:
			const {subject, key} = action
			return { ...state, isLoading: false, subject, key }

		case INFO.FAILEDLOADING:
			return { ...state, isLoading: false, hasFailed: true }

		case INFO.CONTENTRETRIEVED:
			const {title, content, imageExists} = action
			return { ...state, isLoading: false, title, content, imageExists }

		// case INFO.BACKREQUESTED - triggers saga

		default:
			return state
	}
}

export default infoReducer
