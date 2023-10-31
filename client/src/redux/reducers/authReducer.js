import Cookies from 'js-cookie'
import {LOGOUT, SIGN_IN} from "../types/authTypes";

const initialState = {
    token: Cookies.get('token'),
    user: null,
    isAuth: !!Cookies.get('token')
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                user: action.user,
                token: action.token,
                isAuth: !!action.token
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuth: false
            }
        default: return state
    }
}

export default reducer