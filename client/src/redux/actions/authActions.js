import {LOGOUT, SIGN_IN} from "../types/authTypes";
import Cookies from "js-cookie";
export const signIn = (data) => {
    return {type: SIGN_IN, user: data.user, token: data.token}
}

export const logout = () => {
    Cookies.remove('token')
    return {type: LOGOUT}
}

