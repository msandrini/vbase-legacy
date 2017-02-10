import { LOGIN } from '../constants';

const initialState = {
    loggedIn: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case LOGIN.CHECKED:
            return {...state, loggedIn:true, userInfo:action.userInfo };

        case LOGIN.REQUESTED:
            return {...state, via: action.via };

        case LOGIN.REJECTED:
            return {...state, isLoading:false, wrongLogin:action.message };

        case LOGIN.ACCEPTED:
            return {...state, image:action.image, name:action.name, token:'' };

        default:
            return state;
    }
};

export default loginReducer;