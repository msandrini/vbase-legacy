import { LOGIN } from '../constants';

const initialState = {
    username: '',
    password: '',
    isLoading: false,
    wrongLogin: false,
    accepted: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case LOGIN.REQUESTED:
            return {...state, isLoading:true, wrongLogin:false, username: action.email, password: action.password };

        case LOGIN.REJECTED:
            return {...state, isLoading:false, wrongLogin:action.message };

        case LOGIN.ACCEPTED:
            return {...state, isLoading:false, wrongLogin:false, accepted: action.payload };

        default:
            return state;
    }
};

export default loginReducer;